import React from "react";
import FastImage from "react-native-fast-image";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { constants, strings } from "../../../config";
import Strings from "../../../utils/misc/TextComponents";
import colors from "../../../config/colors";
import GoogleSignIn from "../../SignUpV2/_Functions/GoogleSignIn";
import { auth } from "../../../utils/firebase";
import { processSignedUser } from "../ViewModels/LoginViewModel";
import SocialSignInLoadingPopoverView from "./SocialSignInLoadingPopoverView";
import { CallServerPromise } from "../../../utils/app/CallServer";
import { routes } from "../../../navigation/rootNavigation/navigation.constants";
import ShowError, { ERROR_TYPE } from "../../SignUpV2/_Functions/ShowError";
import FacebookSignIn from "../../SignUpV2/_Functions/FacebookSignIn";
import { delay } from "../../../utils/misc/Timer";
import { has_facebook } from "../../SignUpV2/_Functions/SocialSignIn";
import SocialSignInProvidersPopoverView from "./SocialSignInProvidersPopoverView";
import AppleSignIn from "../../SignUpV2/_Functions/AppleSignIn";
import { GoogleSignin } from "@react-native-community/google-signin";
import { AppleButton } from "@invertase/react-native-apple-authentication";
import standardFunctions from "../../../utils/app/StandardFunctions";
import crashlytics from "@react-native-firebase/crashlytics";

const SOCIAL_PROVIDER_TYPE = {
  PASSWORD: 'password',
  GOOGLE: 'google.com',
  LINKEDIN: 'linkedin.com',
  INSTAGRAM: 'instagram.com',
  FACEBOOK: 'facebook.com',
  APPLE: 'apple.com',
};

const SOCIAL_SIGNIN = {
  [SOCIAL_PROVIDER_TYPE.PASSWORD]: {
    icon: require('../../../../assets/images/icons/icn_lock.png'),
    icon_popup: require('../../../../assets/images/icons/icn_lock.png'),
    text: strings.LOGINV2.SOCIAL_SIGNIN.PASSWORD,
  },
  [SOCIAL_PROVIDER_TYPE.GOOGLE]: {
    icon: require('../../../../assets/images/icons/icn_google_signin_white.png'),
    icon_popup: require('../../../../assets/images/icons/icn_google_signin.png'),
    text: strings.LOGINV2.SOCIAL_SIGNIN.GOOGLE,
  },
  [SOCIAL_PROVIDER_TYPE.LINKEDIN]: {
    icon: require('../../../../assets/images/icons/icn_check_selected.png'),
    icon_popup: require('../../../../assets/images/icons/icn_check_selected.png'),
    text: strings.LOGINV2.SOCIAL_SIGNIN.LINKEDIN,
  },
  [SOCIAL_PROVIDER_TYPE.INSTAGRAM]: {
    icon: require('../../../../assets/images/icons/icn_check_selected.png'),
    icon_popup: require('../../../../assets/images/icons/icn_check_selected.png'),
    text: strings.LOGINV2.SOCIAL_SIGNIN.INSTAGRAM,
  },
  [SOCIAL_PROVIDER_TYPE.FACEBOOK]: {
    icon: require('../../../../assets/images/icons/icn_facebook_signin_white.png'),
    icon_popup: require('../../../../assets/images/icons/icn_facebook_signin.png'),
    text: strings.LOGINV2.SOCIAL_SIGNIN.FACEBOOK,
  },
  [SOCIAL_PROVIDER_TYPE.APPLE]: {
    icon: require('../../../../assets/images/icons/icn_apple_signin.png'),
    icon_popup: require('../../../../assets/images/icons/icn_apple_signin.png'),
    text: strings.LOGINV2.SOCIAL_SIGNIN.APPLE,
  },
};

const socialSignInLoadingPopoverView = SocialSignInLoadingPopoverView();
const socialSignInProvidersPopoverView = SocialSignInProvidersPopoverView();

