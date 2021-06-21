import { useViewModel, ViewModelBase } from "../../_CommonModels/ViewModelBase";
import BestOf from "../_Models/BestOf";

class SummaryViewModel extends ViewModelBase {
  summaries: any = [];
  summary_user_info: any = {};
  bestof_id: string;

  loadData() {
    this.bestof_id = BestOf.bestof_data.bestof_id;
    this.summaries = BestOf.getQuestionSummaries();
    this.summary_user_info = BestOf.getSummaryUserInfo();
    this.updateView();
  }

  componentDidMount() {
    this.loadData();
  }
}

export default useViewModel(new SummaryViewModel());
