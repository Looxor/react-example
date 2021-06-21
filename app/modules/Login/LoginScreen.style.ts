/**
 * LoginScreen related style
 */
import { Dimensions, Platform, StyleSheet } from "react-native";
import { colors, constants } from "../../config";

export const styles = StyleSheet.create({
  container: {
    ...(Platform.OS === 'android'
      ? {height: Dimensions.get('window').height - 70}
      : {flex: 1}),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  subContainer: {width: '100%', alignItems: 'center'},
  errorContainer: {
    marginBottom: 10,
    marginTop: 30,
    padding: 10,
    backgroundColor: '#f44336',
  },
  errorLabel: {
    color: '#fff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  button: {
    ...Platform.select({
      ios: {
        marginBottom: 0,
      },
      android: {
        marginTop: 10,
        marginBottom: 10,
      },
    }),
  },
  linkButton: {
    fontFamily: constants.DEFAULT_FONT,
    color: colors.THEFACULTY,
    fontSize: 18,
  },
  logoImage: {
    width: 120,
    height: 90,
    alignSelf: 'center',
    marginTop: 15,
  },
});
