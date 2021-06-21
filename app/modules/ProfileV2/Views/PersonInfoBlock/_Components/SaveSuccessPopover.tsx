import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Overlay} from 'teaset';

import {colors, constants, strings} from '../../../../../config';
import {Button} from '../../../../../components';
import FastImage from 'react-native-fast-image';
import Strings from '../../../../../utils/misc/TextComponents';
import standardFunctions from '../../../../../utils/app/StandardFunctions';

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
        standardFunctions.play_tap_sound();
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
        <FastImage
          resizeMode={'contain'}
          style={[styles.coinIcon, second_icon && {width: 60, height: 60}]}
          source={
            success
              ? second_icon
                ? require('../../../../../../assets/images/icons/icn_fists.png')
                : require('../../../../../../assets/images/icons/icn_new_tf_coin.png')
              : require('../../../../../../assets/images/icons/icn_big_sad_light.png')
          }
        />
        <Text style={styles.titleText}>
          {success
            ? strings.PROFILE.SUCCESS_DIALOG.TITLE
            : strings.PROFILE.FAIL_DIALOG.TITLE}
        </Text>
        {Strings.makeBold(message, {
          style: styles.descriptionText,
          boldTextStyle: {color: colors.COUPONS.DEFAULT},
        })}
      </View>
      <Button
        onPress={closePopover}
        style={styles.closeButton}
        textStyle={styles.closeButtonText}>
        {strings.OTHER.CLOSE}
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
    padding: 20,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 22,
    color: colors.DARK_ALOE_TF,
    marginVertical: 10,
  },
  coinIcon: {
    width: 50,
    height: 50,
  },
  descriptionText: {
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 18,
    color: colors.DARK_ALOE_TF,
  },
  closeButton: {
    borderRadius: 13,
    backgroundColor: colors.COUPONS.BG1,
    shadowOpacity: 0.7,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 5,
    elevation: 5,
  },
  closeButtonText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 18,
    color: colors.WHITE,
  },
});

export default SaveSuccessPopoverView;
