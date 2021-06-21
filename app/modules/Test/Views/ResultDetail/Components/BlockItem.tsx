import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { colors, constants, strings } from "../../../../../config";
import Subject from "../../../Models/_Common/Subject";
import { useNavigation } from "@react-navigation/native";
import { routes } from "../../../../../navigation/rootNavigation/navigation.constants";
import Strings from "../../../../../utils/misc/TextComponents";

const icon_correct = require('../../../../../../assets/images/icons/icn_correct_answer.png');
const icon_wrong = require('../../../../../../assets/images/icons/icn_wrong_answer.png');
const icon_no = require('../../../../../../assets/images/icons/icn_no_answer.png');

const BlockSubjectItem = props => {
  const [state, setState] = useState({
    closed: true,
  });

  const navigation = useNavigation();

  const subject: Subject = props.subject;
  const subject_name = subject.subject_name;
  const number_of_correct_answers = subject.getNumberOfCorrectAnswers();
  const sum_of_score = subject.getSumOfScore();
  const questions = subject.questions;

  const setState2 = state2 => setState({...state, ...state2});
  const toggleClosed = () => {
    setState2({closed: !state.closed});
  };

  const showResultQuestionHandler = question => {
    navigation.navigate(routes.TEST_RESULT_QUESTION, {question});
  };
  return (
    <View style={styles.block}>
      <View style={styles.blockHeader}>
        <View style={styles.blockHeaderContainer}>
          <Text style={styles.blockHeaderName}>{subject_name}</Text>
          <Text style={styles.correctAnswerCount}>
            {number_of_correct_answers}
          </Text>
          <FastImage
            style={styles.correctIcon}
            source={require('../../../../../../assets/images/icons/icn_correct_black_v.png')}
          />
          <Text style={styles.point}>
            ({sum_of_score} {strings.TEST.RESULT_DETAIL.UNIT_POINT})
          </Text>
        </View>

        <View
          style={[
            styles.closeButtonContainer,
            state.closed ? styles.closeButtonContainerClosed : {},
          ]}>
          <TouchableOpacity onPress={toggleClosed} style={styles.closeButton}>
            <FastImage
              style={styles.closeButtonIcon}
              source={require('../../../../../../assets/images/icons/icn_close.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      {!state.closed &&
        questions &&
        questions.length > 0 &&
        questions.map((question, index) => (
          <TouchableOpacity
            onPress={() => showResultQuestionHandler(question)}
            style={styles.questionContainerButton}>
            <Text
              numberOfLines={2}
              ellipsizeMode={'tail'}
              style={styles.questionText}>
              {index + 1}) {Strings.makeMathJaxText(question.question)}
            </Text>
            <FastImage
              style={styles.questionIcon}
              source={
                question.response === 'correct'
                  ? icon_correct
                  : question.response === 'wrong'
                  ? icon_wrong
                  : question.response === 'no_answer'
                  ? icon_no
                  : null
              }
            />
          </TouchableOpacity>
        ))}
    </View>
  );
};

export const BlockItem = props => {
  const {subjects} = props;

  return (
    <View style={[styles.blocksContainer, props.style]}>
      {subjects &&
        subjects.length > 0 &&
        subjects.map((subject: Subject) => (
          <BlockSubjectItem subject={subject} />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  block: {},
  blockHeader: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  blockHeaderContainer: {
    flexDirection: 'row',
  },
  blockHeaderName: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 16,
    color: colors.darkGray,
  },
  correctAnswerCount: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    color: colors.darkGray,
    marginLeft: 20,
  },
  correctIcon: {
    width: 10,
    height: 10,
    marginTop: 7,
    marginHorizontal: 5,
  },
  point: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    color: colors.darkGray,
  },
  questionContainerButton: {
    flexDirection: 'row',
    width: '100%',
    paddingRight: 26,
    marginBottom: 10,
  },
  questionText: {
    fontFamily: constants.DEFAULT_FONT,
    color: colors.darkGray,
    fontSize: 16,
  },
  questionIcon: {
    width: 20,
    height: 20,
    marginTop: 10,
    right: -2,
    position: 'absolute',
  },
  closeButtonContainer: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: -5,
    top: -5,
  },
  closeButtonContainerClosed: {
    transform: [{rotate: '45deg'}],
  },
  closeButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonIcon: {
    width: 13,
    height: 13,
  },
  blocksContainer: {
    borderWidth: constants.onePixel,
    borderColor: colors.gray,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default BlockItem;
