import { StyleSheet } from "react-native";
import { colors, constants } from "../../../../../config";

export default StyleSheet.create({
  container: {
    padding: 10,
  },
  testItem: {
    marginBottom: 10,
    height: 150,
  },
  emptyContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 12,
  },
  emptyDescription: {
    fontSize: 16,
    color: colors.gray,
    lineHeight: 25,
    padding: 14,
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
  },
  emptyLogo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 20,
  },
  loadingIcon: {
    marginTop: 145,
  },
});
