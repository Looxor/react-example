// Libraries //
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, SafeAreaView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Content, Item, Text } from "native-base";
// Configs //
import { routes } from "../../navigation/rootNavigation/navigation.constants";
import { Button, StandardBoxWithImage, StandardInputText } from "../../components";
import { colors, constants, strings } from "../../config";
import { styles } from "./Screen4.style";
import { validateEmail } from "../../utils/forms/validationRules";
// redux actions
import { emailCheckAPI, EMAILCHECKAPI } from "./_actions";
import standardFunctions from "../../utils/app/StandardFunctions";

const Screen4 = props => {
  const signUpInfo = useSelector((state: any) => state.signUp);
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [checking, setChecking] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [isUniversityEmail, setIsUniversityEmail] = useState(false);
  const [validContinue, setValidContinue] = useState(false);

  useEffect(() => {
    const emailValid = validateEmail(email);
    setChecking(false);
    setEmailValid(emailValid);
    setEmailExists(false);
    setValidContinue(email === confirmEmail && emailValid);
  }, [email, confirmEmail, emailValid]);

  const dispatch = useDispatch();
  const goNextScreen = async () => {
    setChecking(true);

    if (emailValid && confirmEmail === email) {
      //@ts-ignore
      dispatch(emailCheckAPI(email)).then(result => {
        if (result.success === true) {
          const {email_exists, is_university_email} = result;
          setEmailExists(email_exists);
          setIsUniversityEmail(is_university_email);

          if (email_exists === false && is_university_email === false) {
            props.navigation.navigate(routes.SIGNUP.SCREEN5);
          }
        } else {
          standardFunctions.show_alert(
            strings.SIGNUP.FOURTH_SCREEN.PAGE_TITLE,
            strings.OTHER.ERROR_CONNECTING_SERVER,
          );
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Content
        style={styles.subContainer}
        contentContainerStyle={styles.scrollSubContainer}>
        <StandardBoxWithImage
          image={require('../../../assets/images/icons/icn_big_classroom_light.png')}
          background_start_color={colors.GENERAL.START}
          background_finish_color={colors.GENERAL.FINISH}
          viewStyle={styles.logo}
          iconStyle={{width: '30%'}}
        />
        <View style={styles.inputContainer}>
          <Text style={styles.staticText}>
            {strings.SIGNUP.FOURTH_SCREEN.FIRST_CELL_TEXT1}
            <Text
              style={{fontFamily: constants.DEFAULT_FONT_BOLD, fontSize: 17}}>
              {strings.SIGNUP.FOURTH_SCREEN.FIRST_CELL_TEXT_BOLD}{' '}
            </Text>
            {strings.SIGNUP.FOURTH_SCREEN.FIRST_CELL_TEXT2}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Item regular style={styles.input}>
            <StandardInputText
              autoCompleteType={'email'}
              textContentType={'emailAddress'}
              value={email}
              placeholder={strings.SIGNUP.FOURTH_SCREEN.INPUT_EMAIL}
              onChangeText={setEmail}
              returnKeyType={'next'}
              extra_styles={{
                margin: 0,
                width: Dimensions.get('window').width - 30,
              }}
              autoCapitalize={'none'}
            />
          </Item>
          {signUpInfo.status !== EMAILCHECKAPI.DOING && emailExists && (
            <Text style={[styles.staticText, styles.warningText]}>
              {strings.SIGNUP.FOURTH_SCREEN.ERROR_EXISTS}
            </Text>
          )}
          {signUpInfo.status !== EMAILCHECKAPI.DOING && isUniversityEmail && (
            <Text style={[styles.staticText, styles.warningText]}>
              {strings.SIGNUP.FOURTH_SCREEN.ERROR_IS_UNIVERSITY_EMAIL}
            </Text>
          )}
          {checking && !emailValid && (
            <Text style={[styles.staticText, styles.warningText]}>
              {strings.SIGNUP.FOURTH_SCREEN.ERROR_INVALID_EMAIL}
            </Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Item regular style={styles.input}>
            <StandardInputText
              autoCompleteType={'email'}
              textContentType={'emailAddress'}
              value={confirmEmail}
              placeholder={strings.SIGNUP.FOURTH_SCREEN.INPUT_CONFIRM_EMAIL}
              onChangeText={setConfirmEmail}
              returnKeyType={'go'}
              extra_styles={{
                margin: 0,
                width: Dimensions.get('window').width - 30,
              }}
              autoCapitalize={'none'}
            />
          </Item>
          {checking && email !== confirmEmail && (
            <Text style={[styles.staticText, styles.warningText]}>
              {strings.SIGNUP.FOURTH_SCREEN.ERROR_EMAIL_NOT_MATCH}
            </Text>
          )}
        </View>
      </Content>

      <View style={styles.subContainer2}>
        {signUpInfo.status === EMAILCHECKAPI.DOING ? (
          <Button disabled={true} onPress={goNextScreen}>
            <ActivityIndicator color={colors.WHITE} />
          </Button>
        ) : (
          <Button
            disabled={!validContinue}
            style={!validContinue ? styles.disabledButton : {}}
            onPress={goNextScreen}>
            {strings.SIGNUP.FOURTH_SCREEN.CONTINUE_BUTTON}
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

Screen4.navigationOptions = {
  title: strings.SIGNUP.FOURTH_SCREEN.PAGE_TITLE,
};

export default Screen4;
