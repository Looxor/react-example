/**
 * Swtch splits routes beetween logged user and not logged ones
 */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { routes } from "./navigation.constants";
import AuthStackNavigator from "../authNavigation";
import MainTabNavigator from "../mainNavigation";
import SettingsDeleteAccountAfterScreen from "../../modules/Startapp/DeleteAccountAfterScreen";
import SplashScreenSS from "../../modules/Startapp/SplashScreenSS";

const Stack = createStackNavigator();

const SwitchNavigator = () => (
  <Stack.Navigator
    initialRouteName={routes.SPLASH}
    screenOptions={{gestureEnabled: false}}>
    <Stack.Screen
      name={routes.SPLASH}
      component={SplashScreenSS}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name={routes.AUTH}
      component={AuthStackNavigator}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name={routes.MAIN}
      component={MainTabNavigator}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name={routes.SETTINGS_DELETE_ACCOUNT_AFTER}
      component={SettingsDeleteAccountAfterScreen}
      options={{
        header: () => null,
      }}
    />
  </Stack.Navigator>
);

export default SwitchNavigator;
