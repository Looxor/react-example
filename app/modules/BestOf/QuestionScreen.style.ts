import { StyleSheet } from "react-native";
import { colors } from "../../config";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: colors.DEFAULT_BACKGROUND,
    paddingTop: 40,
  },
  logo: {
    width: '92%',
    paddingHorizontal: 20,
    marginBottom: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  timer: {
    position: 'absolute',
    left: 15,
  },
});
