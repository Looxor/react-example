import { Dimensions, StyleSheet } from "react-native";
import { colors, constants } from "../../../../config";

const WINDOW_WIDTH = Dimensions.get('window').width;

const PROFILE_IMAGE_WIDTH = 90;
const PROFILE_IMAGE_HEIGHT = 90;

export default StyleSheet.create({
  globalContainer: {
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    marginTop: -10,
  },
  header: {
    width: '100%',
    marginBottom: 13,
    alignItems: 'center',
  },
  headerText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    color: colors.LIGHT_ALOE_TF,
  },
  globalView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  headerTitle: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 24,
    color: colors.BESTOF2.BG1,
    marginLeft: 2,
  },
  headerDescription: {
    width: '92%',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 20.8,
    color: colors.BESTOF2.BG1,
    fontFamily: constants.DEFAULT_FONT,
    marginTop: 10,
    marginBottom: 5,
  },
  globalIcon: {
    width: 35,
    height: 35,
    marginRight: 2,
  },
  scoreItemContainer: {
    width: '90%',
    height: 130,
    flexDirection: 'row',
    marginTop: 30,
    padding: 12,
    paddingBottom: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: colors.WHITE,
    shadowColor: colors.lightGray,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 10,
    elevation: 10,
    zIndex: 100,
    overflow: 'visible',
  },
  profileImage: {
    width: PROFILE_IMAGE_WIDTH,
    height: PROFILE_IMAGE_HEIGHT,
    borderRadius: PROFILE_IMAGE_WIDTH,
  },
  positionContainer: {
    position: 'absolute',
    right: -7,
    top: -10,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  positionText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 16,
    color: colors.BESTOF2.BG1,
  },
  informationContainer: {
    width: WINDOW_WIDTH - PROFILE_IMAGE_WIDTH - 90,
    marginLeft: 15,
    marginTop: -3,
  },
  scoreContainer: {
    flexDirection: 'row',
    height: 27,
  },
  scoreImage: {
    width: 18,
    height: 18,
    marginTop: 6,
  },
  scoreText: {
    color: colors.ORANGE_TF,
    fontSize: 20,
    marginTop: 1,
    marginLeft: 5,
    fontFamily: 'Kalam-Bold',
  },
  nickNameText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 20,
    color: colors.BESTOF2.BG1,
  },
  facultyText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    lineHeight: 18,
    color: colors.BESTOF2.BG1,
  },
  universityText: {
    marginTop: 2,
    width: '90%',
    flexWrap: 'wrap',
    overflow: 'hidden',
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 11,
    lineHeight: 14,
    color: colors.LIGHT_ALOE_TF,
  },
  friendImage: {
    position: 'absolute',
    width: 40,
    height: 40,
    right: 20,
    bottom: -6,
  },
  challengeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -20,
    width: 90,
    height: 45,
    borderRadius: 18,
    backgroundColor: colors.BESTOF2.BG1,
    marginBottom: 0,
  },
  challengeButtonText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 20,
    color: colors.WHITE,
  },
  playAgainButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -22,
    width: 180,
    height: '57%',
    minHeight: 45,
    borderRadius: 18,
    backgroundColor: colors.BESTOF2.BG1,
    marginBottom: 0,
  },
  playAgainButtonText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 20,
    color: colors.WHITE,
  },
  infoPopoverContainer: {
    position: 'absolute',
    top: 65,
    alignSelf: 'center',
    backgroundColor: colors.DEFAULT_BACKGROUND,
    padding: 15,
    width: 310,
    borderRadius: 16,
    shadowColor: '#777',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    zIndex: 200,
    elevation: 200,
  },
  popoverTextStyle: {
    color: colors.BESTOF2.BG1,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
  },
  overlay: {
    position: 'absolute',
    marginTop: 200,
    zIndex: 100,
    elevation: 100,
    width: 60,
    height: 60,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 18,
  },
});