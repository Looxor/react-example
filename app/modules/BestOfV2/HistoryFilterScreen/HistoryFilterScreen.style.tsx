import { StyleSheet } from "react-native";
import { colors, constants } from "../../../config";

export default StyleSheet.create({
  container: {
    marginTop: 40,
    paddingHorizontal: 20,
    height: '95%',
  },
  subContainer: {},
  screenTitle: {
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 15,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 22,
    color: colors.BESTOF2.BG1,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputText: {
    width: '100%',
    height: 48,
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    color: colors.BESTOF2.BG1,
    borderRadius: 10,
    borderWidth: 3.5,
    borderColor: colors.BESTOF2.BG1,
    paddingHorizontal: 10,
  },
  searchInputIcon: {
    position: 'absolute',
    right: 10,
    width: 20,
    height: 20,
  },
  pickerContainer: {
    marginHorizontal: 0,
  },
  picker: {
    backgroundColor: colors.WHITE,
    borderBottomWidth: 0,
    shadowColor: colors.LIGHT_SILVER,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 10,
    elevation: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  pickerLabel: {
    color: colors.BESTOF2.BG1,
  },
  pickerText: {
    color: colors.BESTOF2.BG1,
  },
  hatIcon: {
    width: 23,
    height: 23,
  },
  labelContainer: {
    marginLeft: 6,
    flexDirection: 'row',
    marginTop: 22,
    marginBottom: 10,
  },
  labelText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 16,
    color: colors.LIGHT_ALOE_TF,
    marginLeft: 8,
  },
  buttonsContainer: {
    backgroundColor: colors.WHITE,
    alignSelf: 'center',
    height: 150,
    width: '100%',
    paddingTop: 10,
    bottom: 0,
  },
  applyButton: {
    borderRadius: 16,
    backgroundColor: colors.BESTOF2.BG1,
    width: '100%',
    height: 45,
    marginBottom: 0,
  },
  applyButtonText: {
    marginTop: -1,
    color: colors.WHITE,
    fontFamily: constants.DEFAULT_FONT_BOLD,
  },
  removeButton: {
    borderRadius: 16,
    backgroundColor: colors.WHITE,
    width: '100%',
    height: 45,
    marginTop: 10,
    marginBottom: 15,
  },
  removeButtonText: {
    marginTop: -1,
    color: colors.BESTOF2.BG1,
    fontFamily: constants.DEFAULT_FONT_BOLD,
  },
});
