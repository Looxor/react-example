import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button, StandardBoxWithImage } from "../../../../components";
import { colors, strings } from "../../../../config";
import styles from "./StudentEmailVerify.style";
import Strings from "../../../../utils/misc/TextComponents";
import { routes } from "../../../../navigation/rootNavigation/navigation.constants";
import { validateEmail } from "../../../../utils/forms/validationRules";
import standardFunctions from "../../../../utils/app/StandardFunctions";
import { CallServerPromise } from "../../../../utils/app/CallServer";
import GraduationStudyTown from "./_Components/GraduationStudyTown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../../../utils/firebase";
import { UserData } from "../../../../config/constants";
import StandardInputText from "../../../../components/StandardInputText";
import { GetMessage } from "../../_Functions/ShowMessage";
import SaveSuccessPopoverView from "../PersonInfoBlock/_Components/SaveSuccessPopover";
import NavigationService from "../../../../utils/app/NavigationService";

const TEST_EMAIL = 'test@thefacultyapp.com';

export const MESSAGE_TYPE = {
  CANT_VERIFY_STUDENT_EMAIL: 1,
  FAILED_TO_VERIFY_STUDENT_EMAIL: 2,
  SUCCESS_TO_VERIFY_STUDENT_EMAIL: 3,
  CHANGED_TO_VERIFY_STUDENT_EMAIL: 4,
};

export const showMessage = async (message_type, args = {}) => {
  let message;
  switch (message_type) {
    case MESSAGE_TYPE.CANT_VERIFY_STUDENT_EMAIL:
      message = strings.PROFILE.MESSAGE.CANT_VERIFY_STUDENT_EMAIL;
      break;
    case MESSAGE_TYPE.FAILED_TO_VERIFY_STUDENT_EMAIL:
      message = strings.PROFILE.MESSAGE.FAILED_TO_VERIFY_STUDENT_EMAIL;
      break;
    case MESSAGE_TYPE.SUCCESS_TO_VERIFY_STUDENT_EMAIL:
      message = strings.PROFILE.MESSAGE.SUCCESS_TO_VERIFY_STUDENT_EMAIL;
      break;
    case MESSAGE_TYPE.CHANGED_TO_VERIFY_STUDENT_EMAIL:
      const email = args['email'];
      message = strings.PROFILE.MESSAGE.CHANGED_TO_VERIFY_STUDENT_EMAIL.replace(
        '{EMAIL}',
        email,
      );
      break;
  }
  await standardFunctions.show_alert_async(strings.PROFILE.HOME.TITLE, message);
};

const StudentEmailVerify = props => {
  // @ts-ignore
  const navigationData = global.navigationData;
  if (!navigationData) return null;
  const onAfterConfirmedStudentEmail =
    navigationData['onAfterConfirmedStudentEmail'];
  const onAfterConfirmedStudentCard =
    navigationData['onAfterConfirmedStudentCard'];
  const onReturn = navigationData['onReturn'];

  const [state, setState] = useState({
    email: '',
    confirmEmail: '',
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
    NavigationService.replace(routes.PROFILE_STUDENT_VERIFY_CARD, {
      mode: 'student',
    });
  };

  const getStaticRewardValues = async () => {
    try {
      const request = await CallServerPromise.get_many_static_variables([
        'basic_data_reward',
        'type_data_reward',
      ]);
      if (request.success) {
        return request.data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const confirmButtonPressHandler = async () => {
    standardFunctions.add_firebase_event_log(
      'profile',
      'btn_sv_std_email_clicked',
    );
    resetInvalidFields();
    let message;

    if (!validateEmail(state.email.trim())) {
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
      try {
        setState2({loading: true});
        const params = {
          is_student: true,
          student_email: state.email.trim(),
          studytown: state.studytown,
        };
        const request: any = await CallServerPromise.verify_student(params);

        const oldRewards = UserData.getUserData().rewards.type_data
          ? UserData.getUserData().rewards
          : {type_data: false};
        const static_rewards = (await getStaticRewardValues()) || {};

        setState2({loading: false});
        if (request.success) {
          await CallServerPromise.update_account({
            user_type: 'university_student',
          });
          if (
            request.data.rewards &&
            request.data.rewards.type_data === true &&
            oldRewards.type_data === false
          ) {
            const coin = '+' + static_rewards.type_data_reward;
            let popup_message = GetMessage(6, null, {coin});
            SaveSuccessPopoverView().show({
              message: popup_message,
              second_icon: false,
              success: true,
            });
          }
          if (request.data.verification_needed === true) {
            // await showMessage(MESSAGE_TYPE.SUCCESS_TO_VERIFY_STUDENT_EMAIL);
            const firebase_uid = auth().currentUser && auth().currentUser.uid;
            await AsyncStorage.setItem(
              `student_email_${firebase_uid}`,
              state.email,
            );
            NavigationService.goBack();
            NavigationService.navigate(routes.PROFILE_CONFIRM_EMAIL, {
              email: state.email,
              mode: 'student',
            });
          } else {
            await showMessage(MESSAGE_TYPE.CHANGED_TO_VERIFY_STUDENT_EMAIL, {
              email: state.email,
            });
            onAfterConfirmedStudentEmail && onAfterConfirmedStudentEmail();
            NavigationService.goBack();
          }
        } else {
          console.log('error on verifying student email', request);
          showMessage(MESSAGE_TYPE.FAILED_TO_VERIFY_STUDENT_EMAIL);
        }
      } catch (error) {
        console.log("It's not available to verify student email", error);
        setState2({loading: false});
        showMessage(MESSAGE_TYPE.CANT_VERIFY_STUDENT_EMAIL);
      }
    }
  };

  const notNowButtonPressHandler = () => {
    props.navigation.goBack(null);
  };

  const changeEmailHandler = email => setState2({isValidEmail: true, email});

  const componentDidMount = () => {
    return componentWillUnmount;
  };
  const componentWillUnmount = () => {
    onReturn && onReturn();
  };

  useEffect(componentDidMount, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container}>
        <StandardBoxWithImage
          image={require('../../../../../assets/images/icons/icn_big_trophy_dark.png')}
          background_start_color={colors.GENERAL.START}
          background_finish_color={colors.GENERAL.FINISH}
          viewStyle={styles.logo}
          iconStyle={{width: '30%'}}
        />
        <View style={styles.subContainer}>
          {!UserData.getUserData().is_student
            ? Strings.makeBold(strings.SIGNUP.STUDENT1.DESCRIPTION, {
                style: styles.description,
              })
            : Strings.makeBold(strings.SIGNUP.STUDENT1.DESCRIPTION_STUDENT, {
                style: styles.description,
              })}
          <StandardInputText
            autoCapitalize={'none'}
            textContentType={'emailAddress'}
            autoCompleteType={'email'}
            onChangeText={changeEmailHandler}
            placeholder={strings.SIGNUP.STUDENT1.EMAIL}
            extra_styles={[styles.inputText, styles.emailText]}
            placeholderTextColor={colors.DEFAULT_PLACEHOLDER}
            value={state.email}
          />

          <GraduationStudyTown
            style={styles.graduationStudyTown}
            email={state.email.trim()}
            confirmEmail={state.email.trim()}
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
      </ScrollView>
      <View style={styles.buttonContainer}>
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
