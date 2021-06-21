import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Clipboard,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import WebView from "react-native-webview";
import { Firebase_IDToken } from "../config/constants";
import { auth } from "../utils/firebase";
import { colors, constants } from "../config";
import standardFunctions from "../utils/app/StandardFunctions";
import { BackButtonTop } from "./index";

const GeneralWebView = props => {
  const tokenMessage = '{"firebase_idToken": "{F_IDTOKEN}"}';
  // const url = props.navigation.getParam('url');
  const {
    route: {params = {}},
  } = props;
  const url = params['url'];
  const webViewRef = useRef(null);

  const [loaded, setLoaded] = useState(false);
  const [showWebLogs, setShowWebLogs] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [webLogs, setWebLogs] = useState([]);

  const sendDataToBrowser = () => {
    if (webViewRef && url.includes('firebaseIdToken')) {
      webViewRef.current.postMessage(
        tokenMessage.replace('{F_IDTOKEN}', Firebase_IDToken.firebase_idToken),
      );
    }
  };

  const onMessage = async event => {
    try {
      let responseFromWebSite = JSON.parse(event.nativeEvent.data);
      if (responseFromWebSite.console_wv) {
        let newWebLogs = [responseFromWebSite.console_wv].concat(webLogs);
        setWebLogs(newWebLogs);
      }

      if (responseFromWebSite.needsUpdatedFirebaseIdToken) {
        Firebase_IDToken.setIDToken(await auth().currentUser.getIdToken(true));
        webViewRef.current.postMessage(
          tokenMessage.replace(
            '{F_IDTOKEN}',
            Firebase_IDToken.firebase_idToken,
          ),
        );
      }
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  const onNavigationStateChange = navState => {
    setCanGoBack(navState.canGoBack);
  };

  const debugging = `
     console = new Object();
     console.log = function(log) {
        var obj = {"console_wv": JSON.stringify(log)};
        window.ReactNativeWebView.postMessage(JSON.stringify(obj));
     };
     console.debug = console.log;
     console.info = console.log;
     console.warn = console.log;
     console.error = console.log;
     `;

  useEffect(() => {
    // @ts-ignore
    global.navigationData = {
      onPressTopLeftButton: () => {
        if (canGoBack && webViewRef) {
          webViewRef.current.goBack();
        } else {
          props.navigation.goBack(null);
        }
      },
      onPressTopRightButton: () => {
        // setShowWebLogs(!showWebLogs);
      },
    };
  }, [showWebLogs, canGoBack]);

  const handleBackButtonClick = () => {
    if (canGoBack && webViewRef) {
      webViewRef.current.goBack();
    } else {
      props.navigation.goBack(null);
    }
    return true;
  };

  const componentDidMount = () => {
    const didFocus = async () => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      setLoaded(true);
    };

    const didBlur = () => {};

    props.navigation.addListener('blur', didBlur);
    props.navigation.addListener('focus', didFocus);
    didFocus();
    return componentWillUnmount;
  };

  const componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
  };

  useEffect(componentDidMount, [canGoBack]);
  return (
    <View style={styles.container}>
      <View style={[styles.webViewContainer, showWebLogs && {height: '70%'}]}>
        {loaded && (
          <WebView
            ref={webViewRef}
            onNavigationStateChange={onNavigationStateChange}
            injectedJavaScript={debugging}
            cacheMode={
              constants.APP_MODE_CONTROLLED_BY_SERVER === 'PRODUCTION'
                ? 'LOAD_DEFAULT'
                : 'LOAD_NO_CACHE'
            }
            cacheEnabled={
              constants.APP_MODE_CONTROLLED_BY_SERVER === 'PRODUCTION'
            }
            onLoadEnd={() => {
              setLoaded(true);
              sendDataToBrowser();
              setTimeout(() => {
                StatusBar.setBarStyle('dark-content');
              }, 3000);
            }}
            onShouldStartLoadWithRequest={event => {
              if (event.url.includes('https://thefacultyapp.com/?APP#')) {
                var temp_url = event.url.replace(
                  'https://thefacultyapp.com/?APP#',
                  'APP#',
                );
                temp_url = temp_url.replace('%23', '#');
                standardFunctions.open_inapp_action(props.navigation, temp_url);
                return false;
              }

              if (event.url.includes('?openInBrowser')) {
                standardFunctions.open_browser(event.url);
                return false;
              }
              return true;
            }}
            onMessage={onMessage}
            source={{uri: url}}
          />
        )}
        {!loaded && (
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator
              style={{marginTop: -100}}
              color={colors.THEFACULTY}
              size="small"
            />
          </View>
        )}
      </View>
      {showWebLogs && (
        <ScrollView
          style={{
            width: '100%',
            height: '30%',
            backgroundColor: colors.DEFAULT_PLACEHOLDER,
          }}>
          {webLogs.map((webLog, index) => {
            return (
              <TouchableOpacity
                key={String(index)}
                onLongPress={() => {
                  Clipboard.setString(webLog);
                  standardFunctions.show_alert(
                    'Log Copied!',
                    'The log is copied to clipboard!',
                  );
                }}
                activeOpacity={1.0}>
                <Text
                  style={{
                    flexWrap: 'wrap',
                    backgroundColor: colors.DEFAULT_BACKGROUND,
                    marginTop: 8,
                    marginHorizontal: 8,
                    padding: 5,
                  }}>
                  {webLog}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const TopBarRightButton = props => {
  return (
    <TouchableOpacity style={{flexDirection: 'row'}} onPress={props.onPress}>
      <Image
        resizeMode={'contain'}
        style={{width: 24, height: 24, marginRight: 15}}
        source={require('../../assets/images/icons/menu_top_button.png')}
      />
    </TouchableOpacity>
  );
};

GeneralWebView.navigationOptions = props => {
  const navigation = props.navigation;
  const {
    route: {params = {}},
  } = props;
  // @ts-ignore
  const onPressTopLeftButton = global.navigationData['onPressTopLeftButton'];
  return {
    title: params['title'],
    headerLeft: () => (
      <BackButtonTop
        navigation={navigation}
        onBackPress={onPressTopLeftButton}
      />
    ),
    headerRight: () => null, //constants.APP_MODE_CONTROLLED_BY_SERVER !== 'PRODUCTION' &&
    //<TopBarRightButton navigation={navigation} onPress={navigation.getParam('onPressTopRightButton')}/>,
  };
};

const styles = {
  container: {
    width: '100%',
    height: '100%',
  },
  webViewContainer: {
    width: '100%',
    height: '100%',
  },
};

export default GeneralWebView;
