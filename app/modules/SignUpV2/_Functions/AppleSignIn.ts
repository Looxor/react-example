import appleAuth from "@invertase/react-native-apple-authentication";

// import { auth } from "../../../utils/firebase";
import auth from "@react-native-firebase/auth";

const AppleSignIn = async () => {
  try {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    console.log('appleAuthRequestResponse', appleAuthRequestResponse);

    if (!appleAuthRequestResponse.identityToken) {
      throw 'Apple Sign-In failed - no identify token returned';
    }

    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse;
    const credential = auth.AppleAuthProvider.credential(identityToken, nonce);
    await auth().signInWithCredential(credential);
    const appleUser = {
      email: auth().currentUser.email,
      firstname: appleAuthRequestResponse.fullName.givenName,
      lastname: appleAuthRequestResponse.fullName.familyName,
    };
    return {
      credential,
      appleUser,
    };
  } catch (e) {
    throw e;
  }
};

export default AppleSignIn;
