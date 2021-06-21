import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors, constants, strings} from '../../../../config';
import NavigationService from '../../../../utils/app/NavigationService';
import {routes} from '../../../../navigation/rootNavigation/navigation.constants';
import standardFunctions from '../../../../utils/app/StandardFunctions';
import {UserData} from '../../../../config/constants';

const FacultyButtonBlock = props => {
  const {faculty_name, user, onAfterSaveFaculty, onLayout} = props;
  const showEditFacultyScreen = () => {
    standardFunctions.play_tap_sound();
    standardFunctions.add_firebase_event_log(
      'profile',
      'select_faculty_opened',
    );
    // @ts-ignore
    global.navigationData = {
      onAfterSaveFaculty,
      user,
    };
    NavigationService.navigate(routes.SETTINGS_EDIT_FACULTY);
  };
  return (
    <View onLayout={onLayout} style={styles.container}>
      <View style={styles.marginContainer}>
        <Text style={styles.facultyTitle}>
          {strings.PROFILE.HOME.FACULTY_TITLE}
        </Text>
        <TouchableOpacity
          activeOpacity={constants.ACTIVE_OPACITY}
          style={[styles.buttonContainer]}
          onPress={showEditFacultyScreen}>
          <FastImage
            resizeMode={'contain'}
            style={styles.facultyIcon}
            source={
              UserData.getUserData().faculty_image_url
                ? {uri: UserData.getUserData().faculty_image_url}
                : {}
            }
          />
          <Text style={[styles.text]}>
            {faculty_name || strings.PROFILE.HOME.SELECT_FACULTY}
          </Text>
          <FastImage
            resizeMode={'contain'}
            style={styles.rightIcon}
            source={require('../../../../../assets/images/icons/icn_right_dark_aloe.png')}
          />
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <FastImage
            style={styles.infoIcon}
            source={require('../../../../../assets/images/icons/icn_info_aloe.png')}
          />
          <Text style={styles.infoText}>
            {strings.PROFILE.HOME.FACULTY_INFO}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
  },
  marginContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  facultyIcon: {
    position: 'absolute',
    left: 15,
    width: 20,
    height: 20,
  },
  facultyTitle: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    color: colors.DARK_ALOE_TF,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 10,
    backgroundColor: colors.WHITE,
    borderRadius: 18,
    shadowColor: colors.lightGray,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 5,
    elevation: 3,
    borderColor: colors.white,
    marginVertical: 6,
  },
  text: {
    left: 26,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 18,
    color: colors.DARK_ALOE_TF,
  },
  rightIcon: {
    width: 25,
    height: 25,
    marginRight: -2,
  },
  infoContainer: {
    marginTop: 6,
    marginLeft: 5,
    flexDirection: 'row',
  },
  infoIcon: {
    width: 14,
    height: 14,
    marginRight: 5,
    marginTop: -2,
  },
  infoText: {
    marginRight: 20,
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 13,
    color: colors.LIGHT_ALOE_TF,
    lineHeight: 14,
  },
});

export default FacultyButtonBlock;
