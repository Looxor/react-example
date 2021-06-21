import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RNLinearGradient from "react-native-linear-gradient";
import FastImage from "react-native-fast-image";

import { colors, strings } from "../../../config";
import constants from "../../../config/constants";

const OngoingBestOf = props => {
  const {bestOf} = props;
  const statusText1 = bestOf.hasOpponent()
    ? strings.BESTOF.STATUS.PLAYING_WITH.replace(
        '{NAME}',
        bestOf.getOpponentName(),
      )
    : strings.BESTOF.STATUS.SEARCHING;

  const statusText2 = bestOf.isMyTurn()
    ? bestOf.hasOpponent()
      ? strings.BESTOF.YOUR_TURN
      : ''
    : bestOf.hasOpponent()
    ? strings.BESTOF.OPPONENT_TURN
    : '';

  const pressPlayHandler = () => {
    props.onPress && props.onPress(bestOf);
  };

  const buttonContent = ({textStyle}: any) => (
    <>
      <FastImage
        style={
          bestOf.getOpponentImage() !== ''
            ? styles.itemIcon
            : styles.itemIconWithoutOpponent
        }
        source={
          bestOf.getOpponentImage() !== ''
            ? bestOf.getOpponentImage()
            : require('../../../../assets/images/icons/icn_profile_other_blue.png')
        }
      />
      <View style={{width: 225, flexDirection: 'column'}}>
        <Text style={[styles.itemText, textStyle]}>{statusText1} </Text>
        {statusText2 ? (
          <Text style={[styles.itemText, textStyle]}>{statusText2}</Text>
        ) : null}
      </View>
      <FastImage
        style={styles.itemIconArrow}
        source={require('../../../../assets/images/icons/icn_arrow_right_white.png')}
      />
    </>
  );

  return (
    <TouchableOpacity
      onPress={pressPlayHandler}
      style={{marginTop: 8}}
      // disabled={!bestOf.hasOpponent()}
    >
      {bestOf.isAllRoundCompleted() ? (
        <View style={styles.normalButton}>
          {buttonContent({textStyle: styles.blackText})}
        </View>
      ) : (
        <RNLinearGradient
          style={styles.listItem}
          start={{x: 0, y: 0.5}}
          end={{x: 2, y: 1.0}}
          colors={
            bestOf.hasOpponent()
              ? [colors.BESTOF.START, colors.BESTOF.FINISH]
              : [colors.YELLOW_TF, colors.YELLOW_TF]
          }>
          {buttonContent({})}
        </RNLinearGradient>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 15,
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  itemIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
    backgroundColor: colors.WHITE,
    borderRadius: 50,
  },
  itemIconWithoutOpponent: {
    width: 55,
    height: 55,
    marginRight: 10,
    backgroundColor: colors.WHITE,
    borderRadius: 50,
  },
  itemText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    color: colors.WHITE,
    fontSize: 16,
  },
  itemText2: {
    color: colors.BLACK,
  },
  itemIconArrow: {
    width: 22,
    height: 22,
  },
  normalButton: {
    borderRadius: 8,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: colors.WHITE,
    borderColor: colors.THEFACULTY,
    borderWidth: 0.5,
  },
  blackText: {
    color: colors.BLACK,
  },
});

export default OngoingBestOf;
