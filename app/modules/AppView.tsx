import React, { useEffect } from "react";
import { Image, Platform, StatusBar, StyleSheet, UIManager, View } from "react-native";

import { RootNavigator } from "../navigation/rootNavigation";
import { refreshFirebaseToken, TOKEN_LIFECYCLE } from "../utils/app/AppLifecycle";

// @ts-ignore
const App: () => React$Node = () => {
  // This is necessary if needed to check when the app is active.
  /*
  const [appState, setAppState] = useState(AppState.currentState);
  const handleAppStateChange = nextAppState => {
    console.log('handleAppStateChange', appState, nextAppState);
      Linking.getInitialURL().then((url) => {
          console.log(url);
          if (
              url.startsWith(
                  'https://app.thefacultyapp.com/?link=https://thefacultyapp.com/%23',
              )
          ) {
              var n_url_array = url
                  .replace(
                      'https://app.thefacultyapp.com/?link=https://thefacultyapp.com/%23',
                      '',
                  )
                  .split('&');
              let in_app_url = n_url_array[0].split('%23').join('#');
              if (in_app_url) {
                  console.log(in_app_url);
                  standardFunctions.open_inapp_action(navigation, in_app_url);
              }
          }
      });
    if (appState.match(/inactive|background/) && nextAppState === 'active') {

    }
    setAppState(nextAppState)
  }

  // To use this feature, needs to uncomment `application.applicationIconBadgeNumber = 0;` in XCode
  // const checkPushNotificationIOS = () => {
  //   PushNotificationIOS.getDeliveredNotifications(notifications => {
  //     console.log('PushNotificationIOS.getDeliveredNotifications(notifications', notifications);
  //   })
  */

  const componentDidMount = () => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    // @ts-ignore
    clearInterval(global.globalInterval);
    // @ts-ignore
    global.globalInterval = setInterval(() => {
      refreshFirebaseToken();
    }, TOKEN_LIFECYCLE);

    //AppState.addEventListener("change", handleAppStateChange)
    return componentWillUnMount;
  };

  const componentWillUnMount = () => {
    // AppState.removeEventListener("change", handleAppStateChange)
  };

  useEffect(componentDidMount, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="white"
      />
      <Image
        source={require('../../assets/images/splash/new_splash_2021.jpg')}
        style={{
          alignItems: 'center',
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
        }}
      />
      <RootNavigator/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
});
export default App;
