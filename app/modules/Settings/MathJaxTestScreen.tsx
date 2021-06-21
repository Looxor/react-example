import * as React from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ContestQAList from "../BestOf/_Components/ContestQAList";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "native-base";
import { storageReadJson } from "../../utils/firebase/storageUtils";
import { colors } from "../../config";
import { crashlytics } from "../../utils/firebase";
// @ts-ignore
import MathJax from "react-native-mathjax-svg";
// import MathJax from '../../components/MathJax';

const latex_questions = require('../../../docs/TestData/latex_questions.json');

const delay_ms = ms =>
  new Promise((resolve, reject) => setTimeout(() => resolve(true), ms));

const MathJaxTestScreen = props => {
  const [state, setState] = useState({
    itemCount: 0,
    answers: [],
    image_url: '',
    question: '',
    problem_index: 0,
    number: 0,
    envNameProduction: '',
    envNameTesting: '',
    onFailedWhileTesting: () => {},
  });
  const setState2 = state2 => setState({...state, ...state2});

  const loadByRandomPressHandler = () => {
    refresh();
  };

  const loadByNumberPressHandler = () => {
    refresh(state.number);
  };

  const loadByMinusPressHandler = number => {
    refresh(number);
  };

  const loadByPlusPressHandler = number => {
    refresh(number);
  };

  const changeNumberHandler = text => {
    let number = parseInt(text);
    if (number >= latex_questions.length) number = latex_questions.length - 1;
    if (isNaN(number)) number = 0;
    setState2({number});
  };

  const refresh = (_number = undefined) => {
    let number = _number;
    if (number === undefined) {
      number = Math.floor((latex_questions.length - 1) * Math.random());
    } else if (number < 0) number = 0;
    else if (latex_questions.length - 1 < number)
      number = latex_questions.length - 1;

    const problem_index = number;
    const problem = latex_questions[problem_index];
    const question = problem['Domanda'] || '';
    const answers = [
      {text: problem['R0']},
      {text: problem['R1']},
      {text: problem['R2']},
      {text: problem['R3']},
      {text: problem['R4']},
    ];
    setState2({
      answers,
      question,
      problem_index,
      number,
    });
  };
  const readEnvironmentFromStorage = async (
    secondaryAppName = '',
  ): Promise<any> => {
    try {
      const environment = await storageReadJson(
        'environment.json',
        secondaryAppName,
      );
      return environment;
    } catch (error) {}
  };

  const getEnvFromTestingHandler = async () => {
    const envName = await readEnvironmentFromStorage();
    setState2({envNameTesting: envName.replace(/[\s\n]/gi, '')});
  };
  const getEnvFromProductionHandler = async () => {
    const envName = await readEnvironmentFromStorage('[SECONDARY]');
    setState2({envNameProduction: envName.replace(/[\s\n]/gi, '')});
  };
  const tryCrashPressHandler = async () => {
    // await crashlytics().setCrashlyticsCollectionEnabled(true);
    crashlytics().log('Testing crash');
    crashlytics().crash();
  };

  const componentDidMount = () => {
    return componentWillUnmount;
  };
  const componentWillUnmount = () => {};
  React.useEffect(componentDidMount, []);
  return (
    <View style={styles.container}>
      <View style={styles.loadQuestionContainer}>
        {/*<TouchableOpacity
          style={styles.getButton}
          onPress={() => tryCrashPressHandler()}>
          <Text>Try Crash</Text>
        </TouchableOpacity>*/}
        <Text style={{fontSize: 14}}>Load questions</Text>
        <View style={styles.loadButtonContainer}>
          <TouchableOpacity
            onPress={loadByNumberPressHandler}
            style={styles.button}>
            <Text>Load by</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.numberText}
            onChangeText={changeNumberHandler}
            placeholder="Number"
            value={String(state.number)}
          />
          <TouchableOpacity
            onPress={() => loadByPlusPressHandler(state.number + 1)}
            style={[styles.button, styles.randomButton]}>
            <Text>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => loadByPlusPressHandler(state.number - 1)}
            style={[styles.button, styles.randomButton]}>
            <Text>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={loadByRandomPressHandler}
            style={[styles.button, styles.randomButton]}>
            <Icon style={styles.randomButtonIcon} name="ios-refresh" />
          </TouchableOpacity>
        </View>
      </View>
      {state.question ? (
        <>
          <Text style={styles.problemIndex}>
            Question index (0 based) : {state.problem_index}
          </Text>
          <ContestQAList
            onSelectItem={item => {}}
            answers={state.answers}
            question={state.question}
            image_url={state.image_url}
            navigation={props.navigation}
            onFailed={state.onFailedWhileTesting}
          />
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  getButton: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 5,
    padding: 3,
    marginTop: 2,
  },
  loadQuestionContainer: {
    height: 70,
    width: '90%',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  loadButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    marginTop: 5,
  },
  reloadButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  problemIndex: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  numberText: {
    padding: 0,
    height: 22,
    marginLeft: 10,
  },
  button: {
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  randomButton: {
    marginLeft: 20,
  },
  randomButtonIcon: {
    fontSize: 12,
    padding: 3,
    paddingHorizontal: 0,
    width: 10,
  },
});

export default MathJaxTestScreen;
