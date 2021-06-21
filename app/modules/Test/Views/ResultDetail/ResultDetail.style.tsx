import { StyleSheet } from "react-native";
import { colors, constants } from "../../../../config";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  closeButton: {
    alignSelf: 'center',
  },
  waybackInfoContainer: {
    borderWidth: constants.onePixel,
    borderColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  waybackRankingTitle: {
    fontFamily: constants.DEFAULT_FONT,
    textAlign: 'center',
    fontSize: 18,
    color: colors.gray,
  },
  waybackRankingValue: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    textAlign: 'center',
    fontSize: 25,
    marginVertical: 10,
  },
  waybackComplimentText: {
    fontFamily: constants.DEFAULT_FONT,
    textAlign: 'center',
    fontSize: 18,
    color: colors.gray,
  },
});
