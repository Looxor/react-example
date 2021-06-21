import { StyleSheet } from "react-native";
import { colors, constants } from "../../../config";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    width: '100%',
    height: '100%',
  },
  questionCountText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 15,
    color: colors.BESTOF2.BG1,
    marginTop: 5,
    marginBottom: 50,
  },
  imageBackgroundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingQuestionText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    color: colors.BESTOF2.BG1,
    textAlign: 'center',
    marginBottom: 10,
  },
  scoresPanelHeader: {
    zIndex: 102,
    elevation: 102,
    width: '100%',
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoresPanelContent: {
    height: '100%',
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: 45,
    zIndex: -10,
    elevation: -10,
    backgroundColor: colors.WHITE,
    shadowColor: '#777',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
});
