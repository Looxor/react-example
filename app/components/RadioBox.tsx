import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { constants } from "../config";

const DEFAULT_CHECKED_ICON = require("../../assets/images/icons/icn_checkbox_giftcard_checked.png");
const DEFAULT_UNCHECKED_ICON = require("../../assets/images/icons/icn_checkbox_giftcard_unchecked.png");

let CHECKED_ICON, UNCHECKED_ICON;

const RadioBoxItem = props => {
  const {
    item: { value, text },
    iconStyle,
    itemStyle,
    textStyle,
    checked,
    onPressItem
  } = props;
  return (
    <TouchableOpacity
      onPress={() => onPressItem && onPressItem(value)}
      activeOpacity={constants.ACTIVE_OPACITY}
      style={[styles.itemContainer, itemStyle]}>
      <FastImage
        style={[styles.checkboxIcon, iconStyle]}
        source={checked ? CHECKED_ICON : UNCHECKED_ICON}
      />
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const RadioBox = props => {
  const {
    containerStyle,
    itemStyle,
    iconStyle,
    checkedIcon = DEFAULT_CHECKED_ICON,
    uncheckedIcon = DEFAULT_UNCHECKED_ICON,
    textStyle,
    defaultCheckedValue,
    onChangeValue,
    data,
    allowEmptyValue = false
  } = props;
  CHECKED_ICON = checkedIcon;
  UNCHECKED_ICON = uncheckedIcon;
  const [checkedValue, setCheckedValue] = useState(
    defaultCheckedValue
  );

  const onPressItemHandler = value => {
    if(checkedValue === value) {
      allowEmptyValue && setCheckedValue(undefined);
      allowEmptyValue && onChangeValue && onChangeValue(value);
    } else {
      setCheckedValue(value);
      onChangeValue && onChangeValue(value);
    }
  };

  const onChangeValueHandler = () => {

  };

  const componentDidMount = () => {
    setCheckedValue(defaultCheckedValue);
  };

  useEffect(onChangeValueHandler, [checkedValue]);
  useEffect(componentDidMount, [defaultCheckedValue]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View />
      {data &&
      data.map((item, index) => (
        <RadioBoxItem
          key={String(index)}
          iconStyle={iconStyle}
          itemStyle={itemStyle}
          textStyle={textStyle}
          item={item}
          checked={checkedValue === item.value}
          onPressItem={onPressItemHandler}
        />
      ))}
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    flexDirection: "row",
    justifyContent: "space-around"
  },
  itemContainer: {
    flexDirection: "row",
    marginVertical: 10
  },
  checkboxIcon: {
    width: 20,
    height: 20
  },
  text: {
    paddingLeft: 5,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 16,
    lineHeight: 20
  }
});

export default RadioBox;
