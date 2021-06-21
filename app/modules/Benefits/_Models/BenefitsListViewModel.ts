import { useViewModel, ViewModelBase } from "../../_CommonModels/ViewModelBase";
import { orderBy } from "../../../utils/misc/ObjectArray";
import { loadObtainedCouponList } from "../_ReduxStore/_actions";

const getItemsByFilters = (items = [], category = 'All') => {
  const not_used_items = [];
  const already_used_items = [];

  const pushItems = item => {
    if (item.marked_used === true || item.to_be_used === false) {
      already_used_items.push(item);
    } else {
      not_used_items.push(item);
    }
  };

  items.forEach(couponPrize => {
    if (category === 'All') {
      pushItems(couponPrize);
    } else if (
      (category === 'sconti' && couponPrize.coupon_id) ||
      (category === 'giftcard' && couponPrize.prize_id) ||
      (category === 'cashback' && couponPrize.is_cashback) ||
      (category === 'multiple_use' && couponPrize.is_multiple_use)
    ) {
      pushItems(couponPrize);
    }
  });
  return {already_used_items, not_used_items};
};

const validate = (value, replacement) => {
  if (
    typeof value === 'undefined' ||
    value === null ||
    value === undefined ||
    isNaN(value)
  ) {
    return replacement;
  }
  return value;
};

const customOrderByFormula4CouponsAndPrizes = (a, b) => {
  const a_to_be_used = validate(a.to_be_used, false);
  const a_is_cashback = validate(a.is_cashback, false);
  const a_is_multiple_use = validate(a.is_multiple_use, false);
  const a_usage_finish_date = a.usage_finish_date;
  const a_marked_used_date = validate(a.marked_used_date, a.usage_finish_date);

  const b_to_be_used = validate(b.to_be_used, false);
  const b_is_cashback = validate(b.is_cashback, false);
  const b_is_multiple_use = validate(b.is_multiple_use, false);
  const b_usage_finish_date = b.usage_finish_date;
  const b_marked_used_date = validate(b.marked_used_date, b.usage_finish_date);

  let ret = 0;
  if (a_to_be_used === b_to_be_used) {
    if (a_is_cashback === b_is_cashback) {
      if (a_is_multiple_use === b_is_multiple_use) {
        if (a_to_be_used === true) {
          if (a_usage_finish_date === b_usage_finish_date) {
            if (a_marked_used_date === b_marked_used_date) {
              ret = 0;
            } else if (a_marked_used_date > b_marked_used_date) {
              ret = -1;
            } else {
              ret = 1;
            }
          } else if (a_usage_finish_date > b_usage_finish_date) {
            ret = 1;
          } else {
            ret = -1;
          }
        }
      } else if (a_is_multiple_use === true) {
        ret = -1;
      } else {
        ret = 1;
      }
    } else if (a_is_cashback === true) {
      ret = -1;
    } else {
      ret = 1;
    }
  } else if (a_to_be_used === true) {
    ret = -1;
  } else {
    ret = 1;
  }
  return ret;
};

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 25;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const DEFAULT_SKIP_INFO = {
  couponSkip: 0,
  prizeSkip: 0,
};

class BenefitsListViewModel extends ViewModelBase {
  couponsAndPrizes: Array<any> = [];
  usedItems: Array<any> = [];
  notUsedItems: Array<any> = [];
  skipInfo: any = DEFAULT_SKIP_INFO;

  selectedCategory: string = 'All';
  loading: boolean = true;
  loadingBottom: boolean = true;

  selectCategory(selectedCategory) {
    this.selectedCategory = selectedCategory;
    this.showFilteredData();
  }

  showFilteredData() {
    this.couponsAndPrizes = orderBy(
      this.couponsAndPrizes,
      customOrderByFormula4CouponsAndPrizes,
    );
    const result = getItemsByFilters(
      this.couponsAndPrizes,
      this.selectedCategory,
    );
    this.notUsedItems = result.not_used_items;
    this.usedItems = result.already_used_items;
    this.loading = false;
    this.updateView();
  }

  onChangeCouponReduxStore(coupons) {
    if (this.couponsAndPrizes.length !== coupons.length) {
      this.couponsAndPrizes = coupons;
      // console.log('coupons', coupons);
      this.showFilteredData();
    } else {
      //    if(obtained_coupons.length > 0) {
      //       view.setFilterPartners(obtained_coupons)
      //     }
      this.loading = false;
      this.loadingBottom = false;
      this.updateView();
    }
  }

  getDataCallback(params) {
    const {couponsCount, prizesCount} = params;
    this.skipInfo.couponSkip += Number(couponsCount);
    this.skipInfo.prizeSkip += Number(prizesCount);
  }

  async loadDataFromRedux() {
    this.loading = true;
    this.updateView();
    this.skipInfo = DEFAULT_SKIP_INFO;
    await this.props.dispatch(
      loadObtainedCouponList(false, this.skipInfo, params => {
        this.getDataCallback(params);
      }),
    );
    console.log('after...', this.loading);
  }

  async loadMoreObtainedPrizesV2(e) {
    const {layoutMeasurement, contentOffset, contentSize} = e.nativeEvent;
    const isEndOfScroll = isCloseToBottom({
      layoutMeasurement,
      contentOffset,
      contentSize,
    });
    if (isEndOfScroll && !this.loadingBottom) {
      this.loadingBottom = true;
      this.updateView();
      await this.props.dispatch(
        loadObtainedCouponList(true, this.skipInfo, params => {
          this.getDataCallback(params);
        }),
      );
    } else {
      this.loadingBottom = false;
      this.updateView();
    }
  }

  componentDidMount() {
    this.loadDataFromRedux();
  }
}

export default useViewModel(new BenefitsListViewModel());
