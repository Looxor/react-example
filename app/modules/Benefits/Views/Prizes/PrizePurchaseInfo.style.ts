import { StyleSheet } from "react-native";
import { colors, constants } from "../../../../config";

export default StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {},
  partnerImage: {
    alignSelf: 'center',
    width: '105%',
    height: 160,
    marginVertical: 20,
  },
  duration: {
    width: '100%',
    height: 43,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  durationText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 17,
    color: colors.WHITE,
  },
  codeViewContainer: {
    width: '92%',
    alignSelf: 'center',
  },
  codeViewDesc: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 15,
  },
  prizeTitle: {
    marginTop: 20,
    marginLeft: 20,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 22,
    color: colors.DARK_ALOE_TF,
  },
  prizeDesc: {
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 20,
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    color: colors.DARK_ALOE_TF,
  },
  terms: {
    paddingBottom: 25,
  },
  usedCouponContainer: {
    backgroundColor: colors.THEFACULTY,
    flexDirection: 'row',
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  usedCouponLabel: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  usedCouponLabelIcon: {
    width: 22,
    height: 22,
    marginLeft: 15,
  },
  usedCouponLabelText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 18,
    color: colors.WHITE,
    marginLeft: 10,
  },
  usedCouponButton: {
    position: 'absolute',
    flexDirection: 'row',
    right: 18,
  },
  usedCouponButtonText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 18,
    color: colors.WHITE,
  },
  subContainer2_button: {
    marginTop: -10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 100,
  },
  redeemButton: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.COUPONS.BG1,
  },
  redeemButtonText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 20,
  },
});
