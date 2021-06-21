import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { routes } from "../rootNavigation/navigation.constants";
import { stackConfig } from "./MainTabNavigator";

import UserDetailsScreen from "../../modules/Community/UserDetailsScreen";
import UserProfileImageScreen from "../../modules/Community/UserProfileImageScreen";
import StudentEmailVerify from "../../modules/SignUp/StudentEmailVerify";
import StudentCardVerify from "../../modules/SignUp/StudentCardVerify";
import CameraScreen from "../../modules/SignUp/CameraScreen";
import EmailPendingScreen from "../../modules/SignUp/EmailPendingScreen";
import StudentCardPending from "../../modules/SignUp/StudentCardPending";

const ContestScoreboardStack = createStackNavigator();
const ContestScoreboardStackScreens = () => (
  <ContestScoreboardStack.Navigator
    headerMode={'screen'}
    // @ts-ignore
    screenOptions={stackConfig.defaultNavigationOptions}>
    <ContestScoreboardStack.Screen
      name={routes.USER_DETAILS}
      component={UserDetailsScreen}
    />
    <ContestScoreboardStack.Screen
      name={routes.USER_PROFILE_IMAGE}
      component={UserProfileImageScreen}
    />
    <ContestScoreboardStack.Screen
      name={routes.SIGNUP.STUDENT_EMAIL_VERIFY}
      component={StudentEmailVerify}
    />
    <ContestScoreboardStack.Screen
      name={routes.SIGNUP.STUDENT_CARD_VERIFY}
      component={StudentCardVerify}
    />
    <ContestScoreboardStack.Screen
      name={routes.SIGNUP.CAMERA_SCREEN}
      component={CameraScreen}
    />
    <ContestScoreboardStack.Screen
      name={routes.SIGNUP.EMAIL_PENDING_SCREEN}
      component={EmailPendingScreen}
    />
    <ContestScoreboardStack.Screen
      name={routes.SIGNUP.STUDENT_CARD_PENDING}
      component={StudentCardPending}
    />
  </ContestScoreboardStack.Navigator>
);

export default ContestScoreboardStackScreens;
