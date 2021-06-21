import { Linking, Platform } from "react-native";

import standardFunctions from "../../../utils/app/StandardFunctions";
import { constants, strings } from "../../../config";
import { logOut } from "../../Login/_actions";
import { CommonActions as NavigationActions } from "@react-navigation/native";
import { routes } from "../../../navigation/rootNavigation/navigation.constants";
import moment from "moment";
import { CallServerPromise } from "../../../utils/app/CallServer";
import { CONFIRM_EMAIL_TYPE } from "../../SignUp/EmailPendingScreen";
import { GoogleSignin } from "@react-native-community/google-signin";
import * as StoreReview from "react-native-store-review";
import { Alert_Button } from "../../../config/interfaces";
import PushNotification from "../../../utils/app/PushNotification";
import NavigationService from "../../../utils/app/NavigationService";

const openEditSubject = (navigation, user) => {
  navigation.navigate(routes.SETTINGS_EDIT_SUBJECT_WEIGHT1, {user});
};

const openStudentSignupScreen = async (navigation, user) => {
  try {
    const request =
      await CallServerPromise.is_upgrade_to_student_account_available();
    if (request.success && request.data) {
      if (request.data.is_available === true) {
        gotoStudentEmailVerifyScreen(navigation);
      } else if (
        request.data.status === 'student card verification in progress'
      ) {
        gotoStudentCardPendingScreen(navigation);
      } else if (
        request.data.status === 'student email verification in progress'
      ) {
        gotoStudentEmailPendingScreen(navigation);
      }
    } else {
    }
  } catch (error) {}
};

const gotoStudentEmailVerifyScreen = props => {
  gotoScreen(props, routes.SIGNUP.STUDENT_EMAIL_VERIFY);
};

const gotoStudentEmailPendingScreen = props => {
  gotoScreen(props, routes.SIGNUP.EMAIL_PENDING_SCREEN, {
    type: CONFIRM_EMAIL_TYPE.STUDENT,
  });
};

const gotoStudentCardPendingScreen = props => {
  gotoScreen(props, routes.SIGNUP.STUDENT_CARD_PENDING);
};

const gotoScreen = (navigation, routeName, params = {}) => {
  NavigationActions.navigate(routes.COUPONS_NAVIGATOR, {
    screen: routeName,
    ...params,
  });
};

const openEditFacultyScreen = (navigation, user) => {
  navigation.navigate(routes.SETTINGS_EDIT_FACULTY, {user});
};

const logOutHandler = async (dispatch, navigation) => {
  standardFunctions.play_tap_sound();
  standardFunctions.add_firebase_event_log('settings', 'btn_logout_clicked');
  const confirm_button: Alert_Button = {
    text: strings.OTHER.YES,
    onPress: async () => {
      try {
        await GoogleSignin.signOut();
      } catch (error) {}

      try {
        await PushNotification.removeFirebaseNotificationToken();
      } catch (error) {}

      // await Observable.setReduxValue("user_" + UserData.getUserData().user_id + "_" + "home_screen_onboarding_showed", false);
      // await Observable.setReduxValue("user_" + UserData.getUserData().user_id + "_" + "coupons_screen_onboarding_showed", false);
      // await Observable.setReduxValue("user_" + UserData.getUserData().user_id + "_" + "test_screen_onboarding_showed", false);
      await dispatch(logOut());
      NavigationService.replace(routes.AUTH);
    },
    style: 'cancel',
  };
  const cancel_button: Alert_Button = {
    text: strings.OTHER.NO,
    onPress: () => {},
    style: 'cancel',
  };

  standardFunctions.show_alert_with_buttons(
    strings.ALERTS.LOGOUT.LOGOUT_REQUESTED.TITLE,
    strings.ALERTS.LOGOUT.LOGOUT_REQUESTED.MESSAGE,
    false,
    [confirm_button, cancel_button],
  );
};

