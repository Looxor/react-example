import React from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import { withSelfMeasure } from "../utils/selfMeasureBehavior";
import { compose } from "recompose";
import buildTransform from "../utils/buildTransform";
import { colors, constants, strings } from "../../../../../config";
import FastImage from "react-native-fast-image";

const UniversityInfo = ({
  view,
  animationRange,
  onLayoutSetMeasurements,
  elementX,
  elementY,
  elementHeight,
  elementWidth,
}) => {
  const SCALE = 1;
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const animateImage = buildTransform(
    animationRange,
    elementX,
    elementY,
    elementHeight,
    elementWidth,
    40,
    32,
    SCALE,
  );
  const animateImage2 = buildTransform(
    animationRange,
    elementX,
    elementY,
    elementHeight,
    elementWidth,
    SCREEN_WIDTH - 145,
    48,
    SCALE,
  );
  const animateOpacity = {
    opacity: animationRange.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    }),
  };
  const {
    correct_answer_sum,
    wrong_answer_sum,
    no_answer_sum,
    correct_answer_score,
    wrong_answer_score,
    no_answer_score,
    total_score,
  } = view;

  const icon_source_correct = require('../../../../../../assets/images/icons/icn_correct_white.png');
  const icon_source_wrong = require('../../../../../../assets/images/icons/icn_wrong_white_x.png');
  const icon_source_no = require('../../../../../../assets/images/icons/icn_no_answer_white.png');

  return (
    <Animated.View
      style={[styles.container, animateImage]}
      onLayout={event => onLayoutSetMeasurements(event)}>
      <View style={styles.container2}>
        <View style={styles.pointsGroupContainer}>
          <View style={styles.pointContainer}>
            <View style={styles.countContainer}>
              <FastImage
                style={styles.pointIcon}
                source={icon_source_correct}
              />
              <Text style={styles.pointText}>{correct_answer_sum}</Text>
            </View>
            <Animated.Text style={[styles.pointText, animateOpacity]}>
              {correct_answer_score} {strings.TEST.RESULT_DETAIL.UNIT_POINT}
            </Animated.Text>
          </View>
          <View style={styles.pointContainer}>
            <View style={styles.countContainer}>
              <FastImage style={styles.pointIcon} source={icon_source_wrong} />
              <Text style={styles.pointText}>{wrong_answer_sum}</Text>
            </View>
            <Animated.Text style={[styles.pointText, animateOpacity]}>
              {wrong_answer_score} {strings.TEST.RESULT_DETAIL.UNIT_POINT}
            </Animated.Text>
          </View>
          <View style={styles.pointContainer}>
            <View style={styles.countContainer}>
              <FastImage style={styles.pointIcon} source={icon_source_no} />
              <Text style={styles.pointText}>{no_answer_sum}</Text>
            </View>
            <Animated.Text style={[styles.pointText, animateOpacity]}>
              {no_answer_score} {strings.TEST.RESULT_DETAIL.UNIT_POINT}
            </Animated.Text>
          </View>
        </View>
        <Animated.View style={[styles.pointValueContainer, animateImage2]}>
          <Animated.Text style={[styles.pointValue, animateOpacity]}>
            {strings.TEST.RESULT_DETAIL.TOTAL_LABEL}:
          </Animated.Text>
          <Text style={[styles.pointValue, styles.pointValueBold]}>
            {total_score} {strings.TEST.RESULT_DETAIL.UNIT_POINT}.
          </Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 70,
    marginTop: 15,
  },
  container2: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsGroupContainer: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pointContainer: {
    flexDirection: 'column',
  },
  countContainer: {
    flexDirection: 'row',
  },
  pointIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginTop: 2,
  },
  pointText: {
    fontSize: 16,
    color: colors.LIGHT_SILVER,
    fontFamily: constants.DEFAULT_FONT,
  },
  pointValueContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 3,
  },
  pointValue: {
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 18,
    color: colors.WHITE,
    marginHorizontal: 5,
  },
  pointValueBold: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
  },
});

const enhance = compose(withSelfMeasure);

export default enhance(UniversityInfo);
