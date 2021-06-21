import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors, constants } from "../../../../../config";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";
import standardFunctions from "../../../../../utils/app/StandardFunctions";

const ResultItem = props => {
  const navigation = useNavigation();
  const {
    test_name,
    test_university_name,
    correct_answer_count,
    wrong_answer_count,
    instance_name,
    start_date,
  } = props;

  return (
    <TouchableOpacity
      onPress={props.onPressResultItem}
      style={{...styles.container, ...props.style}}>
      <View style={styles.titleBar}>
        <Text style={styles.titleText}>{instance_name}</Text>
        <View style={styles.pointContainers}>
          <View style={styles.pointContainer}>
            <FastImage
              style={styles.pointImage}
              source={require('../../../../../../assets/images/icons/icn_correct_white_V.png')}
            />
            <Text style={styles.pointValue}>{correct_answer_count}</Text>
          </View>
          <View style={styles.pointContainer}>
            <FastImage
              style={styles.pointImage2}
              source={require('../../../../../../assets/images/icons/icn_wrong_white.png')}
            />
            <Text style={styles.pointValue}>{wrong_answer_count}</Text>
          </View>
        </View>
      </View>
      <View style={styles.testInfoContainer}>
        <View style={styles.testInfoTexts}>
          <Text
            numberOfLines={2}
            minimumFontScale={0.5}
            adjustsFontSizeToFit={true}
            style={styles.testName}>
            {test_name}
          </Text>
          <Text style={styles.universityName}>
            {standardFunctions.convert_date_from_rfc_to_string_with_hours(
              start_date,
              true,
            )}
          </Text>
        </View>
        <FastImage
          style={styles.rightArrowIcon}
          source={require('../../../../../../assets/images/icons/icn_arrow_right_blu.png')}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.THEFACULTY,
    borderWidth: 1.5,
    borderRadius: 10,
    width: '100%',
    height: 140,
    flexDirection: 'column',
    overflow: 'hidden',
  },
  titleBar: {
    backgroundColor: colors.THEFACULTY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 40,
  },
  titleText: {
    color: colors.WHITE,
    fontSize: 16,
    marginBottom: 2,
    marginLeft: 5,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
  },
  pointContainers: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  pointContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    marginLeft: 15,
  },
  pointImage: {
    width: 14,
    height: 11,
  },
  pointImage2: {
    width: 10,
    height: 11,
  },
  pointValue: {
    fontSize: 17,
    color: colors.WHITE,
    marginHorizontal: 5,
    fontFamily: constants.DEFAULT_FONT_BOLD,
  },
  testInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  testInfoTexts: {},
  testName: {
    fontSize: 17,
    color: colors.gray,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    marginRight: 20,
  },
  universityName: {
    color: colors.THEFACULTY,
    fontSize: 15,
    fontFamily: constants.DEFAULT_FONT,
    marginRight: 10,
    marginTop: 8,
  },
  rightArrowIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 2,
  },
});

export default ResultItem;
