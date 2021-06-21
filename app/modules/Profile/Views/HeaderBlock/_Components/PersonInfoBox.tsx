import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { colors, constants } from "../../../../../config";

const PersonInfoBox = props => {
  const {nickName, fullName, email, profile_image_url} = props;
  const [new_profile_image_url, setNewProfileImageUrl] =
    useState(profile_image_url);

  return (
    <View style={styles.container}>
      <View style={styles.personImageIconContainer}>
        <FastImage
          style={styles.personImageIcon}
          source={
            profile_image_url !== undefined && profile_image_url !== ''
              ? {uri: new_profile_image_url}
              : require('../../../../../../assets/images/icons/icn_profile_other_blue.png')
          }
        />
      </View>
      <View style={styles.nameAndEmailContainer}>
        <Text style={styles.nickName}>{nickName}</Text>
        <Text style={styles.fullName}>{fullName}</Text>
        <View style={styles.emailContainer}>
          {/*<FastImage style={styles.emailIcon} source={require('../../../../../../assets/images/icons/icn_email.png')} />*/}
          <Text style={styles.emailText}>{email}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 20,
  },
  personImageIconContainer: {
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.gray,
    shadowOpacity: 0.7,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 5,
    elevation: 10,
  },
  personImageIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  nameAndEmailContainer: {
    flexDirection: 'column',
    marginLeft: 18,
  },
  nickName: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 22,
    color: colors.WHITE,
  },
  fullName: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 16,
    color: colors.WHITE,
    marginVertical: 2,
  },
  emailContainer: {
    width: 220,
    flexDirection: 'row',
  },
  emailIcon: {
    width: 12,
    height: 10,
    marginTop: 4,
    marginRight: 2,
  },
  emailText: {
    width: '100%',
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 13,
    color: colors.WHITE,
    flex: 1,
    flexShrink: 1,
  },
});

export default PersonInfoBox;
