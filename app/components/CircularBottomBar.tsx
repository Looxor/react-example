import React from "react";
import { Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import Svg, { LinearGradient, Path, Stop } from "react-native-svg";
import { colors } from "../config";

const getStatusBarHeight = skipAndroid => {
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
    ios: isIphoneX ? 22 : -16,
    android: skipAndroid ? -12 : StatusBar.currentHeight,
    default: 0,
  });
};

const width = Dimensions.get('window').width + 1;
const height = 70;
const archHeight = 6;

const CircularBottomBar = props => {
  const {navigation} = props;
  return (
    <>
      <SafeAreaView style={{backgroundColor: colors.DEFAULT_BACKGROUND}}>
        <View
          style={{
            zIndex: 1000,
            elevation: 1000,
            position: 'absolute',
            height: 25,
            width: '100%',
            bottom: getStatusBarHeight(true),
            backgroundColor: colors.DEFAULT_BACKGROUND,
          }}
        />
        <Svg
          viewBox={`0 0 ${width} ${height}`}
          style={{
            position: 'absolute',
            width,
            height,
            bottom: getStatusBarHeight(true) + 25,
            zIndex: 10,
            elevation: 10,
            ...styles.navBarShadow,
          }}>
          <Path
            fill={'url(#gradient)'}
            d={`
            M0,${height + archHeight} 
            L0,${archHeight} 
            c100 ${-archHeight},${width - 100} ${-archHeight},${width} ${0} 
            l0,${height}`}
          />
          <LinearGradient id="gradient" x1={0} y1={0} x2={1} y2={0}>
            <Stop offset="0" stopColor={colors.DEFAULT_BACKGROUND} />
            <Stop offset="1" stopColor={colors.DEFAULT_BACKGROUND} />
          </LinearGradient>
        </Svg>

        <View
          style={{backgroundColor: 'trasparent', zIndex: 100, elevation: 1200}}>
          <BottomTabBar {...props} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  navBarShadow: {
    shadowColor: colors.gray,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 3,
    elevation: 35,
    zIndex: 100,
  },
});

/*
      <View style={{position: 'absolute'}}>
        <BottomTabBar {...props} />
      </View>
 */

export default CircularBottomBar;
