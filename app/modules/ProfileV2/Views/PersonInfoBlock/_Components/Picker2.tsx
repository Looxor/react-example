import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  ActionSheetIOS,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import {Picker} from 'native-base';
import {colors, constants, strings} from '../../../../../config';

const Picker2 = props => {
  const {style, placeholder, items, onValueChange, selectedValue} = props;
  const [value, setValue] = useState(selectedValue.toString() || '');
  var selectedLabel = (
    items.find(item => item.value.toString() === value.toString()) || {}
  ).label;
  const showIOSPicker = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [strings.OTHER.CANCEL].concat(items.map(item => item.label)),
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          onValueChange && onValueChange('');
          setValue(placeholder);
        } else {
          onValueChange && onValueChange(items[buttonIndex - 1].value);
          setValue(items[buttonIndex - 1].value);
        }
      },
    );
  };
  return (
    <View style={style}>
      {Platform.OS === 'android' && (
        <Picker
          style={[styles.container]}
          mode={'dropdown'}
          // itemTextStyle={{fontFamily: constants.DEFAULT_FONT}}
          itemStyle={styles.itemStyle}
          selectedValue={value}
          onValueChange={value => {
            setValue(value);
            onValueChange && onValueChange(value);
          }}>
          {items &&
            items.map((item, index) => (
              <Picker.Item
                color={colors.SILVER}
                key={String(index)}
                label={item.label}
                value={item.value}
              />
            ))}
        </Picker>
      )}
      {Platform.OS === 'ios' && (
        <TouchableOpacity
          style={[styles.iOSSelectButton]}
          onPress={showIOSPicker}>
          <Text
            style={[
              styles.iOSSelectButtonText,
              selectedLabel === undefined
                ? {color: colors.DEFAULT_PLACEHOLDER}
                : {},
            ]}>
            {selectedLabel === undefined ? placeholder : selectedLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    fontSize: 20,
    fontFamily: constants.DEFAULT_FONT,
    left: -4,
  },
  itemStyle: {
    fontSize: 20,
    fontFamily: constants.DEFAULT_FONT,
  },
  iOSSelectButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  iOSSelectButtonText: {
    fontSize: 17,
    fontFamily: constants.DEFAULT_FONT,
  },
});

export default Picker2;
