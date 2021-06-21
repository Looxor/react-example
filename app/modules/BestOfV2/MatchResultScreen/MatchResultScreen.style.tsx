import { StyleSheet } from "react-native";
import { colors, constants } from "../../../config";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.DEFAULT_BACKGROUND,
    width: '100%',
    height: '100%',
  },
  questionCountText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 16,
    color: colors.BESTOF2.BG1,
    marginBottom: 30,
  },
  imageBackgroundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingQuestionText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    color: colors.BESTOF2.BG1,
    textAlign: 'center',
    marginBottom: 10,
  },
});
