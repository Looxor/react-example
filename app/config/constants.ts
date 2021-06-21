// import {Platform} from 'react-native';
import { getAuthErrorFromRedux, getUserDataFromRedux, setReduxValue } from "../utils/redux/store";
import { loginAction } from "../modules/Login/_actions";
import { PixelRatio } from "react-native";

var user_data;
var firebase_idToken;
const firebaseConfigProduction = {
  apiKey: 'AIzaSyCsDVe679SLyAMAC3Ca_FiVuhKO9N5EdMo',
  authDomain: 'it-thefaculty.firebaseapp.com',
  databaseURL: 'https://it-thefaculty.firebaseio.com',
  projectId: 'it-thefaculty',
  storageBucket: 'it-thefaculty.appspot.com',
  messagingSenderId: '720124647715',
  appId: '1:720124647715:web:e7bba8ea81bf3e8901d496',
  measurementId: 'G-4XLQG70GDY',
};

const googleSignIn = {
  webClientId: '720124647715-khee5713q4n361pj8tqkro9jfb8abqhl',
};

export class Firebase_IDToken {
  static firebase_idToken = '';

  static setIDToken(new_idToken: string) {
    this.firebase_idToken = new_idToken;
  }

  static getIDToken() {
    return UserData.getUserData().Firebase_IDToken;
    // return this.firebase_idToken;
  }
}

export class UserData {
  static user_data: any = {};

  constructor() {}

  static async setUserData(userData: any) {
    if (userData.Firebase_IDToken)
      Firebase_IDToken.setIDToken(userData.Firebase_IDToken);
    await setReduxValue(loginAction.success, userData);
  }

  static getUserData() {
    return getUserDataFromRedux() || {};
    // return this.user_data;
  }

  static getAuthError() {
    return getAuthErrorFromRedux() || {};
  }

  static isUserLoggedin() {
    return (this.getUserData() || {}).user_id !== undefined;
  }

  // static setUserData(new_user_data: object) {
  //     this.user_data = {...new_user_data};
  // }

  // static getUserData() {
  //     return this.user_data;
  // }
}

const constants = {
  firebaseConfigProduction,
  firebaseConfigDevelopment: firebaseConfigProduction,
  googleSignIn,
  CONTESTS_COUNT: 3,
  // DEFAULT_FONT: 'Raleway-Regular',
  // DEFAULT_FONT_MEDIUM: 'Raleway-Medium',
  // DEFAULT_FONT_BOLD: 'Raleway-Bold',
  // DEFAULT_FONT_SEMIBOLD: 'Raleway-SemiBold',
  // DEFAULT_FONT_ITALIC: 'Raleway-Italic',
  DEFAULT_FONT: 'Nunito-SemiBold',
  DEFAULT_FONT_MEDIUM: 'Nunito-Bold',
  DEFAULT_FONT_BOLD: 'Nunito-ExtraBold',
  DEFAULT_FONT_SEMIBOLD: 'Nunito-Bold',
  DEFAULT_FONT_ITALIC: 'Nunito-SemiBoldItalic',
  USER_DATA: user_data,
  STRIPE_PUBLIC_KEY_TESTING: 'pk_test_UOrlM37VpR6ULfRNGGHxSRdU009PkoB4Sa',
  STRIPE_PUBLIC_KEY_PRODUCTION: 'pk_live_bWtUorZy3bmMGqzWH0MK4Pme00IFHTzcBA',
  PRODUCTION_SERVER_URL: 'https://api.it.thefacultyapp.com/',
  TESTING_SERVER_URL: 'https://api.it.testing.thefacultyapp.com/',
  LOCAL_SERVER_URL: 'http://192.168.0.212:8080/',
  YOUTUBE_API_KEY: 'AIzaSyCsDVe679SLyAMAC3Ca_FiVuhKO9N5EdMo',
  APP_MODE_CONTROLLED_BY_SERVER: 'PRODUCTION',
  IS_ENV_DEVELOPMENT: __DEV__,
  // IS_ANDROID: Platform.OS === 'android',
  // IS_IOS: Platform.OS === 'ios',
  IS_DEBUG_MODE_ENABLED: Boolean(window.navigator.userAgent),
  HEADER_TITLE_STYLE: {
    // ...Platform.select({
    //   android: {
    //     fontFamily: this.DEFAULT_FONT_MEDIUM,
    //     fontSize: 17,
    //   },
    // }),
  },
  ACTIVE_OPACITY: 0.8,
  ANDROID_STORE_URL:
    'https://play.google.com/store/apps/details?id=smartcreativesrl.thefaculty',
  IOS_STORE_URL:
    'https://apps.apple.com/us/app/the-faculty/id1444906315?l=it&ls=1',
  PRIVACY_POLICY_URL:
    'https://storage.it.thefacultyapp.com/legals/informativa-sul-trattamento-e-la-protezione-dei-dati-personali.pdf',
  TERMS_AND_CONDITIONS_URL:
    'https://storage.it.thefacultyapp.com/legals/condizioni-di-licenza.pdf',
  CONTEST_RULES_URL:
    'https://storage.it.thefacultyapp.com/legals/regolamento-contest.pdf',

  SUPPORT_EMAIL: 'assistenza@thefaculty.it',
  onePixel: 1 / PixelRatio.get(),
};

export default constants;
export {firebaseConfigProduction};
