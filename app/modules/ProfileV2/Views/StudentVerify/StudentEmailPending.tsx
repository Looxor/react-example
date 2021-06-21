import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, constants, strings} from '../../../../config';
import FastImage from 'react-native-fast-image';
import Strings from '../../../../utils/misc/TextComponents';
import {Button} from '../../../../components';
import {CallServerPromise} from '../../../../utils/app/CallServer';
import {UserData} from '../../../../config/constants';
import PopoverView from '../../../../components/PopoverView';

let nEmailPollingTimer: any = 0;

const ClosePopoverComponent = props => {
  const {closePopover} = props;
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FastImage
        style={{width: 50, height: 50}}
        source={require('../../../../../assets/images/icons/icn_flag.png')}
      />
      <Text
        style={[
          styles.popupText,
          {
            fontSize: 24,
            marginVertical: 20,
          },
        ]}>
        {strings.PROFILEV2.EMAIL_VERIFY_PENDING.POPUP_BUTTON}
      </Text>
      <Text
        style={[
          styles.popupText,
          {
            fontSize: 16,
            marginBottom: 30,
            fontFamily: constants.DEFAULT_FONT,
            marginHorizontal: 15,
            textAlign: 'center',
          },
        ]}>
        {Strings.makeBold(strings.PROFILEV2.EMAIL_VERIFY_PENDING.POPUP_TEXT)}
      </Text>
      <Button
        onPress={() => {
          closePopover && closePopover();
        }}
        style={{
          width: '100%',
          height: 50,
          minHeight: 45,
          marginBottom: 0,
          backgroundColor: colors.DARK_ALOE_TF,
        }}>
        <Text style={[styles.popupText, {color: colors.WHITE, fontSize: 18}]}>
          {strings.OTHER.CLOSE}
        </Text>
      </Button>
    </View>
  );
};

const ConfirmEmailScreen = props => {
  const {
    route: {params},
  } = props;
  if (!params) return null;
  const email = params['email'] || 'mario.rossi@gmail.com';
  const mode = params['mode'];

  // @ts-ignore
  const navigationData = global.navigationData;
  if (!navigationData) return null;
  const onAfterConfirmedStudentEmail =
    navigationData['onAfterConfirmedStudentEmail'];
  const onAfterConfirmedContactEmail =
    navigationData['onAfterConfirmedContactEmail'];
  const onReturn = navigationData['onReturn'];

  const description = strings.PROFILE.CONFIRM_EMAIL.DESCRIPTION.replace(
    '{EMAIL}',
    `\n${email}\n`,
  );
  const returnToProfile = () => {
    if (mode === 'contact') {
      onAfterConfirmedContactEmail && onAfterConfirmedContactEmail();
    }
    if (mode === 'student') {
      onAfterConfirmedStudentEmail && onAfterConfirmedStudentEmail();
    }
    onReturn && onReturn();
    nEmailPollingTimer && clearInterval(nEmailPollingTimer);
    props.navigation.goBack(null);
  };

  const showWrongEmailPopup = () => {
    PopoverView().show({
      component: ({closePopover}) => (
        <ClosePopoverComponent closePopover={closePopover} />
      ),
    });
  };

  const checkPolling4ContactEmail = async () => {
    try {
      const request = await CallServerPromise.get_user_data();
      if (
        request.success &&
        request.data &&
        request.data.contact_email === email
      ) {
        await UserData.setUserData(request.data);
        onAfterConfirmedContactEmail && onAfterConfirmedContactEmail();
        returnToProfile();
      }
    } catch (error) {
      console.log('error on checkPolling4ContactEmail', error);
    }
  };

  const checkPolling4StudentEmail = async () => {
    try {
      const request = await CallServerPromise.get_user_data();
      if (
        request.success &&
        request.data &&
        request.data.student_email === email
      ) {
        await UserData.setUserData(request.data);
        onAfterConfirmedStudentEmail && onAfterConfirmedStudentEmail();
        returnToProfile();
      }
    } catch (error) {
      console.log('error on checkPolling4StudentEmail', error);
    }
  };

  const handleBackButton = () => true;
  const componentDidMount = () => {
    // BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    nEmailPollingTimer && clearInterval(nEmailPollingTimer);
    if (mode === 'contact') {
      nEmailPollingTimer = setInterval(checkPolling4ContactEmail, 5000);
    }
    if (mode === 'student') {
      nEmailPollingTimer = setInterval(checkPolling4StudentEmail, 5000);
    }
    return componentWillUnmount;
  };

  const componentWillUnmount = () => {
    clearInterval(nEmailPollingTimer);
    if (mode === 'contact') {
      onAfterConfirmedContactEmail && onAfterConfirmedContactEmail();
    }
    if (mode === 'student') {
      onAfterConfirmedStudentEmail && onAfterConfirmedStudentEmail();
    }
    // BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
  };

  useEffect(componentDidMount, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>
        <FastImage
          style={styles.waitingManImage}
          source={require('../../../../../assets/images/icons/icn_email_verifying.png')}
        />
        <Text style={styles.verifyEmail}>
          {strings.PROFILEV2.EMAIL_VERIFY_PENDING.TITLE}
        </Text>
        {Strings.makeBold(description, {
          style: styles.description,
          boldTextStyle: styles.boldTextStyle,
        })}
        <TouchableOpacity style={styles.resendButton}>
          <Text style={styles.resendButtonText}>
            {strings.PROFILE.CONFIRM_EMAIL.RESEND_EMAIL}
          </Text>
        </TouchableOpacity>
      </View>
      <Button
        style={{width: '92%', backgroundColor: colors.DARK_ALOE_TF}}
        onPress={showWrongEmailPopup}>
        <Text
          style={{
            fontSize: 18,
            color: colors.WHITE,
            fontFamily: constants.DEFAULT_FONT_BOLD,
          }}>
          {strings.PROFILEV2.EMAIL_VERIFY_PENDING.POPUP_OPEN_BUTTON}
        </Text>
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 30,
    marginBottom: 10,
    backgroundColor: colors.WHITE,
  },
  container2: {
    alignItems: 'center',
    marginTop: 55,
  },
  waitingManImage: {
    width: 50,
    height: 38,
  },
  verifyEmail: {
    marginTop: 50,
    marginBottom: 10,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 22,
    color: colors.THEFACULTY2,
  },
  description: {
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 17,
    color: colors.THEFACULTY2,
    lineHeight: 20,
    margin: 10,
  },
  boldTextStyle: {
    color: colors.DARK_ALOE_TF,
    fontSize: 18,
  },
  resendButton: {
    marginTop: 30,
  },
  resendButtonText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 20,
    color: colors.DARK_ALOE_TF,
    textDecorationLine: 'underline',
  },
  popupText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    color: colors.DARK_ALOE_TF,
  },
});

ConfirmEmailScreen.navigationOptions = ({navigation}) => ({
  title: strings.PROFILE.CONFIRM_EMAIL.TITLE,
  header: () => null,
});

export default ConfirmEmailScreen;
