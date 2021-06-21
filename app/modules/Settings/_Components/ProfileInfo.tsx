import React from "react";

import { StyleSheet, Text, View } from "react-native";
import { Path, Svg } from "react-native-svg";

import { colors, constants, strings } from "../../../config";

import FastImage from "react-native-fast-image";
import { UserData } from "../../../config/constants";

const ProfileInfo = props => {
  const user = props.user;
  const profile_image_url = user.d('profile_image_url');
  const userData = UserData.getUserData();
  return (
    <View style={styles.container2}>
      <View style={styles.profileImageBox}>
        {profile_image_url ? (
          <FastImage
            style={[styles.profileImage, styles.profileImage2]}
            source={{uri: profile_image_url}}
          />
        ) : (
          <FastImage
            style={styles.profileImage}
            source={require('../../../../assets/images/icons/icn_profile_empty_big.png')}
          />
        )}
      </View>
      <View>
        <Svg
          style={{flex: 1, width: '100%', marginTop: -80}}
          viewBox="0 0 100 5">
          <Path
            d="M 0,5 C 0,0,100,0,100,5 L 5,5 L 0,5"
            fill={colors.DEFAULT_BACKGROUND}
          />
        </Svg>
      </View>
      <View style={styles.profileInfoBox}>
        <Text style={styles.name}>
          {user.getName()}
          <Text style={styles.age}>
            {
              // {', '}
              // {user.getAge()}
            }
          </Text>
        </Text>
        <Text style={styles.nickname}>{user.d('nickname')}</Text>
        <Text style={styles.email}>{user.d('email')}</Text>
        {userData.is_student && (
          <Text style={styles.university_name}>
            {user.d('university_name')}
          </Text>
        )}
        {userData.is_student && (
          <Text style={styles.studytown}>
            <FastImage
              style={styles.pin_icon}
              source={require('../../../../assets/images/icons/icn_pin_location.png')}
            />{' '}
            {strings.SETTINGS.SETTINGS_HOME.STUDY_AT}
            {user.d('studytown')}
          </Text>
        )}
      </View>
    </View>
  );
};

const boxHeight = 130;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
  },
  profileImageBox: {
    width: '100%',
    height: boxHeight - 5,
    alignItems: 'center',
    overflow: 'visible',
    zIndex: 3,
  },
  profileImage: {
    width: 100,
    height: 100,
    position: 'absolute',
    zIndex: 2,
    top: 30,
  },
  profileImage2: {
    borderRadius: 50,
  },
  profileInfoBox: {
    zIndex: 2,
    flex: 1,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    marginTop: -33,
    paddingTop: 45,
    alignItems: 'center',
  },
  name: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 20,
    color: colors.BLACK,
  },
  age: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 16,
    color: colors.darkGray,
  },
  nickname: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 16,
  },
  university_name: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    color: colors.darkGray,
  },
  email: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    color: colors.darkGray,
  },
  studytown: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    color: colors.darkGray,
  },
  pin_icon: {
    height: 11,
    width: 11,
  },
});

export default ProfileInfo;
