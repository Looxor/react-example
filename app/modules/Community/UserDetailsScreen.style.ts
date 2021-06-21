/**
 * FriendDetailsScreen related style
 */
import { StyleSheet } from "react-native";
import constants from "../../config/constants";
import colors from "../../config/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  top_background_view: {
    width: '100%',
    marginTop: 85,
    borderTopRightRadius: 100,
    borderTopLeftRadius: 100,
    height: '100%',
    position: 'absolute',
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  top_view: {
    marginTop: -120,
    backgroundColor: 'transparent',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scores_view: {
    backgroundColor: colors.DEFAULT_BACKGROUND,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  stats_view: {
    borderRadius: 18,
    height: 100,
    backgroundColor: colors.WHITE,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
  },
  start_bestof_view: {
    borderRadius: 18,
    height: 100,
    backgroundColor: colors.BESTOF.DEFAULT,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
  },
  left_scores: {
    padding: 20,
    width: '49.75%',
    height: '100%',
    alignItems: 'center',
  },
  right_scores: {
    padding: 20,
    width: '49.75%',
    height: '100%',
    alignItems: 'center',
  },
  separator: {
    width: '0.2%',
    height: '40%',
    backgroundColor: colors.DEFAULT_PLACEHOLDER,
  },
  data_title_top: {
    marginTop: 20,
    marginBottom: 3,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 22,
  },
  data_text_top: {
    marginTop: 1,
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 15,
  },
  data_title_scores: {
    marginBottom: 3,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 30,
  },
  data_text_scores: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 15,
  },
  button_text: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 18,
    color: colors.WHITE,
    justifyContent: 'center',
  },
  profile_image: {
    height: 130,
    width: 130,
    borderRadius: 65,
  },
  stats_image: {
    marginTop: 35,
    marginBottom: 35,
    marginLeft: 20,
    width: 30,
    height: 30,
  },
  stats_texts: {
    flexDirection: 'column',
    marginLeft: 20,
    justifyContent: 'center',
  },
  button_texts: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  stats_data: {
    position: 'absolute',
    justifyContent: 'center',
    right: 20,
    top: 10,
    bottom: 10,
  },
});
