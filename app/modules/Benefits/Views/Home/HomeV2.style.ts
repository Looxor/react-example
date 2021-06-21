import { StyleSheet } from "react-native";
import { colors, constants } from "../../../../config";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  mainImageBackground: {
    flex: 1,
  },
  title: {
    alignSelf: 'center',
    marginTop: 5,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 22,
    color: colors.COUPONS.BG1,
  },
  description: {
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 5,
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    color: colors.COUPONS.BG1,
  },
  subContainerList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // alignItems: 'stretch',
    alignContent: 'flex-start',
    // backgroundColor: colors.DEFAULT_BACKGROUND,
  },
});
