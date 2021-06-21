import Base from "../../../../_CommonModels/ModelBase";
import ExtractionGuideline from "./ExtractionGuideline";
import Scoring from "../../_Common/Scoring";
import Timeout from "../../_Common/Timeout";

class CloneBlock extends Base {
  // Array variable
  extraction_guidelines: Array<ExtractionGuideline>;

  // Class variable
  scoring: Scoring;

  // Primitive variables
  name: string;
  timeout: Timeout;
  index: number;

  constructor(params, index) {
    super(params);

    if (
      params.extraction_guidelines &&
      params.extraction_guidelines.length > 0
    ) {
      this.extraction_guidelines = params.extraction_guidelines.map(
        extraction_guideline => new ExtractionGuideline(extraction_guideline),
      );
    } else this.extraction_guidelines = [];

    if (params.scoring) {
      this.scoring = new Scoring(params.scoring);
    } else this.scoring = new Scoring({});

    this.name = params.name ? params.name : '';
    this.timeout = new Timeout(params.timeout ? params.timeout : 0);
    this.index = params.index ? params.index : 0;
  }

  getTestName() {
    return `${this.name}`;
  }

  getExtractionGuidelines() {
    return this.extraction_guidelines;
  }

  getExtractionGuidelinesGroupedBySubjectName() {
    const groupedGuidelines = [];
    (this.extraction_guidelines || []).map(
      (iteratedGuideline: ExtractionGuideline) => {
        const subject_name = iteratedGuideline.subject_name;
        const topic_name = iteratedGuideline.topic_name;
        const number_of_questions = iteratedGuideline.number_of_questions;

        const existsIndex = groupedGuidelines.findIndex(
          groupedGuideline => groupedGuideline.subject_name === subject_name,
        );
        if (existsIndex > -1) {
          const groupedGuideline = groupedGuidelines[existsIndex];
          groupedGuideline.topic_name += ';\n' + topic_name;
          groupedGuideline.number_of_questions += number_of_questions;
        } else {
          const groupedGuideline = {
            subject_name,
            topic_name: topic_name,
            number_of_questions,
          };
          groupedGuidelines.push(groupedGuideline);
        }
      },
    );
    return groupedGuidelines;
  }

  getName() {
    return this.name;
  }
}

export default CloneBlock;
