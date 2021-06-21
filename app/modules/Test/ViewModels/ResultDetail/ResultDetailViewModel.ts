import { useViewModel, ViewModelBase } from "../../../_CommonModels/ViewModelBase";
import Simulation from "../../Models/Simulation";
import Scoring from "../../Models/_Common/Scoring";
import { round } from "../../Models/Simulation/Simulation";

class ResultDetailViewModel extends ViewModelBase {
  simulation: Simulation;
  start_date: string = '';
  test_name: string = '';
  university_name: string = '';
  correct_answer_sum: number = 0;
  wrong_answer_sum: number = 0;
  no_answer_sum: number = 0;
  correct_answer_score: string = '';
  wrong_answer_score: string = '';
  no_answer_score: string = '';
  total_score: number = 0;
  wayback_ranking_value: number = 0;
  test_type: string = '';
  is_simulation_passed: boolean = false;
  simulated_ranking: number = 0;
  blocks_with_subjects: Array<{}>;

  constructor() {
    super();
  }

  enterData() {
    this.start_date = this.simulation.start_date;
    this.start_date = this.simulation.start_date;
    this.test_name = this.simulation.test_name;
    this.university_name = this.simulation.test_university_name;
    this.correct_answer_sum = this.simulation.getCorrectAnswerCount();
    this.wrong_answer_sum = this.simulation.getWrongAnswerCount();
    this.no_answer_sum = this.simulation.getNoAnswerCount();
    this.correct_answer_score = Scoring.withSign(
      this.simulation.getCorrectAnswerScore(),
    );
    this.wrong_answer_score = Scoring.withSign(
      this.simulation.getWrongAnswerScore(),
    );
    this.no_answer_score = Scoring.withSign(this.simulation.getNoAnswerScore());
    this.total_score = round(this.simulation.score);
    this.is_simulation_passed = this.simulation.is_simulation_passed;
    this.simulated_ranking = this.simulation.simulated_ranking;
    this.blocks_with_subjects = this.simulation.getBlocksWithSubjects();
  }

  closeButtonHandler() {
    const {
      route: {params = {}},
    } = this.props;
    const DIRECTLY_OPEN = params['DIRECTLY_OPEN'];
    if (DIRECTLY_OPEN === true) {
      this.params.gotoTestHome(this.props.navigation);
    } else {
      this.props.navigation.goBack(null);
    }
  }

  componentDidMount() {
    this.simulation = this.params.simulation;
    this.enterData();
    this.updateView();
  }

  componentWillUnmount() {}
}

export default useViewModel(new ResultDetailViewModel());
