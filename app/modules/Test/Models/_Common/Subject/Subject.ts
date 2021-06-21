import Question from "../Question";
import Base from "../../../../_CommonModels/ModelBase";
import { round } from "../../Simulation/Simulation";

class Subject extends Base {
  subject_name: string;
  topic_name: string;
  // number_of_questions: number;
  // number_of_correct_answers: number;
  // sum_of_score: number;
  questions: Array<Question>;

  constructor(params) {
    super(params);

    this.subject_name = params.subject_name ?? '';
    this.topic_name = params.topic_name ?? '';

    if (params.questions) {
      this.questions = params.questions.map(question => new Question(question));
    } else this.questions = [];
  }

  addQuestion(question) {
    this.questions = this.questions.concat(new Question(question));
  }

  getNumberOfQuestions() {
    return this.questions.length;
  }

  getQuestionTexts() {
    return this.questions.map(question => question.question);
  }

  getNumberOfCorrectAnswers() {
    return this.questions.filter(question => question.isCorrect()).length;
  }

  getSumOfScore() {
    let score = 0;
    this.questions.map(question => (score += question.score));
    return round(score);
  }

  getQuestionResponses() {
    return this.questions.map(question => question.response);
  }
}

export default Subject;
