import Coupon from "./Coupon";
import { CallServerPromise } from "../../../utils/app/CallServer";
import { strings } from "../../../config";

class CouponsManager {
  coupons: Array<any> = [];
  obtained_coupons: Array<any> = [];
  mark_unused_coupons: Array<Coupon> = [];
  mark_used_coupons: Array<Coupon> = [];

  constructor() {}

  async getIsCouponsAvailable() {
    try {
      const request = await CallServerPromise.get_is_coupons_available();
      if (request.success) return request.data;
      return true;
    } catch (error) {
      return true;
    }
  }

  loadCoupons = async () => {
    const request = await CallServerPromise.get_coupons();
    if (request.success) {
      this.coupons = request.data;
    }
  };

  loadCouponsAndPrizes = async () => {
    const couponRequest = await CallServerPromise.get_coupons();
    const prizeRequest = await CallServerPromise.get_prizes();

    if (couponRequest.success && prizeRequest.success) {
      this.coupons = [].concat(couponRequest.data).concat(prizeRequest.data);
    } else if (couponRequest.success) {
      this.coupons = [].concat(couponRequest.data);
    } else if (prizeRequest.success) {
      this.coupons = [].concat(prizeRequest.data);
    }
  };

  getCoupons = () => {
    return this.coupons;
  };

  redeemCoupon = async coupon_id => {
    try {
      const request: any = await CallServerPromise.redeem_coupon(coupon_id);
      if (request.success) {
        return {result: true, data: request.data};
      } else {
        return {
          result: false,
          error_message:
            request.error || strings.COUPONS.COUPON_SCREEN.ERROR_WHILE_REDEEM,
          code: request.code,
        };
      }
    } catch (error) {
      return {
        result: false,
        error_message: strings.COUPONS.COUPON_SCREEN.ERROR_WHILE_REDEEM,
      };
    }
  };

  loadObtainedCoupons = async (loadMore: boolean = false, skip: any = 0) => {
    try {
      const request = await CallServerPromise.get_used_coupons(
        loadMore ? skip : undefined,
      );
      if (request.success) {
        if (this.obtained_coupons && loadMore) {
          this.obtained_coupons = this.obtained_coupons.concat(request.data);
        } else {
          this.obtained_coupons = request.data;
        }
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  async loadObtainedCouponsAndPrizes(
    loadMore: boolean = false,
    skipInfo: any = {},
    getDataCallback = undefined,
  ) {
    try {
      const couponRequest = await CallServerPromise.get_used_coupons(
        loadMore ? skipInfo.couponSkip : undefined,
      );
      const prizeRequest = await CallServerPromise.get_used_prizes(
        loadMore ? skipInfo.prizeSkip : undefined,
      );
      if (couponRequest.success && prizeRequest.success) {
        const obtainedCouponsAndPrizes = []
          .concat(couponRequest.data)
          .concat(prizeRequest.data);
        getDataCallback &&
          getDataCallback({
            couponsCount: couponRequest.data.length,
            prizesCount: prizeRequest.data.length,
          });
        if (this.obtained_coupons && loadMore) {
          this.obtained_coupons = this.obtained_coupons.concat(
            obtainedCouponsAndPrizes,
          );
        } else {
          this.obtained_coupons = obtainedCouponsAndPrizes;
        }
        return true;
      }
      return false;
    } catch (error) {
      console.log('error on loadObtainedCouponsAndPrizes', error);
      return false;
    }
  }

  loadMarkUnusedCoupons = async (loadMore: boolean = false, skip: any = 0) => {
    try {
      const request = await CallServerPromise.get_used_coupons_marked_unused(
        loadMore ? skip : undefined,
      );
      if (request.success) {
        if (this.mark_unused_coupons && loadMore) {
          this.mark_unused_coupons = this.mark_unused_coupons.concat(
            request.data,
          );
        } else {
          this.mark_unused_coupons = request.data;
        }
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  loadMarkUsedCoupons = async (loadMore: boolean = false, skip: any = 0) => {
    try {
      const request = await CallServerPromise.get_used_coupons_marked_used(
        loadMore ? skip : undefined,
      );
      if (request.success) {
        if (this.mark_used_coupons && loadMore) {
          this.mark_used_coupons = this.mark_used_coupons.concat(request.data);
        } else {
          this.mark_used_coupons = request.data;
        }
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  getObtainedCoupons = () => {
    return this.obtained_coupons;
  };

  getMarkUsedCoupons = () => {
    return this.mark_used_coupons;
  };

  getMarkUnusedCoupons = () => {
    return this.mark_unused_coupons;
  };
}

export default new CouponsManager();
