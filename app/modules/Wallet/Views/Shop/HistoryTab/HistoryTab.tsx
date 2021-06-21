import React from "react";
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, Text, View } from "react-native";
import FastImage from "react-native-fast-image";

import { colors, strings } from "../../../../../config";
import useHistoryTabViewModel from "../../../ViewModels/Shop/HistoryTab/HistoryTabViewModel";
import PurchaseTransactionItem from "./Components/PurchaseTransactionItem";
import styles from "./HistoryTab.style";
import { Button } from "../../../../../components";

const renderPurchaseTransactionItem = ({item}) => {
  return (
    <PurchaseTransactionItem
      purchaseTransactionItem={item}
      style={styles.purchaseTransactionItem}
    />
  );
};

const HistoryTab = props => {
  const view = useHistoryTabViewModel();
  const purchase_transactions = view.purchase_transactions;
  // const purchase_transactions = [];
  const getCoinsPressHandler = () => {
    props.jumpTo(0);
  };

  return (
    <>
      {view.dataLoadedWithData() && (
        <FlatList
          contentContainerStyle={styles.container}
          data={purchase_transactions}
          renderItem={renderPurchaseTransactionItem}
          keyExtractor={index => String(index)}
          refreshControl={
            <RefreshControl
              refreshing={view.refreshing}
              onRefresh={() => view.onRefresh()}
            />
          }
        />
      )}
      {view.loading && (
        <ActivityIndicator
          style={styles.loadingIcon}
          color={colors.THEFACULTY}
        />
      )}
      {view.dataLoadedWithoutData() && (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={view.refreshing}
              onRefresh={() => view.onRefresh()}
            />
          }
          contentContainerStyle={styles.emptyContainer}>
          <View>
            <FastImage
              style={styles.emptyLogo}
              source={require('../../../../../../assets/images/icons/icn_coins.png')}
            />
            <Text style={styles.emptyDescription}>
              {strings.WALLET.SHOP_HISTORY.DESC_ON_EMPTY}
            </Text>
            <Button
              onPress={getCoinsPressHandler}
              style={styles.getCoinsButton}
              textStyle={styles.getCoinsButtonText}>
              {strings.WALLET.SHOP_HISTORY.GET_COINS}
            </Button>
          </View>
          <View />
        </ScrollView>
      )}
    </>
  );
};
export default React.memo(HistoryTab);
