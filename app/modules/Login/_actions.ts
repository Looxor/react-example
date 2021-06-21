import { auth } from "../../utils/firebase";
import { createAction, createTypes } from "../../utils/redux/actions";
import PushNotification from "../../utils/app/PushNotification";

import { Firebase_IDToken } from "../../config/constants";
import { CallServerPromise } from "../../utils/app/CallServer";

const FIREBASE_LOGIN = createTypes('THEFACULTY_FIREBASE_LOGIN');
const LOGIN = createTypes('THEFACULTY_LOGIN');
const LOGOUT = createTypes('THEFACULTY_LOGOUT');

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
    return false;
  }
};

const loginReset = () => {
  return dispatch => {
    const loginAction = {
      initialize: () => createAction(LOGIN.INITIAL, {}),
    };
    dispatch(loginAction.initialize());
  };
};

const firebaseLoginAction = {
  do: () => createAction(FIREBASE_LOGIN.DOING, {}),
  success: (User: any) => createAction(FIREBASE_LOGIN.SUCCESS, {User}),
  failed: (error: any) => createAction(FIREBASE_LOGIN.FAILED, {error}),
};

const loginAction = {
  do: () => createAction(LOGIN.DOING, {}),
  success: (User: any) => createAction(LOGIN.SUCCESS, {User}),
  failed: (error: any) => createAction(LOGIN.FAILED, {error}),
};

const updateUserAction = loginAction;

const logIn = (formData: {email: string; password: string}) => {
  return async dispatch => {
    try {
      dispatch(loginAction.do());
      await auth().signInWithEmailAndPassword(
        formData.email,
        formData.password,
      );

      const signedUser = auth().currentUser;
      if (signedUser) {
        const firebaseToken = (await signedUser.getIdToken(true)) || '';
        if (firebaseToken) {
          Firebase_IDToken.setIDToken(firebaseToken);
          await dispatch(
            firebaseLoginAction.success({
              Firebase_IDToken: firebaseToken,
            }),
          );
          const userData = await getUserDataByTokenEx(firebaseToken);
          if (!userData.error) {
            dispatch(loginAction.success(userData));
            await PushNotification.registerDeviceToken();
          } else {
            console.log('invalid userData', userData);
            return dispatch(
              loginAction.failed({
                code: userData.code,
                message: userData.error,
              }),
            );
          }
        } else {
          console.log('invalid firebaseToken');
          return dispatch(loginAction.failed({}));
        }
      } else {
        console.log('return dispatch(loginAction.failed({}));');
        return dispatch(loginAction.failed({}));
      }
    } catch (error) {
      console.log('dispatch(loginAction.failed(error));', error);
      dispatch(loginAction.failed(error));
    }
  };
};

const logOut = () => {
  return async dispatch => {
    const logoutAction = {
      do: () => createAction(LOGOUT.DOING, {}),
      success: () => createAction(LOGOUT.SUCCESS, {}),
      failed: () => createAction(LOGOUT.FAILED, {}),
    };

    try {
      dispatch(logoutAction.do());
      await auth().signOut();
      const signedUser = auth().currentUser;
      if (!signedUser) {
        dispatch(logoutAction.success());
        return true;
      } else {
        return false;
      }
    } catch (error) {
      dispatch(logoutAction.failed());
    }

    dispatch(logoutAction.success());
  };
};

export {
  LOGIN,
  LOGOUT,
  logIn,
  loginAction,
  FIREBASE_LOGIN,
  firebaseLoginAction,
  logOut,
  loginReset,
  updateUserAction,
};
