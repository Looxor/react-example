import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { colors, constants, strings } from "../../../../../config";
import MessagePopoverView from "./MessagePopoverView";

const BlockSubItem = props => {
  const {topic_name, subject_name, number_of_questions, questionTexts} = props;
  const [state, setState] = useState({
    closed: true,
  });
  const setState2 = state2 => setState({...state, ...state2});
  const toggleClosed = () => {
    setState2({closed: !state.closed});
  };
  const onPressVediButton = async questionTexts => {
    let questionsText = '';
    questionTexts.map((questionText, index) => {
      questionsText += `${index + 1}) ${questionText}\n\n`;
    });
    // await standardFunctions.show_alert_async(
    //   strings.TEST.INSTANCE_DETAIL.ANTEPRIMA_POPUP_TITLE,
    //   questionsText,
    // );
    MessagePopoverView({
      title: `${subject_name}`,
      content: questionsText,
    }).show();
  };

  return (
    <View style={styles.guideline}>
      <View style={styles.header}>
        <Text style={styles.headerMajorText}>{subject_name}</Text>
        <Text style={styles.headerMajorQuestion}>
          ({number_of_questions}{' '}
          {number_of_questions > 1
            ? strings.TEST.INSTANCE_DETAIL.QUESTIONS_LABEL
            : strings.TEST.INSTANCE_DETAIL.QUESTION_LABEL}
          )
        </Text>
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
      {!state.closed && (
        <>
          <Text style={styles.description}>{topic_name}</Text>
          {questionTexts && questionTexts.length > 0 && (
            <TouchableOpacity
              onPress={() => onPressVediButton(questionTexts)}
              style={styles.vediButton}>
              <Text style={styles.vediButtonText}>
                {strings.TEST.INSTANCE_DETAIL.VEDI_BUTTON}
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
      <View style={styles.hrLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  guideline: {
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  headerMajorText: {
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT_BOLD,
  },
  headerMajorQuestion: {
    color: colors.darkGray,
    marginLeft: 5,
    fontSize: 15,
    fontFamily: constants.DEFAULT_FONT,
  },
  description: {
    lineHeight: 23,
    color: colors.darkGray,
    marginBottom: 10,
    fontFamily: constants.DEFAULT_FONT,
  },
  vediButton: {
    width: '70%',
    height: 30,
    alignSelf: 'center',
    marginVertical: 10,
  },
  vediButtonText: {
    textAlign: 'center',
    lineHeight: 30,
    color: colors.THEFACULTY,
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
  },
  closeButtonContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: 'rgba(255,255,255, 0.7)',
  },
  closeButtonContainerClosed: {
    transform: [{rotate: '45deg'}],
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonIcon: {
    width: 13,
    height: 13,
  },
  hrLine: {
    borderWidth: constants.onePixel,
    borderColor: colors.LIGHT_SILVER,
    marginHorizontal: 12,
    marginTop: 5,
  },
});

export default BlockSubItem;
