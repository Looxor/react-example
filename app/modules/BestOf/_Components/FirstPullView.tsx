import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Overlay } from "teaset";
import { colors, strings } from "../../../config";

import Storage from "../../../utils/app/Storage";
import constants from "../../../config/constants";

/*
  TYPES:
  [0]: BestOf guide
  [1]: Contest guide
 */
interface Props {
  type: [0, 1];
}

let overlayView = type => (
  <Overlay.PullView
    containerStyle={styles.overlayContainer}
    side={'bottom'}
    modal={false}
    rootTransform={[]}>
    <View style={styles.overlay}>
      <Image
        style={styles.gameIcon}
        source={
          type == 0
            ? require('../../../../assets/images/icons/icn_game_red.png')
            : type == 1
            ? require('../../../../assets/images/icons/icn_game_red.png')
            : ''
        }
      />
      <Text style={styles.overlayText}>
        {type == 0
          ? strings.BESTOF.HOME_SCREEN.FIRST_MESSAGE
          : type == 1
          ? strings.CONTEST.HOME_SCREEN.FIRST_MESSAGE
          : ''}
      </Text>
    </View>
  </Overlay.PullView>
);

const FirstPullView = Props => {
  const componentDidMount = () => {
    const openPullView = async () => {
      const key = 'openedPullView1';
      const everOpened = await Storage.get(key);
      await Storage.set(key, 'YES');
      if (everOpened !== 'YES') {
        Overlay.show(overlayView(Props.type));
      }
    };
    openPullView();
    return componentWillUnmount;
  };
  const componentWillUnmount = () => {};
  useEffect(componentDidMount, []);

  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  overlayContainer: {
    backgroundColor: 'transparent',
  },
  gameIcon: {
    width: 75,
    height: 75,
    marginTop: -20,
  },
  overlay: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    minWidth: 300,
    minHeight: 260,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  overlayText: {
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FirstPullView;
