import { useViewModel, ViewModelBase } from "../../../../_CommonModels/ViewModelBase";
import { CallServerPromise } from "../../../../../utils/app/CallServer";
import CoinsPacket from "../../../Models/CoinsPacket";
import showError, { ERROR_TYPE } from "../../../CommonFunctions/showError";
import CacheManager from "../../../../../utils/app/CacheManager";
import PurchaseTransaction from "../../../Models/PurchaseTransaction";

class HistoryTabViewModel extends ViewModelBase {
  purchase_transactions: Array<CoinsPacket> = [];
  loading: boolean = false;
  refreshing: boolean = false;

  constructor() {
    super();
    this.purchase_transactions =
      CacheManager.get('purchase_transactions') || [];
  }

  dataLoadedWithData() {
    return !this.loading && this.purchase_transactions.length > 0;
  }

  dataLoadedWithoutData() {
    return !this.loading && this.purchase_transactions.length === 0;
  }

  onRefresh() {
    this.refreshing = true;
    this.loadPurchaseTransactions().then(r => r);
  }

  async loadPurchaseTransactions() {
    try {
      this.loading = true;
      this.updateView();
      const request =
        await CallServerPromise.get_inapp_coins_purchases_transactions();
      if (request.success) {
        if (request.data && request.data.length != undefined) {
          const purchase_transactions = request.data;
          this.purchase_transactions = (purchase_transactions || []).map(
            data => {
              const purchase_transaction = new PurchaseTransaction(data);
              purchase_transaction.calculateDiscounts();
              return purchase_transaction;
            },
          );
          CacheManager.set('purchase_transactions', purchase_transactions);
        }
      } else {
        await showError(ERROR_TYPE.ERROR_GETTING_PURCHASE_TRANSACTIONS);
      }
      this.loading = false;
      this.refreshing = false;
      this.updateView();
    } catch (error) {
      await showError(ERROR_TYPE.ERROR_UNKNOWN);
      this.loading = false;
      this.refreshing = false;
      this.updateView();
    }
  }

  componentDidMount() {
    this.loadPurchaseTransactions().then(r => r);
  }

  componentWillUnmount() {}
}

export default useViewModel(new HistoryTabViewModel());
