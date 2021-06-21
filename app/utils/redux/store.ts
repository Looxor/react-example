import { store } from "../../config/redux/store";

export const getReduxValue = (stateKey: string = '') => {
  const state = store.getState();
  return state[stateKey];
};

export const setReduxValue = async (action, value: any = {}) => {
  await store.dispatch(action(value));
};

export const setReduxValueWithKey = async (
  action,
  key: string,
  value: any = {},
) => {
  await store.dispatch(action(key, value));
};

export const getReduxValueWithKey = (key: string) => {
  return getReduxValue(key);
};

export const getAuthDataFromRedux = () => {
  return getReduxValue('auth');
};

export const getUserDataFromRedux = () => {
  return getAuthDataFromRedux()['User'];
};

export const getAuthErrorFromRedux = () => {
  return getAuthDataFromRedux()['error'];
};

export const getFirebase_IDToken = () => {
  return getUserDataFromRedux()['Firebase_IDToken'];
};
