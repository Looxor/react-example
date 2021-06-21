// Libraries //
import * as React from "react";
import { Dimensions, Platform, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { colors, constants, strings } from "../../config";
import ProgressBarAnimated from "react-native-progress-bar-animated";
// @ts-ignore
import ImagePicker from "react-native-image-picker";
// Configs //
import styles from "./UserProfileImageScreen.style";
import { CallServer, CallServerPromise } from "../../utils/app/CallServer";
import { UserData } from "../../config/constants";
import standardFunctions from "../../utils/app/StandardFunctions";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";

interface Props {
  navigation: any;
  self: any;
}

interface State {
  image_url: string;
  show_edit_button: boolean;
  temp_profile_image: string;
  temp_profile_filename: string;
  temp_profile_filetype: string;
  temp_profile_origUrl: string;
  loading_progress: number;
  button_right_title: string;
  button_right_action: () => void;
}

let onceUploaded = false;

class EditButtonTop extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.setState = this.setState.bind(this);
  }

  handleEditClicked = () => {
    let self = this.props.self;
    let navigation = this.props.navigation;
    const options = {
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

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
        standardFunctions.show_alert(
          strings.ALERTS.ERRORS.MENU.PROFILE_IMAGE_PICKER.TITLE,
          strings.ALERTS.ERRORS.MENU.PROFILE_IMAGE_PICKER.MESSAGE,
        );
      } else {
        navigation.setParams({
          header_title: strings.MENU.UPDATE_PROFILE_IMAGE.PREVIEW_TITLE,
        });

        var fileName;
        if (Platform.OS === 'ios') {
          var fileNameS = response.uri.split('/');
          fileName = response.uri;
          if (fileNameS.length != 0) {
            fileName = fileNameS[fileNameS.length - 1];
          }
        } else if (Platform.OS === 'android') {
          fileName = response.fileName;
        }
        self.setState({
          temp_profile_image: response.uri,
          temp_profile_filename: fileName,
          temp_profile_filetype: response.type,
          temp_profile_origUrl: response.origURL,
        });

        this.setState({
          button_right_title: strings.OTHER.SAVE,
          button_right_action: this.handleSaveClicked,
          temp_profile_image: response.uri,
          temp_profile_filename: fileName,
          temp_profile_filetype: response.type,
          temp_profile_origUrl: response.origURL,
        });
      }
    });
  };

  readonly state: State = {
    image_url: '',
    show_edit_button: false,
    temp_profile_image: '',
    temp_profile_filename: '',
    temp_profile_filetype: '',
    temp_profile_origUrl: '',
    loading_progress: 0,
    button_right_title: strings.OTHER.EDIT,
    button_right_action: this.handleEditClicked,
  };

  handleSaveClicked = () => {
    let self = this.props.self;
    let navigation = this.props.navigation;
    this.initializeImageStorage(self, navigation);
  };

  initializeImageStorage = async (self, navigation) => {
    let _this = this;
    const request = await CallServerPromise.initialize_file_upload(
      'profile_image',
      this.state.temp_profile_filename,
    );
    if (request.success) {
      let file_url = request.data.file_url;
      let signed_url = request.data.signed_url;
      if (signed_url != '') {
        let isSuccess = await standardFunctions.uploadImage(
          {
            contentType: this.state.temp_profile_filetype,
            uploadUrl: signed_url,
            fileName: this.state.temp_profile_filename,
          },
          this.state.temp_profile_image,
        );
        if (isSuccess) {
          CallServer.update_account({profile_image_url: file_url}, result => {
            if (result.success) {
              CallServer.get_user_data(function (result) {
                if (result.success) {
                  UserData.setUserData({
                    ...UserData.getUserData(),
                    ...result.data,
                  });
                }

                navigation.setParams({
                  header_title: strings.MENU.UPDATE_PROFILE_IMAGE.DEFAULT_TITLE,
                });

                navigation.state.params.updateUserData &&
                  navigation.state.params.updateUserData({
                    profile_image_url: file_url,
                  });

                self.setState({
                  button_right_title: strings.OTHER.EDIT,
                  temp_profile_image: file_url,
                  loading_progress: 100,
                });

                _this.setState({
                  button_right_title: strings.OTHER.EDIT,
                  button_right_action: _this.handleEditClicked,
                });
              });
            } else {
              console.log('result to upload', result);
              standardFunctions.show_alert(
                strings.ALERTS.ERRORS.MENU.UPDATE_PROFILE_IMAGE.TITLE,
                strings.ALERTS.ERRORS.MENU.UPDATE_PROFILE_IMAGE.MESSAGE,
              );
            }
          });
        } else {
          standardFunctions.show_alert(
            strings.ALERTS.ERRORS.MENU.UPDATE_PROFILE_IMAGE.TITLE,
            strings.ALERTS.ERRORS.MENU.UPDATE_PROFILE_IMAGE.MESSAGE,
          );
        }
      } else {
        console.log('error on initialize_file_upload', request);
        standardFunctions.show_alert(
          strings.ALERTS.ERRORS.MENU.UPDATE_PROFILE_IMAGE.TITLE,
          strings.ALERTS.ERRORS.MENU.UPDATE_PROFILE_IMAGE.MESSAGE,
        );
      }
    } else {
      console.log(
        'error on initialize_file_upload',
        request,
        this.state.temp_profile_filename,
      );
      standardFunctions.show_alert(
        strings.ALERTS.ERRORS.MENU.UPDATE_PROFILE_IMAGE.TITLE,
        strings.ALERTS.ERRORS.MENU.UPDATE_PROFILE_IMAGE.MESSAGE,
      );
    }
  };

  /*
  uploadImage = async (self: any, navigation: any) => {
    let _this = this;
    const response = await fetch(this.state.temp_profile_image);
    const image_blob = await response.blob();

    let firebase_uid = auth().currentUser.uid;
    let path_image_storage =
      'users_images/' + firebase_uid + '/profile/profile_image';
    onceUploaded = false;
    storage()
      .ref(path_image_storage)
      // .put(image_blob)
      .putFile(this.state.temp_profile_image)
      .on(
        storage_const.TaskEvent.STATE_CHANGED,
        snapshot => {
          let state = {};
          state = {
            loading_progress:
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          };

          if ((snapshot.bytesTransferred / snapshot.totalBytes) * 100 == 100 && onceUploaded === false) {
            onceUploaded = true;
            state = {
              loading_progress: 99,
            };
            storage()
              .ref(path_image_storage)
              .getDownloadURL()
              .then(
                function (url) {
                  CallServer.update_account(
                    { profile_image_url: url },
                    result => {
                      if (result.success) {
                        CallServer.get_user_data(function (result) {
                          if (result.success) {
                            UserData.setUserData({ ...UserData.getUserData(), ...result.data });
                          }
                          // else {
                          // var temp_user_data = UserData.getUserData().profile_image_url = url;
                          // UserData.setUserData(temp_user_data);
                          // }

                          navigation.setParams({
                            header_title:
                              strings.MENU.UPDATE_PROFILE_IMAGE.DEFAULT_TITLE,
                          });
                          navigation.state.params.updateUserData({
                            profile_image_url: url,
                          });

                          self.setState({
                            button_right_title: strings.OTHER.EDIT,
                            temp_profile_image: url,
                            loading_progress: 100,
                          });

                          _this.setState({
                            button_right_title: strings.OTHER.EDIT,
                            button_right_action: _this.handleEditClicked,
                          });
                        });
                      } else {
                        standardFunctions.show_alert(
                          strings.ALERTS.ERRORS.MENU.UPDATE_PROFILE_IMAGE.TITLE,
                          strings.ALERTS.ERRORS.MENU.UPDATE_PROFILE_IMAGE
                            .MESSAGE,
                        );
                      }
                    },
                  );
                },
                function (error) { },
              );
          }
          self.setState(state);
        },
        error => { },
      );
  };
  */

  render() {
    const {navigation} = this.props;
    return (
      <TouchableOpacity
        style={{flexDirection: 'row'}}
        onPress={this.state.button_right_action}>
        <Text
          style={{
            color: colors.THEFACULTY,
            marginRight: 10,
            fontFamily: constants.DEFAULT_FONT_MEDIUM,
            fontSize: 16,
          }}>
          {this.state.button_right_title}
        </Text>
      </TouchableOpacity>
    );
  }
}

