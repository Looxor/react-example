// Libraries //
import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, TouchableOpacity, View } from "react-native";

import { Body, CheckBox, Text } from "native-base";
// Configs //
import { routes } from "../../navigation/rootNavigation/navigation.constants";
import { Button, StandardBoxWithImage } from "../../components";

import { colors, constants, strings } from "../../config";
import standardFunctions from "../../utils/app/StandardFunctions";

import { styles } from "./Screen1.style";
import Strings from "../../utils/misc/TextComponents";

const TERMS = {
  FIRST: 'First',
  SECOND: 'Second',
  THIRD: 'Third',
};

const Screen1 = props => {
  const [termsCheck1, setTermsCheck1] = useState(false);
  const [termsCheck2, setTermsCheck2] = useState(false);
  const [termsCheck3, setTermsCheck3] = useState(false);
  const [allChecked, setAllChecked] = useState(false);

  const termsCheckHandler = term => {
    switch (term) {
      case TERMS.FIRST:
        setTermsCheck1(!termsCheck1);
        break;
      case TERMS.SECOND:
        setTermsCheck2(!termsCheck2);
        break;
      case TERMS.THIRD:
        setTermsCheck3(!termsCheck3);
        break;
    }
  };

  useEffect(() => {
    setAllChecked(termsCheck1 && termsCheck2 && termsCheck3);
  });

  const goNextScreen = () => {
    props.navigation.navigate(routes.SIGNUP.SCREEN2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.subContainer}>
        <StandardBoxWithImage
          image={require('../../../assets/images/icons/icn_big_paper_light.png')}
          background_start_color={colors.GENERAL.START}
          background_finish_color={colors.GENERAL.FINISH}
          viewStyle={styles.logo}
          iconStyle={{width: '30%'}}
        />

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => termsCheckHandler(TERMS.FIRST)}
          activeOpacity={constants.ACTIVE_OPACITY}>
          <CheckBox
            onPress={() => termsCheckHandler(TERMS.FIRST)}
            style={{
              ...styles.checkbox,
              borderColor: termsCheck1 ? colors.THEFACULTY : colors.SILVER,
            }}
            color={colors.THEFACULTY}
            checked={termsCheck1}
          />
          <Body style={styles.checkboxTextContainer}>
            <Text style={styles.checboxText}>
              {strings.SIGNUP.TERMS_AND_CONDITIONS.FIRST_CELL1}
              <Text style={{...styles.checboxText, fontWeight: 'bold'}}>
                {strings.SIGNUP.TERMS_AND_CONDITIONS.FIRST_CELL2_BOLD}{' '}
              </Text>
              {strings.SIGNUP.TERMS_AND_CONDITIONS.FIRST_CELL3}
            </Text>
          </Body>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => termsCheckHandler(TERMS.SECOND)}
          activeOpacity={constants.ACTIVE_OPACITY}>
          <CheckBox
            onPress={() => termsCheckHandler(TERMS.SECOND)}
            style={{
              ...styles.checkbox,
              borderColor: termsCheck2 ? colors.THEFACULTY : colors.SILVER,
            }}
            color={colors.THEFACULTY}
            checked={termsCheck2}
          />
          <Body style={styles.checkboxTextContainer}>
            {Strings.makeWrapText(
              strings.SIGNUP.TERMS_AND_CONDITIONS.SECOND_CELL1,
              {style: styles.checboxText},
            )}
            <TouchableOpacity
              onPress={() => {
                standardFunctions.open_browser(constants.PRIVACY_POLICY_URL);
              }}>
              <Text style={styles.textLink}>
                {strings.SIGNUP.TERMS_AND_CONDITIONS.SECOND_CELL1_LINK}
              </Text>
            </TouchableOpacity>
            <Text style={styles.checboxText}>.</Text>
          </Body>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => termsCheckHandler(TERMS.THIRD)}
          activeOpacity={constants.ACTIVE_OPACITY}>
          <CheckBox
            onPress={() => termsCheckHandler(TERMS.THIRD)}
            style={{
              ...styles.checkbox,
              borderColor: termsCheck3 ? colors.THEFACULTY : colors.SILVER,
            }}
            color={colors.THEFACULTY}
            checked={termsCheck3}
          />
          <Body style={styles.checkboxTextContainer}>
            {Strings.makeWrapText(
              strings.SIGNUP.TERMS_AND_CONDITIONS.THIRD_CELL1,
              {style: styles.checboxText},
            )}
            <TouchableOpacity
              onPress={() => {
                standardFunctions.open_browser(
                  constants.TERMS_AND_CONDITIONS_URL,
                );
              }}>
              <Text style={styles.textLink}>
                {strings.SIGNUP.TERMS_AND_CONDITIONS.THIRD_CELL1_LINK}{' '}
              </Text>
            </TouchableOpacity>
            <Text style={styles.checboxText}>
              {strings.SIGNUP.TERMS_AND_CONDITIONS.THIRD_CELL2}{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                standardFunctions.open_browser(constants.CONTEST_RULES_URL);
              }}>
              <Text style={styles.textLink}>
                {strings.SIGNUP.TERMS_AND_CONDITIONS.THIRD_CELL2_LINK}
              </Text>
            </TouchableOpacity>
            <Text style={styles.checboxText}>.</Text>
          </Body>
        </TouchableOpacity>
      </View>

      <View style={styles.subContainer}>
        <Button
          disabled={!allChecked}
          style={!allChecked ? styles.disabledButton : {}}
          onPress={goNextScreen}>
          {strings.SIGNUP.TERMS_AND_CONDITIONS.CONTINUE_BUTTON}
        </Button>
      </View>
    </SafeAreaView>
  );
};

Screen1.navigationOptions = {
  title: strings.SIGNUP.TERMS_AND_CONDITIONS.PAGE_TITLE,
};

export default Screen1;
