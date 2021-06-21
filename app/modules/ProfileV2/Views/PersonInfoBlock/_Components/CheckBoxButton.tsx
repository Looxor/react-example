import React, {useState} from 'react';
import {CheckBox} from 'native-base';
import {colors} from '../../../../../config';
import {StyleSheet, TouchableOpacity} from 'react-native';

const CheckBoxButton = props => {
  const {style, checked, onValueChange} = props;
  const [value, setValue] = useState(checked);

  const onPressHandler = () => {
    const _value = !value;
    setValue(_value);
    onValueChange && onValueChange(_value);
  };

  return (
    <TouchableOpacity style={style} onPress={onPressHandler}>
      <CheckBox
        style={{
          ...styles.mainEmailCheckBox,
          borderColor: value ? colors.THEFACULTY : colors.gray,
          backgroundColor: value ? colors.THEFACULTY : colors.WHITE,
        }}
        color={colors.THEFACULTY}
        checked={value}
        onPress={onPressHandler}
      />
      {props.children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainEmailCheckBox: {borderRadius: 10, marginLeft: -10},
});

export default CheckBoxButton;
