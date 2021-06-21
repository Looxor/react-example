import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Slider from "@react-native-community/slider";

import { colors, constants } from "../../../config";

const SliderComponent = props => {
  const {title, value, style} = props;
  const attr =
    Platform.OS === 'android'
      ? {
          thumbImage: require('../../../../assets/images/icons/icn_slider_thumb.png'),
        }
      : null;
  return (
    <View style={[styles.sliderContainer, style]}>
      <Text style={styles.sliderText}>{title}</Text>
      <Slider
        onSlidingComplete={value => props.onValueChange(value)}
        value={value}
        maximumValue={1}
        style={styles.slider}
        minimumTrackTintColor={colors.THEFACULTY}
        {...attr}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: 7,
    paddingHorizontal: 10,
    height: 90,
  },
  slider: {
    width: '100%',
    height: 20,
  },
  sliderText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: 12,
    marginBottom: 10,
  },
});

export default SliderComponent;
