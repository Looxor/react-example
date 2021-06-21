import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Container } from "native-base";

import ContestManager from "./Models/ContestManager";
import { StandardBoxWithComponent } from "../../components";
import ContestSubject from "./_Components/ContestSubject";
import ContestQAList from "./_Components/ContestQAList";
import CountdownTimer from "./_Components/CountdownTimer";
import styles from "./QuestionScreen.style";
import colors from "../../config/colors";

const QuestionScreen = props => {
  const contestData = ContestManager.contestData;
  const question_index = contestData.question_index;
  const questionObj = contestData.questions[question_index];
  const timeout = questionObj.timeout;
  const subject_name = questionObj.subject_name;
  const all_count = contestData.questions.length;
  const current_index = question_index + 1;
  const image_url = questionObj.image_url;
  const answers = questionObj.answers;
  const question = questionObj.question;

  const [loaded, setLoaded] = useState(true);
  const [restarting, setRestarting] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(true);
  const componentDidMount = () => {
    props.navigation.addListener('blur', () => {});
    return componentWillUnmount;
  };
  const componentWillUnmount = () => {
    setLoaded(false);
  };
  useEffect(componentDidMount, []);

  const onFailedWhileTesting = async contestResult => {
    setRestarting(true);
    setLoaded(false);
    await ContestManager.showErrorPopup(contestResult);
    //@ts-ignore
    global.backHandler && global.backHandler.remove();
    props.navigation.goBack(null);
  };
  const onCompletedCounter = async () => {
    if (!ContestManager.contestData.answer_submitted) {
      await ContestManager.sendContestAnswer(-1);
      ContestManager.goNextQuestion(props.navigation);
    }
  };
  const onSelectItem = () => {
    setTimerEnabled(false);
  };

  return loaded ? (
    <Container style={styles.container}>
      {restarting ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="small" />
        </View>
      ) : (
        <>
          <StandardBoxWithComponent
            background_start_color={colors.GENERAL.START}
            background_finish_color={colors.GENERAL.FINISH}
            viewStyle={styles.logo}>
            {
              <CountdownTimer
                enabled={timerEnabled}
                timeout={timeout}
                size={50}
                width={2.0}
                onComplete={onCompletedCounter}
                style={styles.timer}
              />
            }
            <ContestSubject
              subject_name={subject_name}
              current_index={current_index}
              all_count={all_count}
            />
          </StandardBoxWithComponent>

          <ContestQAList
            answers={answers}
            image_url={image_url}
            question={question}
            navigation={props.navigation}
            onSelectItem={onSelectItem}
            onFailed={onFailedWhileTesting}
          />
        </>
      )}
    </Container>
  ) : (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="small" />
    </View>
  );
};

QuestionScreen.navigationOptions = {
  header: null,
};

export default QuestionScreen;
