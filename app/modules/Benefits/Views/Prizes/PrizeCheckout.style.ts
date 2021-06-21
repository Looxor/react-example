import { Dimensions, StyleSheet } from "react-native";
import { constants } from "../../../../config";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  loadingIcon: {
    position: 'absolute',
    zIndex: 1000,
    width: 100,
    height: 100,
    top: Dimensions.get('window').height / 2 - 100,
    left: Dimensions.get('window').width / 2 - 50,
  },
  stripeCheckout: {
    alignSelf: 'center',
  },
  stripeStatus: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  stripeStatusText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 18,
    textAlign: 'center',
  },
  stripeStatusTextSuccess: {},
  stripeStatusTextCancel: {},
  gettingPurchaseInfoText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
});
