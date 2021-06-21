const open2 = require('open');
import { listColors } from "./helper_methods";

// @ts-ignore
const mode = process.argv[2];
switch (mode) {
  case '-list-all-colors':
    open2(listColors());
    break;
  default:
    open2(listColors());
}
