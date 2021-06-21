import React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { colors, strings } from "../../../../config";

import FastImage from "react-native-fast-image";

import SocialSignInButton, { SOCIAL_PROVIDER_TYPE } from "../../_Components/SocialSignInButton";
import { Button, StandardInputText } from "../../../../components";
import Strings from "../../../../utils/misc/TextComponents";

import styles from "./Login.style";
import useLoginViewModel from "../../ViewModels/LoginViewModel";
import DemoLogin from "./_Components/DemoLogin";

const Login = props => {
  const {navigation} = props;
  const view = useLoginViewModel({props});

  return (
    <SafeAreaView testID={'SignUpScreen'} style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.logoContainer}>
            <FastImage
              resizeMode={'contain'}
              style={styles.logoImage}
              source={require('../../../../../assets/images/logo/icn_complete_logo_2021.png')}
            />
          </View>
          <View style={styles.socialLoginButtonsContainer}>
            <SocialSignInButton
              navigation={navigation}
              type={SOCIAL_PROVIDER_TYPE.GOOGLE}
              style={styles.socialLoginButton}
            />
            <SocialSignInButton
              navigation={navigation}
              type={SOCIAL_PROVIDER_TYPE.FACEBOOK}
              style={styles.socialLoginButton}
            />
            {parseInt(Platform.Version.toString(), 10) >= 13 && (
              <SocialSignInButton
                navigation={navigation}
                type={SOCIAL_PROVIDER_TYPE.APPLE}
                style={styles.socialLoginButton}
              />
            )}
          </View>
          <View style={styles.horizontalDivider}>
            <Text style={styles.alternativeText}>
              {strings.LOGINV2.ALTERNATIVE}
            </Text>
          </View>
          {__DEV__ && false && <DemoLogin view={view} />}
          <View style={styles.emailLoginContainer}>
            <StandardInputText
              testID={'email_address'}
              keyboardType={'email-address'}
              autoCapitalize={'none'}
              textContentType={'username'}
              autoCompleteType={'email'}
              returnKeyType={'next'}
              placeholder={strings.LOGINV2.EMAIL_OR_NICKNAME}
              extra_styles={styles.emailText}
              value={view.email}
              onChangeText={text => view.onChangeText(text, 'email')}
            />
            <StandardInputText
              testID={'password'}
              autoCapitalize={'none'}
              textContentType={'password'}
              hasEye={true}
              autoCompleteType={'password'}
              returnKeyType={'done'}
              placeholder={strings.LOGINV2.PASSWORD}
              extra_styles={styles.passwordText}
              clearButtonMode={'never'}
              value={view.password}
              onChangeText={text => view.onChangeText(text, 'password')}
            />
            <TouchableOpacity
              style={styles.forgotPasswordButton}
              onPress={() => view.onPressForgotPassword()}>
              <Text style={styles.forgotPasswordButtonText}>
                {strings.LOGINV2.FORGOT_PASSWORD}
              </Text>
            </TouchableOpacity>
            <Button
              testID={'continueButtonOnLoginScreen'}
              disabled={!view.valid || view.loading}
              onPress={() => view.onPressEmailLogin()}
              style={styles.continueButton}
              textStyle={styles.continueButtonText}>
              {view.loading === true ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                strings.LOGINV2.CONTINUE
              )}
            </Button>
          </View>
          <View style={styles.description}>
            {Strings.makeWrapText(strings.LOGINV2.DESCRIPTION, {
              style: styles.descriptionText,
            })}
          </View>
          <View style={styles.description}>
            {Strings.makeWrapText(strings.LOGINV2.DESCRIPTION2, {
              style: styles.descriptionText,
            })}
            <TouchableOpacity
              style={styles.registerByEmailButton}
              onPress={() => view.onPressRegisterByEmail()}>
              <Text style={styles.registerByEmailButtonText}>
                {strings.LOGINV2.REGISTER_BY_EMAIL}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.EOF} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
