import { CallServerPromise } from "../../../utils/app/CallServer";
import BestOfModel from "./BestOf";
import { refreshTotalCoins } from "../../Home/HomeScreen";
import { loadCouponList, loadObtainedCouponList } from "../../Benefits/_ReduxStore/_actions";
import { store } from "../../../config/redux/store";

class BestOfManager {
  /// Demo Data
  besOfData: BestOfModel;
  missingData: any = {};
  cache: true;

  constructor() {}

  init(bestOfData) {
    this.besOfData = new BestOfModel(bestOfData);
  }

  async initById(bestof_id) {
    try {
      const request = await CallServerPromise.get_bestof_data(bestof_id);
      if (request.success) {
        this.init(request.data);
      } else {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  getBestOf() {
    return this.besOfData;
  }

  getBestOfId() {
    if (!this.besOfData) return '';
    return this.besOfData.bestof_id;
  }

  cacheMissingDataFromServer(bestof_id, key_values) {
    this.missingData[bestof_id] = this.missingData[bestof_id] || {};
    key_values.map(
      key_value =>
        (this.missingData[bestof_id][key_value['key']] = key_value['value']),
    );
  }

  setValuesWithCachedMissingData(bestof_id) {
    const missingData = this.missingData[bestof_id];
    for (const key in missingData) {
      if (missingData.hasOwnProperty(key)) {
        const value = missingData[key];
        // if (value || this.besOfData[key])
        this.besOfData[key] = value;
      }
    }
  }

  getCachedMissingData(bestof_id, key) {
    return this.missingData[bestof_id] && this.missingData[bestof_id][key];
  }

  async startRound(bestof_id) {
    try {
      const request = await CallServerPromise.start_round(bestof_id);
      return request;
    } catch (error) {
      return error;
    }
  }

  async finishRound(bestof_id, round_string) {
    try {
      const request = await CallServerPromise.finish_round(
        bestof_id,
        round_string,
      );
      return request;
    } catch (error) {
      return error;
    }
  }

  async rejecthBestOf(bestof_id) {
    try {
      const request = await CallServerPromise.reject_bestof(bestof_id);
      if (request.success && (request.data === 'ok' || request.data.ok)) {
        await store.dispatch(loadCouponList());
        await store.dispatch(loadObtainedCouponList());
        await refreshTotalCoins();
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async getCoinsInformation(bestof_id) {
    try {
      const total_coins = await this.getUserTotalCoins(),
        max_coins = await this.getMaxCoins(),
        obtained_coins = await this.getCoinsInTransactions(bestof_id);
      return {
        total_coins,
        max_coins,
        obtained_coins,
      };
    } catch (error) {
      return {
        total_coins: 0,
        max_coins: 1,
        obtained_coins: 0,
      };
    }
  }

  async getMaxCoins() {
    try {
      const request = await CallServerPromise.get_max_coins();
      if (request.success) return request.data;
      return 1;
    } catch (error) {
      return 1;
    }
  }

  async getUserTotalCoins() {
    try {
      const request = await CallServerPromise.get_user_total_coins();
      if (request.success) return request.data.total_coins;
      return 0;
    } catch (error) {
      return 0;
    }
  }

  async getCoinsInTransactions(bestof_id) {
    try {
      let obtained_coins = 0;
      const request = await CallServerPromise.get_coins_transactions_old();
      if (request.success) {
        const coins_array = request.data.filter(
          item => item.bestof_id === bestof_id,
        );
        if (coins_array.length > 0) {
          obtained_coins = coins_array[0].coins * coins_array[0].multiplier;
        }
      }
      return obtained_coins;
    } catch (error) {
      return 0;
    }
  }

  async getOngoingBestOfs() {
    try {
      const request = await CallServerPromise.get_ongoing_bestofs();
      if (request.success) return request.data;
      return [];
    } catch (error) {
      return [];
    }
  }

  async getLastBestOfsPlayed() {
    try {
      const request = await CallServerPromise.get_finished_bestofs_limited();
      if (request.success) return request.data;
      return [];
    } catch (error) {
      return [];
    }
  }

  async getWonLostCount() {
    const defaultData = {
      bestofs_lost_count: 0,
      bestofs_won_count: 0,
    };
    try {
      const request = await CallServerPromise.get_bestofs_won_or_lost_count();
      if (request.success) return request.data;
      return defaultData;
    } catch (error) {
      return defaultData;
    }
  }
}

export default new BestOfManager();
