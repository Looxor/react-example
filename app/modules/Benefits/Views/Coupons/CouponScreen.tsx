import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Popover } from "teaset";
import FastImage from "react-native-fast-image";

import Button from "../../../../components/Button";
import styles from "./CouponScreen.style";
import { colors, constants, strings } from "../../../../config";
import { routes } from "../../../../navigation/rootNavigation/navigation.constants";
import Coupon, { COUPON_MODE } from "../../_Models/Coupon";

import CodeView from "../../_Components/CodeView";

import {
  loadCouponList,
  loadObtainedCouponList,
  markCouponPrizeAsSeen,
  REDEEM_COUPON,
  redeemCoupon
} from "../../_ReduxStore/_actions";
import standardFunctions from "../../../../utils/app/StandardFunctions";
import Strings from "../../../../utils/misc/TextComponents";
import { CallServerPromise } from "../../../../utils/app/CallServer";
import LinearGradient from "react-native-linear-gradient";
import InAppActionPopoverView from "../../../../components/InAppActionPopover";
import { refreshTotalCoins } from "../../../Home/HomeScreen";
import { Observable } from "../../../_CommonModels/ViewModelBase";
import CouponTerms from "../../_Components/CouponTerms";
import { UserData } from "../../../../config/constants";
import GeneratedCouponPopover from "../../_Components/GeneratedCouponPopover";
import { BackButtonTop } from "../../../../components";
import { stackConfig } from "../../../../navigation/mainNavigation/MainTabNavigator";

