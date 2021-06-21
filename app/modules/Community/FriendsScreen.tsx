// Libraries //
import React from "react";
import { ActivityIndicator, Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { LayoutProvider, RecyclerListView } from "recyclerlistview";
import FastImage from "react-native-fast-image";
// Configs //
import { colors, constants, strings } from "../../config";

import FriendBox from "./_Components/FriendBox";
import FriendBoxWithButtons from "./_Components/FriendBoxWithButtons";
import { styles } from "./FriendsScreen.style";
import useFriendScreenViewModel, { LIST_TYPE } from "./ViewModels/FriendScreenViewModel";
import SearchBoxItem from "../Test/CommonComponents/SearchBoxItem";

const _layoutProvider = new LayoutProvider(
  index => {
    if (index < 4) {
      return index;
    } else {
      return 4;
    }
  },
  (type, dim) => {
    dim.width = Dimensions.get('window').width;
    dim.height = 100;
  },
);

const FriendsScreen = props => {
  const view = useFriendScreenViewModel({props});

  const _rowRenderer = (type, data) => {
    if (view.listType === LIST_TYPE.FRIENDS) {
      return (
        <FriendBox
          data={data}
          onPress={() => {
            view.openUserPage(
              data.friend_id,
              data.friend_nickname,
              data.friend_firstname,
              data.friend_lastname,
              true,
            );
          }}
        />
      );
    } else if (view.listType === LIST_TYPE.USERS) {
      return (
        <FriendBoxWithButtons
          data={data}
          onPress={() => {
            view.openUserPage(
              data.user_id,
              data.nickname,
              data.firstname,
              data.lastname,
              false,
            );
          }}
        />
      );
    }
  };

  return (
    <View style={styles.safeArea}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[colors.COMMUNITY.START, colors.COMMUNITY.FINISH]}
        style={styles.containerRow_first}>
        <Image
          source={require('../../../assets/images/icons/icn_friends_light.png')}
          style={styles.image_first}
        />
        <Text style={styles.rowTitle_top}>
          {String(view.friends.length)}
          <Text style={styles.rowText_top}>
            {'\n'}
            {strings.FRIENDS.FRIENDS_LABEL}
          </Text>
        </Text>
      </LinearGradient>
      {view.pending_friends.length > 0 && (
        <TouchableOpacity
          activeOpacity={constants.ACTIVE_OPACITY}
          onPress={() => view.openPendingFriendshipRequestsPage()}
          style={{height: 80, margin: 0}}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[colors.COMMUNITY.START, colors.COMMUNITY.FINISH]}
            style={styles.containerRow_second}>
            <Text style={[styles.rowText_top, {color: colors.WHITE}]}>
              {strings.FRIENDS.NEW_PENDING_REQUESTS}
            </Text>
            <View
              style={{
                position: 'absolute',
                right: 40,
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: colors.RED_TF,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: colors.WHITE,
                  alignSelf: 'center',
                }}>
                {view.pending_friends.length}
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                right: 10,
                width: 28,
                height: 28,
                borderRadius: 14,
                justifyContent: 'center',
              }}>
              <FastImage
                source={require('../../../assets/images/icons/icn_arrow_right_white.png')}
                style={{width: 28, height: 28}}
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      )}
      <View style={{height: 60, width: '100%'}}>
        <View style={{width: '96%', alignSelf: 'center', marginBottom: 10}}>
          <SearchBoxItem
            label={strings.FRIENDS.SEARCH_FRIEND_PLACEHOLDER}
            onSearch={searchKey => view.updateSearchKey(searchKey)}
          />
        </View>
      </View>
      <View>
        <Text style={styles.rowText_third}>
          {view.listType === LIST_TYPE.USERS
            ? strings.FRIENDS.SEARCHING_LABEL
            : strings.FRIENDS.YOUR_FRIENDS_LABEL}
        </Text>
        {view.loading && (
          <View style={{marginTop: 100}}>
            <ActivityIndicator size="small" />
          </View>
        )}
      </View>
      {!view.loading && view.dataProvider.getSize() > 0 && (
        <RecyclerListView
          style={{width: '100%'}}
          rowRenderer={_rowRenderer}
          dataProvider={view.dataProvider}
          layoutProvider={_layoutProvider}
        />
      )}
    </View>
  );
};

FriendsScreen.navigationOptions = {
  title: strings.SECTIONS.FRIENDS,
};

export default FriendsScreen;
