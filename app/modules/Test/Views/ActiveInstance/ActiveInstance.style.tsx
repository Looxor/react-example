import { StyleSheet } from "react-native";
import { colors, constants } from "../../../../config";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  scrollContainer: {
    width: '100%',
    height: '100%',
  },
  headerBox: {
    width: '96%',
    height: 100,
    alignSelf: 'center',
    borderRadius: 12,
  },
  headerBoxImage: {
    width: 50,
    height: 50,
  },
  headerBoxText: {
    fontSize: 20,
    color: colors.WHITE,
    fontWeight: 'bold',
    fontFamily: constants.DEFAULT_FONT,
  },
  headerBoxText2: {
    fontSize: 16,
    color: colors.WHITE,
    fontFamily: constants.DEFAULT_FONT,
  },
  descContainer: {
    padding: 15,
  },
  descTitle: {
    fontSize: 18,
    color: colors.darkGray,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
  },
  descContent: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 18,
    color: colors.darkGray,
    fontFamily: constants.DEFAULT_FONT,
  },
  descContent2: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 16,
    color: colors.darkGray,
    fontFamily: constants.DEFAULT_FONT,
  },
  terminateButton: {
    alignSelf: 'center',
  },
  linkButton: {
    fontFamily: constants.DEFAULT_FONT,
    color: colors.THEFACULTY,
    fontSize: 12,
  },
});
