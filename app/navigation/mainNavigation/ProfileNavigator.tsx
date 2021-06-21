import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {routes} from '../rootNavigation/navigation.constants';
import {stackConfig} from './MainTabNavigator';
import UserDetailsScreen from '../../modules/Community/UserDetailsScreen';
import UserProfileImageScreen from '../../modules/Community/UserProfileImageScreen';
import ProfileHomeScreen from '../../modules/ProfileV2/Views/HomeScreen';
import SettingsEditFacultyScreen from '../../modules/Settings/EditFacultyScreen';
import ProfileConfirmEmailScreen from '../../modules/ProfileV2/Views/ConfirmEmailScreen';
import StudentEmailVerify from '../../modules/SignUp/StudentEmailVerify';
import StudentCardVerify from '../../modules/SignUp/StudentCardVerify';
import CameraScreen from '../../modules/SignUp/CameraScreen';
import EmailPendingScreen from '../../modules/SignUp/EmailPendingScreen';
import StudentCardPending from '../../modules/SignUp/StudentCardPending';
import ProfileStudentVerifyEmail from '../../modules/ProfileV2/Views/StudentVerify/StudentEmailVerify';
import ProfileStudentVerifyEmailPending from '../../modules/ProfileV2/Views/StudentVerify/StudentEmailPending';
import ProfileStudentVerifyCard from '../../modules/ProfileV2/Views/StudentVerify/StudentCardVerify';
import ProfileStudentVerifyCardPending from '../../modules/ProfileV2/Views/StudentVerify/StudentCardPending';
import {strings} from '../../config';
import ConfirmEmailScreen from '../../modules/ProfileV2/Views/ConfirmEmailScreen';
import CircularTopBar from '../../components/CircularTopBar';

const ProfileStack = createStackNavigator();
const ProfileStackScreens = () => (
  <ProfileStack.Navigator
    headerMode={'screen'}
    // @ts-ignore
    screenOptions={{
      ...stackConfig.defaultNavigationOptions,
      header: ({navigation}) => (
        <CircularTopBar navigation={navigation} isInternal={true} />
      ),
    }}
    initialRouteName={routes.PROFILE_HOME}>
    <ProfileStack.Screen
      name={routes.PROFILE_HOME}
      component={ProfileHomeScreen}
      options={ProfileHomeScreen.navigationOptions}
    />
    <ProfileStack.Screen
      name={routes.SETTINGS_EDIT_FACULTY}
      component={SettingsEditFacultyScreen}
      options={{title: strings.SETTINGS.EDIT_FACULTY.TITLE}}
    />
    <ProfileStack.Screen
      name={routes.PROFILE_CONFIRM_EMAIL}
      component={ProfileConfirmEmailScreen}
      options={ConfirmEmailScreen.navigationOptions}
    />
    <ProfileStack.Screen
      name={routes.SIGNUP.STUDENT_EMAIL_VERIFY}
      component={StudentEmailVerify}
    />
    <ProfileStack.Screen
      name={routes.SIGNUP.STUDENT_CARD_VERIFY}
      component={StudentCardVerify}
    />
    <ProfileStack.Screen
      name={routes.SIGNUP.CAMERA_SCREEN}
      component={CameraScreen}
      options={{title: strings.SIGNUP.STUDENT_CARD_VERIFY.TITLE}}
    />
    <ProfileStack.Screen
      name={routes.SIGNUP.EMAIL_PENDING_SCREEN}
      component={EmailPendingScreen}
    />
    <ProfileStack.Screen
      name={routes.SIGNUP.STUDENT_CARD_PENDING}
      component={StudentCardPending}
    />
    <ProfileStack.Screen
      name={routes.USER_DETAILS}
      component={UserDetailsScreen}
    />
    <ProfileStack.Screen
      name={routes.USER_PROFILE_IMAGE}
      component={UserProfileImageScreen}
    />
    <ProfileStack.Screen
      name={routes.PROFILE_STUDENT_VERIFY_EMAIL}
      component={ProfileStudentVerifyEmail}
      options={{title: strings.SIGNUP.STUDENT1.TITLE}}
    />
    <ProfileStack.Screen
      name={routes.PROFILE_STUDENT_VERIFY_EMAIL_PENDING}
      component={ProfileStudentVerifyEmailPending}
    />
    <ProfileStack.Screen
      name={routes.PROFILE_STUDENT_VERIFY_CARD}
      component={ProfileStudentVerifyCard}
      options={{title: strings.SIGNUP.STUDENT1.TITLE}}
    />
    <ProfileStack.Screen
      name={routes.PROFILE_STUDENT_VERIFY_CARD_PENDING}
      component={ProfileStudentVerifyCardPending}
      options={{title: strings.SIGNUP.STUDENT_CARD_PENDING.TITLE}}
    />
  </ProfileStack.Navigator>
);

export default ProfileStackScreens;
