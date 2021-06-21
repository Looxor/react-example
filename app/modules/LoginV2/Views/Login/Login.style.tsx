import { PixelRatio, StyleSheet } from "react-native";
import { colors, constants } from "../../../../config";

const OnePixel = 1 / PixelRatio.get();

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 180,
    height: 130,
  },
  logoImage: {
    width: 180,
    height: 150,
  },
  socialLoginButtonsContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  socialLoginButton: {
    marginTop: 20,
  },
  horizontalDivider: {
    width: '85%',
    height: 10,
    zIndex: 1,
    top: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 45,
    borderWidth: 0,
    borderTopWidth: OnePixel,
    borderColor: colors.gray,
  },
  alternativeText: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: 15,
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 18,
    marginTop: -12,
  },
  emailLoginContainer: {
    width: '100%',
    zIndex: 2,
    alignItems: 'center',
  },
  emailText: {
    flex: 0,
  },
  passwordText: {flex: 0},
  forgotPasswordButton: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginVertical: 10,
  },
  forgotPasswordButtonText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 16,
    color: colors.THEFACULTY,
  },
  continueButton: {
    marginTop: 20,
    marginBottom: 30,
  },
  continueButtonText: {},
  description: {
    width: '100%',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  descriptionText: {
    marginTop: 1,
    fontSize: 18,
    fontFamily: constants.DEFAULT_FONT,
    color: colors.gray,
  },
  registerByEmailButton: {},
  registerByEmailButtonText: {
    fontSize: 18,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    color: colors.THEFACULTY,
  },
  EOF: {
    marginBottom: 20,
  },
});
