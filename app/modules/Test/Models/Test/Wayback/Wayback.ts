import Base from "../../../../_CommonModels/ModelBase";
import Block from "../../_Common/Block";
import Timeout from "../../_Common/Timeout";

class Wayback extends Base {
  objectType: string = 'Wayback';
  // Array variable
  blocks: Array<Block>;

  // primitive variable
  bought: boolean;
  instructions: string;
  name: string;
  notes: string;
  price: number;
  wayback_number: number;

  constructor(params) {
    super(params);

    if (params.blocks && params.blocks.length > 0) {
      this.blocks = params.blocks.map(block => new Block(block));
    } else this.blocks = [];

    this.bought = params.bought ? params.bought : false;
    this.instructions = params.instructions ? params.instructions : '';
    this.name = params.name ? params.name : '';
    this.notes = params.notes ? params.notes : '';
    this.price = params.price ? params.price : 0;
    this.wayback_number = params.wayback_number ? params.wayback_number : 0;
  }

  getName() {
    return this.name.trim();
  }

  getWaybackNumber(): number {
    return this.wayback_number;
  }

  getBlocks() {
    return this.blocks;
  }

  getBought() {
    return this.bought;
  }

  getTimeoutOfBlocks() {
    let value = 0;
    this.blocks.map((block: Block) => {
      value += block.timeout.value;
    });
    return new Timeout(value);
  }
}

export default Wayback;
