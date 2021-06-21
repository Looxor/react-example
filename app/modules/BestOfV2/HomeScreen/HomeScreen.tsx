import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import styles from "./HomeScreen.style";
import Button from "../../../components/Button";
import { routes } from "../../../navigation/rootNavigation/navigation.constants";
import { CallServerPromise } from "../../../utils/app/CallServer";
import BestOfConstants from "../_Models/BestOfConstants";
import { colors, strings } from "../../../config";
import { UserData } from "../../../config/constants";
import LinearGradient from "react-native-linear-gradient";
import FastImage from "react-native-fast-image";
import HeaderBookmarks from "./_Components/HeaderBookmarks";
import HomeScreenContainer from "./_Components/HomeScreenContainer";
import { Observable } from "../../_CommonModels/ViewModelBase";
import standardFunctions from "../../../utils/app/StandardFunctions";
import NavigationService from "../../../utils/app/NavigationService";

// This Component for temporary use
const TestButton = props => (
  <Button
    disabled={false}
    onPress={() => props.onPress(props.route)}
    style={styles.startBestOfButton}
    textStyle={styles.startBestOfButtonText}>
    {props.route}
  </Button>
);

const HomeScreen = props => {
  const [bestofAvailable, setBestofAvailable] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isToShowAnimation, setIsToShowAnimation] = useState(false);
  const [showHomeScreen, setShowHomeScreen] = useState(true);
  const [selectedBookmark, setSelectedBookmark] = useState(1);

  const [showUpArrowIcon, setShowUpArrowIcon] = useState(false);
  const [showDownArrowIcon, setShowDownArrowIcon] = useState(false);

  const getBestOfConstants = async () => {
    let request: any = await CallServerPromise.get_bestof_constants();
    if (request.success) {
      BestOfConstants.set(request.data);
    }
  };

  const checkBestOfAvailable = async () => {
    const request = await CallServerPromise.get_is_prizes_available();
    if (request.success && request.data) {
      setBestofAvailable(request.data);
    } else if (!request.aborted) {
      setBestofAvailable(false);
    }
  };

  const componentDidMount = () => {
    setShowOnboarding(
      !UserData.getUserData().faculty_id ||
        !UserData.getUserData().bestof_subjects,
    );

    const didFocus = async () => {
      if (bestofAvailable === null) {
        await checkBestOfAvailable();
      }
      let BottomTabBestOfPressed = Observable.getReduxValue(
        'BottomTabBestOfPressed',
      );
      if (BottomTabBestOfPressed) {
        setSelectedBookmark(1);
      }
      await Observable.setReduxValue('BottomTabBestOfPressed', false);

      await getBestOfConstants();
      setShowOnboarding(
        !UserData.getUserData().faculty_id ||
          !UserData.getUserData().bestof_subjects,
      );
      standardFunctions.add_firebase_event_log('bestofs', 'home_screen_opened');
    };

    const didBlur = () => {
      setShowOnboarding(
        !UserData.getUserData().faculty_id ||
          !UserData.getUserData().bestof_subjects,
      );
    };

    props.navigation.addListener('blur', didBlur);
    props.navigation.addListener('focus', didFocus);
    didFocus();
    return componentWillUnmount;
  };

  const componentWillUnmount = () => {};

  const startOnboardingFlow = () => {
    // @ts-ignore
    global.navigationDataForever = global.navigationDataForever || {};
    // @ts-ignore
    global.navigationDataForever['refreshBestOfV2HomeScreen'] = () => {
      setShowOnboarding(
        !UserData.getUserData().faculty_id ||
          !UserData.getUserData().bestof_subjects,
      );
    };

    NavigationService.navigate(routes.BESTOF2_NAVIGATOR, {
      screen: routes.BESTOF2_CHOOSE_FACULTY,
    });
  };

  const _setSelectedBookmark = selectedBookmark => {
    setSelectedBookmark(selectedBookmark);
    standardFunctions.add_firebase_event_log('bestofs', 'tab_pressed', {
      screen: selectedBookmark,
    });
  };

  useEffect(componentDidMount, [
    UserData.getUserData().faculty_id,
    UserData.getUserData().bestof_subjects,
  ]);
  return (
    <>
      {bestofAvailable !== null && !bestofAvailable && (
        <LinearGradient
          style={styles.onboardingContainer}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          colors={[colors.BESTOF2.BG2_1, colors.BESTOF2.BG2_2]}>
          <FastImage
            style={styles.mainImageBackground}
            source={require('../../../../assets/images/icons/bestofs_trasparent_background.png')}>
            <FastImage
              style={styles.bestOfIconOnboarding}
              source={require('../../../../assets/images/icons/icn_new_bestofs.png')}
              resizeMode={'contain'}
            />
            <Text style={styles.onboardingTitle}>
              {strings.BESTOF2.BESTOF_NOT_AVAILABLE.TITLE}
            </Text>
            <Text style={styles.onboardingText}>
              {strings.BESTOF2.BESTOF_NOT_AVAILABLE.DESCRIPTION}
            </Text>
          </FastImage>
        </LinearGradient>
      )}
      {showOnboarding && (
        <LinearGradient
          style={styles.onboardingContainer}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          colors={[colors.BESTOF2.BG2_1, colors.BESTOF2.BG2_2]}>
          <FastImage
            style={styles.mainImageBackground}
            source={require('../../../../assets/images/icons/bestofs_trasparent_background.png')}>
            <FastImage
              style={styles.bestOfIconOnboarding}
              source={require('../../../../assets/images/icons/icn_new_bestofs.png')}
              resizeMode={'contain'}
            />
            <Text style={styles.onboardingTitle}>
              {strings.BESTOF2.ONBOARDING.HOME.TITLE}
            </Text>
            <Text style={styles.onboardingText}>
              {strings.BESTOF2.ONBOARDING.HOME.DESCRIPTION}
            </Text>
            <Button
              onPress={startOnboardingFlow}
              style={styles.onboardingStartButton}
              textStyle={styles.onboardingStartButtonText}>
              {strings.BESTOF2.ONBOARDING.HOME.START_BUTTON}
            </Button>
          </FastImage>
        </LinearGradient>
      )}
      {showHomeScreen && (
        <LinearGradient
          style={styles.onboardingContainer}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          colors={[colors.BESTOF2.BG2_1, colors.BESTOF2.BG2_2]}>
          <FastImage
            style={styles.mainImageBackground}
            source={require('../../../../assets/images/icons/bestofs_trasparent_background.png')}>
            <HeaderBookmarks
              selectedBookmark={selectedBookmark}
              setSelectedBookmark={_setSelectedBookmark}
              showUpArrowIcon={showUpArrowIcon}
              showDownArrowIcon={showDownArrowIcon}
              setShowUpArrowIcon={setShowUpArrowIcon}
              setShowDownArrowIcon={setShowDownArrowIcon}
            />
            <HomeScreenContainer
              selectedBookmark={selectedBookmark}
              setSelectedBookmark={_setSelectedBookmark}
              setIsToShowAnimation={setIsToShowAnimation}
              isToShowAnimation={isToShowAnimation}
              navigation={props.navigation}
              showUpArrowIcon={showUpArrowIcon}
              setShowUpArrowIcon={setShowUpArrowIcon}
              showDownArrowIcon={showDownArrowIcon}
              setShowDownArrowIcon={setShowDownArrowIcon}
            />
          </FastImage>
        </LinearGradient>
      )}
    </>
  );
};

export const refreshBestOfScoreboardScoreAndRank = async (
  showScoreboardAnimations = false,
  animationToShow = r => {},
) => {
  try {
    const old_scoreboard_rank = Observable.getReduxValue(
      'bestof_scoreboard_score_and_rank',
    )
      ? Observable.getReduxValue('bestof_scoreboard_score_and_rank').rank
      : '--';
    const request =
      await CallServerPromise.get_bestof_scoreboard_score_and_rank();
    if (request && request.success && request.data) {
      if (old_scoreboard_rank !== request.data.rank) {
        if (old_scoreboard_rank > request.data.rank) {
          if (true || showScoreboardAnimations) {
            animationToShow('user_rose_scoreboard');
          }
        } else if (old_scoreboard_rank < request.data.rank) {
          if (true || showScoreboardAnimations) {
            animationToShow('user_fell_scoreboard');
          }
        }
      }
      await Observable.setReduxValue(
        'bestof_scoreboard_score_and_rank',
        request.data,
      );
    } else if (request && request.success) {
      await Observable.setReduxValue('bestof_scoreboard_score_and_rank', {
        avg_score: '--',
        rank: '--',
      });
    }
  } catch {}
};

export default HomeScreen;
