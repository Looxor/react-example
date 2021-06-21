import Base from "../../../_CommonModels/ModelBase";
import Block from "../_Common/Block";
import InstanceMappings from "../InstanceMappings";
import Timeout from "../_Common/Timeout";

class TestInstance extends Base {
  // Array variables
  blocks: Array<Block>;

  // Class variables
  mappings: InstanceMappings;

  // Primitive variables
  date: string;
  instance_id: string;
  instructions: string;
  last_update_date: string;
  name: string;
  notes: string;
  price: number;
  test_id: string;
  test_major_id: string;
  test_major_name: string;
  test_name: string;
  test_university_id: string;
  test_university_name: string;
  type: string;
  user_id: string;
  version: number;
  wayback_number: number;

  constructor(params) {
    super(params);
    console.log('TestInstance constructor');
    if (params.blocks && params.blocks.length > 0)
      this.blocks = params.blocks.map(block => new Block(block));
    else this.blocks = [];
    this.mappings = new InstanceMappings(params.mappings);

    this.date = params.date ?? '';
    this.instance_id = params.instance_id ?? '';
    this.instructions = params.instructions ?? '';
    this.last_update_date = params.last_update_date ?? '';
    this.name = params.name ?? '';
    this.notes = params.notes ?? '';
    this.price = params.price ?? 0;
    this.test_id = params.test_id ?? '';
    this.test_major_id = params.test_major_id ?? '';
    this.test_major_name = params.test_major_name ?? '';
    this.test_name = params.test_name ?? '';
    this.test_university_id = params.test_university_id ?? '';
    this.test_university_name = params.test_university_name ?? '';
    this.type = params.type ?? '';
    this.user_id = params.user_id ?? '';
    this.version = params.version ?? 0;
    this.wayback_number = params.wayback_number ?? 0;
  }

  getTestMajorName() {
    return this.test_major_name;
  }

  getTestUniversityName() {
    return this.test_university_name;
  }

  getTestName() {
    return this.test_name;
  }

  getTestId() {
    return this.test_id;
  }

  getInstanceId() {
    return this.instance_id;
  }

  getTimeoutOfBlocks() {
    let value = 0;
    this.blocks.map(block => {
      value += block.timeout.value;
    });
    return new Timeout(value);
  }
}

export default TestInstance;
