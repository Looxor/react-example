import React from "react";
import { useSelector } from "react-redux";
import FastImage from "react-native-fast-image";

import { FlatList, SafeAreaView, Text, View } from "react-native";
import { strings } from "../../config";

import styles from "./HistoryScreen.style";
import BestOf, { WIN_STATUS } from "./Models/BestOf";

const renderItem = ({item, index}) => {
  const bestOf = new BestOf(item);
  const opponentImage = bestOf.getOpponentImage();
  const statusText1 = bestOf.getPlayedStatus();
  const {winStatus, winStatusText} = bestOf.getWinStatus();
  return (
    <View style={[styles.listItem]}>
      <FastImage
        style={styles.itemIcon}
        source={
          opponentImage
            ? {uri: opponentImage}
            : require('../../../assets/images/icons/icn_battle.png')
        }
      />
      <View style={{width: 225, flexDirection: 'column'}}>
        <Text style={styles.itemText}>{statusText1}</Text>
        {winStatusText ? (
          <Text
            style={[
              styles.itemText,
              winStatus === WIN_STATUS.WON
                ? styles.itemTextWin
                : winStatus === WIN_STATUS.LOST
                ? styles.itemTextLost
                : {},
            ]}>
            {winStatusText}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const emptyItem = props => (
  <View style={[styles.emptyListItem]}>
    <FastImage
      style={styles.emptyItemIcon}
      source={require('../../../assets/images/icons/icn_ongoing_bestof.png')}
    />
    <Text style={styles.emptyItemText}>
      {strings.BESTOF.HISTORY.EMPTY_DESC}
    </Text>
  </View>
);

const HistoryScreen = props => {
  const BestOfState = useSelector((state: any) => state.BestOf);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={BestOfState.BestOfHistory}
        renderItem={renderItem}
        keyExtractor={item => String(item.bestof_id)}
        ListEmptyComponent={emptyItem}
      />
    </SafeAreaView>
  );
};

HistoryScreen.navigationOptions = {
  title: strings.BESTOF.HISTORY.TITLE,
};
export default HistoryScreen;
