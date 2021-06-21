import ModelBase from "../../_CommonModels/ModelBase";

class Condition extends ModelBase {
  action: string = '';
  action_title: string = '';
  description: string = '';
  title: string = '';
  message: string = '';
  name: string = '';
  satisfied: boolean = false;

  constructor(params: any = {}) {
    super(params);
    this.action = params.action || '';
    this.action_title = params.action_title || '';
    this.description = params.description || '';
    this.title = params.title || '';
    this.message = params.message || '';
    this.name = params.name || '';
    this.satisfied = params.satisfied;
  }
}

class Payment extends ModelBase {
  allow_non_students: boolean = false;
  coins_requirement: number = 0;
  conditions: Array<Condition> = [];
  currencies: any;
  finish_date: string = '';
  is_valid: boolean = false;
  priority: number = 0;
  payment_number: number = 0;
  start_date: string = '';
  title: string = '';

  constructor(params: any = {}) {
    super(params);
    this.allow_non_students = params.allow_non_students;
    this.coins_requirement = params.coins_requirement || 0;
    this.payment_number =
      params.payment_number !== undefined ? params.payment_number : -1;
    this.conditions = params.conditions
      ? params.conditions.map(condition => new Condition(condition))
      : [];
    this.currencies = params.currencies;
    this.finish_date = params.finish_date || '';
    this.is_valid = params.is_valid;
    this.priority = params.priority || 0;
    this.start_date = params.start_date || '';
    this.title = params.title || '';
  }

  isCoinAvailable() {
    return (
      this.coins_requirement >= 0 && Object.keys(this.currencies).length === 0
    );
  }

  isEuroAvailable() {
    return (
      this.coins_requirement === 0 && Object.keys(this.currencies).length !== 0
    );
  }

  isCoinEuroAvailable() {
    return (
      this.coins_requirement > 0 && Object.keys(this.currencies).length !== 0
    );
  }

  isAllSatisfied() {
    return (
      this.conditions &&
      !this.conditions.some(condition => condition.satisfied === false)
    );
  }

  getCurrencyNames() {
    return this.currencies ? Object.keys(this.currencies) : [];
  }
}

export default Payment;
