import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
// @ts-ignore
import MathJax from "react-native-mathjax-svg";
import FastImage from "react-native-fast-image";
import ContestManager from "../Models/ContestManager";
import Strings from "../../../utils/misc/TextComponents";

import { constants } from "../../../config";

const QuestionItem = props => {
  const {question, image_url} = props;
  const questions = ContestManager.parseQuestion(question);

  return (
    <View style={styles.questionInfo}>
      <View style={styles.formulaContainer}>
        {questions &&
          questions.map((question, index) => {
            if (question[0] === '$') {
              return (
                <>
                  <MathJax key={String(index)} style={{alignSelf: 'center'}}>
                    {question.substr(1, question.length - 2)}
                  </MathJax>
                </>
              );
            } else {
              return Strings.makeWrapText(question.replace(/\n/gi, ''), {
                style: styles.formulaText,
              });
            }
          })}
      </View>
      {image_url ? (
        <FastImage
          style={styles.image}
          resizeMode="contain"
          source={{uri: image_url}}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  questionInfo: {
    flex: 1,
    width: '100%',
    paddingVertical: 15,
    justifyContent: 'center',
  },
  formulaContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },
  formulaLatex: {},
  formulaText: {
    fontSize: 18,
    minHeight: 25,
    lineHeight: 25,
    justifyContent: 'center',
    alignSelf: 'center',
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    flexWrap: 'wrap',
  },
  image: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * (9 / 16),
    alignSelf: 'center',
  },
});

export default QuestionItem;
