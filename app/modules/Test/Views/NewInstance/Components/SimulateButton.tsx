import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { colors, constants, strings } from "../../../../../config";
import { Defs, LinearGradient, Path, Stop, Svg } from "react-native-svg";

const SimulateButton = props => {
  const [state, setState] = useState({
    layoutWidth: 0,
    layoutHeight: 0,
  });

  const setState2 = state2 => setState({...state, ...state2});

  const componentDidMount = () => {
    return () => {};
  };

  useEffect(componentDidMount, []);

  const onLayout = ({nativeEvent}) => {
    const {width, height} = nativeEvent.layout;
    setState2({layoutWidth: width, layoutHeight: height});
  };

  const depth = 90;
  const startDepth = 55;
  const endDepth = 25;
  const viewPortW = state.layoutWidth,
    viewPortH = state.layoutHeight;

  const gradientColorStart = props.disabled
    ? colors.lightGray
    : colors.GENERAL.START;
  const gradientColorFinish = props.disabled
    ? colors.SILVER
    : colors.GENERAL.FINISH;

  const clone_price = props.clone_price;
  const label = props.label;

  return (
    <TouchableOpacity
      disabled={props.disabled}
      onLayout={onLayout}
      onPress={props.onPressSimulate}
      style={[
        styles.simulateButton,
        props.disabled ? styles.simulateButtonDisabled : {},
        props.style,
      ]}>
      {state.layoutWidth === 0 ? null : (
        <>
          <FastImage
            style={styles.selexiIcon}
            source={
              props.disabled
                ? require('../../../../../../assets/images/icons/icn_selexi_gray.png')
                : require('../../../../../../assets/images/icons/icn_selexi_color.png')
            }
          />
          <Svg
            viewBox={`0 0 ${viewPortW} ${viewPortH}`}
            style={styles.gradientContainer}>
            <Defs>
              <LinearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                <Stop
                  offset="0"
                  stopColor={gradientColorStart}
                  stopOpacity="1"
                />
                <Stop
                  offset="1"
                  stopColor={gradientColorFinish}
                  stopOpacity="1"
                />
              </LinearGradient>
            </Defs>
            <Path
              d={`M${startDepth},0 C${depth},40 ${depth},${viewPortH} 
                ${endDepth},${viewPortH} L${viewPortW + 10},${viewPortH} 
                L${viewPortW + 10},0 L${startDepth},0 z`}
              fill="url(#gradient)"
            />
            <View style={styles.simulateTitleContainer}>
              <Text style={styles.simulateTitle}>{label}</Text>
              <View style={styles.simulatePriceContainer}>
                {props.university_name ? (
                  <Text style={styles.simulatePriceValue}>
                    {props.university_name}
                  </Text>
                ) : (
                  <>
                    <FastImage
                      style={styles.simulatePriceIcon}
                      source={require('../../../../../../assets/images/icons/icn_new_tf_coin.png')}
                    />
                    <Text style={styles.simulatePriceValue}>
                      {`${clone_price} ${strings.TEST.NEW_INSTANCE.POINT}`}
                    </Text>
                  </>
                )}
              </View>
            </View>
          </Svg>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  simulateButton: {
    width: '100%',
    height: 90,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: colors.THEFACULTY,
    paddingHorizontal: 0,
    paddingVertical: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  simulateButtonDisabled: {
    borderColor: colors.lightGray,
    opacity: 0.9,
  },
  selexiIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
    width: 49,
    height: 24,
  },
  gradientContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  simulateTitleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 90,
    paddingRight: 20,
    width: '100%',
    height: '100%',
  },
  simulateTitle: {
    fontSize: 18,
    marginBottom: 6,
    color: colors.WHITE,
    fontFamily: constants.DEFAULT_FONT_BOLD,
  },
  simulateRightArrow: {
    width: 25,
    height: 25,
    position: 'absolute',
    right: 10,
  },
  simulatePriceContainer: {
    flexDirection: 'row',
  },
  simulatePriceIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
    marginTop: -1,
  },
  simulatePriceValue: {
    fontSize: 15,
    color: colors.WHITE,
    lineHeight: 17,
    marginTop: 2.5,
    fontFamily: constants.DEFAULT_FONT,
  },
});

export default SimulateButton;
