import React, { useEffect, useState } from "react";

import { ActivityIndicator, Text, View } from "react-native";
import StripeCheckout from "react-native-stripe-checkout-webview";

import { colors, constants, strings } from "../../../../config";
import styles from "./PrizeCheckout.style";
import { CallServerPromise } from "../../../../utils/app/CallServer";
import { routes } from "../../../../navigation/rootNavigation/navigation.constants";

const STRIPE_RESULT_STATUS = {
  UNKNOWN: -1,
  SUCCESS: 0,
  CANCEL: 1,
};

const LOADING_HTML = `<style>@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');</style> 
    <p style="font-family: Raleway,serif; font-size: 20pt; text-align: center;"
    ${strings.COUPONS.PRIZE_CHECKOUT_SCREEN.LOADING_TEXT} </p>`;

let interval4PollingGetPurchaseInfo: any = 0;
const PrizeCheckout = props => {
  const stripeCheckoutComponentProps = {
    stripePublicKey:
      constants.APP_MODE_CONTROLLED_BY_SERVER === 'PRODUCTION'
        ? constants.STRIPE_PUBLIC_KEY_PRODUCTION
        : constants.STRIPE_PUBLIC_KEY_TESTING,
    options: {
      htmlContentLoading: LOADING_HTML,
      baseUrl: 'https://thefacultyapp.com',
    },
    webViewProps: {source: {baseUrl: 'https://thefacultyapp.com'}},
  };

  const {
    route: {params = {}},
  } = props;
  const sessionId = params['sessionId'];
  const prize_purchase_id = params['prize_purchase_id'];

  const [stripeResultStatus, setStripeResultStatus] = useState(
    STRIPE_RESULT_STATUS.UNKNOWN,
  );
  const [checkoutSessionId, setCheckoutSessionId] = useState('');
  const [stripeStarted, setStripeStarted] = useState(false);
  const [stripeLoaded, setStripeLoaded] = useState(false);

  const onStripeSuccessHandler = response => {
    const {checkoutSessionId} = response;
    setCheckoutSessionId(checkoutSessionId);
    setStripeResultStatus(STRIPE_RESULT_STATUS.SUCCESS);
  };
  const onStripeCancelHandler = async () => {
    setStripeResultStatus(STRIPE_RESULT_STATUS.CANCEL);
    // await standardFunctions.show_alert_async(strings.APP_NAME, strings.COUPONS.PRIZE_CHECKOUT_SCREEN.CANCEL_CHECKOUT);
    props.navigation.goBack(null);
  };
  const onLoadingCompleteHandler = () => {
    setStripeLoaded(true);
  };
  const startStripeCheckout = () => {
    setStripeStarted(true);
    // setStripeResultStatus(STRIPE_RESULT_STATUS.UNKNOWN);
  };
  const componentDidMount = () => {
    startStripeCheckout();
    return componentWillUnMount;
  };

  const componentWillUnMount = () => {
    stopPolling4GetPurchaseInfo();
  };

  const startPolling4GetPurchaseInfo = () => {
    clearInterval(interval4PollingGetPurchaseInfo);
    interval4PollingGetPurchaseInfo = setInterval(
      polling4GetPurchaseInfo,
      5000,
    );
  };

  const polling4GetPurchaseInfo = async () => {
    // prize_purchase_id
    const request = await CallServerPromise.get_prize_purchase({
      prize_purchase_id,
    });
    if (request.success && request.data && request.data.verified === true) {
      stopPolling4GetPurchaseInfo();
      props.navigation.goBack(null);
      // @ts-ignore
      global.navigationData = {
        prize_purchase: request.data,
        from_checkout: true,
      };
      props.navigation.navigate(routes.COUPONS_PRIZE_PURCHASE_INFO, {
        from_checkout: true,
      });
    } else {
    }
  };

  const stopPolling4GetPurchaseInfo = () => {
    clearInterval(interval4PollingGetPurchaseInfo);
  };
  const onChangeResultStatus = () => {
    if (stripeResultStatus === STRIPE_RESULT_STATUS.SUCCESS) {
      startPolling4GetPurchaseInfo();
    } else {
      stopPolling4GetPurchaseInfo();
    }
  };

  useEffect(componentDidMount, []);
  useEffect(onChangeResultStatus, [stripeResultStatus]);

  return (
    <View style={styles.container}>
      {!stripeLoaded && (
        <ActivityIndicator
          color={colors.THEFACULTY}
          size={30}
          style={styles.loadingIcon}
        />
      )}
      {stripeStarted &&
        stripeResultStatus !== STRIPE_RESULT_STATUS.SUCCESS &&
        stripeResultStatus !== STRIPE_RESULT_STATUS.CANCEL && (
          <StripeCheckout
            style={styles.stripeCheckout}
            {...stripeCheckoutComponentProps}
            checkoutSessionInput={{
              sessionId,
            }}
            onSuccess={onStripeSuccessHandler}
            onCancel={onStripeCancelHandler}
            onLoadingComplete={onLoadingCompleteHandler}
          />
        )}
      <View style={styles.stripeStatus}>
        {stripeResultStatus === STRIPE_RESULT_STATUS.SUCCESS && (
          <>
            <Text
              style={[styles.stripeStatusText, styles.stripeStatusTextSuccess]}>
              {strings.COUPONS.PRIZE_CHECKOUT_SCREEN.SUCCESS_CHECKOUT}
              {'\n'}
              {
                strings.COUPONS.PRIZE_CHECKOUT_SCREEN
                  .GETTING_PURCHASE_INFORMATION
              }
            </Text>
            <Text style={styles.gettingPurchaseInfoText} />
            <ActivityIndicator color={colors.THEFACULTY} />
          </>
        )}
        {stripeResultStatus === STRIPE_RESULT_STATUS.CANCEL && (
          <Text
            style={[styles.stripeStatusText, styles.stripeStatusTextCancel]}>
            {strings.COUPONS.PRIZE_CHECKOUT_SCREEN.CANCEL_CHECKOUT}
          </Text>
        )}
      </View>
    </View>
  );
};

PrizeCheckout.navigationOptions = ({navigation}) => ({
  title: strings.COUPONS.PRIZE_CHECKOUT_SCREEN.TITLE,
});

export default PrizeCheckout;
