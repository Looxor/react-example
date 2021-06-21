import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./SubjectsScreen.style";
import FastImage from "react-native-fast-image";
import { constants, strings } from "../../../../config";
import { UserData } from "../../../../config/constants";
import Strings from "../../../../utils/misc/TextComponents";
import { Popover } from "teaset";
import useSubjectsViewModel from "../../_ViewModels/SubjectsViewModel";
import SelectSubjectBox from "../../_Components/SelectSubjectBox";
import standardFunctions from "../../../../utils/app/StandardFunctions";
import { routes } from "../../../../navigation/rootNavigation/navigation.constants";
import { handleUser } from "../../../../utils/firebase/authUtils";
import { auth } from "../../../../utils/firebase";

const PopoverItem = props => {
  return (
    <Popover
      style={styles.helperPopoverContainer}
      arrow={'topRight'}
      paddingCorner={26}>
      {Strings.makeBold(props.text, {style: styles.helperPopoverTextStyle})}
    </Popover>
  );
};

const SubjectsScreen = props => {
  const view = useSubjectsViewModel({props});
  const [showPopover, setShowPopover] = useState({helper: false, check: false});
  const [apiCallInterval, setApiCallInterval] = useState(null);
  const [loadingSubjects, setLoadingSubjects] = useState([]);

  const componentDidMount = () => {
    const didFocus = async () => {
      await handleUser(auth().currentUser);
      view.initValues();
      await view.getSuggestedSubjects();
      await view.getSelectedSubjects();
    };

    const didBlur = () => {};

    props.navigation.addListener('blur', didBlur);
    props.navigation.addListener('focus', didFocus);
    didFocus();
    return componentWillUnmount;
  };

  const componentWillUnmount = () => {
    updateAccount();
  };

  const updateAccount = async () => {
    const updateAccountResponse: any = await view.sendDataToServer();
    setLoadingSubjects([]);
    if (!updateAccountResponse.success) {
      if (updateAccountResponse.error === 'too few faculty subjects') {
        standardFunctions.show_alert(
          strings.OTHER.WARNING,
          strings.BESTOF2.ONBOARDING.CHOOSE_SUBJECTS
            .ERROR_MESSAGE_TOO_FEW_SUBJECTS,
        );
      }
    }
  };

  const setSelected = async subject => {
    standardFunctions.play_tap_sound();
    loadingSubjects.push(subject.subject_id);
    var tempSubjects = view.selectedSubjects ? view.selectedSubjects : [];
    if (!tempSubjects.includes(subject.subject_id)) {
      tempSubjects.push(subject.subject_id);
    } else {
      const indexID = tempSubjects.indexOf(subject.subject_id);
      if (indexID > -1) {
        tempSubjects.splice(indexID, 1);
      }
    }

    let facultySubjectsCount = view.facultySubjects
      ? view.facultySubjects.filter(subject =>
          tempSubjects.includes(subject.subject_id),
        ).length
      : 0;
    view.setSelectedSubjects(tempSubjects);
    if (facultySubjectsCount >= 2) {
      if (apiCallInterval) {
        await clearTimeout(apiCallInterval);
      }

      setApiCallInterval(
        setTimeout(async () => {
          const updateAccountResponse: any = await view.sendDataToServer();
          const indexLS = loadingSubjects.indexOf(subject.subject_id);
          if (indexLS > -1) {
            loadingSubjects.splice(indexLS, 1);
          }
          setLoadingSubjects([]);
          if (!updateAccountResponse.success) {
            if (
              updateAccountResponse.error === 'too few faculty subjects' ||
              updateAccountResponse.error.includes('is too short')
            ) {
              await handleUser(auth().currentUser);
              await view.getSelectedSubjects();
              standardFunctions.show_alert(
                strings.OTHER.WARNING,
                strings.BESTOF2.ONBOARDING.CHOOSE_SUBJECTS
                  .ERROR_MESSAGE_TOO_FEW_SUBJECTS,
              );
            }
            // standardFunctions.show_alert(strings.OTHER.WARNING, strings.BESTOF2.ONBOARDING.CHOOSE_SUBJECTS.ERROR_MESSAGE);
          }
        }, 1000),
      );
    } else {
    }
  };

  const closePopover = () => {
    if (showPopover.helper) {
      setShowPopover({helper: false, check: true});
    } else {
      setShowPopover({helper: false, check: false});
    }
  };

  useEffect(componentDidMount, []);
  return (
    <ScrollView style={styles.container} onTouchStart={closePopover}>
      {showPopover.helper && (
        <PopoverItem
          type={'helper'}
          text={strings.BESTOF2.HOME_SCREEN.SUBJECTS_SCREEN.HELPER_POPOVER_TEXT}
        />
      )}
      <View style={styles.helperView}>
        <TouchableOpacity
          style={styles.iconInfoContainer}
          activeOpacity={constants.ACTIVE_OPACITY}
          onPress={() => {
            if (!showPopover.check) {
              standardFunctions.play_tap_sound();
              setShowPopover({helper: !showPopover.helper, check: false});
            }
          }}>
          <FastImage
            resizeMode={'contain'}
            style={styles.infoIcon}
            source={require('../../../../../assets/images/icons/icn_help_button_bestofs.png')}
          />
        </TouchableOpacity>
        <Text style={styles.infoTitle}>
          {strings.BESTOF2.HOME_SCREEN.SUBJECTS_SCREEN.INFO_TITLE}
        </Text>
        <Text style={styles.infoText}>
          {Strings.makeBold(
            strings.BESTOF2.HOME_SCREEN.SUBJECTS_SCREEN.INFO_TEXT.replace(
              '{FACULTY_NAME}',
              UserData.getUserData().faculty_name,
            ),
          )}
        </Text>
      </View>
      <View style={styles.subjectsContainer}>
        <TouchableOpacity
          style={styles.editFacultyButtonContainer}
          activeOpacity={constants.ACTIVE_OPACITY}
          onPress={() => {
            standardFunctions.play_tap_sound();
            props.navigation.navigate(routes.PROFILE_NAVIGATOR, {
              screen: routes.PROFILE_HOME,
              params: {auto_enable_faculty: true},
            });
          }}>
          <FastImage
            resizeMode={'contain'}
            style={styles.facultyIcon}
            source={
              UserData.getUserData().faculty_image_url
                ? {uri: UserData.getUserData().faculty_image_url}
                : {}
            }
          />
          <FastImage
            resizeMode={'contain'}
            style={styles.editFacultyIcon}
            source={require('../../../../../assets/images/icons/icn_edit_faculty.png')}
          />
        </TouchableOpacity>
        {view.facultySubjects && (
          <View style={styles.facultySubjectsContainer}>
            <Text style={styles.subjectsLabel}>
              {strings.BESTOF2.HOME_SCREEN.SUBJECTS_SCREEN.FACULTY_SUBJECTS_LABEL.replace(
                '{FACULTY_NAME}',
                UserData.getUserData().faculty_name,
              )}
            </Text>
            {view.facultySubjects.map((facultySubject, index) => {
              return (
                <SelectSubjectBox
                  key={String(index)}
                  containerStyle={[styles.subjectBox]}
                  selected={
                    view.selectedSubjects &&
                    view.selectedSubjects.includes(facultySubject.subject_id)
                  }
                  loading={
                    loadingSubjects.includes(facultySubject.subject_id) &&
                    view.loading
                  }
                  subject={facultySubject}
                  setSelected={setSelected}
                />
              );
            })}
          </View>
        )}
        {view.suggestedSubjects && (
          <View style={styles.generalSubjectsContainer}>
            <Text style={styles.subjectsLabel}>
              {
                strings.BESTOF2.HOME_SCREEN.SUBJECTS_SCREEN
                  .GENERAL_SUBJECTS_LABEL
              }
            </Text>
            {view.suggestedSubjects.map((suggestedSubject, index) => {
              return (
                <SelectSubjectBox
                  key={String(index)}
                  containerStyle={[styles.subjectBox]}
                  selected={
                    view.selectedSubjects &&
                    view.selectedSubjects.includes(suggestedSubject.subject_id)
                  }
                  loading={
                    loadingSubjects.includes(suggestedSubject.subject_id) &&
                    view.loading
                  }
                  subject={suggestedSubject}
                  setSelected={setSelected}
                />
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default SubjectsScreen;
