import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
// @ts-ignore
import MathJax from "react-native-mathjax-svg";
import ContestManager from "../Models/ContestManager";
import { colors, constants } from "../../../config";
import Strings from "../../../utils/misc/TextComponents";

const INITIAL = 'initial';
const WAITING = 'waiting';
const COMPLETED = 'completed';

const AnswerItem = props => {
  const {item} = props;
  const {status, isCorrect} = props;
  const [selected, setSelected] = useState(false);

  const componentDidMount = () => {
    return componentWillUnmount;
  };
  const componentWillUnmount = () => {};
  useEffect(componentDidMount, []);

  const onSelect = () => {
    setSelected(true);
    props.onSelect(item);
  };
  const answer_texts = ContestManager.parseQuestion(item.text);

  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={onSelect}
      style={[
        styles.answerItem,
        {
          backgroundColor:
            status === INITIAL || status === COMPLETED
              ? isCorrect
                ? colors.GREEN_TF
                : status === INITIAL
                ? 'transparent'
                : selected
                ? colors.RED_TF
                : 'transparent'
              : status === WAITING
              ? selected
                ? colors.YELLOW_TF
                : 'transparent'
              : 'transparent',
          borderColor:
            status === INITIAL || status === COMPLETED
              ? isCorrect
                ? colors.GREEN_TF
                : status === INITIAL
                ? colors.THEFACULTY
                : selected
                ? colors.RED_TF
                : colors.THEFACULTY
              : status === WAITING
              ? selected
                ? colors.YELLOW_TF
                : colors.THEFACULTY
              : colors.THEFACULTY,
        },
      ]}>
      {answer_texts &&
        answer_texts.map((answer_text, index) => {
          if (answer_text[0] === '$') {
            return (
              <>
                <MathJax
                  key={String(index)}
                  style={{
                    alignSelf: 'center',
                  }}>
                  {answer_text.substr(1, answer_text.length - 2)}
                </MathJax>
              </>
            );
          } else {
            return Strings.makeWrapText(answer_text.trim(), {
              style: [
                styles.formulaText,
                {
                  color:
                    (status === COMPLETED || status === WAITING) &&
                    (selected || isCorrect)
                      ? 'white'
                      : 'black',
                },
              ],
            });
          }
        })}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  answerItem: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.THEFACULTY,
    minHeight: 50,
    borderRadius: 30,
    paddingHorizontal: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    padding: 15,
    flexWrap: 'wrap',
  },
  formulaText: {
    fontSize: 16,
    lineHeight: 25,
    alignSelf: 'center',
    fontFamily: constants.DEFAULT_FONT,
  },
  latex: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default AnswerItem;
