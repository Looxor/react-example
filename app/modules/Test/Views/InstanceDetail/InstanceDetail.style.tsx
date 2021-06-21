import { StyleSheet } from "react-native";
import { colors, constants } from "../../../../config";

export default StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  horizontalLine: {
    borderTopWidth: 0.7,
    borderColor: colors.SILVER,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  createButton: {
    alignSelf: 'center',
    marginVertical: 15,
    marginBottom: 20,
  },
  priceContainer: {
    backgroundColor: colors.THEFACULTY,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 38,
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceImage: {
    width: 15,
    height: 17,
    marginLeft: 15,
  },
  priceValueText: {
    color: colors.WHITE,
    marginLeft: 8,
    fontFamily: constants.DEFAULT_FONT,
  },
});
