import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, constants, strings} from '../../../../../config';
import Picker2 from '../../PersonInfoBlock/_Components/Picker2';
import {StandardInputText} from '../../../../../components';
import AnnosPicker from './AnnosPicker';

const ANNO_ITEMS = [
  {label: '1° anno', value: '1'},
  {label: '2° anno', value: '2'},
  {label: '3° anno', value: '3'},
  {label: '4° anno', value: '4'},
  {label: '5° anno', value: '5'},
];

const HighSchoolTypeBlock = props => {
  const {high_school_name, high_school_year, hometown} =
    props.userTypeBlockData;
  const {style, view, onChangeSaveButtonState} = props;

  var [tempHighSchoolName, setTempHighSchoolName] = useState(high_school_name);
  var [tempHighSchoolYear, setTempHighSchoolYear] = useState(high_school_year);
  var [tempHometown, setTempHometown] = useState(hometown);
  const onChangeValue = (key = '', value = '') => {
    if (key) props.userTypeBlockData[key] = value;
    if (key === 'high_school_name') setTempHighSchoolName(value);
    if (key === 'high_school_year') setTempHighSchoolYear(value);
    if (key === 'hometown') setTempHometown(value);
    /*
    const saveButtonState =
      props.userTypeBlockData['high_school_name'] !== ''
      && props.userTypeBlockData['high_school_year'] !== ''
      && props.userTypeBlockData['hometown'] !== ''
     */
    onChangeSaveButtonState && onChangeSaveButtonState(true);
  };
  const componentDidMount = () => {
    onChangeValue('high_school_year', ANNO_ITEMS[0].value);
  };
  const annoSelectHandler = anno => {
    const {value} = anno;
    props.userTypeBlockData['high_school_year'] = value;
    view && view.savePersonInfo({high_school_year: Number(value)});
  };
  const saveHighSchoolNameHandler = e => {
    const value = e.nativeEvent.text;
    props.userTypeBlockData['high_school_name'] = value;
    view && view.savePersonInfo({high_school_name: value});
  };
  const saveHomeTownHandler = e => {
    const value = e.nativeEvent.text;
    props.userTypeBlockData['hometown'] = value;
    view && view.savePersonInfo({hometown: value});
  };
  useEffect(componentDidMount, []);
  return (
    <View style={[styles.container, style]}>
      <StandardInputText
        placeholder={strings.PROFILE.USER_TYPE.INSTITUTION_NAME}
        textContentType={'none'}
        autoCompleteType={'off'}
        defaultValue={high_school_name}
        // onChangeText={text => onChangeValue('high_school_name', text)}
        onSubmitEditing={saveHighSchoolNameHandler}
        returnKeyType={'next'}
        keyboardType={'default'}
        autoCapitalize={'none'}
        showColorBorder={true}
        extra_styles={[styles.inputItem, {alignSelf: 'center'}]}
        selectionColor={colors.DARK_ALOE_TF}
      />
      <AnnosPicker
        selectedAnno={
          ANNO_ITEMS.filter(anno => anno.value === String(high_school_year))[0]
        }
        annos={ANNO_ITEMS}
        onSelectAnno={annoSelectHandler}
        style={{marginBottom: 20}}
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
  staticItemContainer: {marginVertical: 10},
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

export default HighSchoolTypeBlock;
