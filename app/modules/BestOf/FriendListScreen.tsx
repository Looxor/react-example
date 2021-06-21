import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import standardFunctions from "../../utils/app/StandardFunctions";
import styles from "./FriendListScreen.style";
import { constants, strings } from "../../config";
import { CallServerPromise } from "../../utils/app/CallServer";

import { routes } from "../../navigation/rootNavigation/navigation.constants";

import { CommonActions as StackActions, useNavigation } from "@react-navigation/native";

// MISSING StackActions

const showError = error => {
  return new Promise((resolve, eject) => {
    let title, message;
    switch (error.code) {
      case 111:
        title = strings.ALERTS.BESTOF.ERROR_WHILE_STARTING.TITLE;
        message = error.error;
        break;
      default:
        title = strings.ALERTS.BESTOF.ERROR_WHILE_STARTING.TITLE;
        message = strings.ALERTS.BESTOF.ERROR_WHILE_STARTING.MESSAGE;
    }
    standardFunctions.show_alert(title, message, true, () => {
      resolve(true);
    });
  });
};
const friendBestOfPressHandler = async (navigation, friend_id) => {
  try {
    const request = await CallServerPromise.start_bestof(friend_id);
    if (request.success) {
      const bestof_id = request.data.bestof_id;
      StackActions.navigate(routes.BESTOF_BATTLE, {
        bestof_id: bestof_id,
      });
    } else {
      await showError(request);
    }
  } catch (error) {
    showError(error);
  }
};

const renderItem = ({item, index, navigation}) => (
  <TouchableOpacity
    // @ts-ignore
    style={styles.selectButton}
    onPress={() => friendBestOfPressHandler(navigation, item.id)}>
    {item.profile_image_url ? (
      <FastImage
        style={styles.selectButtonImage}
        source={{uri: item.profile_image_url}}
      />
    ) : item.gender === 'M' ? (
      <FastImage
        style={styles.selectButtonImage}
        source={require('../../../assets/images/icons/icn_profile_man.png')}
      />
    ) : (
      <FastImage
        style={styles.selectButtonImage}
        source={require('../../../assets/images/icons/icn_profile_woman.png')}
      />
    )}

    <Text style={styles.selectButtonText}>
      {item.name} {'\n'}
      <Text style={styles.selectButtonText2}>{item.nickname}</Text>
    </Text>
    <FastImage
      style={styles.selectButtonImageRight}
      source={require('../../../assets/images/icons/icn_arrow_right_blu.png')}
    />
  </TouchableOpacity>
);

const FriendListScreen = props => {
  const navigation = useNavigation();
  const [friends, setFriends] = useState([]);
  const componentDidMount = () => {
    const loadFriendsList = async () => {
      try {
        const friends = [];
        const request = await CallServerPromise.get_faculty_friends();
        // const request = await CallServerPromise.get_friends();
        if (request.success) {
          request.data.map(friend => {
            friends.push({
              id: friend.friend_id,
              name: `${friend.friend_firstname} ${friend.friend_lastname}`,
              profile_image_url: friend.friend_profile_image_url,
              gender: friend.friend_gender,
              nickname: friend.friend_nickname,
            });
          });
          setFriends(friends);
        }
      } catch (error) {}
    };
    loadFriendsList();
    return componentWillUnmount;
  };
  const componentWillUnmount = () => {};
  useEffect(componentDidMount, []);

  return (
    <View style={styles.container}>
      {friends.length != 0 && (
        <Text style={styles.listCaption}>
          {strings.BESTOF.FRIEND_LIST_SCREEN_TEXT}
        </Text>
      )}
      <FlatList
        style={styles.buttonContainer}
        data={friends}
        renderItem={({item, index}) => renderItem({item, index, navigation})}
        ListEmptyComponent={() => (
          <Text
            style={{
              marginHorizontal: 10,
              marginTop: 10,
              alignSelf: 'center',
              fontFamily: constants.DEFAULT_FONT,
              fontSize: 16,
            }}>
            {strings.BESTOF.NO_FRIENDS_AVAILABLE}
          </Text>
        )}
      />
    </View>
  );
};

FriendListScreen.navigationOptions = {
  title: strings.BESTOF.FIRST_SCREEN_FRIEND_TEXT,
};

export default FriendListScreen;
