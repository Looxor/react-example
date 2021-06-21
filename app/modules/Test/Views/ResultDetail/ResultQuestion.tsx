import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { colors, strings } from "../../../../config";

import styles from "./ResultQuestion.style";
import Question from "../../Models/_Common/Question";
import FastImage from "react-native-fast-image";
import { StandardBoxWithComponent } from "../../../../components";
import useResultQuestionViewModel from "../../ViewModels/ResultDetail/ResultQuestionViewModel";
import Strings from "../../../../utils/misc/TextComponents";

const icons = {
  correct: require('../../../../../assets/images/icons/icn_correct_answer.png'),
  wrong: require('../../../../../assets/images/icons/icn_wrong_answer.png'),
  no_answer: require('../../../../../assets/images/icons/icn_no_answer.png'),
};

const bg_colors = {
  correct: {
    start: colors.GENERAL.START,
    finish: colors.GENERAL.FINISH,
  },
  wrong: {
    start: colors.CONTEST.START,
    finish: colors.CONTEST.FINISH,
  },
  no_answer: {
    start: colors.COUPONS.START,
    finish: colors.COUPONS.FINISH,
  },
};

const ResultQuestion = props => {
  const {navigation} = props;
  const question: Question = navigation.getParam('question');
  const view = useResultQuestionViewModel({question});

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {view.loaded && (
          <>
            <StandardBoxWithComponent
              background_start_color={bg_colors[view.question_response].start}
              background_finish_color={bg_colors[view.question_response].finish}
              viewStyle={styles.headerBox}>
              <Text style={styles.headerBoxText}>
                {Strings.makeMathJaxText(view.question_text, {
                  color: colors.WHITE,
                })}
              </Text>
            </StandardBoxWithComponent>
            {view.image_url && (
              <FastImage source={view.image_url} style={styles.questionImage} />
            )}
            {view.answers.map(answer => {
              return (
                <View style={styles.answerContainer}>
                  <FastImage
                    source={icons[answer.icon_name]}
                    style={styles.questionResponseIcon}
                  />
                  <Text style={styles.questionText}>
                    {Strings.makeMathJaxText(answer.text)}
                  </Text>
                </View>
              );
            })}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

ResultQuestion.navigationOptions = ({navigation}) => {
  const question: Question = navigation.getParam('question');
  const question_number = question.question_number;
  return {
    title: strings.TEST.RESULT_QUESTION.TITLE.replace(
      '{QUESTION_NUMBER}',
      String(question_number + 1),
    ),
  };
};

export default ResultQuestion;
