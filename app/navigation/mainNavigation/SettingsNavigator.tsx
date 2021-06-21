import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { routes } from "../rootNavigation/navigation.constants";
import { stackConfig } from "./MainTabNavigator";
import SettingsHomeScreen from "../../modules/Settings/HomeScreen";
import SettingsEditFacultyScreen from "../../modules/Settings/EditFacultyScreen";
import SettingsEditSubjectWeightScreen1 from "../../modules/Settings/EditSubjectWeightScreen1";
import SettingsEditSubjectWeightScreen2 from "../../modules/Settings/EditSubjectWeightScreen2";
import SettingsEditSubjectWeightScreen3 from "../../modules/Settings/EditSubjectWeightScreen3";
import SettingsSettingsHomeScreen from "../../modules/Settings/SettingsHomeScreen";
import SettingsNotificationSettingsScreen from "../../modules/Settings/NotificationSettingsScreen";
import SettingsChangePasswordScreen from "../../modules/Settings/ChangePasswordScreen";
import ChangeLegalChecksScreen from "../../modules/Settings/ChangeLegalChecksScreen";
import SettingsDeleteAccountScreen from "../../modules/Settings/DeleteAccountScreen";
import SettingsQuestionsQualityScreen from "../../modules/Settings/QuestionsQualityScreen";
import SettingsPartnersScreen from "../../modules/Settings/PartnersScreen";
import SettingsFaqScreen from "../../modules/Settings/FaqScreen";
import SettingsCartaFidatyScreen from "../../modules/Settings/CartaFidatyScreen";
import SettingsScopriDiscoverScreen from "../../modules/Settings/ScopriDiscoverScreen";
import CodeReaderScreen from "../../modules/Settings/CodeReaderScreen";
import StudentEmailVerify from "../../modules/SignUp/StudentEmailVerify";
import StudentCardVerify from "../../modules/SignUp/StudentCardVerify";
import CameraScreen from "../../modules/SignUp/CameraScreen";
import EmailPendingScreen from "../../modules/SignUp/EmailPendingScreen";
import StudentCardPending from "../../modules/SignUp/StudentCardPending";
import SettingsCardRegisterScreen from "../../modules/Settings/CardRegisterScreen";
import SettingsMathJaxScreen from "../../modules/Settings/MathJaxTestScreen";
import SocialLoginTestScreen from "../../modules/Settings/SocialLoginTestScreen";
import StripeTestScreen from "../../modules/Settings/StripeTestScreen";
import FlatListTestScreen from "../../modules/Settings/FlatListTestScreen";
import GeneralWebView from "../../components/GeneralWebView";
import { strings } from "../../config";

const SettingsStack = createStackNavigator();
const SettingsStackScreens = () => (
  <SettingsStack.Navigator
    headerMode={'screen'}
    // @ts-ignore
    screenOptions={stackConfig.defaultNavigationOptions}>
    <SettingsStack.Screen
      name={routes.SETTINGS_HOME}
      component={SettingsHomeScreen}
      options={{title: strings.SETTINGS.TITLE}}
    />
    <SettingsStack.Screen
      name={routes.SETTINGS_EDIT_FACULTY}
      component={SettingsEditFacultyScreen}
      options={{title: strings.SETTINGS.EDIT_FACULTY.TITLE}}
    />
    <SettingsStack.Screen
      name={routes.SETTINGS_EDIT_SUBJECT_WEIGHT1}
      component={SettingsEditSubjectWeightScreen1}
    />
    <SettingsStack.Screen
      name={routes.SETTINGS_EDIT_SUBJECT_WEIGHT2}
      component={SettingsEditSubjectWeightScreen2}
    />
    <SettingsStack.Screen
      name={routes.SETTINGS_EDIT_SUBJECT_WEIGHT3}
      component={SettingsEditSubjectWeightScreen3}
    />
    <SettingsStack.Screen
      name={routes.SETTINGS_SETTINGS_HOME}
      component={SettingsSettingsHomeScreen}
    />
    <SettingsStack.Screen
      name={routes.SETTINGS_SETTINGS_NOTIFICATION}
      component={SettingsNotificationSettingsScreen}
      options={{title: strings.SETTINGS.SETTINGS_HOME.TITLE}}
    />
    <SettingsStack.Screen
      name={routes.SETTINGS_CHANGE_PASSWORD}
      component={SettingsChangePasswordScreen}
    />
    <SettingsStack.Screen
      name={routes.SETTINGS_CHANGE_LEGAL_CHECKS}
      component={ChangeLegalChecksScreen}
      options={{title: strings.SETTINGS.CHANGE_LEGAL_CHECKS.TITLE}}
    />
    <SettingsStack.Screen
      name={routes.SETTINGS_DELETE_ACCOUNT}
      component={SettingsDeleteAccountScreen}
      options={{title: strings.SETTINGS.DELETE_ACCOUNT.TITLE}}
    />
    <SettingsStack.Screen
      name={routes.SETTINGS_QUESTIONS_QUALITY}
      component={SettingsQuestionsQualityScreen}
      options={{title: strings.SETTINGS.QUESTIONS_QUALITY.TITLE}}
    />
    <SettingsStack.Screen
      name={routes.SETTINGS_THEFACULTY_PARTNER}
      component={SettingsPartnersScreen}
    />
    <SettingsStack.Screen
      name={routes.SETTINGS_FAQ}
      component={SettingsFaqScreen}
      options={{title: strings.SETTINGS.FAQ.TITLE}}
    />
    <SettingsStack.Screen
      name={routes.SETTINGS_CARTA_FIDATY}
      component={SettingsCartaFidatyScreen}
    />
    <SettingsStack.Screen
      name={routes.SETTINGS_SCOPRI_DISCOVER}
      component={SettingsScopriDiscoverScreen}
    />
    <SettingsStack.Screen
      name={routes.SETTINGS_BARCODE_READER}
      component={CodeReaderScreen}
    />
    <SettingsStack.Screen
      name={routes.SIGNUP.STUDENT_EMAIL_VERIFY}
      component={StudentEmailVerify}
    />
    <SettingsStack.Screen
      name={routes.SIGNUP.STUDENT_CARD_VERIFY}
      component={StudentCardVerify}
    />
    <SettingsStack.Screen
      name={routes.SIGNUP.CAMERA_SCREEN}
      component={CameraScreen}
    />
    <SettingsStack.Screen
      name={routes.SIGNUP.EMAIL_PENDING_SCREEN}
      component={EmailPendingScreen}
    />
    <SettingsStack.Screen
      name={routes.SIGNUP.STUDENT_CARD_PENDING}
      component={StudentCardPending}
    />
    <SettingsStack.Screen
      name={routes.SETTINGS_CARD_REGISTER}
      component={SettingsCardRegisterScreen}
    />
    <SettingsStack.Screen
      name={routes.SETTINGS_MATHJAX}
      component={SettingsMathJaxScreen}
    />
    <SettingsStack.Screen
      name={routes.SETTINGS_SOCIAL_SIGNIN}
      component={SocialLoginTestScreen}
    />
    <SettingsStack.Screen
      name={routes.SETTINGS_STRIPE_TEST_SCREEN}
      component={StripeTestScreen}
    />
    <SettingsStack.Screen
      name={routes.SETTINGS_FLATLIST_TEST_SCREEN}
      component={FlatListTestScreen}
    />
    <SettingsStack.Screen
      name={routes.GENERAL_WEBVIEW}
      component={GeneralWebView}
    />
  </SettingsStack.Navigator>
);

export default SettingsStackScreens;
