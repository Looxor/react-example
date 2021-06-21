import {
  EMAILCHECKAPI,
  GET_ALL_FACULTIESAPI,
  NAMECHECKAPI,
  SIGNUP1,
  SIGNUP2,
  SIGNUP3,
  SIGNUP4,
  SIGNUP5,
  SIGNUP6
} from "./_actions";

const apiReturn = (
  state: {User: any},
  action: {type?: any; userInfo: any; error?: any},
  status: string,
  error = {},
) => {
  return {
    ...state,
    User: {...state.User, ...action.userInfo},
    status: status,
    error: error,
  };
};

export default (state: {User: any} = {User: {}}, action: any) => {
  switch (action.type) {
    case SIGNUP1.SUCCESS:
    case SIGNUP2.SUCCESS:
    case SIGNUP3.SUCCESS:
    case SIGNUP4.SUCCESS:
    case SIGNUP5.SUCCESS:
      return {...state, User: {...state.User, ...action.userInfo}};
    case NAMECHECKAPI.DOING:
      return apiReturn(state, action, NAMECHECKAPI.DOING);
    case NAMECHECKAPI.SUCCESS:
      return apiReturn(state, action, NAMECHECKAPI.SUCCESS);
    case NAMECHECKAPI.FAILED:
      return apiReturn(state, action, NAMECHECKAPI.SUCCESS, action.error);

    case EMAILCHECKAPI.DOING:
      return apiReturn(state, action, EMAILCHECKAPI.DOING);
    case EMAILCHECKAPI.SUCCESS:
      return apiReturn(state, action, EMAILCHECKAPI.SUCCESS);
    case EMAILCHECKAPI.FAILED:
      return apiReturn(state, action, EMAILCHECKAPI.SUCCESS, action.error);

    case GET_ALL_FACULTIESAPI.DOING:
      return apiReturn(state, action, GET_ALL_FACULTIESAPI.DOING);
    case GET_ALL_FACULTIESAPI.SUCCESS:
      return apiReturn(state, action, GET_ALL_FACULTIESAPI.SUCCESS);
    case GET_ALL_FACULTIESAPI.FAILED:
      return apiReturn(
        state,
        action,
        GET_ALL_FACULTIESAPI.SUCCESS,
        action.error,
      );

    case SIGNUP6.DOING:
      return apiReturn(state, action, SIGNUP6.DOING);
    case SIGNUP6.SUCCESS:
      return apiReturn(state, action, SIGNUP6.SUCCESS);
    case SIGNUP6.FAILED:
      return apiReturn(state, action, SIGNUP6.SUCCESS, action.error);

    default:
      return state;
  }
};
