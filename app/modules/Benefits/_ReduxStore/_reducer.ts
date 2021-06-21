import {
  LOAD_ALREADY_SHOWED_COUPON_LIST,
  LOAD_COUPON_LIST,
  LOAD_OBTAINED_COUPON_LIST,
  MARK_COUPON_SEEN,
  REDEEM_COUPON
} from "./_actions";

const initialState = {
  coupons: [],
  obtained_coupons: [],
  seen_coupon_prizes: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COUPON_LIST.DOING:
      return {...state, status: LOAD_COUPON_LIST.DOING};
    case LOAD_COUPON_LIST.SUCCESS:
      const coupons = action.coupons;
      let coupons2;
      if (action.newCouponData && action.newCouponData.coupon_id) {
        coupons2 = coupons.map(coupon => {
          if (coupon.coupon_id === action.newCouponData.coupon_id) {
            coupon.is_already_used = true;
          }
          return coupon;
        });
        return {
          ...state,
          coupons: coupons2,
          newCouponData: action.newCouponData,
          status: LOAD_COUPON_LIST.SUCCESS,
        };
      } else {
        coupons2 = coupons;
        return {
          ...state,
          coupons: coupons2,
          status: LOAD_COUPON_LIST.SUCCESS,
        };
      }
    case MARK_COUPON_SEEN.SUCCESS:
      if (state.seen_coupon_prizes.indexOf(action.couponPrize_id) === -1) {
        let seen_coupon_prizes = [...state.seen_coupon_prizes];
        seen_coupon_prizes = seen_coupon_prizes.concat(action.couponPrize_id);
        return {
          ...state,
          seen_coupon_prizes,
          status: MARK_COUPON_SEEN.SUCCESS,
        };
      } else {
        return state;
      }
    case REDEEM_COUPON.DOING:
      return {...state, status: REDEEM_COUPON.DOING};
    case REDEEM_COUPON.SUCCESS:
      return {...state, status: REDEEM_COUPON.SUCCESS};
    case REDEEM_COUPON.FAILED:
      return {...state, status: REDEEM_COUPON.FAILED};

    case LOAD_OBTAINED_COUPON_LIST.DOING:
      return {...state, status: LOAD_OBTAINED_COUPON_LIST.DOING};
    case LOAD_OBTAINED_COUPON_LIST.SUCCESS:
      return {
        ...state,
        obtained_coupons: action.obtained_coupons,
        status: LOAD_OBTAINED_COUPON_LIST.SUCCESS,
      };
    case LOAD_OBTAINED_COUPON_LIST.FAILED:
      return {...state, status: LOAD_OBTAINED_COUPON_LIST.FAILED};

    case LOAD_ALREADY_SHOWED_COUPON_LIST.DOING:
      return {...state, status: LOAD_ALREADY_SHOWED_COUPON_LIST.DOING};
    case LOAD_ALREADY_SHOWED_COUPON_LIST.SUCCESS:
      return {
        ...state,
        already_showed_coupons: action.already_showed_coupons,
        status: LOAD_ALREADY_SHOWED_COUPON_LIST.SUCCESS,
      };
    case LOAD_ALREADY_SHOWED_COUPON_LIST.FAILED:
      return {...state, status: LOAD_ALREADY_SHOWED_COUPON_LIST.FAILED};
    default:
      return state;
  }
};
