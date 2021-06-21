import React, { useEffect, useState } from "react";
import { ActivityIndicator, ImageBackground, LogBox, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { TopView } from "teaset";
import { PersistGate } from "redux-persist/integration/react";
import "moment/locale/it";
import { persistor, store } from "./config/redux/store";
import AppView from "./modules/AppView";
import VersionManager from "./utils/app/VersionManager";
import { colors } from "./config";

// enableScreens();

LogBox.ignoreLogs(['Require cycle:']);
LogBox.ignoreAllLogs(true);

export default function App() {
  const [loaded, setLoaded] = useState(false);
  // return null;
  const componentDidMount = () => {
    const loadFunc = async () => {
      await VersionManager.verifyVersion();
      setLoaded(true);
    };
    loadFunc();
    const componentWillUnMount = () => {};
    return componentWillUnMount;
  };
  useEffect(componentDidMount, []);
  return loaded ? (
    <Provider store={store}>
      <PersistGate
        loading={
          <View style={styles.container}>
            <ActivityIndicator color={colors.WHITE} />
          </View>
        }
        persistor={persistor}>
        <SafeAreaProvider>
          <TopView>
            <AppView />
          </TopView>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  ) : (
    <ImageBackground
      style={styles.container}
      source={require('../assets/images/splash/new_splash_2021.jpg')}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ActivityIndicator color={colors.WHITE} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#008AAE',
  },
});
