import { StyleSheet } from "react-native";
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
    alignItems: 'center',
  },
  scrollSubContainer: {
    width: '80%',
    alignItems: 'center',
  },
  description: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    textAlign: 'center',
    width: '100%',
    marginVertical: 10,
  },
  inputContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    marginBottom: 0,
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
    marginBottom: 15,
  },
  staticText: {
    fontFamily: constants.DEFAULT_FONT,
    marginLeft: 10,
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
  eye_icon_container: {
    position: 'absolute',
    top: 5,
    right: 10,
    width: 50,
    height: 45,
    zIndex: 20,
    elevation: 1,
    backfaceVisibility: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 0,
  },
  eye_icon_image: {
    width: 25,
    height: 25,
  },
  passwordInput: {
    marginLeft: 4,
    backgroundColor: colors.WHITE,
    zIndex: 1,
  },
  headerBox: {
    width: '96%',
    height: 115,
    marginHorizontal: 0,
    alignSelf: 'center',
    borderRadius: 12,
    marginBottom: 20,
  },
  headerBoxText: {
    width: '100%',
    textAlign: 'left',
    fontSize: 17,
    color: colors.WHITE,
    paddingHorizontal: 20,
    fontFamily: constants.DEFAULT_FONT,
  },
});
