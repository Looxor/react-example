import Reference from "./Reference";
import Base from "../../../_CommonModels/ModelBase";

class InstanceMappings extends Base {
  references: Array<Reference> = [];
  score_cutoff: number = 0;

  constructor(params) {
    super(params);

    if (params) {
      if (params.references) {
        this.references = params.references.map(
          reference => new Reference(reference),
        );
      } else this.references = [];

      this.score_cutoff = params.score_cutoff ?? 0;
    }
  }
}

export default InstanceMappings;
