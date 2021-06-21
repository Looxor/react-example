import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, constants, strings } from "../../../../../config";
import { StandardInputText } from "../../../../../components";

const NonStudentTypeBlock = props => {
  const {education_level, hometown} = props.userTypeBlockData;
  const {style, mode, onChangeSaveButtonState} = props;

  var [tempEducationLevel, setTempEducationLevel] = useState(education_level);
  var [tempHometown, setTempHometown] = useState(hometown);
  const onChangeValue = (key = '', value = '') => {
    if (key) props.userTypeBlockData[key] = value;
    if (key === 'education_level') setTempEducationLevel(value);
    if (key === 'hometown') setTempHometown(value);
    // const saveButtonState = props.userTypeBlockData['education_level'] !== '' && props.userTypeBlockData['hometown'] !== ''
    onChangeSaveButtonState && onChangeSaveButtonState(true);
  };
  const componentDidMount = () => {
    onChangeValue();
  };
  useEffect(componentDidMount, []);
  return (
    <View style={[styles.container, style]}>
      {mode === 'edit' && (
        <>
          <StandardInputText
            placeholder={strings.PROFILE.USER_TYPE.EDUCATION_LEVEL}
            textContentType={'none'}
            autoCompleteType={'off'}
            defaultValue={education_level}
            onChangeText={text => onChangeValue('education_level', text)}
            returnKeyType={'next'}
            keyboardType={'default'}
            autoCapitalize={'none'}
            showColorBorder={true}
            showBlueBorder={tempEducationLevel !== ''}
            showErrorBorder={tempEducationLevel === ''}
            extra_styles={[styles.inputItem, {alignSelf: 'center'}]}
          />
          <StandardInputText
            placeholder={strings.PROFILE.USER_TYPE.CITY}
            textContentType={'none'}
            autoCompleteType={'off'}
            defaultValue={hometown}
            onChangeText={text => onChangeValue('hometown', text)}
            returnKeyType={'next'}
            keyboardType={'default'}
            autoCapitalize={'none'}
            showColorBorder={true}
            showBlueBorder={tempHometown !== ''}
            showErrorBorder={tempHometown === ''}
            extra_styles={[styles.inputItem, {alignSelf: 'center'}]}
          />
        </>
      )}
      {mode === 'view' && (
        <>
          <View style={styles.itemContainer}>
            <Text style={styles.itemLabel}>
              {strings.PROFILE.USER_TYPE.EDUCATION_LEVEL}
            </Text>
            <Text style={styles.itemValue}>{education_level}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.itemLabel}>
              {strings.PROFILE.USER_TYPE.CITY}
            </Text>
            <Text style={styles.itemValue}>{hometown}</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  inputItem: {
    width: '100%',
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.SILVER,
    borderRadius: 14,
    paddingLeft: 10,
    fontSize: 17,
    fontFamily: constants.DEFAULT_FONT,
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
