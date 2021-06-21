import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Overlay } from "teaset";

import { colors, constants, strings } from "../../../../../config";
import { Button } from "../../../../../components";
import FastImage from "react-native-fast-image";
import Strings from "../../../../../utils/misc/TextComponents";

const SaveSuccessPopoverView = (props: any = {}) => {
  return {
    show: ({message, second_icon, success}) => {
      const overlayId = Overlay.show(
        overlayView({
          getOverlayIdFunc: () => overlayId,
          message,
          second_icon,
          success,
        }),
      );
    },
  };
};

const overlayView = ({getOverlayIdFunc, message, second_icon, success}) => (
  <Overlay.View style={styles.overlayContainer}>
    <OverlayChildView
      onHidePopover={() => {
        const overlayId = getOverlayIdFunc();
        Overlay.hide(overlayId, true);
      }}
      message={message}
      second_icon={second_icon}
      success={success}
      getOverlayIdFunc={getOverlayIdFunc}
    />
  </Overlay.View>
);

const OverlayChildView = props => {
  const {message, second_icon, success} = props;

  const closePopover = () => {
    props.onHidePopover && props.onHidePopover();
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          {success
            ? strings.PROFILE.SUCCESS_DIALOG.TITLE
            : strings.PROFILE.FAIL_DIALOG.TITLE}
        </Text>
        <FastImage
          resizeMode={'contain'}
          style={[styles.coinIcon, second_icon && {width: 200, height: 200}]}
          source={
            success
              ? second_icon
                ? require('../../../../../../assets/images/icons/icn_big_punches_light.png')
                : require('../../../../../../assets/images/icons/icn_new_tf_coin.png')
              : require('../../../../../../assets/images/icons/icn_big_sad_light.png')
          }
        />
        {Strings.makeBold(message, {
          style: styles.descriptionText,
          boldTextStyle: {color: colors.COUPONS.DEFAULT},
        })}
      </View>
      <Button
        onPress={closePopover}
        style={styles.closeButton}
        textStyle={styles.closeButtonText}>
        {strings.OTHER.CLOSE.toUpperCase()}
      </Button>
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
    width: '90%',
    marginHorizontal: 20,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 18,
    maxHeight: '80%',
  },
  container: {
    width: '96%',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 22,
    marginTop: 10,
  },
  coinIcon: {
    width: 50,
    height: 50,
    marginVertical: 30,
  },
  descriptionText: {
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 18,
  },
  closeButton: {
    marginTop: 5,
    marginBottom: 25,
    height: 50,
    width: '80%',
    backgroundColor: 'transparent',
  },
  closeButtonText: {
    fontSize: 18,
    color: colors.THEFACULTY,
  },
});

export default SaveSuccessPopoverView;
