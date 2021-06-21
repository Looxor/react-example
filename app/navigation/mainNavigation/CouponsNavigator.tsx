import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {routes} from '../rootNavigation/navigation.constants';
import {stackConfig} from './MainTabNavigator';
import CouponsCouponScreen from '../../modules/Benefits/Views/Coupons/CouponScreen';
import CouponScreen from '../../modules/Benefits/Views/Coupons/CouponScreen';
import CouponsPrizeDetailScreen from '../../modules/Benefits/Views/Prizes/PrizeDetail';
import CouponsPrizeCheckoutScreen from '../../modules/Benefits/Views/Prizes/PrizeCheckout';
import CouponsPrizePurchaseInfo from '../../modules/Benefits/Views/Prizes/PrizePurchaseInfo';
import CouponPrizesFilterScreen from '../../modules/Benefits/Views/Home/CouponPrizesFilterScreen';
import CouponsConditionsScreen from '../../modules/Benefits/Views/Coupons/ConditionsScreen';
import CouponsCodeScreen from '../../modules/Benefits/Views/Coupons/CodeScreen';
import CouponCodeScreen from '../../modules/Benefits/Views/Coupons/CodeScreen';
import CouponsHistoryListScreen from '../../modules/Benefits/Views/Coupons/HistoryListScreen';
import StudentEmailVerify from '../../modules/SignUp/StudentEmailVerify';
import StudentCardVerify from '../../modules/SignUp/StudentCardVerify';
import CameraScreen from '../../modules/SignUp/CameraScreen';
import EmailPendingScreen from '../../modules/SignUp/EmailPendingScreen';
import StudentCardPending from '../../modules/SignUp/StudentCardPending';
import GeneralWebView from '../../components/GeneralWebView';
import CircularTopBar from '../../components/CircularTopBar';

const CuponsStack = createStackNavigator();
const CuponsStackScreens = () => (
  <CuponsStack.Navigator
    headerMode={'screen'}
    // @ts-ignore
    screenOptions={{
      ...stackConfig.defaultNavigationOptions,
      header: ({navigation}) => (
        <CircularTopBar navigation={navigation} isInternal={true} />
      ),
    }}>
    <CuponsStack.Screen
      name={routes.COUPONS_COUPON}
      component={CouponsCouponScreen}
      // @ts-ignore
      options={CouponScreen.navigationOptions}
    />
    <CuponsStack.Screen
      name={routes.COUPONS_PRIZE_DETAIL}
      component={CouponsPrizeDetailScreen}
      // @ts-ignore
      options={CouponsPrizeDetailScreen.navigationOptions}
    />
    <CuponsStack.Screen
      name={routes.COUPONS_PRIZE_CHECKOUT}
      component={CouponsPrizeCheckoutScreen}
      // @ts-ignore
      options={CouponsPrizeCheckoutScreen.navigationOptions}
    />
    <CuponsStack.Screen
      name={routes.COUPONS_PRIZE_PURCHASE_INFO}
      component={CouponsPrizePurchaseInfo}
      // @ts-ignore
      options={CouponsPrizePurchaseInfo.navigationOptions}
    />
    <CuponsStack.Screen
      name={routes.COUPONS_PRIZE_FILTER_SCREEN}
      component={CouponPrizesFilterScreen}
      options={CouponPrizesFilterScreen.navigationOptions}
    />
    <CuponsStack.Screen
      name={routes.COUPONS_CONDITIONS}
      component={CouponsConditionsScreen}
    />
    <CuponsStack.Screen
      name={routes.COUPONS_CODE}
      component={CouponsCodeScreen}
      // @ts-ignore
      options={CouponCodeScreen.navigationOptions}
    />
    <CuponsStack.Screen
      name={routes.COUPONS_HISTORY_LIST}
      component={CouponsHistoryListScreen}
    />
    <CuponsStack.Screen
      name={routes.SIGNUP.STUDENT_EMAIL_VERIFY}
      component={StudentEmailVerify}
    />
    <CuponsStack.Screen
      name={routes.SIGNUP.STUDENT_CARD_VERIFY}
      component={StudentCardVerify}
    />
    <CuponsStack.Screen
      name={routes.SIGNUP.CAMERA_SCREEN}
      component={CameraScreen}
    />
    <CuponsStack.Screen
      name={routes.SIGNUP.EMAIL_PENDING_SCREEN}
      component={EmailPendingScreen}
    />
    <CuponsStack.Screen
      name={routes.SIGNUP.STUDENT_CARD_PENDING}
      component={StudentCardPending}
    />
    <CuponsStack.Screen
      name={routes.GENERAL_WEBVIEW}
      component={GeneralWebView}
      // @ts-ignore
      options={GeneralWebView.navigationOptions}
    />
  </CuponsStack.Navigator>
);

export default CuponsStackScreens;
