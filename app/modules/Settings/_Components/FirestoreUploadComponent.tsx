import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, constants, strings } from "../../../config";
import standardFunctions from "../../../utils/app/StandardFunctions";
import { routes } from "../../../navigation/rootNavigation/navigation.constants";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";
import { CallServerPromise } from "../../../utils/app/CallServer";

const MESSAGE_TYPE = {
  ERROR_UPLOADING: 1,
};

const showMessage = async message_type => {
  let message;
  switch (message_type) {
    case MESSAGE_TYPE.ERROR_UPLOADING:
      message = strings.OTHER.ERROR_FIRESTORE_UPLOADING;
      break;
  }
  await standardFunctions.show_alert_async(strings.APP_NAME, message);
};

const FirestoreUploadComponent = props => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    uploading: false,
    uploaded: false,
    loading: false,
  });
  const setState2 = state2 => setState({...state, ...state2});

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
        setState2({uploaded: false, uploading: true});

        initializeImageStorage(
          props.firestore_dest_path,
          local_file_uri,
          local_file_name,
          local_file_type,
        );
        /*
        const onComplete = downloadUrl => {
          setState2({uploading: false, uploaded: true});
          props.onUploadComplete && props.onUploadComplete(downloadUrl);
        };

        const onError = error => {
          setState2({uploading: false, uploaded: false});
          showMessage(MESSAGE_TYPE.ERROR_UPLOADING);
        };

        storageUpload({local_file_path, storage_path, onComplete, onError});
        */
      } catch (error) {
        setState2({uploading: true});
      }
    };
    navigation.navigate(routes.SIGNUP.CAMERA_SCREEN, {onPictureTaken});
  };

  const initializeImageStorage = async (
    type,
    local_file_uri,
    local_file_name,
    local_file_type,
  ) => {
    const request = await CallServerPromise.initialize_file_upload(
      type,
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
          setState2({uploading: false, uploaded: true});
          props.onUploadComplete && props.onUploadComplete(file_url);
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

  return (
    <TouchableOpacity
      disabled={props.disabled || state.uploading}
      onPress={cameraScreenHandler}
      style={[styles.uploadButton, props.style]}>
      <Text
        style={[
          styles.uploadControlText,
          state.uploaded ? styles.uploadControlTextUploaded : {},
        ]}>
        {state.uploaded ? props.label_uploaded : props.label}
      </Text>
      <View style={styles.uploadIconContainer}>
        {state.uploading ? (
          <ActivityIndicator
            style={styles.uploadingIcon}
            color={colors.THEFACULTY}
          />
        ) : (
          <FastImage
            style={styles.cameraImage}
            source={require('../../../../assets/images/icons/icn_camera_blu.png')}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  uploadButton: {},
  uploadControlText: {
    fontFamily: constants.DEFAULT_FONT,
    height: 45,
    lineHeight: 45,
    paddingLeft: 15,
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 16,
    borderColor: colors.LIGHT_SILVER,
    backgroundColor: colors.WHITE,
    color: colors.lightGray,
  },
  uploadControlTextUploaded: {
    color: colors.THEFACULTY,
  },
  uploadIconContainer: {
    width: 25,
    height: 25,
    position: 'absolute',
    right: 15,
    top: 10,
  },
  uploadingIcon: {
    top: 2,
    right: -3,
  },
  cameraImage: {
    width: 25,
    height: 25,
  },
});

export default FirestoreUploadComponent;
