/**
 * LoginScreen related style
 */
import { StyleSheet } from "react-native";
import { colors, constants } from "../../config";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  subContainer: {width: '100%', alignItems: 'center'},
  logo: {
    marginBottom: 20,
  },

  checkboxContainer: {
    marginHorizontal: 10,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  checkbox: {borderRadius: 10},
  checkboxTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: -3,
    marginLeft: 20,
    borderBottomColor: colors.SILVER,
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
  },
  checboxText: {
    fontFamily: constants.DEFAULT_FONT,
    color: colors.BLACK,
    fontSize: 16,
  },
  textLink: {
    fontFamily: constants.DEFAULT_FONT,
    color: colors.THEFACULTY,
  },
  disabledButton: {
    backgroundColor: colors.SILVER,
  },
});
