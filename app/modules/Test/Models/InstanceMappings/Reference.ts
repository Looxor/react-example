import Base from "../../../_CommonModels/ModelBase";

class Reference extends Base {
  ranking: number = 0;
  score: number = 0;

  constructor(params) {
    super(params);

    this.ranking = params.ranking ?? 0;
    this.score = params.score ?? 0;
  }
}

export default Reference;
