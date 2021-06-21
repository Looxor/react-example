import { useViewModel, ViewModelBase } from "../../../_CommonModels/ViewModelBase";

class ActiveInstanceViewModel extends ViewModelBase {
  navigation: any;
  major_id: string = '';
  searchKey: string = '';
  loaded: boolean = false;
  majorTests: Array<any> = [];
  interval_id: any = 0;
  simulation_id: string = '';

  constructor() {
    super();
  }

  setNavigation(navigation) {
    this.navigation = navigation;
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

  componentDidMount() {}

  componentWillUnmount() {
    clearInterval(this.interval_id);
  }
}

export default useViewModel(new ActiveInstanceViewModel());
