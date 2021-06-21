// @ts-ignore
import React from "react";
import { StyleSheet, View } from "react-native";
import { Path, Svg } from "react-native-svg";

const CURVE_HEIGHT = 22;

const Indicator = props => {
  const {width, index, containerWidth, color} = props;
  const left = index * width;
  return (
    <View style={{...styles.container, width: containerWidth, ...props.style}}>
      <Svg
        style={styles.indicatorBackground}
        viewBox={`0 0 ${containerWidth} ${CURVE_HEIGHT}`}>
        <Path
          d={`
            M-15,${CURVE_HEIGHT} 
            C0 0, ${containerWidth} 0, ${containerWidth + 15} ${CURVE_HEIGHT} 
            L${containerWidth} ${CURVE_HEIGHT}
          `}
          fill={color}
        />
      </Svg>
      <Svg
        viewBox={`0 0 ${width} ${CURVE_HEIGHT}`}
        style={{...styles.indicator, width, left}}>
        {index === 0 && (
          <Path
            d={`M-30,${CURVE_HEIGHT} 
              C31 0,${width} 0,${width - 5} 0 
              C${width} 0, ${width} 4, ${width - 4} 6
              C${width - 5} 10, 0 10, 0 ${CURVE_HEIGHT}`}
            fill={color}
          />
        )}
        {index === 1 && (
          <Path
            d={`M${width + 30},${CURVE_HEIGHT} 
              C${width - 30} 0,0 0,5 0 
              C1 0, 0 2, 2 6
              C0 5, 0 7, ${width - 60} 10`}
            fill={color}
          />
        )}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {height: CURVE_HEIGHT - 1},
  indicator: {
    height: CURVE_HEIGHT,
  },
  indicatorBackground: {
    width: '100%',
    height: CURVE_HEIGHT,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});

export default Indicator;
