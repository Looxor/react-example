import { StyleSheet } from "react-native";
import { colors, constants } from "../../config";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    padding: 15,
  },
  pageTitle: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 20,
    marginBottom: 20,
  },
  faqBox: {
    padding: 15,
    width: '98%',
    marginVertical: 10,
    borderColor: colors.white,
    borderWidth: 2,
    backgroundColor: colors.WHITE,
    borderRadius: 18,
    shadowColor: colors.lightGray,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 17,
    // width: "93%"
  },
  text: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
  },
  noQuestionsFound: {
    marginTop: 10,
    width: '96%',
  },
  loadingContainer: {
    textAlignVertical: 'center',
    justifyContent: 'center',
  },
  loading: {
    zIndex: 1,
    width: 50,
    height: 50,
  },
});
