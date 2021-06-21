import DeviceInfo from "react-native-device-info";
import { Linking, Platform } from "react-native";
import { constants, strings } from "../../config";
import standardFunctions from "./StandardFunctions";
import { initializeAppPromise } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetch = require('node-fetch');

/**
 * --OUT_OF_DATE--+--PRODUCTION--+--TESTING--+
 * 0-------------1.0------------2.0---------...
 */
const VERSION_STATUS = {
  OUT_OF_DATE: -1,
  PRODUCTION: 0,
  TESTING: 1,
};

const COMPARE_RESULT = {
  GREATER_THAN: 1,
  EQUAL: 0,
  LESS_THAN: -1,
};

/**
 * version1 > version2 : 1
 * version1 = version2 : 0
 * version1 < version2 : -1
 */
const compareVersion = (version1, version2) => {
  let [major1, minor1, patch1] = (version1 || '').split(/[\.]/gi);
  let [major2, minor2, patch2] = (version2 || '').split(/[\.]/gi);
  [major1, minor1, patch1] = [
    parseInt(major1),
    parseInt(minor1),
    parseInt(patch1),
  ];
  [major2, minor2, patch2] = [
    parseInt(major2),
    parseInt(minor2),
    parseInt(patch2),
  ];
  if (major1 < major2) return COMPARE_RESULT.LESS_THAN;
  if (major1 === major2) {
    if (minor1 < minor2) return COMPARE_RESULT.LESS_THAN;
    if (minor1 === minor2) {
      if (patch1 < patch2) return COMPARE_RESULT.LESS_THAN;
      if (patch1 === patch2) return COMPARE_RESULT.EQUAL;
    }
  }
  return COMPARE_RESULT.GREATER_THAN;
};

class VersionManager {
  currentAppVersion: string;
  platform: string;
  versionEnd: string;

  constructor() {}

  setPlatform(platform) {
    this.platform = platform;
  }

  getCurrentVersion() {
    return `${DeviceInfo.getVersion()}`;
  }

  setCurrentVersion(currentVersion) {
    this.currentAppVersion = currentVersion;
  }

  async getIOSVersion() {
    try {
      const CallServerPromise = require('./CallServer').CallServerPromise;
      const request = await CallServerPromise.get_many_static_variables([
        'ios_application_version_start',
        'ios_application_version_end',
      ]);
      if (request.success) {
        const {
          data: {ios_application_version_start, ios_application_version_end},
        } = request;
        return [ios_application_version_start, ios_application_version_end];
      } else {
        return ['1.0.0', '100.0.0'];
      }
    } catch (error) {
      return ['1.0.0', '100.0.0'];
    }
  }

  async getAndroidVersion() {
    try {
      const CallServerPromise = require('./CallServer').CallServerPromise;
      const request = await CallServerPromise.get_versions([
        'android_application_version_start',
        'android_application_version_end',
      ]);
      if (request.success) {
        const {
          data: {
            android_application_version_start,
            android_application_version_end,
          },
        } = request;
        return [
          android_application_version_start,
          android_application_version_end,
        ];
      } else {
        return ['1.0.0', '100.0.0'];
      }
    } catch (error) {
      return ['1.0.0', '100.0.0'];
    }
  }

  greaterThan(version) {
    return (
      compareVersion(this.currentAppVersion, version) ===
      COMPARE_RESULT.GREATER_THAN
    );
  }

  lessThan(version) {
    return (
      compareVersion(this.currentAppVersion, version) ===
      COMPARE_RESULT.LESS_THAN
    );
  }

  equalTo(version) {
    return (
      compareVersion(this.currentAppVersion, version) === COMPARE_RESULT.EQUAL
    );
  }

  async getVersionStatus() {
    try {
      const [versionStart, versionEnd] =
        this.platform === 'android'
          ? await this.getAndroidVersion()
          : await this.getIOSVersion();
      this.versionEnd = versionEnd;
      return this.getVersionStatusWithVersions(versionStart, versionEnd);
    } catch (error) {
      return VERSION_STATUS.PRODUCTION;
    }
  }

