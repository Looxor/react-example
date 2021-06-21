import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { colors, constants } from "../config";

const DEFAULT_SELECTED0_ICON = require('../../assets/images/icons/icn_switch_left.png');
const DEFAULT_SELECTED1_ICON = require('../../assets/images/icons/icn_switch_right.png');

let SELECTED0_ICON, SELECTED1_ICON;

const RadioBox2 = props => {
  const {
    containerStyle,
    iconStyle,
    selectedIcon,
    unselectedIcon,
    textStyle,
    defaultSelectedValue,
    onChangeValue,
    data,
  } = props;
  SELECTED0_ICON = selectedIcon;
  SELECTED1_ICON = unselectedIcon;

  const [selectedValue, setSelectedValue] = useState(defaultSelectedValue);

  const onPressItemHandler = index => {
    setSelectedValue(data[index].value);
  };

  const onChangeValueHandler = () => {
    onChangeValue && onChangeValue(selectedValue);
  };

  const componentDidMount = () => {
    setSelectedValue(defaultSelectedValue);
  };

  useEffect(onChangeValueHandler, [selectedValue]);
  useEffect(componentDidMount, [defaultSelectedValue]);

  const selected0 = selectedValue === data[0].value;
  const selected1 = selectedValue === data[1].value;
  return (
    <TouchableOpacity
      activeOpacity={constants.ACTIVE_OPACITY}
      onPress={() => onPressItemHandler(selected0 ? 1 : 0)}
      style={[styles.container, containerStyle]}>
      <Text style={[styles.text, styles.text1, textStyle]}>{data[0].text}</Text>
      {selected0 && (
        <FastImage
          style={[styles.selectboxIcon, iconStyle]}
          source={SELECTED0_ICON || DEFAULT_SELECTED0_ICON}
          resizeMode={'contain'}
        />
      )}
      {selected1 && (
        <FastImage
          style={[styles.selectboxIcon, iconStyle]}
          source={SELECTED1_ICON || DEFAULT_SELECTED1_ICON}
          resizeMode={'contain'}
        />
      )}
      <Text style={[styles.text, styles.text2, textStyle]}>{data[1].text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  itemContainer: {
    marginHorizontal: 5,
  },
  selectboxIcon: {
    width: 30,
    height: 18,
  },
  text: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 16,
    lineHeight: 20,
    color: colors.BESTOF2.BG1,
    marginHorizontal: 6,
    minWidth: 120,
  },
  text1: {
    textAlign: 'right',
  },
  text2: {
    textAlign: 'left',
  },
});

export default RadioBox2;
