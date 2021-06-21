import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { colors, constants } from "../../../../../config";
import BlockSubItem from "./BlockSubItem";
import ScoreInfoPullView from "./ScoreInfoPullView";

const BlockItem = props => {
  const {
    minutes,
    subItems,
    hasOneMore,
    correct_answer,
    wrong_answer,
    no_answer,
  } = props;
  const showScoreInfoHandler = ({correct_answer, wrong_answer, no_answer}) => {
    ScoreInfoPullView({correct_answer, wrong_answer, no_answer}).show();
  };
  return (
    <View style={[styles.container, hasOneMore && {width: 300}]}>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{minutes} min.</Text>
        <FastImage
          style={styles.timeIcon}
          source={require('../../../../../../assets/images/icons/icn_alarm_white.png')}
        />
      </View>
      <View style={styles.guidelineContainer}>
        {subItems
          ? subItems.map(
              (
                {subject_name, topic_name, number_of_questions, questionTexts},
                index,
              ) => (
                <BlockSubItem
                  key={String(index)}
                  subject_name={subject_name}
                  topic_name={topic_name}
                  number_of_questions={number_of_questions}
                  questionTexts={questionTexts}
                />
              ),
            )
          : null}
        <TouchableOpacity
          onPress={() => {
            showScoreInfoHandler({correct_answer, wrong_answer, no_answer});
          }}
          style={styles.faqButton}>
          <FastImage
            style={styles.faqIcon}
            source={require('../../../../../../assets/images/icons/icn_faq.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const renderBlock = ({item, index, hasOneMore}) => {
  const {minutes, subItems, correct_answer, wrong_answer, no_answer} = item;
  return (
    <BlockItem
      key={String(index)}
      minutes={minutes}
      subItems={subItems}
      hasOneMore={hasOneMore}
      correct_answer={correct_answer}
      wrong_answer={wrong_answer}
      no_answer={no_answer}
    />
  );
};

const BlocksList = props => {
  const {blocks} = props;
  return (
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      legacyImplementation={false}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) =>
        renderBlock({item, index, hasOneMore: blocks.length > 1})
      }
      data={blocks}
      keyExtractor={index => String(index)}
      style={styles.guideLinesContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 320,
    margin: 10,
  },
  timeContainer: {
    backgroundColor: colors.THEFACULTY,
    width: 90,
    height: 40,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  timeText: {
    color: colors.WHITE,
    marginTop: -2,
    marginRight: 4,
    fontFamily: constants.DEFAULT_FONT,
  },
  timeIcon: {
    width: 16,
    height: 16,
  },
  guidelineContainer: {
    flex: 1,
    backgroundColor: colors.WHITE,
    elevation: 1,
    borderRadius: 10,
    marginTop: -7,
    shadowColor: colors.lightGray,
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.9,
    shadowRadius: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  faqButton: {
    width: 30,
    height: 30,
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  faqIcon: {
    width: 20,
    height: 20,
  },
  guideLinesContainer: {
    flexDirection: 'row',
  },
});
export default BlocksList;
