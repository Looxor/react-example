import ModelBase from "../../_CommonModels/ModelBase";

class PurchaseTransaction extends ModelBase {
  coins_packet_coins: number = 0;
  coins_packet_description: string = '';
  coins_packet_id: string = '';
  coins_packet_image_url: string = '';
  coins_packet_inapp: any = {};
  coins_packet_name: string = '';
  date: string = '';
  inapp_coins_purchase_id: string = '';
  last_update_date: string = '';
  platform: string = '';
  purchase_uuid: string = '';
  user_id: string = '';
  discounts: Array<object> = [];

  constructor(params: any = {}) {
    super(params);
    this.coins_packet_coins = params.coins_packet_coins ?? 0;
    this.coins_packet_description = params.coins_packet_description ?? '';
    this.coins_packet_id = params.coins_packet_id ?? '';
    this.coins_packet_image_url = params.coins_packet_image_url ?? '';
    this.coins_packet_inapp = params.coins_packet_inapp ?? {};
    this.coins_packet_name = params.coins_packet_name ?? '';
    this.date = params.date ?? '';
    this.inapp_coins_purchase_id = params.inapp_coins_purchase_id ?? '';
    this.last_update_date = params.last_update_date ?? '';
    this.platform = params.platform ?? '';
    this.purchase_uuid = params.purchase_uuid ?? '';
    this.user_id = params.user_id ?? '';
  }

  calculateDiscounts() {
    const display_variation = [
      ...this.coins_packet_inapp.eur.display_variation,
    ];
    let prev_price = this.coins_packet_inapp.eur.price / 100;
    this.discounts = [];
    while (display_variation.length > 0) {
      const variation = display_variation.pop();
      const price = prev_price / (1 + variation['percentage']);
      this.discounts.unshift({price});
      prev_price = price;
    }
  }
}

export default PurchaseTransaction;
