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
  profile_image_container: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 20,
    alignSelf: 'center',
    borderWidth: 0,
    borderColor: colors.lightGray,
  },
  profile_image_container_empty: {
    borderWidth: constants.onePixel,
    borderStyle: 'dashed',
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  profile_image: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  profile_image_button: {
    position: 'absolute',
    right: 4,
    width: 32,
    height: 32,
    bottom: 3,
    borderRadius: 16,
    backgroundColor: colors.THEFACULTY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile_image_button_icon: {
    width: 17,
    height: 17,
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
