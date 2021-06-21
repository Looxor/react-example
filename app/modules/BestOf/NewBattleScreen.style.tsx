import { StyleSheet } from "react-native";
import constants from "../../config/constants";
import colors from "../../config/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingHorizontal: 5,
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  logo: {
    height: 120,
    width: '100%',
    borderRadius: 18,
    marginTop: 8,
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  logoText: {
    fontFamily: constants.DEFAULT_FONT,
    color: colors.WHITE,
    fontSize: 18,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 0,
  },
  selectButton: {
    borderRadius: 10,
    width: '100%',
    height: 85,
    backgroundColor: colors.WHITE,
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectButtonImage: {
    width: 60,
    height: 60,
  },
  selectButtonImageRight: {
    width: 20,
    height: 20,
  },
  selectButtonText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 16,
    width: 200,
    lineHeight: 20,
  },
  selectButtonText2: {
    fontSize: 14,
    fontWeight: 'normal',
  },
});
