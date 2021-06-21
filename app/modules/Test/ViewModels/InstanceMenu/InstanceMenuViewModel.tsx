import React from "react";
import { Observable, useViewModel, ViewModelBase } from "../../../_CommonModels/ViewModelBase";
import TestManager from "../_Common/TestManager";

const sortTestInstances = (testInstance1, testInstance2) => {
  if (testInstance1.type === testInstance2) {
    return 0;
  } else if (
    testInstance1.type === 'wayback' &&
    testInstance2.type === 'clone'
  ) {
    return -1;
  } else if (
    testInstance2.type === 'wayback' &&
    testInstance1.type === 'clone'
  ) {
    return 1;
  } else {
    return 0;
  }
};

class InstanceMenuViewModel extends ViewModelBase {
  loaded: boolean;
  test_name: string;
  test_instances: Observable;
  test_instances_filtered: [];
  new_instance_id: string;

  constructor() {
    super();
    this.test_instances = new Observable(this, 'test_instances', []);
    this.test_instances_filtered = [];
    this.loaded = false;
  }

  async loadTestInstances() {
    await TestManager.initById(this.params.test_id);
    const test_instances = this.test_instances.getValue();
    this.test_instances_filtered = test_instances
      .filter(test_instance => test_instance.test_name === this.test_name)
      .sort(sortTestInstances);
    this.loaded = true;
    this.updateView();
  }

  getTestInstancesFiltered() {
    return this.test_instances
      .getValue()
      .filter(test_instance => test_instance.test_name === this.test_name)
      .sort(sortTestInstances);
  }

  componentDidMount() {
    this.test_name = this.params.test_name;
    this.loaded = false;
    this.updateView();
    this.loadTestInstances();
  }

  componentWillUnmount() {}
}

export default useViewModel(new InstanceMenuViewModel());
