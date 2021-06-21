import {Dimensions, Platform, StyleSheet} from 'react-native';
import {colors, constants} from '../../../../config';

export default StyleSheet.create({
  safeContainer: {
    ...(Platform.OS === 'android'
      ? {flex: 1, height: Dimensions.get('window').height - 70}
      : {flex: 1}),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: colors.WHITE,
  },
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
  },
  logo: {
    alignItems: 'center',
  },
  description: {
    fontFamily: constants.DEFAULT_FONT,
    margin: 15,
    fontSize: 16,
    textAlign: 'center',
  },
  universityName: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    marginVertical: 15,
    fontSize: 18,
    textAlign: 'center',
  },
  cardImage: {
    alignSelf: 'center',
    width: 150,
    height: 200,
    borderRadius: 18,
  },

  button: {
    marginBottom: 0,
    marginVertical: 2,
  },
  gotoBestOfButton: {
    marginTop: 15,
    width: 'auto',
    paddingHorizontal: 20,
  },
});
