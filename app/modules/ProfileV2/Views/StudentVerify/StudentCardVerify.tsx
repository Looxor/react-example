import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {Button} from '../../../../components';

import styles from './StudentCardVerify.style';
import {routes} from '../../../../navigation/rootNavigation/navigation.constants';
import FastImage from 'react-native-fast-image';
import GraduationStudyTown from './_Components/GraduationStudyTown';

import {colors, strings} from '../../../../config';
import standardFunctions from '../../../../utils/app/StandardFunctions';
import {CallServerPromise} from '../../../../utils/app/CallServer';
import {UserData} from '../../../../config/constants';
import {GetMessage} from '../../_Functions/ShowMessage';
import SaveSuccessPopoverView from '../PersonInfoBlock/_Components/SaveSuccessPopover';
import VerifyHeaderBox from './_Components/VerifyHeaderBox';
import SearchListPopoverV2 from '../../../../components/SearchListPopoverV2';
import NavigationService from '../../../../utils/app/NavigationService';

const TEST_EMAIL = 'test@smartcreative.eu';

const MESSAGE_TYPE = {
  INVALID_CARD_URL: 1,
  ERROR_UPLOADING: 2,
  INVALID_UNIVERSITY: 3,
  INVALID_GRADUATION_YEAR: 4,
  INVALID_CITY_NAME: 5,
  SUCCESS_UPGRADE: 6,
  FAILED_UPGRADE: 7,
  ALREADY_IN_PROGRESS: 8,
};

const showMessage = async message_type => {
  let message;
  switch (message_type) {
    case MESSAGE_TYPE.INVALID_CARD_URL:
      message = strings.SIGNUP.STUDENT_CARD_VERIFY.INVALID_CARD_URL;
      break;
    case MESSAGE_TYPE.ERROR_UPLOADING:
      message = strings.SIGNUP.STUDENT_CARD_VERIFY.ERROR_UPLOADING;
      break;
    case MESSAGE_TYPE.INVALID_UNIVERSITY:
      message = strings.SIGNUP.STUDENT_CARD_VERIFY.INVALID_UNIVERSITY;
      break;
    case MESSAGE_TYPE.INVALID_GRADUATION_YEAR:
      message = strings.SIGNUP.STUDENT1.INVALID_GRADUATION_YEAR;
      break;
    case MESSAGE_TYPE.INVALID_CITY_NAME:
      message = strings.SIGNUP.STUDENT1.INVALID_CITY_NAME;
      break;
    case MESSAGE_TYPE.SUCCESS_UPGRADE:
      message = strings.SIGNUP.STUDENT1.SUCCESS_UPGRADE_STUDENT_CARD;
      break;
    case MESSAGE_TYPE.FAILED_UPGRADE:
      message = strings.SIGNUP.STUDENT1.FAILED_UPGRADE;
      break;
    case MESSAGE_TYPE.ALREADY_IN_PROGRESS:
      message = strings.SIGNUP.STUDENT1.ALREADY_IN_PROGRESS;
      break;
  }
  await standardFunctions.show_alert_async(
    strings.SIGNUP.STUDENT_CARD_VERIFY.TITLE,
    message,
  );
};

