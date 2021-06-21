import * as React from "react";
import { TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { createStackNavigator } from "@react-navigation/stack";
import { routes } from "../rootNavigation/navigation.constants";
import LoginV2 from "../../modules/LoginV2/Views/Login";
import FirstScreen from "../../modules/Startapp/FirstScreen";
import ResetPasswordScreen from "../../modules/Login/ResetPasswordScreen";
import colors from "../../config/colors";

import Screen1 from "../../modules/SignUp/Screen1";
import Screen2 from "../../modules/SignUp/Screen2";
import Screen3 from "../../modules/SignUp/Screen3";
import Screen4 from "../../modules/SignUp/Screen4";
import Screen5 from "../../modules/SignUp/Screen5";
import Screen6 from "../../modules/SignUp/Screen6";

import EmailSignUpEmailInputScreen from "../../modules/SignUpV2/Views/EmailSignUp/EmailInputScreen";
import EmailSignUpNameInputScreen from "../../modules/SignUpV2/Views/EmailSignUp/NameInputScreen";
import EmailSignUpEmailPendingScreenV2 from "../../modules/SignUpV2/Views/EmailSignUp/EmailPendingScreen";
import TermsAndConditionScreen from "../../modules/SignUpV2/Views/TermsAndConditionScreen";

import SocialSignUpNameInputScreen from "../../modules/SignUpV2/Views/SocialSignUp/NameInputScreen";

import EmailPendingScreen from "../../modules/SignUp/EmailPendingScreen";
import StudentEmailVerify from "../../modules/SignUp/StudentEmailVerify";
import StudentCardVerify from "../../modules/SignUp/StudentCardVerify";
import AddMajorEmailScreen from "../../modules/SignUp/AddMajorEmailScreen";
import CameraScreen from "../../modules/SignUp/CameraScreen";
import { strings } from "../../config";
import { IOSEmptyNotchBar } from "../../components";
import { stackConfig } from "../mainNavigation/MainTabNavigator";

class BackButtonTop extends React.Component {
  render() {
    // @ts-ignore
    const {navigation} = this.props;
    return (
      <TouchableOpacity
        style={{flexDirection: 'row'}}
        onPress={() => navigation.goBack(null)}>
        <FastImage
          source={require('../../../assets/images/icons/icn_arrow_left_blu.png')}
          style={{width: 30, height: 30, marginLeft: 10}}
        />
      </TouchableOpacity>
    );
  }
}

const authStackConfig = {
  headerMode: 'screen',
  headerLayoutPreset: 'center',
  defaultNavigationOptions: ({navigation}) => {
    const {headerTitleStyle, headerLeftContainerStyle, headerStyle} =
      stackConfig.defaultNavigationOptions({navigation});
    return {
      title: navigation.title,
      // @ts-ignore
      headerLeft: () => <BackButtonTop navigation={navigation} />,
      headerRight: () => null,
      headerTitleStyle,
      headerLeftContainerStyle,
      headerStyle,
    };
  },
};

const AuthStack = createStackNavigator();
const AuthStackScreens = () => {
  console.log('AuthStackScreens ========================');
  return (
    <AuthStack.Navigator
      // @ts-ignore
      screenOptions={authStackConfig.defaultNavigationOptions}
      initialRouteName={routes.STARTAPP}>
      <AuthStack.Screen
        name={routes.STARTAPP}
        component={FirstScreen}
        options={{
          header: () => null,
        }}
      />
      <AuthStack.Screen
        name={routes.LOGIN}
        component={LoginV2}
        options={{
          header: () => <IOSEmptyNotchBar />,
          title: strings.LOGIN.LOGIN_TITLE,
        }}
      />
      <AuthStack.Screen
        name={routes.RESET_PASSWORD}
        component={ResetPasswordScreen}
        options={ResetPasswordScreen.navigationOptions}
      />
      <AuthStack.Screen name={routes.SIGNUP.SCREEN1} component={Screen1} />
      <AuthStack.Screen name={routes.SIGNUP.SCREEN2} component={Screen2} />
      <AuthStack.Screen name={routes.SIGNUP.SCREEN3} component={Screen3} />
      <AuthStack.Screen name={routes.SIGNUP.SCREEN4} component={Screen4} />
      <AuthStack.Screen name={routes.SIGNUP.SCREEN5} component={Screen5} />
      <AuthStack.Screen name={routes.SIGNUP.SCREEN6} component={Screen6} />
      <AuthStack.Screen
        name={routes.SIGNUP.EMAIL_PENDING_SCREEN}
        component={EmailPendingScreen}
      />
      <AuthStack.Screen
        name={routes.SIGNUP.STUDENT_EMAIL_VERIFY}
        component={StudentEmailVerify}
      />
      <AuthStack.Screen
        name={routes.SIGNUP.STUDENT_CARD_VERIFY}
        component={StudentCardVerify}
      />
      <AuthStack.Screen
        name={routes.SIGNUP.ADD_MAJOR_EMAIL}
        component={AddMajorEmailScreen}
      />
      <AuthStack.Screen
        name={routes.SIGNUP.CAMERA_SCREEN}
        component={CameraScreen}
      />
      <AuthStack.Screen
        name={routes.SIGNUPV2.EMAILSIGNUP.EMAIL_INPUT}
        component={EmailSignUpEmailInputScreen}
        // @ts-ignore
        options={{
          header: () => (
            <IOSEmptyNotchBar backgroundColor={colors.THEFACULTY} />
          ),
          ...EmailSignUpEmailInputScreen.navigationOptions,
        }}
      />
      <AuthStack.Screen
        name={routes.SIGNUPV2.EMAILSIGNUP.NAME_INPUT}
        component={EmailSignUpNameInputScreen}
        // @ts-ignore
        options={{
          header: () => (
            <IOSEmptyNotchBar backgroundColor={colors.THEFACULTY} />
          ),
          ...EmailSignUpNameInputScreen.navigationOptions,
        }}
      />
      <AuthStack.Screen
        name={routes.SIGNUPV2.EMAILSIGNUP.EMAIL_PENDING}
        component={EmailSignUpEmailPendingScreenV2}
        // @ts-ignore
        options={{
          header: () => (
            <IOSEmptyNotchBar backgroundColor={colors.THEFACULTY} />
          ),
          ...EmailSignUpEmailPendingScreenV2.navigationOptions,
        }}
      />
      <AuthStack.Screen
        name={routes.SIGNUPV2.SOCIALSIGNUP.NAME_INPUT}
        component={SocialSignUpNameInputScreen}
        // @ts-ignore
        options={{
          header: () => (
            <IOSEmptyNotchBar backgroundColor={colors.THEFACULTY} />
          ),
          ...SocialSignUpNameInputScreen.navigationOptions,
        }}
      />
      <AuthStack.Screen
        name={routes.SIGNUPV2.TERMS_AND_CONDITION}
        component={TermsAndConditionScreen}
        // @ts-ignore
        options={{
          header: () => (
            <IOSEmptyNotchBar backgroundColor={colors.THEFACULTY} />
          ),
          ...TermsAndConditionScreen.navigationOptions,
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreens;
