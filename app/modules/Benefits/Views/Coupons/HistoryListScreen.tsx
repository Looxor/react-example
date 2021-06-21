import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";
import styles from "./HistoryListScreen.style";
import { strings } from "../../../../config";
import Coupon from "../../_Models/Coupon";
import { useNavigation } from "@react-navigation/native";
import HistoryItem from "../../_Components/HistoryItem";
import UsedCouponsManager from "../../_Models/UsedCouponsManager";

const renderItem = ({item, index}, navigation) => {
  const coupon = new Coupon(item);
  return <HistoryItem coupon={coupon} />;
};

const HistoryListScreen = props => {
  const navigation = useNavigation();
  const [usedCoupons, setUsedCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const componentDidMount = () => {
    const loadUsedCoupons = async () => {
      UsedCouponsManager.initialize();
      loadData(UsedCouponsManager, false);
    };
    loadUsedCoupons();
    const componentWillUnMount = () => {};
    return componentWillUnMount;
  };

  const loadData = async (loaderFn: any, loadMore: boolean = false) => {
    try {
      if (!loadMore) {
        setUsedCoupons([]);
        setLoading(true);
      }

      const result = await loaderFn.exec(loadMore);
      setLoading(false);
      if (result === true) {
        const usedCoupons = UsedCouponsManager.getUsedCoupons();
        setUsedCoupons(usedCoupons);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const loadMore = () => {
    loadData(UsedCouponsManager, true);
  };

  useEffect(componentDidMount, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={usedCoupons}
        removeClippedSubviews={false}
        renderItem={({item, index}) => renderItem({item, index}, navigation)}
        ListFooterComponent={loading ? FooterComponent : null}
        keyExtractor={(item, index) => item.coupon_id}
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
      />
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

HistoryListScreen.navigationOptions = ({navigation}) => ({
  title: strings.COUPONS.HISTORY_SCREEN.TITLE,
});

export default HistoryListScreen;
