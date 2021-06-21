/**
 * HomeScreen related style
 */
import { Dimensions, Platform, StyleSheet } from "react-native";
import constants from "../../config/constants";
import colors from "../../config/colors";

const IS_IOS = Platform.OS === 'ios';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    flexDirection: 'column',
  },
  page_title: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20,
    fontFamily: constants.DEFAULT_FONT_BOLD,
  },
  page_text_container: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    color: colors.darkGray,
  },
  page_text: {
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT,
  },
  imageContainer: {
    aspectRatio: 16 / 9,
    width: Dimensions.get('window').width,
    marginBottom: IS_IOS ? 0 : -1,
    backgroundColor: 'white',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
