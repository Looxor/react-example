import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, constants, strings} from '../../../../config';
import FastImage from 'react-native-fast-image';
import UserTypeHeader from '../FacultyButtonBlock/_Components/UserTypeHeader';
import UniversityTypeBlock from './_Components/UniversityTypeBlock';
import HighSchoolTypeBlock from './_Components/HighSchoolTypeBlock';
import NonStudentTypeBlock from './_Components/NonStudentTypeBlock';
import NavigationService from '../../../../utils/app/NavigationService';
import {routes} from '../../../../navigation/rootNavigation/navigation.constants';
import {CallServerPromise} from '../../../../utils/app/CallServer';
import {MESSAGE_TYPE, showMessage} from '../StudentVerify/StudentEmailVerify';
import standardFunctions from '../../../../utils/app/StandardFunctions';
import VerifyStudentButton from './_Components/VerifyStudentButton';

const USER_TYPE_BUTTONS = [
  {
    text: strings.PROFILE.USER_TYPE.UNIVERSITY,
    image: require('../../../../../assets/images/icons/icn_university_profile.png'),
  },
  {
    text: strings.PROFILE.USER_TYPE.HIGH_SCHOOL,
    image: require('../../../../../assets/images/icons/icn_high_school_profile.png'),
  },
  {
    text: strings.PROFILE.USER_TYPE.NON_STUDENT,
    image: require('../../../../../assets/images/icons/icn_not_student_profile.png'),
  },
];

