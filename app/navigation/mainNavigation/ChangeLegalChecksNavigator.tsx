import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { routes } from "../rootNavigation/navigation.constants";
import { stackConfig } from "./MainTabNavigator";
import ChangeLegalChecksScreen from "../../modules/Settings/ChangeLegalChecksScreen";

const ChangeLegalChecksStack = createStackNavigator();
const ChangeLegalChecksStackScreens = () => (
  <ChangeLegalChecksStack.Navigator
    headerMode={'screen'}
    // @ts-ignore
    screenOptions={stackConfig.defaultNavigationOptions}>
    <ChangeLegalChecksStack.Screen
      name={routes.SETTINGS_CHANGE_LEGAL_CHECKS}
      component={ChangeLegalChecksScreen}
    />
  </ChangeLegalChecksStack.Navigator>
);

export default ChangeLegalChecksStackScreens;
