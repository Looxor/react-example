import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./GameScreen.style";
import FastImage from "react-native-fast-image";
import { colors, sounds, strings } from "../../../../config";
import { UserData } from "../../../../config/constants";
import TouchableScale from "react-native-touchable-scale";
import { CallServerPromise } from "../../../../utils/app/CallServer";
import standardFunctions from "../../../../utils/app/StandardFunctions";
import BestOf from "../../_Models/BestOf";
import BestOfHistory from "../../_Models/BestOfHistory";
import { routes } from "../../../../navigation/rootNavigation/navigation.constants";
import { Popover } from "teaset";
import Strings from "../../../../utils/misc/TextComponents";
import BestOfConstants from "../../_Models/BestOfConstants";
import ScoreText from "../../_Components/ScoreText";
import EventCenter from "../../../../utils/misc/EventCenter";
import { Observable } from "../../../_CommonModels/ViewModelBase";
import { refreshBestOfScoreboardScoreAndRank } from "../HomeScreen";
import InAppActionPopover from "../../../../components/InAppActionPopover";
import CacheManager from "../../../../utils/app/CacheManager";
import NavigationService from "../../../../utils/app/NavigationService";

const parseIconsText = (
  str: string,
  textProps: any = undefined,
  textContainer: any = undefined,
) => {
  return (
    <Text style={textContainer}>
      {str.split(/(:.*?:)/g).map((elem, index) => {
        if (!elem) return null;
        if (elem === ':icn_history:') {
          return (
            <FastImage
              key={String(index)}
              resizeMode={'contain'}
              style={[{width: 15, height: 15}]}
              source={require('../../../../../assets/images/icons/icn_history_bookmark_internal.png')}
            />
          );
        } else if (elem === ':icn_hat:') {
          return (
            <FastImage
              key={String(index)}
              resizeMode={'contain'}
              style={[{width: 15, height: 15}]}
              source={require('../../../../../assets/images/icons/icn_hat.png')}
            />
          );
        } else if (elem === ':icn_ranking:') {
          return (
            <FastImage
              key={String(index)}
              resizeMode={'contain'}
              style={[{width: 15, height: 15}]}
              source={require('../../../../../assets/images/icons/icn_scoreboard_bookmark_internal.png')}
            />
          );
        }
        return Strings.makeBold(elem, textProps);
      })}
    </Text>
  );
};

const gameCards = [
  {
    id: 0,
    cardCode: 'SAME_FACULTY_BESTOF',
    icon: 'USER_FACULTY_ICON',
    text: strings.BESTOF2.HOME_SCREEN.GAME_SCREEN.FACULTY_CARD_TEXT,
    buttonText: strings.BESTOF2.HOME_SCREEN.GAME_SCREEN.FACULTY_CARD_BUTTON,
    buttonAction: 'START_SAME_FACULTY_BESTOF',
  },
  {
    id: 1,
    cardCode: 'RANDOM_BESTOF',
    icon: require('../../../../../assets/images/icons/icn_question_mark_bestof.png'),
    text: strings.BESTOF2.HOME_SCREEN.GAME_SCREEN.RANDOM_CARD_TEXT,
    buttonText: strings.BESTOF2.HOME_SCREEN.GAME_SCREEN.RANDOM_CARD_BUTTON,
    buttonAction: 'START_RANDOM_BESTOF',
  },
];

/*

  {
    id: 2,
    cardCode: 'FRIENDS_BESTOF',
    icon: require("../../../../../assets/images/icons/icn_friends_game.png"),
    text: strings.BESTOF2.HOME_SCREEN.GAME_SCREEN.FRIENDS_CARD_TEXT,
    buttonText: strings.BESTOF2.HOME_SCREEN.GAME_SCREEN.FRIENDS_CARD_BUTTON,
    buttonAction: 'START_FRIENDS_BESTOF'
  },
 */

