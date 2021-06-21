import React from "react";
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { colors, strings } from "../../../../../config";

import useCoinsTabViewModel from "../../../ViewModels/Shop/CoinsTab/CoinsTabViewModel";
import CoinsPacketItem from "./Components/CoinsPacketItem";
import styles from "./CoinsTab.style";

const CoinsTab = props => {
  const view = useCoinsTabViewModel();

  const renderCoinsPacketItem = ({item}) => (
    <CoinsPacketItem
      disabled={view.is_buying}
      onPress={() => {
        view.onPressPacket(item.coins_packet_id);
      }}
      item={item}
      style={styles.coinsPacketItem}
    />
  );

  const refreshing = view.refreshing;
  const coins_packets = view.coins_packets;

  return (
    <>
      {view.dataLoadedWithData() && (
        <>
          <Text style={styles.desc}>{strings.WALLET.SHOP_COINS.DESC}</Text>
          <FlatList
            contentContainerStyle={styles.container}
            data={coins_packets}
            renderItem={renderCoinsPacketItem}
            keyExtractor={index => String(index)}
            initialNumToRender={100}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => view.onRefresh()}
              />
            }
          />
        </>
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
              refreshing={refreshing}
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
              {strings.WALLET.MAIN.DESC_ON_EMPTY}
            </Text>
          </View>
          <View />
        </ScrollView>
      )}
    </>
  );
};

export default CoinsTab;
