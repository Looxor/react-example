const fs = require('fs');

const APP_ROOT = '.';

const ANDROID_ROOT = `${APP_ROOT}/android/app`;
const IOS_PROJECT_ROOT = `${APP_ROOT}/ios`;
const IOS_ROOT = `${IOS_PROJECT_ROOT}/thefaculty`;

const FIREBASE_CONFIG = {
  ORIGIN: {
    ANDROID: `${ANDROID_ROOT}/google-services.json`,
    IOS: `${IOS_ROOT}/GoogleService-Info.plist`,
  },
  PROD: {
    ANDROID: `${ANDROID_ROOT}/google-services-prod.json`,
    IOS: `${IOS_ROOT}/GoogleService-Info-prod.plist`,
  },
  TEST: {
    ANDROID: `${ANDROID_ROOT}/google-services-test.json`,
    IOS: `${IOS_ROOT}/GoogleService-Info-test.plist`,
  },
};

const SOURCE_CONFIG = {
  ORIGIN: `${APP_ROOT}/app/utils/firebase/index.ts`,
  PROD: `${APP_ROOT}/app/utils/firebase/index-prod.ts`,
  TEST: `${APP_ROOT}/app/utils/firebase/index-test.ts`,
};

const BUILD_CONFIG = {
  ORIGIN: {
    ANDROID: `${ANDROID_ROOT}/build.gradle`,
    IOS: `${IOS_ROOT}/Info.plist`,
  },
  PROD: {
    ANDROID: `${ANDROID_ROOT}/build-prod.gradle`,
    IOS: `${IOS_ROOT}/Info-prod.plist`,
  },
  TEST: {
    ANDROID: `${ANDROID_ROOT}/build-test.gradle`,
    IOS: `${IOS_ROOT}/Info-test.plist`,
  },
};

const fileExists = src => {
  return fs.existsSync(src);
};

const copyFile = (src, dest) => {
  try {
    fs.copyFileSync(src, dest);
  } catch (error) {}
};

const deleteFile = src => {
  try {
    if (fileExists(src)) fs.unlinkSync(src);
  } catch (error) {}
};

export {
  fileExists,
  copyFile,
  deleteFile,
  FIREBASE_CONFIG,
  SOURCE_CONFIG,
  BUILD_CONFIG,
};
