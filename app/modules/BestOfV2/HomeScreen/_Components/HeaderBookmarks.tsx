import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import { constants, sounds } from "../../../../config";
import standardFunctions from '../../../../utils/app/StandardFunctions';

const bookmarksData = [
  {
    id: 'history',
    externalIconEnabled: require('../../../../../assets/images/icons/icn_history_bookmark.png'),
    externalIconDisabled: require('../../../../../assets/images/icons/icn_bookmark_disabled.png'),
    internalIconEnabled: require('../../../../../assets/images/icons/icn_history_bookmark_internal.png'),
    internalIconDisabled: require('../../../../../assets/images/icons/icn_history_bookmark_internal_disabled.png'),
    soundOnTap: require('../../../../../assets/sounds/bestofs/menu_sounds/history_bookmark.wav'),
  },
  {
    id: 'game',
    externalIconEnabled: require('../../../../../assets/images/icons/icn_game_bookmark.png'),
    externalIconDisabled: require('../../../../../assets/images/icons/icn_bookmark_disabled.png'),
    internalIconEnabled: require('../../../../../assets/images/icons/icn_game_bookmark_internal.png'),
    internalIconDisabled: require('../../../../../assets/images/icons/icn_game_bookmark_internal_disabled.png'),
    soundOnTap: require('../../../../../assets/sounds/bestofs/menu_sounds/game_bookmark.wav'),
  },
  {
    id: 'scoreboard',
    externalIconEnabled: require('../../../../../assets/images/icons/icn_scoreboard_bookmark.png'),
    externalIconDisabled: require('../../../../../assets/images/icons/icn_bookmark_disabled.png'),
    internalIconEnabled: require('../../../../../assets/images/icons/icn_scoreboard_bookmark_internal.png'),
    internalIconDisabled: require('../../../../../assets/images/icons/icn_scoreboard_bookmark_internal_disabled.png'),
    soundOnTap: require('../../../../../assets/sounds/bestofs/menu_sounds/scoreboard_bookmark.wav'),

  },
  {
    id: 'subjects',
    externalIconEnabled: require('../../../../../assets/images/icons/icn_subjects_bookmark.png'),
    externalIconDisabled: require('../../../../../assets/images/icons/icn_bookmark_disabled.png'),
    internalIconEnabled: require('../../../../../assets/images/icons/icn_subjects_bookmark_internal.png'),
    internalIconDisabled: require('../../../../../assets/images/icons/icn_subjects_bookmark_internal_disabled.png'),
    soundOnTap: require('../../../../../assets/sounds/bestofs/menu_sounds/subjects_bookmark.wav'),
  },
];

const HeaderBookmarks = props => {
  const {
    selectedBookmark,
    setSelectedBookmark,
    showUpArrowIcon,
    showDownArrowIcon,
  } = props;

  const _setSelectedBookmark = index => {
    standardFunctions.play_sound_effect(bookmarksData[index].soundOnTap);
    setSelectedBookmark(index);
  };

  return (
    <View style={styles.container}>
      {bookmarksData &&
        bookmarksData.map((bookmark, index) => {
          return (
            <TouchableOpacity
              key={String(index)}
              style={styles.bookmarkContainer}
              activeOpacity={constants.ACTIVE_OPACITY}
              onPress={() => _setSelectedBookmark(index)}>
              <FastImage
                resizeMode={'contain'}
                style={[
                  selectedBookmark === index
                    ? styles.bookmarkEnabled
                    : styles.bookmarkDisabled,
                ]}
                source={
                  selectedBookmark === index
                    ? bookmark.externalIconEnabled
                    : bookmark.externalIconDisabled
                }>
                {(showUpArrowIcon || showDownArrowIcon) &&
                  bookmark.id === 'scoreboard' && (
                    <FastImage
                      resizeMode={'contain'}
                      style={[
                        styles.arrowIcon,
                        selectedBookmark === index && {bottom: 25},
                      ]}
                      source={
                        showUpArrowIcon
                          ? require('../../../../../assets/images/icons/icn_scoreboard_arrow_up.gif')
                          : require('../../../../../assets/images/icons/icn_scoreboard_arrow_down.gif')
                      }
                    />
                  )}
                <FastImage
                  resizeMode={'contain'}
                  style={[
                    selectedBookmark === index
                      ? styles.bookmarkInternalIcon
                      : styles.bookmarkInternalIconDisabled,
                  ]}
                  source={
                    selectedBookmark === index
                      ? bookmark.internalIconEnabled
                      : bookmark.internalIconDisabled
                  }
                />
              </FastImage>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bookmarkContainer: {
    alignItems: 'center',
    width: '24%',
  },
  bookmarkEnabled: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 130,
    marginTop: -33,
  },
  bookmarkDisabled: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    marginTop: -16,
  },
  bookmarkInternalIcon: {
    width: 32,
    height: 32,
    marginTop: -8,
  },
  bookmarkInternalIconDisabled: {
    width: 28,
    height: 28,
  },
  arrowIcon: {
    position: 'absolute',
    width: 30,
    height: 30,
    left: 2,
    bottom: 5,
    zIndex: 100,
  },
});

export default HeaderBookmarks;
