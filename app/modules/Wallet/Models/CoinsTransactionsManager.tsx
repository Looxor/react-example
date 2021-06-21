import { CallServerPromise } from "../../../utils/app/CallServer";
import standardFunctions from "../../../utils/app/StandardFunctions";

class NextData {
  skip: number = 0;
  limit: number = 0;

  constructor(params) {
    const {skip, limit} = params;
    skip && (this.skip = skip);
    limit && (this.limit = limit);
  }
}

class CoinsTransactionsManager {
  private params: {
    skip: number;
    limit: number;
  } = {
    skip: null,
    limit: null,
  };

  private coinsTransactions: Array<any> = [];
  private nextData: NextData;

  initialize() {
    this.coinsTransactions = [];
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
      result = await CallServerPromise.get_coins_transactions(
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
        this.coinsTransactions = [];
      }

      result.data &&
        result.data.map(coinsTransaction => {
          this.coinsTransactions.push({
            date: standardFunctions.convert_date_from_rfc_to_string(
              coinsTransaction.date,
              true,
            ),
            desc: coinsTransaction.description,
            coins: coinsTransaction.coins,
          });
        });
      this.nextData = new NextData({
        skip: this.coinsTransactions.length,
        limit: 20,
      });
      return true;
    } else {
      await this.showErrorPopup(result);
      return false;
    }
  }

  getCoinsTransactions() {
    return this.coinsTransactions;
  }

  async showErrorPopup(error) {}
}

export default new CoinsTransactionsManager();
