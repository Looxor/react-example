// Libraries //
import * as React from "react";
import { Dimensions, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { colors, constants, strings } from "../../config";
import { DataProvider } from "recyclerlistview";
// Configs //
import { styles } from "./UserDetailsScreen.style";
import { CallServer } from "../../utils/app/CallServer";

import StandardBottomButtons from "../../components/StandardBottomButtons";
import standardFunctions from "../../utils/app/StandardFunctions";
import { routes } from "../../navigation/rootNavigation/navigation.constants";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

interface Props {
  navigation: any;
}

interface State {
  user_data: any;
  profile_image_url: string;
  is_logged_user: boolean;
  is_pending_friendship: boolean;
  friendship_id: string;
  self: any;
  updateData: any;
  is_loading: boolean;
}

const boxWidth = Dimensions.get('window').width;
const boxHeight = 140;
const vOffset = 60;
const hOffset = 50;

class UserDetailsScreen extends React.Component<Props, State> {
  readonly state: State = {
    user_data: {},
    profile_image_url: '',
    is_logged_user: false,
    is_pending_friendship: false,
    friendship_id: '',
    self: null,
    updateData: () => {},
    is_loading: true,
  };

  constructor(props) {
    super(props);
    this.setState = this.setState.bind(this);
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam(
      'nickname',
      strings.FRIENDS.USER_DETAILS.PROFILE_TITLE,
    ),
  });

  updateUserData = data => {
    this.setState(data);
  };

  componentDidMount() {
    const {navigation} = this.props;
    let user_id = navigation.getParam('user_id', '');
    let firstname = navigation.getParam('firstname', '');
    let lastname = navigation.getParam('lastname', '');
    let is_logged_user = navigation.getParam('is_logged_user', false);
    let user_is_friend = navigation.getParam('user_is_friend', false);
    let user_is_student = navigation.getParam('is_student', false);
    let self = navigation.getParam('self', null);
    let updateData = navigation.getParam('updateData', () => {});
    CallServer.get_user_data_by_user_id(user_id, result => {
      if (result.success) {
        result.data['user_firstname'] = firstname;
        result.data['user_lastname'] = lastname;
        result.data['user_is_friend'] = user_is_friend;
        result.data['user_is_student'] = user_is_student;
        result.data['bestofs_won_count'] =
          result.data['user_bestofs_data']['bestofs_won_count'];
        result.data['bestofs_lost_count'] =
          result.data['user_bestofs_data']['bestofs_lost_count'];
        this.setState({
          user_data: result.data,
          profile_image_url: result.data['user_profile_image_url'],
          is_logged_user,
          self,
          updateData,
          is_loading: false,
        });
      }
    });
  }

  handleShowProfileImage = (image_url: string) => {
    const {navigation} = this.props;
    navigation.navigate(routes.USER_PROFILE_IMAGE, {
      image_url,
      show_edit_button: this.state.is_logged_user,
      updateUserData: this.updateUserData,
    });
  };

  handleStartBestOf = () => {
    const {navigation} = this.props;
  };

  handleAddFriend = () => {
    const {navigation} = this.props;
    if (navigation.getParam('is_pending_friendship', false)) {
      CallServer.respond_to_friendship_request(
        navigation.getParam('friendship_id', false),
        'accepted_by_user',
        result1 => {
          CallServer.get_pending_friendship_requests(result2 => {
            CallServer.get_friends(result3 => {
              if (!result1.success || !result2.success || !result3.success) {
                standardFunctions.show_alert(
                  strings.ALERTS.FRIENDS.FRIEND_ADDED.FAIL.TITLE,
                  strings.ALERTS.FRIENDS.FRIEND_ADDED.FAIL.MESSAGE,
                );
                return;
              }

              this.state.self.setState({
                pending_friendship_requests: result2.data,
              });
              this.state.updateData({
                pending_friendship_requests: result2.data,
                users_list: result3.data,
                dataProvider: new DataProvider((r1, r2) => {
                  return r1 !== r2;
                }).cloneWithRows([{}, {}, {}, {}].concat(result3.data)),
              });

              let ok_button = () => {
                const onBackPress = navigation.getParam('onBackPress');
                onBackPress && onBackPress();
                navigation.goBack(null);
              };

              standardFunctions.show_alert_with_button(
                strings.ALERTS.FRIENDS.FRIEND_ADDED.SUCCESS.TITLE,
                strings.ALERTS.FRIENDS.FRIEND_ADDED.SUCCESS.MESSAGE,
                'OK',
                ok_button,
                false,
              );
            });
          });
        },
      );
    } else {
      CallServer.send_friend_request(
        navigation.getParam('user_id', ''),
        result => {
          if (result.success) {
            let ok_button = () => {
              const onBackPress = navigation.getParam('onBackPress');
              onBackPress && onBackPress();
              navigation.goBack(null);
            };

            standardFunctions.show_alert_with_button(
              strings.ALERTS.FRIENDS.FRIEND_ADDED.SUCCESS.TITLE,
              strings.ALERTS.FRIENDS.FRIEND_ADDED.SUCCESS.MESSAGE,
              'OK',
              ok_button,
              false,
            );
          } else {
            standardFunctions.show_alert(
              strings.ALERTS.FRIENDS.FRIEND_ADDED.FAIL.TITLE,
              strings.ALERTS.FRIENDS.FRIEND_ADDED.FAIL.MESSAGE,
            );
          }
        },
      );
    }
  };

  handleRemoveFriend = () => {
    const {navigation} = this.props;
    CallServer.remove_friendship(navigation.getParam('user_id', ''), result => {
      if (result.success) {
        let ok_button = () => {
          const onBackPress = navigation.getParam('onBackPress');
          onBackPress && onBackPress();
          navigation.goBack(null);
        };

        standardFunctions.show_alert_with_button(
          strings.ALERTS.FRIENDS.FRIEND_REMOVED.SUCCESS.TITLE,
          strings.ALERTS.FRIENDS.FRIEND_REMOVED.SUCCESS.MESSAGE,
          'OK',
          ok_button,
          false,
        );
      } else {
        standardFunctions.show_alert(
          strings.ALERTS.FRIENDS.FRIEND_REMOVED.FAIL.TITLE,
          strings.ALERTS.FRIENDS.FRIEND_REMOVED.FAIL.MESSAGE,
        );
      }
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            backgroundColor: colors.WHITE,
            width: '100%',
            height: '50%',
            position: 'absolute',
            zIndex: -2,
          }}
        />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: colors.DEFAULT_BACKGROUND,
          }}>
          <Svg
            height={boxHeight}
            width={boxWidth}
            viewBox={`0 0 ${boxWidth} ${boxHeight}`}>
            <Defs>
              <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor={colors.WHITE} stopOpacity="1" />
                <Stop offset="100%" stopColor={colors.WHITE} stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Path
              d={`M -${hOffset},0 L -${hOffset},${boxHeight} C -${hOffset},${
                boxHeight - vOffset
              } ${boxWidth + hOffset},${boxHeight - vOffset} ${
                boxWidth + hOffset
              },${boxHeight} l 0, -${boxHeight}`}
              fill="url(#grad)"
              // fill={colors.WHITE}
            />
          </Svg>
          <View style={styles.top_view}>
            <TouchableOpacity
              activeOpacity={constants.ACTIVE_OPACITY}
              onPress={() => {
                this.handleShowProfileImage(
                  this.state.user_data.user_profile_image_url,
                );
              }}>
              <FastImage
                source={{uri: this.state.profile_image_url}}
                style={styles.profile_image}
              />
            </TouchableOpacity>
            <Text style={styles.data_title_top}>
              {this.state.user_data.user_firstname}{' '}
              {this.state.user_data.user_lastname}
            </Text>
            <Text
              style={[
                styles.data_text_top,
                {fontSize: 18, fontFamily: constants.DEFAULT_FONT_MEDIUM},
              ]}>
              {this.state.user_data.user_nickname}
            </Text>
            <Text style={styles.data_text_top}>
              {this.state.user_data.user_faculty_name}
            </Text>
            <Text style={styles.data_text_top}>
              {this.state.user_data.user_university_name}
            </Text>
            {this.state.user_data.is_student && (
              <Text style={styles.data_text_top}>
                {strings.FRIENDS.USER_DETAILS.STUDYTOWN_DESCRIPTION}
                {this.state.user_data.user_studytown}
              </Text>
            )}
          </View>
          {!this.state.is_loading && (
            <View style={styles.scores_view}>
              <View style={styles.left_scores}>
                <Text style={styles.data_text_scores}>
                  {strings.FRIENDS.USER_DETAILS.FRIENDS_LABEL}
                </Text>
                <Text style={styles.data_title_scores}>
                  {this.state.user_data.user_friends_count}
                </Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.right_scores}>
                {this.state.user_data.user_is_student && (
                  <View>
                    <Text style={styles.data_text_scores}>
                      {strings.FRIENDS.USER_DETAILS.SCORES_LABEL}
                    </Text>
                    <Text style={styles.data_title_scores}>
                      {this.state.user_data.user_contest_score}
                    </Text>
                    <Text style={styles.data_text_scores}>
                      {this.state.user_data.user_contest_position}°{' '}
                      {strings.FRIENDS.USER_DETAILS.SCOREBOARD_LABEL}
                    </Text>
                  </View>
                )}
                {!this.state.user_data.user_is_student && (
                  <Text style={styles.data_text_scores}>
                    {'\n'}
                    {strings.FRIENDS.USER_DETAILS.NOT_IN_SCOREBOARD_LABEL}
                  </Text>
                )}
              </View>
            </View>
          )}
          {!this.state.is_loading && (
            <View style={styles.stats_view}>
              <FastImage
                source={require('../../../assets/images/icons/icn_stats.png')}
                style={styles.stats_image}
              />
              <View style={styles.stats_texts}>
                <Text style={styles.data_text_scores}>
                  {strings.FRIENDS.USER_DETAILS.WON_BESTOFS}
                </Text>
                <Text style={styles.data_text_scores}>
                  {strings.FRIENDS.USER_DETAILS.LOST_BESTOFS}
                </Text>
              </View>
              <View style={styles.stats_data}>
                <Text
                  style={{
                    fontFamily: constants.DEFAULT_FONT_BOLD,
                    fontSize: 16,
                  }}>
                  {this.state.user_data.bestofs_won_count}
                </Text>
                <Text
                  style={{
                    fontFamily: constants.DEFAULT_FONT_BOLD,
                    fontSize: 16,
                  }}>
                  {this.state.user_data.bestofs_lost_count}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
        {!this.state.is_loading &&
          (!this.state.is_logged_user || this.state.is_pending_friendship) && (
            <View style={{alignItems: 'center', height: 70}}>
              <StandardBottomButtons
                main_button_label={
                  this.state.user_data.user_is_friend
                    ? strings.FRIENDS.USER_DETAILS.REMOVE_FRIEND_BUTTON
                    : strings.FRIENDS.USER_DETAILS.ADD_FRIEND_BUTTON
                }
                main_button_color={colors.THEFACULTY}
                main_button_visible={true}
                secondary_button_label={''}
                secondary_button_color={colors.THEFACULTY}
                secondary_button_visible={false}
                onPressMain={
                  this.state.user_data.user_is_friend
                    ? this.handleRemoveFriend
                    : this.handleAddFriend
                }
                onPressSecondary={() => {}}
              />
            </View>
          )}
      </SafeAreaView>
    );
  }
}

export default UserDetailsScreen;
