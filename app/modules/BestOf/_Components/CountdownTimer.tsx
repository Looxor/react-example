import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import { colors } from "../../../config";

let interval: any = 0;
const CountdownTimer = props => {
  const DIFF_VALUE = -props.timeout;
  const [downCount, setDownCount] = useState(0);

  const componentDidMount = () => {
    interval = setInterval(() => {
      setDownCount(prevDownCount => {
        if (prevDownCount >= 100) {
          clearInterval(interval);
          props.onComplete && props.onComplete();
          return prevDownCount;
        } else {
          return prevDownCount + 100 / Math.abs(DIFF_VALUE);
        }
      });
    }, 1000);

    return componentWillUnmount;
  };

  const componentWillUnmount = () => {
    clearInterval(interval);
  };

  useEffect(componentDidMount, [props.timeout]);

  if (props.enabled === false) {
    clearInterval(interval);
  }

  return (
    <AnimatedCircularProgress
      size={props.size}
      width={props.width}
      fill={100 - downCount}
      style={[styles.timer, props.style]}
      children={value => {
        let panVal =
          props.timeout -
          Math.round(props.timeout + (DIFF_VALUE * value) / 100);
        if (panVal < 0) panVal = 0;
        return <Text style={[styles.text, props.textStyle]}>{panVal}</Text>;
      }}
      rotation={0}
      tintColor={props.tintColor ? props.tintColor : colors.THEFACULTY}
      lineCap={'round'}
      duration={1000 * DIFF_VALUE}
    />
  );
};

const styles = StyleSheet.create({
  timer: {},
  text: {
    color: colors.WHITE,
    fontSize: 18,
  },
});

export default CountdownTimer;
