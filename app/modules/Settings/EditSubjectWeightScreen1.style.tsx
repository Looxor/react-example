import { PixelRatio, StyleSheet } from "react-native";
import { colors, constants } from "../../config";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  subContainer: {
    padding: 4,
  },
  subContainer2: {
    padding: 6,
  },
  subTitle1: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 17,
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 5,
  },
  subTitle2: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 17,
    marginTop: 25,
    marginBottom: 10,
    marginLeft: 5,
  },
  no_data: {
    fontFamily: constants.DEFAULT_FONT,
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderColor: colors.lightGray,
    borderWidth: 1 / PixelRatio.get(),
    borderRadius: 5,
    marginTop: 10,
  },
  no_data_text: {
    fontFamily: constants.DEFAULT_FONT,
    color: colors.gray,
    fontSize: 16,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  button: {
    marginTop: 0,
    marginBottom: 0,
    height: 48,
  },
  button1: {
    backgroundColor: 'transparent',
    marginBottom: 0,
  },
  button2: {
    marginBottom: 10,
  },
  buttonText1: {
    color: colors.THEFACULTY,
  },
  buttonText2: {},
});
