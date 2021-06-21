import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import ActionSheet from "react-native-action-sheet";

import styles from "./BattleScreen.style";
import { colors, strings } from "../../config";
import standardFunctions from "../../utils/app/StandardFunctions";
import { routes } from "../../navigation/rootNavigation/navigation.constants";
import BestOfManager from "./Models/BestOfManager";

import BattleResultComponent from "./_Components/BattleResultComponent";
import BattlePlayComponent from "./_Components/BattlePlayComponent";
import PushNotification from "../../utils/app/PushNotification";
import InAppActionPopoverView from "../../components/InAppActionPopover";
import { refreshTotalCoins } from "../Home/HomeScreen";
import { loadCouponList, loadObtainedCouponList } from "../Benefits/_ReduxStore/_actions";
import { store } from "../../config/redux/store";

const BattleScreen = props => {
  const navigation = useNavigation();
  const bestof_id = props.navigation.getParam('bestof_id');
  let didCallFocus = false;

  const [dispData, setDispData] = useState({
    bestOf: null,
    total_coins: 0,
    max_coins: 1,
    obtained_coins: -1,
  });

  const didFocus = () => {
    didCallFocus = true;
    const loadBestOf = async () => {
      setDispData({...dispData.bestOf, bestOf: null});
      const loadedBestOf = await BestOfManager.initById(bestof_id);
      if (loadedBestOf) {
        const bestOf = BestOfManager.getBestOf();

        if (bestOf.isAllRoundCompleted() || bestOf.isRejected()) {
          navigation.setParams({bestOfIsClosed: true});
          const {total_coins, max_coins, obtained_coins} =
            await BestOfManager.getCoinsInformation(bestof_id);
          await store.dispatch(loadCouponList());
          await store.dispatch(loadObtainedCouponList());
          await refreshTotalCoins();

          const from_already_finished_bestofs = props.navigation.getParam(
            'is_from_old_bestofs',
          );
          if (obtained_coins === 0 && !from_already_finished_bestofs) {
            await InAppActionPopoverView().show({
              navigation,
              title: strings.BESTOF.BATTLE_SCREEN.MAX_COINS_OBTAINED_TITLE,
              description:
                strings.BESTOF.BATTLE_SCREEN.MAX_COINS_OBTAINED_MESSAGE,
              action_title: '',
              action: '',
              actionFunction: undefined,
              negativeLabel: strings.OTHER.OK,
            });
          }
          setDispData({bestOf, total_coins, max_coins, obtained_coins});
        } else {
          setDispData({...dispData.bestOf, bestOf});
        }
      } else {
        await standardFunctions.show_alert_async(
          strings.BESTOF.BATTLE_SCREEN.TITLE,
          strings.BESTOF.BATTLE_SCREEN.ERROR_WHILE_GETTING_INFO,
        );
        navigation.navigate(routes.BESTOF_ONGOING);
      }
    };
    loadBestOf();
  };
  const didBlur = event => {
    setDispData({...dispData.bestOf, bestOf: null});
  };

  const componentDidMount = () => {
    navigation.addListener('focus', didFocus);
    navigation.addListener('blur', didBlur);
    setTimeout(() => {
      if (!didCallFocus) didFocus();
    }, 500);

    const messageUnsubscribe = PushNotification.registerOnMessageListener(
      message => {
        if (message.data && message.data.bestof_id === bestof_id) {
          didFocus();
        }
      },
    );
    const componentWillUnmount = () => {
      messageUnsubscribe();
    };
    return componentWillUnmount;
  };
  useEffect(componentDidMount, []);

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      {dispData.bestOf ? (
        dispData.bestOf.isAllRoundCompleted() ||
        dispData.bestOf.auto_terminated ||
        dispData.bestOf.isRejected() ? (
          <BattleResultComponent
            total_coins={dispData.total_coins}
            max_coins={dispData.max_coins}
            obtained_coins={
              dispData.obtained_coins === -1 ? 0 : dispData.obtained_coins
            }
            bestOf={dispData.bestOf}
            navigation={navigation}
          />
        ) : (
          <BattlePlayComponent
            bestOf={dispData.bestOf}
            navigation={navigation}
          />
        )
      ) : (
        <View style={styles.container}>
          <ActivityIndicator size="small" />
        </View>
      )}
    </SafeAreaView>
  );
};

const TopBarRightButton = props => {
  const bestof_id = props.navigation.getParam('bestof_id');
  const bestOfIsClosed = props.navigation.getParam('bestOfIsClosed');

  const rejectBestOf = async () => {
    await BestOfManager.rejecthBestOf(bestof_id);
    props.navigation.goBack(null);
  };
  const topBarRightButtonPressHandler = () => {
    ActionSheet.showActionSheetWithOptions(
      {
        options: [
          strings.BESTOF.BATTLE_SCREEN.REJECT_BUTTON,
          strings.OTHER.CANCEL,
        ],
        cancelButtonIndex: 1,
        tintColor: colors.THEFACULTY,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          rejectBestOf();
        }
      },
    );
  };

  return bestOfIsClosed === true ? null : (
    <TouchableOpacity
      onPress={topBarRightButtonPressHandler}
      style={styles.topBarRightButton}>
      <FastImage
        style={styles.topBarRightButtonImage}
        source={require('../../../assets/images/icons/icn_filter.png')}
      />
    </TouchableOpacity>
  );
};
BattleScreen.navigationOptions = navData => {
  return {
    title: strings.BESTOF.BATTLE_SCREEN.TITLE,
    headerRight: <TopBarRightButton navigation={navData.navigation} />,
  };
};

export default BattleScreen;
