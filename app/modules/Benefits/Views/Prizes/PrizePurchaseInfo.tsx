import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from "react-native";
import { colors, strings } from "../../../../config";
import FastImage from "react-native-fast-image";
import styles from "./PrizePurchaseInfo.style";
import CouponTerms from "../../_Components/CouponTerms";
import CodeView from "../../_Components/CodeView";
import { BackButtonTop } from "../../../../components";
import standardFunctions from "../../../../utils/app/StandardFunctions";
import Strings from "../../../../utils/misc/TextComponents";
import { CallServerPromise } from "../../../../utils/app/CallServer";
import { refreshTotalCoins } from "../../../Home/HomeScreen";
import { Observable } from "../../../_CommonModels/ViewModelBase";
import InAppActionPopoverView from "../../../../components/InAppActionPopover";
import Button from "../../../../components/Button";

const PrizePurchaseInfo = props => {
  // @ts-ignore
  const prize_purchase = global.navigationData['prize_purchase'];
  // @ts-ignore
  const onRefresh = global.navigationData['onRefresh'];
  const {
    prize_id,
    prize_image_url,
    prize_title,
    prize_denomination_name,
    prize_description,
    prize_text,
    usage_finish_date,
    usage_start_date,
    prize_code,
    view,
    nothing_message,
    activation_barcode,
    prize_denomination_payment_link_text,
    is_already_used,
    timeout_text,
    timeout_seconds,
    prize_denomination_payment_is_amilon,
  } = prize_purchase;
  let markedUnused = prize_purchase ? prize_purchase.to_be_used : true;

  const is_barcode_text = prize_code === 'barcode+text';

  const [processingMarkUnused, setProcessingMarkUnused] = useState(false);

  const markAsUsed = async () => {
    try {
      const prize_purchase_id = prize_purchase.prize_purchase_id;
      standardFunctions.add_firebase_event_log(
        'prizes',
        'mark_used_btn_clicked',
        {prize_purchase_id: prize_purchase_id},
      );
      const request: any = await CallServerPromise.mark_prize_as_used(
        prize_purchase_id,
      );
      await Observable.setReduxValue('refresh', +new Date());
      await refreshTotalCoins();
      if (onRefresh) {
        await onRefresh();
      }
      if (!request.success) {
        console.log('error on marking as used', request);
        await standardFunctions.show_alert_async(
          strings.OTHER.WARNING,
          strings.COUPONS.COUPON_SCREEN.ERROR_ON_MARKING_USED,
        );
      }
    } catch (error) {
      console.log('error on marking as used 2', error);
      await standardFunctions.show_alert_async(
        strings.OTHER.WARNING,
        strings.COUPONS.COUPON_SCREEN.ERROR_ON_MARKING_USED,
      );
    }
  };

  const markAsUnused = async () => {
    setProcessingMarkUnused(true);
    try {
      const prize_purchase_id = prize_purchase.prize_purchase_id;
      standardFunctions.add_firebase_event_log(
        'prizes',
        'mark_unused_btn_clicked',
        {prize_purchase_id: prize_purchase_id},
      );
      const request: any = await CallServerPromise.mark_prize_as_unused(
        prize_purchase_id,
      );
      if (!request.success) {
        console.log('error on marking as unused', request);
        await standardFunctions.show_alert_async(
          strings.OTHER.WARNING,
          strings.COUPONS.COUPON_SCREEN.ERROR_ON_MARKING_USED,
        );
      }

      await Observable.setReduxValue('refresh', +new Date());
      await refreshTotalCoins();
      if (onRefresh) {
        await onRefresh();
      }
      setProcessingMarkUnused(false);
      markedUnused = true;
      props.navigation.goBack(null);
    } catch (error) {
      console.log('error on marking as unused 2', error);
      await standardFunctions.show_alert_async(
        strings.OTHER.WARNING,
        strings.COUPONS.COUPON_SCREEN.ERROR_ON_MARKING_USED,
      );
      setProcessingMarkUnused(false);
    }
  };

  const handleBackButtonClick = async () => {
    const goBackScreen = () => {
      // do nothing for unmount's case
    };

    if (prize_purchase.to_be_used) {
      InAppActionPopoverView().show({
        navigation: props.navigation,
        title: strings.COUPONS.PRIZE_PURCHASE_SCREEN.QUESTION_USED_PRIZES,
        description:
          strings.COUPONS.PRIZE_PURCHASE_SCREEN.QUESTION_USED_PRIZES_DESC,
        action_title: strings.COUPONS.COUPON_SCREEN.POPUP_ANSWER_NEGATIVE,
        action: '',
        actionFunction: goBackScreen,
        buttonsColumn: true,
        negativeAction: markAsUsed,
        negativeLabel:
          strings.COUPONS.COUPON_SCREEN.POPUP_ANSWER_POSITIVE_FOR_PRIZES,
        icon: undefined,
        smallIcon: require('../../../../../assets/images/icons/icn_giftcard_small.png'),
        extraTitleStyle: {color: colors.BESTOF2.BG1},
        extraDescriptionStyle: {color: colors.BESTOF2.BG1, lineHeight: 22},
        extraMainButtonStyle: {
          backgroundColor: colors.WHITE,
          width: '92%',
          height: 48,
          borderRadius: 15,
          alignSelf: 'center',
          shadowColor: colors.lightGray,
          shadowOpacity: 0.4,
          shadowOffset: {width: 0, height: 0},
          shadowRadius: 5,
          elevation: 2,
        },
        extraNegativeButtonStyle: {
          backgroundColor: colors.BESTOF2.BG1,
          width: '92%',
          height: 48,
          borderRadius: 15,
          alignSelf: 'center',
          shadowColor: colors.lightGray,
          shadowOpacity: 0.4,
          shadowOffset: {width: 0, height: 0},
          shadowRadius: 5,
          elevation: 2,
        },
        extraMainButtonTextStyle: {color: colors.BESTOF2.BG1},
        extraNegativeButtonTextStyle: {color: colors.WHITE},
      });
    }
    return true;
  };

  const componentDidMount = () => {
    return componentWillUnmount;
  };
  const componentWillUnmount = () => {
    markedUnused && handleBackButtonClick();
  };

  useEffect(componentDidMount, []);

  const is_expired = +new Date(usage_finish_date) < +new Date();
  var is_almost_expired = false;
  try {
    // @ts-ignore
    var days_remaining = Math.round(
      Math.abs(
        (+new Date() - +new Date(usage_finish_date)) / (24 * 60 * 60 * 1000),
      ),
    );
    // @ts-ignore
    var total_days = Math.round(
      Math.abs(
        (+new Date(usage_finish_date) - +new Date(usage_start_date)) /
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

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}>
        <FastImage
          resizeMode={'contain'}
          style={styles.partnerImage}
          source={{uri: prize_image_url}}
        />
        <View
          style={[styles.duration, {backgroundColor: getValidLabelColor()}]}>
          <FastImage
            style={styles.durationIcon}
            resizeMode={'contain'}
            source={require('../../../../../assets/images/icons/icn_added_white.png')}
          />
          <Text style={styles.durationText}>
            {!prize_denomination_payment_is_amilon &&
              Strings.makeMedium(
                strings.COUPONS.PRIZE_PURCHASE_SCREEN.VALID_DATE.replace(
                  '{VALID_FINISH_DATE}',
                  '[bold]' +
                    standardFunctions.convert_date_from_rfc_to_string(
                      usage_finish_date,
                      true,
                    ) +
                    '[/bold]',
                ),
              )}
            {prize_denomination_payment_is_amilon &&
              Strings.makeMedium(
                strings.COUPONS.PRIZE_PURCHASE_SCREEN.REDEEMABLE_DATE.replace(
                  '{VALID_FINISH_DATE}',
                  '[bold]' +
                    standardFunctions.convert_date_from_rfc_to_string(
                      usage_finish_date,
                      true,
                    ) +
                    '[/bold]',
                ),
              )}
          </Text>
        </View>
        <View style={styles.codeViewContainer}>
          <CodeView
            title={prize_title + ' ' + prize_denomination_name}
            type={view}
            nothing_message={nothing_message}
            code={prize_code}
            activation_barcode={activation_barcode}
            is_barcode_text={is_barcode_text}
            link_text={prize_denomination_payment_link_text}
            is_already_used={is_already_used}
            timeout_text={timeout_text}
            timeout_seconds={timeout_seconds}
            code_id={prize_id}
          />
        </View>
        <Text style={styles.prizeTitle}>
          {prize_title + ' ' + prize_denomination_name}
        </Text>
        <Text style={styles.prizeDesc}>{prize_description}</Text>
        <CouponTerms style={styles.terms} termsText={prize_text} />
        {markedUnused === false && (
          <View style={styles.subContainer2_button}>
            <Button
              disabled={false}
              onPress={markAsUnused}
              style={styles.redeemButton}
              textStyle={styles.redeemButtonText}>
              {processingMarkUnused ? (
                <ActivityIndicator color={colors.WHITE} />
              ) : (
                strings.COUPONS.COUPON_SCREEN.MARK_UNUSED
              )}
            </Button>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

PrizePurchaseInfo.navigationOptions = props => {
  const {
    route: {params = {}},
  } = props;
  const navigation = props.navigation;
  const from_checkout = params['from_checkout'];
  const goBackToHome = () => {
    navigation.popToTop();
    navigation.goBack(null);
  };
  if (from_checkout === true) {
    return {
      title: strings.COUPONS.PRIZE_PURCHASE_SCREEN.TITLE,
      headerLeft: () => <BackButtonTop onBackPress={goBackToHome} />,
    };
  } else {
    return {
      title: strings.COUPONS.PRIZE_PURCHASE_SCREEN.TITLE,
    };
  }
};

export default PrizePurchaseInfo;
