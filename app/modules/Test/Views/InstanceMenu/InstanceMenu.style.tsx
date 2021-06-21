import { StyleSheet } from "react-native";
import { colors, constants } from "../../../../config";

export default StyleSheet.create({
  safeContainer: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  container: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  headerBox: {
    width: '96%',
    height: 100,
    marginHorizontal: 0,
    alignSelf: 'center',
    borderRadius: 12,
  },
  headerBoxText: {
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 18,
    color: colors.WHITE,
    paddingHorizontal: 30,
    fontFamily: constants.DEFAULT_FONT_BOLD,
  },
  headerBoxSubText: {
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 15,
    color: colors.WHITE,
    paddingHorizontal: 30,
    fontFamily: constants.DEFAULT_FONT,
  },
  loadingIcon: {
    marginTop: 100,
  },
});
