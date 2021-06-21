import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors, constants} from '../../../../../config';

const PersonInfoBox = props => {
  const {nickName, profile_image_url} = props;
  return (
    <View style={styles.container}>
      <View style={styles.personImageIconContainer}>
        <FastImage
          style={styles.personImageIcon}
          source={
            profile_image_url !== undefined && profile_image_url !== ''
              ? {uri: profile_image_url}
              : require('../../../../../../assets/images/icons/icn_profile_other_blue.png')
          }
        />
      </View>
      <View style={styles.nameAndEmailContainer}>
        <Text style={styles.nickName}>{nickName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 5,
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
    marginTop: 5,
  },
  nickName: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 23,
    color: colors.WHITE,
  },
});

export default PersonInfoBox;
