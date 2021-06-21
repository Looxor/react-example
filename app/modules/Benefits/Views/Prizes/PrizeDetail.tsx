import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { colors, constants, strings } from "../../../../config";
import styles from "./PrizeDetail.style";
import Prize from "../../_Models/Prize";
import Payment from "../../_Models/Payment";
import { Observable } from "../../../_CommonModels/ViewModelBase";
import FastImage from "react-native-fast-image";
import { Button } from "../../../../components";
import Strings from "../../../../utils/misc/TextComponents";
import InAppActionPopoverView from "../../../../components/InAppActionPopover";
import DenominationItem from "./_Components/DenominationItem";
import PaymentItem from "./_Components/PaymentItem";
import { CallServerPromise } from "../../../../utils/app/CallServer";
import standardFunctions from "../../../../utils/app/StandardFunctions";
import { routes } from "../../../../navigation/rootNavigation/navigation.constants";
import { refreshTotalCoins } from "../../../Home/HomeScreen";
import { markCouponPrizeAsSeen } from "../../_ReduxStore/_actions";
import { useDispatch } from "react-redux";

const PrizeDetail = props => {
  const {
    route: {params = {}},
  } = props;
  var prize: Prize = params['prize'];
  const auto_selected_denomination =
    params['selected_denomination'] !== undefined
      ? params['selected_denomination']
      : -1;
  var {partner_image_url, title, description, denominations} = prize;

  const dispatch = useDispatch();
  const _scrollView: any = useRef();
  const _denomFlatList: any = useRef();
  const [denomIndex, setDenomIndex] = useState(auto_selected_denomination);
  const [paymentsLayoutY, setPaymentsLayoutY] = useState(0);

  const DEFAULT_PAYMENTS: any =
    denominations.find(d => d.priority === denomIndex) || [];

  const [paymentIndex, setPaymentIndex] = useState(-1);
  const [payments, setPayments] = useState(DEFAULT_PAYMENTS);
  const [redeeming, setRedeeming] = useState(false);

  let willUnmount = false;

  const renderDenomination = ({item, index}) => (
    <DenominationItem
      selected={denomIndex === item.priority}
      denomination={item}
      onPressDenomination={() => {
        setDenomIndex(denomIndex === item.priority ? -1 : item.priority);
      }}
    />
  );

  const runCustomAction = (title, description, action_title, action) => {
    title = title !== undefined ? title : '';
    description = description !== undefined ? description : '';
    action_title = action_title !== undefined ? action_title : '';
    action = action !== undefined ? action : '';
    try {
      if (title === '' && description === '') return;
      InAppActionPopoverView().show({
        navigation: props.navigation,
        title,
        description,
        action_title: strings.OTHER.CLOSE,
        actionFunction: () => {},
        negativeActionFunction: () => {
          standardFunctions.add_firebase_event_log(
            'coupons',
            'inapp_action_clicked',
            {action_title: action_title},
          );
          standardFunctions.open_inapp_action(props.navigation, action);
        },
        action,
        negativeLabel: action_title,
        buttonsColumn: true,
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
      // standardFunctions.open_inapp_action(props.navigation, action);
    } catch (e) {}
  };

  const redeemPrize = async () => {
    standardFunctions.add_firebase_event_log(
      'prizes',
      'rdm_prize_btn_clicked',
      {prize_id: prize.prize_id},
    );
    !willUnmount && setRedeeming(true);
    try {
      const currency = payments[paymentIndex].getCurrencyNames()[0];
      const data = {
        denomination_number: denominations.find(
          obj => obj.priority === denomIndex,
        ).denomination_number,
        payment_number: payments[paymentIndex].payment_number,
        prize_id: prize.prize_id,
        ...(currency ? {currency} : {}),
      };

      const request: any = await CallServerPromise.redeem_prize(data);
      if (request.success && request.data && request.data.prize_purchase) {
        if (
          request.data.prize_purchase.verified === false &&
          request.data.prize_purchase.stripe_session_id
        ) {
          props.navigation.navigate(routes.COUPONS_PRIZE_CHECKOUT, {
            sessionId: request.data.prize_purchase.stripe_session_id,
            prize_purchase_id: request.data.prize_purchase.prize_purchase_id,
          });
          await refreshData();
        } else if (request.data.prize_purchase.verified === true) {
          // props.navigation.goBack(null);
          // @ts-ignore
          global.navigationData = {
            prize_purchase: request.data.prize_purchase,
          };
          props.navigation.navigate(routes.COUPONS_PRIZE_PURCHASE_INFO, {
            from_checkout: false,
          });
          await refreshData();
        } else {
          !willUnmount && setRedeeming(false);
          await standardFunctions.show_alert_async(
            strings.OTHER.WARNING,
            strings.COUPONS.PRIZE_DETAIL_SCREEN.ERROR_ON_REDEEM,
          );
          await refreshData();
        }
      } else {
        !willUnmount && setRedeeming(false);
        await standardFunctions.show_alert_async(
          strings.OTHER.WARNING,
          strings.COUPONS.PRIZE_DETAIL_SCREEN.ERROR_ON_REDEEM,
        );
        await refreshData();
        console.log('error on redeeming 1', request);
      }
      !willUnmount && setRedeeming(false);
    } catch (error) {
      await refreshData();
      console.log('error on redeeming 2', error);
      await standardFunctions.show_alert_async(
        strings.APP_NAME,
        strings.COUPONS.PRIZE_DETAIL_SCREEN.ERROR_ON_REDEEM,
      );
      !willUnmount && setRedeeming(false);
    }
  };

  const refreshData = async () => {
    let temp_prizes = await CallServerPromise.get_prizes();
    if (temp_prizes.data) {
      let new_prize_data = temp_prizes.data.find(
        _prize => _prize.prize_id === prize.prize_id,
      );
      if (new_prize_data) {
        try {
          prize = new Prize(new_prize_data);
          denominations = prize.denominations;
          !willUnmount && setPaymentIndex(-1);
          !willUnmount &&
            setPayments(
              denomIndex === -1
                ? []
                : denominations.find(d => d.priority === denomIndex).payments,
            );
        } catch (e) {
          console.log(e);
        }
      }
    }
    !willUnmount && setRedeeming(false);

    await refreshTotalCoins();
    props.navigation.setParams({
      user_total_coins: Observable.getReduxValue('total_coins'),
    });
  };

  const setCouponsAsAlreadyShowed = async () => {
    await dispatch(markCouponPrizeAsSeen(prize.prize_id));
    // await CouponPrizesFilterManager.markCouponPrizeAsSeen(prize_id);
  };
  const onChangeDenomIndex = () => {
    !willUnmount &&
      setPayments(
        denomIndex === -1
          ? []
          : denominations.find(d => d.priority === denomIndex).payments,
      );
    !willUnmount && setPaymentIndex(-1);
    standardFunctions.add_firebase_event_log(
      'prizes',
      'selected_denomination',
      {prize_id: prize.prize_id, denomination: denomIndex},
    );
    setTimeout(() => {
      _scrollView.current.scrollTo({
        y: denomIndex === -1 ? 0 : paymentsLayoutY,
        animated: true,
      });
      let i = denominations.findIndex(obj => obj.priority === denomIndex);
      if (i && i !== -1) {
        _denomFlatList.current.scrollToIndex({index: i, animated: true});
      }
    }, 300);
  };
  useEffect(onChangeDenomIndex, [denomIndex]);

  const componentDidMount = () => {
    setCouponsAsAlreadyShowed();
    return componentWillUnmount;
  };
  const componentWillUnmount = () => {
    willUnmount = true;
  };
  useEffect(componentDidMount, []);
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView ref={_scrollView} style={styles.container}>
        <View style={styles.prizeInfo}>
          <FastImage
            style={styles.prizePartnerImage}
            resizeMode={'contain'}
            source={{uri: partner_image_url}}
          />
          <Text style={styles.prizeTitle}>{title}</Text>
          <Text style={styles.prizeDesc}>{description}</Text>
        </View>
        <FlatList
          ref={_denomFlatList}
          style={styles.denominationsList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.denominationsList2}
          data={denominations}
          keyExtractor={(item, index) => String(index)}
          renderItem={renderDenomination}
        />

        <View
          onLayout={event => {
            const layout = event.nativeEvent.layout;
            setPaymentsLayoutY(layout.y);
          }}
          ref={_scrollView}
          style={styles.payments}>
          <Text style={styles.paymentsTitle}>
            {payments.length > 0 &&
              strings.COUPONS.PRIZE_DETAIL_SCREEN.PAYMENT_CONDITION}
          </Text>
          <View style={styles.paymentsList}>
            {payments.length > 0 &&
              payments.map((payment, index) => (
                <PaymentItem
                  key={String(index)}
                  payment={new Payment(payment)}
                  selected={paymentIndex === index}
                  onPressPaymentItem={() => {
                    setPaymentIndex(index === paymentIndex ? -1 : index);
                    standardFunctions.add_firebase_event_log(
                      'prizes',
                      'selected_payment',
                      {
                        prize_id: prize.prize_id,
                        denomination: denomIndex,
                        payment: index,
                      },
                    );
                  }}
                  onPressPaymentCondition={paymentCondition => {
                    runCustomAction(
                      paymentCondition.title,
                      paymentCondition.description,
                      paymentCondition.action_title,
                      paymentCondition.action,
                    );
                  }}
                />
              ))}
          </View>
        </View>
      </ScrollView>
      {payments.length > 0 && (
        <View style={styles.subContainer2_button}>
          <Button
            onPress={redeemPrize}
            disabled={denomIndex === -1 || paymentIndex === -1 || redeeming}
            style={[
              styles.redeemButton,
              (denomIndex === -1 || paymentIndex === -1 || redeeming) &&
                styles.redeemButtonDisabled,
            ]}>
            {redeeming ? (
              <ActivityIndicator color={colors.WHITE} />
            ) : (
              <Text style={styles.rewardRequestButtonText}>
                {strings.COUPONS.PRIZE_DETAIL_SCREEN.REWARD_REQUEST}
              </Text>
            )}
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
};

const TopBarRightButton = props => {
  return (
    <TouchableOpacity
      style={{flexDirection: 'row'}}
      activeOpacity={constants.ACTIVE_OPACITY}
      onPress={() => {
        standardFunctions.add_firebase_event_log(
          'prizes',
          'wallet_button_clicked',
        );
        props.navigation.navigate(routes.WALLET);
      }}>
      <Image
        resizeMode={'contain'}
        style={{width: 24, height: 24, marginRight: 5}}
        source={require('../../../../../assets/images/icons/icn_new_tf_coin.png')}
      />
      <Text
        style={{
          color: colors.LIGHT_ALOE_TF,
          alignSelf: 'center',
          justifyContent: 'center',
          marginRight: 15,
          fontFamily: constants.DEFAULT_FONT_MEDIUM,
        }}>
        {props.user_total_coins
          ? Strings.currencyFormat(props.user_total_coins)
          : Strings.currencyFormat(Observable.getReduxValue('total_coins'))}
      </Text>
    </TouchableOpacity>
  );
};

PrizeDetail.navigationOptions = ({navigation}) => {
  return {
    title: strings.COUPONS.PRIZE_DETAIL_SCREEN.TITLE,
    headerRight: () => <TopBarRightButton navigation={navigation} />,
  };
};

export default PrizeDetail;
