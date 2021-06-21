import { StyleSheet } from "react-native";
import { colors } from "../../config";
import constants from "../../config/constants";

const boxHeight = 140;

export default StyleSheet.create({
  safeAreaContainer: {flex: 1},
  container: {
    flex: 1,
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
  },
  pointsBoxContainer: {
    width: '100%',
    height: boxHeight + 5,
    alignItems: 'center',
    overflow: 'visible',
    zIndex: 3,
  },
  subContainer: {
    zIndex: 2,
    flex: 1,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    marginTop: -33,
    paddingTop: 40,
  },

  listContainer: {
    width: '100%',
    paddingHorizontal: 10,
    alignSelf: 'center',
  },

  playCaption: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    height: 40,
    lineHeight: 50,
    fontSize: 16,
  },
});
