import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { colors, strings } from "../../../../config";

import styles from "./ActiveInstance.style";
import { Button, StandardBoxWithComponent } from "../../../../components";
import useActiveInstanceViewModel from "../../ViewModels/ActiveInstance/ActiveInstanceViewModel";
import Strings from "../../../../utils/misc/TextComponents";
import ConfirmPullView from "./Components/ConfirmPullView";
import TestInstanceManager from "../../ViewModels/_Common/TestInstanceManager";

const ActiveInstance = props => {
  const {navigation} = props;
  const simulation_id =
    navigation.getParam('simulation_id') ||
    TestInstanceManager.getData('simulation_id');
  const onTerminate = navigation.getParam('onTerminate');
  const view = useActiveInstanceViewModel({simulation_id});
  view.setNavigation(navigation);

  let button_terminate_disabled = !simulation_id || simulation_id.length === 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StandardBoxWithComponent
          background_start_color={colors.TEST.START}
          background_finish_color={colors.TEST.FINISH}
          viewStyle={styles.headerBox}>
          {/*<FastImage
                        style={styles.headerBoxImage}
                        source={require('../../../../../assets/images/icons/icn_pc.png')}
                        />*/}
          <Text style={styles.headerBoxText}>
            {strings.TEST.ACTIVE_INSTANCE.BOX_TITLE}
          </Text>
          <Text style={styles.headerBoxText2}>
            {strings.TEST.ACTIVE_INSTANCE.BOX_SUBTITLE}
          </Text>
        </StandardBoxWithComponent>
        <View style={styles.descContainer}>
          <Text style={styles.descContent}>
            {Strings.makeBold(strings.TEST.ACTIVE_INSTANCE.DESC_CONTENT)}
          </Text>
          <Text style={styles.descContent2}>
            {Strings.makeBold(strings.TEST.ACTIVE_INSTANCE.DESC_CONTENT2)}
          </Text>
        </View>
        <Button
          disabled={button_terminate_disabled}
          onPress={() =>
            ConfirmPullView({navigation}).show(simulation_id, onTerminate)
          }
          style={[{backgroundColor: 'transparent'}, styles.terminateButton]}>
          <Text
            style={[
              styles.linkButton,
              button_terminate_disabled ? {color: 'gray'} : {},
            ]}>
            {strings.TEST.ACTIVE_INSTANCE.TERMINATE_BUTTON}
          </Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

ActiveInstance.navigationOptions = ({navigation}) => ({
  title: strings.TEST.ACTIVE_INSTANCE.TITLE,
});

export default ActiveInstance;
