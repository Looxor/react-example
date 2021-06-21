import React, { useEffect, useState } from "react";
import CouponBoxV3 from "./CouponBoxV3";
import PrizeBoxV3 from "./PrizeBoxV3";
import Prize from "../../../../_Models/Prize";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import styles from "../../HomeV2.style";
import { colors, strings } from "../../../../../../config";
import BenefitsCarousel from "../BenefitsCarousel";
import CategoriesList from "./CategoriesList";
import { useDispatch, useSelector } from "react-redux";
import useCouponPrizesListViewModel from "../../../../_Models/CouponPrizesListViewModel";
import FilterIconButton from "../../../../../../components/FilterIconButton";
import { NoCouponsPrizes } from "../Benefit/BenefitsListResultMessage";
import standardFunctions from "../../../../../../utils/app/StandardFunctions";

const CouponPrizesList = props => {
  const [fastLoad, setFastLoad] = useState(false);
  const dispatch = useDispatch();
  const view = useCouponPrizesListViewModel({props: {...props, dispatch}});
  const couponState = useSelector((state: any) => state && state.Coupon);
  const coupons = couponState.coupons;
  const seen_coupon_prizes = couponState.seen_coupon_prizes;

  useEffect(() => {
    view.onChangeCouponReduxStore(coupons, seen_coupon_prizes);
  }, [coupons, seen_coupon_prizes]);

  useEffect(() => {
    setFastLoad(true);
  }, []);
  useEffect(() => {
    view.showFilteredData();
  }, [props.filterChanged]);

  useEffect(() => {
    if (props.autoselectedCategory) {
      view.selectCategory(props.autoselectedCategory);
    }
  }, [props]);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          tintColor={colors.LIGHT_ALOE_TF}
          refreshing={view.loading || !fastLoad}
          onRefresh={() => view.loadDataFromRedux()}
        />
      }
      contentContainerStyle={styles.subContainerList}>
      <View style={{width: '100%', marginTop: 5, marginBottom: 10}}>
        <FilterIconButton
          onPress={props.onPressFilterHandler}
          style={{position: 'absolute', right: 40, top: 10}}
        />
        <Text style={styles.title}>{strings.COUPONS.TABS2.CAPTION1}</Text>
      </View>
      <View style={{width: '86%', marginLeft: '7%', marginRight: '7%'}}>
        <Text style={styles.description}>{strings.COUPONS.HOME.DESC3}</Text>
        {/*{view.loading && <ActivityIndicator style={{marginTop: 20}}/>}*/}
      </View>
      {fastLoad && view.carouselItems.length > 0 && (
        <BenefitsCarousel items={view.carouselItems} />
      )}
      {fastLoad && (
        <CategoriesList
          style={{marginTop: 20}}
          categories={view.categories}
          selectedCategory={view.selectedCategory}
          onCategorySelected={value => {
            standardFunctions.play_tap_sound();
            view.selectCategory(value);
          }}
        />
      )}

      {fastLoad &&
        view.filteredItems.map((couponPrize, index) => {
          if (couponPrize.coupon_id)
            return (
              <CouponBoxV3
                key={String(index)}
                index={index}
                coupon={couponPrize}
                goToSafePart={props.goToSafePart}
              />
            );
          else if (couponPrize.prize_id)
            return (
              <PrizeBoxV3
                key={String(index)}
                index={index}
                prize={new Prize(couponPrize)}
              />
            );
          else return null;
        })}
      {view.filteredItems.length === 0 && (
        <NoCouponsPrizes
          needsButton={false}
          style={{marginTop: 70, marginBottom: 50}}
          isCategoryDescription={true}
          isCashback={view.selectedCategory === 'cashback'}
          goToSafePart={props.goToSafePart}
          setAutoselectedCategory={props.setAutoselectedCategory}
        />
      )}
    </ScrollView>
  );
};

export default CouponPrizesList;
