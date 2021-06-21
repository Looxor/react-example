import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { Overlay } from "teaset";
import FastImage from "react-native-fast-image";

import { colors, constants, strings } from "../../../../config";
import { Button } from "../../../../components";
import standardFunctions from "../../../../utils/app/StandardFunctions";

const FeedbackPopoverView = (props: any = {}) => {
  const {onPressOK} = props;
  return {
    show: () => {
      const overlayId = Overlay.show(
        overlayView({
          getOverlayIdFunc: () => overlayId,
          onPressOK,
        }),
      );
    },
  };
};

const overlayView = ({getOverlayIdFunc, onPressOK}) => (
  <Overlay.View style={styles.overlayContainer}>
    <OverlayChildView
      onPressOK={comment => {
        if (!comment) {
          standardFunctions.show_alert_async(
            strings.OTHER.WARNING,
            strings.BESTOF2.SUMMARY_SCREEN.FEEDBACK_INPUT_EMPTY,
          );
        } else {
          onPressOK && onPressOK(comment);
        }
      }}
      onPressClose={() => {
        const overlayId = getOverlayIdFunc();
        Overlay.hide(overlayId, true);
      }}
      getOverlayIdFunc={getOverlayIdFunc}
    />
  </Overlay.View>
);

const OverlayChildView = props => {
  const [sentSuccessfully, setSentSuccessfully] = useState(false);
  const [comment, setComment] = useState('');
  const onPressOKHandler = () => {
    if (comment) {
      setSentSuccessfully(true);
    }
    props.onPressOK && props.onPressOK(comment);
  };

  const onPressCloseHandler = () => {
    props.onPressClose && props.onPressClose();
  };

  useEffect(() => {
    setSentSuccessfully(false);
  }, []);
  return (
    <KeyboardAvoidingView
      style={{width: '100%'}}
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
      <View style={styles.overlay}>
        <FastImage
          resizeMode={'contain'}
          source={
            sentSuccessfully
              ? require('../../../../../assets/images/icons/icn_request_sent_successfully.png')
              : require('../../../../../assets/images/icons/icn_flag.png')
          }
          style={styles.flagIcon}
        />
        <Text style={styles.feedbackQuestionTitle}>
          {sentSuccessfully
            ? strings.BESTOF2.SUMMARY_SCREEN.FEEDBACK_QUESTION_TITLE_SUCCESS
            : strings.BESTOF2.SUMMARY_SCREEN.FEEDBACK_QUESTION_TITLE}
        </Text>
        <Text style={styles.feedbackQuestion}>
          {sentSuccessfully
            ? strings.BESTOF2.SUMMARY_SCREEN.FEEDBACK_QUESTION_SUCCESS
            : strings.BESTOF2.SUMMARY_SCREEN.FEEDBACK_QUESTION}
        </Text>
        {!sentSuccessfully && (
          <TextInput
            onChangeText={text => setComment(text)}
            multiline={true}
            textAlignVertical={'top'}
            placeholder={
              strings.BESTOF2.SUMMARY_SCREEN.FEEDBACK_INPUT_PLACEHOLDER
            }
            style={styles.feedbackInput}
          />
        )}
        <Button
          onPress={sentSuccessfully ? onPressCloseHandler : onPressOKHandler}
          style={styles.okButton}
          textStyle={styles.okButtonText}>
          {sentSuccessfully
            ? strings.OTHER.CLOSE
            : strings.BESTOF2.SUMMARY_SCREEN.SEND_FEEDBACK}
        </Button>
        {!sentSuccessfully && (
          <Button
            onPress={onPressCloseHandler}
            style={styles.closeButton}
            textStyle={styles.closeButtonText}>
            {sentSuccessfully ? strings.OTHER.CLOSE : strings.OTHER.CANCEL}
          </Button>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  overlay: {
    width: '90%',
    marginHorizontal: 20,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    // maxHeight: '80%',
    padding: 15,
  },
  flagIcon: {
    marginTop: 10,
    marginBottom: 10,
    width: 30,
    height: 30,
  },
  feedbackQuestionTitle: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 20,
    color: colors.BESTOF2.BG1,
  },
  feedbackQuestion: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    lineHeight: 18,
    color: colors.BESTOF2.BG1,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 10,
    marginHorizontal: 15,
  },
  feedbackInput: {
    marginTop: 10,
    backgroundColor: colors.LIGHT_SILVER,
    width: '95%',
    height: 100,
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
  },
  okButton: {
    marginTop: 15,
    marginBottom: 5,
    backgroundColor: colors.BESTOF2.BG1,
    borderRadius: 15,
    height: 48,
    width: '95%',
    shadowColor: colors.lightGray,
    shadowOpacity: 0.4,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    elevation: 2,
  },
  okButtonText: {
    fontSize: 18,
    color: colors.WHITE,
    fontFamily: constants.DEFAULT_FONT_BOLD,
  },
  closeButton: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: colors.WHITE,
    borderRadius: 15,
    width: '95%',
    height: 48,
    alignSelf: 'center',
    shadowColor: colors.lightGray,
    shadowOpacity: 0.4,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    elevation: 2,
  },
  closeButtonText: {
    fontSize: 18,
    color: colors.BESTOF2.BG1,
    fontFamily: constants.DEFAULT_FONT_BOLD,
  },
});

export default FeedbackPopoverView;
