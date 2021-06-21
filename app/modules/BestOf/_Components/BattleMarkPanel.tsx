import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View } from "react-native";
import { Path, Svg } from "react-native-svg";
import { colors, constants, strings } from "../../../config";

import BattleResultCoinsBox from "./BattleResultCoinsBox";

const BattleMarkPanel = props => {
  const [dispData, setDispData] = useState({
    total_coins: 0,
    max_coins: 1,
    obtained_coins: 0,
  });

  const componentDidMount = () => {
    const loadData = async () => {
      try {
        const {total_coins, max_coins, obtained_coins} = props;
        setDispData({
          total_coins,
          max_coins,
          obtained_coins,
        });
      } catch (error) {}
    };
    loadData();
    return componentWillUnmount;
  };
  const componentWillUnmount = () => {};
  useEffect(componentDidMount, []);
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Svg
          style={{flex: 1, width: '100%', marginTop: -40}}
          viewBox="0 0 100 5">
          <Path
            d="M 0,5 C 0,0,100,0,100,5 L 5,5 L 0,5"
            fill={colors.DEFAULT_BACKGROUND}
          />
        </Svg>
      </View>
      <View style={styles.marks}>
        {(props.isAllRoundCompleted ||
          props.isRejected ||
          props.winner_name) && (
          <View style={styles.resultMessageBox}>
            <Text style={styles.resultMessage1}>
              {props.isMeWon &&
                strings.BESTOF.BATTLE_SCREEN.RESULT_MESSAGE1_WON}
              {!props.isMeWon &&
                (props.rejectedByMe
                  ? strings.BESTOF.BATTLE_SCREEN.RESULT_MESSAGE1_ABSTAINED
                  : strings.BESTOF.BATTLE_SCREEN.RESULT_MESSAGE1_LOST)}
            </Text>
            <Text style={styles.resultMessage2}>
              {dispData.obtained_coins &&
                strings.BESTOF.BATTLE_SCREEN.RESULT_MESSAGE2.replace(
                  '{NUM1}',
                  String(dispData.obtained_coins),
                )}
            </Text>
          </View>
        )}
        <View style={styles.mark}>
          <Text style={[styles.markText, styles.markText1]}>
            {props.myScore}
          </Text>
          <Text style={[styles.markText, styles.markText2]}>
            {strings.BESTOF.YOU}
          </Text>
        </View>
        <View style={[styles.mark, styles.mark1]}>
          <Text style={[styles.markText, styles.markText1, styles.grayText]}>
            {props.opponentScore}
          </Text>
          <Text style={[styles.markText, styles.markText2, styles.grayText]}>
            {strings.BESTOF.OPPONENT}
          </Text>
        </View>
      </View>
      <View style={styles.description}>
        {props.isAllRoundCompleted || props.isRejected || props.winner_name ? (
          <>
            {
              <BattleResultCoinsBox
                total_coins={dispData.total_coins}
                max_coins={dispData.max_coins}
                obtained_coins={dispData.obtained_coins}
                style={styles.resultCoinsBox}
              />
            }
          </>
        ) : (
          <Text style={styles.whosTurnText}>
            {props.isMyTurn ? strings.BESTOF.BATTLE_SCREEN.ITS_MY_TURN : null}
            {props.isOpponentTurn
              ? strings.BESTOF.BATTLE_SCREEN.ITS_OPPONENT_TURN
              : null}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: 30,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  subContainer: {
    width: '100%',
    height: 25,
  },
  marks: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mark: {
    width: '50%',
    height: 60,
    marginTop: 15,
  },
  mark1: {
    borderLeftWidth: 1,
    borderColor: colors.SILVER,
  },

  markText: {
    fontFamily: constants.DEFAULT_FONT,
    alignSelf: 'center',
    marginTop: 0,
  },
  markText1: {
    fontSize: 45,
    fontWeight: 'bold',
    color: colors.BESTOF.DEFAULT,
  },
  markText2: {
    alignSelf: 'center',
    fontSize: 14,
  },
  grayText: {
    color: colors.lightGray,
  },

  description: {
    width: '100%',
    height: 200,
  },
  whosTurnText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 18,
    width: '100%',
    paddingHorizontal: 10,
    textAlign: 'center',
    marginTop: 20,
  },
  resultCoinsBox: {
    alignSelf: 'center',
    height: 110,
    width: '100%',
    alignItems: 'center',
  },
  resultMessageBox: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    position: 'absolute',
    top: -60,
    width: '100%',
    alignItems: 'center',
  },
  resultMessage1: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontWeight: 'bold',
    fontSize: 20,
  },
  resultMessage2: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
  },
});

export default BattleMarkPanel;
