import { StyleSheet } from "react-native";
import { colors, constants } from "../../config";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  description: {
    fontFamily: constants.DEFAULT_FONT,
    padding: 15,
  },
  list: {
    backgroundColor: colors.WHITE,
  },
  item: {
    fontFamily: constants.DEFAULT_FONT,
    paddingLeft: 5,
  },
  selected_icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  buttonContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  remainButton: {
    height: 38,
    backgroundColor: colors.SILVER,
    marginBottom: 10,
  },
  remainButtonText: {
    color: colors.THEFACULTY,
  },
  confirmButton: {
    width: '92%',
    marginBottom: 0,
  },
});
