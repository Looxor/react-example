import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { colors, constants } from "../../../config";

// user_id
// nickname
// profile_image_url
const PlayerBlock = props => {
  const {player, style, isBigger, hasCrown, showFaculty} = props;
  return (
    <View style={[styles.container, style]}>
      <FastImage
        style={[styles.profileImage, isBigger && styles.profileImageBigger]}
        source={{uri: player.profile_image_url}}
      />
      {hasCrown && (
        <FastImage
          style={[styles.crownImage, !isBigger && styles.crownImageSmaller]}
          source={require('../../../../assets/images/icons/icn_ranking_crown.png')}
        />
      )}
      <View style={styles.nickNameContainer}>
        <Text style={styles.nickNameText}>{player.nickname}</Text>
        {showFaculty && (
          <View
            style={{
              position: 'absolute',
              top: 40,
              width: 130,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={[styles.infoText, styles.infoTextBold]}
              numberOfLines={2}>
              {player.faculty_name}
            </Text>
            <Text style={[styles.infoText]} numberOfLines={2}>
              {player.university_name}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'visible',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: constants.onePixel,
    borderColor: colors.gray,
  },
  crownImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    zIndex: 2,
    top: -8,
    elevation: 1,
  },
  crownImageSmaller: {
    width: 95,
    height: 95,
    position: 'absolute',
    zIndex: 2,
    top: 12,
    elevation: 1,
  },
  profileImageBigger: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  nickNameContainer: {
    maxWidth: 200,
    backgroundColor: colors.WHITE,
    borderRadius: 13,
    paddingHorizontal: 13,
    paddingVertical: 6,
    shadowColor: colors.darkGray,
    shadowOpacity: 0.2,
    shadowOffset: {width: -5, height: -5},
    shadowRadius: 10,
    position: 'absolute',
    bottom: -25,
    zIndex: 3,
    elevation: 4,
  },
  nickNameText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    color: colors.BESTOF2.BG1,
    textAlign: 'center',
  },
  infoText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 12,
    color: colors.BESTOF2.BG1,
    textAlign: 'center',
    lineHeight: 13,
  },
  infoTextBold: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    marginBottom: 2,
  },
});

export default PlayerBlock;
