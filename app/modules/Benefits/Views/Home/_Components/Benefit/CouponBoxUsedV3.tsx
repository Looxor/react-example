import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, constants, strings } from "../../../../../../config";
import FastImage from "react-native-fast-image";
import standardFunctions from "../../../../../../utils/app/StandardFunctions";

const CouponBoxUsedV3 = props => {
  const {couponPrize, onSelectCouponPrize} = props;
  const is_expired = +new Date(couponPrize.usage_finish_date) < +new Date();
  var is_almost_expired = false;
  try {
    // @ts-ignore
    var days_remaining = Math.round(
      Math.abs(
        (+new Date() - +new Date(couponPrize.usage_finish_date)) /
          (24 * 60 * 60 * 1000),
      ),
    );
    // @ts-ignore
    var total_days = Math.round(
      Math.abs(
        (+new Date(couponPrize.usage_finish_date) -
          +new Date(couponPrize.usage_start_date)) /
          (24 * 60 * 60 * 1000),
      ),
    );
    is_almost_expired = days_remaining <= total_days / 10;
  } catch (e) {}

  const getValidLabelColor = () => {
    if (is_expired) {
      return '#C63838';
    }
    if (is_almost_expired) {
      return '#F49F3E';
    }
    return '#65AA20';
  };

  const selectCouponPrizeHandler = couponPrize => {
    if (onSelectCouponPrize) {
      onSelectCouponPrize({coupon: couponPrize});
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, is_expired ? styles.containerDisabled : {}]}
      activeOpacity={constants.ACTIVE_OPACITY}
      onPress={() => {
        selectCouponPrizeHandler(couponPrize);
      }}>
      {couponPrize.data.is_multiple_use && (
        <View style={styles.ribbonImageContainer}>
          <Image
            resizeMode={'contain'}
            style={styles.ribbonImage}
            source={require('../../../../../../../assets/images/icons/icn_multiple_small.png')}
          />
          <Text style={styles.ribbonLabel}>
            {strings.COUPONS.HOME.MULTIPLE_USE_RIBBON_LABEL}
          </Text>
        </View>
      )}
      {couponPrize.data.is_cashback && (
        <View style={styles.ribbonImageContainer}>
          <Image
            resizeMode={'contain'}
            style={styles.ribbonImage}
            source={require('../../../../../../../assets/images/icons/icn_cashback_small.png')}
          />
          <Text style={styles.ribbonLabel}>
            {strings.COUPONS.HOME.CASHBACK_RIBBON_LABEL}
          </Text>
        </View>
      )}
      <View style={styles.ribbonImageContainer}>
        <Image
          resizeMode={'contain'}
          style={styles.ribbonImage}
          source={require('../../../../../../../assets/images/icons/icn_benefits_bookmark_internal.png')}
        />
      </View>
      <View style={styles.brandContainer}>
        <FastImage
          resizeMode={'contain'}
          source={{uri: couponPrize.partner_image_url}}
          style={[styles.brandImage]}
        />
      </View>
      <View style={styles.detailView}>
        <Text
          style={styles.detailTitle}
          numberOfLines={2}
          ellipsizeMode={'tail'}>
          {couponPrize.title}
        </Text>
        <Text style={[styles.detailDesc, {color: getValidLabelColor()}]}>
          {!is_expired &&
            !(is_almost_expired && !couponPrize.marked_used) &&
            strings.COUPONS.HOME.VALIDATE_UNTIL}
          {!is_expired &&
            is_almost_expired &&
            !couponPrize.marked_used &&
            strings.COUPONS.HOME.IS_ALMOST_EXPIRED}
          {is_expired && strings.COUPONS.HOME.EXPIRED}
          <Text
            style={[
              !is_expired &&
                is_almost_expired &&
                !couponPrize.marked_used && {color: getValidLabelColor()},
            ]}>
            {standardFunctions.convert_date_from_rfc_to_string(
              couponPrize.usage_finish_date,
            )}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '96%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.WHITE,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 0,
    marginLeft: '2%',
    marginRight: '2%',
    shadowColor: colors.lightGray,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 4,
    elevation: 10,
    overflow: 'hidden',
  },
  containerDisabled: {},
  brandContainer: {
    width: '40%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandImage: {
    width: '80%',
    height: '65%',
    margin: 10,
  },
  detailView: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  detailTitle: {
    width: '83%',
    fontFamily: constants.DEFAULT_FONT_SEMIBOLD,
    fontSize: 16,
    color: colors.DARK_ALOE_TF,
  },
  detailDesc: {
    marginTop: 5,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 14,
    textAlign: 'left',
  },
  ribbonImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 2,
    elevation: 10,
    right: 0,
    top: 0,
    width: 35,
    height: 35,
    borderBottomLeftRadius: 15,
    backgroundColor: colors.DARK_ALOE_TF,
  },
  ribbonImage: {
    height: 16,
    zIndex: 2,
    // elevation: 3,
  },
  ribbonImage2: {
    height: 18,
    zIndex: 2,
    elevation: 3,
    marginRight: -5,
  },
  ribbonLabel: {
    width: 60,
    textAlign: 'right',
    top: 1,
    left: -5,
    fontSize: 12,
    color: colors.BLACK,
    fontFamily: constants.DEFAULT_FONT,
    elevation: 12,
    zIndex: 25,
  },
});
export default CouponBoxUsedV3;
