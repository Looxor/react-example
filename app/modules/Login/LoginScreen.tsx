// Libraries //
import * as React from "react";
import { ActivityIndicator, SafeAreaView, StatusBar, TouchableOpacity, View } from "react-native";
import { styles } from "./LoginScreen.style";
// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// Configs //
import { routes } from "../../navigation/rootNavigation/navigation.constants";
import { Button, StandardInputText } from "../../components";

import StandardButtonText from "./_Components/StandardButtonText";
import { colors, strings } from "../../config";
import { UserData } from "../../config/constants";

import standardFunctions from "../../utils/app/StandardFunctions";

import { logIn, LOGIN, loginReset } from "./_actions";
import ValidationRules from "../../utils/forms/validationRules";
import { CommonActions as NavigationActions } from "@react-navigation/native";
import { CONFIRM_EMAIL_TYPE } from "../SignUp/EmailPendingScreen";
import { CallServerPromise } from "../../utils/app/CallServer";
import FastImage from "react-native-fast-image";

interface State {
  hasErrors: boolean;
  form: any;
}

interface Props {
  navigation: any;
  logIn: any;
  loginReset: any;
  auth: any;
  onChangeText: any;
}

const gotoAddMajorEmailScreen = async navigation => {
  NavigationActions.navigate(routes.AUTH, {
    screen: routes.SIGNUP.ADD_MAJOR_EMAIL,
  });
};

