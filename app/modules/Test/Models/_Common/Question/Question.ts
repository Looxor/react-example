import Base from "../../../../_CommonModels/ModelBase";
import Answer from "../Answer";
import { strings } from "../../../../../config";

class Question extends Base {
  // Array variable
  answers: Array<Answer>;

  // Primitive variables
  question: string;
  question_id: string;
  question_number: number;
  subject_id: string;
  subject_name: string;
  topic_name: string;
  response: string;
  selexi_id: string;
  answer_number: number;
  score: number;
  date: string;
  image_url: string;

  constructor(params) {
    super(params);

    if (params.answers && params.answers.length > 0) {
      this.answers = params.answers.map(answer => new Answer(answer));
    } else this.answers = [];

    this.question = params.question ? params.question : '';
    this.question_id = params.question_id ? params.question_id : '';
    this.question_number = params.question_number ? params.question_number : 0;
    this.subject_id = params.subject_id ? params.subject_id : '';
    this.subject_name = params.subject_name ? params.subject_name : '';
    this.topic_name = params.topic_name
      ? params.topic_name
      : strings.TEST.DEFAULT_TOPIC;
    this.response = params.response ? params.response : '';
    this.selexi_id = params.selexi_id ? params.selexi_id : '';
    this.answer_number = params.answer_number ? params.answer_number : 0;
    this.score = params.score ? params.score : 0;
    this.date = params.date ? params.date : '';
  }

  getSubjectName() {
    return this.subject_name;
  }

  getTopicName() {
    return this.topic_name;
  }

  getQuestion() {
    return this.question;
  }

  isCorrect() {
    return this.response === 'correct';
  }

  getCorrectAnswer() {
    return this.answers.filter(answer => answer.is_correct_answer === true)[0];
  }

  getChosenAnswer() {
    return this.answers.filter(
      answer => answer.answer_number === this.answer_number,
    )[0];
  }
}

export default Question;
