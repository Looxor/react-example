import React, { useEffect, useState } from "react";
import { BackHandler, Platform, SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import useMatchResultViewModel from "../_ViewModels/MatchResultViewModel";
import CloseScreenButton from "../_Components/CloseScreenButton";
import FastImage from "react-native-fast-image";
import { colors, strings } from "../../../config";
import styles from "./MatchResultScreen.style";
import PlayerBlock from "../_Components/PlayerBlock";
import ScoreBlock from "../_Components/ScoreBlock";
import TimerProgressBar from "./_Components/TimerProgressBar";
import FadeOutView from "../MatchMakingScreen/_Components/FadeOutView";

const MatchResultScreen = props => {
  const view = useMatchResultViewModel({props});
  const [showWaitSomeSeconds, setShowWaitSomeSeconds] = useState(false);

  const handleBackButtonClick = () => {
    view.onCloseHandler();
    return true;
  };

  const componentDidMount = () => {
    const didFocus = async () => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    };

    const didBlur = () => {};

    props.navigation.addListener('blur', didBlur);
    props.navigation.addListener('focus', didFocus);
    didFocus();
    return componentWillUnmount;
  };

  const componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
  };

  useEffect(componentDidMount, []);
  return (
    <SafeAreaView style={styles.container}>
      <FastImage
        resizeMode={'contain'}
        source={require('../../../../assets/images/icons/bestofs_trasparent_background_blue.png')}
        style={styles.imageBackgroundContainer}>
        <CloseScreenButton
          onPress={() => view.onCloseHandler(true)}
          style={
            Platform.OS === 'android'
              ? {top: StatusBar.currentHeight + 10}
              : {top: 11}
          }
        />
        {view.loaded && (
          <FadeOutView
            enabled={false}
            duration={1300}
            style={{
              flex: 1,
              width: '95%',
              marginTop: 70,
              marginBottom: 20,
              paddingHorizontal: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.questionCountText}>
              {strings.BESTOF2.MATCH_RESULT_SCREEN.QUESTIONS_COUNT_INFO.replace(
                '{CURRENT_QUESTION_NUMBER}',
                view.answeredQuestion && view.answeredQuestion.question_number
                  ? view.answeredQuestion.question_number + 1
                  : '1',
              ).replace('{TOTAL_QUESTIONS_COUNT}', view.totalQuestionsCount)}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <PlayerBlock
                player={view.meIsUser1 ? view.gameUser1 : view.gameUser2}
                style={{width: '46%'}}
              />
              <PlayerBlock
                player={view.meIsUser1 ? view.gameUser2 : view.gameUser1}
                style={{width: '46%'}}
              />
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{width: '70%', marginTop: 40}}>
              {view.scores &&
                view.scores.map((score, index) => (
                  <ScoreBlock
                    key={String(index)}
                    user1First={view.meIsUser1}
                    score={score}
                    alwaysShow={true}
                    enabled={true}
                  />
                ))}
            </ScrollView>
            <View
              style={{
                backgroundColor: colors.BESTOF2.BG1,
                width: '85%',
                height: 2,
                borderRadius: 2,
                marginVertical: 15,
              }}
            />
            <ScoreBlock
              alwaysShow={true}
              enabled={false}
              score={view.avgScore}
              containerStyle={{width: '70%'}}
              textStyle={{color: colors.ORANGE_TF, fontSize: 28}}
              isAverage={true}
              user1First={view.meIsUser1}
            />
            <FastImage
              style={{width: 40, height: 40, marginTop: 35, marginBottom: 20}}
              resizeMode={'contain'}
              source={require('../../../../assets/images/icons/icn_dna.png')}
            />
            <Text style={styles.loadingQuestionText}>
              {!view.opponentIsAnswered
                ? !showWaitSomeSeconds
                  ? strings.BESTOF2.MATCH_RESULT_SCREEN.WAITING_OPPONENT_ANSWER
                  : strings.BESTOF2.MATCH_RESULT_SCREEN
                      .WAITING_OPPONENT_ANSWER_YET
                : view.answeredQuestion &&
                  view.answeredQuestion.question_number &&
                  view.answeredQuestion.question_number + 1 ===
                    view.totalQuestionsCount
                ? strings.BESTOF2.MATCH_RESULT_SCREEN.LOADING_RESULTS
                : strings.BESTOF2.MATCH_RESULT_SCREEN.LOADING_NEXT_QUESTION}
            </Text>
            <TimerProgressBar
              style={{width: '65%'}}
              timeout={view.timeout}
              onProgress={v => {
                if (v < 16) {
                  setShowWaitSomeSeconds(true);
                }
                if (v < 14 && view.opponentIsAnswered) {
                  view.setDisappear();
                }
              }}
              onTimeout={() => view.gotoNextQuestion()}
            />
          </FadeOutView>
        )}
      </FastImage>
    </SafeAreaView>
  );
};

MatchResultScreen.navigationOptions = ({navigation}) => ({
  header: null,
});

export default MatchResultScreen;
