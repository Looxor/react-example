import Base from "../../../../../_CommonModels/ModelBase";

class ExtractionGuideline extends Base {
  // Primitive variables
  number_of_questions: number;
  subject_id: string;
  subject_name: string;
  topic: string;
  topic_name: string;

  constructor(params) {
    super(params);

    this.number_of_questions = params.number_of_questions
      ? params.number_of_questions
      : '';
    this.subject_id = params.subject_id ? params.subject_id : '';
    this.subject_name = params.subject_name ? params.subject_name : '';
    this.topic = params.topic ? params.topic : '';
    this.topic_name = params.topic_name ? params.topic_name : '';
  }

  getTopicName() {
    return this.topic_name;
  }

  getSubjectName() {
    return this.subject_name;
  }

  getNumberOfQuestions() {
    return this.number_of_questions;
  }
}

export default ExtractionGuideline;
