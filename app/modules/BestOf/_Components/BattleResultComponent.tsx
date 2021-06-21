import React from "react";
import { useDispatch } from "react-redux";

import { StyleSheet, View } from "react-native";

import ProfileImages from "./ProfileImages";
import BattleMarkPanel from "./BattleMarkPanel";
import { Button } from "../../../components";
import { colors, constants, strings } from "../../../config";
import { saveBestOfToHistory } from "../_actions";

const BattlePlayComponent = props => {
  const {bestOf, total_coins, max_coins, obtained_coins} = props;
  const isAllRoundCompleted = bestOf && bestOf.isAllRoundCompleted();
  const isRejected = bestOf && bestOf.isRejected();
  const dispatch = useDispatch();

  const moveToHistoryPressHandler = () => {
    dispatch(saveBestOfToHistory(bestOf.getData()));
    props.navigation.setParams({refresh: true});
    props.navigation.goBack(null);
  };

  return (
    <View style={styles.container}>
      <ProfileImages
        myImage={bestOf.getMyImage()}
        opponentImage={bestOf.getOpponentImage()}
        opponentName={bestOf.getOpponentName()}
      />
      <BattleMarkPanel
        rejectedByMe={bestOf.rejectedByMe()}
        myScore={bestOf.getMyScore()}
        opponentScore={bestOf.getOpponentScore()}
        isMyTurn={bestOf.isMyTurn()}
        isOpponentTurn={!bestOf.isMyTurn()}
        isAllRoundCompleted={isAllRoundCompleted}
        isRejected={isRejected}
        total_coins={total_coins}
        max_coins={max_coins}
        obtained_coins={obtained_coins}
        isMeWon={bestOf.isMeWon()}
        winner_name={bestOf.winner_name}
      />
      <Button
        onPress={moveToHistoryPressHandler}
        style={[styles.move2HistoryButton]}
        textStyle={styles.move2HistoryButtonText}>
        {strings.BESTOF.BATTLE_SCREEN.MOVE_TO_HISTORY_BUTTON}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 3,
    justifyContent: 'center',
  },
  move2HistoryButton: {
    fontFamily: constants.DEFAULT_FONT,
    alignSelf: 'center',
    height: 45,
    backgroundColor: colors.BESTOF.DEFAULT,
  },
  move2HistoryButtonText: {
    fontSize: 18,
  },
});

export default BattlePlayComponent;
