import { useViewModel, ViewModelBase } from "../../../_CommonModels/ViewModelBase";
import { CallServerPromise } from "../../../../utils/app/CallServer";
import showError, { ERROR_TYPE } from "../../CommonFunctions/showError";

const groupByUniversityId = data_array => {
  const universityIds = [];
  return (data_array || []).filter(data => {
    const exists = universityIds.indexOf(data.university_id) === -1;
    if (exists) universityIds.push(data.university_id);
    return exists;
  });
};

class SelectUniversityViewModel extends ViewModelBase {
  major_id: string = '';
  searchKey: string = '';
  loaded: boolean = false;
  majorTests: Array<any> = [];

  constructor() {
    super();
  }

  setMajorId(major_id) {
    this.major_id = major_id;
  }

  onWaiting() {
    return !this.loaded;
  }

  getMajorTests() {
    return this.majorTests;
  }

  getSearchKey() {
    return this.searchKey;
  }

  setSearchKey(searchKey) {
    this.searchKey = searchKey;
    this.updateView();
  }

  async loadMajorTests() {
    try {
      this.loaded = false;
      this.updateView();
      const request = await CallServerPromise.get_major_tests(this.major_id);
      if (request.success && request.data) {
        this.majorTests = request.data;
      } else {
        showError(ERROR_TYPE.ERROR_WHILE_GETTING_DATA);
      }
      this.loaded = true;
      this.updateView();
    } catch (error) {
      showError(ERROR_TYPE.ERROR_WHILE_GETTING_DATA);
      this.loaded = true;
      this.updateView();
    }
  }

  componentDidMount() {
    this.loadMajorTests();
  }

  componentWillUnmount() {}
}

export default useViewModel(new SelectUniversityViewModel());
