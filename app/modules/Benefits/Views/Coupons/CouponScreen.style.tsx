import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../../config";
import constants from "../../../../config/constants";

const yellow_box_height_1 = 43;
const yellow_box_height_2 = 70;

const mainImageHeight =
  Dimensions.get('window').width * (9 / 16) + yellow_box_height_1;
const mainImageHeight2 =
  Dimensions.get('window').width * (9 / 16) + yellow_box_height_2;

export default StyleSheet.create({
  processingMarkUsed: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.WHITE,
    opacity: 0.6,
    justifyContent: 'space-around',
  },
  container: {
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    flexGrow: 1,
    width: '100%',
  },
  imageContainer: {
    width: Dimensions.get('window').width - 1,
    height: mainImageHeight,
    zIndex: 2,
  },
  imageContainer_v2: {
    width: Dimensions.get('window').width - 1,
    height: mainImageHeight2,
    zIndex: 2,
  },
  mainImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * (9 / 16),
    alignSelf: 'center',
    backgroundColor: colors.WHITE,
  },
  ribbonImageContainer: {
    flexDirection: 'row',
    width: 160,
    elevation: 3,
    zIndex: 10,
  },
  ribbonLabel: {
    marginLeft: 5,
    color: colors.COUPONS.BG1,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 16,
    elevation: 12,
    zIndex: 25,
  },
  ribbonImage: {
    width: 22,
    height: 22,
  },
  ribbonInfo: {
    width: 22,
    height: 22,
    zIndex: 10,
    elevation: 3,
    top: 2,
    left: 3,
  },
  subContainer1: {
    minHeight: Dimensions.get('window').height - mainImageHeight,
  },
  subContainer1_v2: {
    minHeight: Dimensions.get('window').height - mainImageHeight2,
  },
  subContainer1_1: {
    padding: 20,
    marginBottom: 15,
    // borderBottomRightRadius: 25,
    // borderBottomLeftRadius: 25
  },
  subContainer2: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: 15,
  },
  pointPinBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: yellow_box_height_1,
  },
  pointPinBox_v2: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: yellow_box_height_2,
  },
  pointPinBox2: {
    position: 'absolute',
    justifyContent: 'center',
    flexDirection: 'row',
    right: 20,
  },
  pointPinBoxFree: {
    width: 140,
  },
  pointPinBoxIcon: {
    width: 28,
    height: 28,
  },
  pointPinBoxIconUsed: {
    width: 20,
    height: 20,
    marginLeft: 15,
    marginTop: -1,
  },
  pointPinBoxText1: {
    width: '90%',
    fontFamily: constants.DEFAULT_FONT,
    color: colors.WHITE,
    fontSize: 16,
    position: 'absolute',
    left: 20,
    flexDirection: 'column',
  },
  pointPinBoxText2: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    color: colors.WHITE,
    fontSize: 16,
    marginRight: 5,
  },
  title: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 22,
    color: colors.COUPONS.BG1,
  },
  description: {
    fontFamily: constants.DEFAULT_FONT,
    color: colors.COUPONS.BG1,
    fontSize: 16,
    marginTop: 10,
    flexWrap: 'wrap',
    paddingBottom: 5,
  },
  subContainer2_button: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 70,
  },
  conditionsButton: {
    height: 35,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  conditionsButtonText: {
    color: colors.THEFACULTY,
    fontSize: 16,
  },
  redeemButton: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.COUPONS.BG1,
  },
  redeemButtonDisabled: {
    backgroundColor: '#5FA3AC',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  redeemButtonText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 20,
  },
  redeeming: {
    backgroundColor: colors.WHITE,
    flex: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
    borderRadius: 18,
  },
  redeemingText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 18,
    marginTop: 10,
  },
  subContainer_requirements: {},
  requirementsLabel: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    color: colors.LIGHT_ALOE_TF,
    fontSize: 18,
    marginLeft: 20,
    marginBottom: 10,
  },
  conditionCheckBox: {
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  conditionCheckBoxNotSatisfied: {
    marginVertical: 5,
    borderWidth: 4,
    borderRadius: 16,
    borderColor: 'rgba(36, 91, 98, 0.4)',
  },
  conditionCheckBoxHighlight: {
    backgroundColor: 'rgba(36, 91, 98, 0.1)',
  },
  helperConditionNotSatisfied: {
    justifyContent: 'center',
    right: 10,
  },
  conditionCheckBoxTextContainer: {
    marginLeft: 10,
  },
  conditionCheckBoxText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    marginLeft: 10,
    color: colors.COUPONS.BG1,
  },
  conditionCheckBoxAction: {
    color: colors.LIGHT_ALOE_TF,
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    marginLeft: 10,
    marginTop: 5,
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
  popoverContainer: {
    backgroundColor: colors.DEFAULT_BACKGROUND,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    position: 'absolute',
    top: 21,
    left: 0,
    width: 300,
    borderRadius: 12,
    shadowColor: '#777',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    zIndex: 20,
    elevation: 10,
  },
  popoverTextStyle: {
    color: colors.DARK_ALOE_TF,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
  },
  overlayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
