import { useViewModel, ViewModelBase } from "../../../_CommonModels/ViewModelBase";
import Simulation from "../../Models/Simulation";
import { routes } from "../../../../navigation/rootNavigation/navigation.constants";
import { round } from "../../Models/Simulation/Simulation";

class EndedResultViewModel extends ViewModelBase {
  simulation: Simulation;
  correct_answer_point: number;
  wrong_answer_point: number;
  no_answer_point: number;
  total_point: number;
  instance_type: string;
  simulated_ranking: number;
  correct_answer_count: number;
  wrong_answer_count: number;
  no_answer_count: number;

  constructor() {
    super();
  }

  gotoResultDetailScreen() {
    this.props.navigation.navigate(routes.TEST_RESULT_DETAIL, {
      simulation: this.simulation,
      DIRECTLY_OPEN: true,
    });
  }

  componentDidMount() {
    const simulation: Simulation = this.props.navigation.getParam('simulation');
    this.simulation = simulation;
    this.correct_answer_point = simulation.getCorrectAnswerScore();
    this.wrong_answer_point = simulation.getWrongAnswerScore();
    this.no_answer_point = simulation.getNoAnswerScore();
    this.correct_answer_count = simulation.getCorrectAnswerCount();
    this.wrong_answer_count = simulation.getWrongAnswerCount();
    this.no_answer_count = simulation.getNoAnswerCount();
    this.total_point = round(
      this.correct_answer_point +
        this.wrong_answer_point +
        this.no_answer_point,
      2,
    );
    this.instance_type = simulation.instance_type;
    this.simulated_ranking = simulation.simulated_ranking;
    this.updateView();
  }

  componentWillUnmount() {}
}

export default useViewModel(new EndedResultViewModel());
