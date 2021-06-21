import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { colors, constants } from "../../../config";

const ClockTimer = props => {
  let interval: any = 0;
  const [timerCount, setTimerCount] = useState(3);

  const startTimer = (setTimerCount, props) => {
    interval = setInterval(() => {
      setTimerCount(prevTimerCount => {
        if (prevTimerCount > 1) {
          return prevTimerCount - 1;
        } else {
          setTimeout(() => {
            clearInterval(interval);
            props.onComplete();
          }, 500);
          return prevTimerCount;
        }
      });
    }, 1000);
  };

  const componentDidMount = () => {
    startTimer(setTimerCount, props);
    return componentWillUnmount;
  };
  const componentWillUnmount = () => {
    clearInterval(interval);
  };
  useEffect(componentDidMount, []);

  return (
    <View style={styles.timerContainer}>
      <View style={styles.timerImageContainer}>
        <FastImage
          source={require('../../../../assets/images/icons/icn_timer.png')}
          style={styles.timerImage}
          resizeMode="contain"
        />
        <Text style={styles.timerImageText}>{timerCount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 145,
    marginTop: -70,
    marginLeft: -20,
  },
  timerImage: {
    width: 150,
    height: 145,
  },
  timerImageText: {
    fontFamily: constants.DEFAULT_FONT,
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 100,
    width: 50,
    lineHeight: 70,
    position: 'absolute',
    right: 35,
    top: 48,
    fontSize: 70,
    color: colors.THEFACULTY,
  },
});

export default ClockTimer;
