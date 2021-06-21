import { StyleSheet } from "react-native";
import { colors } from "../../../../config";

export default StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  scene: {
    flex: 1,
  },
  indicator: {
    width: 100,
    height: 10,
    backgroundColor: 'silver',
    borderWidth: 1,
    borderColor: 'red',
  },
});
