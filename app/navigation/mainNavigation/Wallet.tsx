import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { routes } from "../rootNavigation/navigation.constants";
import { stackConfig } from "./MainTabNavigator";
import WalletMain from "../../modules/Wallet/Views/Main";
import WalletShop from "../../modules/Wallet/Views/Shop";

const WalletStack = createStackNavigator();
const WalletStackScreens = () => (
  <WalletStack.Navigator
    headerMode={'screen'}
    // @ts-ignore
    screenOptions={stackConfig.defaultNavigationOptions}>
    <WalletStack.Screen
      name={routes.WALLET_MAIN}
      component={WalletMain}
      // @ts-ignore
      options={WalletMain.navigationOptions}
    />
    <WalletStack.Screen name={routes.WALLET_SHOP} component={WalletShop} />
  </WalletStack.Navigator>
);

export default WalletStackScreens;
