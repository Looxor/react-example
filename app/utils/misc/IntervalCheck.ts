import differenceInMilliseconds from "date-fns/differenceInMilliseconds";

class IntervalCheck {
  private previousNow: Date;

  constructor() {
    this.passedLessThan = this.passedLessThan.bind(this);
  }

  passedLessThan(minInterval) {
    const now = new Date();
    const interval = differenceInMilliseconds(now, this.previousNow);
    this.previousNow = now;
    return interval < minInterval;
  }
}

export default IntervalCheck;
