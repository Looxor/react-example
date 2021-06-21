import QuestionModel, { ANSWER_TYPE } from "./Question";

class ContestModel {
  questions: Array<QuestionModel> = [];
  question_index: number = 0;
  total_score: number = 0;
  answer_submitted: boolean = false;
  round: string = '';
  user1_id: string = '';
  user2_id: string = '';

  constructor(
    params = {
      questions: [],
      round: '',
      user1_id: '',
      user2_id: '',
    },
  ) {
    this.question_index = 0;
    this.total_score = 0;
    this.answer_submitted = false;
    this.round = params.round;
    this.user1_id = params.user1_id;
    this.user2_id = params.user2_id;

    // this.questions = params.questions;
    if (params.questions.length > 0) {
      params.questions.forEach(question => {
        this.questions.push(new QuestionModel(question));
      });
    }
  }

  getCorrectAnswersCount() {
    let correctCount = 0;
    this.questions.forEach(question => {
      if (question.feedback === ANSWER_TYPE.CORRECT) correctCount++;
    });
    return correctCount;
  }
}

export default ContestModel;
