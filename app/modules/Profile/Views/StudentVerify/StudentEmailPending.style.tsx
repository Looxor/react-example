import { StyleSheet } from "react-native";
import { colors, constants } from "../../../../config";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.DEFAULT_BACKGROUND,
    justifyContent: 'space-between',
  },
  logo: {},
  text: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 17,
    color: colors.BLACK,
  },
  description1: {},
  email: {
    fontWeight: 'bold',
    lineHeight: 50,
  },
  description2: {},
  subContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  subContainerGoingMainScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goingToMainScreenText: {
    fontSize: 16,
    color: colors.BLACK,
    marginTop: 20,
  },
  textContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  resendButton: {
    backgroundColor: 'transparent',
  },
  resendButtonText: {
    color: colors.THEFACULTY,
  },
});
