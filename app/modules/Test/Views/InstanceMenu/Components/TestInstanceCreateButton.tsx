import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { colors, constants, strings } from "../../../../../config";

const TestInstanceCreateButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, props.style]}>
      <FastImage
        style={styles.plusIcon}
        source={require('../../../../../../assets/images/icons/icn_plus_blue.png')}
      />
      <Text style={styles.text}>
        {strings.TEST.INSTANCE_MENU.CREATE_NEW_BUTTON}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderStyle: 'dashed',
    borderColor: colors.THEFACULTY,
    borderWidth: constants.onePixel * 2,
    borderRadius: 10,
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 25,
  },
  plusIcon: {width: 20, height: 20},
  text: {
    color: colors.THEFACULTY,
    fontSize: 18,
    marginTop: 5,
    marginLeft: 10,
    lineHeight: 20,
    fontFamily: constants.DEFAULT_FONT,
  },
});

export default TestInstanceCreateButton;
