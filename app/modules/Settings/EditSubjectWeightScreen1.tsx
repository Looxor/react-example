import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from "react-native";
import { auth } from "../../utils/firebase";

import { colors, strings } from "../../config";
import HomeBoxWithComponent from "./_Components/HomeBoxComponent";
import SubjectsBoxComponent from "./_Components/SubjectsBoxComponent";

import styles from "./EditSubjectWeightScreen1.style";
import { getUserDataFromRedux } from "../../utils/redux/store";
import { Button } from "../../components";
import { CallServerPromise } from "../../utils/app/CallServer";
import { routes } from "../../navigation/rootNavigation/navigation.constants";
import standardFunctions from "../../utils/app/StandardFunctions";
import { handleUser } from "../../utils/firebase/authUtils";

const EditSubjectWeightScreen = props => {
  const [dispData, setDispData] = useState({
    loading: false,
  });

  const userData = getUserDataFromRedux();

  const faculty_name = userData.faculty_name;

  const subjects = userData.faculty_subjects || [];

  const subjects_weights = userData.subjects_weight || [];

  const subjects_included_in_subjects_weights = subjects.filter(subject =>
    subjects_weights.some(
      subject_w => subject_w.subject_id === subject.subject_id,
    ),
  );
  const subjects_not_included_in_faculty_subjects = subjects_weights.filter(
    subject =>
      !subjects.some(subject_w => subject_w.subject_id === subject.subject_id),
  );

  const refreshSubjects = async () => {
    try {
      setDispData({...dispData, loading: true});
      const request = await CallServerPromise.update_account({
        subjects_weight: {},
      });
      let message = '';
      if (request.success) {
        message = strings.SETTINGS.EDIT_SUBJECT_WEIGHT.EMPTY_SUCCESS;
      } else {
        message = strings.SETTINGS.EDIT_SUBJECT_WEIGHT.EMPTY_ERROR;
      }

      await handleUser(auth().currentUser);
      await showError(message);
      setDispData({...dispData, loading: false});
    } catch (error) {
      const message = strings.SETTINGS.EDIT_SUBJECT_WEIGHT.EMPTY_ERROR;
      await showError(message);
      setDispData({...dispData, loading: false});
    }
  };

  const showError = async message => {
    await standardFunctions.show_alert_async(
      strings.SETTINGS.EDIT_SUBJECT_WEIGHT.TITLE,
      message,
    );
  };

  const gotoSecondScreen = () => {
    props.navigation.navigate(routes.SETTINGS_EDIT_SUBJECT_WEIGHT2);
  };

  const componentDidMount = () => {
    const componentWillUnmount = () => {};
    return componentWillUnmount;
  };

  //
  useEffect(componentDidMount, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <HomeBoxWithComponent
          style={{margin: 0, marginTop: 2}}
          text={strings.SETTINGS.EDIT_SUBJECT_WEIGHT.YOUR_FACULTY}
          name={faculty_name}
        />
        <View style={styles.subContainer2}>
          <Text style={styles.subTitle1}>
            {
              strings.SETTINGS.EDIT_SUBJECT_WEIGHT
                .SPECIFY_SUBJECTS_FOR_YOUR_FACULTY
            }
          </Text>
          <SubjectsBoxComponent
            subjects={subjects_included_in_subjects_weights}
          />
          <Text style={styles.subTitle2}>
            {strings.SETTINGS.EDIT_SUBJECT_WEIGHT.OTHER_SUBJECTS_PLAYING_WITH}
          </Text>
          {subjects_not_included_in_faculty_subjects.length > 0 ? (
            <SubjectsBoxComponent
              subjects={subjects_not_included_in_faculty_subjects}
            />
          ) : (
            <View style={styles.no_data}>
              <Text style={styles.no_data_text}>
                {strings.SETTINGS.EDIT_SUBJECT_WEIGHT.NO_DATA}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          onPress={refreshSubjects}
          style={[styles.button, styles.button1]}
          textStyle={styles.buttonText1}>
          {dispData.loading ? (
            <ActivityIndicator color={colors.THEFACULTY} />
          ) : (
            strings.SETTINGS.EDIT_SUBJECT_WEIGHT.BUTTON1
          )}
        </Button>
        <Button
          onPress={gotoSecondScreen}
          style={[styles.button, styles.button2]}
          textStyle={styles.buttonText2}>
          {strings.SETTINGS.EDIT_SUBJECT_WEIGHT.BUTTON2}
        </Button>
      </View>
    </SafeAreaView>
  );
};

EditSubjectWeightScreen.navigationOptions = ({navigation}) => ({
  title: strings.SETTINGS.EDIT_SUBJECT_WEIGHT.TITLE,
});

export default EditSubjectWeightScreen;
