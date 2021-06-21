import React from "react";
import { useViewModel, ViewModelBase } from "../../../_CommonModels/ViewModelBase";
import { CallServerPromise } from "../../../../utils/app/CallServer";
import showError, { ERROR_TYPE } from "../../CommonFunctions/showError";

class CourseOfStudyViewModel extends ViewModelBase {
  majors: Array<any> = [];
  loaded: boolean = false;
  searchKey: string = '';

  constructor() {
    super();
  }

  onWaiting() {
    return !this.loaded;
  }

  getMajors() {
    return this.majors;
  }

  getSearchKey() {
    return this.searchKey;
  }

  setSearchKey(searchKey) {
    this.searchKey = searchKey;
    this.updateView();
  }

  async loadMajors() {
    try {
      this.loaded = false;
      this.updateView();
      const request = await CallServerPromise.get_all_majors();
      if (request.success && request.data) {
        this.majors = request.data;
      } else {
        await showError(ERROR_TYPE.ERROR_WHILE_GETTING_DATA);
      }
      this.loaded = true;
      this.updateView();
    } catch (error) {
      await showError(ERROR_TYPE.ERROR_WHILE_GETTING_DATA);
      this.loaded = true;
      this.updateView();
    }
  }

  componentDidMount() {
    this.majors = [];
    this.searchKey = '';
    this.loadMajors().then(r => r);
  }

  componentWillUnmount() {}
}

export default useViewModel(new CourseOfStudyViewModel());
