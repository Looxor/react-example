import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { colors, constants, strings } from "../../../config";
import Strings from "../../../utils/misc/TextComponents";
import { Popover } from "teaset";
import FadeInView from "../MatchMakingScreen/_Components/FadeInView";
import ScoreText from "./ScoreText";

const parseIconsText = (
  str: string,
  textProps: any = undefined,
  textContainer: any = undefined,
) => {
  return (
    <Text style={textContainer}>
      {str.split(/(:.*?:)/g).map(elem => {
        if (!elem) return null;
        if (elem === ':icn_hat:') {
          return (
            <FastImage
              resizeMode={'contain'}
              style={[{width: 15, height: 15}]}
              source={require('../../../../assets/images/icons/icn_hat.png')}
            />
          );
        } else if (elem === ':icn_praise:') {
          return (
            <FastImage
              resizeMode={'contain'}
              style={[{width: 15, height: 15}]}
              source={require('../../../../assets/images/icons/icn_degree.png')}
            />
          );
        } else if (elem === ':icn_avg:') {
          return (
            <FastImage
              resizeMode={'contain'}
              style={[{width: 15, height: 15}]}
              source={require('../../../../assets/images/icons/icn_result_badge.png')}
            />
          );
        }
        return Strings.makeBold(elem, textProps);
      })}
    </Text>
  );
};

const PopoverItem = props => {
  return (
    <Popover
      style={
        props.type === 'avg'
          ? styles.avgPopoverContainer
          : styles.praisePopoverContainer
      }
      arrow={props.type === 'avg' ? 'bottom' : 'bottomLeft'}
      paddingCorner={props.type === 'avg' ? 0 : 75}>
      {parseIconsText(props.text, {style: styles.popoverTextStyle})}
    </Popover>
  );
};

