import React from "react";
import { StyleSheet } from "react-native";

import LinearGradient from "react-native-linear-gradient";
import FastImage from "react-native-fast-image";

import { colors } from "../../../config";

const SettingsHomeBoxComponent = props => {
  const {text, name} = props;

  return (
    <LinearGradient
      start={{x: 1, y: 0}}
      end={{x: 0, y: 0}}
      colors={[colors.GENERAL.START, colors.GENERAL.FINISH]}
      style={styles.gradientView}>
      <FastImage
        style={styles.mainImage}
        source={require('../../../../assets/images/icons/icn_gear.png')}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientView: {
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
  },
  mainImage: {
    width: 75,
    height: 75,
  },
});

export default SettingsHomeBoxComponent;
