import Module from "./classes/module";
import Environment from "./classes/environment";

const logAndExit = (...args) => {
  // @ts-ignore
  process.exit();
};
const generateScreen = (moduleName, screenName) => {
  const module = new Module(moduleName);
  if (!module.isExists()) {
    logAndExit('There is no such a module: ', moduleName);
  } else {
    module.addScreen(screenName);
  }
};

const setEnvironment = () => {
  Environment.set();
};

export {generateScreen, logAndExit, setEnvironment};
