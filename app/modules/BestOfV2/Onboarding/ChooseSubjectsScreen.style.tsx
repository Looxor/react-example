import { StyleSheet } from "react-native";
import { colors, constants } from "../../../config";

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  mainImageBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  counterIcon: {
    marginTop: 40,
    width: 90,
    height: 90,
  },
  hatIcon: {
    marginTop: 50,
    width: 110,
    height: 110,
  },
  chooseSubjectsTitle: {
    fontSize: 24,
    color: colors.BESTOF2.BG1,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    paddingHorizontal: 40,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 28.8,
  },
  chooseSubjectsText: {
    fontSize: 16,
    color: colors.BESTOF2.BG1,
    fontFamily: constants.DEFAULT_FONT,
    paddingHorizontal: 40,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 20.8,
  },
  chooseFacultySmallDescription: {
    fontSize: 12,
    color: colors.BESTOF2.BG1,
    fontFamily: constants.DEFAULT_FONT,
    paddingHorizontal: 50,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 15.6,
  },
  continueButton: {
    position: 'absolute',
    bottom: 30,
    width: '85%',
    marginTop: 25,
    borderRadius: 15,
    backgroundColor: colors.BESTOF2.BG1,
  },
  continueButtonText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    lineHeight: 22,
  },
});
