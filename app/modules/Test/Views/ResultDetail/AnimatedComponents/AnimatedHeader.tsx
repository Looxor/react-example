import React from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import { colors } from "../../../../../config";
import { StandardBoxWithComponent } from "../../../../../components";
import UniversityInfo from "./UniversityInfo";

import Svg, { Path } from "react-native-svg";
import PointInfo from "./PointInfo";

const BOX_HEIGHT = 180;
const BOX_HEIGHT_SUBTRACT = 160;
const HeaderBackground = ({animationRange}) => {
  const animateHeader = {
    transform: [
      {
        translateY: animationRange.interpolate({
          inputRange: [0, 1.5],
          outputRange: [10, -BOX_HEIGHT_SUBTRACT],
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.headerBackground, animateHeader]}>
      <StandardBoxWithComponent
        background_start_color={colors.TEST.START}
        background_finish_color={colors.TEST.FINISH}
        viewStyle={{
          alignSelf: 'center',
          width: '96%',
          height: '100%',
          margin: 0,
          marginHorizontal: 0,
        }}
      />
    </Animated.View>
  );
};

const OFFSET = 5;
const RADIUS = 18;
const WIDTH = Dimensions.get('window').width;

const AnimatedHeader = ({view, animationRange}) => (
  <View style={styles.container} pointerEvents="none">
    <HeaderBackground animationRange={animationRange} />
    <Animated.View style={styles.container} pointerEvents="none">
      <UniversityInfo animationRange={animationRange} view={view} />
      <PointInfo animationRange={animationRange} view={view} />
    </Animated.View>
    <View
      style={{
        width: WIDTH,
        height: 10,
        backgroundColor: colors.DEFAULT_BACKGROUND,
        position: 'absolute',
        zIndex: 2,
        left: 0,
        top: 0,
      }}
    />
    <Svg
      viewBox={`0 0 ${WIDTH} ${RADIUS + OFFSET * 2}`}
      style={{
        width: WIDTH,
        height: 50,
        position: 'absolute',
        zIndex: 3,
        left: 2,
        top: -5,
      }}>
      <Path
        d={`
          M ${OFFSET},${RADIUS} 
          A ${RADIUS} ${RADIUS} 0 0 1 ${RADIUS} ${OFFSET} 
          l ${WIDTH - RADIUS * 2 - OFFSET * 2 + 2} 0 
          A ${RADIUS} ${RADIUS} 0 0 1 ${WIDTH - OFFSET * 2 + 2} ${RADIUS} 
          l ${OFFSET} 0 
          l 0 -${RADIUS} 
          L 0 0 
          l 0 ${RADIUS} 
          z
      `}
        fill={colors.DEFAULT_BACKGROUND}
      />
    </Svg>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 0,
    zIndex: 3,
    height: 200,
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    flex: 0,
    height: BOX_HEIGHT,
    width: '100%',
    zIndex: 2,
    padding: 0,
    paddingBottom: 5,
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
});

export default AnimatedHeader;
