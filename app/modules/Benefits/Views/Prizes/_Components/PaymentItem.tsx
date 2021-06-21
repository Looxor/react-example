import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { colors } from "../../../../../config";
import constants from "../../../../../config/constants";

const COIN_ICONS = {
  COIN: {
    ACTIVE: require('../../../../../../assets/images/icons/icn_three_new_tf_coins.png'),
    INACTIVE: require('../../../../../../assets/images/icons/icn_three_new_tf_coins_gray.png'),
  },
  COINEURO: {
    ACTIVE: require('../../../../../../assets/images/icons/icn_new_tf_coin_euro.png'),
    INACTIVE: require('../../../../../../assets/images/icons/icn_new_tf_coin_euro_gray.png'),
  },
  EURO: {
    ACTIVE: require('../../../../../../assets/images/icons/icn_new_tf_euro.png'),
    INACTIVE: require('../../../../../../assets/images/icons/icn_new_tf_euro_gray.png'),
  },
};

const CHECK_ICONS = {
  CHECKED: require('../../../../../../assets/images/icons/icn_checkbox_giftcard_checked.png'),
  UNCHECKED: require('../../../../../../assets/images/icons/icn_checkbox_giftcard_unchecked.png'),
};

const PaymentItem = props => {
  const {payment, onPressPaymentCondition, onPressPaymentItem, selected} =
    props;
  const isAllSatisfied = payment.isAllSatisfied();
  const Component: any = isAllSatisfied ? TouchableOpacity : View;

  const onPressPaymentItemHandler = () => {
    onPressPaymentItem && onPressPaymentItem();
  };
  return (
    <Component
      {...(isAllSatisfied ? {onPress: onPressPaymentItemHandler} : {})}
      style={[
        styles.paymentItem,
        isAllSatisfied ? {} : styles.paymentItemDisabled,
        selected ? styles.paymentItemSelected : {},
      ]}>
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 15,
          paddingBottom: 10,
          alignItems: 'center',
        }}>
        {payment.isCoinAvailable() && (
          <FastImage
            style={{marginLeft: 20, width: 20, height: 20}}
            source={COIN_ICONS.COIN.ACTIVE}
          />
        )}

        {payment.isEuroAvailable() && (
          <FastImage
            style={{marginLeft: 20, width: 20, height: 20}}
            source={COIN_ICONS.EURO.ACTIVE}
          />
        )}

        {payment.isCoinEuroAvailable() && (
          <FastImage
            style={{marginLeft: 20, width: 20, height: 20}}
            source={COIN_ICONS.COINEURO.ACTIVE}
          />
        )}

        <Text style={styles.requirementsLabel}>{payment.title}</Text>
      </View>

      <FastImage
        style={{
          width: 20,
          height: 20,
          position: 'absolute',
          right: 15,
          top: 15,
        }}
        source={selected ? CHECK_ICONS.CHECKED : CHECK_ICONS.UNCHECKED}
      />

      {payment.conditions.length > 0 &&
        payment.conditions.map((condition, index) => (
          <View
            key={String(index)}
            style={[
              {flexDirection: 'column'},
              !condition.satisfied && styles.conditionCheckBoxNotSatisfied,
            ]}>
            <View style={[styles.conditionCheckBox]}>
              <FastImage
                style={[
                  {marginLeft: 15, width: 22, height: 22},
                  !condition.satisfied && {marginTop: 10, marginLeft: 5},
                ]}
                resizeMode={'contain'}
                source={
                  condition.satisfied
                    ? require('../../../../../../assets/images/icons/icn_benefits_requirements_checked.png')
                    : require('../../../../../../assets/images/icons/icn_benefits_requirements_unchecked.png')
                }
              />
              <View
                style={{
                  flexDirection: 'column',
                  width: '88%',
                  justifyContent: 'center',
                }}>
                <Text
                  style={[
                    styles.conditionCheckBoxText,
                    !condition.satisfied && {marginTop: 10},
                  ]}>
                  {condition.message}
                </Text>
              </View>
            </View>
            {!condition.satisfied &&
              condition.title !== undefined &&
              condition.title !== '' && (
                <TouchableOpacity
                  style={{marginLeft: 40, marginBottom: 10}}
                  onPress={() => onPressPaymentCondition(condition)}>
                  <Text
                    style={[
                      styles.conditionCheckBoxAction,
                      !condition.satisfied && {marginTop: -2, marginLeft: 2},
                    ]}>
                    {condition.title !== undefined ? condition.title : ' '}
                  </Text>
                </TouchableOpacity>
              )}
            {!condition.satisfied && (
              <View
                style={{
                  position: 'absolute',
                  right: 0,
                  height: '100%',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  activeOpacity={constants.ACTIVE_OPACITY}
                  style={styles.helperConditionNotSatisfied}
                  onPress={() => onPressPaymentCondition(condition)}>
                  <FastImage
                    style={{width: 25, height: 25}}
                    source={require('../../../../../../assets/images/icons/icn_help_button_bestofs.png')}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
    </Component>
  );
};

const styles = StyleSheet.create({
  paymentItem: {
    marginBottom: 30,
    paddingBottom: 15,
    backgroundColor: colors.WHITE,
    borderWidth: 3,
    borderColor: 'transparent',
    borderRadius: 20,
    shadowColor: colors.DARK_ALOE_TF,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 4,
    elevation: 3,
  },
  paymentItemDisabled: {
    // backgroundColor: colors.LIGHT_SILVER,
    // elevation: 0,
  },
  paymentItemSelected: {
    borderColor: colors.DARK_ALOE_TF,
  },
  requirementsLabel: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    color: colors.DARK_ALOE_TF,
    fontSize: 20,
    marginLeft: 10,
  },
  conditionCheckBox: {
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
    height: 40,
    alignItems: 'center',
  },
  conditionCheckBoxText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    marginLeft: 10,
    color: colors.DARK_ALOE_TF,
  },
  conditionCheckBoxAction: {
    color: colors.LIGHT_ALOE_TF,
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    marginLeft: 13,
    marginTop: 0,
    marginBottom: 5,
  },
  conditionCheckBoxNotSatisfied: {
    marginVertical: 5,
    marginHorizontal: 5,
    borderWidth: 4,
    borderRadius: 16,
    borderColor: 'rgba(36, 91, 98, 0.4)',
  },
  helperConditionNotSatisfied: {
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    right: 10,
  },
});

export default PaymentItem;
