import {Dimensions, Platform, StyleSheet} from 'react-native';
import {colors, constants} from '../../../../config';

export default StyleSheet.create({
  safeContainer: {
    ...(Platform.OS === 'android'
      ? {flex: 1, height: Dimensions.get('window').height - 70}
      : {flex: 1}),
    backgroundColor: colors.WHITE,
  },
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  scrollContainer: {},
  subContainer: {
    marginTop: 0,
    width: '100%',
    alignSelf: 'center',
  },
  logo: {
    alignSelf: 'center',
  },
  description: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    margin: 10,
    marginHorizontal: 15,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 53,
    borderWidth: 3,
    borderColor: colors.LIGHT_ALOE_TF,
    borderRadius: 14,
    fontSize: 17,
    marginHorizontal: 5,
    marginTop: 8,
    backgroundColor: colors.WHITE,
    fontFamily: constants.DEFAULT_FONT,
    color: colors.LIGHT_ALOE_TF,
    alignSelf: 'center',
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 0,
    width: '92%',
    zIndex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 0.5},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 0.2,
  },
  cardText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 17,
    backgroundColor: colors.WHITE,
    color: colors.LIGHT_ALOE_TF,
  },
  cardTextUploaded: {
    color: colors.DARK_ALOE_TF,
  },
  cardButton: {
    width: 26,
    height: 26,
    // position: 'absolute',
    // right: 15,
    // top: 12,
  },
  uploadingIcon: {
    top: 2,
    right: -3,
  },
  cameraImage: {
    width: 28,
    height: 28,
    top: -1,
    right: 5,
  },
  universityText: {
    fontFamily: constants.DEFAULT_FONT,
    color: colors.BLACK,
    marginTop: 35,
  },
  graduationStudyTown: {
    marginTop: 10,
    marginHorizontal: 5,
    alignSelf: 'center',
    width: '92%',
    zIndex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 17,
    fontFamily: constants.DEFAULT_FONT,
    backgroundColor: colors.WHITE,
    borderRadius: 14,
    borderColor: colors.SILVER,
    borderWidth: 0.4,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 0.7,
  },
  buttonContainer: {
    width: '100%',
    height: 110,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    top:
      Dimensions.get('window').height -
      Platform.select({ios: 250, android: 200}),
    backgroundColor: colors.WHITE,
  },
  button: {
    marginBottom: 0,
    marginVertical: 2,
  },
  useUnivEmailButton: {
    backgroundColor: colors.WHITE,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.LIGHT_SILVER,
  },
  useUnivEmailButtonText: {
    color: colors.DARK_ALOE_TF,
    fontFamily: constants.DEFAULT_FONT_BOLD,
  },
  continueButton: {
    marginTop: 0,
    marginBottom: 3,
  },
  continueButtonText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    color: colors.WHITE,
    fontSize: 18,
  },
  universitySelectButton: {
    width: '92%',
    height: 53,
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: colors.LIGHT_ALOE_TF,
    borderWidth: 3,
    backgroundColor: colors.WHITE,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 0.5},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 0.2,
  },
  universitySelectButtonText: {
    fontSize: 17,
    fontFamily: constants.DEFAULT_FONT,
    paddingLeft: 10,
    color: colors.LIGHT_ALOE_TF,
  },
  universitySelectButtonTextGray: {
    color: colors.DEFAULT_PLACEHOLDER,
  },
});