const GameCard = props => {
  const {
    id,
    icon,
    text,
    buttonText,
    buttonAction,
    loadingNewBestOf,
    alreadyPlaying,
    pressedGameCardID,
  } = props;
  return (
    <View style={styles.gameCardContainer}>
      <View style={{flexDirection: 'row'}}>
        <FastImage
          resizeMode={'contain'}
          style={styles.gameCardIcon}
          source={
            icon === 'USER_FACULTY_ICON'
              ? UserData.getUserData().faculty_image_url
                ? {uri: UserData.getUserData().faculty_image_url}
                : {}
              : icon
          }
        />
        <Text style={styles.gameCardText}>{text}</Text>
      </View>
      {alreadyPlaying && pressedGameCardID === id && (
        <PopoverItem
          text={strings.BESTOF2.MATCH_MAKING_SCREEN.ALREADY_PLAYING}
        />
      )}
      <TouchableScale
        disabled={loadingNewBestOf.loading}
        onPress={buttonAction}
        activeScale={0.96}
        style={styles.gameCardButton}>
        {loadingNewBestOf.loading && loadingNewBestOf.type === id && (
          <ActivityIndicator
            style={{position: 'absolute'}}
            color={colors.WHITE}
          />
        )}
        <Text
          style={[
            styles.gameCardButtonText,
            loadingNewBestOf.loading &&
              loadingNewBestOf.type === id && {color: 'transparent'},
          ]}>
          {buttonText}
        </Text>
      </TouchableScale>
    </View>
  );
};

const PopoverItem = props => {
  return (
    <Popover
      style={
        props.type === 'avg'
          ? styles.avgPopoverContainer
          : props.type === 'ranking'
          ? styles.rankingPopoverContainer
          : styles.alreadyPlayingPopoverContainer
      }
      arrow={
        props.type === 'avg'
          ? 'topLeft'
          : props.type === 'ranking'
          ? 'topRight'
          : 'bottom'
      }
      paddingCorner={
        props.type === 'avg' ? 85 : props.type === 'ranking' ? 95 : 0
      }>
      {parseIconsText(props.text, {style: styles.popoverTextStyle})}
    </Popover>
  );
};

