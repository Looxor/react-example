import { Observable, useViewModel, ViewModelBase } from "../../_CommonModels/ViewModelBase";
import ValidationRules from "../../../utils/forms/validationRules";
import { routes } from "../../../navigation/rootNavigation/navigation.constants";
import { auth } from "../../../utils/firebase";
import { Firebase_IDToken, UserData } from "../../../config/constants";
import PushNotification from "../../../utils/app/PushNotification";
import { CallServerPromise } from "../../../utils/app/CallServer";
import { CommonActions as NavigationActions } from "@react-navigation/native";
import { CONFIRM_EMAIL_TYPE } from "../../SignUp/EmailPendingScreen";
import standardFunctions from "../../../utils/app/StandardFunctions";
import { constants, strings } from "../../../config";
import SocialSignInLoadingPopoverView from "../_Components/SocialSignInLoadingPopoverView";
import SocialSignInProvidersPopoverView from "../_Components/SocialSignInProvidersPopoverView";
import moment from "moment";
import { Linking } from "react-native";
import ShowError, { ERROR_TYPE } from "../../SignUpV2/_Functions/ShowError";
import NavigationService from "../../../utils/app/NavigationService";

const VALIDATION_RULES = {
  email: {
    isRequired: true,
    isEmail: true,
  },
  password: {
    isRequired: true,
  },
};

const getUserDataByTokenEx = async Firebase_IDToken => {
  try {
    const request = await CallServerPromise.get_user_data(Firebase_IDToken);
    if (request.success) {
      const userData = request.data;
      userData.Firebase_IDToken = Firebase_IDToken;
      return userData;
    } else {
      return request;
    }
  } catch (error) {
    console.log('const getUserDataByTokenEx', error);
    return false;
  }
};

const gotoAddMajorEmailScreen = async navigation => {
  NavigationActions.navigate(routes.AUTH, {
    screen: routes.SIGNUP.ADD_MAJOR_EMAIL,
  });
};

const processSignedUser = async (params: any) => {
  const {
    navigation,
    email,
    password,
    SignUpInfo,
    cancelLoading,
    socialSignInLoadingPopoverView,
  } = params;
  try {
    const signedUser = auth().currentUser;

    const firebaseToken = (await signedUser.getIdToken(true)) || '';
    if (firebaseToken) {
      Firebase_IDToken.setIDToken(firebaseToken);
      const userData = await getUserDataByTokenEx(firebaseToken);
      if (cancelLoading) {
        cancelLoading();
      }
      if (userData.error) {
        if (userData.error === 'email not verified') {
          NavigationService.replace(routes.SIGNUP.EMAIL_PENDING_SCREEN, {
            type: CONFIRM_EMAIL_TYPE.STANDARD,
          });
        } else if (userData.error === 'invalid firebase uid' && SignUpInfo) {
          await SignUpInfo.setValue({email: email, password: password}); // setValue needs await
          NavigationService.replace(routes.SIGNUPV2.EMAILSIGNUP.NAME_INPUT);
          return;
        } else {
          await auth().signOut();
          await loginError(
            userData.error,
            email,
            navigation,
            socialSignInLoadingPopoverView,
          );
        }
      } else {
        await PushNotification.registerDeviceToken();
        const request = await CallServerPromise.is_standard_email_missing();

        if (request.success) {
          const is_missing = request.data;
          if (is_missing) {
            gotoAddMajorEmailScreen(navigation);
          } else {
            await UserData.setUserData(userData);
            // MISSING
            NavigationService.replace(routes.MAIN);
          }
        } else {
          await UserData.setUserData(userData);
          NavigationService.replace(routes.MAIN);
        }
      }
    } else {
      console.log('invalid firebaseToken');
      await loginError('', email, navigation, socialSignInLoadingPopoverView);
    }
  } catch (error) {
    console.log(error);
    await loginError(error, email, navigation, socialSignInLoadingPopoverView);
  }
};

const showLinkedSocialPullView = (
  socialProviders: any,
  email: string,
  navigation: any,
) => {
  SocialSignInProvidersPopoverView().show({
    navigation: navigation,
    providers: socialProviders,
  });
};

