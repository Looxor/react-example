import { StyleSheet } from "react-native";
import { colors, constants } from "../../config";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  subContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  description: {},
  descriptionText: {
    marginTop: 10,
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    lineHeight: 20,
  },
  barcodeContainer: {
    marginTop: 10,
  },
  barcodeInput: {
    color: colors.BLACK,
    fontFamily: constants.DEFAULT_FONT,
    width: '100%',
    height: 45,
    borderWidth: 0.5,
    borderColor: colors.SILVER,
    borderRadius: 8,
    fontSize: 17,
    paddingVertical: 0,
    backgroundColor: colors.WHITE,
    paddingLeft: 8,
  },
  cameraButton: {
    width: 40,
    height: 40,
    position: 'absolute',
    right: 7,
    top: 2,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraImage: {
    width: 25,
    height: 25,
  },
  explanation: {
    alignItems: 'center',
  },
  dont_have_card: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
  },
  how_to_request: {
    fontFamily: constants.DEFAULT_FONT,
    color: colors.THEFACULTY,
    fontSize: 16,
    height: 30,
    lineHeight: 28,
  },
  discover_card: {
    fontFamily: constants.DEFAULT_FONT,
    color: colors.THEFACULTY,
    fontSize: 16,
    height: 30,
    lineHeight: 30,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  not_now: {
    fontFamily: constants.DEFAULT_FONT,
    height: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  not_now_text: {
    fontFamily: constants.DEFAULT_FONT,
    color: colors.THEFACULTY,
    fontSize: 16,
  },
  done_button: {
    fontFamily: constants.DEFAULT_FONT,
    width: '100%',
    height: 48,
  },
});