// score
// - gameUser1Score
// - gameUser2Score
// - subjectImageUrl
// - user1First
const ScoreBlock = props => {
  const {
    score: {gameUser1Score, gameUser2Score, subjectImageUrl},
    isAverage = false,
    showPraise,
    showAverageLabel = true,
    containerStyle,
    textStyle,
    showPopover = {praise: false, avg: false, check: false},
    setShowPopover,
    user1First = true,
    alwaysShow = false,
    enabled = false,
    startAfter = null,
    duration = null,
    showAlsoIconFade = false,
  } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      {showPopover.praise && (
        <PopoverItem
          type={'praise'}
          text={strings.BESTOF2.FINAL_RESULT_SCREEN.POPOVER_PRAISE}
        />
      )}
      {showPopover.avg && (
        <PopoverItem
          type={'avg'}
          text={strings.BESTOF2.FINAL_RESULT_SCREEN.POPOVER_AVG}
        />
      )}
      <View
        style={{
          flexDirection: 'column',
          minWidth: 100,
          alignItems: 'flex-start',
        }}>
        <FadeInView
          alwaysShow={alwaysShow}
          enabled={enabled}
          startAfter={startAfter ? startAfter : 300}
          duration={duration ? duration : 1000}>
          <ScoreText
            score={
              user1First === true
                ? gameUser1Score
                  ? gameUser1Score
                  : '  '
                : gameUser2Score
                ? gameUser2Score
                : '  '
            }
            style={[styles.scoreText, textStyle]}
            isAverage={isAverage}
          />
        </FadeInView>
        {showPraise && isAverage && (
          <TouchableOpacity
            activeOpacity={constants.ACTIVE_OPACITY}
            style={styles.praiseContainer}
            onPress={() => {
              if (isAverage && !showAverageLabel && !showPopover.check) {
                setShowPopover({
                  praise: !showPopover.praise,
                  avg: false,
                  check: false,
                });
              }
            }}>
            <FadeInView
              alwaysShow={!showAlsoIconFade}
              enabled={showAlsoIconFade}
              startAfter={startAfter ? startAfter + 800 : 300}
              duration={duration ? duration : 1600}>
              <FastImage
                style={styles.praiseIcon}
                resizeMode={'contain'}
                source={require('../../../../assets/images/icons/icn_praise_it.png')}
              />
            </FadeInView>
          </TouchableOpacity>
        )}
      </View>
      {isAverage === true ? (
        <FadeInView
          alwaysShow={!showAlsoIconFade}
          enabled={showAlsoIconFade}
          startAfter={startAfter ? startAfter : 300}
          duration={duration ? duration : 1000}
          style={{
            alignItems: 'center',
            minWidth: 50,
            ...(!showAverageLabel && {top: 10}),
          }}>
          <TouchableOpacity
            activeOpacity={
              isAverage && !showAverageLabel ? constants.ACTIVE_OPACITY : 1
            }
            onPress={() => {
              if (isAverage && !showAverageLabel && !showPopover.check) {
                setShowPopover({
                  praise: false,
                  avg: !showPopover.avg,
                  check: false,
                });
              }
            }}>
            <FastImage
              style={styles.avgIcon}
              resizeMode={'contain'}
              source={require('../../../../assets/images/icons/icn_result_badge.png')}
            />
          </TouchableOpacity>
          {showAverageLabel && (
            <Text style={styles.averageText}>
              {strings.BESTOF2.MATCH_RESULT_SCREEN.AVERAGE}
            </Text>
          )}
        </FadeInView>
      ) : (
        <FadeInView
          alwaysShow={!showAlsoIconFade}
          enabled={showAlsoIconFade}
          startAfter={startAfter ? startAfter : 300}
          duration={duration ? duration : 1000}
          style={{
            alignItems: 'center',
            minWidth: 40,
            ...(!showAverageLabel && {top: 10}),
          }}>
          <FastImage
            style={styles.subjectIcon}
            resizeMode={'contain'}
            source={
              subjectImageUrl
                ? {uri: subjectImageUrl}
                : require('../../../../assets/images/icons/icn_subjects_bookmark_internal.png')
            }
          />
        </FadeInView>
      )}
      <View
        style={{
          flexDirection: 'column',
          minWidth: 100,
          alignItems: 'flex-end',
        }}>
        <FadeInView
          alwaysShow={alwaysShow}
          enabled={enabled}
          startAfter={startAfter ? startAfter : 300}
          duration={duration ? duration : 1000}>
          <ScoreText
            score={
              user1First === true
                ? gameUser2Score
                  ? gameUser2Score
                  : '  '
                : gameUser1Score
                ? gameUser1Score
                : '  '
            }
            style={[styles.scoreText, textStyle]}
            isAverage={isAverage}
          />
        </FadeInView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  avgIcon: {
    width: 20,
    height: 20,
  },
  subjectIcon: {
    marginTop: 4,
    width: 22,
    height: 22,
  },
  praiseContainer: {
    width: 105,
    marginTop: -15,
    marginLeft: -20,
  },
  praiseIcon: {
    width: 100,
    height: 50,
  },
  scoreText: {
    fontFamily: 'Kalam-Bold',
    fontSize: 24,
    color: colors.BESTOF2.BG1,
    width: 62,
    textAlign: 'center',
  },
  averageText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 16,
    marginTop: 3,
    color: colors.ORANGE_TF,
    textAlign: 'center',
  },
  praisePopoverContainer: {
    position: 'absolute',
    top: -130,
    left: -45,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    padding: 16,
    width: 320,
    borderRadius: 16,
    shadowColor: '#777',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    zIndex: 200,
    elevation: 200,
  },
  avgPopoverContainer: {
    position: 'absolute',
    top: -255,
    left: -31,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    padding: 15,
    width: 310,
    borderRadius: 16,
    shadowColor: '#777',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    zIndex: 200,
    elevation: 200,
  },
  popoverTextStyle: {
    color: colors.BESTOF2.BG1,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
  },
});

export default ScoreBlock;
