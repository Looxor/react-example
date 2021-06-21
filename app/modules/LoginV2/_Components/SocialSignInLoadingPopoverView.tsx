import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Overlay } from "teaset";

import { colors, constants } from "../../../config";
import FastImage from "react-native-fast-image";
import { SOCIAL_SIGNIN } from "./SocialSignInButton";

const SocialSignInLoadingPopoverView = (props: any = {}) => {
  let overlayIdOpened;
  return {
    show: socialProviderType => {
      const overlayId = Overlay.show(
        overlayView({
          getOverlayIdFunc: () => overlayId,
          socialProviderType,
        }),
      );
      overlayIdOpened = overlayId;
    },
    hide: () => {
      overlayIdOpened && Overlay.hide(overlayIdOpened);
    },
  };
};

const overlayView = ({getOverlayIdFunc, socialProviderType}) => (
  <Overlay.View modal={true} style={styles.overlayContainer}>
    <OverlayChildView
      onHidePullView={() => {
        const overlayId = getOverlayIdFunc();
        Overlay.hide(overlayId, true);
      }}
      getOverlayIdFunc={getOverlayIdFunc}
      socialProviderType={socialProviderType}
    />
  </Overlay.View>
);

const OverlayChildView = props => {
  return (
    <View
      style={
        props.socialProviderType === 'apple.com'
          ? styles.socialSignInLoadingContainerApple
          : styles.socialSignInLoadingContainer
      }>
      {props.socialProviderType !== 'apple.com' && (
        <FastImage
          style={styles.socialSignInLoadingIcon}
          resizeMode={'contain'}
          source={SOCIAL_SIGNIN[props.socialProviderType].icon_popup}
        />
      )}
      <ActivityIndicator
        color={colors.THEFACULTY}
        size={'small'}
        style={
          props.socialProviderType !== 'apple.com' &&
          styles.socialSignInLoadingActivity
        }
      />
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
  socialSignInLoadingContainer: {
    width: 140,
    height: 140,
    backgroundColor: 'rgba(255,255,255, 0.95)',
    // backgroundColor: colors.DEFAULT_BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  socialSignInLoadingContainerApple: {
    width: 70,
    height: 70,
    backgroundColor: 'rgba(255,255,255, 0.95)',
    // backgroundColor: colors.DEFAULT_BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  socialSignInLoadingIcon: {
    width: 80,
    height: 80,
  },
  socialSignInLoadingText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 16,
    marginTop: 10,
  },
  socialSignInLoadingActivity: {
    marginTop: 10,
  },
});

export default SocialSignInLoadingPopoverView;
