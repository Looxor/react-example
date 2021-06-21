import React, { useCallback, useEffect, useState } from "react";

import { ActivityIndicator, BackHandler, Platform, SafeAreaView, StatusBar, Text, View } from "react-native";
import { auth } from "../../../../utils/firebase";
import { useNavigation } from "@react-navigation/native";

import { colors, constants, strings } from "../../../../config";
import { Button } from "../../../../components";
import { CallServerPromise } from "../../../../utils/app/CallServer";
import { Firebase_IDToken } from "../../../../config/constants";
import Timer from "../../../../utils/misc/Timer";
import standardFunctions from "../../../../utils/app/StandardFunctions";
import { gotoMainScreen } from "../../../Startapp/SplashScreenSS";

import styles from "./EmailPendingScreen.style";
import { Observable } from "../../../_CommonModels/ViewModelBase";
import FastImage from "react-native-fast-image";
import Strings from "../../../../utils/misc/TextComponents";

export const CONFIRM_EMAIL_TYPE = {
  STANDARD: 1,
  STUDENT: 2,
};

const checkEmailVerified = async () => {
  try {
    const request = await CallServerPromise.get_user_data(
      Firebase_IDToken.firebase_idToken,
    );
    return request.success;
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
  const navigation = useNavigation();

  const [state, setState] = useState({
    is_verify_standard_account_email_available: false,
    going_to_main_screen: false,
    email: (Observable.getReduxValue('SignUpInfo') || {}).email,
  });

  const setState2 = useCallback(
    state2 => {
      setState({...state, ...state2});
    },
    [state],
  );

  let timer;

  const onClosePressHandler = () => {
    standardFunctions.add_firebase_event_log(
      'email_signup',
      'vrfy_email_clicked',
    );
    props.navigation.pop(4);
    // props.navigation.goBack(null);
  };

  const checkResendEmailAvailable = async () => {
    try {
      const email = auth().currentUser && auth().currentUser.email;
      email && setState2({email});
      const request =
        await CallServerPromise.is_verify_standard_account_email_available();
      if (request.success) {
        if (request.data.is_available === true) {
          onResendPressHandler(true);
          setState2({email, is_verify_standard_account_email_available: true});
        }
      }
    } catch (error) {}
  };

  const handleBackButton = () => true;

  const componentDidMount = () => {
    timer = new Timer(10000);
    timer.on(async () => {
      const isVerified = await checkEmailVerified();
      if (isVerified) {
        setState2({going_to_main_screen: true});
        await gotoMainScreen();
        timer.stop();
      }
    });
    timer.start();

    checkResendEmailAvailable();
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    props.navigation.addListener('blur', () => {
      timer && timer.stop();
    });

    return componentWillUnmount;
  };

  const componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    timer && timer.stop();
  };

  useEffect(componentDidMount, []);

  const onResendPressHandler = async (fromHome = false) => {
    standardFunctions.add_firebase_event_log(
      'email_signup',
      'rsnd_email_clicked',
    );
    try {
      const request = await CallServerPromise.verify_standard_account_email();
      if (request.success) {
        !fromHome ? showError('SUCCESS_RESENDING') : null;
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
        translucent={true}
        barStyle={'light-content'}
        backgroundColor={colors.THEFACULTY}
      />

      <View style={styles.subTitle}>
        <Text style={styles.subTitleText}>
          {strings.SIGNUP.CONFIRM_EMAIL_SCREEN.TITLE}
        </Text>
      </View>
      {state.going_to_main_screen ? (
        <View style={styles.subContainerGoingMainScreen}>
          <ActivityIndicator color={colors.THEFACULTY} />
          <Text style={styles.goingToMainScreenText}>
            {strings.SIGNUP.CONFIRM_EMAIL_SCREEN.GOING_TO_MAIN_SCREEN}
          </Text>
        </View>
      ) : (
        <View style={styles.subContainer}>
          <View style={styles.logoContainer}>
            <FastImage
              resizeMode={'contain'}
              style={styles.mainImage}
              source={require('../../../../../assets/images/icons/icn_confirm_email_big.png')}
            />
            <Text style={[styles.text, styles.description1]}>
              {Strings.makeBold(
                strings.SIGNUP.CONFIRM_EMAIL_SCREEN.DESCRIPTION.replace(
                  '{EMAIL}',
                  '[bold]' + state.email + '[/bold]',
                ),
              )}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <View />
            {state.is_verify_standard_account_email_available && (
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

EmailPendingScreen.navigationOptions = ({navigation}) => ({
  title: strings.SIGNUPV2.EMAILSIGNUP.TITLE,
  headerLeft: () => null,
  headerRight: () => null,
  headerTitleStyle: {
    ...Platform.select({
      android: {
        paddingTop: 33,
        height: 70,
        fontSize: 17,
        elevation: 0,
        shadowOpacity: 0,
      },
    }),
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
  },
  headerStyle: {
    borderBottomWidth: 0,
    backgroundColor: colors.THEFACULTY,
  },
  headerTintColor: colors.WHITE,
});

export default EmailPendingScreen;
