import React, { useEffect, useState } from "react";
import { ActivityIndicator, Animated, Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./HistoryScreen.style";
import FastImage from "react-native-fast-image";
import { colors, constants, strings } from "../../../../config";
import { UserData } from "../../../../config/constants";
import useHistoryViewModel from "../../_ViewModels/HistoryViewModel";
import BestOfData from "../../_Models/BestOfData";
import TimeAgo from "react-native-timeago";
import ScoreText from "../../_Components/ScoreText";
import { routes } from "../../../../navigation/rootNavigation/navigation.constants";
import { CommonActions as NavigationActions } from "@react-navigation/native";
import { refreshTotalCoins } from "../../../Home/HomeScreen";
import { Observable } from "../../../_CommonModels/ViewModelBase";
import Strings from "../../../../utils/misc/TextComponents";
import standardFunctions from "../../../../utils/app/StandardFunctions";

const MatchCard = props => {
  const {
    navigation,
    bestOfData,
    ongoing,
    count,
    leftAnimationValue,
    bottomAnimationValue,
    showCardAnimation,
    sorting,
    isWon,
    isLost,
    finish_date,
    logged_user_profile_image_url,
    opponent_user_profile_image_url,
    logged_user_avg_score,
    opponent_user_avg_score,
    opponent_user_nickname,
    opponent_user_faculty_name,
    opponent_user_university_name,
  } = props;
  return (
    <>
      {count < 10 && sorting !== 'ascending' && (
        <View style={styles.verticalLine} />
      )}
      {((count >= 10 && sorting !== 'ascending') ||
        sorting === 'ascending') && <View style={styles.invisibleSpace} />}
      {count === 0 && sorting === 'ascending' && (
        <View style={{height: 20, width: 100}} />
      )}
      {count === 10 && sorting !== 'ascending' && (
        <View style={styles.endAverageCalculationContainer}>
          <View style={styles.horizontalLine} />
          {Strings.makeBold(
            strings.BESTOF2.HOME_SCREEN.HISTORY_SCREEN
              .END_AVERAGE_CALCULATION_TEXT,
            {style: styles.endAverageCalculationText},
          )}
          <View style={styles.horizontalLine} />
        </View>
      )}
      <TouchableOpacity
        disabled={ongoing}
        style={{width: '100%', height: 196, alignItems: 'center'}}
        activeOpacity={1}
        onPress={() => {
          standardFunctions.add_firebase_event_log('bestofs', 'hstr_crd_prsd', {
            bestof_id: bestOfData.bestof_data.bestof_id,
          });
          navigation.navigate(routes.BESTOF2_HISTORY_RESULT_SCREEN, {
            bestof_data: bestOfData,
          });
        }}>
        <Animated.View
          style={[
            styles.matchCardContainer,
            showCardAnimation &&
              count === 0 && {
                transform: [{translateX: leftAnimationValue}],
              },
            showCardAnimation &&
              count >= 1 && {
                transform: [{translateY: bottomAnimationValue}],
              },
          ]}>
          <View style={[styles.matchCardContainerBG]} />
          <View style={styles.profileImagesContainer}>
            <Text
              style={[
                styles.wonOrLostLabel,
                ongoing && {color: colors.LIGHT_ALOE_TF},
                !ongoing && isWon && {color: '#65AA20'},
                !ongoing && isLost && {color: '#C63838'},
                !ongoing && !isWon && !isLost && {color: colors.ORANGE_TF},
              ]}>
              {ongoing && strings.BESTOF2.HOME_SCREEN.HISTORY_SCREEN.WAITING}
              {!ongoing && isWon
                ? strings.BESTOF2.HOME_SCREEN.HISTORY_SCREEN.WON_LABEL
                : !ongoing && isLost
                ? strings.BESTOF2.HOME_SCREEN.HISTORY_SCREEN.LOST_LABEL
                : !ongoing &&
                  strings.BESTOF2.HOME_SCREEN.HISTORY_SCREEN.PAREGED_LABEL}
            </Text>
            <View style={styles.usersImageContainer}>
              {isWon && (
                <FastImage
                  resizeMode={'contain'}
                  style={[styles.crownImageUser1]}
                  source={require('../../../../../assets/images/icons/icn_ranking_crown.png')}
                />
              )}
              <FastImage
                resizeMode={'contain'}
                style={styles.user1Image}
                source={{uri: logged_user_profile_image_url}}
              />
            </View>
            <View style={styles.usersImageContainer}>
              {isLost && (
                <FastImage
                  resizeMode={'contain'}
                  style={[styles.crownImageUser2]}
                  source={require('../../../../../assets/images/icons/icn_ranking_crown.png')}
                />
              )}
              <FastImage
                resizeMode={'contain'}
                style={styles.user2Image}
                source={{uri: opponent_user_profile_image_url}}
              />
            </View>
            <View style={styles.timeView}>
              <Text style={[styles.finishDateLabel]}>
                {!ongoing && (
                  <TimeAgo time={new Date(Date.parse(finish_date))} />
                )}
                {ongoing &&
                  strings.BESTOF2.HOME_SCREEN.HISTORY_SCREEN.ONGOING_TEXT}
              </Text>
            </View>
          </View>
          {(isWon || isLost) && (
            <FastImage
              resizeMode={'contain'}
              style={[
                {
                  position: 'absolute',
                  top: 50,
                  width: 60,
                  height: 60,
                  zIndex: 100,
                },
                isWon && {left: 12},
                isLost && {right: 12},
              ]}
              source={require('../../../../../assets/images/icons/icn_praise_it.png')}
            />
          )}
          <View style={styles.usersScoresContainer}>
            <ScoreText
              style={styles.loggedUserScore}
              score={ongoing ? '--' : logged_user_avg_score}
            />
            <FastImage
              resizeMode={'contain'}
              style={styles.scoreIcon}
              source={require('../../../../../assets/images/icons/icn_result_badge.png')}
            />
            <ScoreText
              style={styles.opponentUserScore}
              score={ongoing ? '--' : opponent_user_avg_score}
            />
          </View>
          <View style={styles.opponentDataContainer}>
            <Text style={styles.opponentNickname}>
              {opponent_user_nickname}
            </Text>
            <Text style={styles.opponentFacultyName}>
              {opponent_user_faculty_name}
            </Text>
            <Text style={styles.opponentUniversityName}>
              {opponent_user_university_name}
            </Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </>
  );
};

const HistoryScreen = props => {
  const view = useHistoryViewModel({props});
  const [showCardAnimation, setShowCardAnimation] = useState(false);

  const [cardEnterAnimation, setCardEnterAnimation] = useState(
    new Animated.Value(-Dimensions.get('window').width),
  );
  const [cardGoDownAnimation, setCardGoDownAnimation] = useState(
    new Animated.Value(-231),
  );

  const onApplyFilter = params => {
    if (willUnmount) return;
    view.applyFilterParams(params);
  };

  const onRemoveFilter = () => {
    if (willUnmount) return;
    view.removeFilterParams();
  };
  let willUnmount = false;

  // MISSING
  const showFilterHandler = () => {
    NavigationActions.navigate(routes.BESTOF2_NAVIGATOR, {
      screen: routes.BESTOF2_HISTORY_FILTER,
      params: {
        onApplyFilter,
        onRemoveFilter,
      },
    });
  };

  const componentDidMount = () => {
    const didFocus = async () => {
      await view.getDataFromServer();

      await animationFunction();
    };

    const didBlur = () => {};

    props.navigation.addListener('blur', didBlur);
    props.navigation.addListener('focus', didFocus);
    didFocus();
    return componentWillUnmount;
  };

  const animationFunction = () => {
    if (willUnmount) return;
    refreshTotalCoins();
    if (view.isToShowAnimation) {
      cardGoDownAnimation.setValue(-231);
      cardEnterAnimation.setValue(-Dimensions.get('window').width);
    }

    setShowCardAnimation(view.isToShowAnimation);
    if (view.isToShowAnimation) {
      setTimeout(() => {
        if (!willUnmount) startAnimation();
      }, 1000);
    }
  };

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(cardGoDownAnimation, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(cardEnterAnimation, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(async () => {
      if (!willUnmount) view.setAnimationToShow(false);
    });
  };

  const componentWillUnmount = () => {
    willUnmount = true;
  };

  useEffect(componentDidMount, []);
  useEffect(animationFunction, [view.isToShowAnimation]);
  const bestof_scoreboard_score_and_rank = Observable.getReduxValue(
    'bestof_scoreboard_score_and_rank',
  );
  return (
    <ScrollView
      style={styles.container}
      onMomentumScrollEnd={e => view.loadMore(e)}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.filterContainer}
          activeOpacity={constants.ACTIVE_OPACITY}
          onPress={showFilterHandler}>
          <FastImage
            resizeMode={'contain'}
            style={styles.filterIcon}
            source={require('../../../../../assets/images/icons/icn_filter_bestofs.png')}
          />
        </TouchableOpacity>
        <Text style={styles.infoTitle}>
          {strings.BESTOF2.HOME_SCREEN.HISTORY_SCREEN.INFO_TITLE}
        </Text>
        {Strings.makeBold(
          strings.BESTOF2.HOME_SCREEN.HISTORY_SCREEN.INFO_TEXT,
          {style: styles.infoText},
        )}
        <View style={styles.averageText}>
          <FastImage
            resizeMode={'contain'}
            style={styles.hatIcon}
            source={require('../../../../../assets/images/icons/icn_hat_big.png')}
          />
          {bestof_scoreboard_score_and_rank &&
            bestof_scoreboard_score_and_rank.avg_score !== '--' && (
              <ScoreText
                style={styles.scoreText}
                score={
                  Observable.getReduxValue(
                    'bestof_scoreboard_score_and_rank',
                  ) && bestof_scoreboard_score_and_rank.avg_score
                    ? Observable.getReduxValue(
                        'bestof_scoreboard_score_and_rank',
                      ).avg_score
                    : '--'
                }
              />
            )}
          {!(
            bestof_scoreboard_score_and_rank &&
            bestof_scoreboard_score_and_rank.avg_score !== '--'
          ) &&
            view.loadDataFromCache() &&
            view.loadDataFromCache().filter(l => !l.ongoing).length < 10 &&
            Strings.makeBold(
              strings.BESTOF2.HOME_SCREEN.HISTORY_SCREEN.MISSING_BESTOFS_TEXT.replace(
                '{BESTOFS_PLAYED}',
                view.loadDataFromCache().length,
              ),
              {style: styles.missingBestOfsLabel},
            )}
        </View>
        {view.oldBestOfs &&
          Array.isArray(view.oldBestOfs) &&
          view.oldBestOfs.map((oldBestOf, index) => {
            const user_id = UserData.getUserData().user_id;
            let cardData = new BestOfData({...oldBestOf, user_id});
            let logged_user_profile_image_url = '',
              opponent_user_profile_image_url = '';
            let logged_user_avg_score = 0,
              opponent_user_avg_score = 0;
            let opponent_user_nickname = '',
              opponent_user_faculty_name = '',
              opponent_user_university_name = '';
            if (cardData.isUser1()) {
              logged_user_profile_image_url = cardData.user1_profile_image_url;
              opponent_user_profile_image_url =
                cardData.user2_profile_image_url;
              logged_user_avg_score = cardData.user1_avg_score;
              opponent_user_avg_score = cardData.user2_avg_score;
              opponent_user_nickname = cardData.user2_nickname;
              opponent_user_faculty_name = cardData.user2_faculty_name;
              opponent_user_university_name = cardData.user2_university_name;
            } else {
              logged_user_profile_image_url = cardData.user2_profile_image_url;
              opponent_user_profile_image_url =
                cardData.user1_profile_image_url;
              logged_user_avg_score = cardData.user2_avg_score;
              opponent_user_avg_score = cardData.user1_avg_score;
              opponent_user_nickname = cardData.user1_nickname;
              opponent_user_faculty_name = cardData.user1_faculty_name;
              opponent_user_university_name = cardData.user1_university_name;
            }
            return (
              <MatchCard
                key={String(index)}
                navigation={props.navigation}
                ongoing={cardData.ongoing}
                bestOfData={{bestof_data: oldBestOf}}
                count={index}
                sorting={
                  view.searchParams ? view.searchParams.sorting : 'descending'
                }
                showCardAnimation={showCardAnimation}
                leftAnimationValue={cardEnterAnimation}
                bottomAnimationValue={cardGoDownAnimation}
                isWon={cardData.isWon()}
                isLost={cardData.isLost()}
                finish_date={cardData.last_update_date}
                logged_user_profile_image_url={logged_user_profile_image_url}
                opponent_user_profile_image_url={
                  opponent_user_profile_image_url
                }
                logged_user_avg_score={logged_user_avg_score}
                opponent_user_avg_score={opponent_user_avg_score}
                opponent_user_nickname={opponent_user_nickname}
                opponent_user_faculty_name={opponent_user_faculty_name}
                opponent_user_university_name={opponent_user_university_name}
              />
            );
          })}
        <View
          style={{
            width: '100%',
            height: 40,
            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {view.loading && <ActivityIndicator color={colors.WHITE} />}
        </View>
      </View>
      <View style={{height: 20, width: '100%'}} />
    </ScrollView>
  );
};

export default HistoryScreen;
