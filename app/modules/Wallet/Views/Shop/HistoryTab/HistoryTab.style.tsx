import { StyleSheet } from "react-native";
import { colors, constants } from "../../../../../config";

export default StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  emptyContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  emptyLogo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 20,
  },
  emptyDescription: {
    fontSize: 18,
    color: colors.lightGray,
    lineHeight: 23,
    marginTop: 10,
    padding: 14,
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
  },
  loadingIcon: {
    marginTop: 145,
  },
  purchaseTransactionItem: {
    marginBottom: 20,
  },
  getCoinsButton: {
    width: 200,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderWidth: constants.onePixel * 2,
    borderColor: colors.THEFACULTY,
  },
  getCoinsButtonText: {
    color: colors.THEFACULTY,
  },
});
