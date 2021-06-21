import { Dimensions, Platform, StyleSheet } from "react-native";
import { colors, constants } from "../../config";

export default StyleSheet.create({
  safeContainer: {
    backgroundColor: colors.DEFAULT_BACKGROUND,
    ...(Platform.OS === 'android'
      ? {flex: 1, height: Dimensions.get('window').height - 70}
      : {flex: 1}),
  },
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  scrollContainer: {},
  subContainer: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
  },
  logo: {
    alignSelf: 'center',
  },
  headerLabelText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    paddingHorizontal: 10,
    height: 30,
  },
  uploadComponent2: {marginTop: 10},
  cardContainerHeaderText: {
    fontFamily: constants.DEFAULT_FONT,
    marginTop: 20,
    fontSize: 16,
    paddingHorizontal: 10,
    height: 25,
  },
  cardContainer: {
    height: 105,
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 16,
    marginHorizontal: 5,
    marginTop: 5,
    borderColor: colors.LIGHT_SILVER,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  button: {
    marginBottom: 0,
    marginVertical: 2,
  },
  continueButton: {
    marginBottom: 15,
  },
});
