import { DeviceEventEmitter } from "react-native";

const EV_STOP_ANIM_INTERVAL = 'stop_animation_interval';
const EV_START_ANIM_INTERVAL = 'start_animation_interval';

const EV_STOP_COUNTER_INTERVAL = 'stop_counter_interval';
const EV_START_COUNTER_INTERVAL = 'start_counter_interval';

class EventCenter {
  events = {};
  subscriptions = {};
  onceEvents = {};

  on(evName, callback) {
    this.subscriptions[evName] = DeviceEventEmitter.addListener(
      evName,
      callback,
    );
  }

  once(evName, callback) {
    this.subscriptions[evName] = DeviceEventEmitter.addListener(
      evName,
      callback,
    );
    this.onceEvents[evName] = true;
  }

  off(evName) {
    this.subscriptions[evName] &&
      DeviceEventEmitter.removeSubscription(this.subscriptions[evName]);
  }

  trigger(evName, params = []) {
    DeviceEventEmitter.emit(evName, params);
    if (this.onceEvents[evName] === true) {
      this.onceEvents[evName] = undefined;
      this.off(evName);
    }
  }
}

export default new EventCenter();
export {
  EV_STOP_ANIM_INTERVAL,
  EV_START_ANIM_INTERVAL,
  EV_STOP_COUNTER_INTERVAL,
  EV_START_COUNTER_INTERVAL,
};
