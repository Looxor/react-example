import { Dimensions, Platform, StyleSheet } from "react-native";
import { colors, constants } from "../../config";

export default StyleSheet.create({
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
          top: Dimensions.get('window').height - 170,
        }
      : {}),
  },
  scrollSubContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: Dimensions.get('window').width - 30,
    marginBottom: 10,
  },

  description: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    lineHeight: 19,
  },

  inputContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
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
  },
  disabledButton: {
    backgroundColor: colors.lightGray,
  },
  inputAuto: {
    borderColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 7,
  },
  button: {
    marginBottom: 0,
    marginVertical: 2,
  },
  notNowButton: {
    backgroundColor: 'transparent',
    marginTop: 10,
    marginBottom: 7,
  },
  notNowButtonText: {
    height: 30,
    color: colors.THEFACULTY,
    marginBottom: -10,
  },
});
