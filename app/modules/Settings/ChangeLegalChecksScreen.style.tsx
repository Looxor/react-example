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

  subContainer: {marginTop: 30, width: '100%', alignItems: 'center'},

  subTitle: {
    backgroundColor: colors.THEFACULTY,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },

  subTitleText: {
    color: colors.WHITE,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 18,
  },
  checkboxContainer: {
    marginHorizontal: 10,
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 5,
  },
  checkbox: {borderRadius: 10},
  checkboxTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: -3,
    marginLeft: 20,
    borderBottomColor: colors.SILVER,
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  checkboxText: {
    fontFamily: constants.DEFAULT_FONT,
    color: colors.BLACK,
    fontSize: 16,
    lineHeight: 20,
  },
  checkboxTextGray: {
    fontFamily: constants.DEFAULT_FONT,
    color: colors.gray,
    fontSize: 16,
    lineHeight: 20,
  },
  textLink: {
    fontFamily: constants.DEFAULT_FONT,
    color: colors.THEFACULTY,
  },
  disabledButton: {
    backgroundColor: colors.SILVER,
  },
  headerBox: {
    width: '96%',
    height: 115,
    marginHorizontal: 0,
    alignSelf: 'center',
    borderRadius: 12,
    marginBottom: 0,
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
