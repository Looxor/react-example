import React from "react";
import { CallServerPromise } from "../../../../../utils/app/CallServer";
import showError, { ERROR_TYPE } from "../../../CommonFunctions/showError";
import { Observable, useViewModel, ViewModelBase } from "../../../../_CommonModels/ViewModelBase";
import { routes } from "../../../../../navigation/rootNavigation/navigation.constants";
import TestManager from "../../_Common/TestManager";
import NavigationService from "../../../../../utils/app/NavigationService";

class TestView extends ViewModelBase {
  refreshing: boolean = false;
  loaded: boolean = false;
  new_created_test_name: string;
  flatListRef: any;
  testInterval: any;
  test_instances: Observable;
  testNamesList: Array<string> = [];

  constructor() {
    super();
    this.test_instances = new Observable(this, 'test_instances', []);
  }

  dataLoaded() {
    return this.test_instances.getValue().length > 0;
  }

  onWaiting() {
    return this.test_instances.getValue().length == 0 && !this.loaded;
  }

  dataLoadedButNothing() {
    return this.loaded && this.test_instances.getValue().length === 0;
  }

  async loadTestInstances() {
    try {
      const request = await CallServerPromise.get_bought_test_instances();
      if (request.success && request.data) {
        this.loaded = true;
        this.refreshing = false;
        await this.test_instances.setValue(request.data);
      } else {
        console.log('error on request', request);
        await showError(ERROR_TYPE.ERROR_WHILE_GETTING_DATA);
        this.loaded = true;
        this.refreshing = false;
        this.updateView();
      }
    } catch (error) {
      console.log('error on requesting', error);
      await showError(ERROR_TYPE.ERROR_WHILE_GETTING_DATA);
      this.loaded = true;
      this.refreshing = false;
      this.updateView();
    }
  }

  async onRefresh() {
    this.refreshing = true;
    this.updateView();
    await this.loadTestInstances();
  }

  onChangeVariable() {
    this.testNamesList = [];
  }

  async onCreatedTestInstance({test_name}) {
    this.new_created_test_name = test_name;
    // await this.loadTestInstances();
    setTimeout(() => {
      const test_names = [];
      this.test_instances
        .getValue()
        .map(
          instance =>
            test_names.indexOf(instance.test_name) === -1 &&
            test_names.push(instance.test_name),
        );
      const index = test_names.indexOf(this.new_created_test_name);
      if (index > -1) {
        this.flatListRef.current.scrollToIndex({
          animated: true,
          index: String(index),
        });
        this.updateView();
      }
    }, 100);
    setTimeout(() => {
      this.new_created_test_name = '';
      this.updateView();
    }, 6000);
  }

  async getUserTotalCoins() {
    try {
      const request = await CallServerPromise.get_user_total_coins();
      if (request.success) return request.data.total_coins;
      return 0;
    } catch (error) {
      return 0;
    }
  }

  componentDidMount() {
    this.loaded = false;
    this.loadTestInstances().then(r => r);
    this.getUserTotalCoins().then(coins => {
      TestManager.user_coins = coins;
    });
  }

  componentWillUnmount() {
    clearInterval(this.testInterval);
  }
}

export class TestItemView {
  onPressResult({navigation, test_id}) {
    NavigationService.navigate(routes.TEST_NAVIGATOR, {
      screen: routes.TEST_RESULT_HOME,
      params: {test_id},
    });
  }

  onPressSimulate(navigation, test_instance, test_name) {
    NavigationService.navigate(routes.TEST_NAVIGATOR, {
      screen: routes.TEST_INSTANCE_MENU,
      params: {
        test_id: test_instance.test_id,
        test_name,
      },
    });
  }
}

export default useViewModel(new TestView());
