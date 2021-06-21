import React from "react";

import styles from "./Shop.style";
import { strings } from "../../../../config";

import CurvedTabView, { Route } from "../../../../components/CurvedTabView";
import CoinsTab from "./CoinsTab";
import HistoryTab from "./HistoryTab";
import { SafeAreaView } from "react-native";
import colors from "../../../../config/colors";

const Shop = props => {
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.safeContainer}>
      <CurvedTabView
        background_start_color={colors.GENERAL.START}
        background_finish_color={colors.GENERAL.FINISH}
        style={styles.container}>
        <Route
          navigation={navigation}
          title={strings.WALLET.SHOP.COINS_TAB_TITLE}
          scene={CoinsTab}
        />
        <Route
          title={strings.WALLET.SHOP.HISTORY_TAB_TITLE}
          scene={HistoryTab}
        />
      </CurvedTabView>
    </SafeAreaView>
  );
};

Shop.navigationOptions = ({navigation}) => ({
  title: strings.WALLET.SHOP.TITLE,
});

export default Shop;
