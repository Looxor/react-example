import { StyleSheet } from "react-native";
import { colors, constants } from "../../config";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.DEFAULT_BACKGROUND,
    padding: 0,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  logoContainer: {width: '100%', height: 170},
  scrollViewContainer: {
    backgroundColor: colors.DEFAULT_BACKGROUND,
    padding: 0,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  tvScreen: {
    width: '100%',
    marginTop: 150,
  },
  tvscreenTop: {
    width: '45%',
    left: '30%',
    height: 145,
    backgroundColor: 'red',
    borderRadius: 150,
    transform: [{scaleX: 2.5}, {scaleY: 1.5}],
  },
  emptyDescription: {
    fontSize: 16,
    color: colors.gray,
    lineHeight: 25,
    padding: 14,
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
  },
  emptyLogo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 0,
  },
});
