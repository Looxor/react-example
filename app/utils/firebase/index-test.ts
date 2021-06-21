import "@react-native-firebase/auth";
import "@react-native-firebase/storage";
import messaging from "@react-native-firebase/messaging";
import crashlytics from "@react-native-firebase/crashlytics";
import storage_const from "@react-native-firebase/storage";
import firebase from "@react-native-firebase/app";

const delay_ms = ms =>
  new Promise((resolve, reject) => setTimeout(() => resolve(true), ms));

const app = (): any => {
  return firebase.app('[DEFAULT]');
};

const auth = () => {
  return app().auth();
};

const storage = () => {
  return app().storage();
};

export {auth, storage, messaging, crashlytics, storage_const};
