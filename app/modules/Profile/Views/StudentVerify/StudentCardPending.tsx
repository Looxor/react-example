import React, { useEffect } from "react";
import { BackHandler, SafeAreaView, Text, View } from "react-native";

import { Button } from "../../../../components";

import styles from "./StudentCardPending.style";

import { strings } from "../../../../config";
import FastImage from "react-native-fast-image";

const StudentCardPending = props => {
  // @ts-ignore
  const navigationData = global.navigationData;
  if (!navigationData) return null;
  const onAfterConfirmedStudentCard =
    navigationData['onAfterConfirmedStudentCard'];
  const {
    route: {params},
  } = props;
  if (!params) return null;

  const student_card_images_url = params['student_card_images_url'];
  const university_name = params['university_name'];

  const closeButtonPressHandler = () => {
    onAfterConfirmedStudentCard && onAfterConfirmedStudentCard();
    props.navigation.pop(2);
  };

  const handleBackButton = () => true;
  const componentDidMount = () => {
    return componentWillUnmount;
  };

  const componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
  };

  useEffect(componentDidMount, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <FastImage
          style={styles.logo}
          source={require('../../../../../assets/images/icons/icn_big_punches_light.png')}
        />
        <Text style={styles.description}>
          {strings.SIGNUP.STUDENT_CARD_PENDING.DESCRIPTION}
          {'\n'}
        </Text>
        <Text style={styles.universityName}>{university_name}</Text>
        <FastImage
          style={styles.cardImage}
          source={{uri: student_card_images_url}}
        />
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

export default StudentCardPending;
