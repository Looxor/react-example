import { Dimensions, Platform, StyleSheet } from "react-native";
import { colors, constants } from "../../config";

export default StyleSheet.create({
  safeContainer: {
    ...(Platform.OS === 'android'
      ? {flex: 1, height: Dimensions.get('window').height - 70}
      : {flex: 1}),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
  },
  logo: {
    width: 100,
    height: 100,
  },
  description: {
    fontFamily: constants.DEFAULT_FONT,
    margin: 15,
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: 0,
    marginVertical: 2,
  },
  closeButton: {
    marginBottom: 15,
  },
});
