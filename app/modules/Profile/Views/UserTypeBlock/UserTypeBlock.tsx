import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, constants, strings } from "../../../../config";
import FastImage from "react-native-fast-image";
import UserTypeHeader from "../FacultyButtonBlock/_Components/UserTypeHeader";
import UniversityTypeBlock from "./_Components/UniversityTypeBlock";
import HighSchoolTypeBlock from "./_Components/HighSchoolTypeBlock";
import NonStudentTypeBlock from "./_Components/NonStudentTypeBlock";
import NavigationService from "../../../../utils/app/NavigationService";
import { routes } from "../../../../navigation/rootNavigation/navigation.constants";
import { CallServerPromise } from "../../../../utils/app/CallServer";
import { MESSAGE_TYPE, showMessage } from "../StudentVerify/StudentEmailVerify";
import standardFunctions from "../../../../utils/app/StandardFunctions";
import BlinkingText from "./_Components/BlinkingText";

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
    studytown,
    student_email,
    university_name,
    coin,
    rewards,
    selectedButtonIndex,
    email_verification_in_progress,
    card_verification_in_progress,
    editLabelToShow,
  } = props.userTypeBlockData;

  const {
    onSaveUserTypeBlock,
    savingUserTypeData,
    onAfterConfirmedStudentEmail,
    onAfterConfirmedStudentCard,
    auto_enable_university_type,
  } = props;

  const defaultVerifyButtonDisabled =
    email_verification_in_progress || card_verification_in_progress;

  const [verifyButtonDisabled, setVerifyButtonDisabled] = useState(
    defaultVerifyButtonDisabled,
  );
  const [selectedIndex, setSelectedIndex] = useState(selectedButtonIndex);
  const [saveButtonState, setSaveButtonState] = useState(false);
  const [mode, setMode] = useState(
    auto_enable_university_type ? 'edit' : 'view',
  );
  const [aeut, setAeut] = useState(auto_enable_university_type);

  const onPressUserType = async index => {
    if (mode === 'view') {
      hightlightButton();
      return;
    }
    setAeut(false);
    setSelectedIndex(index);
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
      setVerifyButtonDisabled(true);
      const request: any =
        await CallServerPromise.check_is_verify_student_available();
      setVerifyButtonDisabled(false);
      if (
        request.success &&
        request.data &&
        request.data.is_available === true
      ) {
        // @ts-ignore
        global.navigationData = {
          onAfterConfirmedStudentEmail: () => {
            setVerifyButtonDisabled(false);
            onAfterConfirmedStudentEmail && onAfterConfirmedStudentEmail();
          },
          onAfterConfirmedStudentCard: () => {
            setVerifyButtonDisabled(false);
            onAfterConfirmedStudentCard && onAfterConfirmedStudentCard();
          },
          onReturn: () => {
            setVerifyButtonDisabled(false);
          },
        };
        NavigationService.navigate(routes.PROFILE_STUDENT_VERIFY_EMAIL);
      } else {
        console.log("It's not available to verify student email", request);
        showMessage(MESSAGE_TYPE.CANT_VERIFY_STUDENT_EMAIL);
      }
    } catch (error) {
      console.log("It's not available to verify student email", error);
      setVerifyButtonDisabled(false);
      showMessage(MESSAGE_TYPE.CANT_VERIFY_STUDENT_EMAIL);
    }
  };

  const [buttonSize, setButtonSize] = useState(17);

  const hightlightButton = () => {
    if (mode !== 'view') return;
    let timer = setInterval(() => {
      setButtonSize(prevState => (prevState + 0.1 > 20 ? 20 : prevState + 0.1));
    }, 1);
    setTimeout(() => {
      clearInterval(timer);
      let timer2 = setInterval(() => {
        setButtonSize(prevState =>
          prevState - 0.1 < 17 ? 17 : prevState - 0.1,
        );
      }, 1);
      setTimeout(() => {
        clearInterval(timer2);
        setButtonSize(prevState =>
          prevState < 17 ? 17 : prevState > 20 ? 20 : prevState,
        );
      }, 500);
    }, 500);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={hightlightButton}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.marginContainer}
        onPress={hightlightButton}>
        <UserTypeHeader
          show_coins={!rewards.type_data}
          coin={coin}
          mode={mode}
          savingUserTypeData={savingUserTypeData}
          saveButtonState={saveButtonState}
          onSaveUserType={onSaveUserType}
          onModifyUserType={onModifyUserType}
          buttonStyle={{fontSize: buttonSize}}
        />
        <View style={styles.userTypeButtonContainer}>
          {USER_TYPE_BUTTONS.map((button, index) => (
            <TouchableOpacity
              key={String(index)}
              activeOpacity={constants.ACTIVE_OPACITY}
              style={[
                styles.userTypeButton,
                (aeut && index === 0) || (!aeut && index === selectedIndex)
                  ? mode === 'edit'
                    ? styles.userTypeButtonSelected
                    : {borderColor: colors.DEFAULT_PLACEHOLDER}
                  : {},
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
          <>
            <TouchableOpacity
              style={[
                styles.verifyButton,
                email_verification_in_progress ||
                card_verification_in_progress ||
                mode === 'view'
                  ? styles.verifyButtonDisabled
                  : !university_name &&
                    !studytown &&
                    !student_email &&
                    !email_verification_in_progress &&
                    !card_verification_in_progress && {
                      borderColor: colors.RED_TF,
                    },
              ]}
              disabled={verifyButtonDisabled || mode === 'view'}
              onPress={
                mode === 'view' ? hightlightButton : onPressShowVerifyScreen
              }>
              <Text
                style={[
                  styles.verifyButtonText,
                  verifyButtonDisabled ? styles.verifyButtonDisabledText : {},
                ]}>
                {!university_name &&
                !studytown &&
                !student_email &&
                !email_verification_in_progress &&
                !card_verification_in_progress ? (
                  <>
                    <BlinkingText
                      enabled={aeut}
                      style={[
                        styles.verifyEmptyDataTitle,
                        mode === 'view' && {color: colors.gray},
                      ]}
                      text={
                        strings.PROFILE.VERIFY_BUTTON.EMPTY_DATA_TITLE + '\n'
                      }
                    />
                    <BlinkingText
                      enabled={aeut}
                      style={[
                        styles.verifyEmptyData,
                        mode === 'view' && {color: colors.gray},
                      ]}
                      text={strings.PROFILE.VERIFY_BUTTON.EMPTY_DATA}
                    />
                  </>
                ) : (
                  <>
                    <Text style={styles.textUniversity}>{university_name}</Text>
                    <Text style={styles.textStudytown}>
                      {'\n'}
                      {studytown}
                    </Text>
                    {!card_verification_in_progress && (
                      <Text style={styles.textEmail}>
                        {'\n'}
                        {student_email}
                      </Text>
                    )}
                  </>
                )}
                {email_verification_in_progress && (
                  <Text
                    style={[
                      styles.verifyInProgress,
                      mode === 'view' && styles.verifyInProgressDisabled,
                    ]}>
                    {'\n\n'}
                    {strings.PROFILE.VERIFY_BUTTON.EMAIL_VERIFY_IN_PROGRESS}
                  </Text>
                )}
                {!email_verification_in_progress &&
                  card_verification_in_progress && (
                    <Text
                      style={[
                        styles.verifyInProgress,
                        mode === 'view' && styles.verifyInProgressDisabled,
                      ]}>
                      {'\n\n'}
                      {strings.PROFILE.VERIFY_BUTTON.CARD_VERIFY_IN_PROGRESS}
                    </Text>
                  )}
                {editLabelToShow &&
                  !email_verification_in_progress &&
                  !card_verification_in_progress &&
                  university_name &&
                  studytown && (
                    <Text
                      style={[
                        styles.verifyInProgress,
                        mode === 'view' && styles.verifyInProgressDisabled,
                      ]}>
                      {'\n\n'}
                      {strings.PROFILE.VERIFY_BUTTON.EMPTY_DATA_EDIT}
                    </Text>
                  )}
              </Text>
              {!email_verification_in_progress &&
                !card_verification_in_progress && (
                  <Image
                    style={[
                      styles.arrowIcon,
                      (verifyButtonDisabled || mode === 'view') &&
                        styles.arrowIconDisabled,
                    ]}
                    source={require('../../../../../assets/images/icons/icn_arrow_right_blu.png')}
                  />
                )}
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity activeOpacity={1} onPress={hightlightButton}>
          {(aeut || selectedIndex === 0) && (
            <UniversityTypeBlock
              userTypeBlockData={props.userTypeBlockData}
              onChangeSaveButtonState={onChangeSaveButtonState}
              mode={mode}
              style={styles.blockType0}
            />
          )}
          {!aeut && selectedIndex === 1 && (
            <HighSchoolTypeBlock
              userTypeBlockData={props.userTypeBlockData}
              onChangeSaveButtonState={onChangeSaveButtonState}
              mode={mode}
              style={styles.blockType}
            />
          )}
          {!aeut && selectedIndex === 2 && (
            <NonStudentTypeBlock
              userTypeBlockData={props.userTypeBlockData}
              onChangeSaveButtonState={onChangeSaveButtonState}
              mode={mode}
              style={styles.blockType}
            />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </TouchableOpacity>
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
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 20,
    shadowColor: colors.lightGray,
    shadowOpacity: 0.2,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 8,
    elevation: 10,
  },
  userTypeButtonSelected: {
    borderColor: colors.THEFACULTY,
  },
  userTypeButtonImage: {
    width: 40,
    height: 40,
  },
  userTypeButtonText: {
    fontFamily: constants.DEFAULT_FONT,
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
