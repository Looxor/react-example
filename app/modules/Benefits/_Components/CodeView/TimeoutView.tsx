import React, { useState } from "react";

import { StyleSheet, Text, View } from "react-native";
import { colors, strings } from "../../../../config";
import { Button } from "../../../../components";
import standardFunctions from "../../../../utils/app/StandardFunctions";
import constants from "../../../../config/constants";
import { Observable } from "../../../_CommonModels/ViewModelBase";
import CountdownTimer from "../../../BestOf/_Components/CountdownTimer";

const VIEW_MODE = {
  INITIAL: 0,
  COUNTING: 1,
  COMPLETED: 2,
};

const initalState = {
  viewMode: VIEW_MODE.INITIAL,
};

const TimeoutView = props => {
  const {code_id, timeout_text, timeout_seconds} = props;
  const [dispData, setDispData] = useState(initalState);
  const timerAlreadyStarted = Observable.getReduxValue(code_id);

  const askWithPopup1 = async () => {
    const index = await standardFunctions.show_confirm_async({
      cancelable: true,
      title: timeout_text,
      buttons: [{text: strings.OTHER.NO}, {text: strings.OTHER.YES}],
    });
    return index === 1;
  };

  const askWithPopup2 = async () => {
    const index = await standardFunctions.show_confirm_async({
      cancelable: true,
      title: strings.COUPONS.VIEW.TIMEOUT_POPUP_MESSAGE2,
      message: strings.COUPONS.VIEW.TIMEOUT_POPUP_MESSAGE2_M,
      buttons: [{text: strings.OTHER.CANCEL}, {text: strings.OTHER.OK}],
    });
    return index === 1;
  };

  const showCountingHandler = async () => {
    if ((await askWithPopup1()) === true && (await askWithPopup2()) === true) {
      await Observable.setReduxValue(code_id, true);
      setDispData({...dispData, viewMode: VIEW_MODE.COUNTING});
    }
  };

  const showCompletedHandler = () => {
    setDispData({...dispData, viewMode: VIEW_MODE.COMPLETED});
  };

  return (
    <View style={[styles.container]}>
      {dispData.viewMode === VIEW_MODE.INITIAL && !timerAlreadyStarted ? (
        <Button
          onPress={showCountingHandler}
          style={styles.button}
          textStyle={styles.buttonText}>
          {strings.COUPONS.GENERATE_COUPON}
        </Button>
      ) : dispData.viewMode === VIEW_MODE.COUNTING ? (
        <>
          <Text style={styles.description}>
            {strings.COUPONS.VIEW.TIMEOUT_DESC_COUNTING}
          </Text>
          <View style={styles.couponCodeContainer}>
            <CountdownTimer
              timeout={timeout_seconds ? timeout_seconds : 10}
              size={100}
              width={6.0}
              style={styles.timer}
              tintColor={colors.DARK_ALOE_TF}
              textStyle={styles.timerText}
              onComplete={showCompletedHandler}
            />
          </View>
        </>
      ) : dispData.viewMode === VIEW_MODE.COMPLETED || timerAlreadyStarted ? (
        <>
          <Text style={styles.description}>
            {strings.COUPONS.VIEW.TIMEOUT_DESC_COMPLETED}
          </Text>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    borderWidth: 0,
    backgroundColor: colors.BESTOF2.BG1,
    width: '92%',
    height: 48,
    borderRadius: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    shadowColor: colors.lightGray,
    shadowOpacity: 0.4,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    elevation: 2,
    marginTop: 15,
    marginBottom: 5,
  },
  buttonText: {
    marginTop: -1,
    color: colors.WHITE,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 20,
  },
  timer: {
    width: 100,
    height: 100,
  },
  couponCodeContainer: {
    marginTop: 20,
    borderWidth: 1.5,
    borderColor: '#DDDDDD',
    borderRadius: 16,
    width: '100%',
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCFCFC',
  },
  couponCodeContainerInternal: {
    width: '95%',
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  couponCodeValue: {
    fontSize: 20,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    lineHeight: 25,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  description: {
    marginTop: 15,
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: colors.DARK_ALOE_TF,
  },
  text: {
    fontFamily: constants.DEFAULT_FONT,
    flex: 1,
    fontSize: 16,
    color: colors.BLACK,
    marginLeft: 15,
    marginBottom: 2,
    paddingVertical: 3,
  },
  timerText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    color: colors.DARK_ALOE_TF,
    fontSize: 25,
  },
});

export default TimeoutView;
