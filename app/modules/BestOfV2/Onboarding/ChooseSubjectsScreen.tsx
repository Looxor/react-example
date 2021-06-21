import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native";
import styles from "./ChooseSubjectsScreen.style";
import Button from "../../../components/Button";
import { routes } from "../../../navigation/rootNavigation/navigation.constants";
import standardFunctions from "../../../utils/app/StandardFunctions";
import { colors, strings } from "../../../config";
import LinearGradient from "react-native-linear-gradient";
import FastImage from "react-native-fast-image";
import ChooseSubjectsPicker from "./_Components/ChooseSubjectsPicker";
import useOnboardingViewModel from "../_ViewModels/OnboardingViewModel";
import Strings from "../../../utils/misc/TextComponents";
import NavigationService from "../../../utils/app/NavigationService";

const ChooseSubjectsScreen = props => {
  const view = useOnboardingViewModel({props});

  const [pickerOpened, setPickerOpened] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);

  const componentDidMount = () => {
    const didFocus = async () => {
      await view.getSuggestedSubjects();
    };

    const didBlur = () => {};

    props.navigation.addListener('blur', didBlur);
    props.navigation.addListener('focus', didFocus);
    didFocus();
    return componentWillUnmount;
  };

  const componentWillUnmount = () => {};

  const _setSelectedSubjects = (subjects, subject_names) => {
    let facultySubjectsCount =
      view.selectedFaculty && view.selectedFaculty.subjects
        ? view.selectedFaculty.subjects.filter(subject =>
            subjects.includes(subject.subject_id),
          ).length
        : 0;
    view.setSelectedSubjects(subjects, subject_names);
    if (facultySubjectsCount >= 2) {
      setShowContinueButton(true);
    } else {
      setShowContinueButton(false);
    }
  };

  const continueButtonPressed = async () => {
    const updateAccountResponse = await view.sendDataToServer();
    if (updateAccountResponse.success) {
      NavigationService.navigate(routes.BESTOF2_NAVIGATOR, {
        screen: routes.BESTOF2_FINAL_ONBOARDING_SCREEN,
      });
    } else {
      standardFunctions.show_alert(
        strings.OTHER.WARNING,
        strings.BESTOF2.ONBOARDING.CHOOSE_SUBJECTS.ERROR_MESSAGE,
      );
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
            source={require('../../../../assets/images/icons/icn_counter_2of3.png')}
            resizeMode={'contain'}
          />

          {!pickerOpened && (
            <>
              <FastImage
                style={styles.hatIcon}
                source={{uri: view.selectedFaculty.image_url}}
                resizeMode={'contain'}
              />
              <Text style={styles.chooseSubjectsTitle}>
                {strings.BESTOF2.ONBOARDING.CHOOSE_SUBJECTS.TITLE}
              </Text>
              <Text style={styles.chooseSubjectsText}>
                {Strings.makeBold(
                  strings.BESTOF2.ONBOARDING.CHOOSE_SUBJECTS.DESCRIPTION.replace(
                    '{FACULTY_NAME}',
                    view.selectedFaculty.name,
                  ),
                )}
              </Text>
            </>
          )}
          {pickerOpened && (
            <Text style={styles.chooseFacultySmallDescription}>
              {Strings.makeBold(
                strings.BESTOF2.ONBOARDING.CHOOSE_SUBJECTS.SMALL_DESCRIPTION.replace(
                  '{FACULTY_NAME}',
                  view.selectedFaculty.name,
                ),
              )}
            </Text>
          )}

          <ChooseSubjectsPicker
            selectedFaculty={view.selectedFaculty}
            selectedSubjects={view.selectedSubjects}
            setSelectedSubjects={_setSelectedSubjects}
            selectedSubjectNames={view.selectedSubjectNames}
            suggestedSubjects={view.suggestedSubjects}
            pickerOpened={pickerOpened}
            setOpened={setPickerOpened}
          />

          {showContinueButton && (
            <Button
              onPress={continueButtonPressed}
              style={styles.continueButton}
              textStyle={styles.continueButtonText}>
              {view.loading ? (
                <ActivityIndicator style={{}} color={colors.WHITE} />
              ) : (
                strings.BESTOF2.ONBOARDING.CHOOSE_SUBJECTS.CONTINUE_BUTTON
              )}
            </Button>
          )}
        </FastImage>
      </LinearGradient>
    </>
  );
};

export default ChooseSubjectsScreen;
