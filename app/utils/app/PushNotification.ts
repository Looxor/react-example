import AsyncStorage from "@react-native-async-storage/async-storage";

import { messaging } from "../../utils/firebase";
import { CallServerPromise } from "./CallServer";
import { Firebase_IDToken } from "../../config/constants";
import Simulation from "../../modules/Test/Models/Simulation";
import { routes } from "../../navigation/rootNavigation/navigation.constants";
import NavigationService from "./NavigationService";

class PushNotification {
  demo_data = '';

  async registerDeviceToken() {
    try {
      const granted = await messaging().hasPermission();
      if (!granted) await this.askPermission();
      const token = await this.fetchToken();
      const firebase_idToken = Firebase_IDToken.getIDToken();
      if (token && firebase_idToken) {
        await CallServerPromise.update_firebase_notification_token(token);
      }
    } catch (error) {}
  }

  async removeFirebaseNotificationToken() {
    try {
      const granted = await messaging().hasPermission();
      if (!granted) await this.askPermission();
      const token = await this.fetchToken();
      const firebase_idToken = Firebase_IDToken.getIDToken();
      if (token && firebase_idToken) {
        await CallServerPromise.remove_firebase_notification_token(token);
      }
    } catch (error) {}
  }

  async askPermission() {
    try {
      await messaging().requestPermission();
      // if (!messaging().isRegisteredForRemoteNotifications) {
      //   await messaging().registerForRemoteNotifications();
      // } else if (!messaging().isDeviceRegisteredForRemoteMessages) {
      // }
    } catch (error) {}
  }

  async fetchToken() {
    try {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      if (!fcmToken) {
        fcmToken = await messaging().getToken();
        if (fcmToken) {
          await AsyncStorage.setItem('fcmToken', fcmToken);
        } else return false;
      }
      return fcmToken;
    } catch (error) {
      return false;
    }
  }

  registerOnMessageListener(listener) {
    return messaging().onMessage(listener);
  }

  registerBackgroundHandler(handler) {
    messaging().setBackgroundMessageHandler(handler);
  }
}

const gotoEndedResultScreenWithSimulationId = async simulation_id => {
  try {
    const request = await CallServerPromise.get_simulations_filtered({
      simulation_id,
    });
    if (request.success && request.data && request.data.length > 0) {
      const simulation = new Simulation(request.data[0]);
      gotoEndedResultScreenWithSimulation(simulation);
    }
  } catch (error) {
    console.log('error on gotoEndedResultScreenWithSimulationId', error);
  }
};

const gotoEndedResultScreenWithSimulation = simulation => {
  const activeRouteName = NavigationService.getActiveRouteName();
  if (activeRouteName !== routes.TEST_ENDED_RESULT) {
    NavigationService.navigate(routes.TEST);
    NavigationService.navigate(routes.TEST_ENDED_RESULT, {simulation});
  }
};

export default new PushNotification();
export {
  gotoEndedResultScreenWithSimulationId,
  gotoEndedResultScreenWithSimulation,
};
