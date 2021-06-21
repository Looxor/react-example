import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

import styles from "./EditSubjectWeightScreen2.style";

import { strings } from "../../config";
import Strings from "../../utils/misc/TextComponents";
import SliderComponent from "./_Components/SliderComponent";
import { Button } from "../../components";
import { getUserDataFromRedux } from "../../utils/redux/store";
import SubjectWeightManager from "./Models/SubjectWeightManager";
import { routes } from "../../navigation/rootNavigation/navigation.constants";

const EditSubjectWeightScreen2 = props => {
  const userData = getUserDataFromRedux();
  const subjects_weight = [...userData.faculty_subjects];

  const onContinue = async () => {
    SubjectWeightManager.init(subjects_weight, 'f');
    props.navigation.navigate(routes.SETTINGS_EDIT_SUBJECT_WEIGHT3);
  };

  const valueChangeHandler = (index, value) => {
    subjects_weight[index] && (subjects_weight[index]['value'] = value);
  };

  const componentDidMount = () => {
    const componentWillUnmount = () => {};
    return componentWillUnmount;
  };

  //
  useEffect(componentDidMount, []);

  subjects_weight.map(subject_weight => (subject_weight.value = 1));
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.descriptionText}>
          {Strings.makeBold(strings.SETTINGS.EDIT_SUBJECT_WEIGHT2.DESCRIPTION)}
        </Text>
        {subjects_weight &&
          subjects_weight.map((subject, index) => (
            <SliderComponent
              onValueChange={value => valueChangeHandler(index, value)}
              style={styles.sliderComponent}
              title={subject.name}
              value={subject.value}
            />
          ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button onPress={onContinue} style={styles.button}>
          {strings.SETTINGS.EDIT_SUBJECT_WEIGHT2.CONTINUE}
        </Button>
      </View>
    </SafeAreaView>
  );
};

EditSubjectWeightScreen2.navigationOptions = ({navigation}) => ({
  title: strings.SETTINGS.EDIT_SUBJECT_WEIGHT2.TITLE,
});

export default EditSubjectWeightScreen2;
