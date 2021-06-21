import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, TextInput, TouchableOpacity, View } from "react-native";

import { BackButtonTop, Button, StandardBoxWithImage } from "../../components";

import styles from "./StudentCardVerify.style";
import Strings from "../../utils/misc/TextComponents";
import { routes } from "../../navigation/rootNavigation/navigation.constants";
import FastImage from "react-native-fast-image";
import GraduationStudyTown from "./_Components/GraduationStudyTown";

import { colors, strings } from "../../config";
import standardFunctions from "../../utils/app/StandardFunctions";
import AutoCompleteListUp from "../../components/AutoCompleteListUp";
import IntervalCheck from "../../utils/misc/IntervalCheck";
import { searchUniversitiesAPI } from "./_actions";
import { CallServerPromise } from "../../utils/app/CallServer";

const TEST_EMAIL = 'test@smartcreative.eu';
const BASE_STORAGE_PATH = '/users_images/FIREBASE_UID/documents/student_card';

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

const SEARCH_REQUEST_MIN_INTERVAL_IN_MILLIS = 300;

const intervalCheck = new IntervalCheck();
let timeout: any = 0;

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
  const [universityListVisible, setUniversityListVisible] = useState(false);
  const [universityList, setUniversityList] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState({
    id: '',
    cities: [],
  });
  const [universityText, setUniversityText] = useState('');
  const [searching, setSearching] = useState(false);
  const scrollViewRef: any = useRef();

  const setState2 = state2 => setState({...state, ...state2});

  const confirmButtonPressHandler = async () => {
    if (!state.isValidCardUrl) {
      await showMessage(MESSAGE_TYPE.INVALID_CARD_URL);
      return;
    }

    if (!state.isValidUniversityText) {
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
    const request: any = await CallServerPromise.upgrade_to_student_account(
      params,
    );
    if (request.success) {
      await showMessage(MESSAGE_TYPE.SUCCESS_UPGRADE);
      props.navigation.goBack(null);
    } else {
      if (request.error === 'verification in progress') {
        await showMessage(MESSAGE_TYPE.ALREADY_IN_PROGRESS);
      } else {
        await showMessage(MESSAGE_TYPE.FAILED_UPGRADE);
      }
      setState2({loading: false});
    }
  };

  const notNowButtonPressHandler = () => {
    props.navigation.goBack(null);
  };

  const changeUniversityKeywordHandler = value => {
    setState2({isValidUniversityText: false});
    setUniversityText(value);

    if (intervalCheck.passedLessThan(SEARCH_REQUEST_MIN_INTERVAL_IN_MILLIS)) {
      timeout && clearInterval(timeout);
      timeout = setTimeout(
        () => sendRequest(value),
        SEARCH_REQUEST_MIN_INTERVAL_IN_MILLIS,
      );
    } else {
      sendRequest(value);
    }
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
    props.navigation.navigate(routes.SIGNUP.CAMERA_SCREEN, {onPictureTaken});
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

  const onUniversityListSelect = university => {
    setSelectedUniversity(university);
    setUniversityText(university.name);
    setUniversityListVisible(false);
    setState2({isValidUniversityText: true});
  };

  const controller = new AbortController();
  const sendRequest = async value => {
    try {
      if (value && value.length > 2 && !searching) {
        setSearching(true);
        controller.abort();
        let searchResults = await searchUniversitiesAPI(value);
        if (searchResults) {
          const tempSearchResults = [
            {
              cities: ['Milano'],
              domains: ['smartcreative.eu', 'thefaculty.it'],
              last_update_date: '2019-11-15T16:43:56.658Z',
              name: 'SmartCreative Srl',
              university_id: '5bb8f32f1c9d44000022b211',
              version: 0,
            },
          ];

          // searchResults = tempSearchResults;

          const universityList = searchResults.map(university => {
            return {
              id: university.university_id,
              name: university.name,
              cities: university.cities,
            };
          });
          setUniversityList(universityList);
          setUniversityListVisible(universityList.length > 0);
        }
        setSearching(false);
      } else {
        setUniversityListVisible(false);
      }
    } catch (e) {
      setSearching(false);
    }
  };

  const componentDidMount = () => {
    const componentWillUnmount = () => {};
    return componentWillUnmount;
  };

  useEffect(componentDidMount, []);

  const onFocusEmail = () => {
    scrollViewRef && scrollViewRef.current.scrollToEnd();
  };

  const onBlurEmail = () => {
    scrollViewRef &&
      scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <ScrollView ref={scrollViewRef} style={styles.scrollContainer}>
          <StandardBoxWithImage
            image={require('../../../assets/images/icons/icn_big_trophy_dark.png')}
            background_start_color={colors.GENERAL.START}
            background_finish_color={colors.GENERAL.FINISH}
            viewStyle={styles.logo}
            iconStyle={{width: '30%'}}
          />
          <View style={styles.subContainer}>
            {Strings.makeBold(strings.SIGNUP.STUDENT_CARD_VERIFY.DESCRIPTION, {
              style: styles.description,
            })}

            <View style={styles.cardContainer}>
              <TextInput
                editable={false}
                style={[
                  styles.cardText,
                  state.isValidCardUrl ? styles.cardTextUploaded : {},
                ]}
                value={
                  state.isValidCardUrl
                    ? strings.SIGNUP.STUDENT_CARD_VERIFY.CARD_UPLOADED
                    : strings.SIGNUP.STUDENT_CARD_VERIFY.CARD
                }
                numberOfLines={1}
              />
              <TouchableOpacity
                disabled={state.uploading}
                onPress={cameraScreenHandler}
                style={styles.cardButton}>
                {state.uploading ? (
                  <ActivityIndicator
                    style={styles.uploadingIcon}
                    color={colors.THEFACULTY}
                  />
                ) : (
                  <FastImage
                    style={styles.cameraImage}
                    source={require('../../../assets/images/icons/icn_camera_blu.png')}
                  />
                )}
              </TouchableOpacity>
            </View>

            <AutoCompleteListUp
              style={{top: 0}}
              visible={universityListVisible}
              data={universityList}
              onSelectItem={onUniversityListSelect}
            />
            <TextInput
              placeholder={strings.SIGNUP.STUDENT_CARD_VERIFY.UNIVERSITY}
              placeholderTextColor={colors.DEFAULT_PLACEHOLDER}
              style={[styles.inputText, styles.universityText]}
              onChangeText={changeUniversityKeywordHandler}
              value={universityText}
              onFocus={onFocusEmail}
              onBlur={onBlurEmail}
            />

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
          onPress={notNowButtonPressHandler}
          style={[styles.button, styles.notNowButton]}
          textStyle={styles.notNowButtonText}>
          {strings.SIGNUP.STUDENT1.NOT_NOW}
        </Button>
        <Button
          disabled={state.loading}
          onPress={confirmButtonPressHandler}
          style={[styles.button, styles.continueButton]}>
          {state.loading ? (
            <ActivityIndicator color={colors.WHITE} />
          ) : (
            strings.SIGNUP.STUDENT1.CONTINUE_BUTTON
          )}
        </Button>
      </View>
    </SafeAreaView>
  );
};

StudentCardVerify.navigationOptions = ({navigation}) => {
  const onBackPressHandler = () => {
    // @ts-ignore
    global.selectedIndex = -1;
    navigation.replace(routes.SIGNUP.STUDENT_EMAIL_VERIFY);
  };
  return {
    title: strings.SIGNUP.STUDENT1.TITLE,
    headerLeft: (
      <BackButtonTop navigation={navigation} onBackPress={onBackPressHandler} />
    ),
  };
};

export default StudentCardVerify;
