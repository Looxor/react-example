import React from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { StyleSheet, Text } from "react-native";
import { colors, strings } from "../../../config";
import constants from "../../../config/constants";
import Strings from "../../../utils/misc/TextComponents";

const DIAMETER = 110;
const PointsBox = props => {
  const {
    diameter,
    currentValue,
    displayValue,
    maxValue,
    color,
    textColor,
    start_color,
    finish_color,
  } = props;

  return (
    <AnimatedCircularProgress
      style={styles.pointBox}
      duration={0}
      size={diameter || DIAMETER}
      fill={
        (currentValue / maxValue) * 100 <= 100
          ? (currentValue / maxValue) * 100
          : 100
      }
      padding={2}
      width={6}
      rotation={0}
      lineCap={'round'}
      tintColorSecondary={finish_color ? finish_color : colors.THEFACULTY}
      tintColor={start_color ? start_color : colors.THEFACULTY}>
      {() => (
        <>
          <Text
            adjustsFontSizeToFit
            minimumFontScale={0.4}
            numberOfLines={1}
            style={[styles.pointBoxText1, {color: textColor || color}]}>
            {Strings.currencyFormat(displayValue)}
          </Text>
          <Text style={[styles.pointBoxText2, {color: textColor || color}]}>
            {strings.BESTOF.HOME_SCREEN_POINTS_CAPTION}
          </Text>
        </>
      )}
    </AnimatedCircularProgress>
  );
};

const styles = StyleSheet.create({
  pointBox: {
    borderRadius: 100,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {},
  pointBoxText1: {
    marginTop: -2,
    fontSize: 28,
    fontWeight: 'bold',
    width: 80,
    textAlign: 'center',
  },
  pointBoxText2: {
    fontFamily: constants.DEFAULT_FONT,
    marginTop: -3,
    fontSize: 14,
    color: colors.BESTOF.DEFAULT,
  },
});

export default PointsBox;
