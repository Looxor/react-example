import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { colors } from "../../../../config";
import FastImage from "react-native-fast-image";
import FadeInView from "../../MatchMakingScreen/_Components/FadeInView";
import BestOfConstants from "../../_Models/BestOfConstants";
import ProgressBar from "./ProgressBar";

const DEFAULT_WIDTH_PROGRESS = 95;

const TimerProgress = props => {
  const [scoresTable, setScoresTable] = useState([]);
  const [vibrateEffect, setVibrateEffect] = useState(new Animated.Value(0));

  const componentDidMount = () => {};

  const showTimerIconAnimation = () => {
    Animated.sequence([
      Animated.timing(vibrateEffect, {
        toValue: -1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(vibrateEffect, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(vibrateEffect, {
        toValue: -1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(vibrateEffect, {
        toValue: 0,
        duration: 25,
        useNativeDriver: true,
      }),
    ]).start(async () => {});
  };

  const getScoresPercentage = w => {
    let _scores_table = BestOfConstants.scores_table || [];
    let t = w / _scores_table.length;
    let _r = [];
    let i = 0;
    let old_right = 0;
    _scores_table
      .slice()
      .sort()
      .reverse()
      .forEach(s => {
        let new_right = old_right + t;
        _r.push({
          id: s,
          right: old_right,
        });

        if (_r[i - 1] && i > 0) {
          _r[i - 1].isToShow = _r[i - 1].id !== s;
        }
        old_right = new_right;
        i = i + 1;
      });
    setScoresTable(_r);
  };

  useEffect(componentDidMount, []);
  return (
    <>
      {!props.isInPreviewTime && (
        <FadeInView
          duration={500}
          startAfter={props.startAfter}
          style={styles.container}>
          <ProgressBar
            temporaryScore={props.temporaryScore}
            answerClickedMoment={props.answerClickedMoment}
            answeredMoment={props.answeredMoment}
            markDescription={props.markDescription}
            onTimeStopped={props.onTimeStopped}
            scores_table={BestOfConstants.scores_table || []}
            onLayout={event => {
              const width = event.nativeEvent.layout.width;
              getScoresPercentage(width);
            }}
            needsToStop={props.needsToStop}
            answering={props.answering}
            isAnswered={props.isAnswered}
            isAnsweredCorrectly={props.isAnsweredCorrectly}
            startAfter={props.startAfter}
            style={styles.subContainer}
            timeout={props.timeout}
            setToShowClockAnimation={v => {
              if (v) {
                showTimerIconAnimation();
              }
            }}
            onTimeout={() => {}}
          />
          {scoresTable &&
            scoresTable.map((c, index) => {
              return (
                c.isToShow && (
                  <View
                    key={String(index)}
                    style={[styles.tick, {right: c.right - 5}]}
                  />
                )
              );
            })}
          <Animated.View
            style={[
              {
                zIndex: 28,
                elevation: 28,
                width: '100%',
                height: '100%',
                transform: [{translateX: vibrateEffect}],
              },
            ]}>
            <FastImage
              style={styles.timerIcon}
              source={require('../../../../../assets/images/icons/icn_bestof_timer.png')}
            />
          </Animated.View>
        </FadeInView>
      )}
      {props.isInPreviewTime && <View style={{height: 15, width: '90%'}} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    height: 15,
    width: '90%',
    borderWidth: 2.8,
    borderColor: colors.BESTOF2.BG1,
    backgroundColor: colors.BESTOF2.BG1,
    borderRadius: 10,
    zIndex: 0,
    elevation: 0,
  },
  subContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    width: DEFAULT_WIDTH_PROGRESS + '%',
    height: '100%',
    backgroundColor: 'transparent',
    borderRadius: 11,
    zIndex: 29,
    elevation: 29,
  },
  timerIcon: {
    position: 'absolute',
    width: 40,
    height: 40,
    top: -18,
    left: -12,
    zIndex: 2,
    elevation: 2,
  },
  tick: {
    position: 'absolute',
    backgroundColor: '#FFFFFFBB',
    width: 3,
    height: '100%',
    borderRadius: 20,
    zIndex: 1,
    elevation: 1,
  },
});

export default TimerProgress;
