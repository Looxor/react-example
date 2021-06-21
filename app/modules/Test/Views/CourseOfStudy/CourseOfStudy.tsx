import React from "react";
import { ActivityIndicator, FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { colors, strings } from "../../../../config";
import { routes } from "../../../../navigation/rootNavigation/navigation.constants";
import { StandardBoxWithComponent } from "../../../../components";
import useCourseOfStudyViewModel from "../../ViewModels/CourseOfStudy/CourseOfStudyViewModel";

import SearchBoxItem from "../../CommonComponents/SearchBoxItem";
import styles from "./CourseOfStudy.style";
import CheckActiveSimulation from "../../CommonComponents/CheckActiveSimulation";
import standardFunctions from "../../../../utils/app/StandardFunctions";

const renderButton = (item, navigation) => (
  <TouchableOpacity
    style={styles.majorButton}
    onPress={() => {
      const major_id = item.major_id;
      standardFunctions.add_firebase_event_log('test', 'button_major_clicked', {
        major_id: major_id,
      });
      navigation.navigate(routes.TEST_SELECT_UNIVERSITY, {major_id});
    }}>
    <Text
      style={styles.majorButtonText}
      numberOfLines={2}
      adjustsFontSizeToFit={true}
      minimumFontScale={0.8}>
      {item.name}
    </Text>
  </TouchableOpacity>
);

const CourseOfStudyScreen = props => {
  const state = useCourseOfStudyViewModel();
  const searchKey = state.searchKey;
  const filtered_majors = state.majors.filter(major =>
    new RegExp(searchKey, 'i').test(major.name),
  );
  return (
    <SafeAreaView style={styles.container}>
      <CheckActiveSimulation componentName={'CourseOfStudy'} />
      <StandardBoxWithComponent
        background_start_color={colors.TEST.START}
        background_finish_color={colors.TEST.FINISH}
        viewStyle={styles.headerBox}>
        <Text style={styles.headerBoxText}>
          {strings.TEST.COURSE_OF_STUDY.BOX_TITLE}
        </Text>
      </StandardBoxWithComponent>
      <View style={{width: '96%', alignSelf: 'center', marginBottom: 10}}>
        <SearchBoxItem
          label={strings.TEST.COURSE_OF_STUDY.SEARCH_PLACEHOLDER}
          onSearch={searchKey => state.setSearchKey(searchKey)}
        />
      </View>
      {state.onWaiting() ? (
        <ActivityIndicator
          color={colors.THEFACULTY}
          style={styles.loadingIcon}
        />
      ) : (
        <FlatList
          initialNumToRender={100}
          contentContainerStyle={styles.listContainer}
          keyExtractor={(item, index) => String(index)}
          data={filtered_majors}
          renderItem={({item}) => renderButton(item, props.navigation)}
          ListFooterComponent={<View style={{height: 30}} />}
        />
      )}
    </SafeAreaView>
  );
};

CourseOfStudyScreen.navigationOptions = ({navigation}) => ({
  title: strings.TEST.COURSE_OF_STUDY.TITLE,
});

export default CourseOfStudyScreen;
