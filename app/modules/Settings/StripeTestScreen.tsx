import * as React from "react";
import { StyleSheet } from "react-native";
import StripeCheckout from "react-native-stripe-checkout-webview";
import { constants } from "../../config";

const StripeTestScreen = props => {
  const componentDidMount = () => {
    return componentWillUnmount;
  };

  const componentWillUnmount = () => {};

  const stripeCheckoutComponentProps = {
    stripePublicKey:
      constants.APP_MODE_CONTROLLED_BY_SERVER === 'PRODUCTION'
        ? 'pk_live_bWtUorZy3bmMGqzWH0MK4Pme00IFHTzcBA'
        : 'pk_test_UOrlM37VpR6ULfRNGGHxSRdU009PkoB4Sa',
    checkoutSessionInput: {
      sessionId:
        'cs_test_ISTovv1EEOSXk3yvr6pWxWWcAXEnVcDhRWf8rAePlZp4E2M4Qd22NOwO',
    },
    // Session succeeded
    onSuccess: ({checkoutSessionId}) => {
      console.log('Success.');
      console.log(checkoutSessionId);
    },
    // Session cancelled
    onCancel: () => {
      console.log('Cancelled.');
    },
  };

  React.useEffect(componentDidMount, []);

  let font =
    "<style>@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');</style>";
  let f = 'font-family: Raleway; font-size: 25px; text-align: center;';
  let loading = font + '<p style=' + f + '>Caricamento acquisto...</p>';
  return (
    <StripeCheckout
      stripePublicKey={'pk_test_UOrlM37VpR6ULfRNGGHxSRdU009PkoB4Sa'}
      options={{
        htmlContentLoading: loading,
      }}
      {...stripeCheckoutComponentProps}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});

StripeTestScreen.navigationOptions = ({navigation}) => ({
  title: 'Stripe Test',
});

export default StripeTestScreen;
