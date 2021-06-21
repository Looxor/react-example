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
  staticText: {
    fontFamily: constants.DEFAULT_FONT,
    marginHorizontal: 10,
    fontSize: 17,
  },
  warningText: {
    marginTop: 10,
    fontFamily: constants.DEFAULT_FONT,
    marginLeft: 20,
    color: colors.RED_TF,
    fontSize: 17,
  },
  staticTextChecked: {
    marginLeft: 5,
    fontSize: 15,
    color: colors.THEFACULTY,
  },
  disabledButton: {
    backgroundColor: colors.lightGray,
  },
});
