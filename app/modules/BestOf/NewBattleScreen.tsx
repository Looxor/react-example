import React from "react";
import FastImage from "react-native-fast-image";
import { Text, TouchableOpacity } from "react-native";
import { Container, Content } from "native-base";
import { StandardBoxWithComponent } from "../../components";

import styles from "./NewBattleScreen.style";
import { colors, strings } from "../../config";
import { CallServerPromise } from "../../utils/app/CallServer";
import { routes } from "../../navigation/rootNavigation/navigation.constants";
import { CommonActions as StackActions } from "@react-navigation/native";
// MISSING
import standardFunctions from "../../utils/app/StandardFunctions";
import { UserData } from "../../config/constants";

const NewBattleScreen = props => {
  const friendBestOfPressHandler = () => {
    StackActions.navigate(routes.BESTOF_FRIEND_LIST);
  };
  const randomBestOfPressHandler = async () => {
    try {
      const request = await CallServerPromise.start_bestof();
      if (request.success) {
        const bestof_id = request.data.bestof_id;
        StackActions.navigate(routes.BESTOF_BATTLE, {
          bestof_id: bestof_id,
        });
      } else {
        await showError(request);
      }
    } catch (error) {
      showError(error);
    }
  };

  const showError = error => {
    return new Promise((resolve, eject) => {
      let title, message;
      switch (error.code) {
        case 111:
          title = strings.ALERTS.BESTOF.ERROR_WHILE_STARTING.TITLE;
          message = error.error;
          break;
        default:
          title = strings.ALERTS.BESTOF.ERROR_WHILE_STARTING.TITLE;
          message = strings.ALERTS.BESTOF.ERROR_WHILE_STARTING.MESSAGE;
      }
      standardFunctions.show_alert(title, message, true, () => {
        resolve(true);
      });
    });
  };
  const userData = UserData.getUserData();

  return (
    <Container style={styles.container}>
      <StandardBoxWithComponent
        background_start_color={colors.BESTOF.START}
        background_finish_color={colors.BESTOF.FINISH}
        viewStyle={styles.logo}>
        <FastImage
          style={styles.logoImage}
          source={require('../../../assets/images/icons/icn_game_white_red.png')}
        />
      </StandardBoxWithComponent>
      <Content style={styles.buttonContainer} padder>
        <TouchableOpacity
          onPress={friendBestOfPressHandler}
          style={styles.selectButton}>
          <FastImage
            style={styles.selectButtonImage}
            resizeMode={'contain'}
            source={require('../../../assets/images/icons/icn_bestof_friend_red.png')}
          />
          <Text style={styles.selectButtonText}>
            {strings.BESTOF.FIRST_SCREEN_FRIEND_TEXT}
          </Text>
          <FastImage
            style={styles.selectButtonImageRight}
            source={require('../../../assets/images/icons/icn_arrow_right_blu.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={randomBestOfPressHandler}
          style={styles.selectButton}>
          <FastImage
            style={styles.selectButtonImage}
            resizeMode={'contain'}
            source={require('../../../assets/images/icons/icn_bestof_red.png')}
          />
          <Text style={styles.selectButtonText}>
            {strings.BESTOF.FIRST_SCREEN_RANDOM_TEXT}
          </Text>
          <FastImage
            style={styles.selectButtonImageRight}
            source={require('../../../assets/images/icons/icn_arrow_right_blu.png')}
          />
        </TouchableOpacity>
      </Content>
    </Container>
  );
};

NewBattleScreen.navigationOptions = {
  title: strings.BESTOF.HOME_SCREEN_NEW_BATTLE_TEXT,
};

export default NewBattleScreen;
