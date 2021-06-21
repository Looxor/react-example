import React from "react";
import { StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { colors, constants } from "../config";

const ProgressBar = props => {
  const {progress, style, colors, color, backBarColor, height, onLayout} =
    props;
  return (
    <View onLayout={onLayout} style={[styles.containerBar, {height}, style]}>
      {colors ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={colors}
          style={[styles.progressBar, {width: `${progress}%`}]}
        />
      ) : color ? (
        <View
          style={[
            styles.progressBar,
            {backgroundColor: String(color), width: `${progress}%`},
          ]}
        />
      ) : null}
      <View
        style={[
          styles.backBar,
          backBarColor && {backgroundColor: backBarColor},
          {height: height + 1},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerBar: {
    borderRadius: 5,
    height: 11,
    overflow: 'hidden',
  },
  progressBar: {
    height: 11,
    zIndex: 1,
  },
  backBar: {
    backgroundColor: colors.DEFAULT_BACKGROUND,
    borderWidth: constants.onePixel,
    borderColor: colors.SILVER,
    position: 'absolute',
    zIndex: 0,
    width: '100%',
    height: 12,
  },
});

export default ProgressBar;