const GameScreen = props => {
  const {
    setSelectedBookmark,
    setIsToShowAnimation,
    setShowUpArrowIcon,
    setShowDownArrowIcon,
  } = props;
  const [showPopover, setShowPopover] = useState({
    ranking: false,
    avg: false,
    alreadyPlaying: false,
    check: false,
  });
  const [loadingNewBestOf, setLoadingNewBestOf] = useState({
    loading: false,
    type: -1,
  });

  const [pressedGameCardID, setPressedGameCardID] = useState({
    type: -1,
  });

  const closePopover = () => {
    if (showPopover.ranking || showPopover.avg || showPopover.alreadyPlaying) {
      setShowPopover({
        ranking: false,
        avg: false,
        alreadyPlaying: false,
        check: true,
      });
    } else {
      setShowPopover({
        ranking: false,
        avg: false,
        alreadyPlaying: false,
        check: false,
      });
    }
  };

  const gameCardButtonAction = async (action: string) => {
    standardFunctions.play_sound_effect(sounds.BESTOFS.START_BESTOF_BUTTON);
    if (action === 'START_RANDOM_BESTOF') {
      await startBestOfHandler(false);
    } else if (action === 'START_SAME_FACULTY_BESTOF') {
      await startBestOfHandler(true);
    } else if (action === 'START_FRIENDS_BESTOF') {
    }
  };

  const startBestOfHandler = async (same_faculty = false, friends = false) => {
    CacheManager.set('same_faculty_bestof', same_faculty);
    CacheManager.set('friends_bestof', friends);
    if (!BestOfConstants.get('search_polling_time')) {
      let request: any = await CallServerPromise.get_bestof_constants();
      if (!request.success) {
        console.log('error on get constants ', request);
      } else {
        BestOfConstants.set(request.data);
      }
    }

    if (loadingNewBestOf.loading) return;
    setLoadingNewBestOf({
      loading: true,
      type: same_faculty
        ? gameCards.find(c => c.cardCode === 'SAME_FACULTY_BESTOF').id
        : friends
        ? gameCards.find(c => c.cardCode === 'FRIENDS_BESTOF').id
        : gameCards.find(c => c.cardCode === 'RANDOM_BESTOF').id,
    });

    setPressedGameCardID({
      type: same_faculty
        ? gameCards.find(c => c.cardCode === 'SAME_FACULTY_BESTOF').id
        : friends
        ? gameCards.find(c => c.cardCode === 'FRIENDS_BESTOF').id
        : gameCards.find(c => c.cardCode === 'RANDOM_BESTOF').id,
    });
    let request: any = await CallServerPromise.start_bestof_v2({same_faculty});
    if (!request.success) {
      setLoadingNewBestOf({loading: false, type: -1});
      setTimeout(() => {
        setPressedGameCardID({type: -1});
      }, 2500);
      if (request.error === 'missing faculty') {
        await standardFunctions.show_alert_async(
          strings.OTHER.WARNING,
          strings.BESTOF2.MATCH_MAKING_SCREEN.NEED_TO_SET_FACULTY,
        );
      } else if (request.error === 'already playing') {
        setShowPopover({
          ranking: false,
          avg: false,
          alreadyPlaying: true,
          check: false,
        });
      } else if (request.error === 'missing bestof_subjects') {
        await InAppActionPopover().show({
          navigation: props.navigation,
          title:
            strings.BESTOF2.HOME_SCREEN.GAME_SCREEN
              .MISSING_BESTOF_SUBJECTS_POPUP.TITLE,
          description:
            strings.BESTOF2.HOME_SCREEN.GAME_SCREEN.MISSING_BESTOF_SUBJECTS_POPUP.MESSAGE.replace(
              '{FACULTY_NAME}',
              UserData.getUserData().faculty_name,
            ),
          action: '',
          negativeLabel:
            strings.BESTOF2.HOME_SCREEN.GAME_SCREEN
              .MISSING_BESTOF_SUBJECTS_POPUP.EDIT_BESTOF_SUBJECTS,
          action_title: strings.OTHER.CANCEL,
          actionFunction: async () => {},
          negativeActionFunction: async () => {
            setSelectedBookmark(3);
          },
          buttonsColumn: true,
          smallIcon: require('../../../../../assets/images/icons/icn_subjects_bookmark_internal.png'),
          extraTitleStyle: {color: colors.BESTOF2.BG1},
          extraDescriptionStyle: {color: colors.BESTOF2.BG1, lineHeight: 22},
          extraMainButtonStyle: {
            backgroundColor: colors.WHITE,
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
      } else {
        await standardFunctions.show_alert_async(
          strings.OTHER.WARNING,
          strings.BESTOF2.MATCH_MAKING_SCREEN.UNKNOWN_ERROR,
        );
        console.log('error on start bestof', request);
      }
    } else {
      BestOf.init();
      BestOf.set(request.data);
      await BestOfHistory.set(request.data);
      setLoadingNewBestOf({loading: false, type: -1});
      setTimeout(() => {
        setPressedGameCardID({type: -1});
        NavigationService.navigate(routes.BESTOF2_NAVIGATOR, {
          screen: routes.BESTOF2_MATCHMAKING,
        });
      }, 2500);
    }
  };

  const componentDidMount = () => {
    refreshBestOfScoreboardScoreAndRank(true);
    const didFocus = async () => {
      EventCenter.off('GameFinished');
      EventCenter.on('GameFinished', () => {
        console.log("EventCenter.on('GameFinished'");
        refreshBestOfScoreboardScoreAndRank(true, anim_to_show => {
          if (anim_to_show === 'user_rose_scoreboard') {
            setShowUpArrowIcon(true);
            setShowDownArrowIcon(false);
            setTimeout(() => {
              setShowUpArrowIcon(false);
              setShowDownArrowIcon(false);
            }, 2000);
          } else if (anim_to_show === 'user_fell_scoreboard') {
            setShowUpArrowIcon(false);
            setShowDownArrowIcon(true);

            setTimeout(() => {
              setShowUpArrowIcon(false);
              setShowDownArrowIcon(false);
            }, 2000);
          }
        });
        setIsToShowAnimation(true);
        setSelectedBookmark(0);
      });
    };

    const didBlur = () => {
      // props.navigation.removeListener('blur', didBlur);
      // props.navigation.removeListener('focus', didFocus);
      // EventCenter.off('GameFinished');
    };

    props.navigation.addListener('blur', didBlur);
    props.navigation.addListener('focus', didFocus);
    didFocus();
    return componentWillUnmount;
  };

  const componentWillUnmount = () => {};

  useEffect(componentDidMount, []);
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      onTouchStart={closePopover}>
      {showPopover.avg && (
        <PopoverItem
          type={'avg'}
          text={strings.BESTOF2.HOME_SCREEN.GAME_SCREEN.AVG_POPOVER_TEXT}
        />
      )}
      {showPopover.ranking && (
        <PopoverItem
          type={'ranking'}
          text={strings.BESTOF2.HOME_SCREEN.GAME_SCREEN.RANKING_POPOVER_TEXT}
        />
      )}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.userScoreContainer}
          activeOpacity={1.0}
          onPress={() => {
            if (!showPopover.check) {
              standardFunctions.play_tap_sound();
              setShowPopover({
                ranking: false,
                avg: !showPopover.avg,
                alreadyPlaying: false,
                check: false,
              });
            }
          }}>
          <FastImage
            resizeMode={'contain'}
            style={styles.hatIcon}
            source={require('../../../../../assets/images/icons/icn_hat_big.png')}
          />
          <View style={styles.scoreView}>
            <ScoreText
              style={styles.scoreText}
              score={
                Observable.getReduxValue('bestof_scoreboard_score_and_rank') &&
                Observable.getReduxValue('bestof_scoreboard_score_and_rank')
                  .avg_score
                  ? Observable.getReduxValue('bestof_scoreboard_score_and_rank')
                      .avg_score
                  : '--'
              }
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1.0}
          style={styles.positionContainer}
          onPress={() => {
            if (!showPopover.check) {
              standardFunctions.play_tap_sound();
              setShowPopover({
                ranking: !showPopover.ranking,
                avg: false,
                alreadyPlaying: false,
                check: false,
              });
            }
          }}>
          <View style={styles.positionView}>
            <Text style={styles.positionText}>
              {Observable.getReduxValue('bestof_scoreboard_score_and_rank') &&
              Observable.getReduxValue('bestof_scoreboard_score_and_rank').rank
                ? Observable.getReduxValue('bestof_scoreboard_score_and_rank')
                    .rank + '°'
                : '--'}
            </Text>
          </View>
          <FastImage
            resizeMode={'contain'}
            style={styles.rankIcon}
            source={require('../../../../../assets/images/icons/icn_global_scoreboard_home.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.gameCardsContainer}>
        {gameCards &&
          gameCards.map((gameCard, index) => {
            return (
              <GameCard
                id={index}
                key={String(index)}
                icon={gameCard.icon}
                text={gameCard.text}
                buttonText={gameCard.buttonText}
                buttonAction={() => {
                  gameCardButtonAction(gameCard.buttonAction);
                }}
                loadingNewBestOf={loadingNewBestOf}
                alreadyPlaying={showPopover.alreadyPlaying}
                pressedGameCardID={pressedGameCardID.type}
              />
            );
          })}
      </View>
    </ScrollView>
  );
};

export default GameScreen;
