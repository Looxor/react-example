import React from "react";
import { CallServerPromise } from "../../../../utils/app/CallServer";
import showError, { ERROR_TYPE } from "../../CommonFunctions/showError";
import { useViewModel, ViewModelBase } from "../../../_CommonModels/ViewModelBase";
import { CommonActions as NavigationActions } from "@react-navigation/native";
import { routes } from "../../../../navigation/rootNavigation/navigation.constants";
import Simulation from "../../Models/Simulation";

class ResultViewModel extends ViewModelBase {
  refreshing: boolean = false;
  simulations: Array<{}> = [];
  loaded: boolean = false;

  test_id: string;
  filter_instance_type: string;
  filter_major_id: string;
  filter_start_date: string;
  filter_end_date: string;

  constructor() {
    super();
  }

  dataLoaded() {
    return this.simulations.length > 0;
  }

  onWaiting() {
    return !this.loaded;
  }

  dataLoadedButNothing() {
    return this.loaded && this.simulations.length === 0;
  }

  async loadSimulations() {
    const params = {};
    try {
      if (this.test_id) {
        params['test_id'] = this.test_id;
      }
      if (this.filter_instance_type) {
        params['instance_type'] = this.filter_instance_type;
      }
      if (this.filter_major_id) {
        params['major_id'] = this.filter_major_id;
      }
      if (this.filter_start_date) {
        params['date_range_start'] = `${this.filter_start_date}T00:00:00Z`;
      }
      if (this.filter_end_date) {
        params['date_range_finish'] = `${this.filter_end_date}T23:59:59Z`;
      }
      this.simulations = [];
      this.loaded = false;
      this.updateView();
      const request = await CallServerPromise.get_simulations_filtered(params);
      if (request.success && request.data) {
        // console.log('request.data', JSON.stringify(request.data));
        this.simulations = request.data
          .filter(item => item.active === false)
          .map(item => {
            const simulation = new Simulation(item);
            return {
              simulation,
              test_name: simulation.test_name,
              test_university_name: simulation.test_university_name,
              correct_answer_count: simulation.getCorrectAnswerCount(),
              wrong_answer_count:
                simulation.getWrongAnswerCount() +
                simulation.getNoAnswerCount(),
            };
          });
      } else {
        console.log('error on request', request);
        await showError(ERROR_TYPE.ERROR_WHILE_GETTING_DATA);
      }
      this.loaded = true;
      this.refreshing = false;
      this.updateView();
    } catch (error) {
      console.log('error on requesting', error, error.responseText, params);
      await showError(ERROR_TYPE.ERROR_UNKNOWN);
      this.loaded = true;
      this.refreshing = false;
      this.updateView();
    }
  }

  onRefresh() {
    this.refreshing = true;
    this.updateView();
    this.loadSimulations();
  }

  setFilterValue(filterValue) {
    this.filter_instance_type = filterValue.instance_type;
    this.filter_major_id = filterValue.major_id;
    this.filter_start_date = filterValue.start_date;
    this.filter_end_date = filterValue.end_date;
  }

  componentDidMount() {
    this.test_id = this.props.navigation.getParam('test_id');
    this.loadSimulations().then(r => r);
  }

  componentWillUnmount() {}
}

export class ResultItemView {
  onPressResultItem(navigation, simulation) {
    NavigationActions.navigate(routes.TEST_NAVIGATOR, {
      screen: routes.TEST_RESULT_DETAIL,
      params: {simulation},
    });
  }
}

export default useViewModel(new ResultViewModel());
