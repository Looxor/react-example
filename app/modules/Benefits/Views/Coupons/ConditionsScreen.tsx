import React from "react";

import { ScrollView, Text } from "react-native";
import styles from "./ConditionsScreen.style";
import { strings } from "../../../../config";
import Strings from "../../../../utils/misc/TextComponents";

const ConditionsScreen = props => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{props.navigation.getParam('title')}</Text>
      <Text style={styles.description}>
        {Strings.makeBold(props.navigation.getParam('text'))}
      </Text>
      <Text>{'\n\n'}</Text>
    </ScrollView>
  );
};

ConditionsScreen.navigationOptions = ({navigation}) => ({
  title: strings.COUPONS.CONDITIONS_SCREEN.TITLE,
});

export default ConditionsScreen;
