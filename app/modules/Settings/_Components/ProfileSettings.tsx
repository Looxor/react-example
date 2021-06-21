import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { Content, Left, ListItem, Right, Separator, Text } from "native-base";
import { colors, constants, strings } from "../../../config";
import Strings from "../../../utils/misc/TextComponents";
import {
  logOutHandler,
  openChangeLegalChecks,
  openChangePassword,
  openEmailComposeScreen,
  openFaqScreen,
  openNotificationLevelScreen,
  openQuestionsQuality,
  openSocialPopup
} from "./ProfileSettings.func";
import { useNavigation } from "@react-navigation/native";
import { UserData } from "../../../config/constants";
import { routes } from "../../../navigation/rootNavigation/navigation.constants";
import { StandardButton } from "../../../components";
import { Overlay } from "teaset";
import auth from "@react-native-firebase/auth";
import standardFunctions from "../../../utils/app/StandardFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Observable } from "../../_CommonModels/ViewModelBase";

const ProfileSettings = props => {
  let overlayKey = '';
  const user = props.user;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = UserData.getUserData();
  const [isChangePasswordToShow, setIsChangePasswordToShow] = useState(false);
  const [firstStepTestingCount, setFirstStepTestingCount] = useState(0);
  const [secondStepTesting, setSecondStepTesting] = useState(false);
  const [isVibrationEnabled, setIsVibrationEnabled] = useState(
    Observable.getReduxValue('is_vibration_enabled') !== undefined &&
      Observable.getReduxValue('is_vibration_enabled') !== false,
  );
  var testingModeTimeout;

  const componentDidMount = () => {
    try {
      auth()
        .fetchSignInMethodsForEmail(UserData.getUserData().email)
        .then(providers => {
          let has_password =
            providers !== undefined && providers.includes('password');
          setIsChangePasswordToShow(has_password);
        });
    } catch (e) {}
  };

  const redirectToTestingMode = async (
    firstStep: boolean,
    secondStep: boolean,
  ) => {
    if (firstStep) {
      setFirstStepTestingCount(firstStepTestingCount + 1);
    } else if (secondStep) {
      if (firstStepTestingCount >= 4) {
        setSecondStepTesting(true);
      }
    }

    if (firstStepTestingCount >= 4 && secondStepTesting) {
      setFirstStepTestingCount(0);
      let isProductionModeActive =
        (await AsyncStorage.getItem('isProductionModeActive')) === 'true';
      let isTestingModeActive =
        (await AsyncStorage.getItem('isTestingModeActive')) === 'true';
      if (isProductionModeActive || isTestingModeActive) {
        await AsyncStorage.setItem('isProductionModeActive', 'false');
        await AsyncStorage.setItem('isTestingModeActive', 'false');

        await standardFunctions.show_alert_with_button_async(
          isProductionModeActive
            ? 'PRODUCTION MODE DISABLED'
            : 'TESTING MODE DISABLED',
          'Resetted to current mode.',
          'OK',
          async () => {},
          false,
        );
        return;
      }

      if (constants.APP_MODE_CONTROLLED_BY_SERVER === 'PRODUCTION') {
        await AsyncStorage.setItem('isProductionModeActive', 'false');
        await AsyncStorage.setItem('isTestingModeActive', 'true');
        await standardFunctions.show_alert_with_button_async(
          'TESTING MODE ENABLED',
          'You are connected to Testing servers now. To apply the changes you need to restart the app manually.',
          'OK',
          async () => {},
          false,
        );
      } else {
        await AsyncStorage.setItem('isProductionModeActive', 'true');
        await AsyncStorage.setItem('isTestingModeActive', 'false');
        await standardFunctions.show_alert_with_button_async(
          'PRODUCTION MODE ENABLED',
          'You are connected to Production servers now. To apply the changes you need to restart the app manually.',
          'OK',
          async () => {},
          false,
        );
      }
    }
  };

  const ConfirmDeleteAccountOverlay = props => {
    const {type} = props;
    return (
      <Overlay.PullView
        key="ConfirmDeleteAccountOverlay"
        containerStyle={styles.overlayContainer}
        side={'bottom'}
        modal={false}
        rootTransform={[]}>
        <View style={styles.overlay}>
          <Image
            style={styles.overlayLogo}
            source={require('../../../../assets/images/icons/icn_big_sad_light.png')}
          />
          <Text style={styles.overlayText}>
            {strings.SETTINGS.DELETE_ACCOUNT.CONFIRM_MESSAGE}
          </Text>
          <StandardButton
            style={{marginTop: 8, width: '60%'}}
            label={strings.SETTINGS.DELETE_ACCOUNT.CONFIRM_BUTTON}
            onPress={() => {
              standardFunctions.add_firebase_event_log(
                'settings',
                'dlt_user_popup_clicked',
              );
              overlayKey && Overlay.hide(overlayKey);
              props.navigation.navigate(routes.SETTINGS_DELETE_ACCOUNT);
            }}
          />
        </View>
      </Overlay.PullView>
    );
  };
  const notificationSettingsHandler = () => {
    props.navigation.navigate(routes.SETTINGS_SETTINGS_NOTIFICATION);
  };
  const openChangePasswordScreenHandler = () => {
    props.navigation.navigate(routes.SETTINGS_CHANGE_PASSWORD);
  };
  const deleteAccountHandler = () => {
    standardFunctions.play_tap_sound();
    standardFunctions.add_firebase_event_log(
      'settings',
      'btn_dlt_user_clicked',
    );
    overlayKey = Overlay.show(
      ConfirmDeleteAccountOverlay({navigation: props.navigation}),
    );
  };

  useEffect(componentDidMount, []);
  return (
    <Content style={styles.container}>
      <Separator style={styles.headerBar}>
        <Text style={styles.label}>
          {Strings.makeBold(strings.SETTINGS.HOME.APP_SETTINGS)}
        </Text>
      </Separator>

      <ListItem
        underlayColor={'white'}
        style={styles.item}
        noIndent
        button
        onPress={() => openQuestionsQuality(navigation)}>
        <Left>
          <Text style={styles.itemText}>
            {strings.SETTINGS.HOME.QUESTIONS_QUALITY}
          </Text>
        </Left>
        <Right>
          <Image
            style={{width: 24, height: 24, tintColor: colors.lightGray}}
            resizeMode={'contain'}
            source={require('../../../../assets/images/icons/icn_arrow_right_blu.png')}
          />
        </Right>
      </ListItem>
      <ListItem
        underlayColor={'white'}
        style={styles.item}
        noIndent
        button
        onPress={() => openNotificationLevelScreen(navigation)}>
        <Left>
          <Text style={styles.itemText}>
            {strings.SETTINGS.HOME.NOTIFICATION_SETTINGS}
          </Text>
        </Left>
        <Right>
          <Image
            style={{width: 24, height: 24, tintColor: colors.lightGray}}
            resizeMode={'contain'}
            source={require('../../../../assets/images/icons/icn_arrow_right_blu.png')}
          />
        </Right>
      </ListItem>
      {false && (
        <ListItem
          underlayColor={'white'}
          style={styles.item}
          noIndent
          button
          onPress={async () => {
            let is_vibration_enabled =
              Observable.getReduxValue('is_vibration_enabled') !== undefined &&
              Observable.getReduxValue('is_vibration_enabled') !== false;
            await Observable.setReduxValue(
              'is_vibration_enabled',
              !is_vibration_enabled,
            );
            setIsVibrationEnabled(!is_vibration_enabled);
          }}>
          <Left>
            <Text style={styles.itemText}>
              {strings.SETTINGS.HOME.VIBRATION_SETTINGS}
              {isVibrationEnabled
                ? strings.OTHER.ENABLED.toLowerCase()
                : strings.OTHER.DISABLED.toLowerCase()}
            </Text>
          </Left>
        </ListItem>
      )}

      <Separator style={styles.headerBar}>
        <Text style={styles.label}>
          {Strings.makeBold(strings.SETTINGS.HOME.USER_SETTINGS)}
        </Text>
      </Separator>

      <ListItem
        underlayColor={'white'}
        style={styles.item}
        noIndent
        button
        onPress={() => {
          openChangeLegalChecks(navigation);
        }}>
        <Left>
          <Text style={styles.itemText}>
            {strings.SETTINGS.HOME.AGREEMENTS_SETTINGS}
          </Text>
        </Left>
        <Right>
          <Image
            style={{width: 24, height: 24, tintColor: colors.lightGray}}
            resizeMode={'contain'}
            source={require('../../../../assets/images/icons/icn_arrow_right_blu.png')}
          />
        </Right>
      </ListItem>
      {isChangePasswordToShow && (
        <ListItem
          underlayColor={'white'}
          style={styles.item}
          noIndent
          button
          onPress={() => openChangePassword(navigation)}>
          <Left>
            <Text style={styles.itemText}>
              {Strings.makeBold(strings.SETTINGS.HOME.PASSWORD_SETTINGS)}
            </Text>
          </Left>
          <Right>
            <Image
              style={{width: 24, height: 24, tintColor: colors.lightGray}}
              resizeMode={'contain'}
              source={require('../../../../assets/images/icons/icn_arrow_right_blu.png')}
            />
          </Right>
        </ListItem>
      )}
      <ListItem
        underlayColor={'transparent'}
        style={styles.item}
        noIndent
        button
        onPress={deleteAccountHandler}>
        <Left>
          <Text style={styles.itemText}>
            {strings.SETTINGS.HOME.DELETE_ACCOUNT_SETTINGS}
          </Text>
        </Left>
        <Right>
          <Image
            style={{width: 24, height: 24, tintColor: colors.lightGray}}
            resizeMode={'contain'}
            source={require('../../../../assets/images/icons/icn_arrow_right_blu.png')}
          />
        </Right>
      </ListItem>

      <TouchableOpacity
        activeOpacity={1.0}
        onPress={() => {
          redirectToTestingMode(true, false);
        }}
        onLongPress={() => {
          redirectToTestingMode(false, true);
        }}>
        <Separator style={styles.headerBar}>
          <Text style={styles.label}>
            {Strings.makeBold(strings.SETTINGS.HOME.SUPPORT_LABEL)}
          </Text>
        </Separator>
      </TouchableOpacity>

      <ListItem
        underlayColor={'white'}
        style={styles.item}
        noIndent
        button
        onPress={() => openFaqScreen(navigation)}>
        <Left>
          <Text style={styles.itemText}>{strings.SETTINGS.HOME.FAQ}</Text>
        </Left>
        <Right>
          <Image
            style={{width: 24, height: 24, tintColor: colors.lightGray}}
            resizeMode={'contain'}
            source={require('../../../../assets/images/icons/icn_arrow_right_blu.png')}
          />
        </Right>
      </ListItem>
      <ListItem
        underlayColor={'white'}
        style={styles.item}
        noIndent
        button
        onPress={() => openEmailComposeScreen(user)}>
        <Left>
          <Text style={styles.itemText}>{strings.SETTINGS.HOME.SUPPORT}</Text>
        </Left>
        <Right>
          <Image
            style={{width: 24, height: 24, tintColor: colors.lightGray}}
            resizeMode={'contain'}
            source={require('../../../../assets/images/icons/icn_arrow_right_blu.png')}
          />
        </Right>
      </ListItem>

      <Separator style={styles.headerBar}>
        <Text style={styles.label}>
          {Strings.makeBold(strings.SETTINGS.HOME.SOCIAL_LABEL)}
        </Text>
      </Separator>
      <ListItem
        underlayColor={'white'}
        style={styles.item}
        noIndent
        button
        onPress={() => openSocialPopup('instagram')}>
        <Image
          resizeMode={'contain'}
          style={styles.socialLoginButtonIcon}
          source={require('../../../../assets/images/icons/icn_instagram_logo.png')}
        />
        <Text style={styles.socialItemText}>
          {Strings.makeBold(strings.SETTINGS.HOME.INSTAGRAM_PAGE)}
        </Text>
      </ListItem>
      <ListItem
        underlayColor={'white'}
        style={styles.item}
        noIndent
        button
        onPress={() => openSocialPopup('linkedin')}>
        <Image
          resizeMode={'contain'}
          style={styles.socialLoginButtonIcon}
          source={require('../../../../assets/images/icons/icn_linkedin_logo.png')}
        />
        <Text style={styles.socialItemText}>
          {Strings.makeBold(strings.SETTINGS.HOME.LINKEDIN_PAGE)}
        </Text>
      </ListItem>
      <ListItem
        underlayColor={'white'}
        style={styles.item}
        noIndent
        button
        onPress={() => openSocialPopup('website')}>
        <Image
          resizeMode={'contain'}
          style={[
            styles.socialLoginButtonIcon,
            {width: 28, height: 28, left: 16},
          ]}
          source={require('../../../../assets/images/logo/icn_thefaculty_hat_2021.png')}
        />
        <Text style={styles.socialItemText}>
          {Strings.makeBold(strings.SETTINGS.HOME.THEFACULTY_WEBSITE)}
        </Text>
      </ListItem>

      <Separator style={styles.headerBar} />
      <ListItem
        underlayColor={'white'}
        style={styles.item}
        noIndent
        button
        testID={'logoutButton'}
        onPress={() => logOutHandler(dispatch, navigation)}>
        <Text style={styles.logoutItemText}>
          {strings.SETTINGS.HOME.LOGOUT}
        </Text>
      </ListItem>

      <View style={{height: 20}} />
      {__DEV__ && (
        <>
          <Separator style={styles.headerBar}>
            <Text style={styles.label}>
              {Strings.makeBold(strings.SETTINGS.HOME.DEV_SETTINGS)}
            </Text>
          </Separator>
          <ListItem
            underlayColor={'white'}
            style={styles.item}
            noIndent
            button
            onPress={() => {
              navigation.navigate(routes.SETTINGS_MATHJAX);
            }}>
            <Left>
              <Text style={styles.itemText}>Questions Latex test screen</Text>
            </Left>
            <Right>
              <Image
                style={{width: 24, height: 24, tintColor: colors.lightGray}}
                resizeMode={'contain'}
                source={require('../../../../assets/images/icons/icn_arrow_right_blu.png')}
              />
            </Right>
          </ListItem>
          <ListItem
            underlayColor={'white'}
            style={styles.item}
            noIndent
            button
            onPress={() => {
              navigation.navigate(routes.SETTINGS_SOCIAL_SIGNIN);
            }}>
            <Left>
              <Text style={styles.itemText}>Social SignIn test screen</Text>
            </Left>
            <Right>
              <Image
                style={{width: 24, height: 24, tintColor: colors.lightGray}}
                resizeMode={'contain'}
                source={require('../../../../assets/images/icons/icn_arrow_right_blu.png')}
              />
            </Right>
          </ListItem>
          <ListItem
            underlayColor={'white'}
            style={styles.item}
            noIndent
            button
            onPress={() => {
              navigation.navigate(routes.SETTINGS_STRIPE_TEST_SCREEN);
            }}>
            <Left>
              <Text style={styles.itemText}>Stripe test screen</Text>
            </Left>
            <Right>
              <Image
                style={{width: 24, height: 24, tintColor: colors.lightGray}}
                resizeMode={'contain'}
                source={require('../../../../assets/images/icons/icn_arrow_right_blu.png')}
              />
            </Right>
          </ListItem>
          <ListItem
            underlayColor={'white'}
            style={styles.item}
            noIndent
            button
            onPress={() => {
              navigation.navigate(routes.SETTINGS_FLATLIST_TEST_SCREEN);
            }}>
            <Left>
              <Text style={styles.itemText}>FlatList test screen</Text>
            </Left>
            <Right>
              <Image
                style={{width: 24, height: 24, tintColor: colors.lightGray}}
                resizeMode={'contain'}
                source={require('../../../../assets/images/icons/icn_arrow_right_blu.png')}
              />
            </Right>
          </ListItem>
          <View style={{height: 20}} />
        </>
      )}
    </Content>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
  },
  label: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    color: colors.darkGray,
  },
  item: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: 18,
    borderColor: colors.white,
    shadowColor: colors.lightGray,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 6,
  },
  itemText: {
    fontFamily: constants.DEFAULT_FONT,
    color: colors.darkGray,
    marginLeft: 0,
  },
  logoutItemText: {
    fontFamily: constants.DEFAULT_FONT,
    color: colors.THEFACULTY,
    marginLeft: 0,
  },
  headerBar: {
    height: 55,
    paddingTop: 15,
    backgroundColor: colors.WHITE,
  },
  socialItemText: {
    position: 'absolute',
    fontFamily: constants.DEFAULT_FONT,
    color: colors.darkGray,
    left: 60,
  },
  socialLoginButtonIcon: {
    position: 'absolute',
    left: 20,
    width: 20,
    height: 20,
    marginRight: 10,
  },
  overlayContainer: {
    backgroundColor: 'transparent',
  },
  overlay: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    minWidth: 300,
    minHeight: 300,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  overlayLogo: {
    width: 90,
    height: 90,
  },
  overlayText: {
    fontSize: 15,
    fontFamily: constants.DEFAULT_FONT,
    textAlign: 'center',
  },
  deleteConfirmButton: {
    height: 36,
    width: 160,
  },
});

export default ProfileSettings;
