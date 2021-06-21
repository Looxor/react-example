import { StatusBar, StyleSheet } from "react-native";
import { colors, constants } from "../../../../config";

export default StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.WHITE,
  },
  subContainer1: {
    zIndex: 10,
  },
  subContainer2: {
    alignItems: 'center',
    marginBottom: 20,
  },
  screenTitle: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 22,
    color: colors.COUPONS.BG1,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 30,
  },
  partnerLabel: {},
  typeLabel: {},
  dateLabel: {},
  labelContainer: {
    marginLeft: 50,
    marginTop: 20,
    flexDirection: 'row',
  },
  labelText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 18,
    color: colors.COUPONS.BG1,
    marginLeft: 8,
  },
  hatIcon: {
    width: 23,
    height: 23,
  },
  applyButton: {
    borderRadius: 13,
    backgroundColor: colors.COUPONS.BG1,
    shadowOpacity: 0.7,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 5,
    elevation: 5,
  },
  applyButtonText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 18,
  },
  removeButton: {
    borderRadius: 13,
    backgroundColor: colors.WHITE,
    shadowColor: colors.lightGray,
    shadowOpacity: 0.7,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 5,
    elevation: 5,
  },
  removeButtonText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 18,
    color: colors.COUPONS.BG1,
  },
});
