import React, { useEffect, useState } from "react";
import { strings } from "../../../../config";
import { ActivityIndicator, FlatList, SafeAreaView, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import TransactionItem from "./_Components/TransactionItem";
import WalletMainHeaderBox from "./_Components/MainHeaderBox";

import styles from "./Main.style";
import { Observable } from "../../../_CommonModels/ViewModelBase";
import CoinsTransactionsManager from "../../Models/CoinsTransactionsManager";
import { CallServer } from "../../../../utils/app/CallServer";

const renderTransactionItem = ({item}) => <TransactionItem item={item} />;

const WalletMain = props => {
  const total_coins = Observable.getReduxValue('total_coins');

  const [coinsTransactions, setCoinsTransactions] = useState([]);
  const [nextCoinsResetDate, setNextCoinsResetDate] = useState('');
  const [loading, setLoading] = useState(false);

  const componentDidMount = () => {
    const loadCoinsTransactions = async () => {
      CoinsTransactionsManager.initialize();
      CallServer.get_next_coins_reset_date(result => {
        setNextCoinsResetDate(result.data);
      });
      loadData(CoinsTransactionsManager, false);
    };
    loadCoinsTransactions();
    const componentWillUnMount = () => {};
    return componentWillUnMount;
  };

  const loadData = async (loaderFn: any, loadMore: boolean = false) => {
    try {
      if (!loadMore) {
        setCoinsTransactions([]);
        setLoading(true);
      }

      const result = await loaderFn.exec(loadMore);
      setLoading(false);
      if (result === true) {
        const usedCoupons = CoinsTransactionsManager.getCoinsTransactions();
        setCoinsTransactions(usedCoupons);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const loadMore = () => {
    loadData(CoinsTransactionsManager, true);
  };

  useEffect(componentDidMount, []);

  return (
    <SafeAreaView style={styles.container}>
      <WalletMainHeaderBox
        total_coins={total_coins}
        next_coins_reset_date={nextCoinsResetDate}
      />
      <View style={styles.subContainer}>
        <FlatList
          data={coinsTransactions}
          removeClippedSubviews={false}
          renderItem={renderTransactionItem}
          ListFooterComponent={loading ? FooterComponent : null}
          keyExtractor={(item, index) => String(index)}
          onEndReachedThreshold={0.01}
          initialNumToRender={20}
          onScrollBeginDrag={() => {
            setLoading(true);
          }}
          onMomentumScrollEnd={event => {
            const y = event.nativeEvent.contentOffset.y;
            const height = event.nativeEvent.layoutMeasurement.height;
            const contentHeight = event.nativeEvent.contentSize.height;
            if (contentHeight - (y + height) === 0) {
              setLoading(true);
              loadMore();
            }
            setLoading(false);
          }}
          ListEmptyComponent={
            !loading && (
              <View style={styles.emptyContainer}>
                <FastImage
                  resizeMode={'contain'}
                  source={require('../../../../../assets/images/icons/icn_three_new_tf_coins.png')}
                  style={styles.emptyCoinsImage}
                />
                <Text style={styles.emptyDesc}>
                  {strings.WALLET.MAIN.DESC_ON_EMPTY}
                </Text>
              </View>
            )
          }
        />
        <View />
      </View>
    </SafeAreaView>
  );
};

const FooterComponent = props => {
  return (
    <View style={styles.footerContainer}>
      <ActivityIndicator size="small" />
    </View>
  );
};

WalletMain.navigationOptions = ({navigation}) => ({
  title: strings.WALLET.MAIN.TITLE,
});

export default WalletMain;
