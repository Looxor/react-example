import { useViewModel, ViewModelBase } from "../../_CommonModels/ViewModelBase";
import { orderBy } from "../../../utils/misc/ObjectArray";
import { static_categories } from "../Views/Home/_Components/CouponPrize/CategoriesList";
import { loadCouponList } from "../_ReduxStore/_actions";
import CouponPrizesFilterManager from "./CouponPrizesFilterManager";

const CashbackItem = {label: 'Cashback', value: 'cashback'};
const MultipleItem = {label: 'Riusabili', value: 'multiple_use'};

const getCategories = items => {
  let category_items = static_categories;
  items.map(item => {
    if (
      !category_items.some(
        category_item => category_item.value === item.category,
      )
    ) {
      category_items.push({
        label: item.category,
        value: item.category,
      });
    }
  });
  if (
    !category_items.some(
      category_item => category_item.value === CashbackItem.value,
    )
  ) {
    category_items.splice(1, 0, CashbackItem);
  }

  if (
    !category_items.some(
      category_item => category_item.value === MultipleItem.value,
    )
  ) {
    category_items.splice(2, 0, MultipleItem);
  }
  return category_items;
};

class CouponPrizesListViewModel extends ViewModelBase {
  couponsAndPrizes: Array<any> = [];
  filteredItems: Array<any> = [];
  carouselItems: Array<any> = [];
  categories: Array<any> = static_categories;
  seen_coupon_prizes: Array<string> = [];
  isFirstLoaded: boolean = true;

  selectedCategory: string = 'All';
  loading: boolean = true;

  selectCategory(selectedCategory) {
    this.selectedCategory = selectedCategory;
    this.showFilteredData();
  }

  async showFilteredData() {
    this.couponsAndPrizes = orderBy(this.couponsAndPrizes, 'priority');
    this.categories = getCategories(this.couponsAndPrizes);
    const result = this.getItemsByFilters(0);
    this.filteredItems = result.filtered_items;
    this.carouselItems = result.carousel_items;
    this.loading = false;
    this.updateView();
  }

  setFilterPartners(coupons) {
    CouponPrizesFilterManager.clearPartners();
    coupons.forEach(couponPrize => {
      CouponPrizesFilterManager.setPartners(
        couponPrize.partner_id,
        couponPrize.partner_name,
      );
    });
  }

  onChangeCouponReduxStore(coupons, seen_coupon_prizes) {
    this.couponsAndPrizes = coupons;
    this.seen_coupon_prizes = seen_coupon_prizes;
    this.showFilteredData();
  }

  async loadDataFromRedux() {
    this.loading = true;
    this.updateView();
    await this.props.dispatch(loadCouponList());
  }

  componentDidMount() {
    // console.log("CouponPrizesListViewModel componentDidMount() {");
    this.isFirstLoaded = true;
    this.loadDataFromRedux();
  }

  private getItemsByFilters(priority = 0) {
    const items = this.couponsAndPrizes;
    const category = this.selectedCategory || 'All';
    const selectedPartnerIds =
      CouponPrizesFilterManager.getSelectedPartnerIds();
    const needsAllCouponType = CouponPrizesFilterManager.needsAllCouponType();
    const needsScontiCouponType =
      CouponPrizesFilterManager.needsScontiCouponType();
    const needsGiftCardCouponType =
      CouponPrizesFilterManager.needsGiftCardCouponType();
    const needsCashbackType = CouponPrizesFilterManager.needsCashbackType();
    const needsMultipleUseType =
      CouponPrizesFilterManager.needsMultipleUseType();
    const showOnlyNew = CouponPrizesFilterManager.getShowOnlyNew();
    const seen_coupon_prizes = this.seen_coupon_prizes;

    let filtered_items = [];
    let carousel_items = [];

    if (this.isFirstLoaded && items.length > 0)
      CouponPrizesFilterManager.clearPartners();
    items.forEach(couponPrize => {
      if (this.isFirstLoaded)
        CouponPrizesFilterManager.setPartners(
          couponPrize.partner_id,
          couponPrize.partner_name,
        );
      if (
        couponPrize.priority === priority
        // && carousel_items.length !== 1
      ) {
        carousel_items.push(couponPrize);
      }

      if (
        selectedPartnerIds !== '' &&
        selectedPartnerIds.indexOf(couponPrize.partner_id) === -1
      ) {
        return;
      }

      if (!needsAllCouponType) {
        if (
          !needsScontiCouponType &&
          !needsCashbackType &&
          !needsMultipleUseType &&
          needsGiftCardCouponType &&
          couponPrize.coupon_id
        )
          return;
        if (
          needsScontiCouponType &&
          !needsCashbackType &&
          !needsMultipleUseType &&
          couponPrize.coupon_id &&
          (couponPrize.is_cashback || couponPrize.is_multiple_use)
        )
          return;
        if (
          !needsScontiCouponType &&
          !needsCashbackType &&
          needsMultipleUseType &&
          couponPrize.coupon_id &&
          !couponPrize.is_multiple_use
        )
          return;
        if (
          !needsScontiCouponType &&
          needsCashbackType &&
          !needsMultipleUseType &&
          couponPrize.coupon_id &&
          !couponPrize.is_cashback
        )
          return;
        if (
          needsScontiCouponType &&
          !needsCashbackType &&
          needsMultipleUseType &&
          couponPrize.coupon_id &&
          couponPrize.is_cashback
        )
          return;
        if (
          needsScontiCouponType &&
          needsCashbackType &&
          !needsMultipleUseType &&
          couponPrize.coupon_id &&
          couponPrize.is_multiple_use
        )
          return;
        if (
          !needsScontiCouponType &&
          needsCashbackType &&
          needsMultipleUseType &&
          couponPrize.coupon_id &&
          !couponPrize.is_cashback &&
          !couponPrize.is_multiple_use
        )
          return;

        if (
          needsGiftCardCouponType &&
          !couponPrize.prize_id &&
          !(
            (needsScontiCouponType ||
              needsCashbackType ||
              needsMultipleUseType) &&
            couponPrize.coupon_id
          )
        )
          return;
        if (!needsGiftCardCouponType && couponPrize.prize_id) return;
      }

      if (
        category === 'All' ||
        couponPrize.category === category ||
        (category === 'cashback' && couponPrize.is_cashback) ||
        (category === 'multiple_use' && couponPrize.is_multiple_use)
      ) {
        if (
          (couponPrize.coupon_id &&
            seen_coupon_prizes.indexOf(couponPrize.coupon_id) > -1) ||
          (couponPrize.prize_id &&
            seen_coupon_prizes.indexOf(couponPrize.prize_id) > -1)
        ) {
          if (showOnlyNew === true) return;
          else couponPrize.seen = true;
        }
        filtered_items.push(couponPrize);
      }
    });
    if (items.length > 0) this.isFirstLoaded = false;
    return {filtered_items, carousel_items};
  }
}

export default useViewModel(new CouponPrizesListViewModel());
