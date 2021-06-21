import React, {useEffect} from 'react';
import {
  BackHandler,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, constants, strings} from '../../../config';
import FastImage from 'react-native-fast-image';
import Strings from '../../../utils/misc/TextComponents';
import {StandardButton} from '../../../components';
import {CallServerPromise} from '../../../utils/app/CallServer';
import {UserData} from '../../../config/constants';
import standardFunctions from '../../../utils/app/StandardFunctions';

let nEmailPollingTimer: any = 0;
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
    email,
  );
  const returnToProfile = () => {
    standardFunctions.play_tap_sound();
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
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
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
    BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
  };

  useEffect(componentDidMount, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>
        <FastImage
          style={styles.waitingManImage}
          source={require('../../../../assets/images/icons/icn_confirm_email_big.png')}
        />
        <Text style={styles.verifyEmail}>
          {strings.PROFILE.CONFIRM_EMAIL.VERIFY_EMAIL}
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
      <StandardButton
        style={{width: '92%'}}
        onPress={returnToProfile}
        label={strings.PROFILE.CONFIRM_EMAIL.RETURN_TO_PROFILE}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 30,
    marginBottom: 10,
  },
  container2: {
    alignItems: 'center',
  },
  waitingManImage: {
    width: 110,
    height: 177,
  },
  verifyEmail: {
    marginTop: 50,
    marginBottom: 10,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 18,
  },
  description: {
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    color: colors.gray,
    lineHeight: 20,
  },
  boldTextStyle: {
    color: colors.black,
  },
  resendButton: {
    marginTop: 30,
  },
  resendButtonText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 18,
    color: colors.THEFACULTY,
  },
});

ConfirmEmailScreen.navigationOptions = ({navigation}) => ({
  title: strings.PROFILE.CONFIRM_EMAIL.TITLE,
  header: () => null,
});

export default ConfirmEmailScreen;
