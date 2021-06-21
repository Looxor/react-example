import ModelBase from "../../_CommonModels/ModelBase";
import Partner from "./Partner";
import Storage from "../../../utils/app/Storage";

type COUPON_TYPE = 'sconti' | 'giftcard';
type CASHBACK_OR_MULTIPLE_TYPE = 'is_cashback' | 'is_multiple_use';

class CouponPrizesFilterManager extends ModelBase {
  partners: Array<Partner> = [];
  selectedPartners: Array<Partner> = [];
  couponTypes: Array<COUPON_TYPE> = ['sconti', 'giftcard'];
  selectedCouponTypes: Array<COUPON_TYPE> = [];
  cashbackOrMultipleCoupons: Array<CASHBACK_OR_MULTIPLE_TYPE> = [];
  selectedCashbackOrMultipleCoupons: Array<CASHBACK_OR_MULTIPLE_TYPE> = [];
  showOnlyNew: boolean = false;
  private partnerIds: string = ',';

  constructor() {
    super({});
    this.couponTypes = ['sconti', 'giftcard'];
    this.selectedCouponTypes = [];
    this.cashbackOrMultipleCoupons = [];
    this.selectedCashbackOrMultipleCoupons = [];
  }

  setPartners(partner_id, partner_name) {
    if (partner_id && this.partnerIds.indexOf(partner_id) === -1) {
      this.partners.push(new Partner(partner_id, partner_name));
      this.partnerIds += partner_id + ',';
    }
  }

  clearPartners() {
    this.partnerIds = ',';
    this.partners = [];
    this.selectedPartners = [];
  }

  getPartners() {
    return this.partners;
  }

  setSelectedPartners(selectedPartners) {
    this.selectedPartners = selectedPartners;
  }

  getSelectedPartners() {
    if (this.selectedPartners.length === 0) {
      this.setAllSelectedPartners();
    }
    return this.selectedPartners;
  }

  getSelectedPartnerIds() {
    return this.selectedPartners.map(partner => partner.partner_id).join(',');
  }

  setAllSelectedPartners() {
    this.selectedPartners = [];
  }

  setSelectedCouponTypes(couponTypes) {
    this.selectedCouponTypes = couponTypes;
  }

  setSelectedCashbackOrMultipleCoupons(cashbackOrMultiple) {
    this.selectedCashbackOrMultipleCoupons = cashbackOrMultiple;
  }

  getCouponTypes() {
    return this.couponTypes;
  }

  getSelectedCouponTypes() {
    return this.selectedCouponTypes;
  }

  getCashbackOrMultipleCoupons() {
    return this.cashbackOrMultipleCoupons;
  }

  getSelectedCashbackOrMultipleCoupons() {
    return this.selectedCashbackOrMultipleCoupons;
  }

  needsAllCouponType() {
    return (
      !this.needsScontiCouponType() &&
      !this.needsGiftCardCouponType() &&
      !this.needsCashbackType() &&
      !this.needsMultipleUseType()
    );
  }

  needsScontiCouponType() {
    return this.selectedCouponTypes.indexOf('sconti') > -1;
  }

  needsGiftCardCouponType() {
    return this.selectedCouponTypes.indexOf('giftcard') > -1;
  }

  needsCashbackType() {
    return this.selectedCashbackOrMultipleCoupons.indexOf('is_cashback') > -1;
  }

  needsMultipleUseType() {
    return (
      this.selectedCashbackOrMultipleCoupons.indexOf('is_multiple_use') > -1
    );
  }

  setShowOnlyNew(showOnlyNew) {
    this.showOnlyNew = showOnlyNew;
  }

  getShowOnlyNew() {
    return this.showOnlyNew;
  }

  async markCouponPrizeAsSeen(couponPrize_id) {
    const seenCouponPrizes = await this.getSeenCouponPrizes();
    await Storage.set(
      'seenCouponPrizes',
      seenCouponPrizes + ',' + couponPrize_id,
    );
  }

  async getSeenCouponPrizes() {
    return (await Storage.get('seenCouponPrizes')) || '';
  }

  resetFilters() {
    this.setAllSelectedPartners();
    this.selectedCouponTypes = [];
    this.selectedCashbackOrMultipleCoupons = [];
    this.setShowOnlyNew(false);
  }
}

export default new CouponPrizesFilterManager();
