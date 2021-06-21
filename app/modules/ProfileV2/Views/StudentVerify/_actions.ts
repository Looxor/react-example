import {auth} from '../../../../utils/firebase';

import {CallServerPromise} from '../../../../utils/app/CallServer';

import {createAction, createTypes} from '../../../../utils/redux/actions';
import {Firebase_IDToken} from '../../../../config/constants';

const SIGNUP1 = createTypes('THEFACULTY_SIGNUP1');
const SIGNUP2 = createTypes('THEFACULTY_SIGNUP2');
const SIGNUP3 = createTypes('THEFACULTY_SIGNUP3');
const NAMECHECKAPI = createTypes('THEFACULTY_NAMECHECKAPI');
const SIGNUP4 = createTypes('THEFACULTY_SIGNUP4');
const EMAILCHECKAPI = createTypes('THEFACULTY_EMAILCHECKAPI');
const SIGNUP5 = createTypes('THEFACULTY_SIGNUP5');
const SIGNUP5API = createTypes('THEFACULTY_SIGNUP5API');
const SIGNUP6 = createTypes('THEFACULTY_SIGNUP6');
const GET_ALL_FACULTIESAPI = createTypes('THEFACULTY_GET_ALL_FACULTIESAPI');

const signUpScreen2 = (userInfo: {
  firstname: string;
  lastname: string;
  gender: number;
  birthday: Date;
  birthplace: string;
}) => {
  return async dispatch => {
    const signupAction = {
      success: (userInfo: any) => createAction(SIGNUP1.SUCCESS, {userInfo}),
    };
    dispatch(signupAction.success(userInfo));
  };
};

const nameCheckAPI = (nickname, password) => {
  return async dispatch => {
    const nameCheckAction = {
      do: () => createAction(NAMECHECKAPI.DOING, {}),
      success: (response: any) =>
        createAction(NAMECHECKAPI.SUCCESS, {userInfo: response}),
      failed: (error: any) => createAction(NAMECHECKAPI.FAILED, {error}),
    };
    try {
      dispatch(nameCheckAction.do());
      const request = await CallServerPromise.check_nickname_exists(nickname);
      if (request.success) {
        await dispatch(
          nameCheckAction.success({
            nickname,
            password,
            nickname_exists: request.data,
          }),
        );
        return {success: true, nickname_exists: request.data};
      } else {
        dispatch(nameCheckAction.failed({}));
        return {};
      }
    } catch (error) {
      dispatch(nameCheckAction.failed(error));
    }
  };
};

const emailCheckAPI = email => {
  return async dispatch => {
    const emailCheckAction = {
      do: () => createAction(EMAILCHECKAPI.DOING, {}),
      success: (response: any) =>
        createAction(EMAILCHECKAPI.SUCCESS, {userInfo: response}),
      failed: (error: any) => createAction(EMAILCHECKAPI.FAILED, {error}),
    };
    try {
      dispatch(emailCheckAction.do());
      let request = await CallServerPromise.check_email_exists(email);
      if (request.success) {
        const email_exists = request.data;
        request = await CallServerPromise.check_is_university_email(email);
        if (request.success) {
          const is_university_email = request.data;
          const dispatch_email =
            !email_exists && !is_university_email ? email : '';
          await dispatch(
            emailCheckAction.success({
              email: dispatch_email,
              email_exists,
              is_university_email,
            }),
          );
          return {success: true, email_exists, is_university_email};
        } else {
          dispatch(emailCheckAction.failed({}));
          return {success: false};
        }
      } else {
        dispatch(emailCheckAction.failed({}));
        return {success: false};
      }
    } catch (error) {
      dispatch(emailCheckAction.failed(error));
      return {...error};
    }
  };
};

const searchMajorsAPI = async search_key => {
  try {
    const search_data = {limit: 10, pattern: search_key};
    let response: any = await CallServerPromise.search_majors(search_data);
    if (response.error) {
      return [];
    }
    return response.data;
  } catch (error) {
    return {...error};
  }
};

const searchUniversitiesAPI = async search_key => {
  try {
    const search_data = {limit: 10, pattern: search_key};
    let response: any = await CallServerPromise.search_universities(
      search_data,
    );
    if (response.error) {
      return [];
    }
    return response.data;
  } catch (error) {
    return {...error};
  }
};

const signUpScreen5 = (major: any) => {
  return async dispatch => {
    const signupAction = {
      success: (major: any) =>
        createAction(SIGNUP5.SUCCESS, {userInfo: {major}}),
    };
    dispatch(signupAction.success(major));
  };
};

const getAllFacultiesAPI = async () => {
  try {
    let all_faculties: any = await CallServerPromise.get_all_faculties();
    if (all_faculties.error) {
      return [];
    }
    return all_faculties.data;
  } catch (error) {
    return [];
    // return {...error};
  }
};

const createAccountAPI = userInfo => {
  return async dispatch => {
    const createAccountAction = {
      do: () => createAction(SIGNUP6.DOING, {}),
      success: (response: any) =>
        createAction(SIGNUP6.SUCCESS, {userInfo: response}),
      failed: (error: any) => createAction(SIGNUP6.FAILED, {error}),
    };

    try {
      dispatch(createAccountAction.do());
      const {email, password} = userInfo;
      await auth().createUserWithEmailAndPassword(email, password);

      const signedUser = auth().currentUser;
      const idToken = await signedUser.getIdToken(true);
      Firebase_IDToken.setIDToken(idToken);
      userInfo['firebase_idToken'] = idToken;
      delete userInfo['password'];
      const created_user = await CallServerPromise.create_standard_account(
        userInfo,
      );
      if (created_user.success) {
        const request =
          await CallServerPromise.is_verify_standard_account_email_available({
            firebase_idToken: idToken,
          });
        if (request.success) {
          const request = await CallServerPromise.verify_standard_account_email(
            {
              firebase_idToken: idToken,
            },
          );
          if (request.success) {
            dispatch(createAccountAction.success(created_user));
            return {success: true, ...created_user, idToken};
          } else {
            dispatch(createAccountAction.success(created_user));
            return {success: true, ...created_user, idToken};
          }
        } else {
          dispatch(createAccountAction.success(created_user));
          return {success: true, ...created_user, idToken};
        }
      } else {
        dispatch(createAccountAction.failed(created_user));
        return {failed: true, ...created_user};
      }
    } catch (error) {
      error.failed = true;
      dispatch(createAccountAction.failed(error));
      return error;
    }
  };
};

export {
  signUpScreen2,
  nameCheckAPI,
  emailCheckAPI,
  searchMajorsAPI,
  signUpScreen5,
  getAllFacultiesAPI,
  createAccountAPI,
  SIGNUP1,
  SIGNUP2,
  SIGNUP3,
  NAMECHECKAPI,
  SIGNUP4,
  EMAILCHECKAPI,
  SIGNUP5,
  SIGNUP5API,
  SIGNUP6,
  GET_ALL_FACULTIESAPI,
  searchUniversitiesAPI,
};
