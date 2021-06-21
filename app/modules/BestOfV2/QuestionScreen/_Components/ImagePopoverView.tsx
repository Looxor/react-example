import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Overlay } from "teaset";
import FastImage from "react-native-fast-image";

import { colors, constants, strings } from "../../../../config";
import { Button } from "../../../../components";
import { Observable } from "../../../_CommonModels/ViewModelBase";

const ImagePopoverView = (props: any = {}) => {
  const {image_url} = props;
  return {
    show: () => {
      const overlayId = Overlay.show(
        overlayView({
          getOverlayIdFunc: () => overlayId,
          image_url,
        }),
      );
    },
  };
};

const overlayView = ({getOverlayIdFunc, image_url}) => (
  <Overlay.View style={styles.overlayContainer}>
    <OverlayChildView
      onPressClose={() => {
        const overlayId = getOverlayIdFunc();
        Overlay.hide(overlayId, true);
      }}
      getOverlayIdFunc={getOverlayIdFunc}
      image_url={image_url}
    />
  </Overlay.View>
);

const OverlayChildView = props => {
  const onPressCloseHandler = () => {
    props.onPressClose && props.onPressClose();
  };

  useEffect(() => {
    let overlayId = props.getOverlayIdFunc();
    Observable.setReduxValue('overlay_question_image', overlayId);
  });
  return (
    <View style={styles.overlay}>
      <FastImage
        resizeMode={'contain'}
        source={{uri: props.image_url}}
        style={styles.image}
      />
      <Button
        onPress={onPressCloseHandler}
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
    backgroundColor: colors.DEFAULT_BACKGROUND,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    maxHeight: '80%',
    padding: 15,
  },
  image: {
    borderRadius: 8,
    width: '100%',
    height: 200,
  },
  closeButton: {
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: colors.BESTOF2.BG1,
    width: '100%',
    height: 48,
    borderRadius: 15,
    alignSelf: 'center',
    shadowColor: colors.lightGray,
    shadowOpacity: 0.4,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    elevation: 2,
  },
  closeButtonText: {
    fontSize: 18,
    color: colors.WHITE,
    fontFamily: constants.DEFAULT_FONT_BOLD,
  },
});

export default ImagePopoverView;
