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
    backgroundColor: colors.DEFAULT_BACKGROUND,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  mainImageBackground: {
    paddingTop: getStatusBarHeight(),
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
