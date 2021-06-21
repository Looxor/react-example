import { StyleSheet } from "react-native";
import { colors } from "../../../../config";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  loadingList: {
    marginTop: 50,
  },
  footerContainer: {
    flex: 1,
    width: '100%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
