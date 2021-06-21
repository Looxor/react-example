import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, constants, strings } from "../../../../../../config";
import Numbers from "../../../../../../utils/misc/Numbers";
import standardFunctions from "../../../../../../utils/app/StandardFunctions";

const PurchaseTransactionItem = props => {
  const {date, discounts, coins_packet_name} = props.purchaseTransactionItem;
  const {
    coins_packet_inapp: {
      eur: {price},
    },
  } = props.purchaseTransactionItem;
  const discountPrice = discounts && discounts.length > 0 && discounts[0].price;
  return (
    <View style={styles.container}>
      <View style={styles.firstRowContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateTitle}>
            {strings.WALLET.SHOP_HISTORY.ITEM.DATE}
          </Text>
          <Text style={styles.dateText}>
            {standardFunctions.convert_date_from_rfc_to_string(date, true)}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceTitle}>
            {strings.WALLET.SHOP_HISTORY.ITEM.PRICE}
          </Text>
          <Text style={styles.priceText}>
            {strings.OTHER.EURO_SIGN}
            {Numbers.toFixedForEU(price / 100, 2)}
          </Text>
          <Text style={styles.discountPriceText} />
        </View>
      </View>
      <View style={styles.packetContainer}>
        <Text style={styles.packetTitle}>
          {strings.WALLET.SHOP_HISTORY.ITEM.PACKET_NAME}
        </Text>
        <Text style={styles.packetText}>{coins_packet_name}</Text>
      </View>
    </View>
  );
};

const defaultFont1 = {
  fontFamily: constants.DEFAULT_FONT,
  color: colors.gray,
  fontSize: 16,
};

const defaultFont2 = {
  fontFamily: constants.DEFAULT_FONT_MEDIUM,
  color: colors.THEFACULTY,
  fontSize: 18,
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.THEFACULTY,
    borderWidth: constants.onePixel * 2,
    borderRadius: 10,
    flexDirection: 'column',
    overflow: 'hidden',
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 15,
  },
  firstRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateContainer: {
    flexDirection: 'column',
  },
  dateTitle: {
    ...defaultFont1,
  },
  dateText: {
    ...defaultFont2,
  },
  priceContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  priceTitle: {
    ...defaultFont1,
  },
  priceText: {
    ...defaultFont2,
    fontFamily: constants.DEFAULT_FONT_BOLD,
  },
  discountPriceText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    color: colors.THEFACULTY,
    textDecorationLine: 'line-through',
  },
  packetContainer: {
    flexDirection: 'column',
  },
  packetTitle: {
    ...defaultFont1,
  },
  packetText: {
    ...defaultFont2,
  },
});

export default PurchaseTransactionItem;
