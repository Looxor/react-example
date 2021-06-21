class Numbers {
  round(value, ndigit = 0) {
    const divider = Math.pow(10, ndigit);
    return Math.round(value * divider) / divider;
  }

  toPunctuatedNumber(num, comma = ',') {
    const s = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1_COMMA_');
    return s.replace(/_COMMA_/g, comma);
  }

  toFixedForEU(num = 0, ndigit = 0) {
    try {
      return num.toFixed(ndigit).replace(/\./g, ',');
    } catch (e) {
      return 0;
    }
  }

  fixedNumber(number) {
    return Math.floor(number);
  }

  decimalNumber(number) {
    const number2 = this.round(number - this.fixedNumber(number), 2);
    return number2.toString().substr(1);
  }
}

export default new Numbers();
