import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// MISSING
import { Body, Content, List, ListItem, Right, Text, View } from "native-base";

import { ActivityIndicator, SafeAreaView } from "react-native";
import FastImage from "react-native-fast-image";

import { Button, StandardButton } from "../../components";

import styles from "./DeleteAccountScreen.style";
import { colors, constants, strings } from "../../config";
import { CallServerPromise } from "../../utils/app/CallServer";
import { routes } from "../../navigation/rootNavigation/navigation.constants";
import { logOut } from "../Login/_actions";
import standardFunctions from "../../utils/app/StandardFunctions";

import DeleteAccountBoxComponent from "./_Components/DeleteAccountBoxComponent";
import Strings from "../../utils/misc/TextComponents";
import NavigationService from "../../utils/app/NavigationService";

const DeleteAccountScreen = props => {
  const dispatch = useDispatch();
  const [dispData, setDispData] = useState({
    reasons: [],
    loading: false,
    selectedIndice: [],
  });

  const componentDidMount = () => {
    const loadUninstallReasons = async () => {
      try {
        setDispData({...dispData, loading: true});
        const request = await CallServerPromise.get_static_variable(
          'uninstall_reasons',
        );
        if (request.success) {
          setDispData({...dispData, reasons: request.data, loading: false});
        } else {
        }
      } catch (error) {}
    };
    loadUninstallReasons();
    const componentWillUnmount = () => {};
    return componentWillUnmount;
  };

  //
  useEffect(componentDidMount, []);

  const selectItemHandler = index => {
    standardFunctions.add_firebase_event_log(
      'settings',
      'dlt_user_cfr_clicked',
      {selected: dispData.reasons[index]},
    );
    const indice = [...dispData.selectedIndice];
    const pos = indice.indexOf(index);
    if (pos === -1) {
      indice.push(index);
    } else {
      indice.splice(pos, 1);
    }
    setDispData({...dispData, selectedIndice: indice});
  };

  const remainButtonHandler = () => {
    // props.navigation.navigate(routes.SETTINGS_DELETE_ACCOUNT);
    props.navigation.pop(1);
  };

  const confirmButtonHandler = async () => {
    standardFunctions.add_firebase_event_log(
      'settings',
      'dlt_user_fn_cfr_clicked',
    );
    if (dispData.selectedIndice.length > 0) {
      const reasons = [];
      dispData.selectedIndice.map(index =>
        reasons.push(dispData.reasons[index]),
      );
      try {
        const request = await CallServerPromise.send_uninstall_reasons(reasons);
        if (request.success) {
          const request2 = await CallServerPromise.disable_account();
          if (request2.success) {
            const loggedOut = await dispatch(logOut());
            if (loggedOut) {
              NavigationService.replace(routes.SETTINGS_DELETE_ACCOUNT_AFTER);
            } else {
              console.log('error on deleting account 1', request2);
              showError(strings.SETTINGS.DELETE_ACCOUNT.ERROR_ON_LOGGING_OUT);
            }
          } else {
            console.log('error on deleting account 2', request2);
            showError(strings.SETTINGS.DELETE_ACCOUNT.ERROR_ON_DELETE);
          }
        } else {
        }
      } catch (error) {
        console.log('error on deleting account', error);
        showError(strings.SETTINGS.DELETE_ACCOUNT.ERROR_UNKNOWN);
      }
    }
  };

  const showError = message => {
    standardFunctions.show_alert_async(
      strings.SETTINGS.DELETE_ACCOUNT.TITLE,
      message,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <DeleteAccountBoxComponent />
      <Text style={styles.description}>
        {Strings.makeBold(strings.SETTINGS.DELETE_ACCOUNT.CONFIRM_DESC)}
      </Text>
      <Content>
        {dispData.loading && <ActivityIndicator color={colors.THEFACULTY} />}
        <List style={styles.list}>
          {dispData.reasons &&
            dispData.reasons.map((reason, index) => (
              <ListItem
                key={index}
                touchableHighlightStyle={styles.item}
                style={styles.item}
                noIndent
                button
                onPress={() => selectItemHandler(index)}>
                <Body>
                  <Text
                    style={{
                      fontFamily: constants.DEFAULT_FONT_MEDIUM,
                      fontSize: 17,
                    }}>
                    {reason}
                  </Text>
                </Body>
                <Right>
                  {dispData.selectedIndice.indexOf(index) > -1 && (
                    <FastImage
                      style={styles.selected_icon}
                      source={require('../../../assets/images/icons/icn_selected_blue.png')}
                    />
                  )}
                </Right>
              </ListItem>
            ))}
        </List>
      </Content>
      <View style={styles.buttonContainer}>
        <Button
          onPress={remainButtonHandler}
          style={styles.remainButton}
          textStyle={styles.remainButtonText}>
          {strings.SETTINGS.DELETE_ACCOUNT.REMAIN_BUTTON}
        </Button>
        <StandardButton
          label={strings.SETTINGS.DELETE_ACCOUNT.CONFIRM_BUTTON}
          onPress={confirmButtonHandler}
          style={styles.confirmButton}
        />
      </View>
    </SafeAreaView>
  );
};

DeleteAccountScreen.navigationOptions = ({navigation}) => ({
  title: strings.SETTINGS.DELETE_ACCOUNT.TITLE,
});

export default DeleteAccountScreen;
