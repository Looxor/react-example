import React from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from "react-native";

import { colors, strings } from "../../../../config";
import styles from "./InstanceDetail.style";
import { Button } from "../../../../components";

import HeaderBox from "./Components/HeaderBox";
import TitleBox from "./Components/TitleBox";
import DescriptionBox from "./Components/DescriptionBox";
import BlocksList from "./Components/BlocksList";
import useInstanceDetailViewModel from "../../ViewModels/InstanceDetail/InstanceDetailViewModel";
import TestManager, { TestCase, TestCreateMode } from "../../ViewModels/_Common/TestManager";
import FastImage from "react-native-fast-image";
import InfoBoxWayback from "../InstanceInfo/Components/InfoBoxWayback";
import InfoBoxCloneBlock from "../InstanceInfo/Components/InfoBoxCloneBlock";
import CreateConfirmPullView from "./Components/CreateConfirmPullView";
import CheckActiveSimulation from "../../CommonComponents/CheckActiveSimulation";
import standardFunctions from "../../../../utils/app/StandardFunctions";
import { routes } from "../../../../navigation/rootNavigation/navigation.constants";

const openConfirmPullView = props => {
  CreateConfirmPullView(props).show();
};

const InstanceDetailScreen = props => {
  const {navigation} = props;
  const view = useInstanceDetailViewModel({props});
  const onConfirmCreateFromPullView = () => {
    view.onPressCreateButton(navigation, view.type, view.test_name);
  };

  const onGotoStoreFromPullView = () => {
    // console.log('onGotoStoreFromPullView');
    navigation.navigate(routes.BESTOF);
  };
  const pressCreateButtonHandler = () => {
    standardFunctions.add_firebase_event_log(
      'test',
      'btn_srt_simulation_clicked',
      {test_id: view.test_id},
    );
    if (false && view.test_case === TestCase.FIRST) {
      if (view.enough)
        view.onPressCreateButton(navigation, view.type, view.test_name);
      else onGotoStoreFromPullView();
    } else {
      const test_name = view.test_name;
      const enough = view.enough;
      const price = view.price;

      if (price !== '0') {
        openConfirmPullView({
          enough,
          test_name,
          price,
          onConfirmCreate: onConfirmCreateFromPullView,
          onGotoStore: onGotoStoreFromPullView,
        });
      } else {
        onConfirmCreateFromPullView();
      }
    }
  };
  const createMode = TestManager.testCreateMode;
  return (
    <SafeAreaView style={styles.safeContainer}>
      <CheckActiveSimulation componentName={'InstanceDetail'} />
      <ScrollView style={styles.container}>
        {createMode === TestCreateMode.M_2_4 && (
          <HeaderBox text={strings.TEST.INSTANCE_DETAIL.BOX_TITLE_2_4} />
        )}
        {createMode === TestCreateMode.M_3_2 && (
          <HeaderBox text={strings.TEST.INSTANCE_DETAIL.BOX_TITLE_3_2} />
        )}
        {createMode === TestCreateMode.M_3_3 && (
          <HeaderBox text={strings.TEST.INSTANCE_DETAIL.BOX_TITLE_3_3} />
        )}
        {view.wayback ? <InfoBoxWayback /> : <InfoBoxCloneBlock />}
        <TitleBox
          title={view.title}
          universityMajorName={view.university_major_name}
        />
        {view.test_case === TestCase.NOT_FIRST ? (
          <View style={styles.priceContainer}>
            <FastImage
              style={styles.priceImage}
              source={require('../../../../../assets/images/icons/icn_coins_white.png')}
            />
            <Text style={styles.priceValueText}>
              {view.price} {strings.TEST.NEW_INSTANCE.POINT}
            </Text>
          </View>
        ) : (
          <View style={styles.horizontalLine} />
        )}
        <DescriptionBox minutes={view.desc_minutes} notes={view.notes} />
        <BlocksList blocks={view.blocksListData} />
        <Button
          onPress={pressCreateButtonHandler}
          style={styles.createButton}
          disabled={view.onCreating()}>
          {view.onCreating() ? (
            <ActivityIndicator color={colors.WHITE} />
          ) : (
            strings.TEST.INSTANCE_DETAIL.CREATE_BUTTON
          )}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

InstanceDetailScreen.navigationOptions = ({navigation}) => ({
  title: strings.TEST.INSTANCE_DETAIL.TITLE,
});

export default InstanceDetailScreen;
