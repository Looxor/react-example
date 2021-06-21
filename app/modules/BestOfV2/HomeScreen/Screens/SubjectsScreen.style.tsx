import { StyleSheet } from "react-native";
import { colors, constants } from "../../../../config";

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  helperView: {
    alignItems: 'center',
  },
  iconInfoContainer: {
    position: 'absolute',
    right: 30,
  },
  infoTitle: {
    fontSize: 24,
    color: colors.BESTOF2.BG1,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    marginBottom: 5,
  },
  infoText: {
    marginHorizontal: 10,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 20.8,
    color: colors.BESTOF2.BG1,
    fontFamily: constants.DEFAULT_FONT,
    marginBottom: 25,
  },
  infoTextContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  infoIcon: {
    marginTop: 2,
    width: 28,
    height: 28,
    zIndex: 10,
    elevation: 10,
  },
  helperPopoverContainer: {
    position: 'absolute',
    top: 36,
    right: 15,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    padding: 16,
    width: 340,
    borderRadius: 16,
    shadowColor: '#777',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    zIndex: 200,
    elevation: 200,
  },
  helperPopoverTextStyle: {
    color: colors.BESTOF2.BG1,
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT,
  },

  subjectsContainer: {
    marginBottom: 20,
    width: '85%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  editFacultyButtonContainer: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 18,
    backgroundColor: colors.WHITE,
    shadowColor: '#777',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facultyIcon: {
    width: '65%',
    height: '65%',
  },
  editFacultyIcon: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  generalSubjectsContainer: {
    marginTop: 20,
    borderRadius: 14,
    backgroundColor: colors.WHITE,
  },
  facultySubjectsContainer: {
    borderRadius: 14,
    backgroundColor: colors.WHITE,
  },
  subjectsLabel: {
    marginVertical: 15,
    marginLeft: 20,
    color: colors.LIGHT_ALOE_TF,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 18,
  },
  subjectBox: {
    height: 40,
  },
  editButton: {
    alignSelf: 'center',
    width: '100%',
    marginTop: 25,
    borderRadius: 15,
    backgroundColor: colors.BESTOF2.BG1,
  },
  editButtonText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    lineHeight: 22,
  },
});
