import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ActivityIndicator, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { auth } from "../../utils/firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

import styles from "./NotificationSettingsScreen.style";
import { colors, constants, strings } from "../../config";
import { CallServerPromise } from "../../utils/app/CallServer";
import standardFunctions from "../../utils/app/StandardFunctions";
import { handleUser } from "../../utils/firebase/authUtils";
import { StandardBoxWithComponent } from "../../components";
import Strings from "../../utils/misc/TextComponents";
import { Right } from "native-base";

const LEVEL = {
  FIRST: 0,
  SECOND: 1,
  THIRD: 2,
};

const ListItem = props => (
  <TouchableOpacity
    style={[props.style]}
    onPress={props.onPress}
    disabled={props.disabled}>
    {props.children}
  </TouchableOpacity>
);

const NotificationSettingsScreen = props => {
  const userState = useSelector((state: any) => state.auth);
  const userData = userState.User;
  // const userData = getUserDataFromRedux();
  const [dispData, setDispData] = useState({
    loading1: false,
    loading2: false,
    loading3: false,
  });

  const setNotificationLevelHandler = async notification_level => {
    standardFunctions.play_tap_sound();
    standardFunctions.add_firebase_event_log(
      'settings',
      'btn_ntfc_lvl_' + notification_level.toString() + '_clicked',
    );
    try {
      if (notification_level === 0) {
        setDispData({
          ...dispData,
          loading1: true,
          loading2: false,
          loading3: false,
        });
      } else if (notification_level === 1) {
        setDispData({
          ...dispData,
          loading1: false,
          loading2: true,
          loading3: false,
        });
      } else if (notification_level === 2) {
        setDispData({
          ...dispData,
          loading1: false,
          loading2: false,
          loading3: true,
        });
      }
      const request = await CallServerPromise.update_account({
        notification_level,
      });
      if (request.success) {
        await handleUser(auth().currentUser);
      } else {
        await showError(strings.SETTINGS.SETTINGS_NOTIFICATION.SET_LEVEL_ERROR);
      }
      setDispData({
        ...dispData,
        loading1: false,
        loading2: false,
        loading3: false,
      });
    } catch (error) {
      await showError(strings.SETTINGS.SETTINGS_NOTIFICATION.SET_LEVEL_ERROR);
      setDispData({
        ...dispData,
        loading1: false,
        loading2: false,
        loading3: false,
      });
    }
  };

  const showError = async message => {
    await standardFunctions.show_alert_async(
      strings.SETTINGS.SETTINGS_NOTIFICATION.TITLE,
      message,
    );
  };

  return (
    <View style={styles.container}>
      <StandardBoxWithComponent
        background_start_color={colors.GENERAL.START}
        background_finish_color={colors.GENERAL.FINISH}
        viewStyle={styles.headerBox}>
        <Text style={styles.headerBoxText}>
          {Strings.makeBold(strings.SETTINGS.SETTINGS_NOTIFICATION.DESCRIPTION)}
        </Text>
      </StandardBoxWithComponent>
      <View style={styles.container2}>
        <TouchableOpacity
          activeOpacity={constants.ACTIVE_OPACITY}
          style={[
            styles.item,
            userData.notification_level === LEVEL.FIRST && styles.selectedItem,
          ]}
          onPress={() => setNotificationLevelHandler(LEVEL.FIRST)}
          disabled={
            dispData.loading1 || dispData.loading2 || dispData.loading3
          }>
          <View style={styles.itemLeft}>
            <Text style={styles.itemTitle}>
              {strings.SETTINGS.SETTINGS_NOTIFICATION.CAPTION1_TITLE}
            </Text>
            <Text style={styles.itemText}>
              {strings.SETTINGS.SETTINGS_NOTIFICATION.CAPTION1}
            </Text>
          </View>
          <Right>
            {userData.notification_level === LEVEL.FIRST && (
              <FastImage
                style={styles.iconRight}
                source={require('../../../assets/images/icons/icn_selected_blue.png')}
              />
            )}
            {dispData.loading1 &&
              userData.notification_level !== LEVEL.FIRST && (
                <ActivityIndicator color={colors.gray} style={styles.loading} />
              )}
          </Right>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={constants.ACTIVE_OPACITY}
          style={[
            styles.item,
            userData.notification_level === LEVEL.SECOND && styles.selectedItem,
          ]}
          onPress={() => setNotificationLevelHandler(LEVEL.SECOND)}
          disabled={
            dispData.loading1 || dispData.loading2 || dispData.loading3
          }>
          <View style={styles.itemLeft}>
            <Text style={styles.itemTitle}>
              {strings.SETTINGS.SETTINGS_NOTIFICATION.CAPTION2_TITLE}
            </Text>
            <Text style={styles.itemText}>
              {strings.SETTINGS.SETTINGS_NOTIFICATION.CAPTION2}
            </Text>
          </View>
          <Right>
            {userData.notification_level === LEVEL.SECOND && (
              <FastImage
                style={styles.iconRight}
                source={require('../../../assets/images/icons/icn_selected_blue.png')}
              />
            )}
            {dispData.loading2 &&
              userData.notification_level !== LEVEL.SECOND && (
                <ActivityIndicator color={colors.gray} style={styles.loading} />
              )}
          </Right>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={constants.ACTIVE_OPACITY}
          style={[
            styles.item,
            userData.notification_level === LEVEL.THIRD && styles.selectedItem,
          ]}
          onPress={() => setNotificationLevelHandler(LEVEL.THIRD)}
          disabled={
            dispData.loading1 || dispData.loading2 || dispData.loading3
          }>
          <View style={styles.itemLeft}>
            <Text style={styles.itemTitle}>
              {strings.SETTINGS.SETTINGS_NOTIFICATION.CAPTION3_TITLE}
            </Text>
            <Text style={styles.itemText}>
              {strings.SETTINGS.SETTINGS_NOTIFICATION.CAPTION3}
            </Text>
          </View>
          <Right>
            {userData.notification_level === LEVEL.THIRD && (
              <FastImage
                style={styles.iconRight}
                source={require('../../../assets/images/icons/icn_selected_blue.png')}
              />
            )}
            {dispData.loading3 &&
              userData.notification_level !== LEVEL.THIRD && (
                <ActivityIndicator color={colors.gray} style={styles.loading} />
              )}
          </Right>
        </TouchableOpacity>
      </View>
    </View>
  );
};

NotificationSettingsScreen.navigationOptions = ({navigation}) => ({
  title: strings.SETTINGS.SETTINGS_HOME.TITLE,
});

export default NotificationSettingsScreen;
