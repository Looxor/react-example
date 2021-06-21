import { auth } from "../../utils/firebase";
import { handleUser } from "../firebase/authUtils";

const TOKEN_LIFECYCLE = 1000 * 59;

const refreshFirebaseToken = async () => {
  try {
    const user = auth().currentUser;
    if (user) {
      await handleUser(user);
    }
  } catch (error) {}
};

export {refreshFirebaseToken, TOKEN_LIFECYCLE};
