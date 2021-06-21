import * as React from "react";
import { useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import { colors, constants, strings } from "../../../../config";
import { CallServerPromise } from "../../../../utils/app/CallServer";
import { Observable } from "../../../_CommonModels/ViewModelBase";
import FastImage from "react-native-fast-image";
import ScoreText from "../../_Components/ScoreText";
import TouchableScale from "react-native-touchable-scale";
import { UserData } from "../../../../config/constants";
import profile_image from "../../../../utils/misc/ProfileImage";

class RenderScoreItem extends React.PureComponent<{item; index}> {
  render() {
    if (!this.props.item) return null;
    if (this.props.item.USER_NOT_IN_SCOREBOARD) {
      return renderLoggedUserItem(
        this.props.item.setSelectedBookmark,
        this.props.item.missingBestOfs,
      );
    }

    const {
      avg_score,
      faculty_name,
      is_friend,
      nickname,
      position,
      university_name,
    } = this.props.item;
    return (
      <View style={styles.scoreItemContainer}>
        <FastImage
          source={require('../../../../../assets/images/icons/icn_scoreboard_bookmark_internal.png')}
          style={styles.positionContainer}>
          <Text
            style={[
              styles.positionText,
              position.toString().length >= 6 && {fontSize: 8},
              position.toString().length >= 5 &&
                position.toString().length < 6 && {fontSize: 10},
              position.toString().length >= 4 &&
                position.toString().length < 5 && {fontSize: 12},
              position.toString().length >= 3 &&
                position.toString().length < 4 && {fontSize: 15},
              position.toString().length >= 0 &&
                position.toString().length < 3 && {fontSize: 18},
            ]}>
            {position + '°'}
          </Text>
        </FastImage>
        <FastImage
          source={{
            uri: this.props.item.profile_image_url
              ? this.props.item.profile_image_url
              : profile_image['O'],
          }}
          style={styles.profileImage}
          resizeMode={'contain'}
        />
        <View style={styles.informationContainer}>
          <View style={styles.scoreContainer}>
            <FastImage
              resizeMode={'contain'}
              source={require('../../../../../assets/images/icons/icn_hat.png')}
              style={styles.scoreImage}
            />
            <ScoreText style={styles.scoreText} score={avg_score} />
          </View>
          <Text style={styles.nickNameText}>{nickname}</Text>
          <Text style={styles.facultyText}>{faculty_name}</Text>
          <Text style={styles.universityText}>{university_name}</Text>
        </View>
        {is_friend && (
          <FastImage
            source={require('../../../../../assets/images/icons/icn_friends_game.png')}
            style={styles.friendImage}
          />
        )}
        {false && (
          <TouchableScale
            onPress={() => {}}
            activeScale={0.96}
            style={styles.challengeButton}>
            <Text style={styles.challengeButtonText}>
              {strings.BESTOF2.HOME_SCREEN.SCOREBOARD_SCREEN.CHALLENGE_TEXT}
            </Text>
          </TouchableScale>
        )}
      </View>
    );
  }
}

const renderLoggedUserItem = (
  setSelectedBookmark: any,
  missingBestOfs: any,
) => {
  const userData = UserData.getUserData() || {};
  return (
    <View
      style={[
        styles.scoreItemContainer,
        {borderWidth: 4, borderColor: colors.BESTOF2.BG1, marginBottom: 30},
      ]}>
      <FastImage
        source={
          userData.profile_image_url !== undefined &&
          userData.profile_image_url !== ''
            ? {uri: userData.profile_image_url}
            : {uri: profile_image['O']}
        }
        style={styles.profileImage}
        resizeMode={'contain'}
      />
      <View style={styles.informationContainer}>
        <Text style={styles.nickNameText}>{userData.nickname}</Text>
        <Text style={styles.universityText}>
          {missingBestOfs > 1 &&
            strings.BESTOF2.HOME_SCREEN.SCOREBOARD_SCREEN.MISSING_BESTOFS_LABEL.replace(
              '{MISSING_BESTOFS}',
              missingBestOfs,
            )}
          {missingBestOfs === 1 &&
            strings.BESTOF2.HOME_SCREEN.SCOREBOARD_SCREEN
              .MISSING_ONE_BESTOF_LABEL}
          {missingBestOfs === 0 && '\n'}
        </Text>
      </View>
      <TouchableScale
        onPress={() => {
          setSelectedBookmark && setSelectedBookmark(1);
        }}
        activeScale={0.96}
        style={styles.playAgainButton}>
        <Text style={styles.playAgainButtonText}>
          {strings.BESTOF2.HOME_SCREEN.SCOREBOARD_SCREEN.PLAY_AGAIN}
        </Text>
      </TouchableScale>
    </View>
  );
};

const queryUsersFromScoreboard: (
  direction: string,
  next_data: any,
  setNextData: any,
  currentUsersListLength: number,
) => Promise<any> = (direction, next_data, setNextData) => {
  const bestof_scoreboard_score_and_rank = Observable.getReduxValue(
    'bestof_scoreboard_score_and_rank',
  );
  return new Promise(async resolve => {
    let default_data =
      bestof_scoreboard_score_and_rank &&
      bestof_scoreboard_score_and_rank.avg_score === '--'
        ? {sorting: 'descending', limit: 40}
        : {limit: 40};

    let nd =
      direction && next_data
        ? direction === 'top'
          ? next_data.top
          : direction === 'bottom'
          ? next_data.bottom
          : default_data
        : default_data;

    if (nd && nd.redis_score !== null) {
      let dataToSend = nd;
      if (!dataToSend.limit) {
        dataToSend['limit'] = 40;
      }

      const request: any = await CallServerPromise.get_bestof_scoreboard(
        dataToSend,
      );
      if (request.success && request.data) {
        setNextData(request.data.next_data);
        resolve(request.data.scoreboard);
      }
    }
  });
};

const ScoreboardFlatList = props => {
  const scoreboardFlatListRef: any = useRef();
  const setNextData = nd => {
    let temp_nd = next_data;
    if (nd.top) {
      !temp_nd.top && (temp_nd.top = {});
      temp_nd.top.redis_score = nd.top.redis_score;
      nd.top.sorting && (temp_nd.top.sorting = nd.top.sorting);
    }
    if (nd.bottom) {
      !temp_nd.bottom && (temp_nd.bottom = {});
      temp_nd.bottom.redis_score = nd.bottom.redis_score;
      nd.bottom.sorting && (temp_nd.bottom.sorting = nd.bottom.sorting);
    }

    set_next_data(temp_nd);
  };

  const [usersList, setUsersList] = useState([]);
  const [next_data, set_next_data] = useState<any>({});
  const [showTopUserCell, setShowTopUserCell] = useState(false);
  const [showBottomUserCell, setShowBottomUserCell] = useState(false);

  let timerId;
  let willUnmount = false;
  const componentDidMount = () => {
    const userData = UserData.getUserData() || {};
    const initData = async () => {
      const initialUsers = await queryUsersFromScoreboard(
        '',
        next_data,
        data => !willUnmount && setNextData(data),
        0,
      );
      if (initialUsers && props.hideLoading) props.hideLoading();
      if (!initialUsers) return;

      setUsersList(initialUsers.reverse());
      timerId = setTimeout(() => {
        if (initialUsers) {
          try {
            let userScoreboardData = initialUsers
              .filter(item => {
                return item.user_id === userData.user_id;
              })
              .shift();
            let userIndex = initialUsers.indexOf(userScoreboardData);
            if (userIndex >= 0 && userIndex < initialUsers.length) {
              if (scoreboardFlatListRef && scoreboardFlatListRef.current) {
                scoreboardFlatListRef.current.scrollToIndex({
                  animated: false,
                  index: userIndex,
                });
              }
            }
          } catch (e) {}
        }
      }, 200);
    };

    initData();
    return componentWillUnmount;
  };

  const componentWillUnmount = () => {
    willUnmount = true;
    clearTimeout(timerId);
  };

  React.useEffect(componentDidMount, []);

  const loadTopUsers = async () => {
    const newUsers = await queryUsersFromScoreboard(
      'top',
      next_data,
      setNextData,
      usersList.length,
    );
    if (!willUnmount)
      setUsersList(m => {
        return m.concat(newUsers);
      });
  };

  const loadBottomUsers = async () => {
    const newUsers = await queryUsersFromScoreboard(
      'bottom',
      next_data,
      setNextData,
      usersList.length,
    );
    if (newUsers.length > 0) {
      if (!willUnmount)
        setUsersList(m => {
          return newUsers.reverse().concat(m);
        });
    }
  };

  if (!usersList.length) {
    return null;
  }

  const getItemLayout = (data, index) => ({
    length: 160,
    offset: 160 * index,
    index,
  });

  const scrollToLoggedUserPosition = () => {
    const userData = UserData.getUserData() || {};
    if (scoreboardFlatListRef) {
      let userIndex =
        usersList.findIndex(item => item.user_id === userData.user_id) - 1;
      if (userIndex < 0) return;
      scoreboardFlatListRef.current.scrollToIndex({
        index: userIndex,
        animated: true,
      });
    }
  };

  const bestof_scoreboard_score_and_rank = Observable.getReduxValue(
    'bestof_scoreboard_score_and_rank',
  );
  let rank =
    bestof_scoreboard_score_and_rank && bestof_scoreboard_score_and_rank.rank
      ? bestof_scoreboard_score_and_rank.rank + '°'
      : '--';

  const userData = UserData.getUserData() || {};
  // @ts-ignore
  return (
    <View style={{flex: 1, width: '100%'}}>
      {showTopUserCell && (
        <TouchableOpacity
          activeOpacity={1.0}
          onPress={scrollToLoggedUserPosition}
          style={[styles.smallUserCell, {top: -5, marginBottom: 5}]}>
          <FastImage
            source={{
              uri: userData.profile_image_url
                ? userData.profile_image_url
                : profile_image['O'],
            }}
            style={styles.profileImageSmall}
            resizeMode={'contain'}
          />
          <View style={styles.scoreContainerSmall}>
            <FastImage
              resizeMode={'contain'}
              source={require('../../../../../assets/images/icons/icn_hat.png')}
              style={styles.scoreImage}
            />
            <ScoreText
              style={styles.scoreText}
              score={
                bestof_scoreboard_score_and_rank &&
                bestof_scoreboard_score_and_rank.avg_score
                  ? bestof_scoreboard_score_and_rank.avg_score
                  : '--'
              }
            />
          </View>
          <Text style={styles.nickNameTextSmall}>{userData.nickname}</Text>
          <FastImage
            source={require('../../../../../assets/images/icons/icn_scoreboard_bookmark_internal.png')}
            style={styles.positionContainerSmall}>
            <Text
              style={[
                styles.positionTextSmall,
                rank.toString().length >= 6 && {fontSize: 8},
                rank.toString().length >= 5 &&
                  rank.toString().length < 6 && {fontSize: 10},
                rank.toString().length >= 4 &&
                  rank.toString().length < 5 && {fontSize: 12},
                rank.toString().length >= 3 &&
                  rank.toString().length < 4 && {fontSize: 14},
                rank.toString().length >= 0 &&
                  rank.toString().length < 3 && {fontSize: 16},
              ]}>
              {rank}
            </Text>
          </FastImage>
        </TouchableOpacity>
      )}
      <FlatList
        // @ts-ignore
        ref={scoreboardFlatListRef}
        windowSize={130}
        inverted
        getItemLayout={getItemLayout}
        keyExtractor={(item, index) => item.user_id}
        data={
          bestof_scoreboard_score_and_rank &&
          bestof_scoreboard_score_and_rank.rank !== '--'
            ? usersList
            : [
                {
                  USER_NOT_IN_SCOREBOARD: true,
                  setSelectedBookmark: props.setSelectedBookmark,
                  missingBestOfs: props.missingBestOfs,
                },
              ].concat(usersList)
        }
        onStartReached={loadBottomUsers}
        onEndReached={loadTopUsers}
        renderItem={({item, index}) => {
          return (
            <RenderScoreItem key={String(index)} item={item} index={index} />
          );
        }}
        maxToRenderPerBatch={45}
        removeClippedSubviews={true}
        onStartReachedThreshold={10}
        onEndReachedThreshold={10}
        activityIndicatorColor={colors.WHITE}
      />
      {showBottomUserCell && (
        <TouchableOpacity
          activeOpacity={1.0}
          onPress={scrollToLoggedUserPosition}
          style={[styles.smallUserCell, {marginTop: 5, bottom: 4}]}>
          <FastImage
            source={{
              uri: userData.profile_image_url
                ? userData.profile_image_url
                : profile_image['O'],
            }}
            style={styles.profileImageSmall}
            resizeMode={'contain'}
          />
          <View style={styles.scoreContainerSmall}>
            <FastImage
              resizeMode={'contain'}
              source={require('../../../../../assets/images/icons/icn_hat.png')}
              style={styles.scoreImage}
            />
            <ScoreText
              style={styles.scoreText}
              score={
                bestof_scoreboard_score_and_rank &&
                bestof_scoreboard_score_and_rank.avg_score
                  ? bestof_scoreboard_score_and_rank.avg_score
                  : '--'
              }
            />
          </View>
          <Text style={styles.nickNameTextSmall}>{userData.nickname}</Text>
          <FastImage
            source={require('../../../../../assets/images/icons/icn_scoreboard_bookmark_internal.png')}
            style={styles.positionContainerSmall}>
            <Text
              style={[
                styles.positionTextSmall,
                rank.toString().length >= 6 && {fontSize: 8},
                rank.toString().length >= 5 &&
                  rank.toString().length < 6 && {fontSize: 10},
                rank.toString().length >= 4 &&
                  rank.toString().length < 5 && {fontSize: 12},
                rank.toString().length >= 3 &&
                  rank.toString().length < 4 && {fontSize: 14},
                rank.toString().length >= 0 &&
                  rank.toString().length < 3 && {fontSize: 16},
              ]}>
              {rank}
            </Text>
          </FastImage>
        </TouchableOpacity>
      )}
    </View>
  );
};

/*
onScroll={(e) => {
                if(bestof_scoreboard_score_and_rank
                    && bestof_scoreboard_score_and_rank.rank !== '--') {
                    let offset = e.nativeEvent.contentOffset.y;
                    let currentIndex = Math.round(offset / 130);

                    let currentRank = -1;
                    if(currentIndex < usersList.length) {
                        if(usersList[currentIndex]) {
                            currentRank = usersList[currentIndex].position;
                        }
                    }

                    if((currentRank >= userRank-4 && currentRank <= userRank+2) || (currentRank === -1 || userRank === -1)) {
                        console.log("1 NOT TO SHOW: ", currentRank, userRank)
                        setShowTopUserCell(false);
                        setShowBottomUserCell(false);
                    } else if(currentRank < userRank) {
                        console.log("BOTTOM:", currentRank, userRank)
                        setShowTopUserCell(false);
                        setShowBottomUserCell(true);
                    } else if(currentRank > userRank) {
                        console.log("TOP", currentRank, userRank)
                        setShowTopUserCell(true);
                        setShowBottomUserCell(false);
                    } else {
                        console.log("2 NOT TO SHOW: ", currentRank, userRank)
                        setShowTopUserCell(false);
                        setShowBottomUserCell(false);
                    }
                }
            }}
 */

const WINDOW_WIDTH = Dimensions.get('window').width;
const PROFILE_IMAGE_WIDTH = 90;
const PROFILE_IMAGE_HEIGHT = 90;

const styles = StyleSheet.create({
  scoreItemContainer: {
    width: '90%',
    height: 130,
    flexDirection: 'row',
    marginTop: 30,
    padding: 12,
    paddingBottom: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: colors.WHITE,
    shadowColor: colors.lightGray,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 10,
    elevation: 10,
    zIndex: 100,
    overflow: 'visible',
  },
  profileImage: {
    width: PROFILE_IMAGE_WIDTH,
    height: PROFILE_IMAGE_HEIGHT,
    borderRadius: PROFILE_IMAGE_WIDTH,
  },
  positionContainer: {
    position: 'absolute',
    right: -7,
    top: -10,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  positionText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 16,
    color: colors.BESTOF2.BG1,
  },
  informationContainer: {
    width: WINDOW_WIDTH - PROFILE_IMAGE_WIDTH - 90,
    marginLeft: 15,
    marginTop: -3,
  },
  scoreContainer: {
    flexDirection: 'row',
    height: 27,
  },
  scoreImage: {
    width: 18,
    height: 18,
    marginTop: 7,
  },
  scoreText: {
    color: colors.ORANGE_TF,
    fontSize: 20,
    marginTop: 2.5,
    marginLeft: 5,
    fontFamily: 'Kalam-Bold',
  },
  nickNameText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 20,
    color: colors.BESTOF2.BG1,
  },
  facultyText: {
    marginTop: 1.5,
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    lineHeight: 16,
    color: colors.BESTOF2.BG1,
  },
  universityText: {
    marginTop: 1.5,
    width: '90%',
    flexWrap: 'wrap',
    overflow: 'hidden',
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 11,
    lineHeight: 12,
    color: colors.LIGHT_ALOE_TF,
  },
  friendImage: {
    position: 'absolute',
    width: 40,
    height: 40,
    right: 20,
    bottom: -6,
  },
  challengeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -20,
    width: 90,
    height: 45,
    borderRadius: 18,
    backgroundColor: colors.BESTOF2.BG1,
    marginBottom: 0,
  },
  challengeButtonText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 20,
    color: colors.WHITE,
  },
  playAgainButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -22,
    width: 180,
    height: '57%',
    minHeight: 45,
    borderRadius: 18,
    backgroundColor: colors.BESTOF2.BG1,
    marginBottom: 0,
  },
  playAgainButtonText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 20,
    color: colors.WHITE,
  },
  smallUserCell: {
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 55,
    backgroundColor: colors.WHITE,
    zIndex: 1000,
    elevation: 1000,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  profileImageSmall: {
    position: 'absolute',
    marginTop: 5,
    left: 10,
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  scoreContainerSmall: {
    position: 'absolute',
    flexDirection: 'row',
    height: 27,
    marginTop: 10,
    left: 65,
  },
  nickNameTextSmall: {
    position: 'absolute',
    marginTop: 13,
    left: 140,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 20,
    color: colors.BESTOF2.BG1,
  },
  positionContainerSmall: {
    position: 'absolute',
    top: 5,
    right: 3,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  positionTextSmall: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 15,
    color: colors.BESTOF2.BG1,
  },
});

export default ScoreboardFlatList;
