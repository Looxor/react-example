import React, { useEffect, useState } from "react";
import QuestionBox from "./QuestionBox";
import AnswersBox from "./AnswersBox";
import { ScrollView, View } from "react-native";
import BestOf from "../../_Models/BestOf";
import QuestionCounter2 from "./QuestionCounter2";

const QuestionAndAnswers = props => {
  const {
    question,
    onSelectAnswer,
    needsToStop,
    isInPreviewTime,
    isAnswered,
    isAnsweredCorrectly,
    loading,
    answering,
    onTimeStopped,
    markDescription,
    answeredMoment,
    answerClickedMoment,
    temporaryScore,
  } = props;
  const [disabled, setDisabled] = useState(!props.answerable);
  const componentDidMount = () => {
    setDisabled(!props.answerable);
  };
  useEffect(componentDidMount, [props.answerable, props.correctAnswerNumber]);
  useEffect(() => {}, [props.needsToStop, props.loading]);
  return (
    <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
      <View style={{width: '100%', height: '100%', justifyContent: 'center'}}>
        <QuestionCounter2
          temporaryScore={temporaryScore}
          answerClickedMoment={answerClickedMoment}
          answeredMoment={answeredMoment}
          answering={answering}
          isAnswered={isAnswered}
          isAnsweredCorrectly={isAnsweredCorrectly}
          isInPreviewTime={isInPreviewTime}
          timeout={BestOf.question.timeout}
          loading={loading}
          needsToStop={needsToStop}
          onTimeStopped={onTimeStopped}
          markDescription={markDescription}
          onTimeout={() => {
            setDisabled(true);
          }}
        />
        <QuestionBox question={question} />
        <ScrollView
          style={{width: '100%', height: '100%'}}
          contentContainerStyle={{flexGrow: 1}}>
          <AnswersBox
            correctAnswerNumber={props.correctAnswerNumber}
            answers={question.answers}
            disabled={disabled}
            onSelectAnswer={onSelectAnswer}
            hasImage={question.image_url !== ''}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default QuestionAndAnswers;
