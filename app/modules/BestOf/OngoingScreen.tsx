import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Path, Svg } from "react-native-svg";

import styles from "./OngoingScreen.style";
import { CacheManager, colors, strings } from "../../config";

import { routes } from "../../navigation/rootNavigation/navigation.constants";

import PointsBox from "./_Components/PointsBox";
import OngoingMarkPanel from "./_Components/OngoingMarkPanel";
import OngoingBestOf from "./_Components/OngoingBestOf";
import PlayedBestOf from "./_Components/PlayedBestOf";

import BestOf from "./Models/BestOf";
import BestOfManager from "./Models/BestOfManager";
import BestOfHistoryManager from "./Models/BestOfHistoryManager";

const renderItem = ({bestOf, navigation}) => {
  return (
    <OngoingBestOf
      onPress={bestOf => {
        navigation.navigate(routes.BESTOF_BATTLE, {
          bestof_id: bestOf.bestof_id,
        });
      }}
      bestOf={bestOf}
    />
  );
};

const renderItem2 = ({bestOf, navigation}) => (
  <PlayedBestOf
    onPress={() => {
      navigation.navigate(routes.BESTOF_BATTLE, {
        bestof_id: bestOf.bestof_id,
        is_from_old_bestofs: true,
      });
    }}
    bestOf={bestOf}
  />
);

const OngoingScreen = props => {
  const BestOfState = useSelector((state: any) => state.BestOf);
  BestOfHistoryManager.init(BestOfState.BestOfHistory || []);
  const [dispData, setDispData] = useState({
    loaded: false,
    maxCoins: CacheManager.get('maxCoins') || -1,
    userTotalCoins: CacheManager.get('userTotalCoins') || 0,
    ongoingBestOfs: CacheManager.get('ongoingBestOfs') || [],
    lastBestOfsPlayed: CacheManager.get('lastBestOfsPlayed') || [],
    wonLostCount: CacheManager.get('wonLostCount') || {
      bestofs_lost_count: 0,
      bestofs_won_count: 0,
    },
  });

  const didFocus = () => {
    setDispData({...dispData, loaded: false});
    const loadData = async () => {
      await updateDataBackground();
    };
    loadData();
  };

  const updateDataBackground = async () => {
    let maxCoins = -1,
      userTotalCoins = 0,
      ongoingBestOfs = [],
      lastBestOfsPlayed = [],
      wonLostCount = {bestofs_lost_count: 0, bestofs_won_count: 0};

    maxCoins = await BestOfManager.getMaxCoins();
    userTotalCoins = await BestOfManager.getUserTotalCoins();
    ongoingBestOfs = await BestOfManager.getOngoingBestOfs();
    lastBestOfsPlayed = await BestOfManager.getLastBestOfsPlayed();
    wonLostCount = await BestOfManager.getWonLostCount();

    CacheManager.set('maxCoins', maxCoins);
    CacheManager.set('userTotalCoins', userTotalCoins);
    CacheManager.set('ongoingBestOfs', ongoingBestOfs);
    CacheManager.set('lastBestOfsPlayed', lastBestOfsPlayed);
    CacheManager.set('wonLostCount', wonLostCount);

    setDispData({
      loaded: true,
      maxCoins,
      userTotalCoins,
      ongoingBestOfs,
      lastBestOfsPlayed,
      wonLostCount,
    });
  };

  const didBlur = () => {
    updateDataBackground();
  };

  const componentDidMount = () => {
    props.navigation.addListener('focus', didFocus);
    props.navigation.addListener('blur', didBlur);
    return componentWillUnmount;
  };
  const componentWillUnmount = () => {};
  useEffect(componentDidMount, []);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {!dispData.loaded ? (
        <View style={styles.container2}>
          <View style={styles.pointsBoxContainer} />
          <View>
            <Svg
              style={{flex: 1, width: '100%', marginTop: -80}}
              viewBox="0 0 100 5">
              <Path
                d="M 0,5 C 0,0,100,0,100,5 L 5,5 L 0,5"
                fill={colors.DEFAULT_BACKGROUND}
              />
            </Svg>
          </View>
          <View style={styles.subContainer}>
            <ActivityIndicator size="small" />
          </View>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.pointsBoxContainer}>
            <PointsBox
              color={colors.BESTOF.DEFAULT}
              start_color={colors.BESTOF.START}
              finish_color={colors.BESTOF.FINISH}
              displayValue={dispData.userTotalCoins}
              currentValue={dispData.userTotalCoins}
            />
          </View>
          <View style={{zIndex: 1}}>
            <Svg
              style={{flex: 1, width: '100%', marginTop: -80}}
              viewBox="0 0 100 5">
              <Path
                d="M 0,5 C 0,0,100,0,100,5 L 5,5 L 0,5"
                fill={colors.DEFAULT_BACKGROUND}
              />
            </Svg>
          </View>
          <View style={styles.subContainer}>
            <OngoingMarkPanel
              win={dispData.wonLostCount.bestofs_won_count}
              lost={dispData.wonLostCount.bestofs_lost_count}
            />
            <View style={styles.listContainer}>
              {dispData.ongoingBestOfs.length > 0 ? (
                <Text style={styles.playCaption}>
                  {strings.BESTOF.STATUS.PLAYING_MATCHES}
                </Text>
              ) : null}
              {dispData.ongoingBestOfs.map(bestOf =>
                renderItem({
                  bestOf: new BestOf(bestOf),
                  navigation: props.navigation,
                }),
              )}
              {dispData.lastBestOfsPlayed.length > 0 ? (
                <Text style={styles.playCaption}>
                  {strings.BESTOF.STATUS.TERMINATED_MATCHES}
                </Text>
              ) : null}
              {dispData.lastBestOfsPlayed.map(bestOf => {
                if (BestOfHistoryManager.doesNotContain(bestOf)) {
                  const instBestOf = new BestOf(bestOf);
                  return renderItem2({
                    bestOf: instBestOf,
                    navigation: props.navigation,
                  });
                } else return null;
              })}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

OngoingScreen.navigationOptions = {
  title: strings.BESTOF.HOME_SCREEN_ONGOING_TEXT,
};

export default OngoingScreen;
