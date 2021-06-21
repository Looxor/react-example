import {useViewModel, ViewModelBase} from '../../_CommonModels/ViewModelBase';
import User from '../../Settings/Models/User';
import {UserData} from '../../../config/constants';
import Moment from 'moment';
import {CallServerPromise} from '../../../utils/app/CallServer';
import ShowMessage, {GetMessage, MESSAGE_TYPE} from '../_Functions/ShowMessage';
import SaveSuccessPopoverView from '../Views/PersonInfoBlock/_Components/SaveSuccessPopover';
import NavigationService from '../../../utils/app/NavigationService';
import {routes} from '../../../navigation/rootNavigation/navigation.constants';
import {strings} from '../../../config';
import standardFunctions from '../../../utils/app/StandardFunctions';
import {
  loadCouponList,
  loadObtainedCouponList,
} from '../../Benefits/_ReduxStore/_actions';
import {store} from '../../../config/redux/store';
import {refreshTotalCoins} from '../../Home/HomeScreen';
import {handleUser} from '../../../utils/firebase/authUtils';
import {auth} from '../../../utils/firebase';

class HomeScreenViewModel extends ViewModelBase {
  user: any;
  headerBlockData: any;
  personInfoBlockData: any;
  userTypeBlockData: any;
  static_rewards: any;
  faculty_name: string;
  readyToShow: boolean = false;
  savingPersonInfoData: boolean = false;
  savingUserTypeData: boolean = false;
  loadingRefresh: boolean = false;
  firstLoaded: boolean = false;
  apiCallInterval: any = null;
  pendingDataToSave: any = null;

  constructor() {
    super();
    this.user = null;
    this.headerBlockData = {};
    this.personInfoBlockData = {};
    this.userTypeBlockData = {};
    this.static_rewards = {};
    this.faculty_name = '';
    this.readyToShow = false;
    this.savingPersonInfoData = false;
    this.savingUserTypeData = false;
    this.loadingRefresh = false;
  }

