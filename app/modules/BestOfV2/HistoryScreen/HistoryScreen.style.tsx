import { StyleSheet } from "react-native";
import { colors } from "../../../config";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.DEFAULT_BACKGROUND,
    padding: 0,
    paddingTop: 100,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  subContainer: {
    alignItems: 'center',
  },
});
