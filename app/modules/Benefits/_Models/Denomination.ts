import ModelBase from "../../_CommonModels/ModelBase";
import Payment from "./Payment";

class Denomination extends ModelBase {
  is_highlighted: boolean = false;
  name: string = '';
  payments: Array<Payment> = [];
  priority: number = 0;
  denomination_number: number = 0;

  constructor(params: any = {}) {
    super(params);
    this.is_highlighted = params.is_highlighted;
    this.name = params.name || '';
    this.payments = params.payments
      ? params.payments.map(payment => new Payment(payment))
      : [];
    this.priority = params.priority || 0;
    this.denomination_number =
      params.denomination_number !== undefined
        ? params.denomination_number
        : -1;
  }

  isCoinAvailable() {
    return (
      this.payments && this.payments.some(payment => payment.isCoinAvailable())
    );
  }

  isEuroAvailable() {
    return (
      this.payments && this.payments.some(payment => payment.isEuroAvailable())
    );
  }

  isCoinEuroAvailable() {
    return (
      this.payments &&
      this.payments.some(payment => payment.isCoinEuroAvailable())
    );
  }
}

export default Denomination;
