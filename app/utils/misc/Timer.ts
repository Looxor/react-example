class Timer {
  onHandler: any;
  eventFlag: boolean = false;
  interval: number = 1000;
  count: number = 0;
  maxCount: number = 1800;

  constructor(interval = 1000) {
    this.interval = interval;
  }

  async delay() {
    return new Promise((resolve, eject) => {
      setTimeout(() => {
        resolve(true);
      }, this.interval);
    });
  }

  setInterval(interval) {
    this.interval = interval;
  }

  on(onHandler) {
    this.onHandler = onHandler;
  }

  async start() {
    if (this.onHandler) {
      this.eventFlag = true;
      while (this.eventFlag) {
        await this.onHandler();
        await this.delay();
        if (this.count++ > this.maxCount) break;
      }
    }
  }

  stop() {
    this.eventFlag = false;
  }
}

const delay = (timeout, getTimeoutId = undefined) =>
  new Promise((resolve, eject) => {
    const timeoutId = setTimeout(() => {
      resolve(true);
    }, timeout);
    getTimeoutId && getTimeoutId(timeoutId);
  });

export default Timer;
export {delay};
