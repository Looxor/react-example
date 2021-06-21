import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Svg, { LinearGradient, Path, Stop } from "react-native-svg";
import { colors } from "../../../../../config";

const GradientBackground = props => {
  const width = Dimensions.get('window').width + 1;
  const height = props.progress === 100 ? 150 : 210;
  return (
    <Svg
      viewBox={`0 0 ${width} ${height}`}
      style={{width, height, ...styles.container}}>
      <Path
        fill={'url(#gradient)'}
        d={`
            m0,0 
            L0,${height} 
            C100 ${height - 20},${width - 100} ${
          height - 20
        },${width} ${height} 
            l0,-${height}z`}
      />
      <LinearGradient id="gradient" x1={0} y1={0} x2={1} y2={0}>
        <Stop offset="0" stopColor={colors.GENERAL.START} />
        <Stop offset="1" stopColor={colors.GENERAL.FINISH} />
      </LinearGradient>
    </Svg>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export default GradientBackground;
