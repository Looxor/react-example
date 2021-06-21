import React, { useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../../../config";
import styles from "./HomeV2.style";
import AvailableStatusV2 from "./_Components/AvailableStatusV2";
import CouponPrizesList from "./_Components/CouponPrize/CouponPrizesList";
import BenefitsList from "./_Components/Benefit/BenefitsList";
import { routes } from "../../../../navigation/rootNavigation/navigation.constants";
import FastImage from "react-native-fast-image";
import NavigationService from "../../../../utils/app/NavigationService";
import standardFunctions from "../../../../utils/app/StandardFunctions";

const HomeV2 = props => {
  const [filterChanged, setFilterChanged] = useState(0);
  const [availableStatus, setAvailableStatus] = useState(0);
  const [autoselectedCategory, setAutoselectedCategory] = useState('');
  const availableStatusChangeHandler = (availableStatus, category = '') => {
    setTimeout(() => {
      if (autoselectedCategory !== '' && autoselectedCategory !== 'All') {
        setAutoselectedCategory('All');
      }

      if (category && category !== '') {
        setAutoselectedCategory(category);
      }
      setAvailableStatus(availableStatus);
    }, 1);
  };

  const resetNavigationParams = () => {
    props.navigation.setParams({
      autoselected_tab: null,
      autoselected_category: null,
    });
  };

  const onPressFilterHandler = () => {
    standardFunctions.play_tap_sound();
    // @ts-ignore
    global.navigationData = {
      onApplyFilters: onApplyFiltersHandler,
    };
    NavigationService.navigate(routes.COUPONS_NAVIGATOR, {
      screen: routes.COUPONS_PRIZE_FILTER_SCREEN,
    });
  };

  const onApplyFiltersHandler = () => {
    setFilterChanged(+new Date());
  };

  useEffect(() => {
    let autoselected_tab =
      props.route.params && props.route.params.autoselected_tab;
    let autoselected_category =
      props.route.params && props.route.params.autoselected_category;
    if (
      (autoselected_tab !== undefined && autoselected_tab !== null) ||
      (autoselected_category !== undefined && autoselected_category !== null)
    ) {
      if (autoselected_tab !== undefined && autoselected_tab !== null) {
        setAvailableStatus(autoselected_tab);
      }

      if (
        autoselected_category !== undefined &&
        autoselected_category !== null
      ) {
        setAutoselectedCategory(autoselected_category);
      }
      resetNavigationParams();
    }
  }, [
    props.route.params && props.route.params.autoselected_tab,
    props.route.params && props.route.params.autoselected_category,
  ]);
  return (
    <LinearGradient
      colors={[colors.COUPONS.START, colors.COUPONS.FINISH]}
      style={styles.container}>
      <FastImage
        style={styles.mainImageBackground}
        source={require('../../../../../assets/images/icons/benfits_trasparent_background.png')}>
        <AvailableStatusV2
          status={availableStatus}
          onStatusChanged={availableStatusChangeHandler}
        />
        {availableStatus === 0 && (
          <CouponPrizesList
            autoselectedCategory={autoselectedCategory}
            setAutoselectedCategory={setAutoselectedCategory}
            goToSafePart={() => {
              availableStatusChangeHandler(1, 'cashback');
            }}
            filterChanged={filterChanged}
            onPressFilterHandler={onPressFilterHandler}
          />
        )}
        {availableStatus === 1 && (
          <BenefitsList
            autoselectedCategory={autoselectedCategory}
            availableStatusChangeHandler={availableStatusChangeHandler}
          />
        )}
      </FastImage>
    </LinearGradient>
  );
};

export default HomeV2;
