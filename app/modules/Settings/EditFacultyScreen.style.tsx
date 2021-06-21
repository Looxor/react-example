import {StyleSheet} from 'react-native';
import {colors, constants} from '../../config';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  saveButton: {
    height: 48,
    marginBottom: 0,
  },
  saveButtonDisabled: {
    backgroundColor: colors.lightGray,
  },
  saveButtonText: {
    fontSize: 18,
  },
  allFacultiesText: {
    fontFamily: constants.DEFAULT_FONT,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 15,
    fontSize: 16,
    color: colors.DARK_ALOE_TF,
  },
  facultyItemContainer: {
    paddingLeft: 15,
    backgroundColor: colors.WHITE,
  },
  facultyItem: {
    flexDirection: 'column',
    paddingVertical: 10,
    borderTopWidth: constants.onePixel * 2,
    borderTopColor: colors.SILVER,
  },
  facultyItemText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 16,
    color: colors.DARK_ALOE_TF,
  },
  facultySubjects: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    color: colors.DARK_ALOE_TF,
    paddingRight: 35,
  },
  facultySelectedIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    zIndex: 2,
    right: 10,
    top: '50%',
  },
  userTypeButton: {
    width: '46%',
    marginLeft: '2%',
    marginRight: '2%',
    marginTop: '1.5%',
    marginBottom: '1.5%',
    height: 120,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: colors.WHITE,
    borderWidth: 3,
    borderColor: 'transparent',
    borderRadius: 20,
    shadowColor: colors.lightGray,
    shadowOpacity: 0.2,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 8,
    elevation: 10,
  },
  userTypeButtonSelected: {
    borderColor: colors.DARK_ALOE_TF,
  },
  userTypeButtonImage: {
    width: 50,
    height: 50,
  },
  userTypeButtonText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    textAlign: 'center',
    padding: 5,
    color: colors.DARK_ALOE_TF,
    lineHeight: 18,
  },
});
