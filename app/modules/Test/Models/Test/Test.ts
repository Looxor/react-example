import Base from "../../../_CommonModels/ModelBase";
import Timeout from "../_Common/Timeout";
import CloneBlock from "./CloneBlock";
import Wayback from "./Wayback";

class Test extends Base {
  objectType: string = 'Test';
  // Array variable
  clone_blocks: Array<CloneBlock>;
  clone_bought: [];
  waybacks: Array<Wayback>;

  // Primitive variable
  clone_instructions: string;
  clone_name: string;
  clone_notes: string;
  clone_price: number;
  is_clone_available: boolean;
  last_update_date: string;
  major_id: string;
  major_name: string;
  name: string;
  test_id: string;
  university_id: string;
  university_name: string;
  version: number;

  constructor(params) {
    super(params);

    if (params.clone_blocks && params.clone_blocks.length > 0) {
      this.clone_blocks = params.clone_blocks.map(
        (clone_block, index) => new CloneBlock(clone_block, index),
      );
    } else this.clone_blocks = [];

    this.clone_bought = params.clone_bought ? params.clone_bought : [];

    if (params.waybacks && params.waybacks.length > 0) {
      this.waybacks = params.waybacks.map(wayback => new Wayback(wayback));
    } else this.waybacks = [];

    /* prettier-ignore-start */
    this.clone_instructions = params.clone_instructions;
    this.clone_name = params.clone_name ? params.clone_name : '';
    this.clone_notes = params.clone_notes ? params.clone_notes : '';
    this.clone_price = params.clone_price ? params.clone_price : 0;
    this.is_clone_available = params.is_clone_available;
    this.last_update_date = params.last_update_date
      ? params.last_update_date
      : '';
    this.major_id = params.major_id ? params.major_id : '';
    this.major_name = params.major_name;
    this.name = params.name ? params.name : '';
    this.test_id = params.test_id ? params.test_id : '';
    this.university_id = params.university_id ? params.university_id : '';
    this.university_name = params.university_name ? params.university_name : '';
    this.version = params.version ? params.version : 0;
    /* prettier-ignore-end */
  }

  getName() {
    return this.name;
  }

  getWaybacks(): Array<Wayback> {
    return this.waybacks;
  }

  getCloneBlocks(): Array<CloneBlock> {
    return this.clone_blocks || [];
  }

  getTimeoutOfCloneBlocks() {
    let value = 0;
    this.getCloneBlocks().map(cloneBlock => {
      value += cloneBlock.timeout.value;
    });
    return new Timeout(value);
  }

  getCloneNotes() {
    return this.clone_notes;
  }

  getUniversityName() {
    return this.university_name.trim();
  }

  getUniversityId() {
    return this.university_id;
  }

  getMajorName() {
    return this.major_name.trim();
  }

  getIsCloneAvailable() {
    return this.is_clone_available;
  }

  getTestId() {
    return this.test_id;
  }
}

export default Test;
