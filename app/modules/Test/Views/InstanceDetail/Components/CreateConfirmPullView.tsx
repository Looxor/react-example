import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Overlay } from "teaset";
import FastImage from "react-native-fast-image";

import { colors, constants, strings } from "../../../../../config";
import { Button, StandardButton } from "../../../../../components";

const CreateConfirmPullView = (props: any = {}) => {
  const {onConfirmCreate, onGotoStore, enough, test_name, price} = props;
  return {
    show: () => {
      const overlayId = Overlay.show(
        overlayView({
          getOverlayIdFunc: () => overlayId,
          onConfirmCreate,
          onGotoStore,
          enough,
          test_name,
          price,
        }),
      );
    },
  };
};

const overlayView = ({
  getOverlayIdFunc,
  onConfirmCreate,
  onGotoStore,
  enough,
  test_name,
  price,
}) => (
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
      onConfirmCreate={onConfirmCreate}
      onGotoStore={onGotoStore}
      enough={enough}
      test_name={test_name}
      price={price}
      getOverlayIdFunc={getOverlayIdFunc}
    />
  </Overlay.PullView>
);

const OverlayChildView = props => {
  const hideConfirmViewHandler = () => {
    props.onHidePullView();
  };

  const {enough, test_name, price} = props;

  return (
    <View style={styles.overlay}>
      <FastImage
        resizeMode={'contain'}
        source={require('../../../../../../assets/images/icons/icn_three_new_tf_coins.png')}
        style={styles.coinsLogoImage}
      />
      {enough && price !== '0' ? (
        <Text style={styles.coinsDescription}>
          {strings.TEST.INSTANCE_DETAIL.COINS_DESC_ENOUGH.replace(
            '{COINS}',
            price,
          ).replace('{TEST_NAME}', test_name)}
        </Text>
      ) : price === '0' ? (
        <Text style={styles.coinsDescription}>
          {strings.TEST.INSTANCE_DETAIL.COINS_DESC_FREE.replace(
            '{TEST_NAME}',
            test_name,
          )}
        </Text>
      ) : (
        <Text style={styles.coinsDescription}>
          {strings.TEST.INSTANCE_DETAIL.COINS_DESC_NOT_ENOUGH}
        </Text>
      )}
      {enough || price === '0' ? (
        <StandardButton
          style={{marginTop: 8}}
          label={strings.TEST.INSTANCE_DETAIL.CREATE_CONFIRM}
          onPress={() => {
            hideConfirmViewHandler();
            props.onConfirmCreate();
          }}
        />
      ) : (
        <Button
          onPress={() => {
            hideConfirmViewHandler();
            props.onGotoStore();
          }}
          style={styles.createButton}
          textStyle={styles.createButtonText}>
          {strings.TEST.INSTANCE_DETAIL.GOTO_BESTOF}
        </Button>
      )}
      <Button
        onPress={hideConfirmViewHandler}
        style={styles.createViewCloseButton}
        textStyle={styles.createViewCloseButtonText}>
        {strings.TEST.INSTANCE_DETAIL.CREATE_CONFIRM_CLOSE}
      </Button>
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
    minHeight: 300,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  createButton: {
    height: 45,
    width: 300,
  },
  createButtonText: {
    fontSize: 16,
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
  coinsDescription: {
    fontSize: 15,
    paddingHorizontal: 10,
    color: colors.gray,
    lineHeight: 22,
    marginVertical: 20,
    fontFamily: constants.DEFAULT_FONT,
  },
});

export default CreateConfirmPullView;
