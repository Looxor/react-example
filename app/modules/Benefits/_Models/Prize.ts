import ModelBase from "../../_CommonModels/ModelBase";
import Denomination from "./Denomination";
import { strings } from "../../../config";

class Prize extends ModelBase {
  data: any = {};
  denominations: Array<Denomination> = [];
  category: string = '';
  description: string = '';
  image_url: string = '';
  partner_id: string = '';
  partner_image_url: string = '';
  partner_name: string = '';
  priority: number = 0;
  prize_id: string = '';
  prize_purchase_id: string = '';
  title: string = '';
  denomDescription: string = '';
  usage_finish_date: string = '';
  prize_title: string = '';
  prize_partner_name: string = '';
  prize_image_url: string = '';
  prize_partner_image_url: string = '';

  coins: number = 0;
  currency: string = '';
  denomination_number: number = 0;
  marked_used: boolean = false;
  marked_used_date: string = '';
  payment_number: number = 0;
  price: number = 0;
  prize_category: string = '';
  prize_code: string = '';
  prize_denomination_name: string = '';
  prize_denomination_payment_allow_non_students: boolean = false;
  prize_denomination_payment_coins_requirement: number = 0;
  prize_denomination_payment_currencies: any = {};
  prize_denomination_payment_finish_date: string = '';
  prize_denomination_payment_is_amilon: boolean = false;
  prize_denomination_payment_link_text: string = '';
  prize_denomination_payment_start_date: string = '';
  prize_denomination_payment_title: string = '';
  prize_description: string = '';
  prize_partner_id: string = '';
  prize_text: string = '';
  redeem_date: string = '';
  stripe_session_id: string = '';
  to_be_used: boolean = false;
  usage_start_date: string = '';
  verified: boolean = false;
  view: string = '';
  seen: boolean = false;

  constructor(params: any = {}) {
    super(params);
    this.data = params;
    this.denominations = params.denominations
      ? params.denominations.map(denomination => new Denomination(denomination))
      : [];

    if (params.denominations && params.denominations.length !== 0) {
      const denominationMin = params.denominations.reduce(function (
        prev,
        current,
      ) {
        return prev.priority < current.priority ? prev : current;
      });

      const denominationMax = params.denominations.reduce(function (
        prev,
        current,
      ) {
        return prev.priority > current.priority ? prev : current;
      });

      this.denomDescription =
        denominationMin.priority === denominationMax.priority
          ? denominationMax.name
          : strings.OTHER.FROM +
            ' ' +
            denominationMin.name +
            ' ' +
            strings.OTHER.TO.toLowerCase() +
            ' ' +
            denominationMax.name;
    } else {
      this.denomDescription = '';
    }

    this.category = params.category || '';
    this.description = params.description || '';
    this.image_url = params.image_url || '';
    this.partner_id = params.partner_id || '';
    this.partner_image_url = params.partner_image_url || '';
    this.partner_name = params.partner_name || '';
    this.priority = params.priority || 0;
    this.prize_id = params.prize_id || '';
    this.prize_purchase_id = params.prize_purchase_id || '';
    this.title = params.title || '';

    this.prize_title = params.prize_title || '';
    this.prize_partner_name = params.prize_partner_name || '';
    this.prize_image_url = params.prize_image_url || '';
    this.prize_partner_image_url = params.prize_partner_image_url || '';
    this.usage_finish_date = params.usage_finish_date || '';

    this.coins = params.coins || 0;
    this.currency = params.currency || '';
    this.denomination_number = params.denomination_number || 0;
    this.marked_used = params.marked_used || false;
    this.marked_used_date = params.marked_used_date || '';
    this.payment_number = params.payment_number || 0;
    this.price = params.price || 0;
    this.prize_category = params.prize_category || '';
    this.prize_code = params.prize_code || '';
    this.prize_denomination_name = params.prize_denomination_name || '';
    this.prize_denomination_payment_allow_non_students =
      params.prize_denomination_payment_allow_non_students || false;
    this.prize_denomination_payment_coins_requirement =
      params.prize_denomination_payment_coins_requirement || 0;
    this.prize_denomination_payment_currencies =
      params.prize_denomination_payment_currencies || {};
    this.prize_denomination_payment_finish_date =
      params.prize_denomination_payment_finish_date || '';
    this.prize_denomination_payment_is_amilon =
      params.prize_denomination_payment_is_amilon || false;
    this.prize_denomination_payment_link_text =
      params.prize_denomination_payment_link_text || '';
    this.prize_denomination_payment_start_date =
      params.prize_denomination_payment_start_date || '';
    this.prize_denomination_payment_title =
      params.prize_denomination_payment_title || '';
    this.prize_description = params.prize_description || '';
    this.prize_partner_id = params.prize_partner_id || '';
    this.prize_text = params.prize_text || '';
    this.redeem_date = params.redeem_date || '';
    this.stripe_session_id = params.stripe_session_id || '';
    this.to_be_used = params.to_be_used || false;
    this.usage_start_date = params.usage_start_date || '';
    this.verified = params.verified || false;
    this.seen = params.seen || false;
    this.view = params.view || '';
  }

  includesIsHighlighted() {
    return (
      this.denominations &&
      this.denominations.some(
        denomination => denomination.is_highlighted === true,
      )
    );
  }

  isCoinAvailable() {
    return (
      this.denominations &&
      this.denominations.some(denomination => denomination.isCoinAvailable())
    );
  }

  isEuroAvailable() {
    return (
      this.denominations &&
      this.denominations.some(denomination => denomination.isEuroAvailable())
    );
  }

  isCoinEuroAvailable() {
    return (
      this.denominations &&
      this.denominations.some(denomination =>
        denomination.isCoinEuroAvailable(),
      )
    );
  }
}

export default Prize;
