// Libraries //
import React from "react";
import { ActivityIndicator, Image, Platform, SafeAreaView, StatusBar, TouchableOpacity, View } from "react-native";

import { Body, Text } from "native-base";
// Configs //
import { BackButtonTop, Button } from "../../../components";

import { colors, constants, strings } from "../../../config";
import standardFunctions from "../../../utils/app/StandardFunctions";

import { styles } from "./TermsAndConditionScreen.style";
import Strings from "../../../utils/misc/TextComponents";
import useTermsAndConditionViewModel, { TERMS } from "../ViewModels/TermsAndConditionViewModel";

const TermsAndConditionScreen = props => {
  const view = useTermsAndConditionViewModel({props});

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={true}
        barStyle={'light-content'}
        backgroundColor={colors.THEFACULTY}
      />
      <View style={styles.subContainer}>
        <View style={styles.subTitle}>
          {Platform.OS === 'ios' && (
            <BackButtonTop
              navigation={props.navigation}
              color={'white'}
              style={{position: 'absolute', left: 0, top: 12}}
            />
          )}
          <Text style={styles.subTitleText}>
            {strings.SIGNUPV2.TERMS_AND_CONDITION.SUBTITLE}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => view.termsCheckHandler(TERMS.MARKETING)}
          activeOpacity={constants.ACTIVE_OPACITY}>
          <Image
            style={{left: 10}}
            resizeMode={'contain'}
            source={
              view.legalCheck_MARKETING
                ? require('../../../../assets/images/icons/icn_check_selected.png')
                : require('../../../../assets/images/icons/icn_check.png')
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
          onPress={() => view.termsCheckHandler(TERMS.DATA)}
          activeOpacity={constants.ACTIVE_OPACITY}>
          <Image
            style={{left: 10}}
            resizeMode={'contain'}
            source={
              view.legalCheck_DATA
                ? require('../../../../assets/images/icons/icn_check_selected.png')
                : require('../../../../assets/images/icons/icn_check.png')
            }
          />
          <Body style={styles.checkboxTextContainer}>
            <Text style={styles.checkboxText}>
              {strings.SIGNUPV2.TERMS_AND_CONDITION.LEGAL_CHECK2_DESC}
            </Text>
          </Body>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => view.termsCheckHandler(TERMS.LICENSE)}
          activeOpacity={constants.ACTIVE_OPACITY}>
          <Image
            style={{left: 10}}
            resizeMode={'contain'}
            source={
              view.legalCheck_LICENSE
                ? require('../../../../assets/images/icons/icn_check_selected.png')
                : require('../../../../assets/images/icons/icn_check.png')
            }
          />
          <Body style={styles.checkboxTextContainer}>
            {Strings.makeWrapText(
              strings.SIGNUPV2.TERMS_AND_CONDITION.LEGAL_CHECK3_DESC1,
              {style: styles.checkboxText},
            )}
            <TouchableOpacity
              onPress={() => {
                standardFunctions.open_browser(
                  constants.TERMS_AND_CONDITIONS_URL,
                );
              }}>
              <Text style={{...styles.textLink, marginLeft: -3}}>
                {strings.SIGNUPV2.TERMS_AND_CONDITION.LEGAL_CHECK3_LINK1}{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                standardFunctions.open_browser(
                  constants.TERMS_AND_CONDITIONS_URL,
                );
              }}>
              <Text style={{...styles.textLink, marginLeft: -3}}>
                {strings.SIGNUPV2.TERMS_AND_CONDITION.LEGAL_CHECK3_LINK2}{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                standardFunctions.open_browser(
                  constants.TERMS_AND_CONDITIONS_URL,
                );
              }}>
              <Text style={{...styles.textLink, marginLeft: -3}}>
                {strings.SIGNUPV2.TERMS_AND_CONDITION.LEGAL_CHECK3_LINK3}{' '}
              </Text>
            </TouchableOpacity>
            {Strings.makeWrapText(
              strings.SIGNUPV2.TERMS_AND_CONDITION.LEGAL_CHECK3_DESC2,
              {style: styles.checkboxText},
            )}
            <TouchableOpacity
              onPress={() => {
                standardFunctions.open_browser(constants.PRIVACY_POLICY_URL);
              }}>
              <Text style={{...styles.textLink, marginLeft: -3}}>
                {strings.SIGNUPV2.TERMS_AND_CONDITION.LEGAL_CHECK3_LINK4}{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                standardFunctions.open_browser(constants.PRIVACY_POLICY_URL);
              }}>
              <Text style={{...styles.textLink, marginLeft: -3}}>
                {strings.SIGNUPV2.TERMS_AND_CONDITION.LEGAL_CHECK3_LINK5}{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                standardFunctions.open_browser(constants.PRIVACY_POLICY_URL);
              }}>
              <Text style={{...styles.textLink, marginLeft: -3}}>
                {strings.SIGNUPV2.TERMS_AND_CONDITION.LEGAL_CHECK3_LINK6}{' '}
              </Text>
            </TouchableOpacity>
            {Strings.makeWrapText(
              strings.SIGNUPV2.TERMS_AND_CONDITION.LEGAL_CHECK3_DESC3,
              {style: styles.checkboxText},
            )}
          </Body>
        </TouchableOpacity>
      </View>

      <View style={styles.subContainer}>
        <Button
          disabled={!view.validContinue || view.loading}
          style={!view.validContinue ? styles.disabledButton : {}}
          onPress={() => view.onPressContinue()}>
          {view.loading ? (
            <ActivityIndicator color={'white'} />
          ) : (
            strings.SIGNUP.TERMS_AND_CONDITIONS.CONTINUE_BUTTON
          )}
        </Button>
      </View>
    </SafeAreaView>
  );
};

TermsAndConditionScreen.navigationOptions = ({navigation}) => ({
  title: strings.SIGNUPV2.EMAILSIGNUP.TITLE,
  headerLeft: () => <BackButtonTop navigation={navigation} color={'white'} />,
  headerRight: () => null,
  headerTitleStyle: {
    ...Platform.select({
      android: {
        fontSize: 17,
        paddingTop: 33,
        height: 70,
        elevation: 0,
        shadowOpacity: 0,
      },
    }),
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
  },
  headerStyle: {
    borderBottomWidth: 0,
    backgroundColor: colors.THEFACULTY,
  },
  headerTintColor: colors.WHITE,
});

export default TermsAndConditionScreen;
