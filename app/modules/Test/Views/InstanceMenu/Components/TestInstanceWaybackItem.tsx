import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";

import { colors, constants, strings } from "../../../../../config";
import PopoverItem from "../../../../../components/PopoverItem";

const TestInstanceWaybackItem = props => {
  const {onPressItem, test_instance, new_created} = props;
  const {name, test_university_name} = test_instance;

  return (
    <>
      {new_created && (
        <PopoverItem text={strings.TEST.TEST_SCREEN.SUCCESS_CREATED} />
      )}
      <TouchableOpacity
        disabled={props.disabled}
        onPress={onPressItem}
        style={[
          styles.blockButtonItem,
          props.disabled === false ? styles.disabled : {},
          props.style,
        ]}>
        <Text
          style={[
            styles.testName,
            props.disabled === false ? styles.disabledText : {},
          ]}>
          {name}
        </Text>
        <Text
          style={[
            styles.universityName,
            props.disabled === false ? styles.disabledText : {},
          ]}>
          {test_university_name}
        </Text>
        <FastImage
          style={styles.arrowIcon}
          source={require('../../../../../../assets/images/icons/icn_arrow_right_blu.png')}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  blockButtonItem: {
    borderWidth: 1,
    borderColor: colors.THEFACULTY,
    borderRadius: 7,
    padding: 18,
    marginHorizontal: 2,
    justifyContent: 'center',
    height: 90,
    marginBottom: 10,
    overflow: 'hidden',
  },
  testName: {
    fontSize: 17,
    marginBottom: 2,
    fontFamily: constants.DEFAULT_FONT_BOLD,
  },
  universityName: {
    fontSize: 14,
    color: colors.gray,
    fontFamily: constants.DEFAULT_FONT,
  },
  arrowIcon: {
    position: 'absolute',
    right: 10,
    width: 22,
    height: 22,
  },
  disabled: {
    backgroundColor: colors.LIGHT_SILVER,
    borderColor: colors.lightGray,
    borderWidth: constants.onePixel,
  },
  disabledText: {
    opacity: 0.5,
  },
});

export default TestInstanceWaybackItem;
