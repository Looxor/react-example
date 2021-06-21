import { Platform, StyleSheet } from "react-native";
import DeviceInfo from "react-native-device-info";
import { colors, constants } from "../../../../config";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.DEFAULT_BACKGROUND,
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        marginTop: DeviceInfo.hasNotch() ? -20 : 0,
      },
    }),
  },
  subTitle: {
    backgroundColor: colors.THEFACULTY,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },

  subTitleText: {
    color: colors.WHITE,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 18,
  },
  text: {
    marginTop: 20,
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 18,
    color: colors.BLACK,
    textAlign: 'center',
  },
  description1: {},
  email: {
    fontWeight: 'bold',
    lineHeight: 50,
  },
  description2: {},
  subContainer: {
    flex: 1,
    marginTop: 40,
    justifyContent: 'space-between',
  },
  subContainerGoingMainScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goingToMainScreenText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    color: colors.BLACK,
    marginTop: 20,
  },
  textContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resendButton: {
    backgroundColor: 'transparent',
    marginTop: -50,
  },
  resendButtonText: {
    color: colors.THEFACULTY,
    fontFamily: constants.DEFAULT_FONT_BOLD,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  mainImage: {
    width: '40%',
    height: 200,
  },
});
