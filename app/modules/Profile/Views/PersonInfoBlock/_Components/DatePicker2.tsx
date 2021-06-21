import React, { useState } from "react";
import { colors, constants, strings } from "../../../../../config";
import Moment from "moment";
import DatePicker from "react-native-datepicker";
import { StyleSheet, View } from "react-native";

const DatePicker2 = props => {
  const {containerStyle, selectedDate, onValueChange} = props;
  const before20Years = Moment().subtract(20, 'years').toDate();
  const [value, setValue] = useState(selectedDate);
  const maxDate = Moment().subtract(10, 'years').toDate();
  const minDate = Moment().subtract(80, 'years').toDate();
  const onDateChangeHandler = date => {
    setValue(date);
    onValueChange && onValueChange(date);
  };

  return (
    <View style={[styles.datePickerContainer, containerStyle]}>
      <DatePicker
        format={'DD/MM/YYYY'}
        mode={'date'}
        showIcon={false}
        confirmBtnText={strings.OTHER.DONE}
        cancelBtnText={strings.OTHER.CANCEL}
        date={value}
        defaultDate={value || before20Years}
        minimumDate={minDate}
        maximumDate={maxDate}
        locale={'it'}
        timeZoneOffsetInMinutes={undefined}
        animationType={'fade'}
        androidMode={'spinner'}
        placeholder={strings.PROFILE.HOME.BIRTHDAY}
        style={{height: '100%', width: '100%'}}
        customStyles={{
          btnTextConfirm: {
            fontFamily: constants.DEFAULT_FONT_BOLD,
            color: colors.THEFACULTY,
          },
          btnTextCancel: {
            fontFamily: constants.DEFAULT_FONT,
            color: colors.BLACK,
          },
          placeholderText: {
            justifyContent: 'center',
            alignSelf: 'flex-start',
            fontFamily: constants.DEFAULT_FONT,
            fontSize: 17,
            color: colors.DEFAULT_PLACEHOLDER,
          },
          dateText: {
            justifyContent: 'center',
            marginLeft: 0,
            alignSelf: 'flex-start',
            fontFamily: constants.DEFAULT_FONT,
            fontSize: 17,
          },
          dateInput: {
            borderWidth: 0,
            fontFamily: constants.DEFAULT_FONT,
          },
          datePicker: {
            justifyContent: 'center',
          },
        }}
        onDateChange={onDateChangeHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  datePickerContainer: {},
});

export default DatePicker2;
