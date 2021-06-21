import React, { useEffect, useState } from "react";
import { CommonActions } from "@react-navigation/native";
import { auth } from "../../utils/firebase";
import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from "react-native";
// Configs //
import { routes } from "../../navigation/rootNavigation/navigation.constants";
import { handleUser } from "../../utils/firebase/authUtils";
import { Firebase_IDToken, UserData } from "../../config/constants";

import { CONFIRM_EMAIL_TYPE } from "../SignUp/EmailPendingScreen";
import { colors, constants, strings } from "../../config";
import { Button } from "../../components";
import { CallServerPromise } from "../../utils/app/CallServer";
import SplashScreen from "react-native-splash-screen";
import { delay } from "../../utils/misc/Timer";
import standardFunctions from "../../utils/app/StandardFunctions";
import Strings from "../../utils/misc/TextComponents";
import FastImage from "react-native-fast-image";
import { Observable } from "../_CommonModels/ViewModelBase";
import NavigationService from "../../utils/app/NavigationService";

const gotoMainScreen = async () => {
  await handleUser(auth().currentUser);
  NavigationService.replace(routes.MAIN);
};

const gotoAddMajorEmailScreen = async () => {
  CommonActions.navigate(routes.AUTH, {
    screen: routes.SIGNUP.ADD_MAJOR_EMAIL,
  });
};

const gotoEmailVerifyScreen = () => {
  CommonActions.navigate(routes.AUTH, {
    screen: routes.SIGNUP.EMAIL_PENDING_SCREEN,
    params: {
      type: CONFIRM_EMAIL_TYPE.STANDARD,
    },
  });
};

const gotoAuthScreen = () => {
  NavigationService.replace(routes.AUTH);
};

const hideSplashScreen = async () => {
  await delay(500);
  SplashScreen.hide();
};

const SplashScreenSS = props => {
  const [state, setState] = useState({
    loading: true,
    not_available: false,
    not_available_message: '',
    failed: false,
  });

  const setState2 = state2 => setState({...state, ...state2});

  const loadScreens = async () => {
    try {
      standardFunctions.add_firebase_event_log('initialize', 'app');
      setState2({
        failed: false,
        not_available: false,
        not_available_message: '',
        loading: true,
      });
      const requestAppAvailable: any =
        await CallServerPromise.is_application_available();
      if (!requestAppAvailable.data.is_application_available) {
        let temp_message =
          requestAppAvailable.data.application_unavailable_message !==
            undefined &&
          requestAppAvailable.data.application_unavailable_message !== ''
            ? requestAppAvailable.data.application_unavailable_message
            : strings.APPLICATION_NOT_AVAILABLE_MESSAGE;
        setState2({
          failed: false,
          not_available: true,
          not_available_message: temp_message,
          loading: false,
        });
        hideSplashScreen();
        /*
        await standardFunctions.show_alert_with_button_async(
            strings.APP_NAME,
            requestAppAvailable.data.application_unavailable_message !== undefined &&
            requestAppAvailable.data.application_unavailable_message !== ''
            ? requestAppAvailable.data.application_unavailable_message : strings.APPLICATION_NOT_AVAILABLE_MESSAGE,
            strings.RETRY_BUTTON,
            () => {
              loadScreens();
            },
            false,
        );
        */
        return;
      }
      console.log('auth().currentUser ==========', auth().currentUser);
      if (auth().currentUser) {
        await Observable.setReduxValue('is_to_check_max_coins', false);
        Firebase_IDToken.setIDToken(await auth().currentUser.getIdToken(true));
        if (UserData.isUserLoggedin()) {
          const request = await CallServerPromise.is_standard_email_missing();
          if (request.success) {
            const is_missing = request.data;
            if (is_missing) {
              gotoAddMajorEmailScreen();
              hideSplashScreen();
            } else {
              // gotoAddMajorEmailScreen(navigation);
              gotoMainScreen();
              hideSplashScreen();
            }
          } else {
            gotoAuthScreen();
            hideSplashScreen();
          }
        } else {
          const lastAuthError = UserData.getAuthError();
          if (lastAuthError.message === 'email not verified') {
            gotoEmailVerifyScreen();
            hideSplashScreen();
          } else {
            gotoAuthScreen();
            hideSplashScreen();
          }
        }
      } else {
        gotoAuthScreen();
        hideSplashScreen();
      }
    } catch (error) {
      setState2({failed: true, loading: false});
      hideSplashScreen();
    }
  };

  const componentDidMount = () => {
    loadScreens();

    return componentWillUnmount;
  };

  const retryButtonPressHandler = () => {
    loadScreens();
  };

  const componentWillUnmount = () => {};

  useEffect(componentDidMount, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <FastImage
        source={require('../../../assets/images/splash/new_splash_2021.jpg')}
        style={styles.containerBg}>
        {state.loading && (
          <ActivityIndicator size={'small'} color={colors.WHITE} />
        )}
        {(state.not_available || state.failed) && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {state.not_available
                ? Strings.makeBold(state.not_available_message)
                : Strings.makeBold(strings.OTHER.ERROR_CONNECTING_SERVER)}
            </Text>
            {!state.not_available && (
              <Button
                style={styles.retryButton}
                textStyle={styles.retryButtonText}
                onPress={retryButtonPressHandler}>
                {strings.OTHER.RETRY.toUpperCase()}
              </Button>
            )}
          </View>
        )}
      </FastImage>
    </View>
  );
};

SplashScreenSS.navigationOptions = {
  header: null,
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.THEFACULTY,
  },
  containerBg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  errorContainer: {
    width: '80%',
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    width: 150,
    height: 150,
    marginTop: 30,
  },
  errorText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 20,
    color: colors.WHITE,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    textShadowColor: 'black',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
    padding: 15,
    paddingTop: 10,
    borderRadius: 15,
  },
  retryButton: {
    backgroundColor: colors.WHITE,
    marginTop: 20,
  },
  retryButtonText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 18,
    color: colors.THEFACULTY,
  },
});

export default SplashScreenSS;
export {gotoMainScreen, gotoEmailVerifyScreen, gotoAuthScreen};
