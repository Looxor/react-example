import React from "react";
import { Animated, Dimensions, StyleSheet, Text } from "react-native";
import { withSelfMeasure } from "../utils/selfMeasureBehavior";
import { compose } from "recompose";
import buildTransform from "../utils/buildTransform";
import { colors, constants } from "../../../../../config";
import standardFunctions from "../../../../../utils/app/StandardFunctions";

const UniversityInfo = ({
  view,
  animationRange,
  onLayoutSetMeasurements,
  elementX,
  elementY,
  elementHeight,
  elementWidth,
}) => {
  const SCALE = 0.5;
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const animateImage = buildTransform(
    animationRange,
    elementX,
    elementY,
    elementHeight,
    elementWidth,
    (SCREEN_WIDTH - elementWidth * SCALE) / 2,
    20,
    SCALE,
  );
  const animateOpacity = {
    opacity: animationRange.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    }),
  };
  return (
    <Animated.View
      style={[styles.container, animateImage, animateOpacity]}
      onLayout={event => onLayoutSetMeasurements(event)}>
      <Text style={styles.finishDate}>
        {view.start_date &&
          standardFunctions.convert_date_from_rfc_to_string(
            view.start_date,
            true,
          )}
      </Text>
      <Text
        style={styles.testName}
        numberOfLines={2}
        adjustsFontSizeToFit={true}
        minimumFontScale={0.5}>
        {view.test_name}
      </Text>
      <Text style={styles.universityName}>{view.university_name}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishDate: {
    color: colors.LIGHT_SILVER,
    fontSize: 13,
    fontFamily: constants.DEFAULT_FONT,
  },
  universityName: {
    color: colors.LIGHT_SILVER,
    fontSize: 13,
    fontFamily: constants.DEFAULT_FONT,
  },
  testName: {
    color: colors.LIGHT_SILVER,
    fontSize: 20,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

const enhance = compose(withSelfMeasure);

export default enhance(UniversityInfo);
