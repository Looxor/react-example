import { strings } from "../../../config";
import standardFunctions from "../../../utils/app/StandardFunctions";

const ERROR_TYPE = {
  ERROR_WHILE_GETTING_DATA: 1,
  ERROR_UNKNOWN: 2,
  ERROR_GETTING_COINS_TRANSACTIONS: 3,
  ERROR_GETTING_COINS_PACKETS: 4,
  ERROR_GETTING_PURCHASE_TRANSACTIONS: 5,
};

const showError = async (errorType, extraMessage = '') => {
  const title = strings.OTHER.WARNING;
  let message;
  switch (errorType) {
    case ERROR_TYPE.ERROR_WHILE_GETTING_DATA:
      message = strings.WALLET.ERROR_WHILE_GETTING_DATA;
      break;
    case ERROR_TYPE.ERROR_GETTING_COINS_TRANSACTIONS:
      message = strings.WALLET.MAIN.ERROR_GETTING_COINS_TRANSACTIONS;
      break;
    case ERROR_TYPE.ERROR_GETTING_COINS_PACKETS:
      message = strings.WALLET.MAIN.ERROR_GETTING_COINS_PACKETS;
      break;
    case ERROR_TYPE.ERROR_GETTING_PURCHASE_TRANSACTIONS:
      message = strings.WALLET.MAIN.ERROR_GETTING_PURCHASE_TRANSACTIONS;
      break;
    default:
      message = strings.WALLET.ERROR_UNKNOWN;
      if (extraMessage) message += '\n' + extraMessage;
      break;
  }

  await standardFunctions.show_alert_async(title, message);
};

export default showError;
export {ERROR_TYPE};
