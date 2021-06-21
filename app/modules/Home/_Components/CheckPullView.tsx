import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { CallServerPromise } from "../../../utils/app/CallServer";
import { Overlay } from "teaset";
import { CommonActions as NavigationActions, useNavigation } from "@react-navigation/native";

import { colors, strings } from "../../../config";
import constants from "../../../config/constants";
import { Button } from "../../../components";
import { routes } from "../../../navigation/rootNavigation/navigation.constants";
import WithIDCard from "../../Settings/ViewModels/WithIDCard";

const CheckPullView = props => {
  const navigation = useNavigation();

  // const {navigation} = props;

  const componentDidMount = () => {
    return componentWillUnmount;
  };
  const componentWillUnmount = () => {};
  useEffect(componentDidMount, []);

  return null;
};

const overlayView = (navigation, getOverlayIdFunc) => (
  <Overlay.PullView
    containerStyle={styles.overlayContainer}
    side={'bottom'}
    modal={false}
    rootTransform={[]}>
    <OverlayChildView
      navigation={navigation}
      getOverlayIdFunc={getOverlayIdFunc}
    />
  </Overlay.PullView>
);

const OverlayChildView = props => {
  const {navigation, getOverlayIdFunc} = props;
  const [state, setState] = useState({
    loaded: false,
    missing_verification: null,
  });
  const setState2 = state2 => setState({...state, ...state2});

  const redeemPressHandler = () => {
    Overlay.hide(getOverlayIdFunc());

    if (state.missing_verification === true) {
      NavigationActions.navigate(routes.SETTINGS_NAVIGATOR, {
        routeName: routes.SETTINGS_CARD_REGISTER,
        params: {cardType: WithIDCard.CARD_TYPE},
      });
    } else if (state.missing_verification === false) {
      NavigationActions.navigate(routes.CONTEST_NAVIGATOR, {
        screen: routes.CONTEST_PRIZE_REQUEST1,
      });
    }
  };

  const componentDidMount = () => {
    const checkMissingVerification = async () => {
      try {
        const request =
          await CallServerPromise.check_for_missing_verification();

        if (request.success) {
          if (request.data === true) {
            setState2({missing_verification: true});
          }
          if (request.data === false) {
            setState2({missing_verification: false});
          }
        }
      } catch (error) {}
    };
    checkMissingVerification();
    return componentWillUnmount;
  };
  const componentWillUnmount = () => {};
  useEffect(componentDidMount, []);

  return (
    <View style={styles.overlay}>
      <Image
        source={require('../../../../assets/images/icons/icn_shield.png')}
        style={styles.logoImage}
      />
      <Text style={styles.congratText}>
        {strings.CONTEST.YOUR_PRIZES.OVERLAY_CONGRAT_TEXT}
      </Text>
      <Text style={styles.instructionText}>
        {strings.CONTEST.YOUR_PRIZES.OVERLAY_INSTRUCT_TEXT}
      </Text>
      <Button
        disabled={state.missing_verification === null}
        onPress={redeemPressHandler}
        style={styles.redeemButton}
        textStyle={styles.redeemButtonText}>
        {strings.CONTEST.YOUR_PRIZES.OVERLAY_DISCOVER_BUTTON}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    backgroundColor: 'transparent',
  },
  overlay: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    minWidth: 300,
    minHeight: 300,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  congratText: {
    fontSize: 20,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  instructionText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
  },
  redeemButton: {
    height: 48,
    width: 300,
  },
  redeemButtonText: {
    fontSize: 16,
  },
});

export default CheckPullView;
