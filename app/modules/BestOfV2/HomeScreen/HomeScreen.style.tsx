import { StyleSheet } from "react-native";
import { colors, constants } from "../../../config";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    padding: 10,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  subContainer: {
    alignItems: 'center',
  },
  startBestOfButton: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startBestOfButtonText: {},
  onboardingContainer: {
    width: '100%',
    height: '100%',
  },
  mainImageBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  bestOfIconOnboarding: {
    marginTop: 80,
    width: 110,
    height: 110,
  },
  onboardingTitle: {
    fontSize: 24,
    color: colors.BESTOF2.BG1,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    paddingHorizontal: 20,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 28.8,
  },
  onboardingText: {
    fontSize: 16,
    color: colors.BESTOF2.BG1,
    fontFamily: constants.DEFAULT_FONT,
    paddingHorizontal: 40,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 20.8,
  },
  onboardingStartButton: {
    width: 120,
    marginTop: 30,
    borderRadius: 15,
    backgroundColor: colors.BESTOF2.BG1,
  },
  onboardingStartButtonText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    lineHeight: 22,
  },
});
