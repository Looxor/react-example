import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import eases from "eases";
import Strings from "../utils/misc/TextComponents";

interface Props {
  start?: number;
  end: number;
  time?: number;
  easing?: string;
  onComplete?: () => void;
  startAfter?: number;
  style?: any;
}

const TextCounter = (props: Props) => {
  const {start, end, time, easing, onComplete, startAfter = 0, style} = props;

  const [startValue, setStartValue] = useState(start);
  let startTime = null;
  let stop = null;

  const componentDidMount = () => {
    startTime = Date.now();

    requestAnimationFrame(animate.bind(this));
    return componentWillUnmount;
  };

  const componentWillUnmount = () => {};

  const animate = () => {
    if (stop) {
      if (onComplete) onComplete();
      return;
    }

    requestAnimationFrame(animate.bind(this));
    draw();
  };

  const draw = () => {
    if (start && end) {
      const now = Date.now();
      if (now - startTime >= time) stop = true;
      const percentage = Math.min((now - startTime) / time, 1);
      const easeVal = eases[easing](percentage);
      const value = parseInt((start + (end - start) * easeVal).toFixed(0));

      setStartValue(value);
    }
  };

  useEffect(componentDidMount, [props]);
  return <Text style={style}>{Strings.currencyFormat(startValue)}</Text>;
};

export default TextCounter;
