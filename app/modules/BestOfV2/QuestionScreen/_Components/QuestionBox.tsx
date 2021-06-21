import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, constants } from "../../../../config";
import FastImage from "react-native-fast-image";
// @ts-ignore
import MathJax from "react-native-mathjax-svg";
import Strings from "../../../../utils/misc/TextComponents";
import FadeInView from "../../MatchMakingScreen/_Components/FadeInView";
import CardFlip from "react-native-card-flip";
import standardFunctions from "../../../../utils/app/StandardFunctions";

const parseQuestion = (question: string) => {
  if (question) {
    const matches = question.toString().match(/([^\$]+)|(\$[^\$]+\$)/gim);
    if (matches) {
      return matches;
    } else return [question];
  } else return [];
};

const QuestionBox = props => {
  let cardRef: any = null;
  const {question} = props;
  const questions = parseQuestion(question.question);

  const renderQuestionHeader = (withShowImageButton = false) => {
    return (
      <>
        <FastImage
          source={
            question.subject_image_url
              ? {uri: question.subject_image_url}
              : require('../../../../../assets/images/icons/icn_subjects_bookmark_internal.png')
          }
          style={[
            styles.questionSubjectIcon,
            withShowImageButton && {width: 30, height: 30},
          ]}
          resizeMode={'contain'}
        />
        <Text style={styles.questionsCountText}>
          {question.question_number + 1}
          {'/'}
          {question.all_questions_count} {question.subject_name}
        </Text>
      </>
    );
  };

  const renderQuestionText = (withShowImageButton = false) => {
    return (
      <>
        <View style={styles.questionTextContainer}>
          {questions &&
            questions.map((question_t, index) => {
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
        {withShowImageButton && (
          <TouchableOpacity
            onPress={() => {
              cardRef && cardRef.flip();
              standardFunctions.add_firebase_event_log(
                'bestofs',
                'qst_img_flp',
                {type: 'open', question_id: question.question_id},
              );
            }}
            activeOpacity={constants.ACTIVE_OPACITY}
            style={styles.imagePreviewContainer}>
            <FastImage
              source={{uri: question.image_url}}
              style={styles.imagePreview}
            />
            <FastImage
              source={require('../../../../../assets/images/icons/icn_search_blue.png')}
              style={styles.zoomIcon}
            />
          </TouchableOpacity>
        )}
      </>
    );
  };

  const renderQuestionImage = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            cardRef && cardRef.flip();
            standardFunctions.add_firebase_event_log('bestofs', 'qst_img_flp', {
              type: 'close',
              question_id: question.question_id,
            });
          }}
          activeOpacity={constants.ACTIVE_OPACITY}
          style={styles.bigImageContainer}>
          <FastImage
            resizeMode={'contain'}
            style={styles.bigImage}
            source={{uri: question.image_url}}
          />
          <FastImage
            source={require('../../../../../assets/images/icons/icn_bestof_back_blue.png')}
            style={styles.reduceIcon}
          />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <FadeInView
        style={{
          flexDirection: 'row',
          marginBottom: question.image_url === '' ? 15 : 0,
        }}
        duration={600}
        startAfter={250}>
        <View
          style={[
            styles.gutterItem,
            styles.gutterItemLeft,
            !question.is_start && styles.showGutter,
          ]}
        />
        {question.image_url === '' && (
          <View style={styles.mainContainer}>
            {renderQuestionHeader()}
            {renderQuestionText()}
          </View>
        )}
        {question.image_url !== '' && (
          <CardFlip
            ref={card => (cardRef = card)}
            flipZoom={0.15}
            duration={500}
            style={[
              styles.flipCardContainer,
              question.question.length >= 90 && {height: 350},
              question.question.length >= 70 &&
                question.question.length < 90 && {height: 300},
              question.question.length >= 50 &&
                question.question.length < 70 && {height: 280},
              question.question.length >= 30 &&
                question.question.length < 50 && {height: 260},
              question.question.length >= 5 &&
                question.question.length < 30 && {height: 245},
            ]}>
            <View
              style={[
                styles.mainContainer,
                {paddingTop: 30, transform: [], justifyContent: 'flex-start'},
              ]}>
              {renderQuestionHeader(true)}
              {renderQuestionText(true)}
            </View>
            <View
              style={[
                styles.mainContainer,
                {paddingTop: 30, transform: [], justifyContent: 'flex-start'},
              ]}>
              {renderQuestionImage()}
            </View>
          </CardFlip>
        )}
        <View
          style={[
            styles.gutterItem,
            styles.gutterItemRight,
            !question.is_end && styles.showGutter,
          ]}
        />
      </FadeInView>
      {question.image_url !== '' && (
        <View style={{width: '100%', height: 20}} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  flipCardContainer: {
    flex: 1,
    height: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 0,
    zIndex: 0,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    borderRadius: 15,
    backgroundColor: colors.WHITE,
    shadowColor: colors.darkGray,
    shadowOpacity: 0.2,
    shadowOffset: {width: -5, height: -5},
    shadowRadius: 10,
    elevation: 4,
    transform: [{perspective: 180}, {rotateX: '-0.8deg'}],
    zIndex: 0,
  },
  gutterItem: {
    marginTop: '5%',
    height: '80%',
    width: 8,
    backgroundColor: colors.WHITE,
    shadowColor: colors.darkGray,
    shadowOpacity: 0.2,
    shadowOffset: {width: -5, height: -5},
    shadowRadius: 10,
    elevation: 4,
    opacity: 0,
  },
  showGutter: {
    opacity: 1,
  },
  gutterItemLeft: {
    marginRight: 10,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  gutterItemRight: {
    marginLeft: 10,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  questionSubjectIcon: {
    width: 48,
    height: 48,
  },
  questionsCountText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    marginTop: 5,
    marginBottom: 2,
    color: colors.BESTOF2.BG1,
    textAlign: 'center',
  },
  questionTextContainer: {
    marginVertical: 12,
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },
  questionText: {
    flexWrap: 'wrap',
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 20,
    lineHeight: 24,
    color: colors.BESTOF2.BG1,
    textAlign: 'center',
  },
  imagePreviewContainer: {
    justifyContent: 'center',
    shadowColor: colors.gray,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    zIndex: 0,
    elevation: 0,
  },
  imagePreview: {
    alignSelf: 'center',
    width: 100,
    height: 70,
    borderRadius: 10,
    zIndex: 0,
    elevation: 0,
  },
  zoomIcon: {
    position: 'absolute',
    width: 30,
    height: 30,
    bottom: -10,
    right: -10,
    borderRadius: 10,
    zIndex: 1000,
    elevation: 10,
  },
  bigImageContainer: {
    width: '100%',
    borderRadius: 15,
    height: '100%',
    backgroundColor: '#FFFFFFEE',
    shadowColor: colors.gray,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  bigImage: {
    width: '100%',
    height: '100%',
  },
  reduceIcon: {
    position: 'absolute',
    width: 42,
    height: 42,
    bottom: -8,
    right: -8,
    borderRadius: 10,
    zIndex: 1000,
    elevation: 10,
  },
});

export default QuestionBox;
