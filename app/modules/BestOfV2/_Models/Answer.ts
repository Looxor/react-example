class Answer {
  answer_number: number;
  is_correct_answer: boolean;
  text: string;

  constructor(params) {
    this.answer_number = params.answer_number;
    this.is_correct_answer = params.is_correct_answer;
    this.text = params.text;
  }
}

export default Answer;
