import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Overlay } from "teaset";

import { colors, constants, strings } from "../../../config";
import Strings from "../../../utils/misc/TextComponents";
import standardFunctions from "../../../utils/app/StandardFunctions";
import { UserData } from "../../../config/constants";
import Button from "../../../components/Button";
import FastImage from "react-native-fast-image";

const CoinsExpiringPopover = (props: any = {}) => {
  return {
    show: ({navigation, expiring_date}) => {
      const overlayId = Overlay.show(
        overlayView({
          getOverlayIdFunc: () => overlayId,
          navigation,
          expiring_date,
        }),
      );
    },
  };
};

const overlayView = ({getOverlayIdFunc, navigation, expiring_date}) => (
  <Overlay.View style={styles.overlayContainer}>
    <OverlayChildView
      onHidePopover={() => {}}
      navigation={navigation}
      expiring_date={expiring_date}
      getOverlayIdFunc={getOverlayIdFunc}
    />
  </Overlay.View>
);

const OverlayChildView = props => {
  const {navigation, expiring_date} = props;
  let [loading, setLoading] = useState(false);

  const closePopover = () => {
    props.onHidePopover && props.onHidePopover();
  };

  const mainButtonAction = async () => {
    closeButtonAction();
    standardFunctions.open_inapp_action(navigation, 'APP#COUPONS#GENERAL');
  };

  const closeButtonAction = async () => {
    const overlayId = props.getOverlayIdFunc();
    Overlay.hide(overlayId, true);
    closePopover();
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          {strings.HOME.COINS_EXPIRING_POPOVER.TITLE}
        </Text>
        <View style={styles.imageContainer}>
          <FastImage
            resizeMode={'contain'}
            source={require('../../../../assets/images/icons/icn_three_new_tf_coins.png')}
            style={[styles.image, {width: 130, height: 180}]}
          />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            {Strings.makeMedium(
              strings.HOME.COINS_EXPIRING_POPOVER.DESCRIPTION.replace(
                '{FIRSTNAME}',
                UserData.getUserData().firstname
                  ? ' ' + UserData.getUserData().firstname
                  : '',
              ).replace('{EXPIRING_DATE}', expiring_date),
            )}
          </Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          onPress={mainButtonAction}
          style={styles.okButton}
          textStyle={styles.okButtonText}>
          {loading ? (
            <ActivityIndicator color={colors.WHITE} />
          ) : (
            strings.HOME.COINS_EXPIRING_POPOVER.USE_COINS_BUTTON
          )}
        </Button>
        <TouchableOpacity
          onPress={closeButtonAction}
          style={styles.closeButton}>
          <Text style={[styles.closeButtonText]}>
            {strings.HOME.COINS_EXPIRING_POPOVER.CLOSE_BUTTON}
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
    backgroundColor: 'transparent',
  },
  overlay: {
    width: '85%',
    marginHorizontal: 20,
    backgroundColor: colors.WHITE,
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
  imageContainer: {
    width: '100%',
    marginTop: 15,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {},
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
    paddingHorizontal: 23,
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
    marginTop: 0,
    height: 48,
    justifyContent: 'center',
  },
  okButtonText: {},
  closeButton: {
    marginTop: -10,
    marginBottom: 5,
    height: 48,
    justifyContent: 'center',
  },
  closeButtonText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    color: colors.THEFACULTY,
    fontSize: 16,
  },
});

export default CoinsExpiringPopover;
