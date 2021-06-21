/**
 * FriendsScreen related style
 */
import { StyleSheet } from "react-native";
import colors from "../../config/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  safeArea: {
    backgroundColor: colors.DEFAULT_BACKGROUND,
    flex: 1,
  },
  pending_request_box: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 18,
    backgroundColor: colors.RED_TF,
    height: 120,
  },
});