const openEmailComposeScreen = async user => {
  standardFunctions.play_tap_sound();
  standardFunctions.add_firebase_event_log('settings', 'btn_support_clicked');
  const receiver_email = constants.SUPPORT_EMAIL;
  const nickname = user.d('nickname');
  const name = user.getName();
  const currentDateTime = moment().format('DD/MM/YYYY k:m');
  const user_id = user.getID();

  const subject = escape(
    strings.SETTINGS.HOME.EMAIL_SUPPORT_SUBJECT.replace('[NICKNAME]', nickname),
  );
  let body = strings.SETTINGS.HOME.EMAIL_SUPPORT_BODY;
  body = body.replace('[NICKNAME]', nickname);
  body = body.replace('[NAME]', name);
  body = body.replace('[DATETIME]', currentDateTime);
  body = body.replace('[USER_ID]', user_id);
  body = escape(body);

  try {
    const result = await Linking.openURL(
      `mailto:${receiver_email}?subject=${subject}&body=${body}`,
    );
  } catch (error) {
    standardFunctions.show_alert(
      strings.SETTINGS.HOME.NEED_HELP,
      strings.SETTINGS.HOME.EMAIL_CLIENT_NO_EXITS,
    );
  }
};

const openSocialPopup = key => {
  standardFunctions.play_tap_sound();
  standardFunctions.add_firebase_event_log(
    'settings',
    'scl_' + key + '_clicked',
  );
  let url = '';
  switch (key) {
    case 'instagram':
      url = 'https://www.instagram.com/thefacultyapp';
      break;
    case 'twitter':
      url = 'https://www.twitter.com/thefacultyapp';
      break;
    case 'facebook':
      url = 'https://www.facebook.com/thefacultyapp';
      break;
    case 'linkedin':
      url = 'https://www.linkedin.com/company/smartcreativesrl';
      break;
    case 'website':
      url = 'https://thefacultyapp.com';
      break;
  }
  key === 'website'
    ? standardFunctions.open_browser(url)
    : Linking.openURL(url);
};

const openStorePages = () => {
  let url = '';
  switch (Platform.OS) {
    case 'ios':
      url = 'https://apps.apple.com/it/app/thefaculty/id1444906315';
      if (StoreReview.isAvailable) {
        StoreReview.requestReview();
      } else {
        standardFunctions.open_browser(url);
      }
      break;
    case 'android':
      url =
        'https://play.google.com/store/apps/details?id=smartcreativesrl.thefaculty&hl=it';
      standardFunctions.open_browser(url);
      break;
  }
};

const openTermsAndConditions = () => {
  // standardFunctions.open_browser(constants.TERMS_AND_CONDITIONS_URL);
};

const openPrivacyPolicy = () => {
  // standardFunctions.open_browser(constants.PRIVACY_POLICY_URL);
};

const openSettingsHome = navigation => {
  navigation.navigate(routes.SETTINGS_SETTINGS_HOME);
};

const openChangePassword = navigation => {
  standardFunctions.play_tap_sound();
  standardFunctions.add_firebase_event_log('settings', 'btn_chng_pwd_clicked');
  navigation.navigate(routes.SETTINGS_CHANGE_PASSWORD);
};

const openChangeLegalChecks = navigation => {
  standardFunctions.play_tap_sound();
  standardFunctions.add_firebase_event_log(
    'settings',
    'btn_lgl_checks_clicked',
  );
  navigation.navigate(routes.SETTINGS_CHANGE_LEGAL_CHECKS);
};

const openNotificationLevelScreen = navigation => {
  standardFunctions.play_tap_sound();
  standardFunctions.add_firebase_event_log('settings', 'btn_ntfc_lvl_clicked');
  navigation.navigate(routes.SETTINGS_SETTINGS_NOTIFICATION);
};

const openFaqScreen = navigation => {
  standardFunctions.play_tap_sound();
  standardFunctions.add_firebase_event_log('settings', 'btn_faq_clicked');
  navigation.navigate(routes.SETTINGS_FAQ);
};

const openCartFidatyScreen = (navigation, user) => {
  navigation.navigate(routes.SETTINGS_CARTA_FIDATY, {user});
};

const openQuestionsQuality = navigation => {
  standardFunctions.play_tap_sound();
  standardFunctions.add_firebase_event_log('settings', 'btn_qstn_qlt_clicked');
  navigation.navigate(routes.SETTINGS_QUESTIONS_QUALITY);
};

const openPartnersScreen = navigation => {
  navigation.navigate(routes.SETTINGS_THEFACULTY_PARTNER);
};

export {
  openStudentSignupScreen,
  openEditFacultyScreen,
  openEmailComposeScreen,
  logOutHandler,
  openSocialPopup,
  openStorePages,
  openTermsAndConditions,
  openPrivacyPolicy,
  openSettingsHome,
  openFaqScreen,
  openEditSubject,
  openCartFidatyScreen,
  openQuestionsQuality,
  openPartnersScreen,
  openChangePassword,
  openChangeLegalChecks,
  openNotificationLevelScreen,
};
