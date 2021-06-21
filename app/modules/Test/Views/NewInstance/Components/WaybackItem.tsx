import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { colors, constants, strings } from "../../../../../config";

const WaybackItem = props => {
  const {wayback} = props;
  let disabled = false;

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={props.onPressWayback}
      style={[styles.waybackButton, disabled && styles.waybackButtonDisabled]}>
      <Text
        style={[styles.waybackTitle, disabled && styles.waybackTitleDisabled]}
        numberOfLines={2}
        adjustsFontSizeToFit={true}
        minimumFontScale={0.8}>
        {wayback.name}
      </Text>
      <View style={styles.waybackPriceContainer}>
        <FastImage
          resizeMode={'contain'}
          style={styles.waybackPriceIcon}
          source={
            // @ts-ignore
            disabled === true
              ? require('../../../../../../assets/images/icons/icn_coins_gray.png')
              : require('../../../../../../assets/images/icons/icn_new_tf_coin.png')
          }
        />
        {wayback.price === 0 ? (
          <Text
            style={[
              styles.waybackPriceValue,
              disabled && styles.waybackPriceValueDisabled,
            ]}>
            {strings.TEST.NEW_INSTANCE.PRICE_ZERO}
          </Text>
        ) : (
          <Text
            style={[
              styles.waybackPriceValue,
              disabled && styles.waybackPriceValueDisabled,
            ]}>
            {wayback.price} {strings.TEST.NEW_INSTANCE.POINT}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  waybackButton: {
    width: '100%',
    height: 90,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: colors.THEFACULTY,
    marginBottom: 12,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  waybackButtonDisabled: {
    borderColor: colors.lightGray,
  },
  waybackTitle: {
    fontSize: 18,
    marginBottom: 6,
    color: colors.THEFACULTY,
    fontFamily: constants.DEFAULT_FONT_BOLD,
  },
  waybackTitleDisabled: {
    color: colors.lightGray,
  },
  waybackPriceContainer: {
    flexDirection: 'row',
  },
  waybackPriceIcon: {
    marginTop: 0,
    width: 20,
    height: 20,
  },
  waybackPriceValue: {
    fontSize: 15,
    color: colors.THEFACULTY,
    lineHeight: 17,
    marginLeft: 5,
    marginTop: 3,
    fontFamily: constants.DEFAULT_FONT,
  },
  waybackPriceValueDisabled: {
    color: colors.lightGray,
  },
});

export default WaybackItem;
