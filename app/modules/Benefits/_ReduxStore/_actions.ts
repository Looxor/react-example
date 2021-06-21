import CouponsManager from "../_Models/CouponsManager";

import { createAction, createTypes } from "../../../utils/redux/actions";
import standardFunctions from "../../../utils/app/StandardFunctions";
import { strings } from "../../../config";
import { Observable } from "../../_CommonModels/ViewModelBase";
import { UserData } from "../../../config/constants";

const LOAD_COUPON_LIST = createTypes('THEFACULTY_LOAD_COUPON_LIST');
const MARK_COUPON_SEEN = createTypes('THEFACULTY_MARK_COUPON_SEEN');
const MARK_COUPON_USED = createTypes('THEFACULTY_MARK_COUPON_USED');
const LOAD_ALREADY_SHOWED_COUPON_LIST = createTypes(
  'THEFACULTY_LOAD_ALREADY_SHOWED_COUPON_LIST',
);
const LOAD_OBTAINED_COUPON_LIST = createTypes(
  'THEFACULTY_LOAD_OBTAINED_COUPON_LIST',
);
const REDEEM_COUPON = createTypes('THEFACULTY_REDEEM_COUPON');

const loadCouponList = () => {
  return async dispatch => {
    const loadAction = {
      do: () => createAction(LOAD_COUPON_LIST.DOING, {}),
      success: coupons => createAction(LOAD_COUPON_LIST.SUCCESS, {coupons}),
      failed: () => createAction(LOAD_COUPON_LIST.FAILED, {}),
    };
    try {
      dispatch(loadAction.do());
      // await CouponsManager.loadCoupons();
      await CouponsManager.loadCouponsAndPrizes();
      const coupons = CouponsManager.getCoupons();
      dispatch(loadAction.success(coupons));
    } catch (error) {
      console.log(error);
      dispatch(loadAction.failed());
    }
  };
};

const markCouponPrizeAsSeen = couponPrize_id => {
  return async dispatch => {
    const markSeenAction = {
      do: () => createAction(MARK_COUPON_SEEN.DOING, {}),
      success: couponPrize_id =>
        createAction(MARK_COUPON_SEEN.SUCCESS, {couponPrize_id}),
      failed: () => createAction(MARK_COUPON_SEEN.FAILED, {}),
    };
    try {
      dispatch(markSeenAction.do());
      dispatch(markSeenAction.success(couponPrize_id));
    } catch (error) {
      dispatch(markSeenAction.failed());
    }
  };
};

const loadAlreadyShowedCoupons = () => {
  return async dispatch => {
    const loadAction = {
      do: () => createAction(LOAD_ALREADY_SHOWED_COUPON_LIST.DOING, {}),
      success: already_showed_coupons =>
        createAction(LOAD_ALREADY_SHOWED_COUPON_LIST.SUCCESS, {
          already_showed_coupons,
        }),
      failed: () => createAction(LOAD_ALREADY_SHOWED_COUPON_LIST.FAILED, {}),
    };
    try {
      dispatch(loadAction.do());
      const already_showed_coupons = Observable.getReduxValue(
        UserData.getUserData().user_id + '_already_opened_coupons',
      );
      dispatch(loadAction.success(already_showed_coupons));
    } catch (error) {
      dispatch(loadAction.failed());
    }
  };
};

const loadObtainedCouponList = (
  loadMore: boolean = false,
  skipInfo: any = {},
  getDataCallback = undefined,
) => {
  return dispatch => {
    const loadAction = {
      do: () => createAction(LOAD_OBTAINED_COUPON_LIST.DOING, {}),
      success: obtained_coupons =>
        createAction(LOAD_OBTAINED_COUPON_LIST.SUCCESS, {obtained_coupons}),
      failed: () => createAction(LOAD_OBTAINED_COUPON_LIST.FAILED, {}),
    };
    const loadData = async () => {
      try {
        dispatch(loadAction.do());
        // await CouponsManager.loadObtainedCoupons(loadMore, skip);
        await CouponsManager.loadObtainedCouponsAndPrizes(
          loadMore,
          skipInfo,
          getDataCallback,
        );
        const obtained_coupons = CouponsManager.getObtainedCoupons();
        dispatch(loadAction.success(obtained_coupons));
      } catch (error) {
        dispatch(loadAction.failed());
      }
    };
    loadData();
  };
};

const redeemCoupon = (coupon_id, coupon_data) => {
  return async dispatch => {
    const processAction = {
      do: () => createAction(REDEEM_COUPON.DOING, {}),
      success: () => createAction(REDEEM_COUPON.SUCCESS, {}),
      failed: () => createAction(REDEEM_COUPON.FAILED, {}),
    };
    const loadAction = {
      success: (coupons, newCouponData) =>
        createAction(LOAD_COUPON_LIST.SUCCESS, {coupons, newCouponData}),
    };
    const process = async () => {
      try {
        dispatch(processAction.do());
        const redeemProcess = await CouponsManager.redeemCoupon(coupon_id);
        if (redeemProcess.result) {
          const newCouponData = {...coupon_data, ...redeemProcess.data};
          newCouponData.is_already_used = true;
          newCouponData.is_valid = false;
          newCouponData.marked_used = false;
          await CouponsManager.loadCoupons();
          const coupons = CouponsManager.getCoupons();
          await dispatch(loadAction.success(coupons, newCouponData));
          await dispatch(processAction.success());
        } else {
          await dispatch(processAction.failed());
          await standardFunctions.show_alert_async(
            strings.ALERTS.ERRORS.STANDARD.OOPS,
            redeemProcess.error_message,
          );
        }
      } catch (error) {
        dispatch(processAction.failed());
      }
    };
    await process();
  };
};

export {
  LOAD_COUPON_LIST,
  loadCouponList,
  LOAD_ALREADY_SHOWED_COUPON_LIST,
  markCouponPrizeAsSeen,
  MARK_COUPON_SEEN,
  loadAlreadyShowedCoupons,
  LOAD_OBTAINED_COUPON_LIST,
  loadObtainedCouponList,
  REDEEM_COUPON,
  redeemCoupon,
};
