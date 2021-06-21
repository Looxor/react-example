import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, constants, strings } from "../../../../../config";
import Picker2 from "../../PersonInfoBlock/_Components/Picker2";
import { StandardInputText } from "../../../../../components";
import SearchListPopover from "../../../../../components/SearchListPopover";
import { CallServerPromise } from "../../../../../utils/app/CallServer";

const ANNO_ITEMS = [
  {label: '1° anno', value: '1'},
  {label: '2° anno', value: '2'},
  {label: '3° anno', value: '3'},
  {label: '4° anno', value: '4'},
  {label: '5° anno', value: '5'},
  {label: '6° anno', value: '6'},
];

const FUORI_ITEMS = [
  {label: strings.PROFILE.USER_TYPE.FUORI_YES, value: true},
  {label: strings.PROFILE.USER_TYPE.FUORI_NO, value: false},
];

const UniversityTypeBlock = props => {
  const {major_name, university_year, hometown, resident_student} =
    props.userTypeBlockData;
  const {style, mode, onChangeSaveButtonState} = props;

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
    /* const saveButtonState =
      props.userTypeBlockData['major_name'] !== ''
      && props.userTypeBlockData['university_year'] !== undefined
      && props.userTypeBlockData['hometown'] !== ''
      && props.userTypeBlockData['resident_student'] !== undefined */
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
    SearchListPopover().show({
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
    onChangeValue();
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
      {mode === 'edit' && (
        <>
          <TouchableOpacity
            onPress={openMajorList}
            style={[
              styles.inputItem,
              majorName === '' || major_name === undefined
                ? {borderColor: colors.RED_TF, borderWidth: 2}
                : {borderColor: colors.THEFACULTY, borderWidth: 2},
            ]}>
            {majorName !== '' && major_name !== undefined && (
              <Text style={styles.inputItemText}>{majorName}</Text>
            )}

            {(majorName === '' || major_name === undefined) && (
              <Text
                style={[
                  styles.inputItemText,
                  {color: colors.DEFAULT_PLACEHOLDER},
                ]}>
                {strings.PROFILE.USER_TYPE.COURSE_OF_STUDY}
              </Text>
            )}
          </TouchableOpacity>
          <Picker2
            placeholder={strings.PROFILE.USER_TYPE.ANNO}
            selectedValue={university_year}
            onValueChange={value => onChangeValue('university_year', value)}
            items={ANNO_ITEMS}
            style={[
              styles.inputItem,
              tempUnivYear === ''
                ? {borderColor: colors.RED_TF, borderWidth: 2}
                : {borderColor: colors.THEFACULTY, borderWidth: 2},
            ]}
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
          <Picker2
            placeholder={strings.PROFILE.USER_TYPE.FUORI}
            onValueChange={value => onChangeValue('resident_student', value)}
            selectedValue={resident_student}
            items={FUORI_ITEMS}
            style={[
              styles.inputItem,
              tempResidentStudent === '' || tempResidentStudent === undefined
                ? {borderColor: colors.RED_TF, borderWidth: 2}
                : {borderColor: colors.THEFACULTY, borderWidth: 2},
            ]}
          />
        </>
      )}
      {mode === 'view' && (
        <>
          <View style={styles.itemContainer}>
            <Text style={styles.itemLabel}>
              {strings.PROFILE.USER_TYPE.COURSE_OF_STUDY}
            </Text>
            <Text style={styles.itemValue}>{major_name}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.itemLabel}>
              {strings.PROFILE.USER_TYPE.ANNO}
            </Text>
            <Text style={styles.itemValue}>
              {
                (
                  ANNO_ITEMS.find(
                    item => item.value === university_year.toString(),
                  ) || {label: ''}
                ).label
              }
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.itemLabel}>
              {strings.PROFILE.USER_TYPE.CITY}
            </Text>
            <Text style={styles.itemValue}>{hometown}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.itemLabel}>
              {strings.PROFILE.USER_TYPE.FUORI}
            </Text>
            <Text style={styles.itemValue}>
              {resident_student ? strings.OTHER.YES : strings.OTHER.NO}
            </Text>
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
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.SILVER,
    borderRadius: 14,
    fontSize: 17,
    fontFamily: constants.DEFAULT_FONT,
    backgroundColor: colors.WHITE,
    marginTop: 0,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 0.5},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    zIndex: 1,
    elevation: 0.2,
  },
  inputItemText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 17,
    color: colors.darkGray,
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
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 18,
    color: colors.darkGray,
  },
});

export default UniversityTypeBlock;
export {ANNO_ITEMS, FUORI_ITEMS};
