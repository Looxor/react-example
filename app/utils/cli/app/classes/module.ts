const fs = require('fs');
import constants, { DS, SCREEN_EXT, SCREEN_SUFFIX } from "../constants";

import Screen from "./screen";
import { logAndExit } from "../helper_methods";

class Module {
  name: string;

  constructor(name) {
    this.name = name;
  }

  isExists() {
    return fs.existsSync(
      constants.APP_BASE + DS + 'app' + DS + 'modules' + DS + this.name,
    );
  }

  hasScreen(screenName) {
    return fs.existsSync(
      constants.APP_BASE +
        DS +
        'app' +
        DS +
        'modules' +
        DS +
        this.name +
        DS +
        `${screenName}${SCREEN_SUFFIX}.${SCREEN_EXT}`,
    );
  }

  addScreen(screenName) {
    if (this.hasScreen(screenName)) {
      logAndExit(
        `Already exists a screen named '${screenName}' in '${this.name}' module`,
      );
    } else {
      const newScreen = new Screen(screenName, this.name);
      newScreen.create();
    }
  }
}

export default Module;
