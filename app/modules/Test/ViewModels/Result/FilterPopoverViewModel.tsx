import React from "react";
import { CallServerPromise } from "../../../../utils/app/CallServer";
import showError, { ERROR_TYPE } from "../../CommonFunctions/showError";
import { useViewModel, ViewModelBase } from "../../../_CommonModels/ViewModelBase";

class FilterPopoverViewModel extends ViewModelBase {
  majors: Array<{}> = [];
  loaded: boolean = false;
  instance_type: string = '';
  major_id: string = '';
  start_date: string = '';
  end_date: string = '';
  show_calendar: boolean = false;
  show_calendar_first_loaded: boolean = false;

  constructor() {
    super();
    this.show_calendar = false;
  }

  dataLoaded() {
    return this.majors.length > 0;
  }

  onWaiting() {
    return !this.loaded;
  }

  dataLoadedButNothing() {
    return this.loaded && this.majors.length === 0;
  }

  async loadMajors() {
    try {
      const request = await CallServerPromise.get_all_majors();
      if (request.success && request.data) {
        // this.simulations = [];
        this.majors = request.data.map((major: any) => {
          return {
            value: major.major_id,
            label: major.name,
          };
        });
      } else {
        await showError(ERROR_TYPE.ERROR_WHILE_GETTING_DATA);
      }
      this.loaded = true;
      this.updateView();
    } catch (error) {
      await showError(ERROR_TYPE.ERROR_UNKNOWN);
      this.loaded = true;
      this.updateView();
    }
  }

  setMajorId(major_id) {
    this.major_id = major_id;
  }

  setInstanceType(instance_type) {
    this.instance_type = instance_type;
  }

  setDateRange(start_date, end_date) {
    this.start_date = start_date;
    this.end_date = end_date;
  }

  componentDidMount() {
    if (this.majors.length === 0) {
      this.loaded = false;
      this.updateView();
      this.loadMajors().then(r => r);
    }
    this.instance_type = this.params['instance_type'];
    this.major_id = this.params['major_id'];
    this.show_calendar = false;
  }

  componentWillUnmount() {}
}

export default useViewModel(new FilterPopoverViewModel());
