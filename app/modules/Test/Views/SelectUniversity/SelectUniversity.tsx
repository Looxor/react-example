import React from "react";
import { ActivityIndicator, FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { colors, strings } from "../../../../config";

import styles from "./SelectUniversity.style";
import { StandardBoxWithComponent } from "../../../../components";
import { routes } from "../../../../navigation/rootNavigation/navigation.constants";
import TestManager, { TestCase } from "../../ViewModels/_Common/TestManager";
import useSelectUniversityViewModel from "../../ViewModels/SelectUniversity/SelectUniversityViewModel";
import CheckActiveSimulation from "../../CommonComponents/CheckActiveSimulation";
import standardFunctions from "../../../../utils/app/StandardFunctions";

const renderButton = (testObject, navigation) => {
  TestManager.init(testObject);
  const test = TestManager.test;
  return (
    <TouchableOpacity
      onPress={() => {
        const test_case = TestCase.FIRST;
        const title = strings.TEST.NEW_INSTANCE.TITLE_FIRST;
        standardFunctions.add_firebase_event_log(
          'test',
          'button_university_clicked',
          {university_id: test.university_id},
        );
        navigation.navigate(routes.TEST_NEW_INSTANCE, {test, test_case, title});
      }}
      style={styles.universityButton}>
      <Text
        style={styles.universityButtonText}
        numberOfLines={2}
        adjustsFontSizeToFit={true}
        minimumFontScale={0.8}>
        {test.university_name}
      </Text>
    </TouchableOpacity>
  );
};

const SelectUniversity = props => {
  const {navigation} = props;
  const view = useSelectUniversityViewModel();
  view.setMajorId(navigation.getParam('major_id'));

  return (
    <SafeAreaView style={styles.container}>
      <CheckActiveSimulation componentName={'SelectUniversity'} />
      <StandardBoxWithComponent
        background_start_color={colors.TEST.START}
        background_finish_color={colors.TEST.FINISH}
        viewStyle={styles.headerBox}>
        <Text style={styles.headerBoxText}>
          {strings.TEST.SELECT_UNIVERSITY.BOX_TITLE}
        </Text>
      </StandardBoxWithComponent>
      {/*<SearchBoxItem onSearch={searchKey => setState2({searchKey})}/>*/}
      {view.onWaiting() ? (
        <ActivityIndicator
          color={colors.THEFACULTY}
          style={styles.loadingIcon}
        />
      ) : (
        <FlatList
          contentContainerStyle={styles.listContainer}
          keyExtractor={index => String(index)}
          data={view.getMajorTests()}
          renderItem={({item}) => renderButton(item, navigation)}
          ListFooterComponent={<View style={{height: 30}} />}
        />
      )}
    </SafeAreaView>
  );
};

SelectUniversity.navigationOptions = ({navigation}) => ({
  title: strings.TEST.SELECT_UNIVERSITY.TITLE,
});

export default SelectUniversity;
