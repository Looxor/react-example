import Question from "./Question";
import BestOfData from "./BestOfData";
import { UserData } from "../../../config/constants";
import { getCurrentISOTime } from "../../../utils/misc/Time";

class BestOf {
  bestof_data: BestOfData;
  question: Question;
  answered_question: Question;
  current_question_number: number;
  remaining_time: number;
  user_name: string;

  init() {
    this.bestof_data = null;
    this.question = null;
    this.answered_question = null;
    this.current_question_number = 0;
    this.remaining_time = 0;
    this.user_name = '';
  }

  set(bestOf) {
    if (bestOf.bestof_data) {
      const user_id = UserData.getUserData().user_id;
      this.user_name = UserData.getUserData().nickname;
      this.bestof_data = new BestOfData({...bestOf.bestof_data, user_id});
      if (bestOf.question) {
        this.question = new Question(
          bestOf.question,
          bestOf.bestof_data.questions
            ? bestOf.bestof_data.questions.length
            : 0,
        );
      }
    }
  }

  getUser1() {
    return this.bestof_data.getUser1();
  }

  getUser2() {
    return this.bestof_data.getUser2();
  }

  getScores() {
    return this.bestof_data.getScores();
  }

  getAvgScore() {
    return this.bestof_data.getAvgScore();
  }

  getTotalQuestionsCount() {
    return this.bestof_data.getTotalQuestionsCount();
  }

  getCurrentQuestionNumber() {
    return this.current_question_number;
  }

  isNotLastQuestion() {
    return this.getCurrentQuestionNumber() < this.getTotalQuestionsCount() - 1;
  }

  isLastQuestion() {
    return (
      this.getCurrentQuestionNumber() === this.getTotalQuestionsCount() - 1
    );
  }

  isUser1() {
    return this.bestof_data.isUser1();
  }

  isUser2() {
    return this.bestof_data.isUser2();
  }

  saveAnsweredQuestion() {
    this.answered_question = new Question(this.question);
  }

  getAnsweredQuestion() {
    return this.answered_question;
  }

  clearAnsweredQuestion() {
    this.answered_question = null;
  }

  isWon() {
    return this.bestof_data.isWon();
  }

  isLost() {
    return this.bestof_data.isLost();
  }

  setCurrentQuestionNumber() {
    this.current_question_number = this.question.question_number;
  }

  isBothPlayersAnswered() {
    return this.bestof_data.isBothPlayersAnswered(this.current_question_number);
  }

  hasValidQuestion() {
    return this.question && this.question.all_questions_count > 0;
  }

  saveRemainingTime() {
    this.remaining_time = Math.round(
      (this.answered_question.timeout * 1000 -
        (+getCurrentISOTime() - +new Date(this.answered_question.start_date))) /
        1000,
    );
  }

  getNextStartDate(question_number) {
    return this.bestof_data.getNextStartDate(question_number);
  }

  getQuestionSummaries() {
    return this.bestof_data.getQuestionSummaries();
  }

  getSummaryUserInfo() {
    return this.bestof_data.getSummaryUserInfo();
  }
}

export default new BestOf();
