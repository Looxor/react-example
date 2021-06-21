import React, { useState } from "react";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, constants, strings } from "../../../../config";
import Picker2 from "./_Components/Picker2";
import DatePicker2 from "./_Components/DatePicker2";
import PersonInfoHeader from "./_Components/PersonInfoHeader";
import { StandardInputText } from "../../../../components";
import { validateEmail } from "../../../../utils/forms/validationRules.js";
import standardFunctions from "../../../../utils/app/StandardFunctions";

const GENDERS = [
  {label: strings.PROFILE.HOME.GENDER_M, value: 'M'},
  {label: strings.PROFILE.HOME.GENDER_F, value: 'F'},
  {label: strings.PROFILE.HOME.GENDER_O, value: 'O'},
];

const PersonInfoEditBlock = props => {
  const {coin, gender, contact_email, mainEmail, useMainEmail, birthday} =
    props.personInfoBlockData;
  const [disableSaveButton, setDisableSaveButton] = useState(
    !useMainEmail && !validateEmail(contact_email),
  );
  const [disableEmailInput, setDisableEmailInput] = useState(useMainEmail);
  const {onPressSaveButton, savingPersonInfoData} = props;
  const saveData = () => {
    Platform.OS === 'android' && (gender === undefined || gender === '')
      ? onChangeValue('gender', 'M')
      : null;
    standardFunctions.add_firebase_event_log(
      'profile',
      'btn_sv_bsc_data_clicked',
    );
    onPressSaveButton && onPressSaveButton();
  };

  var [tempGender, setTempGender] = useState(gender);
  var [tempBirthday, setTempBirthday] = useState(birthday);
  const onChangeValue = (key, value) => {
    props.personInfoBlockData[key] = value;
    if (key === 'gender') setTempGender(value);
    if (key === 'birthday') setTempBirthday(value);
    if (key === 'contact_email' || key === 'useMainEmail') {
      setDisableEmailInput(props.personInfoBlockData['useMainEmail']);
      if (props.personInfoBlockData['useMainEmail'] === false) {
        if (props.personInfoBlockData['contact_email'] !== '') {
          setDisableSaveButton(
            !validateEmail(props.personInfoBlockData['contact_email']),
          );
        }
      } else {
        setDisableSaveButton(false);
      }
    }
  };
  return (
    <View style={styles.container}>
      <PersonInfoHeader
        coin={coin}
        mode={'edit'}
        disableSaveButton={disableSaveButton}
        savingPersonInfoData={savingPersonInfoData}
        onPressSaveButton={saveData}
      />
      <View style={[styles.itemContainer, {marginTop: 20}]}>
        <Picker2
          placeholder={strings.PROFILE.HOME.GENDER}
          items={GENDERS}
          onValueChange={value => {
            onChangeValue('gender', value);
          }}
          selectedValue={gender}
          style={[
            styles.picker,
            tempGender === ''
              ? {borderColor: colors.RED_TF, borderWidth: 2}
              : {borderColor: colors.THEFACULTY, borderWidth: 2},
          ]}
        />
      </View>
      <View style={styles.itemContainer}>
        <StandardInputText
          placeholder={useMainEmail ? mainEmail : strings.PROFILE.HOME.EMAIL}
          textContentType={'emailAddress'}
          autoCompleteType={'email'}
          defaultValue={useMainEmail ? '' : contact_email}
          onChangeText={text => onChangeValue('contact_email', text)}
          returnKeyType={'next'}
          keyboardType={'default'}
          autoCapitalize={'none'}
          showColorBorder={
            props.personInfoBlockData['contact_email'] !== '' &&
            props.personInfoBlockData['contact_email'] !== undefined
          }
          showBlueBorder={
            !disableEmailInput &&
            props.personInfoBlockData['contact_email'] !== '' &&
            validateEmail(props.personInfoBlockData['contact_email'])
          }
          showErrorBorder={
            (!disableEmailInput &&
              props.personInfoBlockData['contact_email'] === '') ||
            !validateEmail(props.personInfoBlockData['contact_email'])
          }
          editable={!disableEmailInput}
          extra_styles={[
            {alignSelf: 'center', width: '100%'},
            disableEmailInput ? styles.disabledInput : null,
          ]}
        />
      </View>
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={styles.mainEmailCheckBoxButton}
          onPress={() => onChangeValue('useMainEmail', !useMainEmail)}>
          <Image
            style={{left: 8}}
            resizeMode={'contain'}
            source={
              useMainEmail
                ? require('../../../../../assets/images/icons/icn_check_selected.png')
                : require('../../../../../assets/images/icons/icn_check.png')
            }
          />
          <View style={styles.mainEmailCheckBoxTextContainer}>
            <Text style={styles.mainEmailCheckBoxText}>
              {strings.PROFILE.HOME.USE_MAIN_EMAIL}
            </Text>
            <Text style={styles.mainEmailText}>{mainEmail || ''}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={[styles.itemContainer, {marginTop: 20}]}>
        <DatePicker2
          selectedDate={birthday}
          onValueChange={value => onChangeValue('birthday', value)}
          containerStyle={[
            styles.picker,
            {padding: 5},
            tempBirthday === ''
              ? {borderColor: colors.RED_TF, borderWidth: 2}
              : {borderColor: colors.THEFACULTY, borderWidth: 2},
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
  },
  itemContainer: {
    width: '100%',
    marginTop: 5,
  },
  picker: {
    width: '100%',
    height: 50,
    marginVertical: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.SILVER,
    borderRadius: 14,
    paddingLeft: 10,
    fontSize: 17,
    fontFamily: constants.DEFAULT_FONT,
    marginTop: 0,
    marginBottom: 0,
    zIndex: 1,
    backgroundColor: colors.WHITE,
    paddingRight: 10,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 0.5},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 0.2,
  },
  emailTextInput: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightGray,
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 18,
    paddingLeft: 10,
  },
  mainEmailCheckBoxButton: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 5,
  },
  mainEmailCheckBoxTextContainer: {
    flexDirection: 'column',
    marginLeft: 20,
  },
  mainEmailCheckBoxText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
  },
  mainEmailText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    color: colors.darkGray,
  },
  datepickerPlaceholder: {
    width: '100%',
    height: 50,
  },
  disabledInput: {
    backgroundColor: colors.LIGHT_SILVER,
  },
});

export default PersonInfoEditBlock;
export {GENDERS};
