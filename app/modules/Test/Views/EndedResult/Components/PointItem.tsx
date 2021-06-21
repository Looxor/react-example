import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { colors, constants, strings } from "../../../../../config";

const POINT_TYPE = {
  CORRECT: 0,
  WRONG: 1,
  NO_ANSWER: 2,
};

const PointItem = props => {
  const {type, value, count} = props;
  let icon_source,
    point_text,
    point_value = String(value || '0'),
    point_sign,
    label_count = String(count || '0');
  switch (type) {
    case POINT_TYPE.CORRECT:
      icon_source = require('../../../../../../assets/images/icons/icn_correct_answer.png');
      point_text = strings.TEST.ENDED_RESULT.CORRECT_ANSWER_TITLE;
      point_sign = '+';
      break;
    case POINT_TYPE.WRONG:
      icon_source = require('../../../../../../assets/images/icons/icn_wrong_answer.png');
      point_text = strings.TEST.ENDED_RESULT.WRONG_ANSWER_TITLE;
      point_sign = '-';
      break;
    case POINT_TYPE.NO_ANSWER:
      icon_source = require('../../../../../../assets/images/icons/icn_no_answer.png');
      point_text = strings.TEST.ENDED_RESULT.NON_ANSWER_TITLE;
      point_sign = '-';
      break;
  }
  return (
    <View style={styles.container}>
      <View style={styles.pointDescContainer}>
        {icon_source && (
          <FastImage style={styles.pointIcon} source={icon_source} />
        )}
        <Text style={styles.pointText}>
          {label_count} {point_text}
        </Text>
      </View>
      <Text style={styles.pointValue}> {point_value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 7,
  },
  pointDescContainer: {
    flexDirection: 'row',
  },
  pointIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginTop: 2.5,
  },
  pointText: {
    fontSize: 18,
    color: colors.darkGray,
    alignSelf: 'flex-start',
    fontFamily: constants.DEFAULT_FONT,
  },
  pointValue: {
    fontSize: 18,
    color: colors.darkGray,
    alignSelf: 'flex-end',
    fontFamily: constants.DEFAULT_FONT_BOLD,
  },
});

export default PointItem;
export {POINT_TYPE};
