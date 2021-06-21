import { StyleSheet } from "react-native";
import { colors, constants } from "../../../../config";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  headerBox: {
    height: 100,
    borderRadius: 12,
    paddingHorizontal: 5,
  },
  headerBoxText: {
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
    color: colors.WHITE,
    fontFamily: constants.DEFAULT_FONT,
  },
  headerBoxText1: {
    fontSize: 18,
    fontFamily: constants.DEFAULT_FONT_BOLD,
  },
  headerBoxText2: {
    fontSize: 17,
    fontFamily: constants.DEFAULT_FONT,
  },
  headerBoxText3: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: constants.DEFAULT_FONT,
  },
  listContainer: {
    paddingHorizontal: 10,
    marginTop: 15,
  },
  loadingIcon: {
    marginTop: 25,
  },
});
