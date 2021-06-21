import "@react-native-firebase/auth";
import "@react-native-firebase/storage";
import messaging from "@react-native-firebase/messaging";
import crashlytics from "@react-native-firebase/crashlytics";
import storage_const from "@react-native-firebase/storage";
import firebase from "@react-native-firebase/app";

import { constants } from "../../config";
import { Platform } from "react-native";

const delay_ms = ms =>
  new Promise((resolve, reject) => setTimeout(() => resolve(true), ms));

const initializeAppPromise = async () => {
  try {
    if (constants.APP_MODE_CONTROLLED_BY_SERVER === 'TESTING') {
      if (!firebase.apps.length || firebase.apps.length < 2) {
        await firebase.initializeApp(
          Platform.OS === 'android'
            ? constants.firebaseConfigDevelopment
            : constants.firebaseConfigDevelopment,
          'TESTING',
        );
        await delay_ms(300);
      }
    }
  } catch (error) {}
};

const app = (): any => {
  return firebase.app('[DEFAULT]');
};

const auth = () => {
  return app().auth();
};

const storage = () => {
  return app().storage();
};

export {
  initializeAppPromise,
  auth,
  storage,
  messaging,
  crashlytics,
  storage_const,
};