const UserTypeBlock = props => {
  const {
    rewards,
    studytown,
    student_email,
    university_name,
    coin,
    selectedButtonIndex,
    email_verification_in_progress,
    card_verification_in_progress,
  } = props.userTypeBlockData;
  const verifying =
    email_verification_in_progress || card_verification_in_progress;

  const verify_status =
    student_email !== undefined && student_email !== ''
      ? 'VERIFIED'
      : verifying === true
      ? 'VERIFYING'
      : 'UNVERIFIED';

  const {
    onSaveUserTypeBlock,
    savingUserTypeData,
    onAfterConfirmedStudentEmail,
    onAfterConfirmedStudentCard,
    auto_enable_university_type,
    view,
  } = props;

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [saveButtonState, setSaveButtonState] = useState(false);
  const [mode, setMode] = useState(
    auto_enable_university_type ? 'edit' : 'view',
  );
  const [aeut, setAeut] = useState(auto_enable_university_type);

  const onPressUserType = async index => {
    standardFunctions.play_tap_sound();
    setAeut(false);
    setSelectedIndex(index);
    props.userTypeBlockData.selectedButtonIndex = index;
    setMode('edit');
  };
  const onSaveUserType = async () => {
    standardFunctions.add_firebase_event_log(
      'profile',
      'btn_sv_type_data_clicked',
    );
    // setMode('view')
    onSaveUserTypeBlock && (await onSaveUserTypeBlock(selectedIndex));
    setMode('view');
  };
  const onModifyUserType = () => {
    setMode('edit');
    // NavigationService.navigate(routes.PROFILE_CONFIRM_EMAIL);
  };
  const onChangeSaveButtonState = state => {
    setSaveButtonState(state);
  };

  const onPressShowVerifyScreen = async () => {
    try {
      standardFunctions.play_tap_sound();
      const request: any =
        await CallServerPromise.check_is_verify_student_available();
      if (
        request.success &&
        request.data &&
        request.data.is_available === true
      ) {
        // @ts-ignore
        global.navigationData = {
          onAfterConfirmedStudentEmail: () => {
            onAfterConfirmedStudentEmail && onAfterConfirmedStudentEmail();
          },
          onAfterConfirmedStudentCard: () => {
            onAfterConfirmedStudentCard && onAfterConfirmedStudentCard();
          },
          onReturn: () => {},
        };
        NavigationService.navigate(routes.PROFILE_STUDENT_VERIFY_EMAIL);
      } else {
        console.log("It's not available to verify student email", request);
        showMessage(MESSAGE_TYPE.CANT_VERIFY_STUDENT_EMAIL);
      }
    } catch (error) {
      console.log("It's not available to verify student email", error);
      showMessage(MESSAGE_TYPE.CANT_VERIFY_STUDENT_EMAIL);
    }
  };

  useEffect(() => {
    setSelectedIndex(props.selectedButtonIndex);
  }, [props.selectedButtonIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.marginContainer}>
        <UserTypeHeader
          show_coins={rewards && !rewards.type_data}
          coin={coin}
          mode={'edit'}
          savingUserTypeData={savingUserTypeData}
          saveButtonState={saveButtonState}
          onSaveUserType={onSaveUserType}
          onModifyUserType={onModifyUserType}
          buttonStyle={{fontSize: 17}}
        />
        <View style={styles.userTypeButtonContainer}>
          {USER_TYPE_BUTTONS.map((button, index) => (
            <TouchableOpacity
              key={String(index)}
              activeOpacity={constants.ACTIVE_OPACITY}
              style={[
                styles.userTypeButton,
                (aeut && index === 0) || (!aeut && index === selectedIndex)
                  ? styles.userTypeButtonSelected
                  : {borderColor: colors.DEFAULT_PLACEHOLDER},
              ]}
              onPress={() => onPressUserType(index)}>
              <FastImage
                style={styles.userTypeButtonImage}
                source={button.image}
              />
              <Text style={styles.userTypeButtonText}>{button.text}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {(aeut || selectedIndex === 0) && (
          <VerifyStudentButton
            verify_status={verify_status}
            university_name={university_name}
            studytown={studytown}
            student_email={student_email}
            onVerifyPress={onPressShowVerifyScreen}
          />
        )}
        {(aeut || selectedIndex === 0) && (
          <UniversityTypeBlock
            userTypeBlockData={props.userTypeBlockData}
            view={view}
            style={styles.blockType0}
          />
        )}
        {!aeut && selectedIndex === 1 && (
          <HighSchoolTypeBlock
            userTypeBlockData={props.userTypeBlockData}
            onChangeSaveButtonState={onChangeSaveButtonState}
            view={view}
            style={styles.blockType}
          />
        )}
        {!aeut && selectedIndex === 2 && (
          <NonStudentTypeBlock
            userTypeBlockData={props.userTypeBlockData}
            onChangeSaveButtonState={onChangeSaveButtonState}
            view={view}
            style={styles.blockType}
          />
        )}
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
    marginBottom: 50,
    marginHorizontal: 15,
  },
  userTypeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  userTypeButton: {
    width: '30%',
    height: 100,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: colors.WHITE,
    borderWidth: 3,
    borderColor: 'transparent',
    borderRadius: 20,
    shadowColor: colors.lightGray,
    shadowOpacity: 0.2,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 8,
    elevation: 10,
  },
  userTypeButtonSelected: {
    borderColor: colors.DARK_ALOE_TF,
  },
  userTypeButtonImage: {
    width: 40,
    height: 40,
  },
  userTypeButtonText: {
    fontFamily: constants.DEFAULT_FONT,
    color: colors.DARK_ALOE_TF,
    fontSize: 15,
    textAlign: 'center',
  },
  blockType0: {
    marginTop: 10,
  },
  blockType: {
    marginTop: 20,
  },
  verifyButton: {
    minHeight: 100,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: 25,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.THEFACULTY,
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
  },
  verifyButtonDisabled: {
    borderWidth: constants.onePixel,
    borderColor: colors.gray,
  },
  verifyButtonText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 16,
    color: colors.darkGray,
    width: '90%',
  },
  verifyButtonDisabledText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    color: colors.gray,
  },
  verifyEmptyDataTitle: {
    fontSize: 18,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    color: colors.THEFACULTY,
  },
  verifyEmptyData: {
    fontFamily: constants.DEFAULT_FONT_ITALIC,
    color: colors.THEFACULTY,
  },
  textUniversity: {
    fontSize: 16,
  },
  textStudytown: {
    fontFamily: constants.DEFAULT_FONT_ITALIC,
  },
  textEmail: {
    fontSize: 15,
  },
  verifyInProgress: {
    fontFamily: constants.DEFAULT_FONT_ITALIC,
    fontSize: 13,
    color: colors.THEFACULTY,
  },
  verifyInProgressDisabled: {
    color: colors.gray,
  },
  arrowIcon: {
    width: 25,
    height: 25,
  },
  arrowIconDisabled: {
    tintColor: colors.lightGray,
  },
  refreshButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.THEFACULTY,
    marginTop: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshButtonText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
  },
});

export default UserTypeBlock;
