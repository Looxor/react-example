import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";

import { colors } from "../../../config";
import { WIN_STATUS } from "../Models/BestOf";
import constants from "../../../config/constants";

const PlayedBestOf = props => {
  const {bestOf} = props;
  const statusText1 = bestOf.getPlayedStatus();
  const {winStatus, winStatusText} = bestOf.getWinStatus();

  const opponentImage = bestOf.getOpponentImage();

  return (
    <TouchableOpacity
      onPress={() => props.onPress && props.onPress()}
      style={[styles.listItem]}>
      <FastImage
        style={styles.itemIcon}
        source={
          opponentImage
            ? {uri: opponentImage}
            : require('../../../../assets/images/icons/icn_profile_other_blue.png')
        }
      />
      <View style={styles.itemContainer}>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 15,
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 8,
    backgroundColor: colors.WHITE,
  },
  itemContainer: {
    flexDirection: 'column',
  },
  itemIcon: {
    width: 55,
    height: 55,
    marginRight: 30,
    backgroundColor: colors.WHITE,
    borderRadius: 50,
  },
  itemText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    color: colors.BLACK,
    fontSize: 14,
  },
  itemTextWin: {
    color: colors.GREEN_TF,
    fontSize: 16,
  },
  itemTextLost: {
    color: colors.RED_TF,
    fontSize: 16,
  },
});

export default PlayedBestOf;
