import { StyleSheet } from "react-native";
import { colors, constants } from "../../../../config";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  headerBox: {
    width: '96%',
    height: 100,
    alignSelf: 'center',
    borderRadius: 12,
  },
  headerBoxText: {
    alignSelf: 'flex-start',
    marginLeft: 25,
    marginRight: 25,
    fontSize: 18,
    color: colors.WHITE,
    fontWeight: '400',
    fontFamily: constants.DEFAULT_FONT,
  },
  majorButton: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: colors.THEFACULTY,
    marginBottom: 12,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  majorButtonText: {
    fontSize: 17,
    fontFamily: constants.DEFAULT_FONT,
  },
  listContainer: {
    paddingHorizontal: 10,
    marginTop: 15,
  },
  loadingIcon: {
    marginTop: 125,
  },
});
