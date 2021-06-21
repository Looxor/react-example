import Test from "../../Models/Test";
import { CallServerPromise } from "../../../../utils/app/CallServer";

export const TestCase = {
  FIRST: 1,
  NOT_FIRST: 2,
};

export const TestCreateMode = {
  M_2_4: 1,
  M_3_2: 2,
  M_3_3: 3,
};

export const TestEvent = {
  onCreatedTestInstance: 'onCreatedTestInstance',
};

class TestManager {
  test: Test;
  test_case: number;
  testCreateMode: number;
  user_coins: number = 0;

  // Callback functions
  private onCreatedCallback: Function;

  private _events: any = {};

  constructor() {
    this.onCreatedCallback = null;
  }

  init(test) {
    this.test = new Test(test);
  }

  async initById(test_id) {
    try {
      const request = await CallServerPromise.get_test(test_id);
      if (request.success) {
        this.init(request.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  bindEvent(eventName, eventCallback) {
    this._events[eventName] = eventCallback;
  }

  emitEvent(eventName, args = {}) {
    typeof this._events[eventName] === 'function' &&
      this._events[eventName](args);
  }
}

export default new TestManager();
