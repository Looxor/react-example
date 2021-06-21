import React, { useEffect, useState } from "react";
import { Animated, Dimensions, View } from "react-native";
import { colors } from "../../../../config";
import Svg, { Path } from "react-native-svg";
import WaitingCircularProgress from "../../_Components/WaitingCircularProgress";
import FastImage from "react-native-fast-image";
import FadeOutView from "./FadeOutView";

export const WAITING_INDICATOR_HEIGHT = 90;
const WaitingIndicator = props => {
  const [SVG_GAP, setSVG_GAP] = useState(6);
  const SVG_WIDTH = Dimensions.get('window').width;
  const [SVG_HEIGHT, setSVG_HEIGHT] = useState(WAITING_INDICATOR_HEIGHT);
  const [bgColor, setBgColor] = useState(colors.WHITE);

  const startAnimation = async () => {
    let animatedValueForGAP = new Animated.Value(6);
    animatedValueForGAP.addListener(v => {
      setSVG_GAP(v.value);
    });

    Animated.timing(animatedValueForGAP, {
      toValue: 0,
      duration: 80,
      useNativeDriver: true,
    }).start();

    setBgColor(colors.BESTOF2.BG2_1);

    let animatedValueForHeight = new Animated.Value(WAITING_INDICATOR_HEIGHT);
    animatedValueForHeight.addListener(v => {
      setSVG_HEIGHT(v.value);
    });

    Animated.timing(animatedValueForHeight, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      props.setAnimationFinished(true);
    });
  };

  useEffect(() => {
    if (props.enableFadeOut) {
      setTimeout(() => {
        startAnimation();
      }, 2000);
    }
  }, [props.enableFadeOut]);
  return (
    <View
      style={{
        width: '100%',
        height: SVG_HEIGHT,
        backgroundColor: bgColor,
        ...props.style,
      }}>
      <Svg
        viewBox={'0 0 ' + SVG_WIDTH + ' ' + SVG_HEIGHT}
        style={{
          width: SVG_WIDTH,
          height: SVG_HEIGHT,
          backgroundColor: bgColor,
        }}>
        <Path
          d={
            'm 0 0 ' +
            'l ' +
            SVG_WIDTH +
            ' 0 ' +
            'L 0 ' +
            (SVG_HEIGHT - SVG_GAP) +
            ' ' +
            'L 0 0z'
          }
          fill={colors.BESTOF2.BG1}
        />
        <Path
          d={
            'm 0 ' +
            SVG_HEIGHT +
            ' ' +
            'l ' +
            SVG_WIDTH +
            ' 0 ' +
            'l 0 ' +
            (-SVG_HEIGHT + SVG_GAP) +
            ' ' +
            'L 0 ' +
            SVG_HEIGHT +
            'z'
          }
          fill={colors.BESTOF2.BG2_1}
        />
      </Svg>
      <FadeOutView
        startAfter={props.startAfter}
        enabled={props.enableFadeOut}
        duration={300}
        style={{
          zIndex: 20,
          elevation: 20,
          position: 'absolute',
          alignSelf: 'center',
        }}>
        <WaitingCircularProgress
          timeout={props.timeout}
          onPreparing={props.onPreparing}
          onTimeout={props.onTimeout}
          circleSize={WAITING_INDICATOR_HEIGHT}>
          <FastImage
            style={{width: '100%', height: '100%'}}
            source={require('../../../../../assets/images/icons/icn_new_bestofs.png')}
          />
        </WaitingCircularProgress>
      </FadeOutView>
    </View>
  );
};

export default WaitingIndicator;
