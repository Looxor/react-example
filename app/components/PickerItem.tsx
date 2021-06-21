import React, { useState } from "react";
import { ActionSheetIOS, Picker, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import {Picker} from '@react-native-picker/picker';
import FastImage from "react-native-fast-image";
import { colors, constants } from "../config";

const PickerItem = props => {
  const {
    label,
    labelStyle,
    items,
    placeholder,
    defaultValue,
    initialValue,
    onChangeValue,
    textStyle,
    containerStyle,
    pickerContainerStyle,
  } = props;

  const [value, setValue] = useState(initialValue || defaultValue);

  const onPressPickerIOS = () => {
    const labels = ['Cancel'],
      values = [''];
    items.map(item => {
      labels.push(item.label);
      values.push(item.value);
    });

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: labels,
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else {
          const value = values[buttonIndex];
          setValue(value);
          onChangeValue && onChangeValue(value);
        }
      },
    );
  };

  return (
    <View style={[styles_filter.container, containerStyle]}>
      {label && (
        <Text style={[styles_filter.itemLabel, labelStyle]}>{label}</Text>
      )}
      <View style={[styles_filter.itemContainer4Picker, pickerContainerStyle]}>
        {Platform.OS === 'ios' ? (
          <TouchableOpacity
            onPress={() => onPressPickerIOS()}
            style={styles_filter.itemInputContainer4PickerIOS}>
            <Text
              style={[
                styles_filter.itemInputContainer4PickerIOSText,
                textStyle,
              ]}>
              {(items.filter(item => item.value === value)[0] || {}).label ||
                placeholder}
            </Text>
          </TouchableOpacity>
        ) : (
          <Picker
            mode={'dialog'}
            selectedValue={value}
            style={[styles_filter.itemInputContainer4Picker, textStyle]}
            onValueChange={(itemValue, itemIndex) => {
              setValue(itemValue);
              onChangeValue && onChangeValue(itemValue);
            }}>
            <Picker.Item label={placeholder} value={''} />
            {items.map(item => (
              <Picker.Item label={item.label} value={item.value} />
            ))}
          </Picker>
        )}
        <FastImage
          source={require('../../assets/images/icons/icn_arrow_down_blu.png')}
          style={styles_filter.arrowDownIcon4Picker}
        />
      </View>
    </View>
  );
};

const styles_filter = StyleSheet.create({
  container: {
    marginHorizontal: 30,
  },
  itemContainer4Picker: {
    borderBottomColor: colors.gray,
    borderBottomWidth: constants.onePixel,
    marginBottom: 20,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  itemInputContainer4Picker: {
    width: 400,
    marginLeft: -5,
    height: 32,
    marginBottom: -2,
    backgroundColor: 'transparent',
    zIndex: 2,
    fontFamily: constants.DEFAULT_FONT,
  },
  itemInputContainer4PickerIOS: {
    width: 400,
    height: 32,
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  itemInputContainer4PickerIOSText: {
    lineHeight: 30,
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT,
  },
  placeholder4Picker: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    zIndex: 1,
  },
  arrowDownIcon4Picker: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 10,
    backgroundColor: colors.WHITE,
    zIndex: 3,
  },
  itemLabel: {
    fontSize: 17,
    color: colors.gray,
    fontFamily: constants.DEFAULT_FONT,
  },
});

export default PickerItem;
