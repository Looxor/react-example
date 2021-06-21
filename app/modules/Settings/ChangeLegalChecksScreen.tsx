import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Body, Text } from "native-base";
import { Button, StandardBoxWithComponent } from "../../components";
import { colors, constants, strings } from "../../config";
import styles from "./ChangeLegalChecksScreen.style";
import UserManager from "./Models/UserManager";
import standardFunctions from "../../utils/app/StandardFunctions";
import { TERMS } from "../SignUpV2/ViewModels/TermsAndConditionViewModel";
import Strings from "../../utils/misc/TextComponents";
import { UserData } from "../../config/constants";
import TermsToUpdatePopover from "../Home/_Components/TermsToUpdatePopover";
import { CallServer } from "../../utils/app/CallServer";
import { routes } from "../../navigation/rootNavigation/navigation.constants";

const ChangeLegalChecksScreen = props => {
  const [dispData, setDispData] = useState({
    legalCheck_MARKETING: false,
    legalCheck_DATA: false,
  });
  const [loading, setLoading] = useState(false);

  const termsCheckHandler = term => {
    standardFunctions.play_tap_sound();
    standardFunctions.add_firebase_event_log(
      'settings',
      'btn_legal_' + term.toLowerCase() + '_clicked',
    );
    switch (term) {
      case TERMS.MARKETING:
        setDispData({
          ...dispData,
          legalCheck_MARKETING: !dispData.legalCheck_MARKETING,
        });
        break;
      case TERMS.DATA:
        setDispData({...dispData, legalCheck_DATA: !dispData.legalCheck_DATA});
        break;
    }
  };

  const saveButtonHandler = async () => {
    setLoading(true);
    standardFunctions.add_firebase_event_log(
      'settings',
      'btn_save_legal_clicked',
    );
    const updatedFaculty = await UserManager.updateLegalChecks(
      dispData.legalCheck_MARKETING,
      dispData.legalCheck_DATA,
    );
    setLoading(false);
    if (!updatedFaculty) {
      await standardFunctions.show_alert_async(
        strings.ALERTS.ERRORS.STANDARD.OOPS,
        strings.SETTINGS.CHANGE_LEGAL_CHECKS.ERROR_WHILE_UPDATING,
      );
    } else {
      await standardFunctions.show_alert_async(
        strings.SETTINGS.CHANGE_LEGAL_CHECKS.SUCCESS_UPDATING_TITLE,
        strings.SETTINGS.CHANGE_LEGAL_CHECKS.SUCCESS_UPDATING_MESSAGE,
      );
    }
    props.navigation.goBack(null);
  };

  const componentDidMount = () => {
    let user_checks = UserData.getUserData().legal_check;

    if (user_checks) {
      setDispData({
        ...dispData,
        legalCheck_MARKETING: user_checks.marketing,
        legalCheck_DATA: user_checks.data,
      });
    }

    const componentWillUnmount = () => {
      CallServer.is_legal_check_update_required(result => {
        let is_update_required = result.data.is_update_required;
        if (is_update_required) {
          TermsToUpdatePopover().show({navigation: props.navigation});
        }
      });
    };
    return componentWillUnmount;
  };

  const openDocument = document => {
    if (document === 'terms_and_conditions') {
      props.navigation.navigate(routes.GENERAL_WEBVIEW, {
        url: constants.TERMS_AND_CONDITIONS_URL,
        title: strings.SETTINGS.DELETE_ACCOUNT.TERMS_CONDITIONS_TITLE,
        web_params: {},
      });
    } else if (document === 'privacy_policy') {
      props.navigation.navigate(routes.GENERAL_WEBVIEW, {
        url: constants.PRIVACY_POLICY_URL,
        title: strings.SETTINGS.DELETE_ACCOUNT.PRIVACY_POLICY_TITLE,
        web_params: {},
      });
    }
  };

  useEffect(componentDidMount, []);
  return (
    <SafeAreaView style={styles.container}>
      <StandardBoxWithComponent
        background_start_color={colors.GENERAL.START}
        background_finish_color={colors.GENERAL.FINISH}
        viewStyle={styles.headerBox}>
        <Text style={styles.headerBoxText}>
          {strings.SETTINGS.CHANGE_LEGAL_CHECKS.DESCRIPTION}
        </Text>
      </StandardBoxWithComponent>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => termsCheckHandler(TERMS.MARKETING)}
          activeOpacity={constants.ACTIVE_OPACITY}>
          <Image
            style={{left: 10}}
            resizeMode={'contain'}
            source={
              dispData.legalCheck_MARKETING
                ? require('../../../assets/images/icons/icn_check_selected.png')
                : require('../../../assets/images/icons/icn_check.png')
            }
          />
          <Body style={styles.checkboxTextContainer}>
            <Text style={styles.checkboxText}>
              {strings.SIGNUPV2.TERMS_AND_CONDITION.LEGAL_CHECK1_DESC}
            </Text>
          </Body>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => termsCheckHandler(TERMS.DATA)}
          activeOpacity={constants.ACTIVE_OPACITY}>
          <Image
            style={{left: 10}}
            resizeMode={'contain'}
            source={
              dispData.legalCheck_DATA
                ? require('../../../assets/images/icons/icn_check_selected.png')
                : require('../../../assets/images/icons/icn_check.png')
            }
          />
          <Body style={styles.checkboxTextContainer}>
            <Text style={styles.checkboxText}>
              {strings.SIGNUPV2.TERMS_AND_CONDITION.LEGAL_CHECK2_DESC}
            </Text>
          </Body>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={true}
          style={styles.checkboxContainer}
          onPress={() => {}}
          activeOpacity={constants.ACTIVE_OPACITY}>
          <Image
            style={{left: 10, top: -5}}
            resizeMode={'contain'}
            source={require('../../../assets/images/icons/icn_selected_blue.png')}
          />
          <Body style={styles.checkboxTextContainer}>
            {Strings.makeWrapText(
              strings.SIGNUPV2.TERMS_AND_CONDITION.LEGAL_CHECK3_DESC1,
              {style: styles.checkboxTextGray},
            )}
            <TouchableOpacity
              onPress={() => {
                openDocument('terms_and_conditions');
              }}>
              <Text style={{...styles.textLink, marginLeft: -3}}>
                {strings.SIGNUPV2.TERMS_AND_CONDITION.LEGAL_CHECK3_LINK1}{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                openDocument('terms_and_conditions');
              }}>
              <Text style={{...styles.textLink, marginLeft: -3}}>
                {strings.SIGNUPV2.TERMS_AND_CONDITION.LEGAL_CHECK3_LINK2}{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                openDocument('terms_and_conditions');
              }}>
              <Text style={{...styles.textLink, marginLeft: -3}}>
                {strings.SIGNUPV2.TERMS_AND_CONDITION.LEGAL_CHECK3_LINK3}{' '}
              </Text>
            </TouchableOpacity>
            {Strings.makeWrapText(
              strings.SIGNUPV2.TERMS_AND_CONDITION.LEGAL_CHECK3_DESC2,
              {style: styles.checkboxTextGray},
            )}
            <TouchableOpacity
              onPress={() => {
                openDocument('privacy_policy');
              }}>
              <Text style={{...styles.textLink, marginLeft: -3}}>
                {strings.SIGNUPV2.TERMS_AND_CONDITION.LEGAL_CHECK3_LINK4}{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                openDocument('privacy_policy');
              }}>
              <Text style={{...styles.textLink, marginLeft: -3}}>
                {strings.SIGNUPV2.TERMS_AND_CONDITION.LEGAL_CHECK3_LINK5}{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                openDocument('privacy_policy');
              }}>
              <Text style={{...styles.textLink, marginLeft: -3}}>
                {strings.SIGNUPV2.TERMS_AND_CONDITION.LEGAL_CHECK3_LINK6}{' '}
              </Text>
            </TouchableOpacity>
            {Strings.makeWrapText(
              strings.SIGNUPV2.TERMS_AND_CONDITION.LEGAL_CHECK3_DESC3,
              {style: styles.checkboxTextGray},
            )}
          </Body>
        </TouchableOpacity>
      </ScrollView>
      <Button onPress={saveButtonHandler}>
        {loading ? (
          <ActivityIndicator color={colors.WHITE} />
        ) : (
          strings.SETTINGS.CHANGE_LEGAL_CHECKS.SAVE_BUTTON
        )}
      </Button>
    </SafeAreaView>
  );
};

ChangeLegalChecksScreen.navigationOptions = ({navigation}) => ({
  title: strings.SETTINGS.CHANGE_LEGAL_CHECKS.TITLE,
});

export default ChangeLegalChecksScreen;