const CouponScreen = props => {
  const _scrollView = useRef();
  const [dispData, setDispData] = useState({
    coupon: null,
    loading: false,
    viewName: null,
    isFree: false,
    isAlreadyUsed: false,
    isValid: false,
  });
  const [processingMarkUnused, setProcessingMarkUnused] = useState(false);
  const [conditionsNotMet, setConditionsNotMet] = useState([]);
  const [firstConditionNotMetY, setFirstConditionNotMetY] = useState(0);
  const [almostGenerated, setAlmostGenerated] = useState(false);
  const [popoverVisibility, setPopoverVisibility] = useState({
    cashback: false,
    multiple: false,
    check: false,
  });
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const couponState = useSelector((state: any) => state.Coupon);

  // const coupon_id = props.navigation.getParam('coupon_id');
  // const coupon_data = props.navigation.getParam('coupon_data');
  // const is_from_home = props.navigation.getParam('is_from_home');

  // console.log('props', props);
  const {
    route: {params = {}},
  } = props;
  const {coupon_id, coupon_data, is_from_home} = params;

  // @ts-ignore
  const goToSafePart =
    // @ts-ignore
    global.navigationData && global.navigationData['goToSafePart'];

  const reedemCouponHandler = async () => {
    var condNotMet = [];
    if (dispData.coupon.getConditions().length > 0) {
      dispData.coupon.getConditions().map((condition, index) => {
        if (!condition.satisfied) {
          condNotMet.push(index);
        }
      });
    }

    if (condNotMet.length > 0) {
      standardFunctions.add_firebase_event_log(
        'coupons',
        'rdm_coupon_btn_clicked',
        {conditions_satisfied: false},
      );
      try {
        if (_scrollView && _scrollView.current) {
          // @ts-ignore
          _scrollView.current.scrollTo({
            y: firstConditionNotMetY - 20,
            animated: true,
          });
        }
      } catch (e) {}
      setConditionsNotMet(condNotMet);
      return;
    }

    standardFunctions.add_firebase_event_log(
      'coupons',
      'rdm_coupon_btn_clicked',
      {conditions_satisfied: true},
    );
    setDispData({...dispData, loading: true});
    await dispatch(redeemCoupon(dispData.coupon.coupon_id, dispData.coupon));
    await dispatch(loadCouponList());
    // await dispatch(loadObtainedCouponList());
    try {
      if (_scrollView && _scrollView.current) {
        // @ts-ignore
        _scrollView.current.scrollTo({y: 0, animated: true});
      }
    } catch (e) {}
    await refreshTotalCoins();
    navigation.setParams({
      user_total_coins: Observable.getReduxValue('total_coins'),
    });

    await Observable.setReduxValue(
      'user_' + UserData.getUserData().user_id + '_generated_coupons',
      coupon_id,
    );
  };

  const markAsUsed = async () => {
    standardFunctions.add_firebase_event_log(
      'coupons',
      'mark_used_btn_clicked',
      {coupon_id: coupon_id},
    );
    try {
      const request: any = await CallServerPromise.mark_coupon_as_used(
        coupon_id,
      );
      await dispatch(loadCouponList());
      await dispatch(loadObtainedCouponList());
      await refreshTotalCoins();
      if (!request.success) {
        console.log('error on marking as used', request);
        await standardFunctions.show_alert_async(
          strings.OTHER.WARNING,
          strings.COUPONS.COUPON_SCREEN.ERROR_ON_MARKING_USED,
        );
      }
      props.navigation.goBack(0);
    } catch (error) {
      console.log('error on marking as used 2', error);
      await standardFunctions.show_alert_async(
        strings.OTHER.WARNING,
        strings.COUPONS.COUPON_SCREEN.ERROR_ON_MARKING_USED,
      );
      props.navigation.goBack(0);
    }
  };

  const markAsUnused = async () => {
    standardFunctions.add_firebase_event_log(
      'coupons',
      'mark_unused_btn_clicked',
      {coupon_id: coupon_id},
    );
    setProcessingMarkUnused(true);
    try {
      const request: any = await CallServerPromise.mark_coupon_as_unused(
        coupon_id,
      );
      if (!request.success) {
        await standardFunctions.show_alert_async(
          strings.OTHER.WARNING,
          strings.COUPONS.COUPON_SCREEN.ERROR_ON_MARKING_USED,
        );
      }
      await dispatch(loadCouponList());
      await dispatch(loadObtainedCouponList());
      await refreshTotalCoins();
      setProcessingMarkUnused(false);
      props.navigation.goBack(0);
    } catch (error) {
      await standardFunctions.show_alert_async(
        strings.OTHER.WARNING,
        strings.COUPONS.COUPON_SCREEN.ERROR_ON_MARKING_USED,
      );
      setProcessingMarkUnused(false);
    }
  };

  const handleBackButtonClick = async () => {
    const goBackScreen = () => {
      props.navigation.goBack(0);
    };

    if (!is_from_home && !coupon_data.data.marked_used) {
      InAppActionPopoverView().show({
        navigation: props.navigation,
        title: coupon_data.data.is_multiple_use
          ? strings.COUPONS.COUPON_SCREEN.QUESTION_USED_COUPONS_MULTIPLE
          : coupon_data.data.is_cashback
          ? strings.COUPONS.COUPON_SCREEN.QUESTION_USED_COUPONS_CASHBACK
          : strings.COUPONS.COUPON_SCREEN.QUESTION_USED_COUPONS,
        description: coupon_data.data.is_multiple_use
          ? strings.COUPONS.COUPON_SCREEN.QUESTION_USED_COUPONS_DESC_MULTIPLE
          : coupon_data.data.is_cashback
          ? strings.COUPONS.COUPON_SCREEN.QUESTION_USED_COUPONS_DESC_CASHBACK
          : strings.COUPONS.COUPON_SCREEN.QUESTION_USED_COUPONS_DESC,
        action_title: strings.COUPONS.COUPON_SCREEN.POPUP_ANSWER_NEGATIVE,
        action: '',
        actionFunction: goBackScreen,
        buttonsColumn: true,
        negativeAction: markAsUsed,
        negativeLabel: coupon_data.data.is_multiple_use
          ? strings.COUPONS.COUPON_SCREEN.POPUP_ANSWER_POSITIVE_MULTIPLE
          : coupon_data.data.is_cashback
          ? strings.COUPONS.COUPON_SCREEN.POPUP_ANSWER_POSITIVE_CASHBACK
          : strings.COUPONS.COUPON_SCREEN.POPUP_ANSWER_POSITIVE,
        icon: undefined,
        smallIcon: require('../../../../../assets/images/icons/icn_benefits_bookmark_internal.png'),
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

  const findCouponDataByCouponId = coupon_id => {
    var t_coupon = undefined;
    const coupons_array = couponState.coupons;
    if (coupons_array) {
      t_coupon =
        coupons_array.find(coupon => coupon.coupon_id === coupon_id) ||
        undefined;
    }

    if (t_coupon) {
      return t_coupon;
    } else {
      const obtained_coupons_array = couponState.obtained_coupons;
      if (obtained_coupons_array) {
        t_coupon =
          obtained_coupons_array.find(
            coupon => coupon.coupon_id === coupon_id,
          ) || coupon_data;
      }

      if (t_coupon) {
        t_coupon.is_already_used = true;
        t_coupon.is_valid = false;
      }
      return t_coupon;
    }
  };

  const loadCouponInfo = async () => {
    const newCouponData = couponState.newCouponData;
    const foundCouponData = findCouponDataByCouponId(coupon_id);

    if (newCouponData && newCouponData.coupon_id === coupon_id) {
      setAlmostGenerated(true);
      loadCouponData(newCouponData);
    } else if (foundCouponData && !almostGenerated) {
      loadCouponData(foundCouponData);
    } else if (!almostGenerated) {
      try {
        const requestCoupons = await CallServerPromise.get_coupons();
        if (requestCoupons.success) {
          const foundUsedCouponData = requestCoupons.data.find(
            coupon => coupon.coupon_id === coupon_id,
          );

          if (foundUsedCouponData) {
            loadCouponData(foundUsedCouponData);
          } else {
            const requestUsedCoupons1 =
              await CallServerPromise.get_used_coupons();
            if (requestUsedCoupons1.success) {
              const foundUsedCouponData1 = requestUsedCoupons1.data.find(
                coupon => coupon.coupon_id === coupon_id,
              );

              if (foundUsedCouponData1) {
                foundUsedCouponData1.is_already_used = true;
                foundUsedCouponData1.is_marked_as_use =
                  !foundUsedCouponData1.to_be_used;
                loadCouponData(foundUsedCouponData1);
              } else {
                props.navigation.goBack(0);
              }
            } else {
              props.navigation.goBack(0);
            }
          }
        } else {
          props.navigation.goBack(0);
        }
      } catch (error) {
        props.navigation.goBack(0);
      }
    }
  };

  const setCouponsAsAlreadyShowed = () => {
    dispatch(markCouponPrizeAsSeen(coupon_id));
    // await CouponPrizesFilterManager.markCouponPrizeAsSeen(coupon_id);
  };

  const loadCouponData = _coupon_data => {
    setCouponsAsAlreadyShowed();

    const _coupon = new Coupon(_coupon_data);
    const viewName = _coupon.getViewName();
    const isFree = _coupon.isFree();
    const isAlreadyUsed = _coupon.isAlreadyUsed();
    const isValid = _coupon.isValid();

    const loading = couponState.status === REDEEM_COUPON.DOING;
    setDispData({
      coupon: _coupon,
      loading,
      viewName,
      isFree,
      isAlreadyUsed,
      isValid,
    });

    try {
      props.navigation.setParams({title: _coupon.partner_name});
    } catch (e) {}
  };

  let willUnmount = false;
  const componentDidMount = () => {
    Observable.setReduxValue(
      'user_' + UserData.getUserData().user_id + '_generated_coupons',
      '',
    );
    props.navigation.setParams({
      user_total_coins: Observable.getReduxValue('total_coins'),
    });
    // const coupon_mode = props.navigation.getParam('coupon_mode');
    const {
      route: {params},
    } = props;
    const {coupon_mode} = params;
    if (
      coupon_mode === COUPON_MODE.USED ||
      coupon_mode === COUPON_MODE.UNUSED
    ) {
      // useBackButton(handleBackButtonClick, props.navigation);
    }

    if (!willUnmount) {
      loadCouponInfo();
    }

    const componentWillUnmount = () => {
      const goBackScreen = () => {
        // do nothing for unmount's case
      };

      let c_temp = new Coupon(coupon_data);
      if (c_temp) {
        var generated_coupons = Observable.getReduxValue(
          'user_' + UserData.getUserData().user_id + '_generated_coupons',
        );
        var generated_coupons_showed = Observable.getReduxValue(
          'user_' +
            UserData.getUserData().user_id +
            '_generated_coupons_showed',
        );
        if (generated_coupons === undefined) {
          generated_coupons = '';
        }
        if (generated_coupons_showed === undefined) {
          generated_coupons_showed = [];
        }

        let is_to_show_new_generated_popup =
          generated_coupons === c_temp.coupon_id;
        Observable.setReduxValue(
          'user_' + UserData.getUserData().user_id + '_generated_coupons',
          '',
        );

        if (
          generated_coupons !== '' &&
          is_to_show_new_generated_popup &&
          generated_coupons_showed.length <= 2 &&
          !generated_coupons_showed.includes(c_temp.coupon_id)
        ) {
          GeneratedCouponPopover().show({
            navigation: props.navigation,
            goToSafePart: () => {
              goToSafePart && goToSafePart();
            },
          });

          if (!generated_coupons_showed.includes(c_temp.coupon_id)) {
            generated_coupons_showed.push(generated_coupons);
          }

          Observable.setReduxValue(
            'user_' +
              UserData.getUserData().user_id +
              '_generated_coupons_showed',
            generated_coupons_showed,
          );
        }

        if (
          (!c_temp.marked_used && c_temp.isAlreadyUsed()) ||
          (coupon_data && !coupon_data.marked_used && coupon_data.coupon_code)
        ) {
          handleBackButtonClick();
          return;
        }
      }
      willUnmount = true;
    };
    return componentWillUnmount;
  };

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

  const loadHelperPopup = type => {
    standardFunctions.add_firebase_event_log(
      'coupons',
      'helper_popup_clicked',
      {type: type, coupon_id: coupon_id},
    );
    if (type === 'multiple' && !popoverVisibility.check) {
      setPopoverVisibility({
        multiple: !popoverVisibility.multiple,
        cashback: popoverVisibility.cashback,
        check: false,
      });
    } else if (type === 'cashback' && !popoverVisibility.check) {
      setPopoverVisibility({
        multiple: popoverVisibility.multiple,
        cashback: !popoverVisibility.cashback,
        check: false,
      });
    }
  };

  const closePopover = () => {
    if (popoverVisibility.multiple || popoverVisibility.cashback) {
      setPopoverVisibility({multiple: false, cashback: false, check: true});
    } else {
      setPopoverVisibility({multiple: false, cashback: false, check: false});
    }
  };

  useEffect(() => {
    const _coupon = new Coupon({
      ...dispData.coupon,
      ...couponState.newCouponData,
    });
    // console.log('couponState.newCouponData _coupon', _coupon);
    const viewName = _coupon.getViewName();
    const isFree = _coupon.isFree();
    const isAlreadyUsed = _coupon.isAlreadyUsed();
    const isValid = _coupon.isValid();

    const loading = couponState.status === REDEEM_COUPON.DOING;
    setDispData({
      coupon: _coupon,
      loading,
      viewName,
      isFree,
      isAlreadyUsed,
      isValid,
    });
  }, [couponState.newCouponData]);

  useEffect(() => {
    loadCouponInfo();
  }, [couponState.coupons]);
  useEffect(componentDidMount, []);

  const is_expired =
    dispData && dispData.coupon
      ? +new Date(dispData.coupon.usage_finish_date) < +new Date()
      : false;
  var is_almost_expired = false;
  try {
    if (dispData && dispData.coupon) {
      // @ts-ignore
      var days_remaining = Math.round(
        Math.abs(
          (+new Date() - +new Date(dispData.coupon.usage_finish_date)) /
            (24 * 60 * 60 * 1000),
        ),
      );
      // @ts-ignore
      var total_days = Math.round(
        Math.abs(
          (+new Date(dispData.coupon.usage_finish_date) -
            +new Date(dispData.coupon.usage_start_date)) /
            (24 * 60 * 60 * 1000),
        ),
      );
      is_almost_expired = days_remaining <= total_days / 10;
    }
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

  const PopoverItem2 = props => {
    return (
      <Popover
        style={styles.popoverContainer}
        arrow="topLeft"
        paddingCorner={55}>
        {Strings.makeBold(props.text, {style: styles.popoverTextStyle})}
      </Popover>
    );
  };
  return dispData.coupon !== null ? (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.WHITE,
      }}>
      <ScrollView
        ref={_scrollView}
        onTouchStart={closePopover}
        contentContainerStyle={[
          styles.container,
          {
            backgroundColor: colors.WHITE,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.subContainer1,
            {
              backgroundColor: dispData.isAlreadyUsed
                ? colors.WHITE
                : colors.WHITE,
            },
            dispData.coupon.marked_used === true && styles.subContainer1_v2,
          ]}>
          <View
            style={[
              styles.imageContainer,
              (dispData.coupon.data
                ? dispData.coupon.data.marked_used
                : dispData.coupon.marked_used) === true &&
                styles.imageContainer_v2,
              !dispData.isAlreadyUsed && {
                height: Dimensions.get('window').width * (9 / 16),
              },
              dispData.isValid || dispData.isAlreadyUsed
                ? {}
                : {width: Dimensions.get('window').width - 1},
            ]}>
            <FastImage
              resizeMode={'contain'}
              source={{uri: dispData.coupon.d('image_url')}}
              style={styles.mainImage}
            />
            {dispData.isAlreadyUsed && (
              <LinearGradient
                style={[
                  styles.pointPinBox,
                  (dispData.coupon.data
                    ? dispData.coupon.data.marked_used
                    : dispData.coupon.marked_used) === true &&
                    styles.pointPinBox_v2,
                ]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[getValidLabelColor(), getValidLabelColor()]}>
                <FastImage
                  resizeMode={'contain'}
                  style={styles.pointPinBoxIconUsed}
                  source={require('../../../../../assets/images/icons/icn_added_white.png')}
                />
                <Text
                  style={[
                    styles.pointPinBoxText1,
                    {marginLeft: 23, paddingRight: 15},
                  ]}>
                  {(dispData.coupon && dispData.coupon.data
                    ? dispData.coupon.data.marked_used
                    : dispData.coupon.marked_used) === true &&
                    coupon_data &&
                    !coupon_data.data.is_cashback &&
                    coupon_data &&
                    !coupon_data.data.is_multiple_use &&
                    Strings.makeBold(
                      strings.COUPONS.COUPON_SCREEN.NORMAL_COUPON_LABEL_VALID +
                        '\n',
                    )}
                  {(dispData.coupon && dispData.coupon.data
                    ? dispData.coupon.data.marked_used
                    : dispData.coupon.marked_used) === true &&
                    coupon_data &&
                    coupon_data.data.is_multiple_use &&
                    Strings.makeBold(
                      strings.COUPONS.COUPON_SCREEN.MARKED_USED_LABEL_VALID +
                        '\n',
                    )}
                  {(dispData.coupon && dispData.coupon.data
                    ? dispData.coupon.data.marked_used
                    : dispData.coupon.marked_used) === true &&
                    coupon_data &&
                    coupon_data.data.is_cashback &&
                    Strings.makeBold(
                      strings.COUPONS.COUPON_SCREEN.CASHBACK_LABEL_VALID + '\n',
                    )}
                  {Strings.makeMedium(
                    strings.COUPONS.COUPON_SCREEN.VALID_FROM_TO.replace(
                      '{START_DATE}',
                      standardFunctions.convert_date_from_rfc_to_small_string(
                        dispData.coupon.d('usage_start_date'),
                        true,
                      ),
                    ).replace(
                      '{FINISH_DATE}',
                      standardFunctions.convert_date_from_rfc_to_small_string(
                        dispData.coupon.d('usage_finish_date'),
                        true,
                      ),
                    ),
                  )}
                </Text>
              </LinearGradient>
            )}
          </View>
          {dispData.isAlreadyUsed && (
            <View style={styles.subContainer2}>
              <CodeView
                title={dispData.coupon.d('title')}
                type={dispData.viewName}
                nothing_message={dispData.coupon.d('nothing_message')}
                code={dispData.coupon.d('coupon_code')}
                activation_barcode={dispData.coupon.d('activation_barcode')}
                is_barcode_text={dispData.viewName === 'barcode+text'}
                link_text={dispData.coupon.d('link_text')}
                is_already_used={dispData.coupon.d('is_already_used')}
                timeout_seconds={dispData.coupon.d('timeout_seconds')}
                code_id={dispData.coupon.d('coupon_id')}
                timeout_text={
                  dispData.coupon.d('timeout_text') ||
                  strings.COUPONS.VIEW.TIMEOUT_POPUP_MESSAGE1_DEFAULT.replace(
                    '{PARTNER_NAME}',
                    dispData.coupon.d('partner_name'),
                  )
                }
              />
            </View>
          )}
          <View style={styles.subContainer1_1}>
            {((coupon_data && coupon_data.is_cashback) ||
              dispData.coupon.d('is_cashback')) && (
              <TouchableOpacity
                style={styles.ribbonImageContainer}
                activeOpacity={1}
                onPress={() => {
                  loadHelperPopup('cashback');
                }}>
                {popoverVisibility.cashback && (
                  <PopoverItem2
                    type={'cashback'}
                    text={strings.COUPONS.COUPON_SCREEN.CASHBACK_INFO_TOOLTIP}
                  />
                )}
                <FastImage
                  resizeMode={'contain'}
                  style={styles.ribbonImage}
                  source={require('../../../../../assets/images/icons/icn_cashback_small.png')}
                />
                <Text style={styles.ribbonLabel}>
                  {strings.COUPONS.HOME.CASHBACK_RIBBON_LABEL}
                </Text>
              </TouchableOpacity>
            )}

            {((coupon_data && coupon_data.is_multiple_use) ||
              dispData.coupon.d('is_multiple_use')) && (
              <TouchableOpacity
                style={styles.ribbonImageContainer}
                activeOpacity={1}
                onPress={() => {
                  loadHelperPopup('multiple');
                }}>
                {popoverVisibility.multiple && (
                  <PopoverItem2
                    type={'cashback'}
                    text={strings.COUPONS.COUPON_SCREEN.MULTIPLE_INFO_TOOLTIP}
                  />
                )}
                <FastImage
                  resizeMode={'contain'}
                  style={styles.ribbonImage}
                  source={require('../../../../../assets/images/icons/icn_multiple_small.png')}
                />
                <Text style={styles.ribbonLabel}>
                  {strings.COUPONS.HOME.MULTIPLE_USE_RIBBON_LABEL}
                </Text>
              </TouchableOpacity>
            )}
            <Text style={styles.title}>{dispData.coupon.d('title')}</Text>
            {!(
              dispData.coupon.d('description') !== undefined ||
              (dispData.coupon.data &&
                dispData.coupon.data.data &&
                dispData.coupon.data.data.description)
            ) ? (
              <View />
            ) : (
              <>
                {Strings.makeBold(
                  dispData.coupon.d('description')
                    ? dispData.coupon.d('description')
                    : dispData.coupon.data.data.description,
                  {
                    style: styles.description,
                    linkStyle: {color: colors.LIGHT_ALOE_TF},
                  },
                )}
                {!dispData.isAlreadyUsed &&
                dispData.coupon.d('limit') !== 'unlimited' &&
                dispData.coupon.d('count') <= 100 &&
                dispData.coupon.d('count') !== 0 &&
                dispData.coupon.d('count') !== undefined ? (
                  <Text style={[styles.description, {fontWeight: 'bold'}]}>
                    {dispData.coupon.d('count') != 1
                      ? strings.COUPONS.HOME.REMAINING_CAPTION1 +
                        ' ' +
                        dispData.coupon.d('count') +
                        ' ' +
                        strings.COUPONS.HOME.REMAINING_CAPTION2
                      : strings.COUPONS.HOME.REMAINING_CAPTION2_ONE}
                  </Text>
                ) : (
                  <View />
                )}
              </>
            )}
          </View>
          {!dispData.isAlreadyUsed && (
            <View
              style={styles.subContainer_requirements}
              onLayout={event => {
                const layout = event.nativeEvent.layout;
                setFirstConditionNotMetY(layout.y);
              }}>
              <Text style={styles.requirementsLabel}>
                {strings.COUPONS.COUPON_SCREEN.REQUIREMENTS_LABEL}
              </Text>
              {dispData.coupon.getConditions().length > 0 &&
                dispData.coupon.getConditions().map((condition, index) => (
                  <View
                    key={String(index)}
                    style={[
                      styles.conditionCheckBox,
                      conditionsNotMet.includes(index) &&
                        styles.conditionCheckBoxHighlight,
                      !condition.satisfied &&
                        styles.conditionCheckBoxNotSatisfied,
                      !condition.satisfied &&
                      condition.title !== undefined &&
                      condition.title !== ''
                        ? {minHeight: 60}
                        : {minHeight: 46},
                    ]}>
                    <FastImage
                      resizeMode={'contain'}
                      style={[
                        {
                          height: 18,
                          width: 18,
                          marginTop: 5,
                        },
                        !condition.satisfied &&
                          condition.title !== undefined &&
                          condition.title !== '' && {marginTop: 6},
                      ]}
                      source={
                        condition.satisfied
                          ? require('../../../../../assets/images/icons/icn_benefits_requirements_checked.png')
                          : require('../../../../../assets/images/icons/icn_benefits_requirements_unchecked.png')
                      }
                    />
                    <View
                      style={{
                        flexDirection: 'column',
                        width: '88%',
                        justifyContent: 'center',
                      }}>
                      <Text style={styles.conditionCheckBoxText}>
                        {condition.message}
                      </Text>
                      {!condition.satisfied &&
                        condition.title !== undefined &&
                        condition.title !== '' && (
                          <TouchableOpacity
                            style={{}}
                            activeOpacity={constants.ACTIVE_OPACITY}
                            onPress={() =>
                              runCustomAction(
                                condition.title,
                                condition.description,
                                condition.action_title,
                                condition.action,
                              )
                            }>
                            <Text style={styles.conditionCheckBoxAction}>
                              {condition.title !== undefined
                                ? condition.title
                                : ' '}
                            </Text>
                          </TouchableOpacity>
                        )}
                    </View>
                    {!condition.satisfied && (
                      <TouchableOpacity
                        activeOpacity={constants.ACTIVE_OPACITY}
                        style={styles.helperConditionNotSatisfied}
                        onPress={() =>
                          runCustomAction(
                            condition.title,
                            condition.description,
                            condition.action_title,
                            condition.action,
                          )
                        }>
                        <FastImage
                          style={{width: 25, height: 25}}
                          source={require('../../../../../assets/images/icons/icn_help_button_bestofs.png')}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
            </View>
          )}
          <CouponTerms
            coupon_id={coupon_id}
            termsOpened={dispData.isAlreadyUsed}
            termsText={dispData.coupon.d('text')}
          />
        </View>
      </ScrollView>
      {!dispData.isAlreadyUsed && (
        <View style={styles.subContainer2_button}>
          <Button
            disabled={false}
            onPress={reedemCouponHandler}
            style={
              dispData.loading || !dispData.isValid
                ? styles.redeemButtonDisabled
                : styles.redeemButton
            }
            textStyle={styles.redeemButtonText}>
            {dispData.loading ? (
              <ActivityIndicator color={colors.WHITE} />
            ) : (
              strings.COUPONS.COUPON_SCREEN.REDEEM_BUTTON
            )}
          </Button>
        </View>
      )}
      {(dispData.coupon.data
        ? dispData.coupon.data.marked_used
        : dispData.coupon.marked_used) === true && (
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
    </SafeAreaView>
  ) : (
    <View
      style={{
        backgroundColor: colors.DEFAULT_BACKGROUND,
        flex: 1,
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="small" />
    </View>
  );
};

const TopBarRightButton = props => {
  return (
    <TouchableOpacity
      style={{flexDirection: 'row', marginTop: 0}}
      activeOpacity={constants.ACTIVE_OPACITY}
      onPress={() => {
        standardFunctions.add_firebase_event_log(
          'coupons',
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

const TopTitle = ({title}) => {
  return <Text>title: {title}</Text>;
};

CouponScreen.navigationOptions = props => {
  // const user_total_coins = navigation.getParam('user_total_coins');
  // const title = navigation.getParam('title');
  // const coupon_mode = navigation.getParam('coupon_mode');

  const navigation = props.navigation;
  const {
    route: {params},
  } = props;
  const {user_total_coins, title, coupon_mode} = params;

  const needMarked = coupon_mode === COUPON_MODE.UNUSED;
  const defaultNavigationOptions = stackConfig.defaultNavigationOptions({
    navigation,
  });
  return {
    title,
    headerLeft: () => <BackButtonTop navigation={navigation} />,
    headerRight: () =>
      !needMarked && (
        <TopBarRightButton
          navigation={navigation}
          user_total_coins={user_total_coins}
        />
      ),
    headerTitleStyle: defaultNavigationOptions.headerTitleStyle,
    headerLeftContainerStyle: defaultNavigationOptions.headerLeftContainerStyle,
    headerRightContainerStyle:
      defaultNavigationOptions.headerRightContainerStyle,
    headerStyle: defaultNavigationOptions.headerStyle,
  };
};

export default CouponScreen;
