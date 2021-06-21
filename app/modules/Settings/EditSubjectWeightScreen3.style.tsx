import { StyleSheet } from "react-native";
import { colors, constants } from "../../config";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  scrollContainer: {
    padding: 10,
  },
  descriptionText: {
    fontFamily: constants.DEFAULT_FONT,
    marginVertical: 15,
    lineHeight: 22,
    fontSize: 17,
  },
  sliderComponent: {
    marginBottom: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 48,
  },
  button1: {
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: 'transparent',
  },
  button1TextDisabled: {
    color: colors.lightGray,
  },
  button1Text: {
    color: colors.THEFACULTY,
    fontSize: 17,
  },
  button2: {
    marginTop: 10,
    marginBottom: 7,
  },
  button2Disabled: {
    backgroundColor: colors.lightGray,
  },
  button2Text: {
    fontSize: 18,
  },
});
