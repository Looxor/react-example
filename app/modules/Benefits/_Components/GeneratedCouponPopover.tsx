import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Overlay } from "teaset";

import { colors, constants, strings } from "../../../config";
import Strings from "../../../utils/misc/TextComponents";
import FastImage from "react-native-fast-image";

const GeneratedCouponPopover = (props: any = {}) => {
  return {
    show: ({navigation, goToSafePart}) => {
      const overlayId = Overlay.show(
        overlayView({
          getOverlayIdFunc: () => overlayId,
          goToSafePart,
          navigation,
        }),
      );
    },
  };
};

const overlayView = ({getOverlayIdFunc, goToSafePart, navigation}) => (
  <Overlay.View style={styles.overlayContainer}>
    <OverlayChildView
      onHidePopover={() => {
        const overlayId = getOverlayIdFunc();
        Overlay.hide(overlayId, true);
      }}
      goToSafePart={goToSafePart}
      navigation={navigation}
      getOverlayIdFunc={getOverlayIdFunc}
    />
  </Overlay.View>
);

const OverlayChildView = props => {
  const {navigation} = props;

  const goToSafePart = () => {
    closePopover();
    props.goToSafePart && props.goToSafePart();
  };

  const closePopover = () => {
    props.onHidePopover && props.onHidePopover();
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <FastImage
          resizeMode={'contain'}
          style={[styles.safeIcon]}
          source={require('../../../../assets/images/icons/icn_safe_bookmark_internal.png')}
        />
        <Text style={styles.titleText}>
          {strings.COUPONS.HOME.GENERATED_COUPON_POPOVER.TITLE}
        </Text>
        <FastImage
          resizeMode={'contain'}
          style={[styles.icon]}
          source={require('../../../../assets/images/icons/benefits_generated_gif.gif')}
        />
        {Strings.makeBold(strings.COUPONS.HOME.GENERATED_COUPON_POPOVER.TEXT, {
          style: styles.descriptionTextColumn,
        })}
      </View>
      <View style={styles.buttonsContainerColumn}>
        <TouchableOpacity style={styles.safeButton} onPress={goToSafePart}>
          <Text style={[styles.safeButtonText, {textAlign: 'center'}]}>
            {strings.COUPONS.HOME.GENERATED_COUPON_POPOVER.GO_TO_SAFE_BUTTON}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={closePopover}>
          <Text style={[styles.closeButtonText, {textAlign: 'center'}]}>
            {strings.OTHER.CLOSE}
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
    width: '90%',
    marginHorizontal: 20,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 18,
    minHeight: '28%',
    maxHeight: '90%',
  },
  container: {
    width: '100%',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeIcon: {
    width: 30,
    height: 30,
  },
  titleText: {
    textAlign: 'center',
    color: colors.DARK_ALOE_TF,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 22,
    marginTop: 10,
  },
  descriptionTextRow: {
    marginTop: 30,
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 18,
  },
  descriptionTextColumn: {
    marginTop: 15,
    textAlign: 'center',
    color: colors.DARK_ALOE_TF,
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 18,
    lineHeight: 20,
  },
  buttonsContainerRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 30,
  },
  buttonsContainerColumn: {
    width: '100%',
    justifyContent: 'center',
    marginBottom: 30,
  },
  closeButtonRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonColumn: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeButton: {
    backgroundColor: colors.BESTOF2.BG1,
    width: '92%',
    height: 48,
    borderRadius: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    shadowColor: colors.lightGray,
    shadowOpacity: 0.4,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 5,
  },
  safeButtonText: {
    flexWrap: 'wrap',
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 18,
    color: colors.WHITE,
  },
  closeButton: {
    backgroundColor: colors.WHITE,
    width: '92%',
    height: 48,
    borderRadius: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    shadowColor: colors.lightGray,
    shadowOpacity: 0.4,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    elevation: 2,
    marginTop: 5,
  },
  closeButtonText: {
    flexWrap: 'wrap',
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 18,
    color: colors.BESTOF2.BG1,
  },
  actionButtonText: {
    flexWrap: 'wrap',
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 18,
    color: colors.THEFACULTY,
  },
  icon: {
    width: '76%',
    height: 210,
    marginTop: 15,
    borderRadius: 20,
  },
});

export default GeneratedCouponPopover;
