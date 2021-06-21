import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { constants } from "../config";

const DEFAULT_CHECKED_ICON = require('../../assets/images/icons/icn_check_selected.png');
const DEFAULT_UNCHECKED_ICON = require('../../assets/images/icons/icn_check.png');

let CHECKED_ICON, UNCHECKED_ICON;

const CheckBoxItem = props => {
  const {
    item: {value, text},
    iconStyle,
    itemStyle,
    textStyle,
    checked,
    onPressItem,
  } = props;
  return (
    <TouchableOpacity
      onPress={() => onPressItem && onPressItem(value)}
      activeOpacity={constants.ACTIVE_OPACITY}
      style={[styles.itemContainer, itemStyle]}>
      <FastImage
        style={[styles.checkboxIcon, iconStyle]}
        source={
          checked
            ? CHECKED_ICON || DEFAULT_CHECKED_ICON
            : UNCHECKED_ICON || DEFAULT_UNCHECKED_ICON
        }
      />
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const CheckBox = props => {
  const {
    containerStyle,
    itemStyle,
    iconStyle,
    checkedIcon,
    uncheckedIcon,
    textStyle,
    defaultCheckedValues,
    onChangeValue,
    data,
    minimumSelected = 1,
    excludeAllNotSelected = false,
  } = props;
  CHECKED_ICON = checkedIcon;
  UNCHECKED_ICON = uncheckedIcon;
  const [checkedValues, setCheckedValues] = useState(
    defaultCheckedValues || [],
  );

  const onPressItemHandler = value => {
    const pos = checkedValues.indexOf(value);
    if (pos === -1) {
      let newValue = !excludeAllNotSelected
        ? checkedValues.concat(value)
        : [].concat(value);
      setCheckedValues(newValue);
      onChangeValue && onChangeValue(newValue);
    } else {
      if (checkedValues.length <= minimumSelected) return;
      let newValue = [...checkedValues];
      newValue.splice(pos, 1);
      setCheckedValues(newValue);
      onChangeValue && onChangeValue(newValue);
    }
  };

  const componentDidMount = () => {
    // setCheckedValues(defaultCheckedValues);
  };

  useEffect(componentDidMount, []);
  return (
    <View style={[styles.container, containerStyle]}>
      {data &&
        data.map((item, index) => (
          <CheckBoxItem
            key={String(index)}
            iconStyle={iconStyle}
            itemStyle={itemStyle}
            textStyle={textStyle}
            item={item}
            checked={checkedValues.indexOf(item.value) > -1}
            onPressItem={onPressItemHandler}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  checkboxIcon: {
    width: 20,
    height: 20,
  },
  text: {
    paddingLeft: 5,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 16,
    lineHeight: 20,
    minWidth: 115,
  },
});

export default CheckBox;
