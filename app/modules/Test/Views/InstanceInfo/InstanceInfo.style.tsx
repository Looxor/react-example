import { StyleSheet } from "react-native";
import { colors } from "../../../../config";

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
  continueButton: {
    alignSelf: 'center',
    marginVertical: 15,
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  linkIcon: {
    width: 30,
    height: 30,
  },
  linkText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.WHITE,
    marginLeft: 15,
  },
});
