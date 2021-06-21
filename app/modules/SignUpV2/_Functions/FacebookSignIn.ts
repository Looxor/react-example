import {
  AccessToken as FBAccessToken,
  GraphRequest as FBGraphRequest,
  GraphRequestManager as FBGraphRequestManager,
  LoginManager as FBLoginManager
} from "react-native-fbsdk";
import auth from "@react-native-firebase/auth";

const get_facebook_user_info = () =>
  new Promise(resolve => {
    const infoRequest = new FBGraphRequest(
      '/me?fields=email,first_name,last_name,picture',
      null,
      (error, result) => {
        if (error) {
          console.log('Error fetching data: ', error);
          resolve(null);
          return;
        }

        resolve(result);
      },
    );
    new FBGraphRequestManager().addRequest(infoRequest).start();
  });
const FacebookSignIn = async () => {
  await FBLoginManager.logOut();
  const result = await FBLoginManager.logInWithPermissions([
    'public_profile',
    'email',
    // "user_friends" TODO: Re-add Friends permission after Facebook approved our verification.
  ]);

  if (result.isCancelled) {
    return result;
  }

  const data = await FBAccessToken.getCurrentAccessToken();

  if (!data) {
    throw new Error('Something went wrong obtaining the users access token');
  }

  const facebook_access_token = data.accessToken;
  const credential = auth.FacebookAuthProvider.credential(
    facebook_access_token,
  );

  const facebookUser = await get_facebook_user_info();

  return {
    credential,
    facebookUser,
    facebook_access_token,
  };
};

export default FacebookSignIn;
