import React from "react";

import styles from "./Home.style";
import { colors, strings } from "../../../../config";

import CurvedTabView, { Route } from "../../../../components/CurvedTabView";
import TestTab from "./TestTab";
import AllenamentoTab from "./AllenamentoTab";
import CheckActiveSimulation from "../../CommonComponents/CheckActiveSimulation";

const TestHome = props => {
  const {navigation} = props;
  return (
    <>
      <CheckActiveSimulation componentName={'TestHome'} />
      <CurvedTabView
        background_start_color={colors.TEST.START}
        background_finish_color={colors.TEST.FINISH}
        style={styles.container}>
        <Route
          navigation={navigation}
          title={strings.TEST.HOME.SUB_TITLE_TEST}
          scene={TestTab}
        />
        <Route
          title={strings.TEST.HOME.SUB_TITLE_ALLENAMENTO}
          scene={AllenamentoTab}
        />
      </CurvedTabView>
    </>
  );
};

TestHome.navigationOptions = ({navigation}) => ({
  title: strings.TEST.HOME.TITLE,
});

export default TestHome;
