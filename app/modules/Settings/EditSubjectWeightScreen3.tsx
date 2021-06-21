import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from "react-native";
import styles from "./EditSubjectWeightScreen3.style";
import { Button } from "../../components";

import { colors, strings } from "../../config";
import { CallServerPromise } from "../../utils/app/CallServer";
import SubjectButtonComponent from "./_Components/SubjectButtonComponent";
import SubjectWeightManager from "./Models/SubjectWeightManager";
import standardFunctions from "../../utils/app/StandardFunctions";
import { auth } from "../../utils/firebase";
import { handleUser } from "../../utils/firebase/authUtils";

const EditSubjectWeightScreen3 = props => {
  const [dispData, setDispData] = useState({
    subjects: [],
    showNotSuggested: false,
    loading: false,
    loading2: false,
  });

  const componentDidMount = () => {
    const loadSubjectsByChoice = async () => {
      try {
        setDispData({...dispData, loading: true});
        const request = await CallServerPromise.get_by_choice_subjects();
        if (request.success) {
          const subjects = request.data.map(subject => {
            subject.selected = subject.suggested;
            return subject;
          });
          setDispData({...dispData, loading: false, subjects});
        } else {
        }
      } catch (error) {}
    };
    loadSubjectsByChoice();
    const componentWillUnmount = () => {};
    return componentWillUnmount;
  };

  const showAllPressHandler = () => {
    setDispData({...dispData, showNotSuggested: true});
  };

  const subjectPressHandler = index => {
    const selected_subject = dispData.subjects[index];
    const selected = selected_subject.selected;
    selected_subject.selected = !selected;
    setDispData({...dispData, subjects: [...dispData.subjects]});
  };

  const onContinue = async () => {
    const selected_subjects = dispData.subjects.filter(
      subject => subject.selected,
    );
    SubjectWeightManager.init(selected_subjects, 'n');
    SubjectWeightManager.calculate();

    const subjects_weight = SubjectWeightManager.getTotalSubjectsWeight();

    setDispData({...dispData, loading2: true});
    const request = await CallServerPromise.update_account({subjects_weight});
    try {
      let message = '';
      if (request.success) {
        message = strings.SETTINGS.EDIT_SUBJECT_WEIGHT3.SUCCESS;
      } else {
        message = strings.SETTINGS.EDIT_SUBJECT_WEIGHT3.ERROR;
      }

      await handleUser(auth().currentUser);
      await showMessage(message);
      props.navigation.pop(3);
    } catch (error) {
      const message = strings.SETTINGS.EDIT_SUBJECT_WEIGHT3.ERROR;
      await showMessage(message);
    }
  };

  const showMessage = async message => {
    await standardFunctions.show_alert_async(
      strings.SETTINGS.EDIT_SUBJECT_WEIGHT3.TITLE,
      message,
    );
  };

  //
  useEffect(componentDidMount, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.descriptionText}>
          {strings.SETTINGS.EDIT_SUBJECT_WEIGHT3.DESCRIPTION}
        </Text>
        {(dispData.subjects && dispData.subjects.length) > 0 ? (
          dispData.subjects.map((subject, index) =>
            dispData.showNotSuggested ? (
              <SubjectButtonComponent
                selected={subject.selected}
                onPress={() => subjectPressHandler(index)}
                subject={subject}
              />
            ) : subject.suggested ? (
              <SubjectButtonComponent
                selected={subject.selected}
                onPress={() => subjectPressHandler(index)}
                subject={subject}
              />
            ) : null,
          )
        ) : (
          <ActivityIndicator color={colors.THEFACULTY} />
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        {!dispData.showNotSuggested && (
          <Button
            disabled={dispData.loading}
            onPress={showAllPressHandler}
            style={[styles.button, styles.button1]}
            textStyle={[
              styles.button1Text,
              dispData.loading ? styles.button1TextDisabled : null,
            ]}>
            {strings.SETTINGS.EDIT_SUBJECT_WEIGHT3.LOAD_MORE_SUBJECTS}
          </Button>
        )}
        <Button
          disabled={dispData.loading}
          onPress={onContinue}
          style={[
            styles.button,
            styles.button2,
            dispData.loading ? styles.button2Disabled : null,
          ]}
          textStyle={styles.button2Text}>
          {dispData.loading2 ? (
            <ActivityIndicator color={colors.WHITE} />
          ) : (
            strings.SETTINGS.EDIT_SUBJECT_WEIGHT3.CONTINUE
          )}
        </Button>
      </View>
    </SafeAreaView>
  );
};

EditSubjectWeightScreen3.navigationOptions = ({navigation}) => ({
  title: strings.SETTINGS.EDIT_SUBJECT_WEIGHT3.TITLE,
});

export default EditSubjectWeightScreen3;