const loginError = async (
  error: any,
  email: string,
  navigation?: any,
  socialSignInLoadingPopoverView?: any,
) => {
  const request = await CallServerPromise.check_email_exists(email);
  const providers = await auth().fetchSignInMethodsForEmail(email);
  if (request.success && error !== 'account is disabled') {
    if (!request.data) {
      if (providers.length !== 0) {
        if (!(providers.indexOf('password') > -1)) {
          showLinkedSocialPullView(providers, email, navigation);
          return;
        }
      }
    } else {
      const request_univ_email =
        await CallServerPromise.check_is_university_email(email);
      if (request_univ_email.success && request_univ_email.data) {
        await ShowError(ERROR_TYPE.ERROR_IS_UNIVERSITY_EMAIL);
        return;
      } else if (!(providers.indexOf('password') > -1)) {
        showLinkedSocialPullView(providers, email, navigation);
        return;
      }
    }
  }

  socialSignInLoadingPopoverView !== undefined
    ? socialSignInLoadingPopoverView.hide()
    : null;
  if (error) {
    if (error.code == 'auth/wrong-password') {
      await standardFunctions.show_alert_async(
        strings.ALERTS.ERRORS.LOGIN.TITLE,
        strings.ALERTS.ERRORS.LOGIN.WRONG_EMAIL_OR_PASSWORD,
      );
    } else if (error.code == 'auth/unknown') {
      if (error.message.indexOf('Too many unsuccessful login') > -1) {
        await standardFunctions.show_alert_async(
          strings.ALERTS.ERRORS.LOGIN.TITLE,
          strings.ALERTS.ERRORS.LOGIN.TOO_MANY_UNSUCCESSFUL_LOGIN,
        );
      } else {
        universityEmailError(email);
      }
    } else if (error.code == 'auth/user-disabled') {
      await standardFunctions.show_alert_async(
        strings.ALERTS.ERRORS.LOGIN.TITLE,
        strings.ALERTS.ERRORS.LOGIN.USER_DISABLED,
      );
    } else if (error.code == 'auth/too-many-requests') {
      await standardFunctions.show_alert_async(
        strings.ALERTS.ERRORS.LOGIN.TITLE,
        strings.ALERTS.ERRORS.LOGIN.TOO_MANY_REQUEST,
      );
    } else if (error.code == 'auth/network-request-failed') {
      await standardFunctions.show_alert_async(
        strings.ALERTS.ERRORS.LOGIN.TITLE,
        strings.ALERTS.ERRORS.LOGIN.NETWORK_REQUEST_FAILED,
      );
    } else if (error.code === 'auth/firebase-auth') {
      await standardFunctions.show_alert_async(
        strings.ALERTS.ERRORS.LOGIN.TITLE,
        strings.OTHER.CANT_USE_FIREBASE,
      );
    } else if (error.code === 'auth/user-not-found') {
      await standardFunctions.show_alert_async(
        strings.ALERTS.ERRORS.LOGIN.TITLE,
        strings.ALERTS.ERRORS.LOGIN.WRONG_EMAIL_OR_PASSWORD,
      );
    } else if (error == 'account is disabled') {
      await standardFunctions.show_alert(
        strings.ALERTS.ERRORS.LOGIN.ACCOUNT_IS_DISABLED_TITLE,
        strings.ALERTS.ERRORS.LOGIN.ACCOUNT_IS_DISABLED_MESSAGE,
      );
    } else {
      universityEmailError(email);
    }
  } else {
    universityEmailError(email);
  }
};

const universityEmailError = async email => {
  const request = await CallServerPromise.is_student_email(email);
  if (request.success) {
    const already_exists = request.data;
    if (already_exists) {
      standardFunctions.show_alert(
        strings.ALERTS.ERRORS.LOGIN.TITLE,
        strings.ALERTS.ERRORS.LOGIN.IS_UNIVERSITY_EMAIL,
      );
    } else {
      standardFunctions.show_alert(
        strings.ALERTS.ERRORS.LOGIN.TITLE,
        strings.ALERTS.ERRORS.LOGIN.WRONG_EMAIL_OR_PASSWORD,
      );
    }
  } else {
    standardFunctions.show_alert(
      strings.ALERTS.ERRORS.LOGIN.TITLE,
      strings.ALERTS.ERRORS.LOGIN.WRONG_EMAIL_OR_PASSWORD,
    );
  }
};

const openEmailComposeScreen = async () => {
  const receiver_email = constants.SUPPORT_EMAIL;
  const currentDateTime = moment().format('DD/MM/YYYY k:m');

  const subject = escape(
    strings.SETTINGS.HOME.EMAIL_SUPPORT_SUBJECT_ACCOUNT_DISABLED,
  );
  let body = strings.SETTINGS.HOME.EMAIL_SUPPORT_BODY_ACCOUNT_DISABLED;
  body = body.replace('[DATETIME]', currentDateTime);
  body = escape(body);

  try {
    const result = await Linking.openURL(
      `mailto:${receiver_email}?subject=${subject}&body=${body}`,
    );
  } catch (error) {
    standardFunctions.show_alert(
      strings.SETTINGS.HOME.NEED_HELP,
      strings.SETTINGS.HOME.EMAIL_CLIENT_NO_EXITS,
    );
  }
};

class LoginViewModel extends ViewModelBase {
  email: string;
  password: string;
  valid: boolean;
  loading: boolean;
  socialSignInLoadingPopoverView: any;
  navigation: any;
  SignUpInfo: Observable;

  constructor() {
    super();
    this.email = '';
    this.password = '';
    this.valid = false;
    this.loading = false;
    this.socialSignInLoadingPopoverView = SocialSignInLoadingPopoverView();
    this.SignUpInfo = new Observable(this, 'SignUpInfo', {});
  }

  onChangeText(text, key) {
    this[key] = text;
    // const form = {email: this.email, password: this.password};
    this.valid =
      ValidationRules(this.email, VALIDATION_RULES['email']) &&
      ValidationRules(this.password, VALIDATION_RULES['password']);

    this.updateView();
  }

  onPressForgotPassword() {
    const {navigation} = this.props;
    navigation.navigate(routes.RESET_PASSWORD);
  }

  onPressRegisterByEmail() {
    const {navigation} = this.props;
    navigation.navigate(routes.SIGNUPV2.EMAILSIGNUP.EMAIL_INPUT);
  }

  async onPressEmailLogin() {
    try {
      this.loading = true;
      this.updateView();
      await auth().signInWithEmailAndPassword(this.email, this.password);
      await processSignedUser({
        navigation: this.props.navigation,
        email: this.email,
        password: this.password,
        SignUpInfo: this.SignUpInfo,
        cancelLoading: () => {
          this.loading = false;
          this.updateView();
        },
      });
    } catch (error) {
      this.loading = false;
      this.updateView();
      await loginError(error, this.email, this.props.navigation);
    }
  }

  componentDidMount() {
    this.email = '';
    this.password = '';
    this.loading = false;
    this.valid = false;
    this.updateView();
  }
}

export default useViewModel(new LoginViewModel());
export {getUserDataByTokenEx, processSignedUser};
