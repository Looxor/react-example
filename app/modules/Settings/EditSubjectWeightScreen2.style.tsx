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
    marginHorizontal: 8,
    fontFamily: constants.DEFAULT_FONT,
    marginVertical: 20,
    lineHeight: 22,
    fontSize: 17,
  },
  sliderComponent: {
    marginBottom: 10,
  },
  buttonContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 48,
    marginBottom: 0,
  },
});
