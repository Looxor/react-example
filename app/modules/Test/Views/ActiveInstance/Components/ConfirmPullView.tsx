import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Overlay } from "teaset";
import FastImage from "react-native-fast-image";

import { colors, constants, strings } from "../../../../../config";
import { Button } from "../../../../../components";
import standardFunctions from "../../../../../utils/app/StandardFunctions";
import showError, { ERROR_TYPE } from "../../../CommonFunctions/showError";
import { CallServerPromise } from "../../../../../utils/app/CallServer";
import TestInstanceManager from "../../../ViewModels/_Common/TestInstanceManager";
import { hideSimulationStatus } from "../../../ViewModels/CheckActiveSimulation/CheckActiveSimulation";

const ConfirmPullView = (props: any = {}) => {
  const {navigation} = props;
  return {
    show: (simulation_id, onTerminate) => {
      const overlayId = Overlay.show(
        overlayView(navigation, simulation_id, onTerminate, () => overlayId),
      );
    },
  };
};

const overlayView = (
  navigation,
  simulation_id,
  onTerminate,
  getOverlayIdFunc,
) => {
  return (
    <Overlay.PullView
      containerStyle={styles.overlayContainer}
      side={'bottom'}
      modal={false}
      rootTransform={[]}>
      <OverlayChildView
        onCloseTerminateView={() => {
          const overlayId = getOverlayIdFunc();
          Overlay.hide(overlayId, true);
        }}
        // onTerminate={onTerminate}
        getOverlayIdFunc={getOverlayIdFunc}
        navigation={navigation}
        simulation_id={simulation_id}
      />
    </Overlay.PullView>
  );
};

const OverlayChildView = props => {
  const [loading, setLoading] = useState(false);
  const {navigation, getOverlayIdFunc, simulation_id} = props;
  const closeTerminateViewHandler = () => {
    props.onCloseTerminateView();
  };

  const confirmTerminateHandler = async () => {
    try {
      const simulation_id2 = TestInstanceManager.getData('simulation_id');
      setLoading(true);
      const request: any = await CallServerPromise.force_terminate_simulation(
        simulation_id || simulation_id2,
      );
      setLoading(false);
      if (request.success) {
        // onTerminate(simulation_id);  // Doesn't work for now.
        await hideSimulationStatus();
        await standardFunctions.show_alert_async(
          strings.TEST.ACTIVE_INSTANCE.TITLE,
          strings.TEST.ACTIVE_INSTANCE.TERMINATE_SUCCESS,
        );
        navigation.pop(1);
        // navigation.goBack(null);
        const overlayId = getOverlayIdFunc();
        Overlay.hide(overlayId, true);
      } else {
        console.log('error on request', request);
        if (request.error === 'simulation not found') {
          await hideSimulationStatus();
        } else {
          await showError(ERROR_TYPE.ERROR_UNKNOWN);
        }
        const overlayId = getOverlayIdFunc();
        Overlay.hide(overlayId, true);
      }
    } catch (error) {
      setLoading(false);
      console.log('error on requesting', error);
      await showError(ERROR_TYPE.ERROR_UNKNOWN);
      const overlayId = getOverlayIdFunc();
      Overlay.hide(overlayId, true);
    }
  };

  return (
    <View style={styles.overlay}>
      <FastImage
        source={require('../../../../../../assets/images/icons/icn_abort_simulation.png')}
        style={styles.terminateLogoImage}
      />
      <Text style={styles.terminateDesc}>
        {strings.TEST.ACTIVE_INSTANCE.CONFIRM_DESC}
      </Text>
      <Button
        disabled={loading}
        onPress={confirmTerminateHandler}
        style={styles.terminteConfirmButton}
        textStyle={styles.terminteConfirmButtonText}>
        {loading ? (
          <ActivityIndicator color={colors.WHITE} />
        ) : (
          strings.TEST.ACTIVE_INSTANCE.CONFIRM_BUTTON
        )}
      </Button>
      <Button
        onPress={closeTerminateViewHandler}
        style={styles.terminteCloseButton}
        textStyle={styles.terminteCloseButtonText}>
        {strings.TEST.ACTIVE_INSTANCE.NO_CONFIRM_BUTTON}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    backgroundColor: 'transparent',
  },
  overlay: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    minWidth: 300,
    minHeight: 300,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
  },
  terminateLogoImage: {
    width: 81,
    height: 76,
    marginTop: 20,
  },
  terminateDesc: {
    fontSize: 15,
    fontWeight: 'normal',
    paddingHorizontal: 10,
    marginTop: 20,
    color: colors.darkGray,
    fontFamily: constants.DEFAULT_FONT,
  },
  terminteConfirmButton: {
    height: 44,
    width: 300,
    marginTop: 20,
  },
  terminteConfirmButtonText: {
    fontSize: 18,
  },
  terminteCloseButton: {
    height: 38,
    width: 300,
    backgroundColor: 'transparent',
  },
  terminteCloseButtonText: {
    fontSize: 16,
    color: colors.THEFACULTY,
  },
});

export default ConfirmPullView;
