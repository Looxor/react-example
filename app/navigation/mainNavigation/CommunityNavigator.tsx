import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { routes } from "../rootNavigation/navigation.constants";
import { stackConfig } from "./MainTabNavigator";
import FriendsScreen from "../../modules/Community";
import UserDetailsScreen from "../../modules/Community/UserDetailsScreen";
import UserProfileImageScreen from "../../modules/Community/UserProfileImageScreen";

const CommunityStack = createStackNavigator();
const CommunityStackScreens = () => (
  <CommunityStack.Navigator
    headerMode={'screen'}
    // @ts-ignore
    screenOptions={stackConfig.defaultNavigationOptions}>
    <CommunityStack.Screen name={routes.FRIENDS} component={FriendsScreen} />
    <CommunityStack.Screen
      name={routes.USER_DETAILS}
      component={UserDetailsScreen}
    />
    <CommunityStack.Screen
      name={routes.USER_PROFILE_IMAGE}
      component={UserProfileImageScreen}
    />
  </CommunityStack.Navigator>
);

export default CommunityStackScreens;
