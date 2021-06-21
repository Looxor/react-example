import React, { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { colors, strings } from "../../../../../../config";

import CategoriesList from "./CategoriesList";
import styles from "../../HomeV2.style";
import useBenefitsListViewModel from "../../../../_Models/BenefitsListViewModel";
import CouponBoxUsedV3 from "./CouponBoxUsedV3";
import Prize from "../../../../_Models/Prize";
import Coupon from "../../../../_Models/Coupon";

import { AlreadyUsedDisplayBar, NoCouponsPrizes } from "./BenefitsListResultMessage";
import standardFunctions from "../../../../../../utils/app/StandardFunctions";
import { useNavigation } from "@react-navigation/native";
import { routes } from "../../../../../../navigation/rootNavigation/navigation.constants";
import PrizeBoxUsedV3 from "./PrizeBoxUsedV3";
import NavigationService from "../../../../../../utils/app/NavigationService";

const BenefitsList = props => {
  const navigation = useNavigation();
  const [fastLoad, setFastLoad] = useState(false);
  const dispatch = useDispatch();
  const view = useBenefitsListViewModel({props: {...props, dispatch}});
  const couponState = useSelector((state: any) => state && state.Coupon);
  const obtained_coupons = couponState.obtained_coupons;

  useEffect(() => {
    view.onChangeCouponReduxStore(obtained_coupons);
  }, [obtained_coupons]);

  useEffect(() => {
    setFastLoad(true);
    standardFunctions.add_firebase_event_log('benefits', 'safe_screen_opened');
  }, []);

  const onSelectPrizeHandler = ({prize}) => {
    standardFunctions.play_tap_sound();
    standardFunctions.add_firebase_event_log(
      'prizes',
      'used_prize_box_clicked',
      {prize_id: prize.prize_id},
    );
    // @ts-ignore
    global.navigationData = {
      prize_purchase: prize,
    };
    NavigationService.navigate(routes.COUPONS_NAVIGATOR, {
      screen: routes.COUPONS_PRIZE_PURCHASE_INFO,
    });
  };

  const onSelectCouponHandler = ({coupon}) => {
    standardFunctions.play_tap_sound();
    standardFunctions.add_firebase_event_log(
      'coupons',
      'used_coupon_box_clicked',
      {coupon_id: coupon.coupon_id},
    );
    // @ts-ignore
    global.navigationData = {
      coupon_data: coupon,
    };
    NavigationService.navigate(routes.COUPONS_NAVIGATOR, {
      screen: routes.COUPONS_COUPON,
      params: {
        coupon_id: coupon.coupon_id,
        title: coupon.partner_name,
      },
    });
  };

  useEffect(() => {
    if (
      props.autoselectedCategory ||
      props.autoselectedCategory === 'cashback'
    ) {
      view.selectCategory(props.autoselectedCategory);
    }
  }, [props]);

  return (
    <ScrollView
      bouncesZoom
      showsVerticalScrollIndicator={false}
      overScrollMode={'never'}
      scrollEventThrottle={1}
      onMomentumScrollEnd={e => view.loadMoreObtainedPrizesV2(e)}
      refreshControl={
        <RefreshControl
          tintColor={colors.LIGHT_ALOE_TF}
          refreshing={view.loading || !fastLoad}
          onRefresh={() => view.loadDataFromRedux()}
        />
      }
      contentContainerStyle={styles.subContainerList}>
      <View style={{width: '100%', marginTop: 5, marginBottom: 10}}>
        <Text style={styles.title}>{strings.COUPONS.TABS2.CAPTION2}</Text>
      </View>
      <View style={{width: '100%', paddingHorizontal: 20}}>
        <Text style={styles.description}>{strings.COUPONS.HOME.DESC4}</Text>
        {/*{view.loading && <ActivityIndicator style={{marginTop: 20}}/>}*/}
      </View>
      {fastLoad && (
        <CategoriesList
          style={{marginTop: 20}}
          selectedCategory={view.selectedCategory}
          onCategorySelected={value => {
            standardFunctions.play_tap_sound();
            view.selectCategory(value);
          }}
        />
      )}

      {view.usedItems.length === 0 && view.notUsedItems.length === 0 && (
        <NoCouponsPrizes
          availableStatusChangeHandler={props.availableStatusChangeHandler}
          needsButton={true}
          style={{marginTop: 70}}
        />
      )}

      {fastLoad &&
        view.notUsedItems.map((couponPrize, index) => {
          if (couponPrize.coupon_id)
            return (
              <CouponBoxUsedV3
                onSelectCouponPrize={onSelectCouponHandler}
                key={String(index)}
                index={index}
                couponPrize={new Coupon(couponPrize)}
              />
            );
          else if (couponPrize.prize_id)
            return (
              <PrizeBoxUsedV3
                onSelectCouponPrize={onSelectPrizeHandler}
                key={String(index)}
                index={index}
                couponPrize={new Prize(couponPrize)}
              />
            );
          else return null;
        })}

      {view.usedItems.length > 0 && (
        <AlreadyUsedDisplayBar style={{marginTop: 10, marginBottom: 20}} />
      )}

      {fastLoad &&
        view.usedItems.map((couponPrize, index) => {
          if (couponPrize.coupon_id)
            return (
              <CouponBoxUsedV3
                onSelectCouponPrize={onSelectCouponHandler}
                key={String(index)}
                index={index}
                couponPrize={new Coupon(couponPrize)}
              />
            );
          else if (couponPrize.prize_id)
            return (
              <PrizeBoxUsedV3
                onSelectCouponPrize={onSelectPrizeHandler}
                key={String(index)}
                index={index}
                couponPrize={new Prize(couponPrize)}
              />
            );
          else return null;
        })}

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: 70,
        }}>
        {view.loadingBottom && (
          <ActivityIndicator
            color={colors.WHITE}
            style={{marginVertical: 15}}
            size={30}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default BenefitsList;
