/**
 * ResetPasswordScreen related style
 */
import { Dimensions, Platform, StyleSheet } from "react-native";
import constants from "../../config/constants";
import colors from "../../config/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  scrollContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  logoImage: {
    width: 180,
    height: 150,
  },
  topView: {
    alignItems: 'center',
    width: '96%',
    height: '23%',
    backgroundColor: colors.PURPLE_TF,
    borderRadius: 18,
    marginTop: '2%',
    marginLeft: '2%',
    marginRight: '2%',
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    height: 150,
  },
  bottom_buttons2: {
    flex: 1,
    alignItems: 'center',
    width: '92%',
    justifyContent: 'flex-end',
    marginBottom: 8,
    ...(Platform.OS === 'android'
      ? {
          position: 'absolute',
          top: Dimensions.get('window').height - 120,
        }
      : {}),
  },
  bottom_buttons: {
    position: 'absolute',
    bottom: 8,
    width: '92%',
    marginLeft: '4%',
    marginRight: '4%',
  },
  description_view: {
    flexDirection: 'row',
    marginTop: 10,
    width: '92%',
  },
  textfield_view: {
    flexDirection: 'row',
    width: '98%',
  },
  description_label: {
    fontFamily: constants.DEFAULT_FONT,
    color: colors.BLACK,
    flex: 1,
    fontSize: 17,
  },
  textInput: {
    marginTop: 8,
    height: 42,
    width: '92%',
    backgroundColor: colors.WHITE,
    borderColor: colors.SILVER,
    borderRadius: 6,
    padding: 5,
    fontSize: 17,
    fontFamily: constants.DEFAULT_FONT,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 0,
    marginLeft: 8,
    marginRight: 8,
  },
});
