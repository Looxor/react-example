const fs = require('fs');

import { DS } from "../constants";
import { beautifyObject } from "../../_libs/helper_methods";

class Screen {
  name: string;
  title: string;
  moduleName: string;

  constructor(name, moduleName) {
    this.name = name;
    this.title = name;
    this.moduleName = moduleName;
  }

  readNavigationConstants() {
    const routeConstants = require('../../../..' +
      DS +
      'navigation' +
      DS +
      'rootNavigation' +
      DS +
      'navigation.constants').routes;
    return routeConstants;
  }

  writeNavigationConstants() {
    const navigationConstants = this.readNavigationConstants();
    const key = `${this.moduleName}_${this.name}`.toUpperCase();
    const value = `${this.moduleName}${this.name}`;
    navigationConstants[key] = value;
    let routes = beautifyObject(navigationConstants);
    routes = `export const routes = ${routes};`;
  }

  writeStringToLanguageConstant() {}

  writeSourceCode() {}

  create() {
    this.writeNavigationConstants();
    this.writeStringToLanguageConstant();
    this.writeSourceCode();
  }
}

export default Screen;
