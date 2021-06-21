import { StyleSheet } from "react-native";
import { colors, constants } from "../../config";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  container2: {
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  description: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    padding: 15,
    textAlign: 'center',
  },
  iconHeader: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
  },
  iconRight: {
    width: 25,
    height: 25,
    right: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    height: 120,
    marginVertical: 10,
    backgroundColor: colors.WHITE,

    paddingVertical: 15,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 20,
    shadowColor: colors.lightGray,
    shadowOpacity: 0.2,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 8,
    elevation: 10,
  },
  selectedItem: {
    borderColor: colors.THEFACULTY,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderRightColor: colors.THEFACULTY,
    borderLeftColor: colors.THEFACULTY,
  },
  itemLeft: {
    width: '100%',
  },
  itemTitle: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 18,
    width: '80%',
    paddingLeft: 25,
    marginBottom: 5,
  },
  itemText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 15,
    width: '80%',
    paddingLeft: 25,
  },
  loading: {
    left: 5,
    zIndex: 1,
    width: 50,
    height: 50,
  },
  headerBox: {
    width: '96%',
    height: 115,
    marginHorizontal: 0,
    alignSelf: 'center',
    borderRadius: 12,
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
