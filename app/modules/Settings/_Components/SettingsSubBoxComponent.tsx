import React from "react";
import { StyleSheet, Text } from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { colors, constants } from "../../../config";

const SettingsSubBoxComponent = props => {
  return (
    <LinearGradient
      start={{x: 1, y: 0}}
      end={{x: 0, y: 0}}
      colors={[colors.GENERAL.START, colors.GENERAL.FINISH]}
      style={styles.gradientView}>
      <Text style={styles.title}>{props.title}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientView: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
  },
  mainImage: {
    width: 80,
    height: 80,
  },
  title: {
    fontFamily: constants.DEFAULT_FONT,
    color: colors.WHITE,
    fontSize: 18,
  },
});

export default SettingsSubBoxComponent;
