import React from "react";
import { Text, View } from "react-native";
import { colors, constants, strings } from "../../../../../../config";
import { Button } from "../../../../../../components";
import FastImage from "react-native-fast-image";

const NoCouponsPrizes = props => {
  const {needsButton, style, isCategoryDescription, isCashback} = props;
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}>
      <FastImage
        resizeMode={'contain'}
        style={{width: 50, height: 50}}
        source={require('../../../../../../../assets/images/icons/icn_benefits_bookmark_internal.png')}
      />
      <Text
        style={{
          fontFamily: constants.DEFAULT_FONT,
          fontSize: 18,
          color: colors.COUPONS.BG1,
          lineHeight: 25,
          width: '80%',
          textAlign: 'center',
          marginVertical: 15,
        }}>
        {isCategoryDescription
          ? isCashback
            ? strings.COUPONS.BENEFITS.NO_SPECIAL_ACTIVITY
            : strings.COUPONS.BENEFITS.NO_FILTERED_COUPONS_PRIZES
          : strings.COUPONS.BENEFITS.NO_COUPONS_PRIZES}
      </Text>
      {(needsButton || isCashback) && (
        <Button
          style={{
            backgroundColor: colors.COUPONS.BG1,
            height: 50,
            width: 200,
            borderRadius: 15,
          }}
          textStyle={{
            fontFamily: constants.DEFAULT_FONT_BOLD,
            fontSize: 20,
          }}
          onPress={() => {
            if (props.availableStatusChangeHandler && !isCashback) {
              props.availableStatusChangeHandler(0);
            } else {
              props.setAutoselectedCategory('cashback');
              props.goToSafePart();
              props.resetNavigationParams && props.resetNavigationParams();
            }
          }}>
          {isCashback
            ? strings.COUPONS.BENEFITS.GOTO_SAFE_PART
            : strings.COUPONS.BENEFITS.GOTO_COUPONS_PRIZES}
        </Button>
      )}
    </View>
  );
};

const AlreadyUsedDisplayBar = props => {
  const {style} = props;
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 15,
        ...style,
      }}>
      <View style={{flex: 1, height: 2, backgroundColor: colors.WHITE}} />
      <Text
        style={{
          color: colors.WHITE,
          fontFamily: constants.DEFAULT_FONT_BOLD,
          fontSize: 16,
          marginHorizontal: 10,
        }}>
        {strings.COUPONS.BENEFITS.ALREADY_USED}
      </Text>
      <View style={{flex: 1, height: 2, backgroundColor: colors.WHITE}} />
    </View>
  );
};

export {NoCouponsPrizes, AlreadyUsedDisplayBar};
