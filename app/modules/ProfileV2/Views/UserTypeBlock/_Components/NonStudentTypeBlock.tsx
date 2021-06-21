import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, constants, strings} from '../../../../../config';
import {StandardInputText} from '../../../../../components';

const NonStudentTypeBlock = props => {
  const {education_level, hometown} = props.userTypeBlockData;
  const {style, view, onChangeSaveButtonState} = props;

  var [tempEducationLevel, setTempEducationLevel] = useState(education_level);
  var [tempHometown, setTempHometown] = useState(hometown);

  const saveEducationHandler = e => {
    const value = e.nativeEvent.text;
    props.userTypeBlockData['education_level'] = value;
    view && view.savePersonInfo({education_level: value});
  };
  const saveHomeTownHandler = e => {
    const value = e.nativeEvent.text;
    props.userTypeBlockData['hometown'] = value;
    view && view.savePersonInfo({hometown: value});
  };

  return (
    <View style={[styles.container, style]}>
      <StandardInputText
        placeholder={strings.PROFILE.USER_TYPE.EDUCATION_LEVEL}
        textContentType={'none'}
        autoCompleteType={'off'}
        defaultValue={education_level}
        // onChangeText={text => onChangeValue('education_level', text)}
        onSubmitEditing={saveEducationHandler}
        returnKeyType={'next'}
        keyboardType={'default'}
        autoCapitalize={'none'}
        showColorBorder={true}
        extra_styles={[styles.inputItem, {alignSelf: 'center'}]}
        selectionColor={colors.DARK_ALOE_TF}
      />
      <StandardInputText
        placeholder={strings.PROFILE.USER_TYPE.CITY}
        textContentType={'none'}
        autoCompleteType={'off'}
        defaultValue={hometown}
        // onChangeText={text => onChangeValue('hometown', text)}
        onSubmitEditing={saveHomeTownHandler}
        returnKeyType={'next'}
        keyboardType={'default'}
        autoCapitalize={'none'}
        showColorBorder={true}
        extra_styles={[styles.inputItem, {alignSelf: 'center'}]}
        selectionColor={colors.DARK_ALOE_TF}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  inputItem: {
    width: '100%',
    height: 53,
    borderWidth: 3,
    borderColor: colors.LIGHT_ALOE_TF,
    borderRadius: 14,
    paddingLeft: 10,
    fontSize: 17,
    fontFamily: constants.DEFAULT_FONT,
    color: colors.DARK_ALOE_TF,
    marginTop: 0,
    marginBottom: 15,
    zIndex: 1,
    backgroundColor: colors.WHITE,
    padding: 5,
    paddingRight: 10,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 0.5},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 0.2,
  },
  staticItemContainer: {marginTop: 30},
  staticItemLabel: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    color: colors.gray,
  },
  staticItemText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 18,
    color: colors.darkGray,
  },
  itemContainer: {
    flexDirection: 'column',
    marginTop: 20,
    marginLeft: 10,
  },
  itemLabel: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    color: colors.gray,
  },
  itemValue: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 18,
    color: colors.darkGray,
  },
});

export default NonStudentTypeBlock;