  async getStaticRewardValues() {
    try {
      const request = await CallServerPromise.get_many_static_variables([
        'basic_data_reward',
        'type_data_reward',
      ]);
      if (request.success) {
        return request.data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  async getStudentVerificationInProgress() {
    try {
      const request =
        await CallServerPromise.check_is_verify_student_available();
      return request;
    } catch (error) {
      return {success: false};
    }
  }

  async initValues() {
    this.readyToShow = false;
    this.updateView();
    const user = new User(UserData.getUserData());
    let studentVerificationData: any =
      await this.getStudentVerificationInProgress();
    user.emailVerifyInProgress =
      studentVerificationData.success &&
      studentVerificationData.data &&
      studentVerificationData.data.status ===
        'student email verification in progress';
    user.cardVerifyInProgress =
      studentVerificationData.success &&
      studentVerificationData.data &&
      studentVerificationData.data.status ===
        'student card verification in progress';
    const static_rewards = (await this.getStaticRewardValues()) || {};

    let description_message = '';
    if (
      !user.rewards.basic_data &&
      !user.rewards.type_data &&
      !user.faculty_id
    ) {
      description_message = strings.PROFILE.MESSAGE.DESCRIPTION_LABEL_NEW;
    } else if (
      (!user.rewards.basic_data && !user.rewards.type_data) ||
      (!user.rewards.type_data && !user.faculty_id) ||
      (!user.rewards.basic_data && !user.faculty_id)
    ) {
      description_message = strings.PROFILE.MESSAGE.DESCRIPTION_LABEL_NEW;
    } else if (!user.rewards.basic_data) {
      description_message = strings.PROFILE.MESSAGE.DESCRIPTION_LABEL.replace(
        '{WHAT}',
        strings.PROFILE.MESSAGE.DESCRIPTION_LABEL_BASIC_DATA,
      ).replace('{COIN}', static_rewards.basic_data_reward);
    } else if (!user.rewards.type_data) {
      description_message = strings.PROFILE.MESSAGE.DESCRIPTION_LABEL.replace(
        '{WHAT}',
        strings.PROFILE.MESSAGE.DESCRIPTION_LABEL_USER_TYPE,
      ).replace('{COIN}', static_rewards.basic_data_reward);
    } else if (!user.rewards.faculty_id) {
      description_message =
        strings.PROFILE.MESSAGE.DESCRIPTION_LABEL_FACULTY.replace(
          '{WHAT}',
          strings.PROFILE.MESSAGE.DESCRIPTION_LABEL_FACULTY_DATA,
        );
    }

    this.headerBlockData = {
      nickName: user.nickname,
      fullName: `${user.firstname} ${user.lastname}`,
      email: user.email,
      progress: user.getProfileProgress(),
      descriptionDesc: description_message,
      profile_image_url: user.profile_image_url,
    };
    this.personInfoBlockData = {
      coin: static_rewards.basic_data_reward,
      gender: user.gender,
      contact_email: user.contact_email,
      mainEmail: user.email,
      useMainEmail: user.useMainEmail,
      birthday: user.birthday ? Moment(user.birthday).format('DD/MM/YYYY') : '',
      rewards: user.rewards,
    };
    this.userTypeBlockData = {
      user_type: user.user_type,
      coin: static_rewards.type_data_reward,
      selectedButtonIndex: [
        'university_student',
        'high_school_student',
        'not_a_student',
      ].indexOf(user.user_type),
      // Not a student
      education_level: user.education_level,
      hometown: user.hometown,
      // High School
      high_school_name: user.high_school_name,
      high_school_year: user.high_school_year,
      rewards: user.rewards,
      // Student
      major_id: '',
      major_name: user.major_name,
      university_year: user.university_year,
      resident_student: user.resident_student,
      email_verification_in_progress: user.emailVerifyInProgress,
      card_verification_in_progress: user.cardVerifyInProgress,
      university_name: user.university_name
        ? user.university_name
        : studentVerificationData.data.last_values
        ? studentVerificationData.data.last_values.university_name
        : '',
      studytown: user.studytown
        ? user.studytown
        : studentVerificationData.data.last_values
        ? studentVerificationData.data.last_values.studytown
        : '',
      student_email: user.student_email
        ? user.student_email
        : studentVerificationData.data.last_values
        ? studentVerificationData.data.last_values.student_email
        : '',
      editLabelToShow: !(user.university_name && user.studytown),
    };

    this.faculty_name = user.d('faculty_name');
    this.user = user;
    this.static_rewards = static_rewards;

    this.readyToShow = true;
    this.updateView();
  }

  onAfterSaveFaculty() {
    this.initValues();
  }

  // ========= Basic Data ==============
  onAfterConfirmedContactEmail() {
    this.initValues();
  }

  onProfileImageChanged() {
    this.initValues();
  }

  toISODate(itLocaleDate) {
    const [D, M, Y] = itLocaleDate.split(/[\\\/-]/gi);
    return `${Y}-${M}-${D}T00:00:00.000Z`;
  }

  async checkContactEmailCanVerify() {
    try {
      const request =
        await CallServerPromise.check_is_verify_contact_available();
      if (request.success && request.data) {
        return request.data.is_available;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  async checkContactEmailAlreadyExists(email) {
    try {
      const request = await CallServerPromise.check_email_exists(email);
      if (request.success && request.data) {
        return request.data;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  async verifyContactEmail(contact_email) {
    try {
      const request = await CallServerPromise.verify_contact(contact_email);
      if (request.success && request.data) {
        return request.data;
      } else {
        console.log('error on verify contact', request);
        return false;
      }
    } catch (e) {
      console.log('error on verify contact', e);
      return false;
    }
  }

  async saveGenderAndBirthday({gender, birthday}) {
    try {
      const data = {};
      gender !== '' && gender !== undefined ? (data['gender'] = gender) : null;
      birthday !== '' && birthday !== undefined
        ? (data['birthday'] = birthday)
        : null;
      const request = await CallServerPromise.update_account(data);
      await this.refreshUserData();
      this.savingPersonInfoData = false;
      await this.initValues();
      if (request.success) {
        return request;
      } else {
        console.log('error on saving gender and birthday', request);
        await ShowMessage(MESSAGE_TYPE.DATA_MODIFY_FAIL);
      }
    } catch (e) {
      console.log('error on saving gender and birthday', e);
      await ShowMessage(MESSAGE_TYPE.DATA_MODIFY_FAIL);
      return false;
    }
  }

  async savePersonInfo(data) {
    this.pendingDataToSave = {...this.pendingDataToSave, ...data};
    if (this.apiCallInterval) {
      await clearTimeout(this.apiCallInterval);
    }

    this.apiCallInterval = setTimeout(async () => {
      try {
        const oldRewards = this.user.rewards
          ? this.user.rewards
          : {basic_data: true, type_data: true};
        console.log(oldRewards);

        this.readyToShow = false;
        this.updateView();
        this.props.navigation.setOptions({
          title: strings.PROFILE.HOME.YOUR_PROFILE_TITLE + ' ...',
        });

        const buttonIndex = this.userTypeBlockData.selectedButtonIndex;
        const new_data = {...this.pendingDataToSave};
        if (buttonIndex === 0) {
          new_data['user_type'] = 'university_student';
        } else if (buttonIndex === 1) {
          new_data['user_type'] = 'high_school_student';
        } else if (buttonIndex === 2) {
          new_data['user_type'] = 'not_a_student';
        }

        const request = await CallServerPromise.update_account(new_data);
        let message = '';
        var is_to_show_coins = false;

        await this.refreshUserData();
        this.savingPersonInfoData = false;
        await this.initValues();
        this.props.navigation.setOptions({
          title: strings.PROFILE.HOME.YOUR_PROFILE_TITLE,
        });
        this.pendingDataToSave = null;
        if (request.success) {
          await this.refreshUserData();
          await store.dispatch(loadCouponList());
          await refreshTotalCoins();
          this.initValues();
          if (
            request.data.rewards &&
            ((request.data.rewards.basic_data === true &&
              oldRewards.basic_data === false) ||
              (request.data.rewards.type_data === true &&
                oldRewards.type_data === false))
          ) {
            const coins = '+' + this.static_rewards.type_data_reward;
            message = strings.PROFILE.MESSAGE.SUCCESS_REWARDS_ASSIGNED.replace(
              '{COINS}',
              coins,
            );
            is_to_show_coins = true;
          } else {
            message = strings.PROFILE.MESSAGE.DATA_MODIFY_SUCCESS;
          }
          await SaveSuccessPopoverView().show({
            message,
            second_icon: !is_to_show_coins,
            success: request.success,
          });
          return request;
        } else {
          console.log('error on saving data', data, request);
          await ShowMessage(MESSAGE_TYPE.DATA_MODIFY_FAIL);
        }
      } catch (e) {
        this.props.navigation.setOptions({
          title: strings.PROFILE.HOME.YOUR_PROFILE_TITLE,
        });
        console.log('error on saving data', data, e);
        await ShowMessage(MESSAGE_TYPE.DATA_MODIFY_FAIL);
        return false;
      }
    }, 1000);
  }

  async refreshUserData() {
    try {
      const request = await CallServerPromise.get_user_data();
      if (request.success && request.data) {
        await UserData.setUserData(request.data);
        return true;
      }
    } catch (e) {
      return false;
    }
  }

  async processEmailVerification() {
    try {
      this.readyToShow = false;
      this.updateView();
      if (
        UserData.getUserData().email !==
          this.personInfoBlockData.contact_email &&
        this.personInfoBlockData.contact_email !== ''
      ) {
        const contactEmailAlreadyExists =
          await this.checkContactEmailAlreadyExists(
            this.personInfoBlockData.contact_email,
          );
        if (contactEmailAlreadyExists) {
          standardFunctions.show_alert(
            strings.OTHER.WARNING,
            strings.PROFILE.MESSAGE.CONTACT_EMAIL_ALREADY_EXISTS,
          );
          return;
        }
      }

      const personInfoBlockData: any = {};
      personInfoBlockData.contact_email =
        this.personInfoBlockData.contact_email;
      personInfoBlockData.useMainEmail = this.personInfoBlockData.useMainEmail;
      personInfoBlockData.mainEmail = this.personInfoBlockData.mainEmail;
      this.savingPersonInfoData = true;
      this.updateView();

      const contact_email = personInfoBlockData.useMainEmail
        ? personInfoBlockData.mainEmail
        : personInfoBlockData.contact_email;

      let verifyResultMessage = '';
      let is_to_show_coins = false;
      const canVerifyContact = await this.checkContactEmailCanVerify();

      const oldRewards = this.user.rewards.basic_data
        ? this.user.rewards
        : {basic_data: false};
      if (canVerifyContact === true && contact_email !== '') {
        const verifyResult = await this.verifyContactEmail(contact_email);
        if (verifyResult.verification_needed === false) {
          if (
            verifyResult.rewards &&
            verifyResult.rewards.basic_data === true &&
            oldRewards.basic_data === false
          ) {
            const coin = '+' + this.static_rewards.basic_data_reward;
            verifyResultMessage = GetMessage(
              MESSAGE_TYPE.VERIFY_CONTACT_AND_GOT_REWARD,
              null,
              {coin},
            );
            is_to_show_coins = true;
          } else {
            verifyResultMessage = GetMessage(MESSAGE_TYPE.DATA_MODIFY_SUCCESS);
          }
          await store.dispatch(loadCouponList());
          await store.dispatch(loadObtainedCouponList());
          await refreshTotalCoins();
          SaveSuccessPopoverView().show({
            message: verifyResultMessage,
            second_icon: !is_to_show_coins,
            success: true,
          });
        } else if (verifyResult.verification_needed === true) {
          // @ts-ignore
          global.navigationData = {
            onAfterConfirmedContactEmail: () => {
              this.onAfterConfirmedContactEmail();
            },
          };
          NavigationService.navigate(routes.PROFILE_CONFIRM_EMAIL, {
            email: contact_email,
            mode: 'contact',
          });
        }
      } else {
        await ShowMessage(MESSAGE_TYPE.CANT_VERIFY_CONTACT_EMAIL);
      }
      this.readyToShow = true;
      this.updateView();
    } catch (error) {
      console.log('error on saving personInfo in Profile', error);
      await ShowMessage(MESSAGE_TYPE.CANT_VERIFY_CONTACT_EMAIL);
      this.savingPersonInfoData = false;
      this.readyToShow = true;
      this.updateView();
    }
  }

  // ========= Basic Data END ==============

  // ========= User Type ==============

  async saveUserTypeBlock4Student() {
    try {
      const data = {
        ...(this.userTypeBlockData.major_id
          ? {major_id: this.userTypeBlockData.major_id}
          : {}),
        ...(this.userTypeBlockData.university_year
          ? {university_year: Number(this.userTypeBlockData.university_year)}
          : {}),
        ...(this.userTypeBlockData.resident_student !== ''
          ? {resident_student: this.userTypeBlockData.resident_student}
          : {}),
        ...(this.userTypeBlockData.hometown
          ? {hometown: this.userTypeBlockData.hometown}
          : {}),
        user_type: 'university_student',
      };
      const request = await CallServerPromise.update_account(data);
      if (request.success) {
        return request;
      } else {
        console.log('error on saving user_type for university', request);
      }
    } catch (e) {
      console.log('error on saving user_type for university', e);
    }
  }

  async saveUserTypeBlock4NotStudent() {
    try {
      const data = {
        ...(this.userTypeBlockData.education_level
          ? {education_level: this.userTypeBlockData.education_level}
          : {}),
        ...(this.userTypeBlockData.hometown
          ? {hometown: this.userTypeBlockData.hometown}
          : {}),
        user_type: 'not_a_student',
      };
      const request = await CallServerPromise.update_account(data);
      if (request.success) {
        return request;
      } else {
        console.log('error on saving user_type for not_a_student', request);
      }
    } catch (e) {
      console.log('error on saving user_type for not_a_student', e);
    }
  }

  async saveUserTypeBlock4HighSchool() {
    try {
      const data = {
        ...(this.userTypeBlockData.high_school_name
          ? {high_school_name: this.userTypeBlockData.high_school_name}
          : {}),
        ...(this.userTypeBlockData.high_school_year
          ? {high_school_year: Number(this.userTypeBlockData.high_school_year)}
          : {}),
        ...(this.userTypeBlockData.hometown
          ? {hometown: this.userTypeBlockData.hometown}
          : {}),
        user_type: 'high_school_student',
      };
      const request = await CallServerPromise.update_account(data);
      if (request.success) {
        return request;
      } else {
        console.log('error on saving user_type for high school', request);
      }
    } catch (e) {
      console.log('error on saving user_type for high school', e);
    }
  }

  async saveUserTypeBlock(buttonIndex) {
    this.savingUserTypeData = true;
    this.updateView();
    // if (buttonIndex === 1 || buttonIndex === 2) {
    this.savingUserTypeData = true;
    let updateResult;

    if (buttonIndex === 0) {
      updateResult = await this.saveUserTypeBlock4Student();
    } else if (buttonIndex === 1) {
      updateResult = await this.saveUserTypeBlock4HighSchool();
    } else if (buttonIndex === 2) {
      updateResult = await this.saveUserTypeBlock4NotStudent();
    }

    let message = '';
    var is_to_show_coins = false;
    const oldRewards = this.user.rewards.type_data
      ? this.user.rewards
      : {type_data: false};
    if (updateResult.success === true) {
      await this.refreshUserData();
      await store.dispatch(loadCouponList());
      this.initValues();
      if (
        updateResult.data.rewards &&
        updateResult.data.rewards.type_data === true &&
        oldRewards.type_data === false
      ) {
        const coin = '+' + this.static_rewards.type_data_reward;
        message = GetMessage(MESSAGE_TYPE.VERIFY_STUDENT_AND_GOT_REWARD, null, {
          coin,
        });
        is_to_show_coins = true;
      } else {
        message = GetMessage(MESSAGE_TYPE.DATA_MODIFY_SUCCESS);
      }
    } else {
      message = GetMessage(MESSAGE_TYPE.DATA_MODIFY_FAIL);
    }
    await store.dispatch(loadCouponList());
    await store.dispatch(loadObtainedCouponList());
    await refreshTotalCoins();
    SaveSuccessPopoverView().show({
      message,
      second_icon: !is_to_show_coins,
      success: updateResult,
    });
    this.savingUserTypeData = false;
    this.updateView();
    // }
  }

  // ========= User Type END ==============

  async onAfterConfirmedStudentEmail() {
    console.log('onAfterConfirmedStudentEmail');
    store.dispatch(loadCouponList());
    await this.refreshUserData();
    this.initValues();
  }

  async onAfterConfirmedStudentCard() {
    console.log('onAfterConfirmedStudentCard');
    store.dispatch(loadCouponList());
    await this.refreshUserData();
    this.initValues();
  }

  onRefresh() {
    this.loadingRefresh = true;
    this.componentDidMount();
  }

  componentDidMount() {
    console.log('componentDidMount');
    standardFunctions.add_firebase_event_log('profile', 'home_screen_opened');
    this.readyToShow = false;
    this.firstLoaded = false;
    this.updateView();
    this.initValues().then(() => {
      this.firstLoaded = true;
      this.updateView();
    });
    this.loadingRefresh = false;
  }
}

export default useViewModel(new HomeScreenViewModel());
