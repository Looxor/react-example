import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../../config";

import { ANSWER_TYPE } from "../Models/Question";

const ResultBar = props => {
  return (
    <View
      style={[
        styles.container,
        props.mode === 'right' ? {right: 0} : {left: 0},
      ]}>
      {props.values
        ? props.values.reverse().map(value => (
            <>
              <View
                style={[
                  styles.bar,
                  {height: String(100 / props.values.length) + '%'},
                  value[1] === ANSWER_TYPE.CORRECT
                    ? styles.barCorrect
                    : value[1] === ANSWER_TYPE.WRONG
                    ? styles.barIncorrect
                    : styles.barNotAnswered,
                ]}
              />
              <View
                style={[
                  styles.bar,
                  {height: String(100 / props.values.length) + '%'},
                  value[0] === ANSWER_TYPE.CORRECT
                    ? styles.barCorrect
                    : value[0] === ANSWER_TYPE.WRONG
                    ? styles.barIncorrect
                    : styles.barNotAnswered,
                ]}
              />
            </>
          ))
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: 4,
    height: 190,
    zIndex: 1,
    flex: 1,
    justifyContent: 'flex-end',
  },
  bar: {
    marginTop: 1,
    width: 5,
  },
  barCorrect: {
    backgroundColor: colors.GREEN_TF,
  },
  barIncorrect: {
    backgroundColor: colors.RED_TF,
  },
  barNotAnswered: {
    backgroundColor: colors.DEFAULT_BACKGROUND,
    borderWidth: 1,
    borderColor: colors.DEFAULT_BACKGROUND,
    marginTop: 0.5,
  },
});

export default ResultBar;
