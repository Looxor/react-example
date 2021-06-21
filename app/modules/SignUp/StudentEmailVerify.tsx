import React, { useCallback, useState } from "react";
import { ActivityIndicator, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Button, StandardBoxWithImage } from "../../components";
import { colors, strings } from "../../config";
import styles from "./StudentEmailVerify.style";
import Strings from "../../utils/misc/TextComponents";
import { routes } from "../../navigation/rootNavigation/navigation.constants";
import { validateEmail } from "../../utils/forms/validationRules";
import standardFunctions from "../../utils/app/StandardFunctions";
import { CallServerPromise } from "../../utils/app/CallServer";
import GraduationStudyTown from "./_Components/GraduationStudyTown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../utils/firebase";

const TEST_EMAIL = 'test@smartcreative.eu';

const MESSAGE_TYPE = {
  ERROR_CONNECTING_SERVER: 1,
  ERROR_ALREADY_EXISTS: 2,
  ERROR_NOT_STUDENT_EMAIL: 3,
  SUCCESS_UPGRADE: 4,
  FAILED_UPGRADE: 5,
};

const showMessage = async message_type => {
  let message;
  switch (message_type) {
    case MESSAGE_TYPE.ERROR_CONNECTING_SERVER:
      message = strings.OTHER.ERROR_CONNECTING_SERVER;
      break;
    case MESSAGE_TYPE.ERROR_ALREADY_EXISTS:
      message = strings.SIGNUP.STUDENT1.ALREADY_EXIST;
      break;
    case MESSAGE_TYPE.ERROR_NOT_STUDENT_EMAIL:
      message = strings.SIGNUP.STUDENT1.NOT_UNIVERSITY_EMAIL;
      break;
    case MESSAGE_TYPE.SUCCESS_UPGRADE:
      message = strings.SIGNUP.STUDENT1.SUCCESS_UPGRADE_STUDENT_EMAIL;
      break;
    case MESSAGE_TYPE.FAILED_UPGRADE:
      message = strings.SIGNUP.STUDENT1.FAILED_UPGRADE;
      break;
  }
  await standardFunctions.show_alert_async(
    strings.SIGNUP.CONFIRM_EMAIL_SCREEN.TITLE,
    message,
  );
};

const StudentEmailVerify = props => {
  const [state, setState] = useState({
    email: '',
    confirmEmail: '',
    graduation_year: 0,
    isValidEmail: true,
    isValidConfirmEmail: true,
    isValidCityName: true,
    loadingCities: false,
    studytown: '',
    loading: false,
  });

  const setState2 = useCallback(
    state2 => {
      setState({...state, ...state2});
    },
    [state],
  );
  const resetInvalidFields = () =>
    setState2({
      isValidEmail: true,
      matchConfirmEmail: true,
    });

  const universityEmailPressHandler = () => {
    // @ts-ignore
    global.selectedIndex = -1;
    props.navigation.replace(routes.SIGNUP.STUDENT_CARD_VERIFY);
  };

  const confirmButtonPressHandler = async () => {
    resetInvalidFields();
    let message;

    if (!validateEmail(state.email)) {
      setState2({isValidEmail: false});
      message = strings.SIGNUP.STUDENT1.INVALID_EMAIL;
    } else if (!state.studytown) {
      setState2({isValidCityName: false});
      message = strings.SIGNUP.STUDENT1.INVALID_CITY_NAME;
    }

    if (message) {
      await standardFunctions.show_alert_async(
        strings.SIGNUP.STUDENT1.TITLE,
        message,
      );
    } else {
      const params = {
        is_student: true,
        student_email: state.email,
        studytown: state.studytown,
        //graduation_year: new Date(state.graduation_year + '-12-31'),
      };

      try {
        setState2({loading: true});

        let request;
        request = await CallServerPromise.does_email_already_exist(state.email);
        if (request.success) {
          if (request.data === true) {
            setState2({loading: false});
            showMessage(MESSAGE_TYPE.ERROR_ALREADY_EXISTS);
          } else {
            request = await CallServerPromise.is_student_email(state.email);
            if (request.success) {
              if (request.data === true) {
                request = await CallServerPromise.upgrade_to_student_account(
                  params,
                );
                setState2({loading: false});
                if (request.success) {
                  await showMessage(MESSAGE_TYPE.SUCCESS_UPGRADE);
                  const firebase_uid =
                    auth().currentUser && auth().currentUser.uid;
                  await AsyncStorage.setItem(
                    `student_email_${firebase_uid}`,
                    state.email,
                  );
                  props.navigation.goBack(null);
                } else {
                  showMessage(MESSAGE_TYPE.FAILED_UPGRADE);
                }
              } else {
                setState2({loading: false});
                showMessage(MESSAGE_TYPE.ERROR_NOT_STUDENT_EMAIL);
              }
            } else {
              setState2({loading: false});
              showMessage(MESSAGE_TYPE.ERROR_CONNECTING_SERVER);
            }
          }
        } else {
          setState2({loading: false});
          showMessage(MESSAGE_TYPE.ERROR_CONNECTING_SERVER);
        }
      } catch (error) {
        setState2({loading: false});
        showMessage(MESSAGE_TYPE.ERROR_CONNECTING_SERVER);
      }
    }
  };

  const notNowButtonPressHandler = () => {
    props.navigation.goBack(null);
  };

  const changeEmailHandler = email => setState2({isValidEmail: true, email});

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <StandardBoxWithImage
          image={require('../../../assets/images/icons/icn_big_trophy_dark.png')}
          background_start_color={colors.GENERAL.START}
          background_finish_color={colors.GENERAL.FINISH}
          viewStyle={styles.logo}
          iconStyle={{width: '30%'}}
        />
        <View style={styles.subContainer}>
          {Strings.makeBold(strings.SIGNUP.STUDENT1.DESCRIPTION, {
            style: styles.description,
          })}
          <TextInput
            autoCapitalize={'none'}
            textContentType={'emailAddress'}
            autoCompleteType={'email'}
            onChangeText={changeEmailHandler}
            placeholder={strings.SIGNUP.STUDENT1.EMAIL}
            style={[styles.inputText, styles.emailText]}
            placeholderTextColor={colors.DEFAULT_PLACEHOLDER}
            value={state.email}
          />

          <GraduationStudyTown
            style={styles.graduationStudyTown}
            email={state.email}
            confirmEmail={state.email}
            onChangeGraduationYear={graduation_year =>
              setState2({graduation_year})
            }
            onChangeStudyTown={studytown => {
              setState2({studytown});
            }}
          />
          <TouchableOpacity
            onPress={universityEmailPressHandler}
            style={styles.hasNoEmailButton}>
            <Text style={styles.hasNoEmailButtonText}>
              {strings.SIGNUP.STUDENT1.HAS_NO_EMAIL2}
            </Text>
          </TouchableOpacity>

          <View style={styles.bottomMargin} />
        </View>
        <Button
          onPress={notNowButtonPressHandler}
          style={[styles.button, styles.notNowButton]}
          textStyle={styles.notNowButtonText}>
          {strings.SIGNUP.STUDENT1.NOT_NOW}
        </Button>
        <Button
          disabled={state.loading}
          onPress={confirmButtonPressHandler}
          style={[styles.button, styles.continueButton]}>
          {state.loading ? (
            <ActivityIndicator color={colors.WHITE} />
          ) : (
            strings.SIGNUP.STUDENT1.CONTINUE_BUTTON
          )}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default StudentEmailVerify;
