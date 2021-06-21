import { Observable, useViewModel, ViewModelBase } from "../../../_CommonModels/ViewModelBase";
import { routes } from "../../../../navigation/rootNavigation/navigation.constants";
import { CallServerPromise } from "../../../../utils/app/CallServer";
import ShowError, { ERROR_TYPE } from "../../_Functions/ShowError";
import { delay } from "../../../../utils/misc/Timer";
import standardFunctions from "../../../../utils/app/StandardFunctions";

class NameInputViewModel extends ViewModelBase {
  nickname: string;
  firstname: string;
  lastname: string;
  nickNameExists: boolean;
  validContinue: boolean;
  loading: boolean;
  SignUpInfo: Observable;

  constructor() {
    super();
    this.SignUpInfo = new Observable(this, 'SignUpInfo', {});
  }

  onChangeValue(key, value) {
    if (key) this[key] = value;
    if (key === 'nickname') this.nickNameExists = false;
    this.validContinue = !!this.nickname && !!this.firstname && !!this.lastname;
    this.updateView();
  }

  async onPressContinue() {
    standardFunctions.add_firebase_event_log(
      'email_signup',
      'btn_name_clicked',
    );
    this.loading = true;
    this.updateView();

    if (this.nickname.includes(' ')) {
      await ShowError(ERROR_TYPE.ERROR_NICKNAME_WITHOUT_SPACES);
      this.loading = false;
      this.updateView();
      return;
    }

    if (this.nickname.length < 4 || this.nickname.length > 13) {
      await ShowError(ERROR_TYPE.ERROR_NICKNAME_TOO_LONG);
      this.loading = false;
      this.updateView();
      return;
    }

    try {
      const request = await CallServerPromise.check_nickname_exists(
        this.nickname,
      );
      if (request.success) {
        if (request.data === true) {
          this.nickNameExists = true;
        } else {
          const orgSignUpInfo = this.SignUpInfo.getValue();
          await this.SignUpInfo.setValue({
            ...orgSignUpInfo,
            nickname: this.nickname,
            firstname: this.firstname,
            lastname: this.lastname,
          });
          await delay(500);
          this.props.navigation.navigate(routes.SIGNUPV2.TERMS_AND_CONDITION, {
            createMode: 'email',
          });
        }
      } else {
        await ShowError(ERROR_TYPE.ERROR_CHECKING_NICKNAME);
      }
      this.loading = false;
      this.updateView();
    } catch (error) {
      await ShowError(ERROR_TYPE.ERROR_CHECKING_NICKNAME, error);
      this.loading = false;
      this.updateView();
    }
  }

  componentDidMount() {
    this.nickname = '';
    this.firstname = '';
    this.lastname = '';
    this.nickNameExists = false;
    this.validContinue = false;
    this.loading = false;
    this.onChangeValue('', '');
  }
}

export default useViewModel(new NameInputViewModel());
