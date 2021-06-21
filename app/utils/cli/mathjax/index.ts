const open2 = require('open');
import { parseLatexQuestions } from "./helper_methods";

// @ts-ignore
const mode = process.argv[2];
switch (mode) {
  case '-list-mathjax':
    break;
  default:
    parseLatexQuestions();
}
