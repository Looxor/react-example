import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import styles from "./CouponPrizesFilterScreen.style";
import CloseScreenButton from "../../../BestOfV2/_Components/CloseScreenButton";
import { colors, strings } from "../../../../config";
import PartnersPicker from "./_Components/CouponPrize/PartnersPicker";
import CheckBox from "../../../../components/CheckBox";
import RadioBox2 from "../../../../components/RadioBox2";
import FastImage from "react-native-fast-image";
import { Button } from "../../../../components";
import CouponPrizesFilterManager from "../../_Models/CouponPrizesFilterManager";
import NavigationService from "../../../../utils/app/NavigationService";
import standardFunctions from "../../../../utils/app/StandardFunctions";

const CouponPrizesFilterScreen = props => {
  // const onApplyFilters = props.navigation.getParam('onApplyFilters');
  // @ts-ignore
  const onApplyFilters = global.navigationData['onApplyFilters'];
  const partners = CouponPrizesFilterManager.getPartners();
  const selectedPartners = CouponPrizesFilterManager.getSelectedPartners();
  const couponTypes = CouponPrizesFilterManager.getCouponTypes();
  const selectedCouponTypes =
    CouponPrizesFilterManager.getSelectedCouponTypes();
  const selectedCashbackOrMultipleCoupons =
    CouponPrizesFilterManager.getSelectedCashbackOrMultipleCoupons();
  const showOnlyNew = CouponPrizesFilterManager.getShowOnlyNew();

  let newSelectedPartners = [];
  let newSelectedCouponTypes = [];
  let newSelectedCashbackOrMultiple = [];
  let newShowOnlyNew = false;

  const selectPartnersHandler = selectedPartners => {
    standardFunctions.play_tap_sound();
    newSelectedPartners = selectedPartners;
  };
  const selectCouponTypologyHandler = selectedCouponTypology => {
    standardFunctions.play_tap_sound()
    newSelectedCouponTypes = selectedCouponTypology.filter(s => {
      if (
        s !== undefined &&
        (s === 'sconti' || s === 'giftcard') &&
        s !== 'is_cashback' &&
        s !== 'is_multiple_use'
      )
        return s;
      return;
    });
    newSelectedCashbackOrMultiple = selectedCouponTypology.filter(s => {
      if (
        s !== undefined &&
        (s === 'is_cashback' || s === 'is_multiple_use') &&
        s !== 'sconti' &&
        s !== 'giftcard'
      )
        return s;
      return;
    });
  };
  const selectCouponTypesHandler = selectedCouponTypes => {
    newSelectedCouponTypes = selectedCouponTypes;
  };
  const selectCashbackOrMultipleHandler = selectedCashbackOrMultiple => {
    newSelectedCashbackOrMultiple = selectedCashbackOrMultiple;
  };
  const selectDateFilterHandler = value => {
    newShowOnlyNew = value === 'new';
  };

  const saveFiltersHandler = () => {
    setTimeout(() => {
      CouponPrizesFilterManager.setSelectedPartners(newSelectedPartners);
      CouponPrizesFilterManager.setSelectedCouponTypes(newSelectedCouponTypes);
      CouponPrizesFilterManager.setSelectedCashbackOrMultipleCoupons(
        newSelectedCashbackOrMultiple,
      );
      CouponPrizesFilterManager.setShowOnlyNew(newShowOnlyNew);
      onApplyFilters && onApplyFilters();
    }, 100);
    NavigationService.goBack();
  };

  const removeFiltersHandler = () => {
    setTimeout(() => {
      CouponPrizesFilterManager.resetFilters();
      onApplyFilters && onApplyFilters();
    }, 100);
    NavigationService.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <CloseScreenButton
        style={{top: 45, zIndex: 100, elevation: 100}}
        onPress={() => NavigationService.goBack()}
      />
      <View style={styles.subContainer1}>
        <Text style={styles.screenTitle}>{strings.OTHER.FILTER_TEXT}</Text>
        <View style={[styles.labelContainer, {marginTop: 30}]}>
          <FastImage
            resizeMode={'contain'}
            style={styles.hatIcon}
            source={require('../../../../../assets/images/icons/icn_benefits_partner.png')}
          />
          <Text style={styles.labelText}>
            {strings.COUPONS.FILTER_SCREEN.PARTNER_LABEL}
          </Text>
        </View>
        <PartnersPicker
          style={{marginVertical: 10, marginHorizontal: 30}}
          partners={partners}
          selectedPartners={selectedPartners}
          onSelectPartners={selectPartnersHandler}
        />
        <View style={styles.labelContainer}>
          <FastImage
            resizeMode={'contain'}
            style={styles.hatIcon}
            source={require('../../../../../assets/images/icons/icn_benefits_bookmark_internal.png')}
          />
          <Text style={styles.labelText}>
            {strings.COUPONS.FILTER_SCREEN.TYPE_LABEL}
          </Text>
        </View>
        <CheckBox
          checkedIcon={require('../../../../../assets/images/icons/icn_checkbox_checked.png')}
          uncheckedIcon={require('../../../../../assets/images/icons/icn_checkbox_unchecked.png')}
          data={[
            {
              value: couponTypes[0],
              text: strings.COUPONS.FILTER_SCREEN.TYPE_LABEL1,
            },
            {
              value: couponTypes[1],
              text: strings.COUPONS.FILTER_SCREEN.TYPE_LABEL2,
            },
            {
              value: 'is_cashback',
              text: strings.COUPONS.FILTER_SCREEN.TYPE_LABEL3,
            },
            {
              value: 'is_multiple_use',
              text: strings.COUPONS.FILTER_SCREEN.TYPE_LABEL4,
            },
          ]}
          textStyle={{color: colors.BESTOF2.BG1, marginLeft: 5}}
          iconStyle={{
            width: 18,
            height: 18,
          }}
          containerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignSelf: 'center',
            marginTop: 20,
            width: '100%',
          }}
          itemStyle={{
            marginHorizontal: 15,
          }}
          onChangeValue={selectCouponTypologyHandler}
          defaultCheckedValues={[
            ...selectedCouponTypes,
            ...selectedCashbackOrMultipleCoupons,
          ]}
          minimumSelected={0}
        />
        <View style={styles.labelContainer}>
          <FastImage
            resizeMode={'contain'}
            style={styles.hatIcon}
            source={require('../../../../../assets/images/icons/icn_bestofs_calendar.png')}
          />
          <Text style={styles.labelText}>
            {strings.COUPONS.FILTER_SCREEN.DATE_LABEL}
          </Text>
        </View>
        <RadioBox2
          data={[
            {value: 'new', text: strings.COUPONS.FILTER_SCREEN.DATE_LABEL1},
            {value: 'all', text: strings.COUPONS.FILTER_SCREEN.DATE_LABEL2},
          ]}
          containerStyle={{
            alignSelf: 'center',
            marginTop: 20,
          }}
          defaultSelectedValue={showOnlyNew ? 'new' : 'all'}
          onChangeValue={selectDateFilterHandler}
          iconStyle={{
            width: 50,
            height: 25,
          }}
          textStyle={{
            lineHeight: 22,
            marginHorizontal: 10,
          }}
        />
      </View>
      <View style={styles.subContainer2}>
        <Button
          onPress={saveFiltersHandler}
          textStyle={styles.applyButtonText}
          style={styles.applyButton}>
          {strings.OTHER.APPLY}
        </Button>
        <Button
          onPress={removeFiltersHandler}
          textStyle={styles.removeButtonText}
          style={styles.removeButton}>
          {strings.OTHER.REMOVE_ALL}
        </Button>
      </View>
    </SafeAreaView>
  );
};

CouponPrizesFilterScreen.navigationOptions = () => ({
  header: () => null,
});

export default CouponPrizesFilterScreen;
