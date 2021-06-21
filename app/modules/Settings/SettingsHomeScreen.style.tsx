import { StyleSheet } from "react-native";
import { colors } from "../../config";
import constants from "../../config/constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  container2: {
    marginTop: 10,
    backgroundColor: colors.WHITE,
  },
  icon: {
    width: 20,
    height: 20,
  },
  item: {},
  itemText: {
    fontFamily: constants.DEFAULT_FONT,
    color: colors.THEFACULTY,
    fontSize: 16,
  },
  overlayContainer: {
    backgroundColor: 'transparent',
  },
  overlay: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    minWidth: 300,
    minHeight: 250,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  overlayLogo: {
    width: 90,
    height: 90,
  },
  overlayText: {
    fontSize: 15,
    fontFamily: constants.DEFAULT_FONT,
    textAlign: 'center',
  },
  deleteConfirmButton: {
    height: 36,
    width: 160,
  },
});
