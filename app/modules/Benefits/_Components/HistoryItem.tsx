import React from "react";

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { routes } from "../../../navigation/rootNavigation/navigation.constants";
import { colors, strings } from "../../../config";
import constants from "../../../config/constants";
import standardFunctions from "../../../utils/app/StandardFunctions";

const HistoryItem = props => {
  const navigation = useNavigation();
  const coupon = props.coupon; // coupon = new Coupon(item);
  const usage_finish_date = coupon.d('usage_finish_date');
  const is_expired = +new Date(usage_finish_date) < +new Date();

  const showCouponScreenHandler = () => {
    navigation.navigate(routes.COUPONS_COUPON, {
      coupon_id: coupon.d('coupon_id'),
      title: coupon.d('partner_name'),
      coupon_data: coupon,
    });
  };

  return (
    <TouchableOpacity
      onPress={showCouponScreenHandler}
      disabled={is_expired}
      style={[styles.itemContainer, is_expired ? styles.itemDisabled : {}]}>
      <View style={styles.itemMain}>
        <View style={styles.leftItem} />
        <View style={styles.imageItem}>
          <Image
            source={{uri: coupon.partner_image_url}}
            style={[
              styles.image,
              is_expired && {tintColor: colors.DEFAULT_PLACEHOLDER},
            ]}
          />
        </View>
        <View style={styles.rightItem} />
      </View>
      <View style={styles.itemTitle}>
        <Text style={[styles.title1, is_expired && {color: colors.gray}]}>
          {coupon.d('title')}
        </Text>
        <Text style={styles.title2} numberOfLines={1}>
          {is_expired
            ? strings.COUPONS.HISTORY_SCREEN.EXPIRED_COUPON.replace(
                '{NUM2}',
                standardFunctions.convert_date_from_rfc_to_string(
                  coupon.d('usage_finish_date'),
                ),
              )
            : strings.COUPONS.HISTORY_SCREEN.VALID_FROM_TO.replace(
                '{NUM1}',
                standardFunctions.convert_date_from_rfc_to_string(
                  coupon.d('usage_start_date'),
                ),
              ).replace(
                '{NUM2}',
                standardFunctions.convert_date_from_rfc_to_string(
                  coupon.d('usage_finish_date'),
                ),
              )}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.DEFAULT_BACKGROUND,
    paddingTop: 8,
    paddingBottom: 8,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: colors.WHITE,
    borderRadius: 18,
    marginHorizontal: 8,
    marginTop: 10,

    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: colors.lightGray,
    shadowOpacity: 0.1,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 8,
    elevation: 10,
  },
  itemDisabled: {
    opacity: 0.3,
  },
  itemMain: {
    width: '100%',
    flexDirection: 'row',
  },
  leftItem: {
    width: 50,
    height: '100%',
  },
  rightItem: {
    width: 50,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIcon: {
    width: 20,
    height: 20,
  },
  imageItem: {
    flex: 1,
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 70,
    height: 70,
  },
  itemTitle: {
    flexDirection: 'column',
    width: '88%',
  },
  title1: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 16,
    width: '100%',
    marginBottom: 5,
    alignSelf: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  title2: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    height: 30,
  },
});

export default HistoryItem;
