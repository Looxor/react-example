import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { routes } from "../rootNavigation/navigation.constants";
import { stackConfig } from "./MainTabNavigator";
import GeneralWebView from "../../components/GeneralWebView";

const WebViewStack = createStackNavigator();
const WebViewStackScreens = () => (
  <WebViewStack.Navigator
    headerMode={'screen'}
    // @ts-ignore
    screenOptions={stackConfig.defaultNavigationOptions}>
    <WebViewStack.Screen
      name={routes.GENERAL_WEBVIEW}
      component={GeneralWebView}
      // @ts-ignore
      options={GeneralWebView.navigationOptions}
    />
  </WebViewStack.Navigator>
);

export default WebViewStackScreens;
