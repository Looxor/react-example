import { strings } from "../../../config";
import standardFunctions from "../../../utils/app/StandardFunctions";

const ERROR_TYPE = {
  ERROR_WHILE_GETTING_DATA: 1,
  ERROR_UNKNOWN: 2,
  ERROR_WHILE_SAVING_DATA: 3,
  ERROR_STARTING_SIMULATION: 4,
  ERROR_ALREADY_BOUGHT: 5,
};

const MESSAGE = {
  ERROR_WHILE_GETTING_DATA: strings.TEST.ERROR_WHILE_GETTING_DATA,
  ERROR_WHILE_SAVING_DATA: strings.TEST.ERROR_WHILE_SAVING_DATA,
  ERROR_UNKNOWN: strings.TEST.ERROR_UNKNOWN,
  ERROR_STARTING_SIMULATION: strings.TEST.ERROR_STARTING_SIMULATION,
  ERROR_TEST_ALREADY_BOUGHT: strings.TEST.ERROR_TEST_ALREADY_BOUGHT,
};

const showError = async (errorType, extraMessage = '') => {
  const title = strings.TEST.COURSE_OF_STUDY.TITLE;
  let message;
  switch (errorType) {
    case ERROR_TYPE.ERROR_WHILE_GETTING_DATA:
      message = MESSAGE.ERROR_WHILE_GETTING_DATA;
      break;
    case ERROR_TYPE.ERROR_WHILE_SAVING_DATA:
      message = MESSAGE.ERROR_WHILE_SAVING_DATA;
      if (extraMessage) message += '\n' + extraMessage;
      break;
    case ERROR_TYPE.ERROR_STARTING_SIMULATION:
      message = MESSAGE.ERROR_STARTING_SIMULATION;
      if (extraMessage) message = extraMessage;
      break;
    case ERROR_TYPE.ERROR_ALREADY_BOUGHT:
      message = MESSAGE.ERROR_TEST_ALREADY_BOUGHT;
      if (extraMessage) message = extraMessage;
      break;
    default:
      message = MESSAGE.ERROR_UNKNOWN;
      if (extraMessage) message += '\n' + extraMessage;
      break;
  }

  await standardFunctions.show_alert_async(title, message);
};

export default showError;
export {ERROR_TYPE};
