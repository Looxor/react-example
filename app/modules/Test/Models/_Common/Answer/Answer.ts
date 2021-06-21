import Base from "../../../../_CommonModels/ModelBase";

class Answer extends Base {
  answer_number: number;
  is_correct_answer: boolean;
  text: string;

  constructor(params) {
    super(params);

    this.answer_number = params.answer_number ? params.answer_number : 0;
    this.is_correct_answer = params.is_correct_answer
      ? params.is_correct_answer
      : false;
    this.text = params.text ? params.text : '';
  }
}

export default Answer;