const StudentCardVerify = props => {
  const {
    route: {
      params: {email},
    },
  } = props;
  const [state, setState] = useState({
    student_card_images_url: '',
    uploading: false,
    universityText: '',
    universityKeyword: '',
    studytown: '',
    isValidCardUrl: false,
    isValidUniversityText: false,
    loading: false,
  });

  const getStaticRewardValues = async () => {
    try {
      const request = await CallServerPromise.get_many_static_variables([
        'basic_data_reward',
        'type_data_reward',
      ]);
      if (request.success) {
        return request.data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const [selectedUniversity, setSelectedUniversity] = useState({
    id: '',
    name: '',
    cities: [],
  });
  const [universityText, setUniversityText] = useState('');
  const scrollViewRef: any = useRef();

  const setState2 = state2 => setState({...state, ...state2});

  const confirmButtonPressHandler = async () => {
    standardFunctions.add_firebase_event_log(
      'profile',
      'btn_sv_std_card_clicked',
    );
    if (!state.isValidCardUrl) {
      await showMessage(MESSAGE_TYPE.INVALID_CARD_URL);
      return;
    }

    if (!universityText) {
      await showMessage(MESSAGE_TYPE.INVALID_UNIVERSITY);
      return;
    }

    if (!state.studytown) {
      await showMessage(MESSAGE_TYPE.INVALID_CITY_NAME);
      return;
    }

    const params = {
      is_student: true,
      student_card_images_url: [state.student_card_images_url],
      studytown: state.studytown,
      university_id: selectedUniversity.id,
    };
    setState2({loading: true});
    const request: any = await CallServerPromise.verify_student(params);

    const oldRewards = UserData.getUserData().rewards.type_data
      ? UserData.getUserData().rewards
      : {type_data: false};
    const static_rewards = (await getStaticRewardValues()) || {};

    if (request.success) {
      await CallServerPromise.update_account({user_type: 'university_student'});
      if (
        request.data.rewards &&
        request.data.rewards.type_data === true &&
        oldRewards.type_data === false
      ) {
        const coin = '+' + static_rewards.type_data_reward;
        let popup_message = GetMessage(6, null, {coin});
        SaveSuccessPopoverView().show({
          message: popup_message,
          second_icon: false,
          success: true,
        });
      }
      props.navigation.goBack(0);
      props.navigation.navigate(routes.PROFILE_STUDENT_VERIFY_CARD_PENDING, {
        student_card_images_url: state.student_card_images_url,
        university_name: selectedUniversity.name,
        studytown: state.studytown,
      });
      // props.navigation.goBack(null);
    } else {
      if (request.error === 'verification in progress') {
        await showMessage(MESSAGE_TYPE.ALREADY_IN_PROGRESS);
      } else {
        await showMessage(MESSAGE_TYPE.FAILED_UPGRADE);
      }
      setState2({loading: false});
    }
  };

  const useUnivEmailPressHandler = () => {
    // props.navigation.goBack(null);
    console.log('email', email);
    NavigationService.replace(routes.PROFILE_STUDENT_VERIFY_EMAIL, {
      mode: 'student',
      email: email,
    });
  };

  const cameraScreenHandler = () => {
    const onPictureTaken = pictureData => {
      try {
        const local_file_uri = pictureData.uri;
        const local_file_type = pictureData.type;
        var fileNameS = pictureData.uri.split('/');
        var local_file_name = pictureData.uri;
        if (fileNameS.length != 0) {
          local_file_name = fileNameS[fileNameS.length - 1];
        }
        setState2({isValidCardUrl: false, uploading: true});

        initializeImageStorage(
          local_file_uri,
          local_file_name,
          local_file_type,
        );
        /*
        const onComplete = downloadUrl => {
          setState2({
            uploading: false,
            isValidCardUrl: true,
            student_card_images_url: downloadUrl,
          });
        };
        const onError = error => {
          setState2({uploading: false, isValidCardUrl: false});
          showMessage(MESSAGE_TYPE.ERROR_UPLOADING);
        };
        const onRunning = ({bytesTransferred, totalBytes}) => {

        };
        storageUpload({
          local_file_path,
          storage_path,
          onComplete,
          onError,
          onRunning,
        });
        */
      } catch (error) {
        setState2({uploading: true});
      }
    };
    // @ts-ignore
    global.navigationData['onPictureTaken'] = onPictureTaken;
    props.navigation.navigate(routes.SIGNUP.CAMERA_SCREEN);
  };

  const initializeImageStorage = async (
    local_file_uri,
    local_file_name,
    local_file_type,
  ) => {
    const request = await CallServerPromise.initialize_file_upload(
      'student_card',
      local_file_name,
    );
    if (request.success) {
      let file_url = request.data.file_url;
      let signed_url = request.data.signed_url;
      if (signed_url != '') {
        let is_success = await standardFunctions.uploadImage(
          {
            contentType: local_file_type,
            uploadUrl: signed_url,
            fileName: local_file_name,
          },
          local_file_uri,
        );
        if (is_success) {
          setState2({
            uploading: false,
            isValidCardUrl: true,
            student_card_images_url: file_url,
          });
        } else {
          setState2({uploading: false, isValidCardUrl: false});
          showMessage(MESSAGE_TYPE.ERROR_UPLOADING);
        }
      } else {
        setState2({uploading: false, isValidCardUrl: false});
        showMessage(MESSAGE_TYPE.ERROR_UPLOADING);
      }
    } else {
      setState2({uploading: false, isValidCardUrl: false});
      showMessage(MESSAGE_TYPE.ERROR_UPLOADING);
    }
  };

  const componentDidMount = () => {
    const componentWillUnmount = () => {};
    return componentWillUnmount;
  };

  useEffect(componentDidMount, []);

  const openUniversityListPopover = () => {
    // SearchListPopover
    SearchListPopoverV2().show({
      onSelectItem,
      searchFunc,
      fetchSearchResultFunc,
      searchPlaceholder: strings.SIGNUP.STUDENT_CARD_VERIFY.SEARCH_UNIVERSITY,
    });
  };
  const onSelectItem = university => {
    setSelectedUniversity(university);
    setUniversityText(university.name);
  };
  const searchFunc = value => {
    const search_data = {limit: 10, pattern: value};
    return CallServerPromise.search_universities(search_data);
  };
  const fetchSearchResultFunc = university => ({
    id: university.university_id,
    name: university.name,
    cities: university.cities,
  });

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <ScrollView ref={scrollViewRef} style={styles.scrollContainer}>
          <VerifyHeaderBox
            image={require('../../../../../assets/images/icons/icn_badge_verifying.png')}
            title={strings.PROFILEV2.CARD_VERIFY.TITLE}
            text={strings.PROFILEV2.CARD_VERIFY.TEXT}
            viewStyle={styles.logo}
            iconStyle={{width: '30%'}}
          />
          <View style={styles.subContainer}>
            <TouchableOpacity
              disabled={state.uploading}
              onPress={cameraScreenHandler}
              style={styles.cardContainer}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'green',
                }}
                disabled={state.uploading}
                onPress={cameraScreenHandler}>
                <TextInput
                  editable={false}
                  style={[
                    styles.cardText,
                    state.isValidCardUrl && styles.cardTextUploaded,
                  ]}
                  value={
                    state.isValidCardUrl
                      ? strings.SIGNUP.STUDENT_CARD_VERIFY.CARD_UPLOADED
                      : strings.SIGNUP.STUDENT_CARD_VERIFY.CARD
                  }
                  numberOfLines={1}
                />
              </TouchableOpacity>
              <TouchableOpacity
                disabled={state.uploading}
                onPress={cameraScreenHandler}
                style={styles.cardButton}>
                {state.uploading ? (
                  <ActivityIndicator
                    style={styles.uploadingIcon}
                    color={colors.DARK_ALOE_TF}
                  />
                ) : (
                  <FastImage
                    resizeMode={'contain'}
                    style={styles.cameraImage}
                    source={require('../../../../../assets/images/icons/icn_camera_dark.png')}
                  />
                )}
              </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={openUniversityListPopover}
              style={styles.universitySelectButton}>
              <Text
                style={[
                  styles.universitySelectButtonText,
                  universityText && {color: colors.DARK_ALOE_TF},
                ]}>
                {universityText ||
                  strings.SIGNUP.STUDENT_CARD_VERIFY.UNIVERSITY}
              </Text>
            </TouchableOpacity>
            <GraduationStudyTown
              style={styles.graduationStudyTown}
              email={TEST_EMAIL}
              confirmEmail={TEST_EMAIL}
              onChangeStudyTown={studytown => {
                setState2({studytown});
              }}
              cities={selectedUniversity.cities}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          disabled={
            state.loading || !state.student_card_images_url || !state.studytown
          }
          onPress={confirmButtonPressHandler}
          style={[
            styles.button,
            styles.continueButton,
            (state.loading ||
              !state.student_card_images_url ||
              !state.studytown) && {
              backgroundColor: colors.LIGHT_ALOE_TF,
            },
          ]}>
          {state.loading ? (
            <ActivityIndicator color={colors.WHITE} />
          ) : (
            <Text style={styles.continueButtonText}>
              {strings.PROFILEV2.VERIFY_BUTTON}
            </Text>
          )}
        </Button>
        <Button
          onPress={useUnivEmailPressHandler}
          style={[styles.button, styles.useUnivEmailButton]}
          textStyle={styles.useUnivEmailButtonText}>
          {strings.PROFILEV2.USE_UNIV_EMAIL}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default StudentCardVerify;