const ProceedSocialSignIn = async ({navigation, data}) => {
  let errorType = ERROR_TYPE.ERROR_SIGNING_IN_SOCIAL;
  const {credential, email, provider} = data;
  switch (provider) {
    case SOCIAL_PROVIDER_TYPE.GOOGLE:
      errorType = ERROR_TYPE.ERROR_SIGNING_IN_GOOGLE;
      break;
    case SOCIAL_PROVIDER_TYPE.FACEBOOK:
      errorType = ERROR_TYPE.ERROR_SIGNING_IN_FACEBOOK;
      break;
    case SOCIAL_PROVIDER_TYPE.APPLE:
      errorType = ERROR_TYPE.ERROR_SIGNING_IN_APPLE;
      break;
  }

  if (email === undefined) {
    await ShowError(ERROR_TYPE.ERROR_NEED_FB_EMAIL);
    return;
  }

  const request_univ_email = await CallServerPromise.check_is_university_email(
    email,
  );
  if (request_univ_email.success) {
    if (request_univ_email.data) {
      await ShowError(ERROR_TYPE.ERROR_IS_UNIVERSITY_EMAIL);
      return;
    }
  } else {
    await ShowError(ERROR_TYPE.ERROR_CREATING_USER);
    return;
  }

  try {
    const request = await CallServerPromise.check_email_exists(email);
    if (request.success && request.data === false) {
      // @ts-ignore
      global.navigationData = {data};
      navigation.navigate(routes.SIGNUPV2.SOCIALSIGNUP.NAME_INPUT);
    } else if (request.success && request.data === true) {
      if (provider === SOCIAL_PROVIDER_TYPE.FACEBOOK) {
        const providers = await auth().fetchSignInMethodsForEmail(email);
        if (has_facebook(providers)) {
          await auth().signInWithCredential(credential);
          await processSignedUser({
            navigation: navigation,
            email,
            socialSignInLoadingPopoverView,
          });
        } else {
          let other_providers = '';
          providers.forEach(function (provider) {
            if (provider === 'password') {
              other_providers = other_providers + 'email e password ';
            } else if (provider === 'facebook.com') {
              other_providers = other_providers + 'Facebook ';
            } else if (provider === 'google.com') {
              other_providers = other_providers + 'Google ';
            } else if (provider === 'apple.com') {
              other_providers = other_providers + 'Apple ';
            }
          });
          if (other_providers === '') {
            socialSignInProvidersPopoverView.show({navigation, providers: []});
          } else {
            socialSignInProvidersPopoverView.show({navigation, providers});
          }
        }
      } else {
        if (provider !== SOCIAL_PROVIDER_TYPE.APPLE) {
          await auth().signInWithCredential(credential);
        } else if (
          provider === SOCIAL_PROVIDER_TYPE.APPLE &&
          !auth().currentUser
        ) {
          await auth().signInWithCredential(credential);
        }
        await processSignedUser({
          navigation: navigation,
          email,
          socialSignInLoadingPopoverView,
        });
      }
    } else {
      await ShowError(errorType);
    }
  } catch (error) {
    await ShowError(errorType, error);
  }
};

const FacebookLogin = async navigation => {
  socialSignInLoadingPopoverView.show(SOCIAL_PROVIDER_TYPE.FACEBOOK);
  await delay(500);
  const facebookSignInResult = await FacebookSignIn();
  if (!facebookSignInResult.isCancelled) {
    const {facebook_access_token, credential} = facebookSignInResult;
    const facebookUser = facebookSignInResult.facebookUser;
    const {first_name, last_name, email, id} = facebookUser;
    const data = {
      email,
      profile_image_url:
        'https://graph.facebook.com/' + id + '/picture?height=300',
      firstname: first_name,
      lastname: last_name,
      provider: SOCIAL_PROVIDER_TYPE.FACEBOOK,
      credential,
      facebook_access_token,
    };
    await ProceedSocialSignIn({navigation, data});
  } else {
    console.log('cancelled', JSON.stringify(facebookSignInResult));
    let e = new Error(
      'Facebook Login Cancelled: ' + JSON.stringify(facebookSignInResult),
    );
    crashlytics().recordError(e);
    standardFunctions.add_firebase_event_log('facebook', 'lgn_error', {e});
    // standardFunctions.show_alert(strings.LOGINV2.SOCIAL_SIGNIN.FACEBOOK_CANCELLED_TITLE, strings.LOGINV2.SOCIAL_SIGNIN.FACEBOOK_CANCELLED_MESSAGE);
    socialSignInLoadingPopoverView.hide();
  }
};

