import { StyleSheet } from "react-native";
import { colors, constants } from "../../../../../config";

export const styles_filter = StyleSheet.create({
  backdrop: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '90%',
    height: 470,
    borderRadius: 8,
    backgroundColor: colors.WHITE,
    zIndex: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: colors.gray,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 20,
    fontFamily: constants.DEFAULT_FONT,
  },
  filterLabel: {
    fontFamily: constants.DEFAULT_FONT,
  },
  itemContainer: {
    paddingHorizontal: 30,
  },
  itemLabel: {
    fontSize: 17,
    color: colors.gray,
    fontFamily: constants.DEFAULT_FONT,
  },
  itemInputContainer: {
    height: 32,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: colors.gray,
    borderBottomWidth: constants.onePixel,
  },
  itemInputValue: {
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT,
  },
  arrowDownIcon: {
    width: 24,
    height: 24,
  },
  removeButton: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  removeButtonText: {
    color: colors.THEFACULTY,
  },
  applyButton: {
    alignSelf: 'center',
    width: '80%',
    marginTop: 50,
  },
});

export const styles_calendar = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: colors.WHITE,
    zIndex: 10,
    width: '100%',
    height: 470,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  button: {
    width: '45%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  confirmButton: {
    backgroundColor: colors.THEFACULTY,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: colors.THEFACULTY,
  },
  confirmButtonText: {
    fontSize: 16,
    color: colors.WHITE,
    fontFamily: constants.DEFAULT_FONT,
  },
  cancelButtonText: {
    fontSize: 16,
    color: colors.THEFACULTY,
    fontFamily: constants.DEFAULT_FONT,
  },
  rangeText: {
    paddingHorizontal: 15,
    color: colors.gray,
    fontSize: 17,
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
  },
});
