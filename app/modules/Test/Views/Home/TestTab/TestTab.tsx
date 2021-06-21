import React, { useRef } from "react";
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, Text, View } from "react-native";
import { colors, strings } from "../../../../../config";
import TestInstanceItem from "./Components/TestInstanceItem";
import styles from "./TestTab.style";
import CreateTestItem from "./Components/CreateTestItem";
import FastImage from "react-native-fast-image";
import useTestTabViewModel, { TestItemView } from "../../../ViewModels/Home/TestTab/TestTabViewModel";
import { useNavigation } from "@react-navigation/native";
import standardFunctions from "../../../../../utils/app/StandardFunctions";
import OnboardingCarouselPopover from "../../../../../components/OnboardingCarousel";

const testItemView = new TestItemView();

const renderTestInstanceItem = ({
  navigation,
  item,
  new_created_test_name,
  test_instances,
}) => {
  const test_instances_uniq = test_instances.filter(test_instance => {
    return item.test_name === test_instance.test_name;
  });
  const is_a_test = test_instances_uniq.length <= 1;
  const {test_id, test_name, test_university_name, instance_id} = item;
  const new_created = test_name === new_created_test_name;
  return (
    <TestInstanceItem
      onPressResult={() => testItemView.onPressResult({navigation, test_id})}
      onPressSimulate={() =>
        testItemView.onPressSimulate(navigation, item, test_name)
      }
      test_id={test_id}
      test_name={test_name}
      instance_id={instance_id}
      test_university_name={test_university_name}
      new_created={new_created}
      is_a_test={is_a_test}
      style={styles.testItem}
    />
  );
};

const getItemLayout = (data, index) => ({
  length: 150,
  offset: 150 * index,
  index,
});

// @ts-ignore
const TestTab = props => {
  const navigation = useNavigation();
  const view = useTestTabViewModel();

  const new_created_test_name = view.new_created_test_name;
  const test_instances = view.test_instances.getValue();
  const refreshing = view.refreshing;

  const test_names = [];
  const test_instances_uniq = test_instances.filter(test_instance => {
    const ret = test_names.indexOf(test_instance.test_name) === -1;
    if (ret) test_names.push(test_instance.test_name);
    return ret;
  });

  const flatListRef = useRef(null);
  view.flatListRef = flatListRef;

  standardFunctions.add_firebase_event_log('test', 'test_home_screen_opened');

  OnboardingCarouselPopover().show({screen: 'test_screen'});

  return (
    <>
      {(view.dataLoaded() || test_instances.length > 0) && (
        <FlatList
          ref={flatListRef}
          getItemLayout={getItemLayout}
          contentContainerStyle={styles.container}
          data={test_instances_uniq}
          renderItem={({item}) =>
            renderTestInstanceItem({
              navigation,
              item,
              new_created_test_name,
              test_instances,
            })
          }
          keyExtractor={(item, index) => String(index)}
          initialNumToRender={100}
          ListHeaderComponent={() => (
            <CreateTestItem
              onCreatedTestInstance={test_instance_id => {
                view.onCreatedTestInstance(test_instance_id);
              }}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => view.onRefresh()}
            />
          }
        />
      )}
      {view.onWaiting() && (
        <ActivityIndicator
          style={styles.loadingIcon}
          color={colors.THEFACULTY}
        />
      )}
      {view.dataLoadedButNothing() && (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => view.onRefresh()}
            />
          }
          contentContainerStyle={styles.emptyContainer}>
          <CreateTestItem />
          <View>
            <FastImage
              style={styles.emptyLogo}
              source={require('../../../../../../assets/images/icons/icn_pc.png')}
            />
            <Text style={styles.emptyDescription}>
              {strings.TEST.TEST_SCREEN.EMPTY_DESCRIPTION}
            </Text>
          </View>
          <View />
        </ScrollView>
      )}
    </>
  );
};

export default TestTab;