class UserProfileImage extends React.Component<Props, State> {
  readonly state: State = {
    image_url: '',
    show_edit_button: false,
    temp_profile_image: '',
    temp_profile_filename: '',
    temp_profile_filetype: '',
    temp_profile_origUrl: '',
    loading_progress: 0,
    button_right_title: strings.OTHER.EDIT,
    button_right_action: () => {},
  };

  constructor(props) {
    super(props);
    this.setState = this.setState.bind(this);
    this.props.navigation.setParams({
      self: this,
      header_title: strings.MENU.UPDATE_PROFILE_IMAGE.DEFAULT_TITLE,
    });
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title:
        params.header_title == undefined
          ? strings.MENU.UPDATE_PROFILE_IMAGE.DEFAULT_TITLE
          : params.header_title,
      headerRight: navigation.getParam('show_edit_button', false) ? (
        <EditButtonTop self={params.self} navigation={navigation} />
      ) : null,
    };
  };

  componentDidMount() {
    const {navigation} = this.props;
    let image_url = navigation.getParam('image_url', '');
    let show_edit_button = navigation.getParam('show_edit_button', false);
    this.setState({
      image_url,
      show_edit_button,
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.progress_view}>
          <ProgressBarAnimated
            width={Dimensions.get('window').width}
            height={2}
            borderRadius={0}
            borderWidth={0}
            value={this.state.loading_progress}
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
                this.state.temp_profile_image != ''
                  ? this.state.temp_profile_image
                  : this.state.image_url,
            }}
            style={styles.image}
          />
        </ReactNativeZoomableView>
      </SafeAreaView>
    );
  }
}

export default UserProfileImage;
