const open2 = require('open');
import { generateScreen, setEnvironment } from "./helper_methods";

// @ts-ignore
const mode = process.argv[2];
switch (mode) {
  case 'g-screen':
    // @ts-ignore
    const moduleName = process.argv[3];
    // @ts-ignore
    const screenName = process.argv[4];
    generateScreen(moduleName, screenName);
    break;
  case '-set-env':
    setEnvironment();
    break;
  default:
}