class LoginScreen extends React.Component<Props, State> {
  readonly state: State = {
    hasErrors: false,
    form: {
      email: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
          isEmail: true,
        },
      },
      password: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
        },
      },
      confirmPassword: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          confirmPass: 'password',
        },
      },
    },
  };

  constructor(props) {
    super(props);
    this.setState = this.setState.bind(this);
  }

  static navigationOptions = ({navigation}) => ({
    title: strings.LOGIN.LOGIN_TITLE,
  });

  componentDidMount() {
    this.props.loginReset();
  }

  updateInput = (name, value) => {
    this.setState({
      hasErrors: false,
    });

    if (name == 'email') {
      value = value.trim();
    }

    const formCopy = this.state.form;
    formCopy[name].value = value;

    // rules

    let rules = formCopy[name].rules;
    formCopy[name].valid = ValidationRules(value, rules, formCopy);

    this.setState({
      form: formCopy,
    });
  };

  handleLoginButtonPress = () => {
    let isFormValid = true;
    let formToSubmit = {};
    const formCopy = this.state.form;
    for (let key in formCopy) {
      if (key !== 'confirmPassword') {
        isFormValid = isFormValid && formCopy[key].valid;
        formToSubmit[key] = formCopy[key].value;
      }
    }

    if (isFormValid) {
      this.props.logIn(formToSubmit).then(async () => {
        if (UserData.isUserLoggedin()) {
          const request = await CallServerPromise.is_standard_email_missing();
          if (request.success) {
            const is_missing = request.data;
            if (is_missing) {
              gotoAddMajorEmailScreen(this.props.navigation);
            } else {
              NavigationActions.navigate(routes.MAIN);
            }
          } else {
            NavigationActions.navigate(routes.MAIN);
          }
        } else {
          if (
            this.props.auth.error &&
            this.props.auth.error.message === 'email not verified'
          ) {
            // MISSING
            NavigationActions.navigate(routes.SIGNUP.EMAIL_PENDING_SCREEN, {
              type: CONFIRM_EMAIL_TYPE.STANDARD,
            });
          } else {
            this.loginError(this.props.auth.error, formToSubmit['email']);
          }
        }
      });
    } else {
      standardFunctions.show_alert(
        strings.ALERTS.ERRORS.STANDARD.OOPS,
        strings.ALERTS.ERRORS.STANDARD.FILL_ALL_FIELDS_TO_PROCEED,
      );
    }
  };

  loginError = (error: any, email: string) => {
    if (error) {
      if (error.code == 'auth/wrong-password' || error.code == 'auth/unknown') {
        if (error.message.indexOf('Too many unsuccessful login') > -1) {
          standardFunctions.show_alert(
            strings.ALERTS.ERRORS.LOGIN.TITLE,
            strings.ALERTS.ERRORS.LOGIN.TOO_MANY_UNSUCCESSFUL_LOGIN,
          );
        } else {
          this.universityEmailError(email);
          // standardFunctions.show_alert(
          //   strings.ALERTS.ERRORS.LOGIN.TITLE,
          //   strings.ALERTS.ERRORS.LOGIN.WRONG_EMAIL_OR_PASSWORD,
          // );
        }
      } else if (error.code == 'auth/user-disabled') {
        standardFunctions.show_alert(
          strings.ALERTS.ERRORS.LOGIN.TITLE,
          strings.ALERTS.ERRORS.LOGIN.USER_DISABLED,
        );
      } else if (error.code == 'auth/too-many-requests') {
        standardFunctions.show_alert(
          strings.ALERTS.ERRORS.LOGIN.TITLE,
          strings.ALERTS.ERRORS.LOGIN.TOO_MANY_REQUEST,
        );
      } else if (error.code == 'auth/network-request-failed') {
        standardFunctions.show_alert(
          strings.ALERTS.ERRORS.LOGIN.TITLE,
          strings.ALERTS.ERRORS.LOGIN.NETWORK_REQUEST_FAILED,
        );
      } else if (error.code === 'auth/firebase-auth') {
        standardFunctions.show_alert(
          strings.ALERTS.ERRORS.LOGIN.TITLE,
          strings.OTHER.CANT_USE_FIREBASE,
        );
      } else {
        this.universityEmailError(email);
      }
    } else {
      this.universityEmailError(email);
    }
  };

  universityEmailError = async email => {
    const request = await CallServerPromise.is_student_email(email);
    if (request.success) {
      const already_exists = request.data;
      if (already_exists) {
        standardFunctions.show_alert(
          strings.ALERTS.ERRORS.LOGIN.TITLE,
          strings.ALERTS.ERRORS.LOGIN.IS_UNIVERSITY_EMAIL,
        );
      } else {
        standardFunctions.show_alert(
          strings.ALERTS.ERRORS.LOGIN.TITLE,
          strings.ALERTS.ERRORS.LOGIN.WRONG_EMAIL_OR_PASSWORD,
        );
      }
    } else {
      standardFunctions.show_alert(
        strings.ALERTS.ERRORS.LOGIN.TITLE,
        strings.ALERTS.ERRORS.LOGIN.WRONG_EMAIL_OR_PASSWORD,
      );
    }
  };

  handleSignupButtonClicked = () => {
    const {navigation} = this.props;
    navigation.navigate(routes.SIGNUP.SCREEN1);
  };

  handleResetPasswordButtonClicked = () => {
    const {navigation} = this.props;
    navigation.navigate(routes.RESET_PASSWORD);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor="transparent"
        />
        <View style={styles.subContainer}>
          <FastImage
            style={styles.logoImage}
            source={require('../../../assets/images/logo/icn_complete_logo_2021.png')}
          />
          {__DEV__ && (
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  form: {
                    email: {
                      value: 'christian.locatelli.dev@gmail.com',
                      valid: true,
                    },
                    password: {value: '12345678', valid: true},
                  },
                })
              }
              style={{
                backgroundColor: 'black',
                width: 50,
                height: 50,
                position: 'absolute',
                left: 15,
                top: 80,
                borderRadius: 25,
                opacity: 0.01,
              }}
            />
          )}
          {__DEV__ && (
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  form: {
                    email: {value: 'test11@federicoferri.me', valid: true},
                    password: {value: 'Password1', valid: true},
                  },
                })
              }
              style={{
                backgroundColor: 'black',
                width: 50,
                height: 50,
                position: 'absolute',
                right: 180,
                top: 80,
                borderRadius: 25,
                opacity: 0.01,
              }}
            />
          )}
          {__DEV__ && (
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  form: {
                    email: {value: 'federico@federicoferri.me', valid: true},
                    password: {value: 'password', valid: true},
                  },
                })
              }
              style={{
                backgroundColor: 'black',
                width: 50,
                height: 50,
                position: 'absolute',
                right: 15,
                top: 80,
                borderRadius: 25,
                opacity: 0.01,
              }}
            />
          )}
          <View style={{width: '100%', height: 52, alignItems: 'center'}}>
            <StandardInputText
              autoCapitalize={'none'}
              textContentType={'emailAddress'}
              autoCompleteType={'off'}
              value={this.state.form.email.value}
              placeholder={strings.LOGIN.EMAIL_PLACEHOLDER}
              onChangeText={value => this.updateInput('email', value)}
              returnKeyType={'next'}
            />
          </View>
          <View style={{width: '100%', height: 52, alignItems: 'center'}}>
            <StandardInputText
              autoCapitalize={'none'}
              textContentType={'password'}
              autoCompleteType={'off'}
              value={this.state.form.password.value}
              placeholder={strings.LOGIN.PASSWORD_PLACEHOLDER}
              onChangeText={value => this.updateInput('password', value)}
              returnKeyType={'done'}
            />
          </View>
          <StandardButtonText
            label={strings.LOGIN.REMEMBER_PASSWORD}
            color={colors.THEFACULTY}
            onPress={this.handleResetPasswordButtonClicked}
            style={{}}
          />
        </View>

        <View style={styles.subContainer}>
          {this.props.auth.status === LOGIN.DOING ? (
            <Button disabled={true}>
              <ActivityIndicator color="white" />
            </Button>
          ) : (
            <>
              <Button onPress={this.handleLoginButtonPress}>
                {strings.LOGIN.LOGIN_BUTTON_TEXT}
              </Button>
            </>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({logIn, loginReset}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
