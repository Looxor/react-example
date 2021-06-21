import { useViewModel, ViewModelBase } from "../../../../_CommonModels/ViewModelBase";
import { CallServerPromise } from "../../../../../utils/app/CallServer";
import CoinsPacket from "../../../Models/CoinsPacket";
import showError, { ERROR_TYPE } from "../../../CommonFunctions/showError";
import CacheManager from "../../../../../utils/app/CacheManager";
import * as RNIap from "react-native-iap";
import { Product } from "react-native-iap";
import { Platform } from "react-native";
import { refreshTotalCoins } from "../../../../Home/HomeScreen";
import standardFunctions from "../../../../../utils/app/StandardFunctions";
import { strings } from "../../../../../config";

class CoinsTabViewModel extends ViewModelBase {
  coins_packets: Array<CoinsPacket> = [];
  loading: boolean = false;
  refreshing: boolean = false;
  is_buying: boolean = false;
  items_skus: Array<string> = [];
  products: Product[];

  constructor() {
    super();
    this.coins_packets = CacheManager.get('coins_packets') || [];
  }

  loadPacketsIAP = async coins_packets => {
    let _this = this;
    coins_packets.forEach(function (coins_packet) {
      _this.items_skus.push(coins_packet.coins_packet_id);
    });
    try {
      await RNIap.initConnection();
      this.products = await RNIap.getProducts(this.items_skus);
      console.log(this.products);
      await RNIap.endConnection();
    } catch (err) {}
  };

  dataLoadedWithData() {
    return !this.loading && this.coins_packets.length > 0;
  }

  dataLoadedWithoutData() {
    return !this.loading && this.coins_packets.length === 0;
  }

  onRefresh() {
    this.refreshing = true;
    this.loadCoinsPackets().then(r => r);
  }

  async loadCoinsPackets() {
    try {
      this.loading = true;
      this.updateView();
      const request = await CallServerPromise.get_coins_packets();
      if (request.success) {
        if (request.data && request.data.length != undefined) {
          const coins_packets = request.data;
          this.coins_packets = (coins_packets || []).map(data => {
            const coins_packet = new CoinsPacket(data);
            coins_packet.calculateDiscounts();
            return coins_packet;
          });
          this.loadPacketsIAP(this.coins_packets);
          CacheManager.set('coins_packets', coins_packets);
        }
      } else {
        await showError(ERROR_TYPE.ERROR_GETTING_COINS_PACKETS);
      }
      this.loading = false;
      this.refreshing = false;
      this.updateView();
    } catch (error) {
      this.loading = false;
      this.refreshing = false;
      this.updateView();
    }
  }

  startBuying() {
    this.is_buying = true;
    this.updateView();
  }

  endBuying() {
    this.is_buying = false;
    this.updateView();
  }

  async onPressPacket(coins_packet_id) {
    if (this.is_buying) {
      return;
    } else this.startBuying();
    try {
      await RNIap.initConnection();
      await RNIap.requestPurchase(coins_packet_id)
        .then(async purchase => {
          const receipt = purchase.transactionReceipt;
          if (receipt) {
            try {
              const request: any = await CallServerPromise.validate_receipt(
                purchase.transactionReceipt,
              );
              if (request.success) {
                await RNIap.finishTransaction(purchase, true);
                refreshTotalCoins();
                standardFunctions.show_alert(
                  strings.WALLET.SHOP.SUCCESSFULL_TRANSACTION.TITLE,
                  strings.WALLET.SHOP.SUCCESSFULL_TRANSACTION.MESSAGE,
                );
              } else {
                let error = request.error;
                console.log(error);
                if (error == 'already validated') {
                  if (Platform.OS === 'ios') {
                    await RNIap.finishTransactionIOS(purchase.transactionId);
                    await RNIap.clearTransactionIOS();
                  } else if (Platform.OS === 'android') {
                    await RNIap.acknowledgePurchaseAndroid(
                      purchase.purchaseToken,
                    );
                  }
                } else {
                  standardFunctions.show_alert(
                    strings.WALLET.SHOP.TRANSACTION_ERROR.TITLE,
                    strings.WALLET.SHOP.TRANSACTION_ERROR.MESSAGE,
                  );
                }
              }
              this.endBuying();
            } catch (ackErr) {
              console.log(ackErr);
              standardFunctions.show_alert(
                strings.WALLET.SHOP.CANNOT_BUY_PRODUCT.TITLE,
                strings.WALLET.SHOP.CANNOT_BUY_PRODUCT.MESSAGE,
              );
              await RNIap.endConnection();
              this.endBuying();
            }
          }
        })
        .catch(error => {
          console.log(error.code);
          if (error.code !== 'E_USER_CANCELLED') {
            standardFunctions.show_alert(
              strings.WALLET.SHOP.CANNOT_BUY_PRODUCT.TITLE,
              strings.WALLET.SHOP.CANNOT_BUY_PRODUCT.MESSAGE,
            );
          }
          RNIap.endConnection();
          this.endBuying();
        });
    } catch (err) {
      console.warn(err);
      standardFunctions.show_alert(
        strings.WALLET.SHOP.CANNOT_BUY_PRODUCT.TITLE,
        strings.WALLET.SHOP.CANNOT_BUY_PRODUCT.MESSAGE,
      );
      RNIap.endConnection();
      this.endBuying();
    }
  }

  componentDidMount() {
    this.loadCoinsPackets().then(r => r);
  }

  componentWillUnmount() {}
}

export default useViewModel(new CoinsTabViewModel());
