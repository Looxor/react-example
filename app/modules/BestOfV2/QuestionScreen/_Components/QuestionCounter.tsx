import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { colors, constants } from "../../../../config";
import FadeInView from "../../MatchMakingScreen/_Components/FadeInView";
import Strings from "../../../../utils/misc/TextComponents";
import { Popover } from "teaset";
import WaitingScoreProgress from "../../_Components/WaitingScoreProgress";

const PopoverMarkDescription = props => {
  return (
    <Popover style={styles.markDescriptionPopoverContainer} arrow={'top'}>
      {Strings.makeBold(props.markDescription, {
        style: styles.popoverTextStyle,
      })}
    </Popover>
  );
};

const QuestionCounter = props => {
  const {
    timeout,
    needsToStop,
    isInPreviewTime,
    answering,
    isAnswered,
    isAnsweredCorrectly,
    loading,
    onTimeStopped,
    markDescription,
  } = props;
  const componentDidMount = () => {};
  useEffect(componentDidMount, [
    needsToStop,
    isInPreviewTime,
    loading,
    markDescription,
  ]);
  return (
    <View style={{height: 80, zIndex: 10, elevation: 10}}>
      {!isInPreviewTime && (
        <FadeInView duration={1000}>
          <WaitingScoreProgress
            totalTimeout={timeout}
            circleSize={70}
            answering={answering}
            isAnswered={isAnswered}
            isAnsweredCorrectly={isAnsweredCorrectly}
            isInPreviewTime={isInPreviewTime}
            needsToStop={needsToStop}
            onTimeStopped={onTimeStopped}
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
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: 100,
              zIndex: 299,
              elevation: 299,
            }}>
            {markDescription && (
              <PopoverMarkDescription markDescription={markDescription} />
            )}
          </View>
        </FadeInView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    zIndex: 0,
    elevation: 0,
  },
  waitingProgressCircle: {
    backgroundColor: colors.BESTOF2.BG1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
    elevation: 0,
  },
  waitingProgressCircleText: {
    marginTop: 4,
    marginLeft: -1,
    fontSize: 26,
    fontFamily: 'Kalam-Regular',
    color: colors.WHITE,
    textAlign: 'center',
    zIndex: 1,
    elevation: 1,
  },
  markDescriptionPopoverContainer: {
    position: 'absolute',
    top: 68,
    alignSelf: 'center',
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
});

export default QuestionCounter;
