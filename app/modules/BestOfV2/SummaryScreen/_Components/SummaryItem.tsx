import React, { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { colors, constants, strings } from "../../../../config";
import { DEFAULT_SUBJECT_ICON } from "../../_demo_data/players";
import { CallServerPromise } from "../../../../utils/app/CallServer";
import standardFunctions from "../../../../utils/app/StandardFunctions";
import FeedbackPopoverView from "./FeedbackPopoverView";
import PopoverItem from "../../../../components/PopoverItem";
// @ts-ignore
import MathJax from "react-native-mathjax-svg";
import Strings from "../../../../utils/misc/TextComponents";
import ScoreText from "../../_Components/ScoreText";

const parseQuestionOrAnswer = (text: string) => {
  if (text) {
    const matches = text.toString().match(/([^\$]+)|(\$[^\$]+\$)/gim);
    if (matches) {
      return matches;
    } else return [text];
  } else return [];
};

const PopoverItem2 = props => {
  const {arrow, left, paddingCorner, text} = props;
  return (
    <PopoverItem
      arrow={arrow}
      paddingCorner={paddingCorner}
      style={{
        width: 310,
        top: 42,
        ...(left && {left}),
        backgroundColor: colors.WHITE,
        zIndex: 1000,
        elevation: 1000,
      }}
      textStyle={{
        color: colors.BESTOF2.BG1,
        fontFamily: constants.DEFAULT_FONT,
        fontSize: 18,
      }}
      text={text}
    />
  );
};

const SummaryItem = props => {
  const {
    bestof_id,
    summary: {
      question,
      subject_image_url = DEFAULT_SUBJECT_ICON,
      subject_name,
      all_questions_count,
      question_number,
      user1_answer,
      user2_answer,
      correct_answer,
    },
    summary_user_info,
  } = props;

  const [popOverShown, setPopOverShown] = useState('');
  const [processing, setProcessing] = useState('');
  const [processResult, setProcessResult] = useState('');
  const [showReportIconFull, setShowReportIconFull] = useState(false);
  const autoHidePopover = (timeout = 1600) => {
    setTimeout(() => setPopOverShown(''), timeout);
  };

  const feedbackWithComment = async comment => {
    const params = {
      question_number,
      comment,
      bestof_id,
    };
    try {
      setProcessing('REPORT');
      const request = await CallServerPromise.question_feedback(params);
      setProcessing('');
      if (request.success) {
        setShowReportIconFull(true);
        // show success feedback
        // setPopOverShown('REPORT');
        // autoHidePopover();
        // standardFunctions.show_alert_async(strings.APP_NAME, strings.BESTOF2.SUMMARY_SCREEN.SUCCESS_ON_SEND_FEEDBACK);
      } else {
        await standardFunctions.show_alert_async(
          strings.OTHER.WARNING,
          strings.BESTOF2.SUMMARY_SCREEN.ERROR_ON_SEND_FEEDBACK,
        );
        console.log('error on sending feedback', request);
      }
    } catch (e) {
      await standardFunctions.show_alert_async(
        strings.OTHER.WARNING,
        strings.BESTOF2.SUMMARY_SCREEN.ERROR_ON_SEND_FEEDBACK,
      );
      console.log('error on sending feedback', e);
    }
  };

  const feedbackWithLike = async like => {
    const params = {
      question_number,
      like,
      bestof_id,
    };
    try {
      setProcessing(like ? 'LIKE' : 'DISLIKE');
      const request = await CallServerPromise.question_feedback(params);
      setProcessing('');
      if (request.success) {
        // show success feedback
        setPopOverShown(like ? 'LIKE' : 'DISLIKE');
        setProcessResult(like ? 'LIKE' : 'DISLIKE');
        autoHidePopover();
        // standardFunctions.show_alert_async(strings.APP_NAME, strings.BESTOF2.SUMMARY_SCREEN.SUCCESS_ON_SEND_FEEDBACK);
      } else {
        await standardFunctions.show_alert_async(
          strings.APP_NAME,
          strings.BESTOF2.SUMMARY_SCREEN.ERROR_ON_SEND_FEEDBACK,
        );
        console.log('error on sending feedback', request);
      }
    } catch (e) {
      await standardFunctions.show_alert_async(
        strings.APP_NAME,
        strings.BESTOF2.SUMMARY_SCREEN.ERROR_ON_SEND_FEEDBACK,
      );
      console.log('error on sending feedback', e);
    }
  };

  const showFeedbackPopOverHandler = () => {
    FeedbackPopoverView({
      onPressOK: comment => {
        feedbackWithComment(comment);
      },
    }).show();
  };

  const questionsLatex = parseQuestionOrAnswer(question);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.questionContainer}>
        <FastImage
          source={{uri: subject_image_url || DEFAULT_SUBJECT_ICON}}
          resizeMode={'contain'}
          style={styles.questionImage}
        />
        <Text style={styles.questionSubject}>
          {question_number + 1}/{all_questions_count} {subject_name}
        </Text>
        <View style={styles.questionTextContainer}>
          {questionsLatex &&
            questionsLatex.map((question_t, index) => {
              if (question_t[0] === '$') {
                return (
                  <>
                    <MathJax
                      key={String(index)}
                      color={colors.BESTOF2.BG1}
                      style={{alignSelf: 'center'}}>
                      {question_t.substr(1, question_t.length - 2)}
                    </MathJax>
                  </>
                );
              } else {
                return Strings.makeWrapText(question_t.replace(/\n/gi, ''), {
                  style: styles.questionText,
                });
              }
            })}
        </View>
      </View>
      <View style={styles.feedbackContainer}>
        <TouchableOpacity
          disabled={processing === 'REPORT'}
          onPress={showFeedbackPopOverHandler}
          style={styles.flagButton}>
          {processing === 'REPORT' ? (
            <ActivityIndicator />
          ) : !showReportIconFull ? (
            <FastImage
              resizeMode={'contain'}
              source={require('../../../../../assets/images/icons/icn_report.png')}
              style={styles.flagImage}
            />
          ) : (
            <FastImage
              resizeMode={'contain'}
              source={require('../../../../../assets/images/icons/icn_report_full.png')}
              style={styles.flagImage}
            />
          )}
        </TouchableOpacity>
        {popOverShown === 'REPORT' && (
          <PopoverItem2
            arrow={'topLeft'}
            left={-5}
            paddingCorner={26}
            timeout={50000}
            text={strings.BESTOF2.SUMMARY_SCREEN.SUCCESS_ON_SEND_FEEDBACK}
          />
        )}
        <View style={styles.thumbsContainer}>
          <TouchableOpacity
            style={styles.thumbButton}
            disabled={processing === 'LIKE'}
            onPress={() => feedbackWithLike(true)}>
            {processing === 'LIKE' ? (
              <ActivityIndicator />
            ) : (
              <FastImage
                resizeMode={'contain'}
                source={
                  processResult === 'LIKE'
                    ? require('../../../../../assets/images/icons/icn_thumb_up_full.png')
                    : require('../../../../../assets/images/icons/icn_thumb_up.png')
                }
                style={styles.thumbImage}
              />
            )}
            {popOverShown === 'LIKE' && (
              <PopoverItem2
                arrow={'topRight'}
                left={-200}
                paddingCorner={80}
                timeout={3000}
                text={strings.BESTOF2.SUMMARY_SCREEN.SUCCESS_ON_SEND_FEEDBACK2}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.thumbButton, {marginLeft: 2, marginRight: 5}]}
            disabled={processing === 'LIKE'}
            onPress={() => feedbackWithLike(false)}>
            {processing === 'DISLIKE' ? (
              <ActivityIndicator />
            ) : (
              <FastImage
                resizeMode={'contain'}
                source={
                  processResult === 'DISLIKE'
                    ? require('../../../../../assets/images/icons/icn_thumb_down_full.png')
                    : require('../../../../../assets/images/icons/icn_thumb_down.png')
                }
                style={styles.thumbImage}
              />
            )}
            {popOverShown === 'DISLIKE' && (
              <PopoverItem2
                arrow={'topRight'}
                left={-260}
                paddingCorner={20}
                timeout={3000}
                text={strings.BESTOF2.SUMMARY_SCREEN.SUCCESS_ON_SEND_FEEDBACK3}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.scrollContainer}>
        <UserBlock
          summary_user_info={summary_user_info.user1}
          score={user1_answer.score}
        />
        <AnswerBlock style={{marginTop: 7}} answer={user1_answer} />
        <UserBlock
          style={{marginTop: 20}}
          summary_user_info={summary_user_info.user2}
          score={user2_answer.score}
        />
        <AnswerBlock style={{marginTop: 7}} answer={user2_answer} />
        {correct_answer && (
          <>
            <Text style={styles.correctAnswerLabel}>
              {strings.BESTOF2.SUMMARY_SCREEN.CORRECT_ANSWER_TITLE}
            </Text>
            <AnswerBlock style={{marginTop: 7}} answer={correct_answer} />
          </>
        )}
      </View>
    </ScrollView>
  );
};

