import Answer from "./Answer";

class Question {
  answers: Array<Answer>;
  question: string;
  image_url: string;
  question_number: number;
  start_date: string;
  subject_id: string;
  subject_image_url: string;
  subject_name: string;
  timeout: number;
  user1_score: number;
  user2_score: number;
  user1_has_answered: boolean;
  user2_has_answered: boolean;
  user1_answer_number: number;
  user2_answer_number: number;
  user1_answer_date: string;
  user2_answer_date: string;
  is_start: boolean;
  is_end: boolean;
  all_questions_count: number;

  constructor(params, all_questions_count = 0) {
    if (params) {
      this.answers =
        params.answers && params.answers.map(answer => new Answer(answer));
      this.question = params.question;
      this.image_url = params.image_url ? params.image_url : '';
      this.question_number = params.question_number;
      this.start_date = params.start_date;
      this.subject_id = params.subject_id;
      this.subject_image_url = params.subject_image_url
        ? params.subject_image_url
        : '';
      this.subject_name = params.subject_name;
      this.timeout = params.timeout;
      this.user1_score = params.user1_score;
      this.user2_score = params.user2_score;
      this.user1_has_answered = params.user1_has_answered;
      this.user2_has_answered = params.user2_has_answered;
      this.user1_answer_date = params.user1_answer_date;
      this.user2_answer_date = params.user2_answer_date;
      this.user1_answer_number = params.user1_answer_number;
      this.user2_answer_number = params.user2_answer_number;
      this.all_questions_count = all_questions_count;
      this.is_start = this.question_number === 0;
      this.is_end = this.question_number === all_questions_count - 1;
    }
  }

  getSummary(all_questions_count) {
    const user1_answer = this.answers[this.user1_answer_number];
    const user2_answer = this.answers[this.user2_answer_number];
    console.log('this.subject_image_url', this.subject_image_url);
    return {
      question: this.question,
      subject_image_url: this.subject_image_url,
      subject_name: this.subject_name,
      all_questions_count,
      question_number: this.question_number,
      user1_answer: {
        is_correct:
          user1_answer !== undefined ? user1_answer.is_correct_answer : false,
        answer_text:
          user1_answer !== undefined ? user1_answer.text : 'Risposta non data',
        answer_number:
          user1_answer !== undefined ? user1_answer.answer_number : -1,
        score: this.user1_score,
      },
      user2_answer: {
        is_correct:
          user2_answer !== undefined ? user2_answer.is_correct_answer : false,
        answer_text:
          user2_answer !== undefined ? user2_answer.text : 'Risposta non data',
        answer_number:
          user2_answer !== undefined ? user2_answer.answer_number : -1,
        score: this.user2_score,
      },
      correct_answer:
        user1_answer !== undefined &&
        !user1_answer.is_correct_answer &&
        user2_answer !== undefined &&
        !user2_answer.is_correct_answer
          ? this.getCorrectAnswer()
          : null,
    };
  }

  private getCorrectAnswer() {
    const correct_answer_index = this.answers.findIndex(
      answer => answer.is_correct_answer === true,
    );
    if (correct_answer_index > -1) {
      const correct_answer = this.answers[correct_answer_index];
      return {
        answer_text: correct_answer.text,
        is_correct: true,
        answer_number: correct_answer.answer_number,
      };
    } else {
      return {};
    }
  }
}

export default Question;
