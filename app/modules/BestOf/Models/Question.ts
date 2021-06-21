import AnswerModel from "./Answer";

export const ANSWER_TYPE = {
  NOT_ANSWERED: -1,
  WRONG: 0,
  CORRECT: 1,
};

class QuestionModel {
  question: String = '';
  image_url: String = '';
  question_number: number = 0;
  subject_id: String = '';
  subject_name: String = '';
  timeout: number = 0;
  answers: Array<AnswerModel> = [];
  feedback: number = ANSWER_TYPE.NOT_ANSWERED; // CORRECT, WRONG, NOT_ANSWERED

  constructor(
    params = {
      question: '',
      image_url: '',
      question_number: 0,
      subject_id: '',
      subject_name: '',
      timeout: 0,
      answers: [],
    },
  ) {
    this.question = params.question;
    this.image_url = params.image_url;
    this.question_number = params.question_number;
    this.subject_id = params.subject_id;
    this.subject_name = params.subject_name;
    this.timeout = params.timeout;
    this.feedback = ANSWER_TYPE.NOT_ANSWERED;

    // this.answers = params.answers;
    if (params.answers.length > 0) {
      params.answers.forEach(answer => {
        this.answers.push(new AnswerModel(answer));
      });
    }
  }
}

export default QuestionModel;