  getVersionStatusWithVersions(versionStart, versionEnd) {
    const needsToUpdate =
      this.lessThan(versionStart) &&
      versionStart !== undefined &&
      versionEnd !== undefined;
    const inProductionMode =
      (this.greaterThan(versionStart) && this.lessThan(versionEnd)) ||
      this.equalTo(versionStart) ||
      this.equalTo(versionEnd) ||
      versionStart === undefined ||
      versionEnd === undefined;
    const testingMode =
      this.greaterThan(versionEnd) &&
      versionStart !== undefined &&
      versionEnd !== undefined;

    if (inProductionMode) {
      return VERSION_STATUS.PRODUCTION;
    } else if (needsToUpdate) {
      return VERSION_STATUS.OUT_OF_DATE;
    } else if (testingMode) {
      return VERSION_STATUS.TESTING;
    } else {
      return VERSION_STATUS.PRODUCTION;
    }
  }

  async verifyVersion() {
    var isProductionModeActive = false;
    var isTestingModeActive = false;
    try {
      isProductionModeActive =
        (await AsyncStorage.getItem('isProductionModeActive')) === 'true';
      isTestingModeActive =
        (await AsyncStorage.getItem('isTestingModeActive')) === 'true';

      // await AsyncStorage.setItem('isProductionModeActive', 'false');
      // await AsyncStorage.setItem('isTestingModeActive', 'false');
    } catch (e) {
      console.log(e);
    }

    const currentVersion = `${DeviceInfo.getVersion()}.${DeviceInfo.getBuildNumber()}`;
    this.setPlatform(Platform.OS);
    this.setCurrentVersion(currentVersion);

    const version_status = await this.getVersionStatus();

    if (
      (version_status === VERSION_STATUS.PRODUCTION && !isTestingModeActive) ||
      isProductionModeActive
    ) {
      constants.APP_MODE_CONTROLLED_BY_SERVER = 'PRODUCTION';
    } else if (version_status === VERSION_STATUS.OUT_OF_DATE) {
      constants.APP_MODE_CONTROLLED_BY_SERVER = 'PRODUCTION';
      await standardFunctions.show_alert_with_button_async(
        strings.APP_NAME,
        strings.NEEDS_TO_UPDATE.replace('[APP_VERSION]', this.versionEnd),
        strings.OTHER.UPDATE,
        () => {
          Linking.openURL(
            Platform.OS === 'android'
              ? constants.ANDROID_STORE_URL
              : constants.IOS_STORE_URL,
          );
        },
        false,
      );
    } else if (
      (version_status === VERSION_STATUS.TESTING && !isProductionModeActive) ||
      isTestingModeActive
    ) {
      constants.APP_MODE_CONTROLLED_BY_SERVER = 'TESTING';
    }

    await initializeAppPromise();
  }

  async getVersionStatusFromCLI(serverUrl) {
    try {
      const VERSION_CHECK_URL = `${serverUrl}/server/get_many_static_variables`;
      const post_data = {
        names: [
          'android_application_version_start',
          'android_application_version_end',
        ],
      };
      const request = await fetch(VERSION_CHECK_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          charset: 'utf-8',
          'User-Agent':
            'thefaculty-' + Platform.OS + '/' + this.getCurrentVersion(),
        },
        body: JSON.stringify(post_data),
      });

      const {
        data: {
          android_application_version_start,
          android_application_version_end,
        },
      } = await request.json();

      const [versionStart, versionEnd] = [
        android_application_version_start,
        android_application_version_end,
      ];

      const version_stauts = this.getVersionStatusWithVersions(
        versionStart,
        versionEnd,
      );
      return version_stauts;
    } catch (error) {}
  }
}

export default new VersionManager();
export {VERSION_STATUS};
