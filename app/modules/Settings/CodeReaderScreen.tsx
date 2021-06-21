import React, { useEffect, useState } from "react";

import { Image, SafeAreaView, Text, View } from "react-native";
import { RNCamera } from "react-native-camera";
import { BarcodeMaskWithOuterLayout } from "@nahrae/react-native-barcode-mask";

import styles from "./CodeReaderScreen.style";
import { colors, constants, strings } from "../../config";
import { Button, StandardBoxWithComponent } from "../../components";
import standardFunctions from "../../utils/app/StandardFunctions";
import { routes } from "../../navigation/rootNavigation/navigation.constants";
import { Alert_Button } from "../../config/interfaces";

let tick = +new Date();
let lock = false;
const lazyRead = procFunc => value => {
  if (lock) return;
  lock = true;
  if (tick + 100 < +new Date()) {
    procFunc(value);
  }
  tick = +new Date();
  lock = false;
};

let onceRead = false;
const CodeReaderScreen = props => {
  const [code, setCode] = useState('');
  const {
    route: {params = {}},
  } = props;
  // @ts-ignore
  const onReadCodeWithNavigation =
    global.navigationData['onReadCodeWithNavigation'];
  const isForTestSection =
    params['isForTestSection'] !== undefined
      ? params['isForTestSection']
      : false;

  const onReadCode = codes => {
    if (onceRead) return;
    if (codes && codes.length > 0) {
      onceRead = true;
      if (
        !isForTestSection &&
        codes[0].data.startsWith('https://tfly.app/9znhq?uuid=')
      ) {
        const go_to_test_section_button: Alert_Button = {
          text: strings.ALERTS.ERRORS.REFERRAL_CODE.GO_TO_TEST_SECTION_BUTTON,
          onPress: () => {
            props.navigation.navigate(routes.TEST);
          },
        };
        const close_button: Alert_Button = {
          text: strings.OTHER.CLOSE,
          onPress: () => {
            onceRead = false;
          },
          style: 'cancel',
        };
        standardFunctions.show_alert_with_buttons(
          strings.ALERTS.ERRORS.REFERRAL_CODE.TITLE_WRONG_PLACE,
          strings.ALERTS.ERRORS.REFERRAL_CODE.IS_A_SIMULATION_CODE,
          false,
          [go_to_test_section_button, close_button],
        );
        return;
      }
      if (
        isForTestSection &&
        !codes[0].data.startsWith('https://tfly.app/9znhq?uuid=')
      ) {
        const close_button: Alert_Button = {
          text: strings.OTHER.CLOSE,
          onPress: () => {
            onceRead = false;
          },
        };
        standardFunctions.show_alert_with_buttons(
          strings.TEST.INSTANCE_DETAIL.QRCODE_NOT_VALID_TITLE,
          strings.TEST.INSTANCE_DETAIL.QRCODE_NOT_VALID,
          false,
          [close_button],
        );
        return;
      }
      if (onReadCodeWithNavigation) {
        // setCode(codes[0].data);
        onReadCodeWithNavigation(codes[0].data, props.navigation);
      } else {
        setCode(codes[0].data);
      }
    }
  };

  const confirmCode = () => {
    if (code != '') {
      const onReadCode =
        params['onReadCode'] || params['onReadCodeWithNavigation'];
      if (onReadCode) {
        onReadCode(code, props.navigation);
        props.navigation.pop();
      } else {
        props.navigation.pop();
      }
    } else {
      props.navigation.pop();
    }
  };

  const componentDidMount = () => {
    onceRead = false;
  };
  useEffect(componentDidMount, []);

  return (
    <SafeAreaView style={styles.container}>
      <RNCamera
        onBarCodeRead={codes => onReadCode([codes])}
        captureAudio={false}
        barCodeTypes={[
          RNCamera.Constants.BarCodeType.code128,
          RNCamera.Constants.BarCodeType.ean13,
          RNCamera.Constants.BarCodeType.ean8,
          RNCamera.Constants.BarCodeType.qr,
        ]}
        autoFocus={'on'}
        autoFocusPointOfInterest={{x: 0.5, y: 0.5}}
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
        }>
        <BarcodeMaskWithOuterLayout
          edgeBorderWidth={5}
          edgeWidth={40}
          edgeHeight={40}
          edgeRadius={8}
          edgeColor={isForTestSection ? colors.TEST.DEFAULT : colors.THEFACULTY}
          maskOpacity={0.7}
          animatedLineColor={colors.RED_TF}
          backgroundColor={colors.BLACK}
        />
        {isForTestSection && (
          <StandardBoxWithComponent
            background_start_color={colors.TEST.START}
            background_finish_color={colors.TEST.FINISH}
            viewStyle={styles.headerBox}>
            <Text style={styles.headerBoxText}>
              {strings.TEST.INSTANCE_INFO.BOX_SUBDESC2 + '\n'}
            </Text>
            <Text style={styles.headerBoxLinkText}>
              simulatore.thefacultyapp.com
            </Text>
          </StandardBoxWithComponent>
        )}
        <View style={styles.readBarcodeContainer}>
          <Text style={styles.readBarcodeText}>{code}</Text>
          <Button onPress={confirmCode} style={styles.confirmBarcodeButton}>
            {code != '' && !onReadCodeWithNavigation
              ? strings.OTHER.CONFIRM.toUpperCase()
              : strings.OTHER.CANCEL.toUpperCase()}
          </Button>
        </View>
      </RNCamera>
    </SafeAreaView>
  );
};

CodeReaderScreen.navigationOptions = props => {
  const {params = {}} = props.route;
  return {
    title:
      params.is_qrcode == true
        ? strings.SETTINGS.BARCODE_READER.TITLE_QRODE
        : strings.SETTINGS.BARCODE_READER.TITLE_BARCODE,
  };
};

export default CodeReaderScreen;
