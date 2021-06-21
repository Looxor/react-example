import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors, strings } from "../../../config";
import { CallServerPromise } from "../../../utils/app/CallServer";
import { routes } from "../../../navigation/rootNavigation/navigation.constants";
import { CommonActions as NavigationActions } from "@react-navigation/native";
import constants, { UserData } from "../../../config/constants";

const MAX_LIFE = 5;

const HomeButtons = props => {
  const [userLife, setUserLife] = useState(0);
  const [regen, setRegen] = useState(0);
  let timerInterval: any = 0;

  const pressOngoingBattleHandler = () => {
    let user = UserData.getUserData();
    if (user.faculty_id !== undefined && user.faculty_id !== '') {
      NavigationActions.navigate(routes.BESTOF2_NAVIGATOR, {
        screen: routes.BESTOF_ONGOING,
      });
    } else {
      NavigationActions.navigate(routes.BESTOF_EDIT_FACULTY, {
        user,
        onAfterSaveFaculty,
      });
    }
  };

  const onAfterSaveFaculty = () => {};

  const pressNewBattleHandler = () => {
    let user = UserData.getUserData();
    if (user.faculty_id !== undefined && user.faculty_id !== '') {
      NavigationActions.navigate(routes.BESTOF2_NAVIGATOR, {
        screen: routes.BESTOF_NEW_BATTLE,
      });
    } else {
      NavigationActions.navigate(routes.BESTOF_EDIT_FACULTY, {
        user,
        onAfterSaveFaculty,
      });
    }
  };

  const componentDidMount = () => {
    let seconds_to_regeneration = 150;
    const getUserLife = async () => {
      try {
        const request = await CallServerPromise.get_games_available();
        if (request.success) {
          setUserLife(request.data.games_available);

          if (request.data.seconds_to_regeneration) {
            seconds_to_regeneration = request.data.seconds_to_regeneration;
            if (request.data.games_available !== MAX_LIFE) {
              const startTimer = () => {
                timerInterval = setInterval(() => {
                  setRegen(seconds_to_regeneration);
                  seconds_to_regeneration--;
                  if (seconds_to_regeneration < 0) clearInterval(timerInterval);
                }, 1000);
              };
              startTimer();
            }
          }
        } else {
        }
      } catch (error) {}
    };
    if (props.isLoaded) getUserLife();
    else clearInterval(timerInterval);
    return componentWillUnmount;
  };
  const componentWillUnmount = () => {
    clearInterval(timerInterval);
  };
  useEffect(componentDidMount, [props.isLoaded]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={pressOngoingBattleHandler}
        style={styles.homeButton}>
        <Image
          resizeMode={'contain'}
          style={styles.homeButtonImage}
          source={require('../../../../assets/images/icons/icn_ongoing_bestof.png')}
        />
        <Text style={styles.homeButtonText}>
          {strings.BESTOF.HOME_SCREEN_ONGOING_TEXT}
        </Text>
        <Image
          resizeMode={'contain'}
          style={styles.homeButtonImageRight}
          source={require('../../../../assets/images/icons/icn_arrow_right_blu.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={pressNewBattleHandler}
        style={[styles.homeButton, styles.homeButton2]}>
        <Image
          resizeMode={'contain'}
          style={styles.homeButtonImage}
          source={require('../../../../assets/images/icons/icn_game_red.png')}
        />
        <Text style={styles.homeButtonText}>
          {strings.BESTOF.HOME_SCREEN_NEW_BATTLE_TEXT}
          <Text style={styles.homeButtonText2}>
            {userLife
              ? '\n' +
                strings.BESTOF.HOME_SCREEN_NEW_BATTLE_STATUS.replace(
                  '{NUM1}',
                  String(MAX_LIFE),
                ).replace('{NUM2}', String(userLife))
              : null}{' '}
            {userLife === MAX_LIFE
              ? strings.BESTOF.HOME_SCREEN_NEW_BATTLE_STATUS_ALL
              : regen > 0 &&
                strings.BESTOF.HOME_SCREEN_NEW_BATTLE_STATUS_MINS.replace(
                  '{NUM1}',
                  String(Math.floor(regen / 60)),
                ).replace('{NUM2}', String(regen % 60))}
          </Text>
        </Text>
        <Image
          resizeMode={'contain'}
          style={styles.homeButtonImageRight}
          source={require('../../../../assets/images/icons/icn_arrow_right_blu.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {paddingHorizontal: 7},
  homeButton: {
    borderWidth: 0.5,
    borderColor: colors.BESTOF.DEFAULT,
    borderRadius: 10,
    width: '100%',
    height: 85,
    backgroundColor: colors.WHITE,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  homeButton2: {
    marginTop: 8,
  },
  homeButtonImage: {
    width: 60,
    height: 60,
  },
  homeButtonImageRight: {
    width: 20,
    height: 20,
  },
  homeButtonText: {
    color: colors.darkGray,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 16,
    width: 200,
    lineHeight: 20,
  },
  homeButtonText2: {
    color: colors.BLACK,
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    fontWeight: 'normal',
  },
});

export default HomeButtons;
