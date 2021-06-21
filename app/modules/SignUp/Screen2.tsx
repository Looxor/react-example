// Libraries //
import React, { useEffect, useState } from "react";
import { LogBox, SafeAreaView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Content, Item } from "native-base";
import DatePicker from "react-native-datepicker";
import Moment from "moment";
// Configs //
import { routes } from "../../navigation/rootNavigation/navigation.constants";
import { Button, StandardBoxWithImage, StandardInputText } from "../../components";
import DropDown from "./_Components/DropDown";
import { colors, constants, strings } from "../../config";
import standardFunctions from "../../utils/app/StandardFunctions";

import { styles } from "./Screen2.style";
// redux actions
import { signUpScreen2 } from "./_actions";

LogBox.ignoreLogs([
  'Warning: DatePickerIOS has been merged',
  'Warning: DatePickerAndroid has been merged',
]);

const Screen2 = props => {
  const signUpInfo = useSelector((state: any) => state.signUp);
  let userInfo = {};

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [gender, setGender] = useState();
  const [validContinue, setValidContinue] = useState(false);

  const before20Years = Moment().subtract(20, 'years').toDate();
  const [birthday, setBirthday] = useState();
  const [birthplace, setBirthplace] = useState('');

  const maxDate = Moment().subtract(10, 'years').toDate();
  const minDate = Moment().subtract(80, 'years').toDate();

  const dispatch = useDispatch();

  useEffect(() => {
    userInfo = {
      firstname,
      lastname,
      gender,
      birthday,
      birth_place: birthplace,
    };

    setValidContinue(
      firstname.length > 0 &&
        lastname.length > 0 &&
        gender != undefined &&
        birthday != undefined &&
        birthplace != '',
    );
  }, [firstname, lastname, gender, birthday, birthplace]);

  const setBirthdayHandler = birthday => {
    const [D, M, Y] = birthday.split(/[\-\/]/gi);
    const birthday2 = `${Y}/${M}/${D} 00:00:00`;
    // @ts-ignore
    setBirthday(new Date(birthday2));
  };

  const goNextScreen = () => {
    if (firstname.length < 3) {
      standardFunctions.show_alert(
        strings.ALERTS.ERRORS.SIGNUP.TITLE,
        strings.ALERTS.ERRORS.SIGNUP.ERROR_FIRSTNAME_MIN_LENGTH,
      );
      return;
    }
    if (lastname.length < 3) {
      standardFunctions.show_alert(
        strings.ALERTS.ERRORS.SIGNUP.TITLE,
        strings.ALERTS.ERRORS.SIGNUP.ERROR_LASTNAME_MIN_LENGTH,
      );
      return;
    }
    // @ts-ignore
    dispatch(signUpScreen2(userInfo)).then(() => {
      props.navigation.navigate(routes.SIGNUP.SCREEN3);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Content
        style={styles.subContainer}
        contentContainerStyle={styles.scrollSubContainer}>
        <StandardBoxWithImage
          image={require('../../../assets/images/icons/icn_big_battle_light.png')}
          background_start_color={colors.GENERAL.START}
          background_finish_color={colors.GENERAL.FINISH}
          viewStyle={styles.logo}
          iconStyle={{width: '25%'}}
        />

        <View style={styles.inputContainer}>
          <Item style={styles.input}>
            <StandardInputText
              value={firstname}
              placeholder={strings.SIGNUP.SECOND_SCREEN.INPUT_FIRSTNAME}
              onChangeText={setFirstName}
              returnKeyType={'next'}
              extra_styles={styles.inputText}
            />
          </Item>
        </View>

        <View style={styles.inputContainer}>
          <Item style={styles.input}>
            <StandardInputText
              value={lastname}
              placeholder={strings.SIGNUP.SECOND_SCREEN.INPUT_LASTNAME}
              onChangeText={setLastName}
              extra_styles={styles.inputText}
            />
          </Item>
        </View>

        <View style={styles.inputContainer}>
          <DropDown
            style={styles.dropdown}
            color={colors.DEFAULT_PLACEHOLDER}
            placeholderStyle={styles.dropdownPlaceholder}
            borderColor={colors.DEFAULT_PLACEHOLDER}
            selectedIndex={gender}
            onSelect={index => {
              setGender(index);
            }}
            placeholder={strings.SIGNUP.SECOND_SCREEN.INPUT_GENDER}
            items={strings.SIGNUP.SECOND_SCREEN.GENDERS}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.birthdayPickerContainer}>
            <DatePicker
              format={'DD/MM/YYYY'}
              showIcon={false}
              confirmBtnText={strings.OTHER.DONE}
              cancelBtnText={strings.OTHER.CANCEL}
              date={birthday}
              defaultDate={birthday || before20Years}
              minimumDate={minDate}
              maximumDate={maxDate}
              locale={'it'}
              timeZoneOffsetInMinutes={undefined}
              animationType={'fade'}
              androidMode={'spinner'}
              placeholder={strings.SIGNUP.SECOND_SCREEN.INPUT_BIRTHDAY}
              style={styles.datepickerPlaceholder}
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
                  marginTop: 3,
                  marginLeft: 10,
                  alignSelf: 'flex-start',
                  fontFamily: constants.DEFAULT_FONT,
                  fontSize: 17,
                },
                dateText: {
                  justifyContent: 'center',
                  marginTop: 3,
                  marginLeft: 10,
                  alignSelf: 'flex-start',
                  fontFamily: constants.DEFAULT_FONT,
                  fontSize: 17,
                },
                dateInput: {
                  borderWidth: 0,
                  fontFamily: constants.DEFAULT_FONT,
                },
              }}
              onDateChange={setBirthdayHandler}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Item style={styles.input}>
            <StandardInputText
              value={birthplace}
              placeholder={strings.SIGNUP.SECOND_SCREEN.INPUT_BIRTHPLACE}
              onChangeText={setBirthplace}
              extra_styles={styles.inputText}
            />
          </Item>
        </View>
      </Content>

      <View style={styles.subContainer2}>
        <Button
          disabled={!validContinue}
          style={!validContinue ? styles.disabledButton : {}}
          onPress={goNextScreen}>
          {strings.SIGNUP.SECOND_SCREEN.CONTINUE_BUTTON}
        </Button>
      </View>
    </SafeAreaView>
  );
};

Screen2.navigationOptions = {
  title: strings.SIGNUP.SECOND_SCREEN.PAGE_TITLE,
};

export default Screen2;
