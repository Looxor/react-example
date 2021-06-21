import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { routes } from "../rootNavigation/navigation.constants";
import SplashScreenSS from "../../modules/Startapp/SplashScreenSS";

const SplashStack = createStackNavigator();
const SplashStackScreens = () => (
  <SplashStack.Navigator headerMode={'none'}>
    <SplashStack.Screen name={routes.SPLASHSCREEN} component={SplashScreenSS} />
  </SplashStack.Navigator>
);
export default SplashStackScreens;
