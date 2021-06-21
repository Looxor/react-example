import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Overlay } from "teaset";
import FastImage from "react-native-fast-image";

import { colors, constants, strings } from "../../../../../config";
import Strings from "../../../../../utils/misc/TextComponents";
import { StandardButton } from "../../../../../components";

const ScoreInfoPullView = (props = {}) => {
  return {
    show: () => {
      const overlayId = Overlay.show(overlayView(() => overlayId, props));
    },
  };
};

const overlayView = (getOverlayIdFunc, props: any = {}) => (
  <Overlay.PullView
    containerStyle={styles.overlayContainer}
    side={'bottom'}
    modal={false}
    rootTransform={[]}>
    <OverlayChildView
      onHideScoreInfoView={() => {
        const overlayId = getOverlayIdFunc();
        Overlay.hide(overlayId, true);
      }}
      getOverlayIdFunc={getOverlayIdFunc}
      correct_answer={props.correct_answer}
      wrong_answer={props.wrong_answer}
      no_answer={props.no_answer}
    />
  </Overlay.PullView>
);

const OverlayChildView = props => {
  const hideScoreInfoViewHandler = () => {
    props.onHideScoreInfoView();
  };

  const {correct_answer, wrong_answer, no_answer} = props;

  return (
    <View style={styles.overlay}>
      <FastImage
        source={require('../../../../../../assets/images/icons/icn_score.png')}
        style={styles.scoreInfoLogoImage}
      />
      <Text style={styles.scoreInfoDescription}>
        {strings.TEST.INSTANCE_DETAIL.SCORE_INFO_DESCRIPTION}
      </Text>
      <View style={styles.scoreInfoTextContainer}>
        <View style={styles.scoreInfoTextLine}>
          <FastImage
            style={styles.scoreInfoTextIcon}
            source={require('../../../../../../assets/images/icons/icn_correct_answer.png')}
          />
          <Text style={styles.scoreInfoText}>
            {Strings.makeBold(
              strings.TEST.INSTANCE_DETAIL.SCORE_INFO_TEXT1.replace(
                '{CORRECT_ANSWER}',
                correct_answer,
              ),
            )}
          </Text>
        </View>
        <View style={styles.scoreInfoTextLine}>
          <FastImage
            style={styles.scoreInfoTextIcon}
            source={require('../../../../../../assets/images/icons/icn_wrong_answer.png')}
          />
          <Text style={styles.scoreInfoText}>
            {Strings.makeBold(
              strings.TEST.INSTANCE_DETAIL.SCORE_INFO_TEXT2.replace(
                '{WRONG_ANSWER}',
                wrong_answer,
              ),
            )}
          </Text>
        </View>
        <View style={styles.scoreInfoTextLine}>
          <FastImage
            style={styles.scoreInfoTextIcon}
            source={require('../../../../../../assets/images/icons/icn_no_answer.png')}
          />
          <Text style={styles.scoreInfoText}>
            {Strings.makeBold(
              strings.TEST.INSTANCE_DETAIL.SCORE_INFO_TEXT3.replace(
                '{NO_ANSWER}',
                no_answer,
              ),
            )}
          </Text>
        </View>
      </View>
      <StandardButton
        style={{marginTop: 8}}
        label={strings.TEST.INSTANCE_DETAIL.SCORE_INFO_CLOSE_BUTTON}
        onPress={hideScoreInfoViewHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    backgroundColor: 'transparent',
  },
  overlay: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    minWidth: 300,
    minHeight: 400,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  scoreInfoCloseButton: {
    height: 38,
    width: 300,
  },
  scoreInfoCloseButtonText: {
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT,
  },
  scoreInfoLogoImage: {
    width: 85,
    height: 85,
    marginTop: 20,
  },
  scoreInfoDescription: {
    fontSize: 15,
    marginHorizontal: 10,
    alignSelf: 'center',
    fontFamily: constants.DEFAULT_FONT,
  },
  scoreInfoTextContainer: {
    marginBottom: 20,
  },
  scoreInfoTextLine: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  scoreInfoTextIcon: {
    width: 24,
    height: 24,
    marginTop: 2,
    marginRight: 12,
  },
  scoreInfoText: {
    lineHeight: 25,
    fontSize: 15,
    fontFamily: constants.DEFAULT_FONT,
  },
});

export default ScoreInfoPullView;
