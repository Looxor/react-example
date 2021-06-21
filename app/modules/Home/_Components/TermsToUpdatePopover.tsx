import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Overlay } from "teaset";

import { colors, constants, strings } from "../../../config";
import Strings from "../../../utils/misc/TextComponents";
import UserManager from "../../Settings/Models/UserManager";
import standardFunctions from "../../../utils/app/StandardFunctions";
import Button from "../../../components/Button";
import { routes } from "../../../navigation/rootNavigation/navigation.constants";

const TermsToUpdatePopover = (props: any = {}) => {
  return {
    show: ({navigation}) => {
      const overlayId = Overlay.show(
        overlayView({
          getOverlayIdFunc: () => overlayId,
          navigation,
        }),
      );
    },
  };
};

const overlayView = ({getOverlayIdFunc, navigation}) => (
  <View style={styles.overlayContainer}>
    <OverlayChildView
      onHidePopover={() => {}}
      navigation={navigation}
      getOverlayIdFunc={getOverlayIdFunc}
    />
  </View>
);

const OverlayChildView = props => {
  const {navigation} = props;
  let [loading, setLoading] = useState(false);

  const closePopover = () => {
    props.onHidePopover && props.onHidePopover();
  };

  const acceptAll = async () => {
    setLoading(true);
    var legalCheck_MARKETING = true;
    var legalCheck_DATA = true;
    const updatedFaculty = await UserManager.updateLegalChecks(
      legalCheck_MARKETING,
      legalCheck_DATA,
    );
    setLoading(false);
    if (!updatedFaculty) {
      await standardFunctions.show_alert_async(
        strings.ALERTS.ERRORS.STANDARD.OOPS,
        strings.SETTINGS.CHANGE_LEGAL_CHECKS.ERROR_WHILE_UPDATING,
      );
    } else {
      const overlayId = props.getOverlayIdFunc();
      Overlay.hide(overlayId, true);
      closePopover();
    }
  };

  const reviewChoises = async () => {
    const overlayId = props.getOverlayIdFunc();
    Overlay.hide(overlayId, true);
    closePopover();
    navigation.navigate(routes.CHANGE_LEGAL_CHECKS_NAVIGATOR, {
      from_home_update: true,
    });
  };

  const openDocument = document => {
    if (document === 'terms_and_conditions') {
      standardFunctions.open_browser(constants.TERMS_AND_CONDITIONS_URL);
    } else if (document === 'privacy_policy') {
      standardFunctions.open_browser(constants.PRIVACY_POLICY_URL);
    }
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          {strings.HOME.TERMS_TO_UPDATE_POPOVER.TITLE}
        </Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            {Strings.makeMedium(
              strings.HOME.TERMS_TO_UPDATE_POPOVER.CONFIRM_CHECKBOX0,
            )}
          </Text>

          <TouchableOpacity
            onPress={() => {
              openDocument('terms_and_conditions');
            }}>
            <Text style={[styles.descriptionText, {color: colors.THEFACULTY}]}>
              {strings.HOME.TERMS_TO_UPDATE_POPOVER.CONFIRM_CHECKBOX1}
            </Text>
          </TouchableOpacity>

          <Text style={styles.descriptionText}>
            {strings.HOME.TERMS_TO_UPDATE_POPOVER.CONFIRM_CHECKBOX2}
          </Text>

          <TouchableOpacity
            onPress={() => {
              openDocument('privacy_policy');
            }}>
            <Text style={[styles.descriptionText, {color: colors.THEFACULTY}]}>
              {' ' + strings.HOME.TERMS_TO_UPDATE_POPOVER.CONFIRM_CHECKBOX3}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              openDocument('privacy_policy');
            }}>
            <Text style={[styles.descriptionText, {color: colors.THEFACULTY}]}>
              {' ' + strings.HOME.TERMS_TO_UPDATE_POPOVER.CONFIRM_CHECKBOX4}
            </Text>
          </TouchableOpacity>

          <Text style={styles.descriptionText}>
            {strings.HOME.TERMS_TO_UPDATE_POPOVER.CONFIRM_CHECKBOX5}
          </Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          onPress={acceptAll}
          style={styles.okButton}
          textStyle={styles.okButtonText}>
          {loading ? (
            <ActivityIndicator color={colors.WHITE} />
          ) : (
            strings.HOME.TERMS_TO_UPDATE_POPOVER.CONFIRM_BUTTON
          )}
        </Button>
        <TouchableOpacity onPress={reviewChoises} style={styles.reviewButton}>
          <Text style={[styles.reviewButtonText]}>
            {strings.HOME.TERMS_TO_UPDATE_POPOVER.REVIEW_BUTTON}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0.8,0.8,0.8,0.5)',
  },
  overlay: {
    width: '85%',
    marginHorizontal: 20,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 18,
    minHeight: '43%',
    maxHeight: '90%',
  },
  container: {
    width: '100%',
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    paddingHorizontal: 20,
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 19,
    marginTop: 5,
  },
  descriptionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    paddingHorizontal: 28,
    marginTop: 20,
  },
  descriptionText: {
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 15,
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  okButton: {
    marginTop: 15,
    height: 48,
    justifyContent: 'center',
  },
  okButtonText: {},
  reviewButton: {
    marginTop: -10,
    marginBottom: 5,
    height: 48,
    justifyContent: 'center',
  },
  reviewButtonText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    color: colors.THEFACULTY,
    fontSize: 16,
  },
});

export default TermsToUpdatePopover;
