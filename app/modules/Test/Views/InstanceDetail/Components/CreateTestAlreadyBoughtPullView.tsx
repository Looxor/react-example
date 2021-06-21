import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Overlay } from "teaset";

import { colors, constants, strings } from "../../../../../config";
import { StandardButton } from "../../../../../components";

const CreateTestAlreadyBoughtPullView = (props: any = {}) => {
  const {} = props;
  return {
    show: () => {
      const overlayId = Overlay.show(
        overlayView({
          getOverlayIdFunc: () => overlayId,
        }),
      );
    },
  };
};

const overlayView = ({getOverlayIdFunc}) => (
  <Overlay.PullView
    containerStyle={styles.overlayContainer}
    side={'bottom'}
    modal={false}
    rootTransform={[]}>
    <OverlayChildView
      onHidePullView={() => {
        const overlayId = getOverlayIdFunc();
        Overlay.hide(overlayId, true);
      }}
      getOverlayIdFunc={getOverlayIdFunc}
    />
  </Overlay.PullView>
);

const OverlayChildView = props => {
  const hideConfirmViewHandler = () => {
    props.onHidePullView();
  };

  const {} = props;

  return (
    <View style={styles.overlay}>
      <Text style={styles.coinsTitle}>{strings.TEST.ERROR_TITLE}</Text>
      <Text style={styles.coinsDescription}>
        {strings.TEST.ERROR_TEST_ALREADY_BOUGHT}
      </Text>
      <StandardButton
        style={{marginTop: 8}}
        label={strings.OTHER.CLOSE.toUpperCase()}
        onPress={hideConfirmViewHandler}
      />
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
    minHeight: 250,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  createButton: {
    height: 42,
    width: 300,
  },
  createButtonText: {
    fontSize: 18,
  },
  createViewCloseButton: {
    height: 38,
    width: 300,
    backgroundColor: 'transparent',
  },
  createViewCloseButtonText: {
    fontSize: 16,
    color: colors.THEFACULTY,
  },
  coinsLogoImage: {
    width: 85,
    height: 85,
    marginTop: 20,
  },
  coinsTitle: {
    paddingTop: 40,
    fontSize: 22,
    paddingHorizontal: 10,
    color: colors.black,
    fontFamily: constants.DEFAULT_FONT_BOLD,
  },
  coinsDescription: {
    textAlign: 'center',
    fontSize: 15,
    paddingHorizontal: 10,
    color: colors.gray,
    lineHeight: 22,
    fontFamily: constants.DEFAULT_FONT,
  },
});

export default CreateTestAlreadyBoughtPullView;
