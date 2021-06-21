import React, { useCallback, useEffect, useState } from "react";

import { Dimensions, SafeAreaView, Text, View } from "react-native";
import ProgressBarAnimated from "react-native-progress-bar-animated";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
// @ts-ignore
import ImagePicker from "react-native-image-picker";
import { auth } from "../../utils/firebase";

import { colors, constants, strings } from "../../config";

import { RightButtonTop } from "../../components";
import styles from "./UserProfileImageScreen.style";
import FastImage from "react-native-fast-image";
import standardFunctions from "../../utils/app/StandardFunctions";
import { storageUpload } from "../../utils/firebase/storageUtils";
import { CallServerPromise } from "../../utils/app/CallServer";
import { UserData } from "../../config/constants";

const IMAGE_PICKER_OPTIONS = {
  title: strings.OTHER.SELECT_IMAGE,
  tintColor: colors.THEFACULTY,
  cancelButtonTitle: strings.OTHER.CANCEL,
  takePhotoButtonTitle: strings.OTHER.TAKE_IMAGE,
  chooseFromLibraryButtonTitle: strings.OTHER.SELECT_IMAGE_FROM_LIBRARY,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const MESSAGE_TYPE = {
  ERROR_UPLOADING: 1,
  ERROR_UPDATING_ACCOUNT: 2,
};

const FIREBASE_STORAGE_PATH =
  'users_images/{FIREBASE_UID}/profile/profile_image';

const showMessage = async message_type => {
  let message;
  switch (message_type) {
    case MESSAGE_TYPE.ERROR_UPLOADING:
      message = strings.OTHER.ERROR_FIRESTORE_UPLOADING;
      break;
    case MESSAGE_TYPE.ERROR_UPDATING_ACCOUNT:
      message = strings.OTHER.ERROR_UPDATING_ACCOUNT;
      break;
  }
  await standardFunctions.show_alert_async(strings.APP_NAME, message);
};

const UserProfileImageScreen = props => {
  const {navigation} = props;
  const [state, setState] = useState({
    temp_profile_image: '',
    image_url: '',
    uploadPercent: 0,
  });

  const setState2 = state2 => setState({...state, ...state2});

  const saveToFireStorage = async temp_profile_image => {
    try {
      if (temp_profile_image) {
        const local_file_path = temp_profile_image;
        const onComplete = downloadUrl => {
          updateUserAccount(downloadUrl);
        };

        const onError = error => {
          showMessage(MESSAGE_TYPE.ERROR_UPLOADING);
        };

        const onRunning = ({bytesTransferred, totalBytes}) => {
          const uploadPercent = Math.round(
            (bytesTransferred / totalBytes) * 100,
          );

          setState2({uploadPercent});
        };

        const firebase_uid = auth().currentUser && auth().currentUser.uid;
        const storage_path = FIREBASE_STORAGE_PATH.replace(
          '{FIREBASE_UID}',
          firebase_uid,
        );
        await storageUpload({
          local_file_path,
          storage_path,
          onComplete,
          onError,
          onRunning,
        });
      }
    } catch (error) {
      showMessage(MESSAGE_TYPE.ERROR_UPLOADING);
    }
  };

  const updateUserAccount = async downloadUrl => {
    try {
      const request = await CallServerPromise.update_account({
        profile_image_url: downloadUrl,
      });
      if (request.success) {
        const request = await CallServerPromise.get_user_data();
        if (request.success) {
          UserData.setUserData(request.data);
        }
      } else {
        showMessage(MESSAGE_TYPE.ERROR_UPDATING_ACCOUNT);
      }
      setState2({temp_profile_image: ''});
    } catch (error) {
      showMessage(MESSAGE_TYPE.ERROR_UPDATING_ACCOUNT);
    }
  };

  const saveButtonPressHandler = useCallback(temp_profile_image => {
    saveToFireStorage(temp_profile_image);
  }, []);

  const editButtonPressHandler = useCallback(() => {
    ImagePicker.showImagePicker(IMAGE_PICKER_OPTIONS, response => {
      if (response.didCancel) {
      } else if (response.error) {
        standardFunctions.show_alert(
          strings.ALERTS.ERRORS.MENU.PROFILE_IMAGE_PICKER.TITLE,
          strings.ALERTS.ERRORS.MENU.PROFILE_IMAGE_PICKER.MESSAGE,
        );
      } else {
        setState2({temp_profile_image: response.uri});
      }
    });
  }, []);

  const componentDidMount = () => {
    if (state.temp_profile_image) {
      navigation.setParams({
        temp_profile_image: state.temp_profile_image,
        title: strings.MENU.UPDATE_PROFILE_IMAGE.PREVIEW_TITLE,
        buttonCaption: strings.OTHER.SAVE,
        rightTopButtonPressHandler: saveButtonPressHandler,
      });
    } else {
      const image_url = navigation.getParam('image_url');
      setState2({image_url});
      navigation.setParams({
        title: '',
        buttonCaption: '',
        rightTopButtonPressHandler: editButtonPressHandler,
      });
    }
    const componentWillUnmount = () => {};
    return componentWillUnmount;
  };
  useEffect(componentDidMount, [
    saveButtonPressHandler,
    editButtonPressHandler,
    state.temp_profile_image,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progress_view}>
        <ProgressBarAnimated
          width={Dimensions.get('window').width}
          height={2}
          borderRadius={0}
          borderWidth={0}
          value={state.uploadPercent}
          backgroundColor={colors.THEFACULTY}
          backgroundColorOnComplete={colors.DEFAULT_BACKGROUND}
        />
      </View>
      <ReactNativeZoomableView
        maxZoom={1.5}
        minZoom={1}
        zoomStep={0.5}
        initialZoom={1}>
        <FastImage
          source={{
            uri:
              state.temp_profile_image != ''
                ? state.temp_profile_image
                : state.image_url,
          }}
          style={styles.image}
        />
      </ReactNativeZoomableView>
    </SafeAreaView>
  );
};

UserProfileImageScreen.navigationOptions = ({navigation}) => {
  const rightTopButtonPressHandler = navigation.getParam(
    'rightTopButtonPressHandler',
  );
  const title = navigation.getParam('title');
  const temp_profile_image = navigation.getParam('temp_profile_image');
  const buttonCaption = navigation.getParam('buttonCaption');
  return {
    title: title || strings.MENU.UPDATE_PROFILE_IMAGE.DEFAULT_TITLE,
    headerRight: (
      <RightButtonTop
        onPress={() => rightTopButtonPressHandler(temp_profile_image)}>
        <Text
          numberOfLines={1}
          style={{
            color: colors.THEFACULTY,
            fontFamily: constants.DEFAULT_FONT_MEDIUM,
            fontSize: 16,
          }}>
          {buttonCaption || strings.OTHER.EDIT}
        </Text>
      </RightButtonTop>
    ),
  };
};

export default UserProfileImageScreen;
