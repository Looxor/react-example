// Libraries //
import React, { useEffect, useState } from "react";
import { Linking, SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import dynamicLinks from '@react-native-firebase/dynamic-links';

import { useNavigation } from "@react-navigation/native";
import CarrierInfo from "react-native-carrier-info";
// Configs //
import { routes } from "../../navigation/rootNavigation/navigation.constants";
import { styles } from "./HomeScreen.style";
import { CallServer, CallServerPromise } from "../../utils/app/CallServer";
import HomeCarousel from "./_Components/HomeCarousel";
import HomeBoxWithImage from "./_Components/HomeBoxWithImage";
import HomeBoxWithoutImage from "./_Components/HomeBoxWithoutImage";
import { colors, strings } from "../../config";

import EventCenter, { EV_START_ANIM_INTERVAL, EV_STOP_ANIM_INTERVAL } from "../../utils/misc/EventCenter";
import CheckPullView from "./_Components/CheckPullView";
import { Observable } from "../_CommonModels/ViewModelBase";
import standardFunctions from "../../utils/app/StandardFunctions";
import PushNotification, { gotoEndedResultScreenWithSimulationId } from "../../utils/app/PushNotification";
import { hideSimulationStatus } from "../Test/ViewModels/CheckActiveSimulation/CheckActiveSimulation";
import NavigationService from "../../utils/app/NavigationService";
import SimulationPolling from "../Test/CommonFunctions/SimulationPolling";
import OnboardingCarouselPopover from "../../components/OnboardingCarousel";
// import GetLocation from 'react-native-get-location'
import { store } from "../../config/redux/store";
import { loadCouponList } from "../Benefits/_ReduxStore/_actions";
import { UserData } from "../../config/constants";
import TermsToUpdatePopover from "./_Components/TermsToUpdatePopover";
import InAppActionPopoverView from "../../components/InAppActionPopover";
import InAppActionPopover from "../../components/InAppActionPopover";

const HomeScreen = props => {
  let unsubscribeSimulationNotif;
  const navigation = useNavigation();
  const [homeState, setHomeState] = useState({
    carousel: Observable.getReduxValue('homepage_carousel') || [], //CacheManager.get('carousel') || [],
    homepage_blocks: Observable.getReduxValue('homepage_blocks') || [],
  });

  const [didFocused, setDidFocused] = useState(false);

  const handleDynamicLink = link => {
    console.log("LINK: ", link);
    if (link.url && link.url.includes('#APP#')) {
      var temp_url = link.url.substring(
          link.url.indexOf('#APP#'),
          link.url.indexOf('&'),
      );
      let in_app_url = temp_url.split('%23').join('#').substring(1);
      if (in_app_url) {
        standardFunctions.open_inapp_action(navigation, in_app_url);
      }
    }
  };

  const componentDidMount = () => {
    try {
      CarrierInfo.carrierName()
        .then(result_carrier_name => {
          CallServer.update_phone_carrier_name(
            result_carrier_name,
            result_api => {},
          );
        })
        .catch(error => {
          console.log('error on getting carrierName', error);
        });
    } catch (e) {}

    try {
      PushNotification.registerDeviceToken();
    } catch (e) {}

    let onboarding_already_showed = Observable.getReduxValue(
      'user_' +
        UserData.getUserData().user_id +
        '_home_screen_onboarding_showed',
    );
    OnboardingCarouselPopover().show({screen: 'home_screen'});

    /*
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
        .then(location => {
          console.log(location);
        })
        .catch(error => {
          const { code, message } = error;
          console.warn(code, message);
        });
     */

    setTimeout(() => {
      navigation.addListener('blur', () => {
        EventCenter.trigger(EV_STOP_ANIM_INTERVAL);
        // setDidFocused(false);
      });

      navigation.addListener('focus', () => {
        EventCenter.trigger(EV_START_ANIM_INTERVAL);
        // setDidFocused(true);
      });
    }, 500);

    let carousel = Observable.getReduxValue('homepage_carousel') || []; //CacheManager.get('carousel') || [];
    let homepage_blocks = Observable.getReduxValue('homepage_blocks') || []; //CacheManager.get('homepage_blocks') || [];

    const allSet = () => {
      setHomeState({
        carousel,
        homepage_blocks,
      });
    };

    CallServer.get_carousel(result => {
      carousel = result.data;
      Observable.setReduxValue('homepage_carousel', result.data);
      allSet();
    });

    try {
      CallServer.get_homepage_blocks(result => {
        homepage_blocks = result.data;
        Observable.setReduxValue('homepage_blocks', result.data);
        allSet();
      });
    } catch (e) {}

    CallServer.is_legal_check_update_required(result => {
      let is_update_required = result.data.is_update_required;
      if (is_update_required) {
        TermsToUpdatePopover().show({navigation});
      }
    });

    /*
    CallServer.get_next_coins_reset_date(async result => {
      let expiring_popup_showed = Observable.getReduxValue("expiring_date_" + result.data + "_popup_showed_" + UserData.getUserData().user_id) || false;
      await refreshTotalCoins();
      const userTotalCoins = Observable.getReduxValue('total_coins');

      var msDiff = new Date(result.data).getTime() - new Date().getTime();
      var remainingDays = Math.floor(msDiff / (1000 * 60 * 60 * 24));

      if(!expiring_popup_showed && remainingDays <= 7 && userTotalCoins > 0) {
        CoinsExpiringPopover().show({navigation, expiring_date: standardFunctions.convert_date_from_rfc_to_string(result.data)});
        Observable.setReduxValue("expiring_date_" + result.data + "_popup_showed_" + UserData.getUserData().user_id, true);
      }
    });
    */

    if (onboarding_already_showed) {
      CallServer.get_popups(async result => {
        if (result.success) {
          result.data.forEach(popupData => {
            InAppActionPopoverView().show({
              navigation,
              title: popupData.title,
              description: popupData.text,
              icon: popupData.image_url ? {uri: popupData.image_url} : null,
              action_title: popupData.button_text ? popupData.button_text : '',
              action: popupData.redirect_url ? popupData.redirect_url : '',
              negativeActionFunction: () => {},
            });
          });
        }
      });
    }

    refreshTotalCoins();

    setDidFocused(true);

    const checkInitialLink = async () => {
      const initialLink = await dynamicLinks().getInitialLink();
      if(initialLink) {
        handleDynamicLink(initialLink);
      }
    }

    checkInitialLink();
    const unsubscribeFromDynamicLinks = dynamicLinks().onLink(handleDynamicLink);
    const componentWillUnmount = () => {
      navigation.removeListener('focus', () => null);
      navigation.removeListener('blur', () => null);
      unsubscribeFromDynamicLinks && unsubscribeFromDynamicLinks();
      unsubscribeSimulationNotif && unsubscribeSimulationNotif();
    };

    unsubscribeSimulationNotif = PushNotification.registerOnMessageListener(
      whenArrivedSimulationMessage,
    );

    checkPushNotification();
    // resumeStartedSimulation();

    standardFunctions.add_firebase_event_log('home', 'home_screen_opened');

    return componentWillUnmount;
  };

  useEffect(componentDidMount, []);

  const checkPushNotification = async () => {
    const notification_message = Observable.getReduxValue(
      'notification_message',
    );
    if (
      notification_message &&
      notification_message.data &&
      (notification_message.data.type === 'insert_simulation_results' ||
        notification_message.data.type === 'check_simulation_auto_terminate' ||
        notification_message.data.type === 'force_terminate_simulation')
    ) {
      const activeRouteName = NavigationService.getActiveRouteName();
      if (activeRouteName !== routes.TEST_RESULT_DETAIL) {
        await hideSimulationStatus();
        await gotoEndedResultScreenWithSimulationId(
          notification_message.data.simulation_id,
        );
        SimulationPolling.stop();
      }
      await Observable.setReduxValue('notification_message', '');
    }
  };

  const whenArrivedSimulationMessage = async message => {
    if (message && message.data) {
      const {
        data: {event, simulation_id},
      } = message;
      if (
        event === 'insert_simulation_results' ||
        event === 'check_simulation_auto_terminate' ||
        event === 'force_terminate_simulation'
      ) {
        await hideSimulationStatus();
        await gotoEndedResultScreenWithSimulationId(simulation_id);
        await Observable.setReduxValue('notification_message', '');
        SimulationPolling.stop();
      }
      if (event === 'confirm_student_account_email') {
        refreshUserData();
        store.dispatch(loadCouponList());
      }
    }
  };

  const refreshUserData = async () => {
    try {
      const request = await CallServerPromise.get_user_data();
      if (request.success && request.data) {
        await UserData.setUserData(request.data);
        return true;
      }
    } catch (e) {
      return false;
    }
  };

  return (
    <SafeAreaView testID={'HomeScreenContainer'} style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
        <HomeCarousel
          navigation={navigation}
          data={homeState.carousel}
          onPress={() => {}}
        />
        {Array.isArray(homeState.homepage_blocks) &&
          homeState.homepage_blocks !== undefined &&
          homeState.homepage_blocks.map((homepage_block, index) => {
            return homepage_block.image_url !== undefined ? (
              <HomeBoxWithImage
                key={String(index)}
                box_title={homepage_block.title}
                box_text={homepage_block.text}
                images={[homepage_block.image_url]}
                title_color={
                  homepage_block.title_color
                    ? homepage_block.title_color
                    : homepage_block.background_color
                    ? colors.WHITE
                    : colors.THEFACULTY
                }
                text_color={
                  homepage_block.text_color
                    ? homepage_block.text_color
                    : homepage_block.background_color
                    ? colors.WHITE
                    : colors.THEFACULTY
                }
                background_start_color={
                  homepage_block.background_color
                    ? homepage_block.background_color
                    : colors.WHITE
                }
                background_finish_color={
                  homepage_block.background_color
                    ? homepage_block.background_color
                    : colors.WHITE
                }
                border_color={
                  homepage_block.border_color ? homepage_block.border_color : ''
                }
                border_width={homepage_block.border_color ? 1.5 : 0}
                white_indicator={
                  homepage_block.background_color !== undefined &&
                  homepage_block.background_color !== '#ffffff'
                }
                onPress={() => {
                  standardFunctions.add_firebase_event_log(
                    'home',
                    'card_clicked',
                    {
                      block_id: homepage_block._id,
                      redirect_url: homepage_block.redirect_url,
                    },
                  );
                  standardFunctions.play_tap_sound();
                  // homepage_block.redirect_url = 'APP#COUPONS#GENERAL#All';
                  // homepage_block.redirect_url = 'APP#COUPONS#SAFE#All';
                  // homepage_block.redirect_url = 'APP#COUPONS#5db9834406f54b6a74780021';
                  // props.route = {
                  //   params: {
                  //     ...props.route.params,
                  //     carousel_data: {
                  //       page_title: 'page_title'
                  //     }
                  //   }
                  // }
                  // homepage_block.redirect_url = 'APP#BESTOF#GENERAL';
                  // homepage_block.redirect_url = 'APP#FRIENDS#GENERAL';
                  // homepage_block.redirect_url = 'APP#SETTINGS#GENERAL';
                  // homepage_block.redirect_url = 'APP#TEST#GENERAL';
                  // homepage_block.redirect_url = 'APP#COINS#GENERAL';
                  // homepage_block.redirect_url = 'APP#REFERRAL_CODE#GENERAL';
                  // homepage_block.redirect_url = 'APP#PROFILE#GENERAL';
                  // homepage_block.redirect_url = 'APP#PROFILE#VERIFY_STUDENT';
                  // homepage_block.redirect_url = 'APP#BROWSER#https://google.com/';
                  // console.log('homepage_block.redirect_url', homepage_block.redirect_url);
                  if (homepage_block.redirect_url) {
                    standardFunctions.open_inapp_action(
                      navigation,
                      homepage_block.redirect_url,
                      props,
                    );
                  }
                }}
              />
            ) : (
              <HomeBoxWithoutImage
                box_title={homepage_block.title}
                box_text={homepage_block.text}
                key={String(index)}
                title_color={
                  homepage_block.title_color
                    ? homepage_block.title_color
                    : homepage_block.background_color
                    ? colors.WHITE
                    : colors.THEFACULTY
                }
                text_color={
                  homepage_block.text_color
                    ? homepage_block.text_color
                    : homepage_block.background_color
                    ? colors.WHITE
                    : colors.THEFACULTY
                }
                background_start_color={
                  homepage_block.background_color
                    ? homepage_block.background_color
                    : colors.WHITE
                }
                background_finish_color={
                  homepage_block.background_color
                    ? homepage_block.background_color
                    : colors.WHITE
                }
                border_color={
                  homepage_block.border_color ? homepage_block.border_color : ''
                }
                border_width={homepage_block.border_color ? 1.5 : 0}
                white_indicator={
                  homepage_block.background_color !== undefined &&
                  homepage_block.background_color !== '#ffffff'
                }
                onPress={() => {
                  standardFunctions.add_firebase_event_log(
                    'home',
                    'card_clicked',
                    {
                      block_id: homepage_block._id,
                      redirect_url: homepage_block.redirect_url,
                    },
                  );
                  standardFunctions.play_tap_sound();
                  if (homepage_block.redirect_url) {
                    standardFunctions.open_inapp_action(
                      navigation,
                      homepage_block.redirect_url,
                      props,
                    );
                  }
                }}
              />
            );
          })}
        <View style={{height: 15}} />
      </ScrollView>
      {didFocused && <CheckPullView navigation={props.navigation} />}
    </SafeAreaView>
  );
};

HomeScreen.navigationOptions = {
  headerStyle: {
    paddingTop: 14,
  },
};

export const refreshTotalCoins = async () => {
  try {
    let currentTotalCoins = Observable.getReduxValue('total_coins');
    currentTotalCoins =
      typeof currentTotalCoins !== 'object' && currentTotalCoins
        ? currentTotalCoins
        : 0;

    const request = await CallServerPromise.get_user_total_coins();
    if (request && request.success && request.data) {
      const {total_coins} = request.data;

      if (total_coins !== currentTotalCoins) {
        await Observable.setReduxValue(
          'previous_total_coins',
          currentTotalCoins,
        );
        await Observable.setReduxValue('total_coins', total_coins);
        EventCenter.trigger('coins_value_changed');
      }

      let today: any = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0');
      let yyyy = today.getFullYear();
      today = dd + '/' + mm + '/' + yyyy;

      let lastCheckMaxCoins = Observable.getReduxValue('lastCheckMaxCoins');
      let isToCheckMaxCoins = Observable.getReduxValue('is_to_check_max_coins');
      isToCheckMaxCoins =
        typeof isToCheckMaxCoins !== 'object' && isToCheckMaxCoins
          ? isToCheckMaxCoins
          : false;

      if (isToCheckMaxCoins && lastCheckMaxCoins !== today) {
        await Observable.setReduxValue('is_to_check_max_coins', false);
        if (total_coins <= currentTotalCoins && total_coins > 200) {
          await Observable.setReduxValue('lastCheckMaxCoins', today);
          await InAppActionPopover().show({
            navigation: null,
            title:
              strings.BESTOF2.HOME_SCREEN.GAME_SCREEN.MAX_COINS_POPUP.TITLE,
            description:
              strings.BESTOF2.HOME_SCREEN.GAME_SCREEN.MAX_COINS_POPUP.MESSAGE,
            action: '',
            negativeLabel: strings.OTHER.CLOSE,
            action_title: '',
            actionFunction: async () => {},
            negativeActionFunction: async () => {},
            buttonsColumn: true,
            smallIcon: require('../../../assets/images/icons/icn_new_tf_coin.png'),
            extraTitleStyle: {color: colors.BESTOF2.BG1},
            extraDescriptionStyle: {color: colors.BESTOF2.BG1},
            extraMainButtonStyle: {
              width: '0%',
              height: 0,
            },
            extraNegativeButtonStyle: {
              backgroundColor: colors.BESTOF2.BG1,
              width: '92%',
              height: 48,
              borderRadius: 15,
              alignSelf: 'center',
              shadowColor: colors.lightGray,
              shadowOpacity: 0.4,
              shadowOffset: {width: 0, height: 0},
              shadowRadius: 5,
              elevation: 2,
            },
            extraMainButtonTextStyle: {color: colors.BESTOF2.BG1},
            extraNegativeButtonTextStyle: {color: colors.WHITE},
          });
        }
      }
    }
  } catch {}
};

export default HomeScreen;
