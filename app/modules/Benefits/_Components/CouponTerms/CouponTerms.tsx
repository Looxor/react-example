import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, constants, strings } from "../../../../config";
import Strings from "../../../../utils/misc/TextComponents";
import standardFunctions from "../../../../utils/app/StandardFunctions";
import FastImage from "react-native-fast-image";

const CouponTerms = props => {
  const {termsText = '', style} = props;
  const [termsOpened, setTermsOpened] = useState(props.termsOpened);
  return (
    <View style={style}>
      <TouchableOpacity
        style={styles.subContainer_terms}
        activeOpacity={constants.ACTIVE_OPACITY}
        onPress={() => {
          standardFunctions.add_firebase_event_log(
            'coupons',
            'terms_button_clicked',
            {coupon_id: props.coupon_id, opened: !termsOpened},
          );
          setTermsOpened(!termsOpened);
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.termsLabel}>
            {strings.COUPONS.COUPON_SCREEN.CONDITION_LABEL}
          </Text>
          <FastImage
            resizeMode={'contain'}
            style={styles.openTermsIcon}
            source={
              termsOpened
                ? require('../../../../../assets/images/icons/icn_dropdown_blue_close.png')
                : require('../../../../../assets/images/icons/icn_dropdown_blue_open.png')
            }
          />
        </View>
        {termsOpened &&
          Strings.makeBold(termsText, {
            style: styles.termsValue,
            linkStyle: {color: colors.LIGHT_ALOE_TF},
          })}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  subContainer_terms: {
    marginTop: 20,
    marginBottom: 30,
  },
  termsLabel: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    color: colors.LIGHT_ALOE_TF,
    fontSize: 18,
    marginLeft: 20,
  },
  openTermsIcon: {
    width: 15,
    height: 15,
    marginTop: 5,
    marginLeft: 10,
  },
  termsValue: {
    marginTop: 10,
    fontFamily: constants.DEFAULT_FONT,
    color: colors.COUPONS.BG1,
    fontSize: 16,
    marginLeft: 20,
    marginRight: 20,
  },
});

const AVAILABLE_STATUS = 'AVAILABLE_STATUS';
const DEFAULT_AVAILABLE_STATUS = '';

export {AVAILABLE_STATUS, DEFAULT_AVAILABLE_STATUS};
export default CouponTerms;
