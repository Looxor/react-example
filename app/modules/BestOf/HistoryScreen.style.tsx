import { StyleSheet } from "react-native";
import { colors, constants } from "../../config";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  listItem: {
    borderRadius: 8,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginTop: 8,
    backgroundColor: colors.WHITE,
  },
  emptyListItem: {
    flexDirection: 'column',
    width: '80%',
    height: 120,
    alignSelf: 'center',
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemIcon: {
    width: 53,
    height: 53,
    marginRight: 10,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    borderRadius: 50,
  },
  emptyItemIcon: {
    width: 82.5,
    height: 76.5,
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  itemText: {
    color: colors.BLACK,
    fontSize: 16,
  },
  emptyItemText: {
    marginHorizontal: 20,
    marginTop: 20,
    fontFamily: constants.DEFAULT_FONT,
    color: colors.BLACK,
    fontSize: 16,
    textAlign: 'center',
  },
  itemTextWin: {
    color: colors.GREEN_TF,
    fontSize: 16,
  },
  itemTextLost: {
    color: colors.RED_TF,
    fontSize: 16,
  },
});