const UserBlock = props => {
  const {
    summary_user_info: {profile_image_url, nickname},
    score,
  } = props;
  return (
    <View style={[styles.userContainer, props.style]}>
      <View style={styles.userInfoContainer}>
        <FastImage
          source={{uri: profile_image_url}}
          resizeMode={'contain'}
          style={styles.userImage}
        />
        <Text style={styles.userNameText}>{nickname}</Text>
      </View>
      <ScoreText style={styles.userScoreText} score={score} />
    </View>
  );
};

const AnswerBlock = props => {
  const {
    answer: {answer_text, is_correct, answer_number},
  } = props;
  const latexAnswers = parseQuestionOrAnswer(answer_text);

  return (
    <View
      style={[
        styles.answerContainer,
        is_correct === true
          ? styles.answerContainerCorrect
          : styles.answerContainerWrong,
        props.style,
      ]}>
      <Text style={styles.answerNumber}>
        {answer_number !== -1 && String.fromCharCode(65 + answer_number) + '. '}
      </Text>
      <View style={styles.answerTextContainer}>
        {latexAnswers &&
          latexAnswers.map((answer_t, index) => {
            if (answer_t[0] === '$') {
              return (
                <>
                  <MathJax
                    key={String(index)}
                    color={colors.WHITE}
                    style={{alignSelf: 'center'}}>
                    {answer_t.substr(1, answer_t.length - 2)}
                  </MathJax>
                </>
              );
            } else {
              return Strings.makeWrapText(answer_t.replace(/\n/gi, ''), {
                style: [
                  styles.answerText,
                  answer_number === -1 && {
                    fontFamily: constants.DEFAULT_FONT_ITALIC,
                  },
                ],
              });
            }
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  scrollContainer: {
    marginTop: 15,
    paddingHorizontal: 15,
    zIndex: -10,
    elevation: -10,
  },
  questionContainer: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    borderRadius: 15,
    backgroundColor: colors.WHITE,
    shadowColor: colors.darkGray,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    elevation: 4,
    transform: [{perspective: 180}, {rotateX: '-0.8deg'}],
  },
  questionImage: {
    alignSelf: 'center',
    width: 48,
    height: 48,
  },
  questionSubject: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    marginTop: 5,
    color: colors.BESTOF2.BG1,
    textAlign: 'center',
  },
  questionTextContainer: {
    marginTop: 15,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  questionText: {
    alignSelf: 'center',
    fontFamily: constants.DEFAULT_FONT_BOLD,
    color: colors.BESTOF2.BG1,
    fontSize: 18,
    lineHeight: 20,
    textAlign: 'center',
  },
  feedbackContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  flagButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagImage: {
    width: 30,
    height: 25,
    resizeMode: 'contain',
  },
  thumbsContainer: {
    flexDirection: 'row',
  },
  thumbButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbImage: {
    width: 30,
    height: 25,
  },
  userContainer: {
    marginHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userNameText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    color: colors.BESTOF2.BG1,
    fontSize: 20,
    lineHeight: 22,
    marginTop: 4,
    marginLeft: 10,
  },
  userScoreText: {
    marginTop: 2.5,
    fontFamily: 'Kalam-Bold',
    color: colors.BESTOF2.BG1,
    fontSize: 20,
    marginRight: 5,
  },
  answerContainer: {
    padding: 10,
    paddingLeft: 15,
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
    marginVertical: 6,
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
  answerContainerCorrect: {
    backgroundColor: '#65AA20',
  },
  answerContainerWrong: {
    backgroundColor: '#C63838',
  },
  correctAnswerLabel: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    color: colors.BESTOF2.BG1,
    fontSize: 20,
    marginLeft: 10,
    marginTop: 20,
  },
  answerNumber: {
    marginTop: 2,
    fontFamily: constants.DEFAULT_FONT,
    color: colors.WHITE,
    fontSize: 15,
    opacity: 0.5,
  },
  answerTextContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 5,
    marginTop: 1,
    paddingVertical: 2,
  },
  answerText: {
    fontFamily: constants.DEFAULT_FONT,
    color: colors.WHITE,
    fontSize: 15,
    marginTop: -0.5,
  },
});

export default SummaryItem;
