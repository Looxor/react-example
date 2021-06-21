import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../../config";
import constants from "../../../../config/constants";

export default StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  payment: {},
  paymentText: {},

  subTitle: {
    backgroundColor: colors.WHITE,
    height: 43,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitleText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 16,
    color: colors.WHITE,
  },
  prizeInfo: {
    backgroundColor: colors.WHITE,
  },
  prizePartnerImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * (9 / 16),
    marginVertical: 10,
    alignSelf: 'center',
  },
  prizeTitle: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 22,
    paddingHorizontal: 20,
    color: colors.DARK_ALOE_TF,
  },
  prizeDesc: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    color: colors.DARK_ALOE_TF,
  },
  denominationsList: {
    marginBottom: 20,
    paddingVertical: 10,
  },
  denominationsList2: {},

  payments: {
    paddingHorizontal: 20,
  },
  paymentsTitle: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 18,
    marginVertical: 10,
    marginBottom: 15,
    color: colors.LIGHT_ALOE_TF,
  },
  paymentsList: {},
  rewardRequestButton: {
    alignSelf: 'center',
  },
  rewardRequestButtonText: {
    color: colors.WHITE,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 20,
  },
  subContainer2_button: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 70,
  },
  redeemButton: {
    alignSelf: 'center',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.COUPONS.BG1,
  },
  redeemButtonDisabled: {
    alignSelf: 'center',
    backgroundColor: '#5FA3AC',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
