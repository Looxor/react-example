import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Overlay } from "teaset";

import { colors } from "../config";

const InAppLoadingPopover = (props: any = {}) => {
  return {
    show: ({navigation}) => {
      const overlayId = Overlay.show(
        overlayView({
          getOverlayIdFunc: () => overlayId,
          navigation,
        }),
      );
      return overlayId;
    },
  };
};

const overlayView = ({getOverlayIdFunc, navigation}) => (
  <Overlay.View style={styles.overlayContainer}>
    <OverlayChildView
      onHidePopover={() => {
        const overlayId = getOverlayIdFunc();
        Overlay.hide(overlayId, true);
      }}
      navigation={navigation}
      getOverlayIdFunc={getOverlayIdFunc}
    />
  </Overlay.View>
);

const OverlayChildView = props => {
  const {navigation} = props;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator color={colors.THEFACULTY} />
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
    width: 60,
    height: 60,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
});

export default InAppLoadingPopover;
