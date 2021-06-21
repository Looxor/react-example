import { StyleSheet } from "react-native";
import { colors, constants } from "../../../../config";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  subContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  subContainerEmpty: {
    justifyContent: 'space-between',
  },
  buyButtonContainer: {
    alignItems: 'center',
  },
  buyButton: {
    width: '50%',
  },
  hrLine: {
    backgroundColor: colors.lightGray,
    height: constants.onePixel,
    width: '80%',
    marginTop: 5,
    marginBottom: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 350,
  },
  emptyCoinsImage: {
    width: 80,
    height: 80,
    marginTop: -100,
  },
  emptyDesc: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: colors.lightGray,
    fontFamily: constants.DEFAULT_FONT,
  },
  footerContainer: {
    flex: 1,
    marginTop: 0,
    width: '100%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coins_expiring_label: {
    marginTop: 5,
    marginLeft: 15,
    marginBottom: 15,
    textAlign: 'left',
    fontSize: 16,
    color: colors.BLACK,
    fontFamily: constants.DEFAULT_FONT,
  },
});
