import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import Svg, {LinearGradient, Path, Stop} from 'react-native-svg';
import {colors, constants} from '../config';
import DeviceInfo from 'react-native-device-info';
import BackButtonTop from './BackButtonTop';
import CarouselPageScreen from '../modules/Home/CarouselPage';

const getStatusBarHeight = () => {
  const hasNotch = DeviceInfo.hasNotch();
  return Platform.select({
    ios: hasNotch ? 20 : 0,
    android: 0,
    default: 0,
  });
};

const HomeCircularTopBar = props => {
  const width = Dimensions.get('window').width + 1;
  const height = (!props.isInternal ? 76 : 70) + getStatusBarHeight();
  const archHeight = 8;

  const navigation = useNavigation();

  let willUnMount = false;

  const componentWillUnmount = () => {
    willUnMount = true;
  };

  const componentDidMount = () => {
    const didFocus = async () => {};

    const didBlur = () => {};

    props.navigation.addListener('blur', didBlur);
    props.navigation.addListener('focus', didFocus);
    didFocus();
    return componentWillUnmount;
  };

  useEffect(componentDidMount, []);
  return (
    <View style={[styles.container, {height}]}>
      <Svg
        viewBox={`0 0 ${width} ${height + archHeight}`}
        style={{width, height: height + archHeight, ...styles.navBarShadow}}>
        <Path
          fill={'url(#gradient)'}
          d={`
            m0,0 
            L0,${height} 
            C100 ${height + archHeight},${width - 100} ${
            height + archHeight
          },${width} ${height} 
            l0,-${height}z`}
        />
        <LinearGradient id="gradient" x1={0} y1={0} x2={1} y2={0}>
          <Stop offset="0" stopColor={colors.WHITE} />
          <Stop offset="1" stopColor={colors.WHITE} />
        </LinearGradient>
      </Svg>

      <View style={[styles.navBarContainer, {marginTop: getStatusBarHeight()}]}>
        <BackButtonTop
          style={[!props.isInternal && {marginTop: 20}]}
          navigation={navigation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  navBarContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    elevation: 100,
  },
  navBarShadow: {
    shadowColor: colors.lightGray,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 3,
    elevation: 0,
  },
});

export default HomeCircularTopBar;
