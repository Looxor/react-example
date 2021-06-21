import React, { useEffect, useState } from "react";
import FastImage from "react-native-fast-image";

import { ActivityIndicator, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors, strings } from "../../config";
import styles from "./CartaFidatyScreen.style";

import CartaBoxComponent from "./_Components/CartaBoxComponent";

import { Button } from "../../components";
import { routes } from "../../navigation/rootNavigation/navigation.constants";
import { CallServerPromise } from "../../utils/app/CallServer";
import standardFunctions from "../../utils/app/StandardFunctions";
import Strings from "../../utils/misc/TextComponents";
import { UserData } from "../../config/constants";
import LockScreen from "../../components/LockScreen";
import { CommonActions as NavigationActions } from "@react-navigation/native";

const CartaFidatyScreen = props => {
  const [dispData, setDispData] = useState({
    barcode: '',
    loading: false,
  });
  const user = props.navigation.getParam('user');
  const esselunga_verified = user.d('esselunga_verified_customer');

  const openBarcodeScanner = () => {
    props.navigation.navigate(routes.SETTINGS_BARCODE_READER, {onReadCode});
  };

  const onReadCode = barcode => {
    setDispData({...dispData, barcode});
  };

  const donePressHandler = async () => {
    if (dispData.barcode.length === 13) {
      try {
        setDispData({...dispData, loading: true});
        const request: any = await CallServerPromise.verify_esselunga_account(
          dispData.barcode,
        );
        setDispData({...dispData, loading: false});
        if (request.success && request.data === 'ok') {
          await standardFunctions.show_alert_async(
            strings.SETTINGS.CARTA_FIDATY.VERIFY_SUCCESS_TITLE,
            strings.SETTINGS.CARTA_FIDATY.VERIFY_SUCCESS_TEXT,
          );
        } else {
          await showError(request.error);
        }
      } catch (error) {
        await standardFunctions.show_alert_async(
          strings.SETTINGS.CARTA_FIDATY.TITLE,
          strings.SETTINGS.CARTA_FIDATY.SHOULD_BE_13,
        );
      }
    } else {
      await standardFunctions.show_alert_async(
        strings.SETTINGS.CARTA_FIDATY.TITLE,
        strings.SETTINGS.CARTA_FIDATY.SHOULD_BE_13,
      );
    }
  };

  const showError = error => {
    let text = strings.SETTINGS.CARTA_FIDATY.VERIFY_ERROR_UNKNOWN;
    switch (error) {
      case 'fidaty_card must be numeric':
        text = strings.SETTINGS.CARTA_FIDATY.VERIFY_MUST_BE_NUMBERIC;
        break;
      case 'card is blocked, call 800-666555':
        text = strings.SETTINGS.CARTA_FIDATY.VERIFY_CARD_BLOCKED;
        break;
      case 'card is cancelled, call 800-666555':
        text = strings.SETTINGS.CARTA_FIDATY.VERIFY_CARD_CANCELED;
        break;
      case 'not a new fidaty_card':
        text = strings.SETTINGS.CARTA_FIDATY.VERIFY_NOT_NEW_CARD;
        break;
      case 'registration not completed, go to esselunga.it':
        text = strings.SETTINGS.CARTA_FIDATY.VERIFY_NOT_COMPLETED;
        break;
      case 'wrong firstname or lastname':
        text = strings.SETTINGS.CARTA_FIDATY.VERIFY_WRONG_NAME;
        break;
      case 'wrong fidaty_card':
        text = strings.SETTINGS.CARTA_FIDATY.VERIFY_WRONG_CARD;
        break;
      case 'esselunga server error':
        text = Strings.humanize(error);
        break;
    }
    standardFunctions.show_alert_async(
      strings.SETTINGS.CARTA_FIDATY.VERIFY_ERROR_TITLE,
      text,
    );
  };

  const scopriDiscoverPressHandler = () => {
    props.navigation.navigate(routes.SETTINGS_SCOPRI_DISCOVER);
  };

  const notNowPressHandler = () => {
    props.navigation.goBack(null);
  };

  const componentDidMount = () => {
    const componentWillUnmount = () => {};
    return componentWillUnmount;
  };

  // props.navigation.addListener('focus', didFocus);
  useEffect(componentDidMount, []);

  const userData = UserData.getUserData();
  return (
    <SafeAreaView style={styles.container}>
      {!userData.is_student && (
        <LockScreen
          lock_color={colors.COUPONS.START}
          navigation={props.navigation}
          gotoStudentEmailVerifyScreen={() => {
            NavigationActions.navigate(routes.CONTEST_SCOREBOARD, {
              screen: routes.SIGNUP.STUDENT_EMAIL_VERIFY,
            });
          }}
        />
      )}
      <CartaBoxComponent />
      <View style={styles.subContainer}>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            {esselunga_verified
              ? strings.SETTINGS.CARTA_FIDATY.DESC_VERIFIED
              : strings.SETTINGS.CARTA_FIDATY.DESC_NOT_VERIFIED}
          </Text>
          <View style={styles.barcodeContainer}>
            <TextInput
              keyboardType={'number-pad'}
              onChangeText={text => setDispData({...dispData, barcode: text})}
              value={dispData.barcode}
              placeholder={strings.SETTINGS.CARTA_FIDATY.BARCODE_PLACEHOLDER}
              placeholderTextColor={colors.DEFAULT_PLACEHOLDER}
              style={styles.barcodeInput}
              returnKeyType={'done'}
            />
            <TouchableOpacity
              onPress={openBarcodeScanner}
              style={styles.cameraButton}>
              <FastImage
                style={styles.cameraImage}
                source={require('../../../assets/images/icons/icn_camera_blu.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.explanation}>
          {!esselunga_verified ? (
            <>
              <Text style={styles.dont_have_card}>
                {strings.SETTINGS.CARTA_FIDATY.DONT_HAVE_CARD}
              </Text>
              <TouchableOpacity onPress={scopriDiscoverPressHandler}>
                <Text style={styles.how_to_request}>
                  {strings.SETTINGS.CARTA_FIDATY.HOW_TO_REQUEST}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity onPress={scopriDiscoverPressHandler}>
              <Text style={styles.discover_card}>
                {strings.SETTINGS.CARTA_FIDATY.DISCOVER_CARD}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={notNowPressHandler} style={styles.not_now}>
            <Text style={styles.not_now_text}>
              {strings.SETTINGS.CARTA_FIDATY.NOT_NOW}
            </Text>
          </TouchableOpacity>
          <Button
            disabled={dispData.loading}
            onPress={donePressHandler}
            style={styles.done_button}>
            {dispData.loading ? (
              <ActivityIndicator color={colors.WHITE} />
            ) : (
              strings.SETTINGS.CARTA_FIDATY.DONE
            )}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

CartaFidatyScreen.navigationOptions = ({navigation}) => ({
  title: strings.SETTINGS.CARTA_FIDATY.TITLE,
});

export default CartaFidatyScreen;
