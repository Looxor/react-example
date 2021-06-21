import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { routes } from "../rootNavigation/navigation.constants";
import { stackConfig } from "./MainTabNavigator";
import UserDetailsScreen from "../../modules/Community/UserDetailsScreen";
import UserProfileImageScreen from "../../modules/Community/UserProfileImageScreen";

const UserProfileImageFlowStack = createStackNavigator();
const UserProfileImageFlowStackScreens = () => (
  <UserProfileImageFlowStack.Navigator
    headerMode={'screen'}
    // @ts-ignore
    screenOptions={stackConfig.defaultNavigationOptions}>
    <UserProfileImageFlowStack.Screen
      name={routes.USER_DETAILS}
      component={UserDetailsScreen}
    />
    <UserProfileImageFlowStack.Screen
      name={routes.USER_PROFILE_IMAGE}
      component={UserProfileImageScreen}
    />
  </UserProfileImageFlowStack.Navigator>
);

export default UserProfileImageFlowStackScreens;
