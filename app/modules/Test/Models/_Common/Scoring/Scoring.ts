import Base from "../../../../_CommonModels/ModelBase";

class Scoring extends Base {
  // Primitive variables
  correct: number;
  no_answer: number;
  wrong: number;

  constructor(params) {
    super(params);
    this.correct = params.correct ? params.correct : 0;
    this.no_answer = params.no_answer ? params.no_answer : 0;
    this.wrong = params.wrong ? params.wrong : 0;
  }

  static withSign(number) {
    return (number >= 0 ? '+ ' : '- ') + String(Math.abs(number));
  }
}

export default Scoring;
