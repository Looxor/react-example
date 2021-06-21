import React, { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import BestOfConstants from "../_Models/BestOfConstants";

let interval: any = 0;
let g_percent = {
  last: 0,
  step: 0,
  count: 0,
  score: 0,
};
const WaitingScoreProgress = props => {
  const scores_table = BestOfConstants.scores_table || [];
  const {
    circleSize,
    totalTimeout,
    barColor,
    barWidth,
    onTimeStopped,
    answering,
  } = props;
  const [percent, setPercent] = useState(100);

  const updatePercent = () => {
    if (props.isInPreviewTime) return;
    g_percent.last -= g_percent.step;
    g_percent.count++;
    setPercent(g_percent.last);

    if (
      g_percent.last < 0 &&
      g_percent.score === scores_table[scores_table.length - 1]
    ) {
      clearInterval(interval);
      props.onTimeout && props.onTimeout();
    } else if (g_percent.last < 0) {
      setPercent(100);
      g_percent.last = 100;
      g_percent.count = 0;
      g_percent.score = g_percent.score - 1;
      let scoreTime =
        (scores_table.filter(s => s === g_percent.score).length *
          totalTimeout) /
        scores_table.length;
      g_percent.step = (Platform.OS === 'android' ? 10 : 12) / scoreTime;
    }
  };

  const onTimeoutChanged = () => {
    let t = 0;
    console.log('totalTimeout', totalTimeout);
    scores_table.forEach(ss => {
      if (t !== ss) {
        t = ss;
        console.log(
          ss,
          (scores_table.filter(s => s === ss).length * totalTimeout) /
            scores_table.length,
        );
      }
    });
    let scoreTime =
      (scores_table.filter(s => s === scores_table[0]).length * totalTimeout) /
      scores_table.length;
    g_percent.last = 100;
    g_percent.step = (Platform.OS === 'android' ? 10 : 12) / scoreTime;
    g_percent.count = 0;
    g_percent.score = scores_table[0];

    if (scoreTime) {
      interval = setInterval(updatePercent, 100);
    }
    return () => {
      clearInterval(interval);
      g_percent = {
        last: 0,
        step: 0,
        count: 0,
        score: 0,
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

  useEffect(() => {
    if (props.isAnswered) {
      onTimeStopped &&
        onTimeStopped(
          props.isAnswered && props.isAnsweredCorrectly
            ? g_percent.score.toString()
            : '17',
        );
    }
  }, [props.isAnswered]);
  return (
    <AnimatedCircularProgress
      style={{
        position: 'absolute',
        zIndex: 10,
        alignSelf: 'center',
        ...props.style,
      }}
      size={circleSize}
      duration={100}
      fill={props.isAnswered ? 0 : percent}
      rotation={0}
      width={barWidth || 10}
      lineCap={'round'}
      tintColor={barColor || 'rgba(255,255,255,0.3)'}>
      {() =>
        props.children ? (
          <View
            style={{
              width: circleSize,
              height: circleSize,
              padding: 20,
              backgroundColor: 'white',
            }}>
            {props.children}
          </View>
        ) : (
          <View style={props.innerCircleStyle}>
            <Text style={props.innerCircleTextStyle}>
              {(!props.isAnswered ||
                (props.isAnswered && props.isAnsweredCorrectly)) &&
                g_percent.score}
              {scores_table &&
                props.isAnswered &&
                !props.isAnsweredCorrectly &&
                scores_table[scores_table.length - 1]}
            </Text>
          </View>
        )
      }
    </AnimatedCircularProgress>
  );
};

/*
{BestOfConstants.scores_table[BestOfConstants.scores_table.length - 1 - Math.round((((timeout - g_percent.count) * BestOfConstants.scores_table.length)/timeout))]
                || BestOfConstants.scores_table[g_percent.count === timeout ? BestOfConstants.scores_table.length-1 : 0]}
 */

export default WaitingScoreProgress;
