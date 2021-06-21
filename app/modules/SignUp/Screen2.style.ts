/**
 * LoginScreen related style
 */
import { Dimensions, Platform, StyleSheet } from "react-native";
import { colors } from "../../config";
import constants from "../../config/constants";

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
    alignItems: 'center',
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
  inputText: {
    marginRight: 15,
    marginLeft: 15,
    width: Dimensions.get('window').width - 30,
  },
  dropdown: {
    width: Dimensions.get('window').width - 30,
    alignSelf: 'center',
    backgroundColor: colors.WHITE,
  },
  dropdownPlaceholder: {
    fontSize: 17,
  },
  datepicker: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 17,
    color: colors.BLACK,
  },
  datepickerPlaceholder: {
    height: '100%',
    width: '100%',
    fontFamily: constants.DEFAULT_FONT,
    color: colors.BLACK,
  },
  birthdayPickerContainer: {
    justifyContent: 'center',
    width: Dimensions.get('window').width - 30,
    height: 45,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.SILVER,
    borderRadius: 8,
    backgroundColor: colors.WHITE,
    color: colors.BLACK,
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 0,
    fontSize: 17,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  disabledButton: {
    backgroundColor: colors.lightGray,
  },
});
