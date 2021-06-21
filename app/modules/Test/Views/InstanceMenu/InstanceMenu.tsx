import React from "react";
import { ActivityIndicator, FlatList, SafeAreaView, Text } from "react-native";

import useInstanceMenuViewModel from "../../ViewModels/InstanceMenu/InstanceMenuViewModel";
import TestManager, { TestCase, TestEvent } from "../../ViewModels/_Common/TestManager";

import { StandardBoxWithComponent } from "../../../../components";
import TestInstanceWaybackItem from "./Components/TestInstanceWaybackItem";
import TestInstanceCreateButton from "./Components/TestInstanceCreateButton";
import TestInstanceCloneItem from "./Components/TestInstanceCloneItem";

import styles from "./InstanceMenu.style";
import { routes } from "../../../../navigation/rootNavigation/navigation.constants";
import { colors, strings } from "../../../../config";
import CheckActiveSimulation from "../../CommonComponents/CheckActiveSimulation";
import standardFunctions from "../../../../utils/app/StandardFunctions";

const onPressCreateButton = (navigation, view) => {
  const test = TestManager.test;
  const test_case = TestCase.NOT_FIRST;
  const title = strings.TEST.NEW_INSTANCE.TITLE_NOT_FIRST;
  standardFunctions.add_firebase_event_log(
    'test',
    'btn_crt_simulation_clicked',
    {test_id: test.test_id},
  );
  TestManager.bindEvent(
    TestEvent.onCreatedTestInstance,
    ({test_instance_id}) => {
      view.new_instance_id = test_instance_id;
      view.updateView();
      setTimeout(() => {
        view.new_instance_id = '';
        view.updateView();
      }, 6000);
    },
  );
  navigation.navigate(routes.TEST_NEW_INSTANCE, {test, test_case, title});
};

const onPressTestInstance = ({test_instance, navigation}) => {
  standardFunctions.add_firebase_event_log(
    'test',
    'button_select_test_clicked',
    {test_id: test_instance.test_id},
  );
  navigation.navigate(routes.TEST_INSTANCE_INFO, {test_instance});
};

const renderTestInstanceItem = ({item, navigation, view}) => {
  const new_created = item.instance_id === view.new_instance_id;
  switch (item.type) {
    case 'wayback':
      return (
        <TestInstanceWaybackItem
          onPressItem={() =>
            onPressTestInstance({test_instance: item, navigation})
          }
          test_instance={item}
          new_created={new_created}
        />
      );
    case 'clone':
      return (
        <TestInstanceCloneItem
          // disabled={!view.is_clone_available}
          onPressItem={() =>
            onPressTestInstance({test_instance: item, navigation})
          }
          style={{marginBottom: 10}}
          test_instance={item}
          new_created={new_created}
        />
      );
    case 'create':
      return (
        <TestInstanceCreateButton
          onPress={() => onPressCreateButton(navigation, item.view)}
        />
      );
    default:
      break;
  }
};

const InstanceMenuScreen = props => {
  const navigation = props.navigation;
  const {
    route: {params = {}},
  } = props;
  const {test_name, test_id} = params;
  const view = useInstanceMenuViewModel({test_name, test_id});
  const test_instances = view.getTestInstancesFiltered();
  const loaded = view.loaded;

  return (
    <SafeAreaView style={styles.safeContainer}>
      <CheckActiveSimulation componentName={'InstanceMenu'} />
      <StandardBoxWithComponent
        background_start_color={colors.TEST.START}
        background_finish_color={colors.TEST.FINISH}
        viewStyle={styles.headerBox}>
        <Text style={styles.headerBoxText}>{test_name}</Text>
        <Text style={styles.headerBoxSubText}>
          {strings.TEST.INSTANCE_MENU.BOX_SUBTITLE}
        </Text>
      </StandardBoxWithComponent>
      {!loaded && (
        <ActivityIndicator
          style={styles.loadingIcon}
          color={colors.THEFACULTY}
        />
      )}
      {loaded && (
        <FlatList
          contentContainerStyle={{
            paddingTop: 15,
            paddingBottom: 15,
            paddingHorizontal: 10,
          }}
          data={[...test_instances, {type: 'create', view}]}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item}) =>
            renderTestInstanceItem({
              item,
              navigation,
              view,
            })
          }
        />
      )}
    </SafeAreaView>
  );
};

InstanceMenuScreen.navigationOptions = ({navigation}) => ({
  title: strings.TEST.INSTANCE_MENU.TITLE,
});

export default InstanceMenuScreen;
