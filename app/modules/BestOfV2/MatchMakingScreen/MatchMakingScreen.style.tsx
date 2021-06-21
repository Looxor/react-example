import { Dimensions, Platform, StyleSheet } from "react-native";
import { colors } from "../../../config";

const getStatusBarHeight = () => {
  const dimen = Dimensions.get('window');
  const isIphoneX =
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 926 ||
      dimen.height === 844 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896);
  return Platform.select({
    ios: isIphoneX ? 50 : 30,
    android: 30,
    default: 0,
  });
};

export default StyleSheet.create({
  container: {
    backgroundColor: colors.BESTOF2.BG2_1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  subContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 80,
    backgroundColor: colors.BESTOF2.BG1,
  },
  mainImageBackground: {
    zIndex: -100,
    elevation: -1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
