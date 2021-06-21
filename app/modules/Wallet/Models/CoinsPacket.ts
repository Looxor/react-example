import ModelBase from "../../_CommonModels/ModelBase";

class CoinsPacket extends ModelBase {
  coins: number = 0;
  coins_packet_id: string = '';
  description: string = '';
  image_url: string = '';
  inapp: any = {};
  name: string = '';
  web: object = {};
  discounts: Array<object> = [];

  constructor(params: any = {}) {
    super(params);
    this.coins = params.coins ?? '';
    this.coins_packet_id = params.coins_packet_id ?? '';
    this.description = params.description ?? '';
    this.image_url = params.image_url ?? '';
    this.inapp = params.inapp ?? {};
    this.name = params.name ?? '';
    this.web = params.web ?? {};
  }

  calculateDiscounts() {
    const display_variation = [...this.inapp.eur.display_variation];
    let prev_price = this.inapp.eur.price / 100;
    this.discounts = [];
    while (display_variation.length > 0) {
      const variation = display_variation.pop();
      const desc = variation['description'];
      const percentage = variation['percentage'];
      const price = prev_price / (1 + percentage);
      this.discounts.unshift({price, desc, percentage});
      prev_price = price;
    }
  }
}

export default CoinsPacket;
