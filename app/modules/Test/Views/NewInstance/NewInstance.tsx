import React from "react";
import { FlatList, SafeAreaView, Text } from "react-native";
import { colors, strings } from "../../../../config";

import styles from "./NewInstance.style";
import { StandardBoxWithComponent } from "../../../../components";
import TestManager, { TestCase, TestCreateMode } from "../../ViewModels/_Common/TestManager";
import WaybackItem from "./Components/WaybackItem";
import SimulateButton from "./Components/SimulateButton";
import { routes } from "../../../../navigation/rootNavigation/navigation.constants";
import Test from "../../Models/Test";
import useNewInstanceViewModel from "../../ViewModels/NewInstance/NewInstanceViewModel";
import CheckActiveSimulation from "../../CommonComponents/CheckActiveSimulation";
import CreateCloneNotAvailablePullView from "./Components/CreateCloneNotAvailablePullView";
import CreateTestAlreadyBoughtPullView from "../InstanceDetail/Components/CreateTestAlreadyBoughtPullView";

const renderWaybackBlock = (test, test_case, item, navigation) => {
  const onPressWayback = props => {
    const itemType = item.objectType;
    let itemData = {};
    if (itemType === 'Wayback') {
      if (item.bought) {
        CreateTestAlreadyBoughtPullView().show();
        return;
      }
      itemData = {wayback: item, test};
      if (test_case === TestCase.NOT_FIRST) {
        TestManager.testCreateMode = TestCreateMode.M_3_3;
      }
      navigation.navigate(routes.TEST_INSTANCE_DETAIL, itemData);
    }
  };

  const onPressSimulate = () => {
    const itemData = {test};
    if (!test.is_clone_available) {
      CreateCloneNotAvailablePullView().show();
      return;
    }
    // standardFunctions.add_firebase_event_log("button_create_simulation_clicked", {"test_id": item.test_id});
    if (test_case === TestCase.NOT_FIRST) {
      TestManager.testCreateMode = TestCreateMode.M_3_2;
    }
    navigation.navigate(routes.TEST_INSTANCE_DETAIL, itemData);
  };

  if (item.objectType === 'Wayback') {
    return (
      <WaybackItem
        disabled={item.bought}
        wayback={item}
        onPressWayback={onPressWayback}
      />
    );
  } else if (item.objectType === 'Test') {
    const label =
      test_case === TestCase.FIRST
        ? strings.TEST.NEW_INSTANCE.SIMULAZIONE
        : strings.TEST.NEW_INSTANCE.NEW_SIMULAZIONE;
    return (
      <SimulateButton
        disabled={false}
        label={label}
        onPressSimulate={onPressSimulate}
        clone_price={item.clone_price}
      />
    );
  } else {
    console.log('Else case:\n' + item.constructor.name);
  }
};

const NewInstance = props => {
  const {navigation} = props;
  const view = useNewInstanceViewModel({props});
  const waybacks = view.waybacks;
  const major_name = view.major_name;
  const test_case = view.test_case;
  return (
    <SafeAreaView style={styles.container}>
      <CheckActiveSimulation componentName={'NewInstance'} />
      <StandardBoxWithComponent
        background_start_color={colors.TEST.START}
        background_finish_color={colors.TEST.FINISH}
        viewStyle={styles.headerBox}>
        {test_case === TestCase.FIRST && (
          <>
            <Text style={[styles.headerBoxText, styles.headerBoxText1]}>
              {major_name}
            </Text>
            <Text style={[styles.headerBoxText, styles.headerBoxText2]}>
              {strings.TEST.NEW_INSTANCE.BOX_SUBTITLE}
            </Text>
          </>
        )}
        {test_case === TestCase.NOT_FIRST && (
          <Text style={[styles.headerBoxText, styles.headerBoxText3]}>
            {strings.TEST.NEW_INSTANCE.BOX_TITLE}
          </Text>
        )}
      </StandardBoxWithComponent>
      <FlatList
        contentContainerStyle={styles.listContainer}
        keyExtractor={index => String(index)}
        data={[...waybacks, TestManager.test]}
        renderItem={({item}) =>
          renderWaybackBlock(view.test, test_case, item, navigation)
        }
      />
    </SafeAreaView>
  );
};

NewInstance.navigationOptions = ({navigation}) => ({
  title: navigation.getParam('title'),
});

export default NewInstance;
