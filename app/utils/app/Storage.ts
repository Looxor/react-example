import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {
  async set(key, value) {
    const _value = JSON.stringify(value);
    await AsyncStorage.setItem(key, _value);
  }

  async get(key) {
    return JSON.parse(await AsyncStorage.getItem(key));
  }
}

export default new Storage();