const GoogleLogin = async navigation => {
  try {
    if (await GoogleSignin.isSignedIn()) {
      await GoogleSignin.signOut();
    }
  } catch (e) {
    console.log('error on revoking access from Google Signin', e);
  }
  socialSignInLoadingPopoverView.show(SOCIAL_PROVIDER_TYPE.GOOGLE);
  const googleSignInResult = await GoogleSignIn(socialSignInLoadingPopoverView);
  const credential = googleSignInResult.googleCredential;
  const googleUser: any = googleSignInResult.googleUser;
  const email = googleUser.email;
  const {photo, givenName, familyName} = googleUser;
  const data = {
    email,
    profile_image_url: photo,
    firstname: givenName,
    lastname: familyName,
    provider: SOCIAL_PROVIDER_TYPE.GOOGLE,
    credential,
  };
  await ProceedSocialSignIn({navigation, data});
};

const AppleLogin = async navigation => {
  try {
    const appleSignInResult = await AppleSignIn();
    socialSignInLoadingPopoverView.show(SOCIAL_PROVIDER_TYPE.APPLE);
    const {credential} = appleSignInResult;
    const appleUser = appleSignInResult.appleUser;
    const {firstname, lastname, email} = appleUser;
    const data = {
      email: email || '',
      firstname,
      lastname,
      provider: SOCIAL_PROVIDER_TYPE.APPLE,
      credential,
    };
    // console.log('apple login data', data);
    await ProceedSocialSignIn({navigation, data});
  } catch (error) {
    console.log('error on apple login', error);
  }
};

const SocialLogin = async (socialType, navigation, onPress) => {
  try {
    onPress && onPress();
    switch (socialType) {
      case SOCIAL_PROVIDER_TYPE.FACEBOOK:
        await FacebookLogin(navigation);
        break;
      case SOCIAL_PROVIDER_TYPE.GOOGLE:
        await GoogleLogin(navigation);
        break;
      case SOCIAL_PROVIDER_TYPE.APPLE:
        await AppleLogin(navigation);
        break;
    }
    socialSignInLoadingPopoverView.hide();
  } catch (e) {
    console.log('const SocialLogin ', e);
    crashlytics().recordError(e);
    standardFunctions.add_firebase_event_log('facebook', 'lgn_error', {e});
    standardFunctions.show_alert(
      strings.LOGINV2.SOCIAL_SIGNIN.CATCH_ERROR_SOCIAL_TITLE,
      strings.LOGINV2.SOCIAL_SIGNIN.CATCH_ERROR_SOCIAL_MESSAGE,
    );
    socialSignInLoadingPopoverView.hide();
  }
};

const SocialSignInButton = props => {
  const {type, style, navigation} = props;
  // const navigation = useNavigation();
  if (type === SOCIAL_PROVIDER_TYPE.APPLE && Platform.OS === 'android') {
    return null;
  }
  return type !== SOCIAL_PROVIDER_TYPE.APPLE ? (
    <TouchableOpacity
      // onPress={() => props.onPress && props.onPress()}
      onPress={() => SocialLogin(type, navigation, props.onPress)}
      style={[
        styles.socialLoginButton,
        style,
        type === SOCIAL_PROVIDER_TYPE.FACEBOOK && {
          backgroundColor: colors.facebook_theme,
        },
        type === SOCIAL_PROVIDER_TYPE.GOOGLE && {
          backgroundColor: colors.google_theme,
        },
      ]}>
      <FastImage
        resizeMode={'contain'}
        style={styles.socialLoginButtonIcon}
        source={SOCIAL_SIGNIN[type].icon}
      />
      <Text style={[styles.socialLoginButtonText]}>
        {Strings.makeBold(SOCIAL_SIGNIN[type].text, {})}
      </Text>
    </TouchableOpacity>
  ) : (
    <View style={[styles.socialLoginButton, style, {backgroundColor: 'black'}]}>
      <AppleButton
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.CONTINUE}
        cornerRadius={25}
        style={{
          width: '100%',
          height: 50,
        }}
        onPress={() => SocialLogin(type, navigation, props.onPress)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  socialLoginButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: 15,
    shadowColor: colors.gray,
    shadowOpacity: 0.25,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 8,
    elevation: 3,
    flexDirection: 'row',
  },
  socialLoginButtonIcon: {
    width: 16,
    height: '100%',
    marginRight: 8,
  },
  socialLoginButtonText: {
    fontSize: 19,
    fontFamily: constants.DEFAULT_FONT_SEMIBOLD,
    color: colors.WHITE,
  },
  socialLoginButtonIconApple: {
    width: 24,
    height: '100%',
    marginRight: 1,
  },
  socialLoginButtonTextApple: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 19,
    marginBottom: 1,
  },
});

export default SocialSignInButton;
export {SOCIAL_PROVIDER_TYPE, SocialLogin, SOCIAL_SIGNIN};
