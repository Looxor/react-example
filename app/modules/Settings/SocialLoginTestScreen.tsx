import * as React from "react";
import { Button, Platform, StyleSheet, View } from "react-native";
// import ContestQAList from '../BestOf/_Components/ContestQAList';
import { constants } from "../../config";
import auth from "@react-native-firebase/auth";
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from "react-native-fbsdk";
import { GoogleSignin } from "@react-native-community/google-signin";
import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleButton
} from "@invertase/react-native-apple-authentication";

const SocialLoginTestScreen = props => {
  /*
  START Facebook SignIn
   */
  async function onFacebookSignUpButtonPress() {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw new Error('User cancelled request');
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw new Error('Something went wrong obtaining the users access token');
    }

    const credential = auth.FacebookAuthProvider.credential(data.accessToken);

    // login with credential
    await auth()
      .signInWithCredential(credential)
      .then(firebaseCred => {
        let responseData = firebaseCred.user.toJSON();
        console.log(responseData);
        console.log(data);
        return firebaseCred;
      })
      .catch(async error => {
        console.log('error.code', error.code);
        if (error.code === 'auth/account-exists-with-different-credential') {
          const email = await get_facebook_email();
          let other_providers = await get_other_providers(email);
          if (other_providers.length !== 0) {
            throw {
              code: 'SignIn with other provider',
              providers: other_providers,
            };
          } else {
            throw {
              code: 'No providers available. Contact us on Support email.',
            };
          }
        } else {
          throw error;
        }
      });
  }

  const get_facebook_email = () =>
    new Promise(resolve => {
      const infoRequest = new GraphRequest(
        '/me?fields=email',
        null,
        (error, result) => {
          if (error) {
            console.log('Error fetching data: ' + error.toString());
            resolve(null);
            return;
          }

          resolve(result.email);
        },
      );
      new GraphRequestManager().addRequest(infoRequest).start();
    });

  async function get_other_providers(email) {
    return await auth().fetchSignInMethodsForEmail(email);
  }

  /*
  END Facebook SignIn
   */

  /*
  START Google SignIn
   */
  GoogleSignin.configure({
    webClientId:
      constants.APP_MODE_CONTROLLED_BY_SERVER === 'PRODUCTION'
        ? '468888583816-0lv363rdfdicjl2p24a0nopom9tfmlgq'
        : '88548556202-efu0jdnpch1qsnh02tqm0758d2076dq5',
  });

  async function onGoogleSignUpButtonPress() {
    try {
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      const currentUser = await GoogleSignin.getCurrentUser();
      console.log('GoogleSignin.getCurrentUser', currentUser);
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      console.log('auth().currentUser', auth().currentUser);
      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (e) {
      throw e;
    }
  }

  /*
  END Google SignIn
   */

  /*
  START Apple SignIn
   */
  async function onAppleSignUpButtonPress() {
    try {
      // Start the sign-in request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [
          AppleAuthRequestScope.EMAIL,
          AppleAuthRequestScope.FULL_NAME,
        ],
      });

      // Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        throw 'Apple Sign-In failed - no identify token returned';
      }

      // Create a Firebase credential from the response
      const {identityToken, nonce} = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );

      // Sign the user in with the credential
      return await auth().signInWithCredential(appleCredential);
    } catch (e) {
      throw e;
    }
  }

  /*
  END Apple SignIn
   */

  const componentDidMount = () => {
    return componentWillUnmount;
  };

  const componentWillUnmount = () => {};

  React.useEffect(componentDidMount, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          height: 2,
          backgroundColor: '#CCCCCC',
          marginBottom: 20,
        }}
      />
      <Button
        title="Accedi con Facebook"
        onPress={() =>
          onFacebookSignUpButtonPress()
            .then(() => {
              console.log('Account linked successfully with Facebook!');
            })
            .catch(error => {
              console.log(error);
            })
        }
      />
      <View
        style={{
          width: '100%',
          height: 2,
          backgroundColor: '#CCCCCC',
          margin: 20,
        }}
      />
      <Button
        title="Accedi con Google"
        onPress={() =>
          onGoogleSignUpButtonPress()
            .then(() => {
              console.log('Account linked successfully with Google!');
            })
            .catch(error => {
              console.log(error);
            })
        }
      />
      <View
        style={{
          width: '100%',
          height: 2,
          backgroundColor: '#CCCCCC',
          margin: 20,
        }}
      />
      {Platform.OS === 'ios' && (
        <>
          <AppleButton
            buttonStyle={AppleButton.Style.WHITE}
            buttonType={AppleButton.Type.CONTINUE}
            style={{
              width: 160,
              height: 45,
            }}
            onPress={() =>
              onAppleSignUpButtonPress()
                .then(() => {
                  console.log('Account linked successfully with Apple!');
                })
                .catch(error => {
                  console.log(error);
                })
            }
          />
          <View
            style={{
              width: '100%',
              height: 2,
              backgroundColor: '#CCCCCC',
              margin: 20,
            }}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default SocialLoginTestScreen;
