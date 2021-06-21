import 'react-native-gesture-handler';
import {AppRegistry, YellowBox, Platform, Text, TextInput} from 'react-native';
import App from './app/index';
import {name as appName} from './app.json';
import settings from './app/config/settings';
import messaging from '@react-native-firebase/messaging';
import {Observable} from './app/modules/_CommonModels/ViewModelBase';
import NavigationService from './app/utils/app/NavigationService';
import {gotoEndedResultScreenWithSimulationId} from './app/utils/app/PushNotification';
import {hideSimulationStatus} from './app/modules/Test/ViewModels/CheckActiveSimulation/CheckActiveSimulation';
import {routes} from './app/navigation/rootNavigation/navigation.constants';
import SimulationPolling from './app/modules/Test/CommonFunctions/SimulationPolling';

YellowBox.ignoreWarnings(['getNode()', '..']);
YellowBox.disableLogBox = true;

try {
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;

  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.allowFontScaling = false;
} catch (e) {}

if (settings.debug.log === false) {
  console.log = () => {};
}
if (settings.debug.warn === false) {
  console.warn = () => {};
}

if (Platform.OS === 'android') {
  messaging().setBackgroundMessageHandler(async notification_message => {
    console.log(
      'messaging().setBackgroundMessageHandler(async remoteMessage => {',
      notification_message,
    );
    if (notification_message) {
      await Observable.setReduxValue(
        'notification_message',
        notification_message,
      );
    }
  });
} else {
  messaging().onNotificationOpenedApp(async notification_message => {
    console.log('messaging().onNotificationOpenedApp', notification_message);
    if (
      notification_message &&
      notification_message.data &&
      (notification_message.data.type === 'simulation_terminated' ||
        notification_message.data.type === 'simulation_autoterminated')
    ) {
      const activeRouteName = NavigationService.getActiveRouteName();
      console.log('activeRouteName', activeRouteName);
      if (activeRouteName !== routes.TEST_RESULT_DETAIL) {
        await hideSimulationStatus();
        await gotoEndedResultScreenWithSimulationId(
          notification_message.data.simulation_id,
        );
        SimulationPolling.stop();
      }
      await Observable.setReduxValue('notification_message', '');
    }
  });
  messaging()
    .getInitialNotification()
    .then(async remoteMessage => {
      console.log('messaging().getInitialNotification().then', remoteMessage);
      if (remoteMessage) {
        await Observable.setReduxValue('notification_message', remoteMessage);
      }
    });
}

const HeadlessCheck = args => {
  if (Platform.OS === 'ios' && args && args.isHeadless === true) {
    return null;
  }
  return App;
};

AppRegistry.registerComponent(appName, HeadlessCheck);
