import { StyleSheet } from "react-native";
import { colors, constants } from "../../../../config";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  scrollContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  loadingIcon: {
    marginTop: 125,
  },
  subtitleText: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.gray,
    paddingVertical: 18,
    fontFamily: constants.DEFAULT_FONT,
  },
  pointContainer: {
    borderWidth: constants.onePixel,
    borderColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  totalPointContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginHorizontal: 8,
  },
  totalPointText: {
    fontSize: 18,
    color: colors.gray,
    fontFamily: constants.DEFAULT_FONT,
  },
  totalPointValue: {
    fontSize: 18,
    fontFamily: constants.DEFAULT_FONT_BOLD,
  },
  cloneInfoContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
    fontFamily: constants.DEFAULT_FONT,
  },
  cloneInfoImage: {
    width: 20,
    height: 20,
  },
  cloneInfoTitle: {
    color: colors.gray,
    fontSize: 16,
    marginLeft: 10,
    fontFamily: constants.DEFAULT_FONT,
  },
  waybackInfoContainer: {
    borderWidth: constants.onePixel,
    borderColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  waybackRankingTitle: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.gray,
    fontFamily: constants.DEFAULT_FONT,
  },
  waybackRankingValue: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginVertical: 10,
    fontFamily: constants.DEFAULT_FONT,
  },
  waybackComplimentText: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.gray,
    fontFamily: constants.DEFAULT_FONT,
  },
  detailButton: {
    alignSelf: 'center',
    marginTop: 20,
  },
  homeButton: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  homeButtonText: {
    color: colors.THEFACULTY,
  },
});
