import React, { useEffect, useState } from "react";
import { ActivityIndicator, Keyboard, Platform, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { Item, Text } from "native-base";
import { Button, StandardBoxWithComponent, StandardInputText } from "../../components";
import { colors, strings } from "../../config";

import {
  validateMinLength,
  validateMustContainLowerCase,
  validateMustContainNumber,
  validateMustContainUpperCase
} from "../../utils/forms/validationRules";
// redux actions
import FastImage from "react-native-fast-image";

import styles from "./ChangePasswordScreen.style";
import UserManager from "./Models/UserManager";
import standardFunctions from "../../utils/app/StandardFunctions";

const ChangePasswordScreen = props => {
  let scrollView = null;
  let legendCheck3Elment = null;

  const [newPassword, setNewPassword] = useState('');
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);

  const [legendCheck1, setLegendCheck1] = useState(false);
  const [legendCheck2, setLegendCheck2] = useState(false);
  const [legendCheck3, setLegendCheck3] = useState(false);

  const [loading, setLoading] = useState(false);

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
    const legendCheck1 = validateMinLength(newPassword, 8);
    const legendCheck2 =
      validateMustContainUpperCase(newPassword) &&
      validateMustContainLowerCase(newPassword);
    const legendCheck3 = validateMustContainNumber(newPassword);
    setLegendCheck1(legendCheck1);
    setLegendCheck2(legendCheck2);
    setLegendCheck3(legendCheck3);
  }, [newPassword]);

  const setNewPasswordVisibleHandler = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const setOldPasswordVisibleHandler = () => {
    setOldPasswordVisible(!oldPasswordVisible);
  };

  const changePasswordHandler = async () => {
    setLoading(true);
    standardFunctions.add_firebase_event_log(
      'settings',
      'btn_sv_cng_pwd_clicked',
    );
    try {
      const result = await UserManager.changePassword(oldPassword, newPassword);
      setLoading(false);
      if (result) {
        standardFunctions.show_alert_async(
          strings.SETTINGS.CHANGE_PASSWORD.TITLE,
          strings.SETTINGS.CHANGE_PASSWORD.SUCCESS_CHANGE_PASSWORD,
        );
      }
    } catch (error) {
      setLoading(false);
      standardFunctions.show_alert_async(
        strings.SETTINGS.CHANGE_PASSWORD.TITLE,
        strings.SETTINGS.CHANGE_PASSWORD.ERROR_UNKNOWN,
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={view => {
          view && (scrollView = view);
        }}
        style={styles.subContainer}>
        <StandardBoxWithComponent
          background_start_color={colors.GENERAL.START}
          background_finish_color={colors.GENERAL.FINISH}
          viewStyle={styles.headerBox}>
          <Text style={styles.headerBoxText}>
            {strings.SETTINGS.CHANGE_PASSWORD.DESCRIPTION}
          </Text>
        </StandardBoxWithComponent>

        <View style={styles.inputContainer}>
          <Item style={styles.input}>
            <StandardInputText
              clearButtonMode={'never'}
              value={oldPassword}
              placeholder={strings.SETTINGS.CHANGE_PASSWORD.OLD_PASSWORD}
              onChangeText={setOldPassword}
              textContentType={oldPasswordVisible ? 'none' : 'password'}
              keyboardType={oldPasswordVisible ? 'visible-password' : 'default'}
              extra_styles={styles.passwordInput}
            />
            <TouchableOpacity
              activeOpacity={0}
              onPress={setOldPasswordVisibleHandler}
              style={styles.eye_icon_container}>
              <FastImage
                source={
                  oldPasswordVisible
                    ? require('../../../assets/images/icons/icn_eye_open.png')
                    : require('../../../assets/images/icons/icn_eye_close.png')
                }
                style={styles.eye_icon_image}
              />
            </TouchableOpacity>
          </Item>
          <Item style={styles.input}>
            <StandardInputText
              clearButtonMode={'never'}
              value={newPassword}
              placeholder={strings.SETTINGS.CHANGE_PASSWORD.NEW_PASSWORD}
              onChangeText={setNewPassword}
              textContentType={newPasswordVisible ? 'none' : 'password'}
              keyboardType={newPasswordVisible ? 'visible-password' : 'default'}
              extra_styles={styles.passwordInput}
            />
            <TouchableOpacity
              onPress={setNewPasswordVisibleHandler}
              style={styles.eye_icon_container}>
              <FastImage
                source={
                  newPasswordVisible
                    ? require('../../../assets/images/icons/icn_eye_open.png')
                    : require('../../../assets/images/icons/icn_eye_close.png')
                }
                style={styles.eye_icon_image}
              />
            </TouchableOpacity>
          </Item>
        </View>
        <View style={{height: 15}} />
        <View style={styles.inputContainer}>
          <Text style={styles.staticText}>
            {strings.SETTINGS.CHANGE_PASSWORD.LEGEND_DESCRIPTION}
          </Text>
          <Text
            style={legendCheck1 ? styles.staticTextChecked : styles.staticText}>
            {legendCheck1
              ? strings.SETTINGS.CHANGE_PASSWORD.LEGEND_1_CHECKED
              : strings.SETTINGS.CHANGE_PASSWORD.LEGEND_1_UNCHECKED}
          </Text>
          <Text
            style={legendCheck2 ? styles.staticTextChecked : styles.staticText}>
            {legendCheck2
              ? strings.SETTINGS.CHANGE_PASSWORD.LEGEND_2_CHECKED
              : strings.SETTINGS.CHANGE_PASSWORD.LEGEND_2_UNCHECKED}
          </Text>
          <Text
            ref={legendCheck3Elment}
            style={legendCheck3 ? styles.staticTextChecked : styles.staticText}>
            {legendCheck3
              ? strings.SETTINGS.CHANGE_PASSWORD.LEGEND_3_CHECKED
              : strings.SETTINGS.CHANGE_PASSWORD.LEGEND_3_UNCHECKED}
          </Text>
        </View>
      </ScrollView>
      <Button onPress={changePasswordHandler}>
        {loading ? (
          <ActivityIndicator color={colors.WHITE} />
        ) : (
          strings.SETTINGS.CHANGE_PASSWORD.CHANGE_BUTTON
        )}
      </Button>
    </SafeAreaView>
  );
};

ChangePasswordScreen.navigationOptions = ({navigation}) => ({
  title: strings.SETTINGS.CHANGE_PASSWORD.TITLE,
});

export default ChangePasswordScreen;
