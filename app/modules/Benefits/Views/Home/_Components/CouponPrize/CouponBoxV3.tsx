import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, constants, strings } from "../../../../../../config";
import FastImage from "react-native-fast-image";
import standardFunctions from "../../../../../../utils/app/StandardFunctions";
import LinearGradient from "react-native-linear-gradient";
import { routes } from "../../../../../../navigation/rootNavigation/navigation.constants";
import { useNavigation } from "@react-navigation/native";

const CouponBoxV3 = props => {
  const [fastLoad, setFastLoad] = useState(false);
  const {coupon, index, already_opened} = props;

  const navigation = useNavigation();

  const onSelectCouponHandler = ({coupon}) => {
    standardFunctions.play_tap_sound();
    standardFunctions.add_firebase_event_log('coupons', 'coupon_box_clicked', {
      coupon_id: coupon.coupon_id,
    });
    // @ts-ignore
    global.navigationData = {
      ...global.navigationData,
      goToSafePart: props.goToSafePart,
    };
    navigation.navigate(routes.COUPONS_NAVIGATOR, {
      screen: routes.COUPONS_COUPON,
      params: {
        coupon_id: coupon.coupon_id,
        title: coupon.partner_name,
        coupon_data: coupon,
        is_from_home: true,
      },
    });
  };

  const verifyTransient = () => {
    try {
      var transient_message = '';
      var is_transient = true;
      let conditions = coupon.conditions;
      if (conditions) {
        conditions.map((condition, index) => {
          if (condition.transient !== undefined && !condition.transient) {
            is_transient = false;
            transient_message = condition.transient_message;
          }
        });
      }
      return {is_transient, transient_message};
    } catch (e) {
      return {is_transient: true, transient_message: ''};
    }
  };

  const verifyConditionsSatisfied = () => {
    try {
      var one_condition_not_satisfied = false;
      let conditions = coupon.conditions;
      if (conditions) {
        conditions.map((condition, index) => {
          if (!condition.satisfied !== undefined && !condition.satisfied) {
            one_condition_not_satisfied = true;
          }
        });
      }
      return !one_condition_not_satisfied;
    } catch (e) {
      return false;
    }
  };

  const transient = verifyTransient();
  const conditionsSatisfied = verifyConditionsSatisfied();

  useEffect(() => {
    setFastLoad(true);
  }, []);

  if (!fastLoad) return null;

  const couponBoxContent = () => {
    return (
      <View style={styles.topSubContainer}>
        <View
          style={{
            backgroundColor: conditionsSatisfied
              ? '#65AA20'
              : colors.DARK_ALOE_TF,
            height: 40,
            width: '100%',
            paddingLeft: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <FastImage
            resizeMode={'contain'}
            style={styles.coinIcon}
            source={require('../../../../../../../assets/images/icons/icn_new_tf_coin.png')}
          />
          <Text style={styles.priceText}>
            {coupon.coins_requirement > 0
              ? coupon.coins_requirement
              : strings.OTHER.FREE}
          </Text>
          {conditionsSatisfied && (
            <FastImage
              resizeMode={'contain'}
              style={styles.conditionsSatisfiedNotification}
              source={require('../../../../../../../assets/images/icons/icn_check_coupons_valid.png')}
            />
          )}
        </View>
        <FastImage
          resizeMode={'contain'}
          source={{uri: coupon.partner_image_url}}
          style={[styles.brandImage]}
        />
        <View style={styles.detailView}>
          <View style={{minHeight: 35}}>
            {coupon.seen !== true && (
              <Text style={styles.isNew}>{strings.COUPONS.IS_NEW}</Text>
            )}
            <Text numberOfLines={2} style={styles.detailTitle}>
              {coupon.title}
            </Text>
          </View>
          <Text style={styles.detailDesc}>
            {strings.COUPONS.HOME.GENERABLE_UNTIL}
            {standardFunctions.convert_date_from_rfc_to_string(
              coupon.finish_date,
            )}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.boxContainer,
        index % 2 === 0 ? {marginLeft: 15} : {marginRight: 15},
      ]}>
      <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={constants.ACTIVE_OPACITY}
        onPress={() => {
          onSelectCouponHandler({coupon});
        }}>
        <LinearGradient
          style={[
            styles.container,
            already_opened && transient && transient.is_transient
              ? styles.containerBlue
              : {},
          ]}
          start={{x: 0, y: transient && transient.is_transient ? 0 : 1}}
          end={{x: 0, y: 0}}
          colors={['#c0c0c0', colors.WHITE]}>
          {fastLoad && couponBoxContent()}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    width: '44%',
    height: 225,
    marginTop: 12,
    elevation: 0,
  },
  buttonContainer: {
    width: '100%',
    height: '100%',
    shadowColor: colors.lightGray,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 12,
    elevation: 10,
  },
  container: {
    flex: 1,
    borderRadius: 16,
    marginBottom: 10,
    elevation: 5,
    shadowColor: colors.lightGray,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 3,
    overflow: 'hidden',
  },
  containerBlue: {
    borderWidth: 0,
    borderColor: colors.THEFACULTY, //"#e6e6e6",
  },
  topSubContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  brandImage: {
    width: 65,
    height: 65,
  },
  detailView: {
    width: '100%',
    marginTop: 5,
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  isNew: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    color: colors.ORANGE_TF,
  },
  detailTitle: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 17,
    lineHeight: 20,
    color: colors.DARK_ALOE_TF,
  },
  detailDesc: {
    marginTop: 5,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 13,
    lineHeight: 15,
    color: colors.LIGHT_ALOE_TF,
    textAlign: 'left',
  },
  coinIcon: {
    elevation: 10,
    width: 18,
    height: 18,
    marginRight: 5,
  },
  conditionsSatisfiedNotification: {
    position: 'absolute',
    zIndex: 20,
    elevation: 10,
    width: 15,
    height: 15,
    top: 12,
    right: 12,
    alignSelf: 'flex-end',
  },
  priceText: {
    marginTop: 1,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 16,
    color: colors.WHITE,
  },
});
export default CouponBoxV3;
