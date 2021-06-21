import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { colors, constants, sounds } from "../../../../config";
import TouchableScale from "react-native-touchable-scale";
// @ts-ignore
import MathJax from "react-native-mathjax-svg";
import Strings from "../../../../utils/misc/TextComponents";
import FadeInView from "../../MatchMakingScreen/_Components/FadeInView";
import standardFunctions from "../../../../utils/app/StandardFunctions";

const parseAnswer = (answer: string) => {
  if (answer) {
    const matches = answer.toString().match(/([^\$]+)|(\$[^\$]+\$)/gim);
    if (matches) {
      return matches;
    } else return [answer];
  } else return [];
};

const AnswerButton = props => {
  const shakeAnimation = new Animated.Value(0);
  const {answer, isCorrect, isWrong, selected} = props;
  const latexAnswers = parseAnswer(answer.text);

  const componentDidMount = () => {};
  useEffect(componentDidMount, [props.disabled]);

  const startShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 8,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -8,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 8,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 60,
        useNativeDriver: true,
      }),
    ]).start();
  };

  if (isWrong) {
    startShake();
  }

  return (
    <Animated.View style={{transform: [{translateX: shakeAnimation}]}}>
      <TouchableScale
        activeScale={0.96}
        onPress={() => {
          props.onPress && props.onPress();
        }}
        style={[
          styles.answerButton,
          selected && styles.answerButtonSelected,
          isCorrect && styles.answerButtonCorrect,
          isWrong && styles.answerButtonWrong,
        ]}
        disabled={props.disabled}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 14,
            paddingVertical: 10,
          }}>
          <Text
            style={[
              styles.answerButtonTextPrefix,
              isCorrect && styles.answerButtonTextCorrect,
              isWrong && styles.answerButtonTextWrong,
            ]}>
            {String.fromCharCode(65 + answer.answer_number)}
            {'. '}
          </Text>
          <View style={styles.answerTextContainer}>
            {latexAnswers &&
              latexAnswers.map((answer_t, index) => {
                if (answer_t[0] === '$') {
                  return (
                    <MathJax
                      key={String(index)}
                      color={
                        isCorrect || isWrong ? colors.WHITE : colors.BESTOF2.BG1
                      }
                      style={{alignSelf: 'center'}}>
                      {answer_t.substr(1, answer_t.length - 2)}
                    </MathJax>
                  );
                } else {
                  return Strings.makeWrapText(answer_t.replace(/\n/gi, ''), {
                    style: [
                      styles.answerButtonText,
                      isCorrect && styles.answerButtonTextCorrect,
                      isWrong && styles.answerButtonTextWrong,
                    ],
                  });
                }
              })}
          </View>
        </View>
      </TouchableScale>
    </Animated.View>
  );
};

const AnswersBox = props => {
  const {answers, onSelectAnswer, hasImage} = props;
  const [selectedAnswerNumber, setSelectedAnswerNumber] = useState(-1);
  const onSelectAnswerHandler = answer => {
    onSelectAnswer && onSelectAnswer(answer);
    setSelectedAnswerNumber(answer.answer_number);
    standardFunctions.play_sound_effect(sounds.BESTOFS.MATCH_CHOOSEN_ANSWER);
  };
  const componentDidMount = () => {};
  useEffect(componentDidMount, [props.disabled, props.correctAnswerNumber]);

  return (
    <View style={[styles.container, props.style]}>
      {answers &&
        answers.map((answer, index) => {
          let isCorrect, isWrong;
          if (props.correctAnswerNumber !== -1) {
            isCorrect = index === props.correctAnswerNumber;
            isWrong =
              index !== props.correctAnswerNumber &&
              selectedAnswerNumber === index;
          }
          return (
            <FadeInView
              key={String(index)}
              duration={500}
              startAfter={1410 + (index + 1) * 500}
              onFadeIn={() => {
                standardFunctions.play_sound_effect(
                  sounds.BESTOFS.MATCH_ANSWER_FADE_IN,
                );
              }}>
              <AnswerButton
                isCorrect={isCorrect}
                isWrong={isWrong}
                selected={selectedAnswerNumber === index}
                onPress={() => onSelectAnswerHandler(answer)}
                disabled={props.disabled}
                key={String(index)}
                answer={answer}
              />
            </FadeInView>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 0,
    marginBottom: 10,
  },
  answerButton: {
    backgroundColor: colors.WHITE,
    marginVertical: 5,
    borderRadius: 16,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'flex-start',
    shadowColor: colors.darkGray,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 10,
    elevation: 4,
  },
  answerButtonCorrect: {
    backgroundColor: '#65AA20',
  },
  answerButtonWrong: {
    backgroundColor: '#C63838',
  },
  answerButtonText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    color: colors.BESTOF2.BG1,
  },
  answerButtonSelected: {
    backgroundColor: colors.LIGHT_SILVER,
  },
  answerButtonSelectedText: {
    color: colors.black,
  },
  answerButtonTextCorrect: {
    color: colors.WHITE,
  },
  answerButtonTextWrong: {
    color: colors.WHITE,
  },
  answerButtonTextPrefix: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 15,
    color: colors.BESTOF2.BG1,
    opacity: 0.5,
    marginRight: 0,
    marginLeft: 3,
    marginTop: 2,
  },
  answerTextContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    paddingHorizontal: 5,
    marginTop: -1,
    paddingVertical: 2,
    marginRight: 17,
  },
});

export default AnswersBox;
