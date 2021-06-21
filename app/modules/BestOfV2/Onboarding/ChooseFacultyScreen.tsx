import React, { useEffect, useState } from "react";
import { BackHandler, Text } from "react-native";
import styles from "./ChooseFacultyScreen.style";
import Button from "../../../components/Button";
import { routes } from "../../../navigation/rootNavigation/navigation.constants";
import { colors, strings } from "../../../config";
import LinearGradient from "react-native-linear-gradient";
import FastImage from "react-native-fast-image";
import ChooseFacultyPicker from "./_Components/ChooseFacultyPicker";
import useOnboardingViewModel from "../_ViewModels/OnboardingViewModel";
import NavigationService from "../../../utils/app/NavigationService";

const ChooseFacultyScreen = props => {
  const view = useOnboardingViewModel({props});

  const [pickerOpened, setPickerOpened] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);

  const handleBackButtonClick = () => {
    return true;
  };

  const componentDidMount = () => {
    view.initValues();
    const didFocus = async () => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      await view.getFaculties();
    };

    const didBlur = () => {};

    props.navigation.addListener('blur', didBlur);
    props.navigation.addListener('focus', didFocus);
    didFocus();
    return componentWillUnmount;
  };

  const componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
  };

  const _setSelectedFaculty = faculty => {
    view.setSelectedFaculty(faculty);
    setShowContinueButton(true);
  };

  const continueButtonClicked = () => {
    if (view.selectedFaculty) {
      NavigationService.navigate(routes.BESTOF2_CHOOSE_SUBJECTS, {
        screen: routes.BESTOF2_CHOOSE_SUBJECTS,
      });
    }
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
            source={require('../../../../assets/images/icons/icn_counter_1of3.png')}
            resizeMode={'contain'}
          />

          {!pickerOpened && (
            <>
              <FastImage
                style={styles.hatIcon}
                source={require('../../../../assets/images/icons/icn_hat_big.png')}
                resizeMode={'contain'}
              />
              <Text style={styles.chooseFacultyTitle}>
                {strings.BESTOF2.ONBOARDING.CHOOSE_FACULTY.TITLE}
              </Text>
              <Text style={styles.chooseFacultyText}>
                {strings.BESTOF2.ONBOARDING.CHOOSE_FACULTY.DESCRIPTION}
              </Text>
            </>
          )}

          <ChooseFacultyPicker
            selectedFaculty={view.selectedFaculty}
            faculties={view.faculties}
            pickerOpened={pickerOpened}
            setOpened={setPickerOpened}
            setSelectedFaculty={_setSelectedFaculty}
          />

          {showContinueButton && (
            <Button
              onPress={continueButtonClicked}
              style={styles.continueButton}
              textStyle={styles.continueButtonText}>
              {strings.BESTOF2.ONBOARDING.CHOOSE_FACULTY.CONTINUE_BUTTON}
            </Button>
          )}
        </FastImage>
      </LinearGradient>
    </>
  );
};

export default ChooseFacultyScreen;
