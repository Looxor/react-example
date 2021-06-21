import React from "react";
import { routes } from "../../../../../../navigation/rootNavigation/navigation.constants";
import { useNavigation } from "@react-navigation/native";
import BenefitsCarousel from "./BenefitsCarousel";
import standardFunctions from "../../../../../../utils/app/StandardFunctions";

const getRibbonImages = item => {
  const ribbonImages = [];
  if (item.is_multiple_use) {
    ribbonImages.push(
      require('../../../../../../../assets/images/icons/icn_multiple_white.png'),
    );
    ribbonImages.push('multiple_use_label');
  }
  if (item.is_cashback) {
    ribbonImages.push(
      require('../../../../../../../assets/images/icons/icn_cashback_white.png'),
    );
    ribbonImages.push('cashback_label');
  }
  return ribbonImages;
};

const BenefitsCarouselContainer = props => {
  const navigation = useNavigation();

  const onSelectCouponHandler = ({item}) => {
    standardFunctions.play_tap_sound();
    if (item.coupon_id) {
      standardFunctions.add_firebase_event_log('benefits', 'carousel_opened', {
        coupon_id: item.coupon_id,
      });
      navigation.navigate(routes.COUPONS_COUPON, {
        coupon_id: item.coupon_id,
        title: item.partner_name,
        coupon_data: item,
      });
    } else if (item.prize_id) {
      standardFunctions.add_firebase_event_log('benefits', 'carousel_opened', {
        prize_id: item.prize_id,
      });
      navigation.navigate(routes.COUPONS_PRIZE_DETAIL, {
        prize: item,
      });
    }
  };

  return (
    <BenefitsCarousel
      items={props.items}
      onSelectItem={onSelectCouponHandler}
      getRibbonImages={getRibbonImages}
    />
  );
};

export default BenefitsCarouselContainer;
