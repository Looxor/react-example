import React, { useEffect } from "react";
import { Text } from "react-native";
import styles from "./FinalOnboardingScreen.style";
import Button from "../../../components/Button";
import { colors, strings } from "../../../config";
import LinearGradient from "react-native-linear-gradient";
import FastImage from "react-native-fast-image";
import Strings from "../../../utils/misc/TextComponents";
import NavigationService from "../../../utils/app/NavigationService";

const FinalOnboardingScreen = props => {
  const componentDidMount = () => {
    const didFocus = async () => {};

    const didBlur = () => {};

    props.navigation.addListener('blur', didBlur);
    props.navigation.addListener('focus', didFocus);
    didFocus();
    return componentWillUnmount;
  };

  const componentWillUnmount = () => {};

  const continueButtonPressed = async () => {
    // @ts-ignore
    const refreshBestOfV2HomeScreen =
      global.navigationDataForever &&
      global.navigationDataForever['refreshBestOfV2HomeScreen'];
    refreshBestOfV2HomeScreen && refreshBestOfV2HomeScreen();
    NavigationService.popToTop();
    NavigationService.goBack();
  };

  useEffect(componentDidMount, []);
  return (
    <>
      <LinearGradient
        style={styles.container}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        colors={[colors.BESTOF2.BG2_1, colors.BESTOF2.BG2_2]}>
        <FastImage
          style={styles.mainImageBackground}
          source={require('../../../../assets/images/icons/bestofs_trasparent_background.png')}>
          <FastImage
            style={styles.counterIcon}
            source={require('../../../../assets/images/icons/icn_counter_3of3.png')}
            resizeMode={'contain'}
          />

          <FastImage
            style={styles.hatIcon}
            source={require('../../../../assets/images/icons/icn_mountain.png')}
            resizeMode={'contain'}
          />
          <Text style={styles.chooseSubjectsTitle}>
            {strings.BESTOF2.ONBOARDING.FINAL_ONBOARDING_SCREEN.TITLE}
          </Text>
          <Text style={styles.chooseSubjectsText}>
            {Strings.makeBold(
              strings.BESTOF2.ONBOARDING.FINAL_ONBOARDING_SCREEN.DESCRIPTION,
            )}
          </Text>

          <Button
            onPress={continueButtonPressed}
            style={styles.continueButton}
            textStyle={styles.continueButtonText}>
            {strings.BESTOF2.ONBOARDING.FINAL_ONBOARDING_SCREEN.CONTINUE_BUTTON}
          </Button>
        </FastImage>
      </LinearGradient>
    </>
  );
};

export default FinalOnboardingScreen;
