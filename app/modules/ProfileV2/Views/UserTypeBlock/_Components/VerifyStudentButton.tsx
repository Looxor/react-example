import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, constants, strings} from '../../../../../config';
import FastImage from 'react-native-fast-image';

export type TypeStatus = 'VERIFIED' | 'UNVERIFIED' | 'VERIFYING';

const DIDNT_VERIFY_ICON = require('../../../../../../assets/images/icons/icn_alert_bestofs.png');
const VERIFYING_ICON = require('../../../../../../assets/images/icons/hourglass.png');
const VERIFIED_ICON = require('../../../../../../assets/images/icons/icn_request_sent_successfully.png');

const VerifyStudentButton = props => {
  const {
    verify_status = 'UNVERIFIED',
    university_name,
    studytown,
    student_email,
    onVerifyPress,
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={constants.ACTIVE_OPACITY}
      onPress={onVerifyPress}
      style={styles.verifyButton}>
      <View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={styles.verifyButtonTitleText}>
            {verify_status === 'VERIFIED'
              ? strings.PROFILE.VERIFY_BUTTON.VERIFIED_AS_STUDENT
              : strings.PROFILE.VERIFY_BUTTON.VERIFY_AS_STUDENT}
          </Text>
          <FastImage
            resizeMode={'contain'}
            style={[styles.verifyIcon]}
            source={
              verify_status === 'UNVERIFIED'
                ? DIDNT_VERIFY_ICON
                : verify_status === 'VERIFYING'
                ? VERIFYING_ICON
                : verify_status === 'VERIFIED'
                ? VERIFIED_ICON
                : null
            }
          />
        </View>
        <Text style={styles.verifyButtonText}>
          {verify_status === 'VERIFIED' && (
            <Text style={styles.verifyEmail}>
              {student_email} {'\n'}
            </Text>
          )}
          {verify_status === 'UNVERIFIED'
            ? strings.PROFILE.VERIFY_BUTTON.DIDNT_VERIFY
            : verify_status === 'VERIFYING'
            ? strings.PROFILE.VERIFY_BUTTON.DIDNT_VERIFY_PENDING
            : verify_status === 'VERIFIED'
            ? `${university_name}\n${studytown}`
            : ''}
        </Text>
      </View>
      <FastImage
        resizeMode={'contain'}
        style={[styles.arrowIcon]}
        source={require('../../../../../../assets/images/icons/icn_right_dark_aloe.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  verifyButton: {
    minHeight: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: 25,
    borderRadius: 18,
    shadowColor: colors.lightGray,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 5,
    elevation: 3,
    borderColor: colors.white,
    marginVertical: 6,
    backgroundColor: colors.WHITE,
  },
  verifyButtonText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    color: colors.LIGHT_ALOE_TF,
    marginTop: 5,
    flexWrap: 'wrap',
    lineHeight: 18,
    marginLeft: 3,
  },
  verifyButtonTitleText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 21,
    color: colors.DARK_ALOE_TF,
    marginTop: -2,
    marginLeft: 3,
  },
  verifyIcon: {
    width: 22,
    height: 22,
    marginLeft: 10,
    marginTop: 1,
  },
  verifyEmail: {
    color: colors.DARK_ALOE_TF,
    lineHeight: 30,
  },
  arrowIcon: {
    width: 25,
    height: 25,
    position: 'absolute',
    right: 12,
    top: 13,
  },
});

export default VerifyStudentButton;
