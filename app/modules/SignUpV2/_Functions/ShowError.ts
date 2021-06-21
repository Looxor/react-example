import { strings } from "../../../config";
import standardFunctions from "../../../utils/app/StandardFunctions";

const ERROR_TYPE = {
  ERROR_GETTING_SIGNIN_METHOD: 1,
  ERROR_CHECKING_NICKNAME: 2,
  ERROR_CREATING_USER: 3,
  ERROR_SIGNING_IN_GOOGLE: 4,
  ERROR_SIGNING_IN_FACEBOOK: 5,
  ERROR_SIGNING_IN_APPLE: 6,
  ERROR_SIGNING_IN_SOCIAL: 7,
  ERROR_IS_UNIVERSITY_EMAIL: 8,
  ERROR_NEED_FB_EMAIL: 9,
  ERROR_NICKNAME_WITHOUT_SPACES: 10,
  ERROR_NICKNAME_TOO_LONG: 11,
  ERROR_RETRY_A_NEW_SIGNUP: 12,
};

const ShowError = async (errorType, error = null) => {
  console.log('error', error);

  const code = String((error || {code: ''}).code);
  let message = '';
  if (
    '160100, 160101, 160103, 160104, 160105, 160106'.indexOf(code) > -1 &&
    code !== ''
  ) {
    message = GetMessageByCode(code);
  } else if ('160102' === code) {
    message = error.text;
  } else {
    switch (errorType) {
      case ERROR_TYPE.ERROR_GETTING_SIGNIN_METHOD:
        message =
          strings.SIGNUPV2.EMAILSIGNUP.EMAIL_INPUT.ERROR_GETTING_SIGNIN_METHOD;
        break;
      case ERROR_TYPE.ERROR_CHECKING_NICKNAME:
        message =
          strings.SIGNUPV2.EMAILSIGNUP.EMAIL_INPUT.ERROR_CHECKING_NICKNAME;
        break;
      case ERROR_TYPE.ERROR_CREATING_USER:
        message = strings.SIGNUPV2.EMAILSIGNUP.EMAIL_INPUT.ERROR_CREATING_USER;
        break;
      case ERROR_TYPE.ERROR_SIGNING_IN_GOOGLE:
        message = strings.SIGNUPV2.SOCIALSIGNUP.ERROR_SIGNING_IN_GOOGLE;
        break;
      case ERROR_TYPE.ERROR_SIGNING_IN_FACEBOOK:
        message = strings.SIGNUPV2.SOCIALSIGNUP.ERROR_SIGNING_IN_FACEBOOK;
        break;
      case ERROR_TYPE.ERROR_SIGNING_IN_APPLE:
        message = strings.SIGNUPV2.SOCIALSIGNUP.ERROR_SIGNING_IN_APPLE;
        break;
      case ERROR_TYPE.ERROR_SIGNING_IN_SOCIAL:
        message = strings.SIGNUPV2.SOCIALSIGNUP.ERROR_SIGNING_IN_SOCIAL;
        break;
      case ERROR_TYPE.ERROR_IS_UNIVERSITY_EMAIL:
        message = strings.SIGNUPV2.SOCIALSIGNUP.ERROR_IS_UNIVERSITY_EMAIL;
        break;
      case ERROR_TYPE.ERROR_NEED_FB_EMAIL:
        message = strings.SIGNUPV2.SOCIALSIGNUP.ERROR_NEED_FB_EMAIL;
        break;
      case ERROR_TYPE.ERROR_NICKNAME_WITHOUT_SPACES:
        message = strings.SIGNUPV2.SOCIALSIGNUP.ERROR_NICKNAME_WITHOUT_SPACES;
        break;
      case ERROR_TYPE.ERROR_NICKNAME_TOO_LONG:
        message = strings.SIGNUPV2.SOCIALSIGNUP.ERROR_NICKNAME_TOO_LONG;
        break;
      case ERROR_TYPE.ERROR_RETRY_A_NEW_SIGNUP:
        message = strings.SIGNUPV2.SOCIALSIGNUP.ERROR_RETRY_A_NEW_SIGNUP;
        break;
      default:
        message = strings.SIGNUPV2.EMAILSIGNUP.EMAIL_INPUT.ERROR_UNKNOWN;
    }
  }

  if (!message)
    message = strings.SIGNUPV2.EMAILSIGNUP.EMAIL_INPUT.ERROR_UNKNOWN;
  await standardFunctions.show_alert_async(strings.OTHER.WARNING, message);
};

const GetMessageByCode = code => {
  const ERROR_MESSAGE_OBJECT = strings.SIGNUPV2.EMAILSIGNUP.EMAIL_INPUT;
  return ERROR_MESSAGE_OBJECT[`ERROR_${code}`];
};

export default ShowError;
export {ERROR_TYPE};
