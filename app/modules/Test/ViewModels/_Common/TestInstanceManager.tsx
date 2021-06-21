import TestInstance from "../../Models/TestInstance";

class TestInstanceManager {
  testInstance: TestInstance;
  data: any = {};

  init(testInstance) {
    this.testInstance = new TestInstance(testInstance);
  }

  getTestInstance() {
    return this.testInstance;
  }

  setData(key, value) {
    this.data[key] = value;
  }

  getData(key) {
    return this.data[key];
  }
}

export default new TestInstanceManager();
