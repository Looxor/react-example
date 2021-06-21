import { StyleSheet } from "react-native";
import { colors, constants } from "../../../../../config";

export default StyleSheet.create({
  container: {
    padding: 10,
  },
  emptyLogo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 20,
  },
  emptyDescription: {
    fontSize: 16,
    color: colors.gray,
    lineHeight: 23,
    marginTop: 10,
    padding: 14,
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
  },
});
