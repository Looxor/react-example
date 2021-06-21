import { Observable, useViewModel, ViewModelBase } from "../../../_CommonModels/ViewModelBase";
import ValidationRules, {
  validateMinLength,
  validateMustContainLowerCase,
  validateMustContainNumber,
  validateMustContainUpperCase
} from "../../../../utils/forms/validationRules";
import standardFunctions from "../../../../utils/app/StandardFunctions";
import { strings } from "../../../../config";
import { routes } from "../../../../navigation/rootNavigation/navigation.constants";
import { auth } from "../../../../utils/firebase";

import ShowError, { ERROR_TYPE } from "../../_Functions/ShowError";
import { CallServerPromise } from "../../../../utils/app/CallServer";
import SocialSignInProvidersPopoverView from "../../../LoginV2/_Components/SocialSignInProvidersPopoverView";

const VALIDATION_RULES = {
  email: {
    isRequired: true,
    isEmail: true,
  },
};

class EmailInputViewModel extends ViewModelBase {
  email: string;
  password: string;
  legendCheck1: boolean;
  legendCheck2: boolean;
  legendCheck3: boolean;
  loading: boolean;
  validContinue: boolean;
  emailExists: boolean;
  isUniversityEmail: boolean;
  SignUpInfo: Observable;

  constructor() {
    super();
    this.email = '';
    this.password = '';
    this.SignUpInfo = new Observable(this, 'SignUpInfo', {});
  }

  onChangeValue(key, value) {
    if (key) this[key] = value;
    if (key === 'email') this.emailExists = false;
    this.legendCheck1 = validateMinLength(this.password, 8);
    this.legendCheck2 =
      validateMustContainUpperCase(this.password) &&
      validateMustContainLowerCase(this.password);
    this.legendCheck3 = validateMustContainNumber(this.password);
    this.validContinue =
      ValidationRules(this.email, VALIDATION_RULES['email']) &&
      this.legendCheck1 &&
      this.legendCheck2 &&
      this.legendCheck3;
    this.updateView();
  }

  showLinkedEmailDialog() {
    standardFunctions.show_alert_with_buttons(
      strings.SIGNUPV2.EMAILSIGNUP.EMAIL_INPUT.ALREADY_LINKED_EMAIL,
      strings.SIGNUPV2.EMAILSIGNUP.EMAIL_INPUT.ALREADY_LINKED_EMAIL_DESC,
      false,
      [
        {
          text: strings.OTHER.CANCEL,
          onPress: () => null,
        },
        {
          text: strings.OTHER.OK,
          onPress: () => {
            this.props.navigation.goBack(null);
          },
        },
      ],
    );
  }

  showLinkedSocialPullView(socialProviders, email) {
    // LinkedSocialPullView().show({navigation: this.props.navigation, socialProviders, email});
    SocialSignInProvidersPopoverView().show({
      navigation: this.props.navigation,
      providers: socialProviders,
    });
  }

  async goNextScreen() {
    this.loading = false;
    this.updateView();
    await this.SignUpInfo.setValue({
      email: this.email,
      password: this.password,
    }); // setValue needs await
    this.props.navigation.navigate(routes.SIGNUPV2.EMAILSIGNUP.NAME_INPUT);
  }

  async onPressContinue() {
    standardFunctions.add_firebase_event_log(
      'email_signup',
      'btn_email_clicked',
    );
    try {
      await this.goNextScreen();
      return;
      this.loading = true;
      this.isUniversityEmail = false;
      this.updateView();

      let request_univ_email =
        await CallServerPromise.check_is_university_email(this.email);
      if (request_univ_email.success) {
        if (request_univ_email.data) {
          // await ShowError(ERROR_TYPE.ERROR_IS_UNIVERSITY_EMAIL);
          this.loading = false;
          this.isUniversityEmail = true;
          this.updateView();
          return;
        }
      } else {
        await ShowError(ERROR_TYPE.ERROR_CREATING_USER);
        return;
      }

      const request = await CallServerPromise.check_email_exists(this.email);
      const providers = await auth().fetchSignInMethodsForEmail(this.email);

      if (request.success) {
        if (request.data === false) {
          if (providers.length === 0) {
            await this.goNextScreen();
            return; // should avoid rendering (updateView) when go to another screen
          } else {
            if (providers.indexOf('password') > -1) {
              // this.showLinkedEmailDialog();
              this.showLinkedSocialPullView(['password'], this.email);
            } else {
              this.showLinkedSocialPullView(providers, this.email);
            }
          }
        } else {
          if (providers.indexOf('password') > -1) {
            console.log('providers =============', providers);
            this.showLinkedEmailDialog();
          } else {
            this.showLinkedSocialPullView(providers, this.email);
          }
        }
      } else {
        await ShowError(ERROR_TYPE.ERROR_GETTING_SIGNIN_METHOD);
      }
      this.loading = false;
      this.updateView();
    } catch (error) {
      await ShowError(ERROR_TYPE.ERROR_GETTING_SIGNIN_METHOD, error);
      this.loading = false;
      this.updateView();
    }
  }

  componentDidMount() {
    this.email = '';
    this.password = '';
    this.legendCheck1 = false;
    this.legendCheck2 = false;
    this.legendCheck3 = false;
    this.loading = false;
    this.emailExists = false;
    this.isUniversityEmail = false;
    this.validContinue = true;
    this.onChangeValue('', '');
  }
}

export default useViewModel(new EmailInputViewModel());
