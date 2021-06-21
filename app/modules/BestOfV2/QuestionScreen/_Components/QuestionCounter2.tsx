import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../../../config";
import FadeInView from "../../MatchMakingScreen/_Components/FadeInView";
import TimerProgress from "./TimerProgress";

const QuestionCounter2 = props => {
  const {
    timeout,
    needsToStop,
    isInPreviewTime,
    isAnswered,
    isAnsweredCorrectly,
    loading,
    onTimeStopped,
    markDescription,
    answering,
    answeredMoment,
    answerClickedMoment,
    temporaryScore,
  } = props;
  const componentDidMount = () => {};
  useEffect(componentDidMount, [
    needsToStop,
    isInPreviewTime,
    loading,
    markDescription,
  ]);
  return (
    <View style={{height: 50, marginTop: 55, zIndex: 50, elevation: 50}}>
      {!isInPreviewTime && (
        <FadeInView duration={1000}>
          <TimerProgress
            temporaryScore={temporaryScore}
            answeredMoment={answeredMoment}
            answerClickedMoment={answerClickedMoment}
            onTimeStopped={onTimeStopped}
            markDescription={markDescription}
            timeout={timeout}
            isInPreviewTime={isInPreviewTime}
            answering={answering}
            isAnswered={isAnswered}
            needsToStop={needsToStop}
            isAnsweredCorrectly={isAnsweredCorrectly}
          />
        </FadeInView>
      )}
    </View>
  );
};

/*
<WaitingCircularProgress
  timeout={timeout}
  circleSize={70}
  isAnswered={isAnswered}
  isAnsweredCorrectly={isAnsweredCorrectly}
  isInPreviewTime={isInPreviewTime}
  needsToStop={needsToStop}
  loading={loading}
  innerCircleStyle={[
    styles.waitingProgressCircle,
    isAnswered && isAnsweredCorrectly && {backgroundColor: '#65AA20'},
    isAnswered &&
    !isAnsweredCorrectly && {backgroundColor: '#C63838'},
  ]}
  innerCircleTextStyle={[
    styles.waitingProgressCircleText,
    isAnswered && {fontFamily: 'Kalam-Bold'},
  ]}
  barColor={'rgba(0,0,0,0.2)'}
  barWidth={8}
  onTimeout={() => {
    // setShowCounter(false);
    props.onTimeout && props.onTimeout();
  }}
/>
*/

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
  waitingProgress: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    marginTop: 12,
    marginLeft: 0,
    fontSize: 28,
    fontFamily: 'Kalam-Regular',
    color: colors.BESTOF2.BG1,
    textAlign: 'center',
  },
  certificateIcon: {
    position: 'absolute',
    alignSelf: 'center',
    width: 68,
    height: 68,
    zIndex: -100,
  },
});

export default QuestionCounter2;
