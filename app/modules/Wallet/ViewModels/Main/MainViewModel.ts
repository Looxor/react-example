import { useViewModel, ViewModelBase } from "../../../_CommonModels/ViewModelBase";
import { CallServerPromise } from "../../../../utils/app/CallServer";
import showError, { ERROR_TYPE } from "../../CommonFunctions/showError";
import { refreshTotalCoins } from "../../../Home/HomeScreen";
import standardFunctions from "../../../../utils/app/StandardFunctions";

class MainViewModel extends ViewModelBase {
  coinsTransactions: Array<object> = [];
  refreshing: boolean = false;
  loading: boolean = false;

  constructor() {
    super();
  }

  async onRefresh() {
    this.refreshing = true;
    await refreshTotalCoins();
    this.loadCoinsTransactions().then(() => {
      this.refreshing = false;
      this.updateView();
    });
  }

  processData() {
    this.coinsTransactions = this.coinsTransactions.map((coin: any) => {
      return {
        date: standardFunctions.convert_date_from_rfc_to_string(
          coin.date,
          true,
        ),
        desc: coin.description,
        coins: coin.coins,
      };
    });
  }

  async loadCoinsTransactions() {
    try {
      this.loading = true;
      this.updateView();
      const request = await CallServerPromise.get_coins_transactions_old();
      if (request.success) {
        this.coinsTransactions = request.data;
        this.processData();
      } else {
        await showError(ERROR_TYPE.ERROR_GETTING_COINS_TRANSACTIONS);
      }
      this.loading = false;
      this.updateView();
    } catch (error) {
      await showError(ERROR_TYPE.ERROR_UNKNOWN);
      this.loading = false;
      this.updateView();
    }
  }

  componentDidMount() {
    this.loadCoinsTransactions().then(r => r);
  }

  componentWillUnmount() {}
}

export default useViewModel(new MainViewModel());
