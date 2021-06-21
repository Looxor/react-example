/**
 * LoginScreen related style
 */
import { Dimensions, Platform, StyleSheet } from "react-native";
import { colors, constants } from "../../config";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  subContainer: {
    width: '100%',
  },
  subContainer2: {
    width: '100%',
    alignItems: 'center',
    ...(Platform.OS === 'android'
      ? {
          position: 'absolute',
          top: Dimensions.get('window').height - 155,
        }
      : {}),
  },
  scrollSubContainer: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: Dimensions.get('window').width - 30,
    marginBottom: 20,
  },

  inputContainer: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
  },
  inputAuto: {
    alignSelf: 'center',
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 17,
    width: Dimensions.get('window').width - 30,
    height: 45,
    backgroundColor: colors.WHITE,
    borderRadius: 5,
    borderColor: colors.SILVER,
    borderWidth: 1,
  },
  staticText: {
    fontFamily: constants.DEFAULT_FONT,
    marginLeft: 20,
    fontSize: 17,
  },
  facultyList: {
    width: '100%',
    height: 170,
  },
  facultyItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    height: '100%',
  },
  facultyItemImage: {
    borderWidth: 0,
    borderColor: colors.THEFACULTY,
    width: 50,
    height: 40,
    borderRadius: 0,
    position: 'absolute',
    zIndex: 1,
    left: 15,
  },
  facultyItemText: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    marginLeft: 55,
    marginRight: 40,
  },
  facultyItemIcon: {
    fontSize: 20,
    color: colors.THEFACULTY,
    position: 'absolute',
    right: 15,
    justifyContent: 'center',
  },
  showAllFaculty: {
    marginHorizontal: 20,
    width: '92%',
    alignItems: 'center',
    marginBottom: 5,
  },
  disabledButton: {
    backgroundColor: colors.lightGray,
  },
  loadingAllIcon: {
    height: 30,
    alignItems: 'center',
  },
});
