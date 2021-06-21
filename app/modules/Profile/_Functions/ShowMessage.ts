import { strings } from "../../../config";
import standardFunctions from "../../../utils/app/StandardFunctions";

const MESSAGE_TYPE = {
  CANT_VERIFY_CONTACT_EMAIL: 1,
  VERIFY_CONTACT_AND_GOT_REWARD: 2,
  DATA_MODIFY_SUCCESS: 3,
  DATA_MODIFY_FAIL: 4,
  VERIFY_STUDENT_AND_GOT_REWARD: 5,
  VERIFY_STUDENT_EMAIL_OR_CARD_AND_GOT_REWARD: 6,
};

const defaultArgs: any = {};

const ShowMessage = async (errorType, error = null, args = defaultArgs) => {
  await standardFunctions.show_alert_async(
    strings.PROFILE.HOME.TITLE,
    GetMessage(errorType, error, args),
  );
};

const GetMessage = (errorType, error = null, args = defaultArgs) => {
  let message = '';
  switch (errorType) {
    case MESSAGE_TYPE.CANT_VERIFY_CONTACT_EMAIL:
      message = strings.PROFILE.MESSAGE.CANT_VERIFY_CONTACT_EMAIL;
      break;
    case MESSAGE_TYPE.VERIFY_CONTACT_AND_GOT_REWARD:
      message = strings.PROFILE.MESSAGE.VERIFY_CONTACT_AND_GOT_REWARD;
      message = message.replace('{COIN}', args.coin);
      break;
    case MESSAGE_TYPE.DATA_MODIFY_SUCCESS:
      message = strings.PROFILE.MESSAGE.DATA_MODIFY_SUCCESS;
      break;
    case MESSAGE_TYPE.DATA_MODIFY_FAIL:
      message = strings.PROFILE.MESSAGE.DATA_MODIFY_FAIL;
      break;
    case MESSAGE_TYPE.VERIFY_STUDENT_AND_GOT_REWARD:
      message = strings.PROFILE.MESSAGE.VERIFY_STUDENT_AND_GOT_REWARD;
      message = message.replace('{COIN}', args.coin);
      break;
    case MESSAGE_TYPE.VERIFY_STUDENT_EMAIL_OR_CARD_AND_GOT_REWARD:
      message =
        strings.PROFILE.MESSAGE.VERIFY_STUDENT_EMAIL_OR_CARD_AND_GOT_REWARD;
      message = message.replace('{COIN}', args.coin);
      break;
    default:
      message = strings.PROFILE.MESSAGE.UNKNOWN_ERROR;
  }
  return message;
};

export default ShowMessage;
export {GetMessage, MESSAGE_TYPE};
