import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

import { strings } from "../../../../config";
import { Button } from "../../../../components";
import DescriptionBox from "../InstanceDetail/Components/DescriptionBox";
import HeaderBox from "./Components/HeaderBox";
import InfoBoxWayback from "./Components/InfoBoxWayback";
import InfoBoxCloneBlock from "./Components/InfoBoxCloneBlock";
import TitleBox from "../InstanceDetail/Components/TitleBox";
import BlocksList from "../InstanceDetail/Components/BlocksList";
import useInstanceInfoViewModel from "../../ViewModels/InstanceInfo/InstanceInfoViewModel";
import styles from "./InstanceInfo.style";
import CheckActiveSimulation from "../../CommonComponents/CheckActiveSimulation";
import standardFunctions from "../../../../utils/app/StandardFunctions";

const InstanceInfoScreen = props => {
  const {
    navigation,
    route: {params = {}},
  } = props;
  const test_instance = params['test_instance'];
  const view = useInstanceInfoViewModel({test_instance});

  const pressContinueButtonHandler = navigation => {
    standardFunctions.add_firebase_event_log(
      'test',
      'btn_crt_instance_clicked',
      {test_id: test_instance.test_id},
    );
    view.onPressContinueButton(navigation);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <CheckActiveSimulation componentName={'InstanceInfo'} />
      <ScrollView style={styles.container}>
        <HeaderBox />
        {view.type === 'wayback' ? <InfoBoxWayback /> : <InfoBoxCloneBlock />}
        {
          <TitleBox
            title={view.title}
            universityMajorName={view.university_major_name}
          />
        }
        <View style={styles.horizontalLine} />
        <DescriptionBox minutes={view.desc_minutes} notes={view.desc_notes} />
        <BlocksList blocks={view.blocksListData} />
        <Button
          onPress={() => pressContinueButtonHandler(navigation)}
          style={styles.continueButton}>
          {strings.TEST.INSTANCE_INFO.CONTINUE_BUTTON}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

InstanceInfoScreen.navigationOptions = ({navigation}) => ({
  title: strings.TEST.INSTANCE_INFO.TITLE,
});

export default InstanceInfoScreen;
