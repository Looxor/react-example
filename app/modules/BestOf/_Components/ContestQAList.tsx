import React, { useState } from "react";
import { FlatList } from "react-native";
import ContestItem from "./ContestItem";
import ContestManager from "../Models/ContestManager";
import Answer from "../Models/Answer";

const INITIAL = 'initial';
const WAITING = 'waiting';
const COMPLETED = 'completed';

const ContestQAList = props => {
  const [disabled, setDisabled] = useState(false);
  const [correctAnswerNumber, setCorrectAnswerNumber] = useState(-1);
  const [status, setStatus] = useState(INITIAL);

  const {question, image_url, answers} = props;
  const _renderItem = ({item, index}) => (
    <ContestItem
      item={item}
      index={index}
      question={question}
      image_url={image_url}
      onSelect={onSelectItem}
      disabled={disabled}
      isCorrect={item.answer_number === correctAnswerNumber}
      status={status}
    />
  );

  const onSelectItem = (item: Answer) => {
    setDisabled(true);
    const answerNumber = item.answer_number;
    props.onSelectItem && props.onSelectItem();
    onSendContestAnswer(answerNumber);
  };

  const onSendContestAnswer = async answerNumber => {
    setStatus(WAITING);
    const answerResult = await ContestManager.sendContestAnswer(answerNumber);
    if (answerResult.success === false) {
      props.onFailed(answerResult);
    } else {
      setStatus(COMPLETED);
      setCorrectAnswerNumber(answerResult.correct_answer);
    }
    setTimeout(() => {
      ContestManager.goNextQuestion(props.navigation);
    }, 1000);
  };

  return (
    <FlatList
      data={answers}
      keyExtractor={index => String(index)}
      renderItem={_renderItem}
      style={[styles.contestList, props.style]}
    />
  );
};

const styles = {
  contestList: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    marginBottom: 5,
  },
};

export default ContestQAList;
