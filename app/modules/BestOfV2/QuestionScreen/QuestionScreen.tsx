import React, { useEffect } from "react";
import { BackHandler, StatusBar } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import QuestionAndAnswers from "./_Components/QuestionAndAnswers";
import { colors } from "../../../config";
import CloseScreenButton from "../_Components/CloseScreenButton";
import useQuestionViewModel from "../_ViewModels/QuestionViewModel";
import styles from "./QuestionScreen.style";
import PreviewCover from "./_Components/PreviewCover";
import FastImage from "react-native-fast-image";

const QuestionScreen = props => {
  const view = useQuestionViewModel({props});

  const handleBackButtonClick = () => {
    view.onCloseHandler();
    return true;
  };

  const componentDidMount = () => {
    const didFocus = async () => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    };

    const didBlur = () => {};

    props.navigation.addListener('blur', didBlur);
    props.navigation.addListener('focus', didFocus);
    didFocus();
    return componentWillUnmount;
  };

  const componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
  };

  useEffect(componentDidMount, []);
  return (
    <>
      <LinearGradient
        style={styles.container}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        colors={[colors.BESTOF2.BG2_1, colors.BESTOF2.BG2_2]}>
        {view.markDescription !== null &&
          view.markDescription !== undefined &&
          view.markDescription !== '' && (
            <LinearGradient
              style={{position: 'absolute', height: 250, width: '100%'}}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              colors={['rgba(0,0,0,0.15)', 'rgba(0,0,0,0)']}
            />
          )}
        <StatusBar
          backgroundColor={colors.BESTOF2.BG2_1}
          barStyle={'dark-content'}
        />
        <CloseScreenButton
          onPress={() => view.onCloseHandler()}
          style={{top: 50}}
        />
        <FastImage
          style={styles.mainImageBackground}
          source={require('../../../../assets/images/icons/bestofs_trasparent_background.png')}>
          {view.question && (
            <QuestionAndAnswers
              temporaryScore={view.temporaryScore}
              answerClickedMoment={view.answerClickedMoment}
              answeredMoment={view.answeredMoment}
              isAnswered={view.isAnswered}
              isAnsweredCorrectly={view.isAnsweredCorrectly}
              isInPreviewTime={view.isInPreviewTime}
              answerable={view.answerable}
              question={view.question}
              needsToStop={view.isAnswered || view.answering}
              loading={view.loading}
              markDescription={
                view.markDescription && view.markDescription !== ''
                  ? view.markDescription
                  : null
              }
              onSelectAnswer={answer => view.onSelectAnswer(answer)}
              onTimeStopped={score => view.getMarkDescription(score)}
              correctAnswerNumber={view.correctAnswerNumber}
            />
          )}
        </FastImage>
      </LinearGradient>
      {view.isInPreviewTime === true && <PreviewCover />}
    </>
  );
};

QuestionScreen.navigationOptions = ({navigation}) => ({
  header: null,
});

export default QuestionScreen;
