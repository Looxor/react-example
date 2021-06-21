import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, constants, strings } from "../../../../../config";

const TransactionItem = props => {
  const {date, coins, desc} = props.item;
  return (
    <View style={[styles.container, coins < 0 && styles.containerMinus]}>
      <View style={styles.firstRowContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateTitle}>{strings.WALLET.MAIN.ITEM.DATE}</Text>
          <Text style={styles.dateText}>{date}</Text>
        </View>
        <View style={styles.coinsContainer}>
          <Text style={styles.coinsTitle}>
            {strings.WALLET.MAIN.ITEM.QUANTITY}
          </Text>
          {coins === 0 && (
            <Text style={[styles.coinsText]}>
              {strings.WALLET.MAIN.ITEM.FREE}
            </Text>
          )}
          {coins !== 0 && (
            <Text
              style={[styles.coinsText, coins < 0 && styles.coinsTextMinus]}>
              {coins > 0 && '+'}
              {coins} {strings.OTHER.COINS}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.descContainer}>
        <Text style={styles.descTitle}>
          {strings.WALLET.MAIN.ITEM.DESCRIPTION}
        </Text>
        <Text style={styles.descText}>{desc}</Text>
      </View>
    </View>
  );
};

const defaultFont1 = {
  fontFamily: constants.DEFAULT_FONT,
  fontSize: 14,
  color: colors.gray,
};
const defaultFont2 = {
  fontFamily: constants.DEFAULT_FONT,
  fontSize: 17,
  color: colors.BLACK,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: constants.onePixel * 2,
    borderColor: colors.THEFACULTY,
    padding: 12,
  },
  containerMinus: {
    borderColor: colors.RED_TF,
  },
  firstRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateContainer: {},
  dateTitle: {
    ...defaultFont1,
  },
  dateText: {
    ...defaultFont2,
  },
  coinsContainer: {},
  coinsTitle: {
    ...defaultFont1,
    textAlign: 'right',
  },
  coinsText: {
    ...defaultFont2,
    textAlign: 'right',
    color: colors.THEFACULTY,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 18,
  },
  coinsTextMinus: {
    color: colors.RED_TF,
  },
  descContainer: {},
  descTitle: {
    ...defaultFont1,
    marginTop: 10,
  },
  descText: {
    ...defaultFont2,
  },
});

export default TransactionItem;
