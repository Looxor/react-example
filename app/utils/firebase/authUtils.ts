import { Firebase_IDToken, UserData } from "../../config/constants";
import { CallServerPromise } from "../app/CallServer";

// https://stackoverflow.com/questions/37673616/firebase-android-onauthstatechanged-called-twice
// Workaround for the multiple invocation for this method

const handleUser = async user => {
  try {
    if (user) {
      const firebaseToken = (await user.getIdToken(true)) || '';
      if (firebaseToken) {
        Firebase_IDToken.setIDToken(firebaseToken);
        const request = await CallServerPromise.get_user_data(firebaseToken);
        if (request.success) {
          const userData = request.data;
          userData.Firebase_IDToken = firebaseToken;
          UserData.setUserData(userData);
          return true;
        } else {
          UserData.setUserData({
            ...UserData.getUserData(),
            Firebase_IDToken: firebaseToken,
          });
          return false;
        }
      } else return false;
    } else return false;
  } catch (error) {
    return false;
  }
};

export {handleUser};
