import { StyleSheet } from "react-native";
import { colors, constants } from "../../../../../config";

export default StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  coinsPacketItem: {
    marginBottom: 10,
  },
  desc: {
    fontSize: 17,
    color: colors.BLACK,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontFamily: constants.DEFAULT_FONT,
  },
  emptyContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 12,
  },
  emptyDescription: {
    fontSize: 18,
    color: colors.BLACK,
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
