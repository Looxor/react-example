import { GoogleSignin } from "@react-native-community/google-signin";
import { constants } from "../../../config";
import auth from "@react-native-firebase/auth";

/**
 public static final int SIGN_IN_CANCELLED
 The sign in was cancelled by the user. i.e. user cancelled some of the sign in resolutions, e.g. account picking or OAuth consent.
 Constant Value: 12501

 public static final int SIGN_IN_CURRENTLY_IN_PROGRESS
 A sign in process is currently in progress and the current one cannot continue. e.g. the user clicks the SignInButton multiple times and more than one sign in intent was launched.
 Constant Value: 12502

 public static final int SIGN_IN_FAILED
 The sign in attempt didn't succeed with the current account.
 Unlike SIGN_IN_REQUIRED. when seeing this error code, there is nothing user can do to recover from the sign in failure. Switching to another account may or may not help. Check adb log to see details if any.
 Constant Value: 12500
 */

const GOOGLE_SIGNIN_STATUS = {
  SIGN_IN_FAILED: 12500,
  SIGN_IN_CANCELLED: 12501,
  SIGN_IN_CURRENTLY_IN_PROGRESS: 12502,
};

const GoogleSignIn = async socialSignInLoadingPopoverView => {
  GoogleSignin.configure({
    webClientId: constants.googleSignIn.webClientId,
  });
  try {
    const {idToken} = await GoogleSignin.signIn();
    const googleUser = await GoogleSignin.getCurrentUser();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return {
      googleCredential,
      googleUser: googleUser.user,
      idToken,
    };
  } catch (e) {
    socialSignInLoadingPopoverView.hide();
    console.log('error on GoogleSignIn', e);
    throw e;
  }
};

export default GoogleSignIn;
export {GOOGLE_SIGNIN_STATUS};
