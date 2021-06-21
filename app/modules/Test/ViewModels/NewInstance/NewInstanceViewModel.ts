import { useViewModel, ViewModelBase } from "../../../_CommonModels/ViewModelBase";
import Test from "../../Models/Test";
import Wayback from "../../Models/Test/Wayback";
import TestManager from "../_Common/TestManager";

class NewInstanceViewModel extends ViewModelBase {
  props: any;
  waybacks: Array<Wayback> = [];
  major_name: string;
  test_case: number; // 1: FIRST / 2: NOT_FIRST
  test: Test;

  constructor() {
    super();
  }

  componentDidMount() {
    this.props = this.params.props;
    const test: Test = this.props.navigation.getParam('test');
    this.waybacks = test.getWaybacks();
    this.major_name = test.major_name;
    this.test = test;
    this.test_case = this.props.navigation.getParam('test_case');

    TestManager.test_case = this.test_case;
    this.updateView();
  }

  componentWillUnmount() {}
}

export default useViewModel(new NewInstanceViewModel());
