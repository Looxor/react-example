import React, { useCallback, useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { ActivityIndicator, AsyncStorage, BackHandler, SafeAreaView, StatusBar, Text, View } from "react-native";
import { auth } from "../../utils/firebase";
import ActionSheet from "react-native-action-sheet";
import { useNavigation } from "@react-navigation/native";

import { colors, strings } from "../../config";
import { Button, StandardBoxWithImage } from "../../components";
import { CallServerPromise } from "../../utils/app/CallServer";
import { Firebase_IDToken } from "../../config/constants";
import Timer from "../../utils/misc/Timer";
import standardFunctions from "../../utils/app/StandardFunctions";
import { logOut } from "../Login/_actions";
import { gotoMainScreen } from "../Startapp/SplashScreenSS";

import styles from "./EmailPendingScreen.style";
import { routes } from "../../navigation/rootNavigation/navigation.constants";

export const CONFIRM_EMAIL_TYPE = {
  STANDARD: 1,
  STUDENT: 2,
};

const checkEmailVerified = async () => {
  try {
    const request = await CallServerPromise.get_user_data(
      Firebase_IDToken.firebase_idToken,
    );
    if (request.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const showError = async (error, additional_info = {}) => {
  switch (error) {
    case 'ERROR_RESENDING':
      await standardFunctions.show_alert_async(
        strings.SIGNUP.CONFIRM_EMAIL_SCREEN.TITLE,
        strings.SIGNUP.CONFIRM_EMAIL_SCREEN.ERROR_RESENDING_CONFIRMATION_EMAIL +
          '\n' +
          additional_info,
      );
      break;
    case 'SUCCESS_RESENDING':
      await standardFunctions.show_alert_async(
        strings.SIGNUP.CONFIRM_EMAIL_SCREEN.TITLE,
        strings.SIGNUP.CONFIRM_EMAIL_SCREEN
          .SUCCESS_RESENDING_CONFIRMATION_EMAIL,
      );
      break;
  }
};

const EmailPendingScreen = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [state, setState] = useState({
    is_verify_standard_account_email_availabe: false,
    going_to_main_screen: false,
    email: '',
  });

  const setState2 = useCallback(
    state2 => {
      setState({...state, ...state2});
    },
    [state],
  );

  const type = props.navigation.getParam('type');
  let timer;

  const onClosePressHandler = () => {
    const changeEmailPressHandler = () => {
      standardFunctions.show_alert_async(
        strings.SIGNUP.CONFIRM_EMAIL_SCREEN.TITLE,
        type === CONFIRM_EMAIL_TYPE.STANDARD
          ? strings.SIGNUP.CONFIRM_EMAIL_SCREEN.CHANGE_EMAIL_MESSAGE1
          : strings.SIGNUP.CONFIRM_EMAIL_SCREEN.CHANGE_EMAIL_MESSAGE2,
      );
    };

    const logoutPressHandler = async () => {
      const loggedOut = await dispatch(logOut());
      props.navigation.pop(10);
      props.navigation.navigate(routes.AUTH);
    };

    ActionSheet.showActionSheetWithOptions(
      {
        options: [
          strings.SIGNUP.CONFIRM_EMAIL_SCREEN.CHANGE_EMAIL_POPUP,
          strings.SIGNUP.CONFIRM_EMAIL_SCREEN.LOGOUT_POPUP,
          strings.OTHER.CANCEL,
        ],
        cancelButtonIndex: 2,
        tintColor: colors.THEFACULTY,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          changeEmailPressHandler();
        } else if (buttonIndex === 1) {
          logoutPressHandler();
        }
      },
    );
  };

  const checkResendEmailAvailable = async () => {
    try {
      const email = auth().currentUser && auth().currentUser.email;
      setState2({email});
      const request =
        await CallServerPromise.is_verify_standard_account_email_available();
      if (request.success) {
        if (request.data.is_available === true) {
          setState2({email, is_verify_standard_account_email_availabe: true});
        } else {
        }
      } else {
      }
    } catch (error) {}
  };

  const handleBackButton = () => true;

  const componentDidMount = () => {
    if (type === CONFIRM_EMAIL_TYPE.STANDARD) {
      timer = new Timer(10000);
      timer.on(async () => {
        const isVerified = await checkEmailVerified();
        if (isVerified) {
          setState2({going_to_main_screen: true});
          gotoMainScreen();
          timer.stop();
        }
      });
      timer.start();

      checkResendEmailAvailable();
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    } else if (type === CONFIRM_EMAIL_TYPE.STUDENT) {
      const loadEmail4Student = async () => {
        const firebase_uid = auth().currentUser && auth().currentUser.uid;
        const email = await AsyncStorage.getItem(
          `student_email_${firebase_uid}`,
        );
        setState2({email});
      };
      loadEmail4Student();
    }

    props.navigation.addListener('blur', () => {
      timer && timer.stop();
    });

    return componentWillUnmount;
  };

  const componentWillUnmount = () => {
    if (type === CONFIRM_EMAIL_TYPE.STANDARD) {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }
    timer && timer.stop();
  };

  useEffect(componentDidMount, []);

  const onResendPressHandler = async () => {
    try {
      const request = await CallServerPromise.verify_standard_account_email();
      if (request.success) {
        showError('SUCCESS_RESENDING');
        checkResendEmailAvailable();
      } else {
        showError('ERROR_RESENDING', request);
      }
    } catch (error) {
      showError('ERROR_RESENDING', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <StandardBoxWithImage
        image={require('../../../assets/images/icons/icn_big_paper_light.png')}
        background_start_color={colors.GENERAL.START}
        background_finish_color={colors.GENERAL.FINISH}
        viewStyle={styles.logo}
        iconStyle={{width: '30%'}}
      />
      {state.going_to_main_screen ? (
        <View style={styles.subContainerGoingMainScreen}>
          <ActivityIndicator color={colors.THEFACULTY} />
          <Text style={styles.goingToMainScreenText}>
            {strings.SIGNUP.CONFIRM_EMAIL_SCREEN.GOING_TO_MAIN_SCREEN}
          </Text>
        </View>
      ) : (
        <View style={styles.subContainer}>
          <View style={styles.textContainer}>
            <Text style={[styles.text, styles.description1]}>
              {strings.SIGNUP.CONFIRM_EMAIL_SCREEN.DESCRIPTION1}
            </Text>
            <Text style={[styles.text, styles.email]}>{state.email}</Text>
            <Text style={[styles.text, styles.description2]}>
              {strings.SIGNUP.CONFIRM_EMAIL_SCREEN.DESCRIPTION2}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            {state.is_verify_standard_account_email_availabe && (
              <Button
                onPress={onResendPressHandler}
                style={styles.resendButton}
                textStyle={styles.resendButtonText}>
                {strings.SIGNUP.CONFIRM_EMAIL_SCREEN.RESEND_BUTTON}
              </Button>
            )}
            <Button onPress={onClosePressHandler}>
              {strings.SIGNUP.CONFIRM_EMAIL_SCREEN.CLOSE_BUTTON}
            </Button>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

EmailPendingScreen.navigationOptions = ({navigation}) => {
  const type = navigation.getParam('type');
  return {
    ...(type === CONFIRM_EMAIL_TYPE.STANDARD ? {headerLeft: null} : {}),
    title: strings.SIGNUP.CONFIRM_EMAIL_SCREEN.TITLE,
    headerStyle: {
      paddingTop: 16,
    },
  };
};

export default EmailPendingScreen;
