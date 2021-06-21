import { useViewModel, ViewModelBase } from "../../_CommonModels/ViewModelBase";
import BestOf from "../_Models/BestOf";
import { CallServerPromise } from "../../../utils/app/CallServer";

class HistoryResultViewModel extends ViewModelBase {
  loaded: boolean;
  gameUser1: any;
  gameUser2: any;
  scores: Array<any>;
  avgScore: any;

  isWon: boolean;
  isLost: boolean;
  meIsUser1: boolean;

  async loadData(bestof_id: string) {
    if (this.loaded) return;
    this.loaded = false;
    this.updateView();

    const response: any = await CallServerPromise.get_bestof_data_v2(bestof_id);

    if (response.success) {
      BestOf.set(response.data);
      if (BestOf) {
        this.gameUser1 = BestOf.getUser1();
        this.gameUser2 = BestOf.getUser2();
        this.meIsUser1 = BestOf.isUser1();
        this.scores = BestOf.getScores();
        this.avgScore = BestOf.getAvgScore();
        this.isWon = BestOf.isWon();
        this.isLost = BestOf.isLost();
      }
      this.loaded = true;
      this.updateView();
    }
  }

  async onCloseHandler() {
    BestOf.init();
    this.loaded = false;
    this.props.navigation.dismiss();
  }

  componentDidMount() {}

  componentWillUnmount() {}
}

export default useViewModel(new HistoryResultViewModel());
