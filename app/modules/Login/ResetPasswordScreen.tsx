// Libraries //
import * as React from "react";
import { auth } from "../../utils/firebase";
import { ActivityIndicator, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, View } from "react-native";
// Configs //
import { styles } from "./ResetPasswordScreen.style";
import StandardButton from "../../components/StandardButton";
import { colors, strings } from "../../config";
import standardFunctions from "../../utils/app/StandardFunctions";
import { CallServerPromise } from "../../utils/app/CallServer";
import { StandardInputText } from "../../components";
import SocialSignInProvidersPopoverView from "../LoginV2/_Components/SocialSignInProvidersPopoverView";
import FastImage from "react-native-fast-image";

interface State {
  email: string;
  is_loading: boolean;
  email_sent: boolean;
}

class ResetPasswordScreen extends React.Component<{}, State> {
  static navigationOptions = {
    title: strings.RESET_PASSWORD.RESET_PASSWORD_TITLE,
  };
  readonly state: State = {
    email: '',
    is_loading: false,
    email_sent: false,
  };

  constructor(props) {
    super(props);
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {}

  handleEmailChange = (email: string) => {
    this.setState({email: email.replace(/ /g, '')});
  };

  showLinkedSocialPullView = (
    socialProviders: any,
    email: string,
    navigation: any,
  ) => {
    SocialSignInProvidersPopoverView().show({
      navigation: navigation,
      providers: socialProviders,
    });
  };

  handleSendButtonClicked = async () => {
    try {
      if (this.state.email == '') {
        standardFunctions.show_alert(
          strings.ALERTS.ERRORS.STANDARD.OOPS,
          strings.ALERTS.ERRORS.STANDARD.FILL_ALL_FIELDS_TO_PROCEED,
        );
        return;
      }

      this.setState({is_loading: true});
      let result: any = await CallServerPromise.password_reset(
        this.state.email,
      );
      if (result.success) {
        standardFunctions.show_alert(
          strings.ALERTS.RESET_PASSWORD.EMAIL_SENT.TITLE,
          strings.ALERTS.RESET_PASSWORD.EMAIL_SENT.MESSAGE.replace(
            '{EMAIL}',
            result.data.email,
          ),
        );
      } else {
        if (result.error == 'email not verified') {
          standardFunctions.show_alert(
            strings.ALERTS.ERRORS.RESET_PASSWORD.EMAIL_NOT_SENT.NOT_VERIFIED
              .TITLE,
            strings.ALERTS.ERRORS.RESET_PASSWORD.EMAIL_NOT_SENT.NOT_VERIFIED
              .MESSAGE,
          );
        } else if (result.error == 'not a valid user') {
          standardFunctions.show_alert(
            strings.ALERTS.ERRORS.RESET_PASSWORD.EMAIL_NOT_SENT.NOT_VALID_USER
              .TITLE,
            strings.ALERTS.ERRORS.RESET_PASSWORD.EMAIL_NOT_SENT.NOT_VALID_USER
              .MESSAGE,
          );
        } else if (result.error == 'reset in progress') {
          standardFunctions.show_alert(
            strings.ALERTS.ERRORS.RESET_PASSWORD.EMAIL_NOT_SENT
              .RESET_IN_PROGRESS.TITLE,
            strings.ALERTS.ERRORS.RESET_PASSWORD.EMAIL_NOT_SENT
              .RESET_IN_PROGRESS.MESSAGE,
          );
        } else if (result.error == 'missing email sign in method') {
          await this.catch_missing_email_provider_error(this.state.email);
        } else {
          standardFunctions.show_alert(
            strings.ALERTS.ERRORS.RESET_PASSWORD.EMAIL_NOT_SENT.OTHER.TITLE,
            strings.ALERTS.ERRORS.RESET_PASSWORD.EMAIL_NOT_SENT.OTHER.MESSAGE,
          );
        }
      }
    } catch (error) {
      console.log('error on trying to reset password', error);
      this.setState({is_loading: false});
      standardFunctions.show_alert(
        strings.RESET_PASSWORD.ERROR_RESETTING_PASSWORD_TITLE,
        strings.RESET_PASSWORD.ERROR_RESETTING_PASSWORD_MESSAGE,
      );
    }
    this.setState({is_loading: false});
  };

  catch_missing_email_provider_error = async email => {
    try {
      const providers = await auth().fetchSignInMethodsForEmail(email);
      var available_providers_string = '';
      providers.forEach(function (provider) {
        var temp_provider = '';
        if (provider === 'apple.com') {
          temp_provider = 'Apple';
        } else if (provider === 'google.com') {
          temp_provider = 'Google';
        } else if (provider === 'facebook.com') {
          temp_provider = 'Facebook';
        }
        if (available_providers_string === '') {
          available_providers_string = temp_provider;
        } else {
          available_providers_string =
            available_providers_string + ', ' + temp_provider;
        }
      });
      standardFunctions.show_alert(
        strings.ALERTS.ERRORS.RESET_PASSWORD.EMAIL_NOT_SENT.NOT_EMAIL_PROVIDER
          .TITLE,
        strings.ALERTS.ERRORS.RESET_PASSWORD.EMAIL_NOT_SENT.NOT_EMAIL_PROVIDER.MESSAGE.replace(
          '{PROVIDERS}',
          available_providers_string,
        ),
      );
    } catch (e) {
      standardFunctions.show_alert(
        strings.ALERTS.ERRORS.RESET_PASSWORD.EMAIL_NOT_SENT.NOT_EMAIL_PROVIDER
          .TITLE,
        strings.ALERTS.ERRORS.RESET_PASSWORD.EMAIL_NOT_SENT.NOT_EMAIL_PROVIDER.MESSAGE.replace(
          '{PROVIDERS}',
          strings.ALERTS.ERRORS.RESET_PASSWORD.EMAIL_NOT_SENT.NOT_EMAIL_PROVIDER
            .OTHER_SOCIAL,
        ),
      );
    }
  };

  render() {
    const needs_wait = this.state.is_loading || this.state.email_sent;
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <FastImage
              resizeMode={'contain'}
              style={styles.logoImage}
              source={require('../../../assets/images/logo/icn_complete_logo_2021.png')}
            />
            <View style={styles.description_view}>
              <Text style={styles.description_label}>
                {strings.RESET_PASSWORD.DESCRIPTION_TEXT}
              </Text>
            </View>
            <View style={styles.textfield_view}>
              <StandardInputText
                autoCapitalize={'none'}
                autoCorrect={false}
                placeholder={strings.RESET_PASSWORD.EMAIL_PLACEHOLDER}
                textContentType={'nickname'}
                autoCompleteType={'name'}
                value={this.state.email}
                onChangeText={this.handleEmailChange}
                returnKeyType={'send'}
                extra_styles={{alignSelf: 'center'}}
              />
            </View>
          </ScrollView>
          <View style={styles.bottom_buttons}>
            <StandardButton
              style={{marginTop: 8}}
              disabled={needs_wait}
              label={
                needs_wait ? (
                  <ActivityIndicator size="small" color={colors.WHITE} />
                ) : (
                  strings.RESET_PASSWORD.SEND_BUTTON_TEXT
                )
              }
              onPress={this.handleSendButtonClicked}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export default ResetPasswordScreen;
