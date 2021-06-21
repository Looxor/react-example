import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { routes } from "../rootNavigation/navigation.constants";
import { stackConfig } from "./MainTabNavigator";
import PendingFriendshipsScreen from "../../modules/Community/PendingFriendshipsScreen";
import UserDetailsScreen from "../../modules/Community/UserDetailsScreen";
import UserProfileImageScreen from "../../modules/Community/UserProfileImageScreen";

const PendingFriendshipsStack = createStackNavigator();
const PendingFriendshipsStackScreens = () => (
  <PendingFriendshipsStack.Navigator
    headerMode={'screen'}
    // @ts-ignore
    screenOptions={stackConfig.defaultNavigationOptions}>
    <PendingFriendshipsStack.Screen
      name={routes.PENDING_FRIENDSHIP_REQUESTS}
      component={PendingFriendshipsScreen}
    />
    <PendingFriendshipsStack.Screen
      name={routes.USER_DETAILS}
      component={UserDetailsScreen}
    />
    <PendingFriendshipsStack.Screen
      name={routes.USER_PROFILE_IMAGE}
      component={UserProfileImageScreen}
    />
  </PendingFriendshipsStack.Navigator>
);

export default PendingFriendshipsStackScreens;
