import React from "react";
import { StyleSheet, Text, View } from "react-native";

import FastImage from "react-native-fast-image";

import { colors, constants, strings } from "../../../config";
import Strings from "../../../utils/misc/TextComponents";

const ProfileImages = props => {
  const {myImage, opponentImage, opponentName} = props;

  return (
    <View style={styles.profiles}>
      <View style={[styles.profile, styles.profile1]}>
        <FastImage
          style={styles.profileImage}
          source={
            myImage
              ? {uri: myImage}
              : require('../../../../assets/images/icons/icn_profile_other_blue.png')
          }
        />
        <Text style={styles.profileText}>{strings.BESTOF.YOU}</Text>
      </View>
      <View style={[styles.profile, styles.profile2]}>
        <Text style={styles.profileText}>
          {opponentName !== '' &&
          opponentName !== strings.BESTOF.BATTLE_SCREEN.NO_OPPONENT_NAME
            ? opponentName
            : Strings.capitalize(strings.BESTOF.BATTLE_SCREEN.NO_OPPONENT_NAME)}
        </Text>
        <FastImage
          style={styles.profileImage}
          source={
            opponentImage
              ? {uri: opponentImage}
              : require('../../../../assets/images/icons/icn_profile_other_blue.png')
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profiles: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    marginTop: 10,
    padding: 10,
    justifyContent: 'space-between',
  },
  profile: {
    width: '50%',
    height: '100%',
    flexDirection: 'row',
  },
  profile1: {
    justifyContent: 'flex-start',
  },
  profile2: {
    justifyContent: 'flex-end',
  },
  profileImage: {
    width: 60,
    height: 60,
    backgroundColor: colors.WHITE,
    borderRadius: 50,
  },
  profileText: {
    fontFamily: constants.DEFAULT_FONT,
    height: 60,
    lineHeight: 60,
    fontSize: 16,
    marginHorizontal: 7,
  },
});

export default ProfileImages;
