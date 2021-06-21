import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, constants, strings } from "../../../../../../config";
import FastImage from "react-native-fast-image";
import Numbers from "../../../../../../utils/misc/Numbers";

const DiscountItem = props => {
  const {price, desc, percentage} = props.discount;
  return (
    <View style={styles.discountContainer}>
      <Text
        style={[
          styles.discountPrice,
          percentage < 0 && styles.discountPriceMinus,
        ]}>
        {percentage > 0 ? '+' : ''}
        {strings.OTHER.EURO_SIGN}
        {Numbers.toFixedForEU(price, 2)}
      </Text>
      <Text
        style={[
          styles.discountDesc,
          percentage < 0 && styles.discountDescMinus,
        ]}>
        {desc}
      </Text>
    </View>
  );
};

const CoinsPacketItem = props => {
  const [height, setHeight] = useState(0);
  const {coins, image_url, discounts, description} = props.item;
  const {
    inapp: {
      eur: {price},
    },
  } = props.item;
  const buttonRef = useRef(null);
  return (
    <TouchableOpacity
      ref={buttonRef}
      disabled={props.disabled}
      onPress={() => {
        props.onPress();
      }}
      activeOpacity={0.8}
      onLayout={({
        nativeEvent: {
          layout: {width},
        },
      }) => {
        setHeight(width * (9 / 16));
      }}
      style={{...styles.container, ...props.style}}>
      {height > 0 && (
        <>
          <View style={[styles.descContainer, {height}]}>
            <View style={styles.coinsContainer}>
              <Text style={styles.coinsText}>
                {Numbers.toPunctuatedNumber(coins, '.')} {strings.OTHER.COINS}
              </Text>
              <FastImage
                style={styles.coinsIcon}
                source={require('../../../../../../../assets/images/icons/icn_coins_blue.png')}
              />
            </View>
            {discounts &&
              discounts.length > 0 &&
              discounts.map(discount => <DiscountItem discount={discount} />)}
            <Text style={styles.price}>
              {strings.OTHER.EURO_SIGN}
              {Numbers.toFixedForEU(price / 100, 2)}
            </Text>
            <Text numberOfLines={2} style={styles.coinsDesc}>
              {description}
            </Text>
          </View>
          <FastImage
            style={styles.image}
            resizeMode={'cover'}
            source={{uri: image_url}}
          />
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.lightGray,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: 'rgba(200,200,200,0.1)',
    shadowOffset: {width: 1, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1.8,
  },
  descContainer: {
    width: '56%',
    height: '100%',
    backgroundColor: colors.WHITE,
    padding: 15,
  },
  coinsContainer: {
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 5,
  },
  coinsText: {
    fontSize: 20,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    color: colors.THEFACULTY,
    lineHeight: 18,
  },
  coinsIcon: {
    width: 12,
    height: 15,
    marginLeft: 9,
  },
  discountContainer: {
    marginLeft: 2,
    flexDirection: 'row',
    marginVertical: 3,
  },
  discountPrice: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    color: colors.THEFACULTY,
    textDecorationStyle: 'solid',
  },
  discountPriceMinus: {
    color: colors.RED_TF,
    textDecorationLine: 'line-through',
  },
  discountDesc: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    color: colors.THEFACULTY,
    marginHorizontal: 5,
  },
  discountDescMinus: {
    color: colors.RED_TF,
  },
  price: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 20,
    color: colors.THEFACULTY,
    marginVertical: 7,
    marginLeft: 3,
  },
  coinsDesc: {
    flex: 1,
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    color: colors.lightGray,
    textAlignVertical: 'bottom',
  },
  image: {
    width: '44%',
    height: '100%',
  },
});

export default CoinsPacketItem;
