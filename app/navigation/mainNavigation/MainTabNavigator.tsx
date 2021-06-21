import React from "react";
import { Platform } from "react-native";

import { BackButtonTop, IOSEmptyNotchBar } from "../../components";
import { createStackNavigator } from "@react-navigation/stack";

import { routes } from "../rootNavigation/navigation.constants";

import { colors, constants } from "../../config";
import SettingsCardRegisterScreen from "../../modules/Settings/CardRegisterScreen";
import TabStackNavigator from "./BotomTabNavigator";
import ReferralStackScreens from "./ReferalCodeNavigator";
import CommunityStackScreens from "./CommunityNavigator";
import UserProfileImageFlowStackScreens from "./UserProfileImageFlowNavigator";
import PendingFriendshipsStackScreens from "./PendingFriendshipsNavigator";
import ContestScoreboardStackScreens from "./ContestScoreboardNavigator";
import TestStackScreens from "./TestNavigator";
import WalletStackScreens from "./Wallet";
import BestOfStackScreens from "./BestOfNavigator";
import CarouselStackScreens from "./CarouselNavigator";
import CuponsStackScreens from "./CouponsNavigator";
import SettingsStackScreens from "./SettingsNavigator";
import ProfileStackScreens from "./ProfileNavigator";
import ChangeLegalChecksStackScreens from "./ChangeLegalChecksNavigator";
import WebViewStackScreens from "./WebViewNavigator";
import GeneralWebView from "../../components/GeneralWebView";
import DeviceInfo from "react-native-device-info";

const notchOffset = DeviceInfo.hasNotch() ? 25 : 0;
const stackConfig = {
  headerLayoutPreset: 'center',
  defaultNavigationOptions: ({navigation}) => ({
    headerLeft: () => <BackButtonTop navigation={navigation} />,
    headerRight: () => null,
    headerTitleStyle: {
      ...Platform.select({
        android: {
          fontSize: 17,
          marginTop: 20,
          marginLeft: -20,
        },
        ios: {
          marginTop: 15 + notchOffset,
        },
      }),
      fontFamily: constants.DEFAULT_FONT_MEDIUM,
    },
    headerLeftContainerStyle: {
      ...Platform.select({
        android: {
          marginTop: 20,
        },
        ios: {
          marginTop: 15 + notchOffset,
        },
      }),
    },
    headerRightContainerStyle: {
      ...Platform.select({
        android: {
          marginTop: 20,
        },
        ios: {
          marginTop: 15 + notchOffset,
        },
      }),
    },
    headerStyle: {
      backgroundColor: colors.WHITE,
      ...Platform.select({
        android: {
          height: 70,
        },
        ios: {
          height: 58 + notchOffset,
        },
      }),
    },
  }),
};
const stackConfig4BestOf = {
  ...stackConfig,
  defaultNavigationOptions: ({navigation}) => {
    return {
      ...stackConfig.defaultNavigationOptions({navigation}),
      header: () => null,
      gesturesEnabled: false,
      gestureEnabled: false,
      swipeEnabled: false,
      // headerLeft: <BackButtonTop dismiss={dismiss} navigation={navigation}/>,
    };
  },
  navigationOptions: {
    gesturesEnabled: false,
    gestureEnabled: false,
    swipeEnabled: false,
  },
};

const MainStack = createStackNavigator();
const MainStackScreen = () => (
  <MainStack.Navigator
    initialRouteName={routes.TABBAR}
    // screenOptions={{header: () => <IOSEmptyNotchBar defaultHeaderHeight={0} />}}
    headerMode={'none'}>
    <MainStack.Screen name={routes.TABBAR} component={TabStackNavigator} />
    <MainStack.Screen
      name={routes.REFERRAL_CODE}
      component={ReferralStackScreens}
      options={{header: () => <IOSEmptyNotchBar />}}
    />
    <MainStack.Screen
      name={routes.COMMUNITY}
      component={CommunityStackScreens}
    />
    <MainStack.Screen
      name={routes.USER_PROFILE_IMAGE_FLOW}
      component={UserProfileImageFlowStackScreens}
    />
    <MainStack.Screen
      name={routes.PENDING_FRIENDSHIP_REQUESTS}
      component={PendingFriendshipsStackScreens}
    />
    <MainStack.Screen
      name={routes.CONTEST_SCOREBOARD}
      component={ContestScoreboardStackScreens}
    />
    <MainStack.Screen
      name={routes.TEST_NAVIGATOR}
      component={TestStackScreens}
    />
    <MainStack.Screen
      name={routes.WALLET}
      component={WalletStackScreens}
      options={{header: () => <IOSEmptyNotchBar />}}
    />
    <MainStack.Screen
      name={routes.BESTOF2_NAVIGATOR}
      component={BestOfStackScreens}
      options={{header: () => null, gestureEnabled: false}}
    />
    <MainStack.Screen
      name={routes.CAROUSEL}
      component={CarouselStackScreens}
      options={{header: () => <IOSEmptyNotchBar />}}
    />
    <MainStack.Screen
      name={routes.COUPONS_NAVIGATOR}
      component={CuponsStackScreens}
      options={{header: () => <IOSEmptyNotchBar />}}
    />
    <MainStack.Screen
      name={routes.SETTINGS_NAVIGATOR}
      component={SettingsStackScreens}
      options={{gestureEnabled: false}}
    />
    <MainStack.Screen
      name={routes.SETTINGS_CARD_REGISTER}
      component={SettingsCardRegisterScreen}
    />
    <MainStack.Screen
      name={routes.PROFILE_NAVIGATOR}
      component={ProfileStackScreens}
      options={{header: () => <IOSEmptyNotchBar />}}
    />
    <MainStack.Screen
      name={routes.CHANGE_LEGAL_CHECKS_NAVIGATOR}
      component={ChangeLegalChecksStackScreens}
    />
    <MainStack.Screen
      name={routes.GENERAL_WEBVIEW}
      component={WebViewStackScreens}
      // @ts-ignore
      options={GeneralWebView.navigationOptions}
    />
  </MainStack.Navigator>
);

export default MainStackScreen;
export {stackConfig, stackConfig4BestOf};
