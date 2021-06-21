import React, { useEffect } from "react";
import QuestionItem from "./QuestionItem";
import AnswerItem from "./AnswerItem";

const ContestItem = props => {
  const {item, index, question, image_url} = props;
  useEffect(() => {}, []);
  return (
    <>
      {index === 0 && (
        <QuestionItem question={question} image_url={image_url} />
      )}
      <AnswerItem
        onSelect={props.onSelect}
        status={props.status}
        isCorrect={props.isCorrect}
        item={item}
        disabled={props.disabled}
      />
    </>
  );
};

export default ContestItem;
