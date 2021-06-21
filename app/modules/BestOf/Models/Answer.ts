class AnswerModel {
  answer_number: number = 0;
  text: String = '';

  constructor(params = {answer_number: 0, text: ''}) {
    this.answer_number = params.answer_number;
    this.text = params.text;
  }
}

export default AnswerModel;
