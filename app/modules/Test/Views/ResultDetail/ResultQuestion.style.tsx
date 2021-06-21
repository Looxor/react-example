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
  },
  headerBox: {
    width: '96%',
    height: null,
    alignSelf: 'center',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  headerBoxText: {
    fontSize: 16,
    color: colors.WHITE,
    fontFamily: constants.DEFAULT_FONT,
  },
  questionImage: {
    width: '94%',
    height: 300,
    borderWidth: constants.onePixel,
    borderColor: colors.gray,
    borderRadius: 10,
    alignSelf: 'center',
  },
  answerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  questionResponseIcon: {
    width: 20,
    height: 20,
  },
  questionText: {
    marginLeft: 10,
    marginRight: 15,
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT,
    color: colors.darkGray,
  },
});
