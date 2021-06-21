import { CallServerPromise } from "../../../utils/app/CallServer";
import { handleUser } from "../../../utils/firebase/authUtils";
import { auth } from "../../../utils/firebase";
import standardFunctions from "../../../utils/app/StandardFunctions";
import { strings } from "../../../config";
import firebase from "@react-native-firebase/app";

class UserManager {
  async updateFaculty(newFacultyId) {
    try {
      const newData = {faculty_id: newFacultyId};
      const request = await CallServerPromise.update_account(newData);
      if (request.success) {
        await handleUser(auth().currentUser);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  async updateLegalChecks(l_marketing, l_data) {
    try {
      const newData: any = {
        legal_check: {marketing: l_marketing, data: l_data, license: true},
      };
      const request = await CallServerPromise.update_account(newData);
      if (request.success) {
        await handleUser(auth().currentUser);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  reauthenticate = currentPassword => {
    var user = auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );
    return user.reauthenticateWithCredential(cred);
  };

  changePassword = (currentPassword, newPassword) => {
    return new Promise((resolve, eject) => {
      this.reauthenticate(currentPassword)
        .then(() => {
          var user = auth().currentUser;
          user
            .updatePassword(newPassword)
            .then(() => {
              resolve(true);
            })
            .catch(async error => {
              await this.showError(error);
              resolve(false);
            });
        })
        .catch(async error => {
          await this.showError(error);
          resolve(false);
        });
    });
  };

  async showError(error) {
    let message = '';
    switch (error.code) {
      case 'auth/wrong-password':
        message = strings.SETTINGS.CHANGE_PASSWORD.ERROR_WRONG_PASSWORD;
        break;
      case 'auth/unknown':
        message = strings.SETTINGS.CHANGE_PASSWORD.ERROR_UNKNOWN;
        break;
      default:
        message = strings.SETTINGS.CHANGE_PASSWORD.ERROR_UNKNOWN;
        break;
    }

    await standardFunctions.show_alert_async(
      strings.SETTINGS.CHANGE_PASSWORD.TITLE,
      message,
    );
  }
}

export default new UserManager();
