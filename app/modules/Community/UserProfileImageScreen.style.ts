/**
 * UserProfileImage related style
 */
import { Dimensions, StyleSheet } from "react-native";
import colors from "../../config/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').height,
  },
  progress_view: {
    top: 0,
    height: 2,
    position: 'absolute',
    justifyContent: 'flex-start',
  },
});
