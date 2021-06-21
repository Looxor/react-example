import { StyleSheet } from "react-native";
import { colors, constants } from "../../config";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BLACK,
    justifyContent: 'center',
    height: 400,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  readBarcodeContainer: {
    height: 150,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
  },
  readBarcodeText: {
    height: 60,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    color: colors.WHITE,
    fontSize: 25,
    letterSpacing: 1,
    textAlign: 'center',
  },
  confirmBarcodeButton: {
    fontFamily: constants.DEFAULT_FONT,
    width: '92%',
    height: 48,
    backgroundColor: colors.THEFACULTY,
    color: colors.WHITE,
    borderColor: colors.THEFACULTY, //"rgba(255,255,255,0.7)",
    borderWidth: 1,
    borderRadius: 28,
    alignSelf: 'center',
  },
  headerBox: {
    position: 'absolute',
    top: 0,
    width: '96%',
    height: 115,
    marginHorizontal: 0,
    alignSelf: 'center',
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  headerBoxText: {
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 12,
    color: colors.WHITE,
    paddingHorizontal: 30,
    fontFamily: constants.DEFAULT_FONT,
  },
  headerBoxLinkButton: {
    flexDirection: 'row',
    marginBottom: 7,
  },
  headerBoxLinkText: {
    fontSize: 22,
    color: colors.WHITE,
    fontFamily: constants.DEFAULT_FONT_BOLD,
  },
  headerBoxLinkImage: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
});
