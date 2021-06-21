/**
 * LoginScreen related style
 */
import { Dimensions, Platform, StyleSheet } from "react-native";
import DeviceInfo from "react-native-device-info";
import { colors, constants } from "../../../../config";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: colors.WHITE,
    ...Platform.select({
      ios: {
        marginTop: DeviceInfo.hasNotch() ? -20 : 0,
      },
    }),
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
          top: Dimensions.get('window').height - 130,
        }
      : {}),
  },
  scrollSubContainer: {
    width: '100%',
    alignItems: 'center',
  },

  subTitle: {
    backgroundColor: colors.THEFACULTY,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  subTitleText: {
    color: colors.WHITE,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 18,
  },

  inputContainer: {
    alignItems: 'flex-start',
    width: '98%',
    marginBottom: 4,
  },

  staticText: {
    fontFamily: constants.DEFAULT_FONT,
    marginLeft: 20,
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
    fontFamily: constants.DEFAULT_FONT,
    marginLeft: 20,
    fontSize: 17,
    color: colors.THEFACULTY,
  },
  disabledButton: {
    backgroundColor: colors.lightGray,
  },
  signUpDescriptionContainer: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginVertical: 10,
  },
  signUpDescriptionIcon: {
    width: 15,
    height: 15,
    marginTop: 1,
    marginRight: 5,
  },
  signUpDescriptionText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    color: colors.gray,
  },
});
