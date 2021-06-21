import React, { useEffect, useState } from "react";
import { colors, constants } from "../../../../config";
import { Platform, StyleSheet, Text, View } from "react-native";
import Strings from "../../../../utils/misc/TextComponents";
import { Popover } from "teaset";

const PopoverMarkDescription = props => {
  return (
    <Popover
      style={[
        styles.markDescriptionPopoverContainer,
        {
          alignSelf:
            props.type === 0
              ? 'flex-end'
              : props.type === 1
              ? 'center'
              : 'flex-start',
        },
      ]}
      arrow={'none'}>
      {Strings.makeBold(props.markDescription, {
        style: styles.popoverTextStyle,
      })}
    </Popover>
  );
};

let gTimerProgressBarInterval: any = 0;
let gTimerProgress = {
  last: 0,
  step: 0,
};

const ProgressBar = props => {
  const {
    timeout,
    onTimeout,
    onLayout,
    scores_table,
    isInPreviewTime,
    onTimeStopped,
    markDescription,
    needsToStop,
    answeredMoment,
    answerClickedMoment,
    temporaryScore,
  } = props;
  const [progress, setProgress] = useState(100);

  const updateProgress = () => {
    if (isInPreviewTime || needsToStop) return;
    gTimerProgress.last -= gTimerProgress.step;
    setProgress(gTimerProgress.last);

    if (gTimerProgress.last < 0) {
      clearInterval(gTimerProgressBarInterval);
      onTimeout && onTimeout();
    }
  };

  const onTimeoutChanged = () => {
    let t = Platform.OS === 'android' ? 8.5 : 10.2;
    gTimerProgress.last = 100;
    gTimerProgress.step = t / timeout;

    if (props.timeout && !props.needsToStop && !props.isAnswered) {
      gTimerProgressBarInterval = setInterval(updateProgress, 500);
    }
    return () => {
      clearInterval(gTimerProgressBarInterval);
      gTimerProgress = {
        last: 0,
        step: 0,
      };
    };
  };

  const componentDidMount = () => {
    return componentWillUnmount();
  };
  const componentWillUnmount = () => {
    clearInterval(gTimerProgressBarInterval);
  };
  useEffect(componentDidMount, []);

  useEffect(onTimeoutChanged, [props.timeout, props.isInPreviewTime]);

  const onNeedsToStop = () => {
    if (needsToStop === true) {
      clearInterval(gTimerProgressBarInterval);
    }
  };
  useEffect(onNeedsToStop, [needsToStop]);

  useEffect(() => {
    if (props.isAnswered && temporaryScore) {
      onTimeStopped &&
        onTimeStopped(
          props.isAnswered && props.isAnsweredCorrectly
            ? temporaryScore.toString()
            : '17',
        );
    }

    if (props.isAnswered && !props.isAnsweredCorrectly) {
      setProgress(0);
    }
  }, [props.isAnswered]);
  return (
    <View onLayout={onLayout} style={styles.container}>
      <View
        style={[
          styles.circleView,
          props.isAnswered &&
            props.isAnsweredCorrectly && {backgroundColor: '#65AA20'},
          props.isAnswered &&
            !props.isAnsweredCorrectly && {backgroundColor: '#C63838'},
          {
            left:
              (progress - 5 > 6 ? (progress - 5 > 95 ? 95 : progress - 5) : 6) +
              '%',
          },
        ]}>
        <Text
          style={[styles.textStyle, props.isAnswered && {color: colors.WHITE}]}>
          {(!props.isAnswered || (props.isAnswered && !temporaryScore)) &&
            scores_table[
              Math.min(
                Math.floor(
                  ((+new Date() - answeredMoment) / 1000 / timeout) *
                    scores_table.length,
                ),
                scores_table.length - 1,
              )
            ]}
          {props.isAnswered &&
            props.isAnsweredCorrectly &&
            temporaryScore &&
            temporaryScore}
          {scores_table &&
            props.isAnswered &&
            !props.isAnsweredCorrectly &&
            scores_table[scores_table.length - 1]}
        </Text>
      </View>
      <View style={styles.markContainer}>
        {markDescription && (
          <PopoverMarkDescription
            type={progress > 33 ? (progress > 66 ? 0 : 1) : 2}
            progress={progress}
            markDescription={markDescription}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: 38,
    elevation: 38,
  },
  circleView: {
    position: 'absolute',
    top: -12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: 35,
    borderRadius: 25,
    backgroundColor: colors.WHITE,
    zIndex: 28,
    elevation: 28,
  },
  textStyle: {
    marginTop: 2,
    marginLeft: 0,
    fontSize: 16,
    fontFamily: 'Kalam-Bold',
    color: colors.BESTOF2.BG1,
    textAlign: 'center',
    zIndex: 31,
    elevation: 31,
  },
  markDescriptionPopoverContainer: {
    position: 'absolute',
    backgroundColor: colors.DEFAULT_BACKGROUND,
    padding: 8,
    paddingHorizontal: 25,
    marginHorizontal: -10,
    borderRadius: 16,
    shadowColor: '#777',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    zIndex: 300,
    elevation: 300,
  },
  popoverTextStyle: {
    color: colors.BESTOF2.BG1,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
  },
  markContainer: {
    position: 'absolute',
    top: 25,
    width: '100%',
  },
});

export default ProgressBar;
