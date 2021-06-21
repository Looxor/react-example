import { StyleSheet } from "react-native";
import { colors, constants } from "../../../../config";

export default StyleSheet.create({
  container: {
    padding: 10,
  },
  filterContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    marginRight: 15,
    marginTop: 10,
    marginBottom: 2,
  },
  filterIcon: {
    width: 18,
    height: 18,
    marginTop: 5,
  },
  filterText: {
    color: colors.THEFACULTY,
    fontSize: 18,
    marginLeft: 5,
    marginTop: 3,
    fontFamily: constants.DEFAULT_FONT,
  },
  emptyContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 12,
  },
  emptyLogo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 20,
  },
  emptyDescription: {
    fontSize: 18,
    color: colors.gray,
    lineHeight: 23,
    marginTop: 10,
    padding: 14,
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
  },
  loadingIcon: {
    marginTop: 145,
  },
  resultItem: {
    marginBottom: 10,
  },
});
