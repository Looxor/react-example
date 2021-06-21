type BestOfConstantName =
  | 'presentation_time'
  | 'question_polling_time'
  | 'question_preview_time'
  | 'results_time'
  | 'scores_table'
  | 'search_polling_time'
  | 'search_time'
  | 'correct_answer_time';

class BestOfConstants {
  presentation_time: number;
  question_polling_time: number;
  question_preview_time: number;
  results_time: number;
  scores_table: Array<number>;
  search_polling_time: number;
  search_time: number;
  correct_answer_time: number;

  set(constants) {
    this.presentation_time = constants.presentation_time || 1;
    this.question_polling_time = constants.question_polling_time || 1;
    this.question_preview_time = constants.question_preview_time || 1;
    this.results_time = constants.results_time || 1;
    this.scores_table = constants.scores_table || [];
    this.search_polling_time = constants.search_polling_time || 1;
    this.search_time = constants.search_time || 1;
    this.correct_answer_time = constants.correct_answer_time || 1;
  }

  all() {
    return this;
  }

  get(constantName: BestOfConstantName): any {
    return this[constantName];
  }
}

export default new BestOfConstants();
