import Base from "../../../_CommonModels/ModelBase";
import Block from "../_Common/Block";
import InstanceMappings from "../InstanceMappings";

export const round = (number, digit = 2) => {
  const hundred = Math.pow(10, digit);
  return Math.round(number * hundred) / hundred;
};

class Simulation extends Base {
  // array variables
  blocks: Array<Block> = [];

  // object variables
  instance_mappings: InstanceMappings;

  // primitive variables
  active: boolean = false;
  auto_terminated: boolean = false;
  force_terminated: boolean = false;
  finish_date: string = '';
  iframe_url: string = '';
  instance_id: string = '';
  instance_instructions: string = '';
  instance_name: string = '';
  instance_notes: string = '';
  instance_type: string = '';
  last_update_date: string = '';
  score: number = 0;
  simulation_id: string = '';
  simulator_qr_code: string = '';
  start_date: string = '';
  status: string = '';
  test_id: string = '';
  test_major_id: string = '';
  test_major_name: string = '';
  test_name: string = '';
  test_university_id: string = '';
  test_university_name: string = '';
  user_id: string = '';
  is_simulation_passed: boolean = false;
  simulated_ranking: number = 0;

  constructor(params) {
    super(params);

    if (params.blocks) {
      this.blocks = params.blocks.map(block => new Block(block));
    } else this.blocks = [];

    if (params.instance_mappings) {
      this.instance_mappings = new InstanceMappings(params.instance_mappings);
    } else {
      this.instance_mappings = new InstanceMappings({});
    }

    this.active = params.active ?? false;
    this.auto_terminated = params.auto_terminated ?? false;
    this.force_terminated = params.force_terminated ?? false;
    this.finish_date = params.finish_date ?? '';
    this.iframe_url = params.iframe_url ?? '';
    this.instance_id = params.instance_id ?? '';
    this.instance_instructions = params.instance_instructions ?? '';
    this.instance_name = params.instance_name ?? '';
    this.instance_notes = params.instance_notes ?? '';
    this.instance_type = params.instance_type ?? '';
    this.last_update_date = params.last_update_date ?? '';
    this.score = params.score ?? 0;
    this.simulation_id = params.simulation_id ?? '';
    this.simulator_qr_code = params.simulator_qr_code ?? '';
    this.start_date = params.start_date ?? '';
    this.status = params.status ?? '';
    this.test_id = params.test_id ?? '';
    this.test_major_id = params.test_major_id ?? '';
    this.test_major_name = params.test_major_name ?? '';
    this.test_name = params.test_name ?? '';
    this.test_university_id = params.test_university_id ?? '';
    this.test_university_name = params.test_university_name ?? '';
    this.user_id = params.user_id ?? '';
    this.is_simulation_passed = params.is_simulation_passed ?? false;
    this.simulated_ranking = params.simulated_ranking ?? false;
  }

  getCorrectAnswerCount() {
    let correctAnswerCount = 0;
    this.blocks.map(
      block => (correctAnswerCount += block.getCorrectAnswerCount()),
    );
    return correctAnswerCount;
  }

  getWrongAnswerCount() {
    let wrongAnswerCount = 0;
    this.blocks.map(block => (wrongAnswerCount += block.getWrongAnswerCount()));
    return wrongAnswerCount;
  }

  getNoAnswerCount() {
    let noAnswerCount = 0;
    this.blocks.map(block => (noAnswerCount += block.getNoAnswerCount()));
    return noAnswerCount;
  }

  getCorrectAnswerScore() {
    let correctAnswerScore = 0;
    this.blocks.map(
      block => (correctAnswerScore += block.getCorrectAnswerScore()),
    );
    return round(correctAnswerScore);
  }

  getWrongAnswerScore() {
    let wrongAnswerScore = 0;
    this.blocks.map(block => (wrongAnswerScore += block.getWrongAnswerScore()));
    return round(wrongAnswerScore);
  }

  getNoAnswerScore() {
    let noAnswerScore = 0;
    this.blocks.map(block => (noAnswerScore += block.getNoAnswerScore()));
    return round(noAnswerScore);
  }

  getBlocksWithSubjects() {
    return this.blocks.map(block => block.getQuestionsBySubjectName());
  }
}

export default Simulation;
