import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, constants, strings} from '../../../../../config';
import {StandardInputText} from '../../../../../components';
import SearchListPopoverV2 from '../../../../../components/SearchListPopoverV2';
import {CallServerPromise} from '../../../../../utils/app/CallServer';
import AnnosPicker from './AnnosPicker';
import CheckBox from '../../../../../components/CheckBox';
import FastImage from 'react-native-fast-image';
import standardFunctions from '../../../../../utils/app/StandardFunctions';

const ANNO_ITEMS = [
  {label: '1° anno', value: '1'},
  {label: '2° anno', value: '2'},
  {label: '3° anno', value: '3'},
  {label: '4° anno', value: '4'},
  {label: '5° anno', value: '5'},
  {label: '6° anno', value: '6'},
];

const FUORI_ITEMS = [
  {text: strings.PROFILE.USER_TYPE.FUORI_YES, value: 'YES'},
  {text: strings.PROFILE.USER_TYPE.FUORI_NO, value: 'NO'},
];

const UniversityTypeBlock = props => {
  const {major_name, university_year, hometown, resident_student} =
    props.userTypeBlockData;
  const {style, view, onChangeSaveButtonState} = props;

  var [tempUnivYear, setTempUnivYear] = useState(university_year);
  var [tempHometown, setTempHometown] = useState(hometown);
  var [tempResidentStudent, setTempResidentStudent] =
    useState(resident_student);
  const [majorName, setMajorName] = useState(major_name || '');
  const onChangeValue = (key = '', value = undefined) => {
    if (key) props.userTypeBlockData[key] = value;
    if (key === 'university_year') setTempUnivYear(value);
    if (key === 'hometown') setTempHometown(value);
    if (key === 'resident_student') setTempResidentStudent(value);

    onChangeSaveButtonState && onChangeSaveButtonState(true);
  };
  const componentDidMount = () => {
    if (props.userTypeBlockData['university_year'] === undefined) {
      props.userTypeBlockData['university_year'] = ANNO_ITEMS[0].value;
    }

    if (props.userTypeBlockData['resident_student'] === undefined) {
      props.userTypeBlockData['resident_student'] = FUORI_ITEMS[0].value;
    }
    onChangeValue();
  };
  useEffect(componentDidMount, []);
  const openMajorList = () => {
    standardFunctions.play_tap_sound();
    SearchListPopoverV2().show({
      onSelectItem,
      searchFunc,
      fetchSearchResultFunc,
      searchPlaceholder: strings.SIGNUP.FIFTH_SCREEN.INPUT_MAJOR,
    });
  };
  const onSelectItem = major => {
    const {id, name} = major;
    props.userTypeBlockData['major_id'] = id || '';
    props.userTypeBlockData['major_name'] = name || '';
    setMajorName(name || '');
    view && view.savePersonInfo({major_id: id});
  };
  const annoSelectHandler = anno => {
    const {value} = anno;
    props.userTypeBlockData['university_year'] = value;
    view && view.savePersonInfo({university_year: Number(value)});
  };
  const saveHomeTownHandler = e => {
    const value = e.nativeEvent.text;
    props.userTypeBlockData['hometown'] = value;
    view && view.savePersonInfo({hometown: value});
  };
  const selectFuoriHandler = value => {
    standardFunctions.play_tap_sound();
    const resident_student = value.indexOf('YES') > -1;
    props.userTypeBlockData['resident_student'] = resident_student;
    view && view.savePersonInfo({resident_student});
  };
  const searchFunc = value => {
    return CallServerPromise.search_majors({pattern: value});
  };
  const fetchSearchResultFunc = major => ({
    id: major.major_id,
    name: major.name,
    faculties: major.faculties,
  });

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        activeOpacity={constants.ACTIVE_OPACITY}
        onPress={openMajorList}
        style={[
          styles.inputItem,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}>
        {majorName !== '' && major_name !== undefined && (
          <Text style={styles.inputItemText}>{majorName}</Text>
        )}
        {(majorName === '' || major_name === undefined) && (
          <Text style={[styles.inputItemText, {color: colors.DARK_ALOE_TF}]}>
            {strings.PROFILE.USER_TYPE.COURSE_OF_STUDY}
          </Text>
        )}
        <FastImage
          resizeMode={'contain'}
          style={[styles.arrowIcon]}
          source={require('../../../../../../assets/images/icons/icn_right_dark_aloe.png')}
        />
      </TouchableOpacity>
      <AnnosPicker
        selectedAnno={
          ANNO_ITEMS.filter(anno => anno.value === String(university_year))[0]
        }
        annos={ANNO_ITEMS}
        onSelectAnno={annoSelectHandler}
      />
      <StandardInputText
        placeholder={strings.PROFILE.USER_TYPE.CITY}
        textContentType={'none'}
        autoCompleteType={'off'}
        defaultValue={hometown}
        // onChangeText={text => onChangeValue("hometown", text)}
        onSubmitEditing={saveHomeTownHandler}
        returnKeyType={'next'}
        keyboardType={'default'}
        autoCapitalize={'none'}
        showColorBorder={false}
        selectionColor={colors.LIGHT_ALOE_TF}
        showBlueBorder={tempHometown !== ''}
        showErrorBorder={tempHometown === ''}
        extra_styles={[
          {
            alignSelf: 'center',
            width: '100%',
            borderWidth: 3,
            borderColor: colors.LIGHT_ALOE_TF,
            color: colors.DARK_ALOE_TF,
          },
        ]}
      />
      <CheckBox
        checkedIcon={require('../../../../../../assets/images/icons/icn_checkbox_checked.png')}
        uncheckedIcon={require('../../../../../../assets/images/icons/icn_checkbox_unchecked.png')}
        data={[FUORI_ITEMS[0]]}
        textStyle={{color: colors.DARK_ALOE_TF, marginLeft: 5, marginTop: 1.5}}
        iconStyle={{
          width: 20,
          height: 20,
        }}
        containerStyle={{marginTop: 5, marginLeft: 10}}
        itemStyle={
          {
            // marginHorizontal: 15,
          }
        }
        onChangeValue={selectFuoriHandler}
        defaultCheckedValues={[resident_student ? 'YES' : 'NO']}
        minimumSelected={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  inputItem: {
    width: '100%',
    height: 53,
    justifyContent: 'center',
    borderRadius: 18,
    fontSize: 17,
    fontFamily: constants.DEFAULT_FONT,
    color: colors.DARK_ALOE_TF,
    backgroundColor: colors.WHITE,
    marginTop: 0,
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 5,
    shadowColor: colors.lightGray,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
    zIndex: 1,
  },
  arrowIcon: {
    width: 25,
    height: 25,
  },
  inputItemText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 17,
    color: colors.DARK_ALOE_TF,
    marginLeft: 6,
  },
  staticItemContainer: {},
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
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 18,
    color: colors.DARK_ALOE_TF,
  },
});

export default UniversityTypeBlock;
export {ANNO_ITEMS, FUORI_ITEMS};
