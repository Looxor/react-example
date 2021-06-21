import Base from "../../../../_CommonModels/ModelBase";

import Scoring from "../Scoring";
import Question from "../../_Common/Question";
import Timeout from "../Timeout";
import Subject from "../Subject";

class Block extends Base {
  // Array variable
  questions: Array<Question>;

  // Class variable
  scoring: Scoring;

  // Primitive variable
  name: string;
  timeout: Timeout;
  block_number: number;
  start_date: string;
  finish_date: string;
  score: number;

  constructor(params) {
    super(params);

    if (params.questions) {
      this.questions = params.questions.map(question => new Question(question));
    } else this.questions = [];

    if (params.scoring) {
      this.scoring = new Scoring(params.scoring);
    } else this.scoring = new Scoring({});

    this.name = params.name ? params.name : '';
    this.timeout = new Timeout(params.timeout ? params.timeout : 0);
    this.block_number = params.block_number ? params.block_number : 0;
    this.finish_date = params.finish_date ? params.finish_date : '';
    this.start_date = params.start_date ? params.start_date : '';
    this.score = params.score ? params.score : 0;
  }

  getQuestions() {
    return this.questions;
  }

  getQuestionsBySubjectName() {
    const subjects = [];
    (this.questions || []).map((question: Question) => {
      const subject_name = question.getSubjectName();
      const topic_name = question.getTopicName();
      const existIndex = subjects.findIndex(
        subject => subject.subject_name === subject_name,
      );
      if (existIndex === -1) {
        subjects.push(
          new Subject({
            subject_name,
            topic_name,
            questions: [question],
          }),
        );
      } else {
        const original_topic_name = subjects[existIndex].topic_name;
        const existIndex2 = original_topic_name.indexOf(topic_name);
        subjects[existIndex].topic_name =
          existIndex2 === -1
            ? original_topic_name + ';\n' + topic_name
            : original_topic_name;
        subjects[existIndex].addQuestion(question);
      }
    });
    return subjects;
  }

  getCorrectAnswerCount() {
    return this.questions.filter(question => question.response === 'correct')
      .length;
  }

  getWrongAnswerCount() {
    return this.questions.filter(question => question.response === 'wrong')
      .length;
  }

  getNoAnswerCount() {
    return this.questions.filter(question => question.response === 'no_answer')
      .length;
  }

  getCorrectAnswerScore() {
    let score = 0;
    this.questions
      .filter(question => question.response === 'correct')
      .map(question => (score += question.score));
    return score;
  }

  getWrongAnswerScore() {
    let score = 0;
    this.questions
      .filter(question => question.response === 'wrong')
      .map(question => (score += question.score));
    return score;
  }

  getNoAnswerScore() {
    let score = 0;
    this.questions
      .filter(question => question.response === 'no_answer')
      .map(question => (score += question.score));
    return score;
  }
}

export default Block;
