import { StyleSheet } from "react-native";
import { constants } from "../../../../config";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 20,
    lineHeight: 20,
  },
  description: {
    fontFamily: constants.DEFAULT_FONT,
    marginTop: 10,
    fontSize: 16,
    lineHeight: 20,
  },
});
