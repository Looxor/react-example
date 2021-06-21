import React from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

import styles from './CameraScreen.style';
import {colors, constants, strings} from '../../config';
import standardFunctions from '../../utils/app/StandardFunctions';
import {Button, StandardBoxWithComponent} from '../../components';
import {BarcodeMaskWithOuterLayout} from '@nahrae/react-native-barcode-mask';

const CameraScreen = props => {
  let cameraRef;
  const onPictureTakenHandler = async () => {
    if (cameraRef) {
      try {
        const picture = await cameraRef.takePictureAsync();
        // @ts-ignore
        const navigationData = global.navigationData;
        const onPictureTaken = navigationData['onPictureTaken'];
        onPictureTaken && onPictureTaken(picture);
        props.navigation.goBack();
      } catch (error) {
        standardFunctions.show_alert_async(
          strings.SIGNUP.STUDENT_CARD_VERIFY.TITLE,
          error.message,
        );
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <RNCamera
        captureAudio={false}
        style={styles.camera}
        notAuthorizedView={
          <View
            style={{
              backgroundColor: 'white',
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../assets/images/icons/icn_big_punches_light.png')}
              style={{width: 100, height: 100}}
            />
            <Text
              style={{
                width: '80%',
                textAlign: 'center',
                color: 'black',
                fontSize: 18,
                fontFamily: constants.DEFAULT_FONT,
              }}>
              {strings.OTHER.CAMERA_PERMISSIONS_REQUIRED}
            </Text>
          </View>
        }
        ref={ref => (cameraRef = ref)}>
        <BarcodeMaskWithOuterLayout
          width={320}
          showAnimatedLine={false}
          edgeBorderWidth={8}
          edgeWidth={50}
          edgeHeight={50}
          edgeRadius={18}
          edgeColor={colors.DARK_ALOE_TF}
          maskOpacity={0.5}
          backgroundColor={colors.BLACK}
        />
        <View style={styles.headerBox}>
          <Text style={styles.headerBoxText}>
            {strings.SIGNUP.STUDENT_CARD_VERIFY.SCAN_DESCRIPTION}
          </Text>
          <Text style={styles.headerBoxText2}>
            {strings.SIGNUP.STUDENT_CARD_VERIFY.SCAN_DESCRIPTION2}
          </Text>
        </View>
        <View style={styles.takePictureButtonContainer}>
          <Button
            onPress={onPictureTakenHandler}
            style={styles.takePictureButton}>
            <Text style={styles.takePictureButtonText}>
              {strings.SIGNUP.STUDENT_CARD_VERIFY.TAKE_PICTURE}
            </Text>
          </Button>
        </View>
      </RNCamera>
    </SafeAreaView>
  );
};

export default CameraScreen;
