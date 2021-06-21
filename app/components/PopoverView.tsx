import React from "react";
import { StyleSheet, View } from "react-native";
import { Overlay } from "teaset";

import { colors } from "../config";

const PopoverView = (props: any = {}) => {
  return {
    show: ({ component }) => {
      const overlayId = Overlay.show(
        overlayView({
          getOverlayIdFunc: () => overlayId,
          component
        })
      );
    }
  };
};

const overlayView = ({ getOverlayIdFunc, component }) => (
  <Overlay.View style={styles.overlayContainer}>
    <OverlayChildView
      onHidePopover={() => {
        const overlayId = getOverlayIdFunc();
        Overlay.hide(overlayId, true);
      }}
      getOverlayIdFunc={getOverlayIdFunc}
      component={component}
    />
  </Overlay.View>
);

const OverlayChildView = props => {
  const { component } = props;

  const closePopover = () => {
    props.onHidePopover && props.onHidePopover();
  };

  return (
    <View style={styles.overlay}>
      {component && component({ closePopover })}
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  overlay: {
    width: "90%",
    marginHorizontal: 20,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    alignItems: "center",
    borderRadius: 18,
    maxHeight: "80%"
  }
});

export default PopoverView;
