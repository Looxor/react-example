import { strings } from "../../../config";
import standardFunctions from "../../../utils/app/StandardFunctions";

export const COUPON_MODE = {
  USED: 0,
  UNUSED: 1,
};

class Coupon {
  coins_requirement: number = 0;
  conditions: any = {};
  count: number = 0;
  coupon_id: string = '';
  finish_date: string = '';
  image_url: string = '';
  is_valid: boolean;
  is_already_used: boolean = false;
  is_marked_as_used: boolean = false;
  limit: string = '';
  partner_id: string = '';
  partner_image_url: string = '';
  partner_name: string = '';
  start_date: string = '';
  text: string = '';
  title: string = '';
  usage_finish_date: string = '';
  usage_start_date: string = '';
  view: string = '';
  coupon_code: string = '';
  activation_barcode: string = '';
  link_text: string = '';
  nothing_message: string = '';
  timeout_text: string = '';
  marked_used: boolean = false;
  marked_used_date: string = '';
  seen: boolean = false;

  data: any = {};

  constructor(params) {
    this.data = params;

    params &&
      params.coins_requirement &&
      (this.coins_requirement = params && params.coins_requirement);
    params &&
      params.conditions &&
      (this.conditions = params && params.conditions);
    params && params.count && (this.count = params && params.count);
    params && params.coupon_id && (this.coupon_id = params && params.coupon_id);
    params &&
      params.finish_date &&
      (this.finish_date = params && params.finish_date);
    params && params.image_url && (this.image_url = params && params.image_url);
    params && params.is_valid && (this.is_valid = params && params.is_valid);
    params &&
      params.is_already_used &&
      (this.is_already_used = params && params.is_already_used);
    params &&
      params.is_marked_as_used &&
      (this.is_marked_as_used = params && params.is_marked_as_used);
    params && params.limit && (this.limit = params && params.limit);
    params &&
      params.partner_id &&
      (this.partner_id = params && params.partner_id);
    params &&
      params.partner_image_url &&
      (this.partner_image_url = params && params.partner_image_url);
    params &&
      params.partner_name &&
      (this.partner_name = params && params.partner_name);
    params &&
      params.start_date &&
      (this.start_date = params && params.start_date);
    params && params.text && (this.text = params && params.text);
    params && params.title && (this.title = params && params.title);
    params &&
      params.usage_finish_date &&
      (this.usage_finish_date = params && params.usage_finish_date);
    params &&
      params.usage_start_date &&
      (this.usage_start_date = params && params.usage_start_date);

    params && params.view && (this.view = params && params.view);
    params &&
      params.coupon_code &&
      (this.coupon_code = params && params.coupon_code);
    params &&
      params.activation_barcode &&
      (this.activation_barcode = params && params.activation_barcode);
    params && params.link_text && (this.link_text = params && params.link_text);
    params &&
      params.nothing_message &&
      (this.nothing_message = params && params.nothing_message);
    params &&
      params.timeout_text &&
      (this.timeout_text = params && params.timeout_text);

    params &&
      params.marked_used !== undefined &&
      (this.marked_used = params.marked_used);

    params &&
      params.marked_used_date !== undefined &&
      (this.marked_used_date = params.marked_used_date);

    params && params.seen !== undefined && (this.seen = params.seen);
    // params &&
    // params.to_be_used !== undefined &&
    // (this.marked_used = params && !params.to_be_used);
  }

  d(key) {
    return this.data[key];
  }

  isValid() {
    if (this.is_valid) {
      return true;
    }
    return false;
  }

  getConditionsOld() {
    return {
      already_used: {
        expected: false,
        message: strings.COUPONS.INVALID_REASONS.ALREADY_USED,
      },
      exclude_used: {
        expected: false,
        message: strings.COUPONS.INVALID_REASONS.EXCLUDE_USED,
      },
      previous_coupon_used: {
        expected: false,
        message: strings.COUPONS.INVALID_REASONS.PREVIOUS_COUPON_USED,
      },
      any_left: {
        expected: true,
        message: strings.COUPONS.INVALID_REASONS.ANY_LEFT,
      },
      coins_requirement: {
        expected: 3,
        message: strings.COUPONS.INVALID_REASONS.COINS_REQUIREMENT,
      },
      is_active: {
        expected: true,
        message: strings.COUPONS.INVALID_REASONS.IS_ACTIVE,
      },
      mcfit_trial_day_done: {
        expected: true,
        message: strings.COUPONS.INVALID_REASONS.MCFIT_TRIAL_DAY_DONE,
      },
      esselunga_verified_customer: {
        expected: true,
        message: strings.COUPONS.INVALID_REASONS.ESSELUNGA_VERIFIED_CUSTOMER,
      },
      obag_store_visited: {
        expected: true,
        message: strings.COUPONS.INVALID_REASONS.OBAG_STORE_VISITED,
      },
      epasta_restaurant_visited: {
        expected: true,
        message: strings.COUPONS.INVALID_REASONS.EPASTA_STORE_VISITED,
      },
      other: {
        message: strings.COUPONS.INVALID_REASONS.OTHER,
      },
    };
  }

  getConditions() {
    return this.conditions;
  }

  invalidReason() {
    const {
      any_left,
      coins_requirement,
      is_active,
      mcfit_trial_day_done,
      esselunga_verified_customer,
      obag_store_visited,
      epasta_restaurant_visited,
    } = this.conditions;

    const defaultReasons = this.getConditions();
    let reason = '';
    if (
      mcfit_trial_day_done &&
      mcfit_trial_day_done.actual !== mcfit_trial_day_done.expected
    ) {
      reason = defaultReasons.mcfit_trial_day_done.message;
    } else if (
      obag_store_visited &&
      obag_store_visited.actual !== obag_store_visited.expected
    ) {
      reason = defaultReasons.obag_store_visited.message;
    } else if (
      epasta_restaurant_visited &&
      epasta_restaurant_visited.actual !== epasta_restaurant_visited.expected
    ) {
      reason = defaultReasons.epasta_restaurant_visited.message;
    } else if (
      coins_requirement &&
      coins_requirement.actual <= coins_requirement.expected
    ) {
      reason = defaultReasons.coins_requirement.message;
    } else if (
      esselunga_verified_customer &&
      esselunga_verified_customer.actual !==
        esselunga_verified_customer.expected
    ) {
      reason = defaultReasons.esselunga_verified_customer.message;
    } else if (is_active && is_active.actual !== is_active.expected) {
      reason = defaultReasons.is_active.message.replace(
        '{start_date}',
        standardFunctions.convert_date_from_rfc_to_string(
          this.start_date,
          true,
        ),
      );
    } else if (any_left && any_left.actual !== any_left.expected) {
      reason = defaultReasons.any_left.message;
    } else reason = defaultReasons.other.message;

    return reason;
  }

  isAlreadyUsed() {
    return this.is_already_used;
  }

  isMarkedAsUsed() {
    return this.is_marked_as_used;
  }

  isFree() {
    return this.coins_requirement === 0;
  }

  getViewName() {
    return this.view;
  }
}

export default Coupon;
