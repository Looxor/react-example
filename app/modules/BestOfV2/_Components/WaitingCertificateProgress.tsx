import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import BestOfConstants from "../_Models/BestOfConstants";

let interval: any = 0;
let g_percent = {
  last: 0,
  step: 0,
  count: 0,
};
const WaitingCertificateProgress = props => {
  const scores_table = BestOfConstants.scores_table || [];
  const {circleSize, timeout, barColor, barWidth} = props;
  const [percent, setPercent] = useState(100);
  const [duration, setDuration] = useState(0);
  const updatePercent = () => {
    if (props.isInPreviewTime) return;
    g_percent.last -= g_percent.step;
    g_percent.count++;
    setPercent(g_percent.last);
    if (g_percent.last < 0) {
      clearInterval(interval);
      props.onTimeout && props.onTimeout();
    }
  };
  const onTimeoutChanged = () => {
    g_percent.last = 100;
    g_percent.step = 100 / timeout;
    g_percent.count = 0;
    setDuration(500);
    if (props.timeout) {
      interval = setInterval(updatePercent, 1000);
    }
    return () => {
      clearInterval(interval);
      g_percent = {
        last: 0,
        step: 0,
        count: 0,
      };
    };
  };
  useEffect(onTimeoutChanged, [props.timeout, props.isInPreviewTime]);

  const onNeedsToStop = () => {
    if (props.needsToStop === true) {
      clearInterval(interval);
    }
  };
  useEffect(onNeedsToStop, [props.needsToStop]);

  return (
    <View style={props.style}>
      <Text style={props.textStyle}>
        {(!props.isAnswered ||
          (props.isAnswered && props.isAnsweredCorrectly)) &&
          scores_table[
            Math.min(
              Math.round((g_percent.count / timeout) * scores_table.length),
              scores_table.length - 1,
            )
          ]}
        {scores_table &&
          props.isAnswered &&
          !props.isAnsweredCorrectly &&
          scores_table[scores_table.length - 1]}
      </Text>
    </View>
  );
};

export default WaitingCertificateProgress;
