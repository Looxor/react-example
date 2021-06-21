/**
 * LoginScreen related style
 */
import { Dimensions, Platform, StyleSheet } from "react-native";
import { colors, constants } from "../../config";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  subContainer: {
    width: '100%',
    alignItems: 'center',
  },
  subContainer2: {
    width: '100%',
    alignItems: 'center',
    ...(Platform.OS === 'android'
      ? {
          position: 'absolute',
          top: Dimensions.get('window').height - 110,
        }
      : {}),
  },
  scrollSubContainer: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: Dimensions.get('window').width - 30,
    marginBottom: 20,
  },

  inputContainer: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
  },
  inputAuto: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
  },
  staticText: {
    fontFamily: constants.DEFAULT_FONT,
    marginHorizontal: 20,
    fontSize: 17,
  },
  staticTextChecked: {
    fontFamily: constants.DEFAULT_FONT,
    marginLeft: 20,
    fontSize: 17,
    color: colors.THEFACULTY,
  },
  cancelSearch: {
    borderWidth: 0,
    borderColor: colors.SILVER,
    backgroundColor: colors.WHITE,
    color: colors.gray,
    borderRadius: 5,
    lineHeight: 25,
    fontSize: 18,
    paddingTop: 2,
    width: 27,
    height: 27,
    paddingRight: 0,
    paddingLeft: 0,
    marginRight: 3,
    textAlign: 'center',
    shadowColor: colors.BLACK,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 1,
  },
  startSearch: {
    borderWidth: 0,
    borderColor: colors.SILVER,
    backgroundColor: colors.WHITE,
    color: colors.gray,
    borderRadius: 5,
    lineHeight: 25,
    fontSize: 18,
    paddingTop: 2,
    width: 27,
    height: 27,
    paddingRight: 0,
    paddingLeft: 0,
    marginRight: 8,
    textAlign: 'center',
    shadowColor: colors.BLACK,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 1,
  },
  disabledButton: {
    backgroundColor: colors.lightGray,
  },
});
