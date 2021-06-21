import { useViewModel, ViewModelBase } from "../../../_CommonModels/ViewModelBase";
import Question from "../../Models/_Common/Question";

class ResultQuestionViewModel extends ViewModelBase {
  question: Question;
  loaded: boolean = false;
  question_response: string;
  question_text: string;
  answers: Array<{}>;
  image_url: string;

  constructor() {
    super();
  }

  enterData() {
    try {
      this.question = this.params.question;
      this.question_response = this.question.response;
      this.question_text = this.question.question;
      this.image_url = this.question.image_url;

      switch (this.question_response) {
        case 'correct':
          this.answers = [
            {
              icon_name: 'correct',
              text: this.question.getCorrectAnswer().text,
            },
          ];
          break;
        case 'wrong':
          this.answers = [
            {
              icon_name: 'wrong',
              text: this.question.getChosenAnswer().text,
            },
            {
              icon_name: 'correct',
              text: this.question.getCorrectAnswer().text,
            },
          ];
          break;
        case 'no_answer':
          this.answers = [
            {
              icon_name: 'no_answer',
              text: this.question.getCorrectAnswer().text,
            },
          ];
          break;
      }
    } catch (error) {
      console.log('error on displaying question', error);
    }
  }

  componentDidMount() {
    console.log('componentDidMount of ResultQuestion');
    this.enterData();
    this.loaded = true;
    this.updateView();
  }

  componentWillUnmount() {}
}

export default useViewModel(new ResultQuestionViewModel());
