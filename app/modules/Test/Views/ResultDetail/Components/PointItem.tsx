import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { colors, strings } from "../../../../../config";

const PointItem = props => {
  const {
    correct_answer_count,
    wrong_answer_count,
    no_answer_count,
    correct_answer_point,
    wrong_answer_point,
    no_answer_point,
    total_point,
  } = props;
  const icon_source_correct = require('../../../../../../assets/images/icons/icn_correct_white.png');
  const icon_source_wrong = require('../../../../../../assets/images/icons/icn_wrong_white_x.png');
  const icon_source_no = require('../../../../../../assets/images/icons/icn_no_answer_white.png');

  return (
    <View style={styles.container}>
      <View style={styles.pointsGroupContainer}>
        <View style={styles.pointContainer}>
          <View style={styles.countContainer}>
            <FastImage style={styles.pointIcon} source={icon_source_correct} />
            <Text style={styles.pointText}>{correct_answer_count}</Text>
          </View>
          <Text style={styles.pointText}>
            +{correct_answer_point} {strings.TEST.RESULT_DETAIL.UNIT_POINT}
          </Text>
        </View>
        <View style={styles.pointContainer}>
          <View style={styles.countContainer}>
            <FastImage style={styles.pointIcon} source={icon_source_wrong} />
            <Text style={styles.pointText}>{wrong_answer_count}</Text>
          </View>
          <Text style={styles.pointText}>
            -{wrong_answer_point} {strings.TEST.RESULT_DETAIL.UNIT_POINT}
          </Text>
        </View>
        <View style={styles.pointContainer}>
          <View style={styles.countContainer}>
            <FastImage style={styles.pointIcon} source={icon_source_no} />
            <Text style={styles.pointText}>{no_answer_count}</Text>
          </View>
          <Text style={styles.pointText}>
            +{no_answer_point} {strings.TEST.RESULT_DETAIL.UNIT_POINT}
          </Text>
        </View>
      </View>
      <Text style={styles.pointValue}>
        {strings.TEST.RESULT_DETAIL.TOTAL_LABEL}:
        <Text style={styles.pointValueBold}>
          {total_point} {strings.TEST.RESULT_DETAIL.UNIT_POINT}.
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsGroupContainer: {
    flexDirection: 'row',
  },
  pointContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
  },
  countContainer: {
    flexDirection: 'row',
  },
  pointIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginTop: 2.5,
  },
  pointText: {
    fontSize: 14,
    alignSelf: 'flex-start',
    color: colors.LIGHT_SILVER,
  },
  pointValue: {
    textAlign: 'center',
    width: '100%',
    fontSize: 18,
    color: colors.WHITE,
    marginTop: 10,
  },
  pointValueBold: {
    fontWeight: 'bold',
  },
});

export default PointItem;
