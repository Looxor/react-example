// Libraries //
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Item, Text } from "native-base";
// Configs //
import { routes } from "../../navigation/rootNavigation/navigation.constants";
import { Button, StandardBoxWithImage, StandardInputText } from "../../components";
import { colors, strings } from "../../config";
import { styles } from "./Screen3.style";
import {
  validateMinLength,
  validateMustContainLowerCase,
  validateMustContainNumber,
  validateMustContainUpperCase
} from "../../utils/forms/validationRules";
// redux actions
import { nameCheckAPI, NAMECHECKAPI } from "./_actions";
import FastImage from "react-native-fast-image";
import standardFunctions from "../../utils/app/StandardFunctions";

const Screen3 = props => {
  const signUpInfo = useSelector((state: any) => state.signUp);

  let scrollView = null;
  let legendCheck3Elment = null;

  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [legendCheck1, setLegendCheck1] = useState(false);
  const [legendCheck2, setLegendCheck2] = useState(false);
  const [legendCheck3, setLegendCheck3] = useState(false);
  const [nameExists, setNameExists] = useState(false);
  const [validContinue, setValidContinue] = useState(false);

  useEffect(() => {
    const _keyboardDidShow = () => {
      setTimeout(() => {
        scrollView && scrollView.scrollToEnd();
      }, 400);
    };
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.select({android: 'keyboardDidShow', ios: 'keyboardWillShow'}),
      _keyboardDidShow,
    );
    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    const legendCheck1 = validateMinLength(password, 8);
    const legendCheck2 =
      validateMustContainUpperCase(password) &&
      validateMustContainLowerCase(password);
    const legendCheck3 = validateMustContainNumber(password);
    setLegendCheck1(legendCheck1);
    setLegendCheck2(legendCheck2);
    setLegendCheck3(legendCheck3);
    setNameExists(false);
    setValidContinue(
      nickname.length > 2 && legendCheck1 && legendCheck2 && legendCheck3,
    );
  }, [nickname, password]);

  const setPasswordVisibleHandler = () => {
    setPasswordVisible(!passwordVisible);
  };

  const dispatch: any = useDispatch();
  const goNextScreen = () => {
    if (nickname !== '' && legendCheck1 && legendCheck2 && legendCheck3) {
      dispatch(nameCheckAPI(nickname, password)).then(response => {
        if (response.success === true) {
          setNameExists(response.nickname_exists);
          if (!response.nickname_exists) {
            props.navigation.navigate(routes.SIGNUP.SCREEN4);
          }
        } else {
          standardFunctions.show_alert(
            strings.SIGNUP.THIRD_SCREEN.PAGE_TITLE,
            strings.OTHER.ERROR_CONNECTING_SERVER,
          );
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={view => {
          view && (scrollView = view);
        }}
        style={styles.subContainer}
        contentContainerStyle={styles.scrollSubContainer}>
        <StandardBoxWithImage
          image={require('../../../assets/images/icons/icn_big_glasses_light.png')}
          background_start_color={colors.GENERAL.START}
          background_finish_color={colors.GENERAL.FINISH}
          viewStyle={styles.logo}
          iconStyle={{width: '30%'}}
        />

        <View style={styles.inputContainer}>
          <Item style={styles.input}>
            <StandardInputText
              value={nickname}
              placeholder={strings.SIGNUP.THIRD_SCREEN.INPUT_NICKNAME}
              onChangeText={setNickname}
              returnKeyType={'next'}
              extra_styles={{width: Dimensions.get('window').width - 30}}
            />
          </Item>
          {signUpInfo.status !== NAMECHECKAPI.DOING && nameExists && (
            <Text style={[styles.staticText, styles.warningText]}>
              {strings.ALERTS.ERRORS.SIGNUP.ERROR_NICKNAME_EXISTS}
            </Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Item style={styles.input}>
            <StandardInputText
              value={password}
              placeholder={strings.SIGNUP.THIRD_SCREEN.INPUT_PASSWORD}
              onChangeText={setPassword}
              textContentType={passwordVisible ? 'none' : 'password'}
              keyboardType={passwordVisible ? 'visible-password' : 'default'}
              extra_styles={{width: Dimensions.get('window').width - 30}}
            />
            <TouchableOpacity
              onPress={setPasswordVisibleHandler}
              style={styles.eye_icon_container}>
              <FastImage
                source={
                  passwordVisible
                    ? require('../../../assets/images/icons/icn_eye_open.png')
                    : require('../../../assets/images/icons/icn_eye_close.png')
                }
                style={{width: '100%', height: '100%'}}
              />
            </TouchableOpacity>
          </Item>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.staticText}>
            {'\n' + strings.SIGNUP.THIRD_SCREEN.LEGEND_DESCRIPTION}
          </Text>
          <Text
            style={legendCheck1 ? styles.staticTextChecked : styles.staticText}>
            {legendCheck1
              ? strings.SIGNUP.THIRD_SCREEN.LEGEND_1_CHECKED
              : strings.SIGNUP.THIRD_SCREEN.LEGEND_1_UNCHECKED}
          </Text>
          <Text
            style={legendCheck2 ? styles.staticTextChecked : styles.staticText}>
            {legendCheck2
              ? strings.SIGNUP.THIRD_SCREEN.LEGEND_2_CHECKED
              : strings.SIGNUP.THIRD_SCREEN.LEGEND_2_UNCHECKED}
          </Text>
          <Text
            ref={legendCheck3Elment}
            style={legendCheck3 ? styles.staticTextChecked : styles.staticText}>
            {legendCheck3
              ? strings.SIGNUP.THIRD_SCREEN.LEGEND_3_CHECKED
              : strings.SIGNUP.THIRD_SCREEN.LEGEND_3_UNCHECKED}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.subContainer2}>
        {signUpInfo.status === NAMECHECKAPI.DOING ? (
          <Button onPress={goNextScreen} disabled={true}>
            <ActivityIndicator size="small" color="white" />
          </Button>
        ) : (
          <Button
            disabled={!validContinue}
            style={!validContinue ? styles.disabledButton : {}}
            onPress={goNextScreen}>
            {strings.SIGNUP.THIRD_SCREEN.CONTINUE_BUTTON}
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

Screen3.navigationOptions = {
  title: strings.SIGNUP.SECOND_SCREEN.PAGE_TITLE,
};

export default Screen3;
