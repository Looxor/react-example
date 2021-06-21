import React, { useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";

import { Button } from "../../components";

import styles from "./StudentCardPending.style";

import { strings } from "../../config";
import FastImage from "react-native-fast-image";

const StudentCardPending = props => {
  const closeButtonPressHandler = () => {
    props.navigation.goBack(null);
  };

  const componentDidMount = () => {
    const componentWillUnmount = () => {};
    return componentWillUnmount;
  };

  useEffect(componentDidMount, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <FastImage
          style={styles.logo}
          source={require('../../../assets/images/icons/icn_big_punches_light.png')}
        />
        <Text style={styles.description}>
          {strings.SIGNUP.STUDENT_CARD_PENDING.DESCRIPTION}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={closeButtonPressHandler}
          style={[styles.button, styles.closeButton]}>
          {strings.SIGNUP.STUDENT_CARD_PENDING.CLOSE_BUTTON}
        </Button>
      </View>
    </SafeAreaView>
  );
};

StudentCardPending.navigationOptions = ({navigation}) => {
  return {
    title: strings.SIGNUP.STUDENT_CARD_PENDING.TITLE,
  };
};

export default StudentCardPending;
