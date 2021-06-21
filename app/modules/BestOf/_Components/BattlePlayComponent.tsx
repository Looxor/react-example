import React from "react";

import { BackHandler, StyleSheet, View } from "react-native";

import ProfileImages from "./ProfileImages";
import BattleProgressBar from "./BattleProgressBar";
import ResultBar from "./ResultBar";
import BattleMarkPanel from "./BattleMarkPanel";
import { Button } from "../../../components";
import { colors, constants, strings } from "../../../config";
import standardFunctions from "../../../utils/app/StandardFunctions";
import ContestManager from "../Models/ContestManager";
import BestOfManager from "../Models/BestOfManager";
import { routes } from "../../../navigation/rootNavigation/navigation.constants";

const setBackHandler = () => {
  // @ts-ignore
  global.backHandler && global.backHandler.remove();
  // @ts-ignore
  global.backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    function () {
      return true;
    },
  );
};

const BattlePlayComponent = props => {
  const {bestOf, navigation} = props;
  const bestof_id = bestOf.bestof_id;

  const playPressHandler = async () => {
    try {
      const request = await BestOfManager.startRound(bestof_id);
      if (request.success) {
        ContestManager.setBestOfId(bestof_id);
        ContestManager.init(request.data);
        setBackHandler();
        navigation.navigate(routes.BESTOF_QUESTION);
      } else {
        showError(request);
      }
    } catch (error) {
      showError(error);
    }
  };

  const showError = request => {
    let title, message;
    switch (request.code) {
      case 111:
        title = strings.BESTOF.BATTLE_SCREEN.TITLE;
        message = request.error;
        break;
      default:
        title = strings.BESTOF.BATTLE_SCREEN.TITLE;
        message = strings.BESTOF.BATTLE_SCREEN.ERROR_WHILE_STARTING;
        break;
    }
    standardFunctions.show_alert(title, message);
  };

  return (
    <View style={styles.container}>
      <ProfileImages
        myImage={bestOf.getMyImage()}
        opponentImage={bestOf.getOpponentImage()}
        opponentName={bestOf.getOpponentName()}
      />
      <BattleProgressBar
        style={styles.progressBar}
        total={bestOf.getTotalRound()}
        current={bestOf.getCurrentRound()}
      />
      <ResultBar
        round={bestOf.getTotalRound()}
        mode="left"
        values={bestOf.getMyAnswerResults()}
      />
      <BattleMarkPanel
        myScore={bestOf.getMyScore()}
        opponentScore={bestOf.getOpponentScore()}
        isMyTurn={bestOf.isMyTurn()}
        isOpponentTurn={!bestOf.isMyTurn()}
        isAllRoundCompleted={false}
      />
      <View style={{backgroundColor: colors.DEFAULT_BACKGROUND}}>
        <Button
          disabled={!bestOf.isMyTurn()}
          onPress={playPressHandler}
          style={[
            styles.playButton,
            !bestOf.isMyTurn() ? styles.playButtonDisabled : {},
          ]}
          textStyle={styles.playButtonText}>
          {strings.BESTOF.BATTLE_SCREEN.PLAY_BUTTON}
        </Button>
      </View>
      <ResultBar
        round={bestOf.getTotalRound()}
        mode="right"
        values={bestOf.getOpponentAnswerResults()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 3,
    justifyContent: 'center',
  },
  progressBar: {
    width: '95%',
    height: 40,
    marginTop: 15,
    alignSelf: 'center',
  },
  playButton: {
    fontFamily: constants.DEFAULT_FONT,
    alignSelf: 'center',
    height: 48,
  },
  playButtonText: {
    fontSize: 18,
  },
  playButtonDisabled: {
    backgroundColor: colors.lightGray,
  },
});

export default BattlePlayComponent;
