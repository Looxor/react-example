import { CallServerPromise } from "../../../utils/app/CallServer";

class NextData {
  skip: number = 0;
  limit: number = 0;

  constructor(params) {
    const {skip, limit} = params;
    skip && (this.skip = skip);
    limit && (this.limit = limit);
  }
}

class UsedCouponsManager {
  private params: {
    skip: number;
    limit: number;
  } = {
    skip: null,
    limit: null,
  };

  private usedCoupons: Array<any> = [];
  private nextData: NextData;

  initialize() {
    this.usedCoupons = [];
    this.nextData = null;
  }

  setSkipParams(params, newParams) {
    if (params.skip) newParams.skip = params.skip;
    if (params.limit) newParams.limit = params.limit;
  }

  validParams(loadMore: boolean = false) {
    const params = this.params;
    const newParams = {};
    if (loadMore && this.nextData) {
      this.setSkipParams(this.nextData, newParams);
    }
    for (const key in params) {
      if (params[key]) newParams[key] = params[key];
    }
    return this.nextData;
  }

  async exec(loadMore: boolean = false) {
    try {
      if (!loadMore) {
        this.params.skip = 0;
      }
      let result: any;
      result = await CallServerPromise.get_used_coupons_old(
        this.validParams(loadMore),
      );
      return await this.analyzeResult(result, loadMore);
    } catch (error) {
      await this.showErrorPopup(error);
      return false;
    }
  }

  async analyzeResult(
    result: any,
    loadMore: boolean = false,
  ): Promise<boolean> {
    if (result.success) {
      if (!loadMore) {
        this.usedCoupons = [];
      }

      result.data &&
        result.data.map(usedCoupon => {
          this.usedCoupons.push(usedCoupon);
        });
      this.nextData = new NextData({skip: this.usedCoupons.length, limit: 20});
      return true;
    } else {
      await this.showErrorPopup(result);
      return false;
    }
  }

  getUsedCoupons() {
    return this.usedCoupons;
  }

  async showErrorPopup(error) {}
}

export default new UsedCouponsManager();
