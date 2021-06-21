import { combineReducers } from "redux";

import auth from "../../modules/Login/_reducer";
import signUp from "../../modules/SignUp/_reducer";
import BestOf from "../../modules/BestOf/_reducer";
import Coupon from "../../modules/Benefits/_ReduxStore/_reducer";
import { ObserveReducer } from "../../modules/_CommonModels/ViewModelBase";

import App from "../../modules/AppState";

const rootReducer = combineReducers({
  App,
  auth,
  signUp,
  BestOf,
  Coupon,
  ObserveReducer,
});

export default rootReducer;
