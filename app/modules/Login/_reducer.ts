import { FIREBASE_LOGIN, LOGIN, LOGOUT } from "./_actions";

const defaultState = {currentLoginTime: new Date(), lastLoginTime: null};

export default (
  state = defaultState,
  action: {type: any; User: any; error: any; UserData: any},
) => {
  let userData;
  switch (action.type) {
    case FIREBASE_LOGIN.SUCCESS:
      userData = action.User;
      userData.currentLoginTime = new Date();
      userData.lastLoginTime = state.currentLoginTime;
      return {
        ...state,
        User: userData,
        status: null,
      };

    case LOGIN.INITIAL:
      return {
        ...state,
        User: null,
        status: null,
      };
    case LOGIN.DOING:
      return {
        ...state,
        User: null,
        status: LOGIN.DOING,
      };
    case LOGIN.SUCCESS:
      userData = action.User;
      userData.currentLoginTime = new Date();
      userData.lastLoginTime = state.currentLoginTime;
      return {
        ...state,
        User: userData,
        status: null,
      };
    case LOGIN.FAILED:
      return {
        ...state,
        User: action.User,
        status: LOGIN.FAILED,
        error: action.error,
      };

    case LOGOUT.SUCCESS:
      return {
        ...state,
        User: null,
        status: null,
      };
    default:
      return state;
  }
};
