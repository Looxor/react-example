import { Observable, useViewModel, ViewModelBase } from "../../_CommonModels/ViewModelBase";
import { Firebase_IDToken, UserData } from "../../../config/constants";
import { auth } from "../../../utils/firebase";
import ShowError, { ERROR_TYPE } from "../_Functions/ShowError";
import { CallServerPromise } from "../../../utils/app/CallServer";
import { routes } from "../../../navigation/rootNavigation/navigation.constants";
import { getUserDataByTokenEx } from "../../LoginV2/ViewModels/LoginViewModel";
import { SOCIAL_PROVIDER_TYPE } from "../../LoginV2/_Components/SocialSignInButton";
import standardFunctions from "../../../utils/app/StandardFunctions";
import NavigationService from "../../../utils/app/NavigationService";

const TERMS = {
  MARKETING: 'Marketing',
  DATA: 'Data',
  LICENSE: 'License',
};

class TermsAndConditionViewModel extends ViewModelBase {
  legalCheck_MARKETING: boolean;
  legalCheck_DATA: boolean;
  legalCheck_LICENSE: boolean;
  createMode: string;
  validContinue: boolean;
  loading: boolean;
  SignUpInfo: Observable;

  constructor() {
    super();
    this.SignUpInfo = new Observable(this, 'SignUpInfo', {});
  }

  async onPressContinue() {
    try {
      this.loading = true;
      this.updateView();
      const signUpInfo = this.SignUpInfo.getValue();
      if (this.createMode === 'email') {
        console.log(signUpInfo);
        const result: any = await this.createUserWithEmail(signUpInfo);
        if (result === true) {
          this.props.navigation.navigate(
            routes.SIGNUPV2.EMAILSIGNUP.EMAIL_PENDING,
          );
        }
      } else if (this.createMode === 'social') {
        const result: any = await this.createUserWithSocial(signUpInfo);
        if (result === true) {
          NavigationService.replace(routes.MAIN);
        }
      }
      this.loading = false;
      this.updateView();
    } catch (e) {
      await ShowError(ERROR_TYPE.ERROR_CREATING_USER);
      this.loading = false;
      this.updateView();
    }
  }

  async createUserWithEmail(signUpInfo) {
    try {
      const signedUser = auth().currentUser;
      let signedUserEmail = '';
      if (signedUser) {
        if (signedUser.email) {
          signedUserEmail = signedUser.email;
        }
      }
      standardFunctions.add_firebase_event_log(
        'email_signup',
        'create_user_clicked',
      );
      const {email, password} = signUpInfo;
      if (!signedUser || signedUserEmail !== email) {
        try {
          await auth().signOut();
        } catch (e) {}
        await auth().createUserWithEmailAndPassword(email, password);
      }
      const firebaseUser = auth().currentUser;
      if (firebaseUser) {
        delete signUpInfo['password'];
        return await this.createUser(signUpInfo, firebaseUser);
      } else {
        await ShowError(ERROR_TYPE.ERROR_CREATING_USER);
      }
    } catch (e) {
      await ShowError(ERROR_TYPE.ERROR_CREATING_USER);
    }
  }

  async createUserWithSocial(signUpInfo) {
    standardFunctions.add_firebase_event_log(
      'scl_signup',
      'create_user_clicked',
    );
    try {
      const {credential, provider} = signUpInfo;
      if (provider != SOCIAL_PROVIDER_TYPE.APPLE && !auth().currentUser) {
        await auth().signInWithCredential(credential);
      }

      const firebaseUser = auth().currentUser;
      if (firebaseUser) {
        delete signUpInfo['provider'];
        delete signUpInfo['credential'];
        if (!signUpInfo['email']) {
          signUpInfo['email'] = firebaseUser.email;
        }
        return await this.createUser(signUpInfo, firebaseUser);
      } else {
        await ShowError(ERROR_TYPE.ERROR_CREATING_USER);
      }
    } catch (error) {
      console.log('error on createUserWithSocial', error);
      await ShowError(ERROR_TYPE.ERROR_RETRY_A_NEW_SIGNUP);
    }
  }

  async createUser(signUpInfo, firebaseUser) {
    signUpInfo['legal_check'] = {
      marketing: this.legalCheck_MARKETING,
      data: this.legalCheck_DATA,
      license: this.legalCheck_LICENSE,
    };
    signUpInfo['is_student'] = false;
    try {
      const idToken = await firebaseUser.getIdToken();
      Firebase_IDToken.setIDToken(idToken);
      let returnValue = false;
      signUpInfo['firebase_idToken'] = idToken;
      const request = await CallServerPromise.create_standard_account_v2(
        signUpInfo,
      );
      const userData = await getUserDataByTokenEx(idToken);
      await UserData.setUserData(userData);
      if (request.success) {
        returnValue = true;
      } else {
        await ShowError(ERROR_TYPE.ERROR_CREATING_USER, request);
      }
      this.loading = false;
      this.updateView();
      return returnValue;
    } catch (error) {
      await ShowError(ERROR_TYPE.ERROR_CREATING_USER, error);
      this.loading = false;
      this.updateView();
      return false;
    }
  }

  termsCheckHandler(term) {
    standardFunctions.add_firebase_event_log(
      'signup',
      'legal_' + term.toLowerCase() + '_clicked',
    );
    switch (term) {
      case TERMS.MARKETING:
        this.legalCheck_MARKETING = !this.legalCheck_MARKETING;
        break;
      case TERMS.DATA:
        this.legalCheck_DATA = !this.legalCheck_DATA;
        break;
      case TERMS.LICENSE:
        this.legalCheck_LICENSE = !this.legalCheck_LICENSE;
        break;
    }
    if (term) {
      this.validContinue = this.legalCheck_LICENSE;
      this.updateView();
    }
  }

  componentDidMount() {
    const {
      route: {params = {}},
    } = this.props;
    const createMode = params['createMode'];
    this.createMode = createMode === 'social' ? 'social' : 'email';
    this.legalCheck_MARKETING = false;
    this.legalCheck_DATA = false;
    this.legalCheck_LICENSE = false;
    this.validContinue = false;
    this.loading = false;
    this.updateView();
  }
}

export default useViewModel(new TermsAndConditionViewModel());
export {TERMS};
