import React, {useEffect} from 'react';
import {
  BackHandler,
  ImageBackground,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import {Button} from '../../../../components';

import styles from './StudentCardPending.style';

import {colors, constants, strings} from '../../../../config';
import FastImage from 'react-native-fast-image';
import VerifyHeaderBox from './_Components/VerifyHeaderBox';
import {routes} from '../../../../navigation/rootNavigation/navigation.constants';
import NavigationService from '../../../../utils/app/NavigationService';

const StudentCardPending = props => {
  // @ts-ignore
  const navigationData = global.navigationData;
  if (!navigationData) return null;
  const onAfterConfirmedStudentCard =
    navigationData['onAfterConfirmedStudentCard'];
  const {
    route: {params},
  } = props;
  if (!params) return null;

  const student_card_images_url = params['student_card_images_url'];
  const university_name = params['university_name'];

  const gotoBestOfButtonPressHandler = () => {
    onAfterConfirmedStudentCard && onAfterConfirmedStudentCard();
    props.navigation.pop(2);
    NavigationService.navigate(routes.BESTOF);
  };

  const handleBackButton = () => true;
  const componentDidMount = () => {
    return componentWillUnmount;
  };

  const componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
  };

  useEffect(componentDidMount, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ImageBackground
        source={require('../../../../../assets/images/icons/bestofs_trasparent_background_blue.png')}
        style={styles.container}>
        <VerifyHeaderBox
          image={require('../../../../../assets/images/icons/icn_badge_verifying.png')}
          title={strings.PROFILEV2.CARD_VERIFY_PENDING.TITLE}
          text={strings.PROFILEV2.CARD_VERIFY_PENDING.TEXT}
          text2={strings.PROFILEV2.CARD_VERIFY_PENDING.TEXT2}
          viewStyle={styles.logo}
          titleStyle={{
            textAlign: 'center',
            width: '100%',
          }}
          textStyle={{
            marginTop: 30,
            textAlign: 'center',
          }}
          iconStyle={{width: '30%'}}
        />
        <Button
          onPress={gotoBestOfButtonPressHandler}
          style={[styles.button, styles.gotoBestOfButton]}
          textStyle={{
            fontFamily: constants.DEFAULT_FONT_BOLD,
            fontSize: 20,
          }}>
          {strings.PROFILEV2.CARD_VERIFY_PENDING.GOTO_BESTOF_BUTTON}
        </Button>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default StudentCardPending;
