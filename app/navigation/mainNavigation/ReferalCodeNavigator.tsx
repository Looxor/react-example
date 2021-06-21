import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {routes} from '../rootNavigation/navigation.constants';
import ReferralCodeScreen from '../../modules/ReferralCode';
import CodeReaderScreen from '../../modules/Settings/CodeReaderScreen';
import StudentEmailVerify from '../../modules/SignUp/StudentEmailVerify';
import StudentCardVerify from '../../modules/SignUp/StudentCardVerify';
import CameraScreen from '../../modules/SignUp/CameraScreen';
import EmailPendingScreen from '../../modules/SignUp/EmailPendingScreen';
import StudentCardPending from '../../modules/SignUp/StudentCardPending';
import {stackConfig} from './MainTabNavigator';

const ReferralStack = createStackNavigator();
const ReferralStackScreens = () => (
  <ReferralStack.Navigator
    headerMode={'screen'}
    // @ts-ignore
    screenOptions={stackConfig.defaultNavigationOptions}>
    <ReferralStack.Screen
      name={routes.REFERRAL_CODE_HOME}
      component={ReferralCodeScreen}
      // @ts-ignore
      options={ReferralCodeScreen.navigationOptions}
    />
    <ReferralStack.Screen
      name={routes.QRCODESCANNER}
      component={CodeReaderScreen}
      // @ts-ignore
      options={CodeReaderScreen.navigationOptions}
    />
    <ReferralStack.Screen
      name={routes.SIGNUP.STUDENT_EMAIL_VERIFY}
      component={StudentEmailVerify}
    />
    <ReferralStack.Screen
      name={routes.SIGNUP.STUDENT_CARD_VERIFY}
      component={StudentCardVerify}
    />
    <ReferralStack.Screen
      name={routes.SIGNUP.CAMERA_SCREEN}
      component={CameraScreen}
    />
    <ReferralStack.Screen
      name={routes.SIGNUP.EMAIL_PENDING_SCREEN}
      component={EmailPendingScreen}
    />
    <ReferralStack.Screen
      name={routes.SIGNUP.STUDENT_CARD_PENDING}
      component={StudentCardPending}
    />
  </ReferralStack.Navigator>
);

export default ReferralStackScreens;
