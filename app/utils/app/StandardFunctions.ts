/*
    STANDARD FUNCTIONS
*/
import { Alert, Linking } from "react-native";
import { colors, strings } from "../../config";
import { InAppBrowser } from "react-native-inappbrowser-reborn";
import { Alert_Button } from "../../config/interfaces";
import analytics from "@react-native-firebase/analytics";
import { UserData } from "../../config/constants";
import Sound from "react-native-sound";
import DeviceInfo from "react-native-device-info";
import { routes } from "../../navigation/rootNavigation/navigation.constants";
import { loadCouponList, loadObtainedCouponList } from "../../modules/Benefits/_ReduxStore/_actions";
import { store } from "../../config/redux/store";
import InAppLoadingPopover from "../../components/InAppLoadingPopover";
import { Overlay } from "teaset";
import ReactNativeHapticFeedback, { HapticFeedbackTypes } from "react-native-haptic-feedback";
import { Observable } from "../../modules/_CommonModels/ViewModelBase";
import { sounds } from "../../config";

export class standardFunctions {
  static convert_date_from_rfc_to_string(
    rfc_date: string,
    with_years: boolean = false,
  ) {
    let current_date = new Date();
    let date = new Date(Date.parse(rfc_date));
    let day = date.getUTCDate();
    let month = date.getUTCMonth();
    let year = date.getUTCFullYear();

    var day_string = day.toString();
    if (day < 10) {
      day_string = '0' + day;
    }

    let month_string = strings.MONTHS[month + 1];

    var final_string = day_string + ' ' + month_string;
    if (year != current_date.getUTCFullYear() || with_years) {
      final_string = final_string + ' ' + year.toString();
    }

    return final_string;
  }

  static convert_date_from_rfc_to_string_with_hours(
    rfc_date: string,
    with_hours: boolean = false,
  ) {
    let current_date = new Date();
    let date = new Date(Date.parse(rfc_date));
    let day = date.getUTCDate();
    let month = date.getUTCMonth();
    let year = date.getUTCFullYear();

    var day_string = day.toString();
    if (day < 10) {
      day_string = '0' + day;
    }

    let month_string = strings.MONTHS[month + 1];

    var final_string = day_string + ' ' + month_string;
    if (year != current_date.getUTCFullYear() || with_hours) {
      final_string = final_string + ' ' + year.toString();
    }

    return final_string;
  }

  static convert_date_from_rfc_to_small_string(
    rfc_date: string,
    with_years: boolean = false,
  ) {
    let current_date = new Date();
    let date = new Date(Date.parse(rfc_date));
    let day = date.getUTCDate();
    let month = date.getUTCMonth();
    let year = date.getUTCFullYear();

    var day_string = day.toString();
    if (day < 10) {
      day_string = '0' + day;
    }

    var month_string = (month + 1).toString();
    if (month + 1 < 10) {
      month_string = '0' + (month + 1);
    }

    var final_string = day_string + '/' + month_string;
    if (year != current_date.getUTCFullYear() || with_years) {
      final_string = final_string + '/' + year.toString();
    }

    return final_string;
  }

  static days_bewteen_dates(start: string, finish: string) {
    let start_date = new Date(Date.parse(start));
    let finish_date = new Date(Date.parse(finish));
    let sd = start_date.setMinutes(
      start_date.getMinutes() - start_date.getTimezoneOffset(),
    );
    let fd = finish_date.setMinutes(
      finish_date.getMinutes() - finish_date.getTimezoneOffset(),
    );
    return (fd - sd) / (1000 * 60 * 60 * 24);
  }

  static show_alert(
    title: string,
    message: string,
    cancelable: boolean = false,
    OKCallback?: any,
  ) {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'OK',
          onPress: () => {
            OKCallback && OKCallback();
          },
        },
      ],
      {cancelable},
    );
  }

  static show_alert_async(
    title: string,
    message: string,
    cancelable: boolean = false,
  ) {
    return new Promise((resolve, eject) => {
      Alert.alert(
        title,
        message,
        [
          {
            text: 'OK',
            onPress: () => {
              resolve(true);
            },
          },
        ],
        {cancelable},
      );
    });
  }

  static show_alert_with_button_async(
    title: string,
    message: string,
    button_title: string,
    on_press: () => void,
    cancelable: boolean = false,
  ) {
    return new Promise((resolve, eject) => {
      Alert.alert(title, message, [{text: button_title, onPress: on_press}], {
        cancelable,
      });
    });
  }

  static show_alert_with_buttons_async(
    title: string,
    message: string,
    cancelable: boolean = false,
    buttons: Alert_Button[],
  ) {
    return new Promise((resolve, eject) => {
      // @ts-ignore
      Alert.alert(title, message, buttons, {cancelable});
    });
  }

  static show_alert_with_button(
    title: string,
    message: string,
    button_title: string,
    on_press: () => void,
    cancelable: boolean = false,
  ) {
    Alert.alert(title, message, [{text: button_title, onPress: on_press}], {
      cancelable,
    });
  }

  static show_alert_with_buttons(
    title: string,
    message: string,
    cancelable: boolean = false,
    buttons: Alert_Button[],
  ) {
    // @ts-ignore
    Alert.alert(title, message, buttons, {cancelable});
  }

  static show_confirm_async({
    title = null,
    message = null,
    buttons = [],
    cancelable = true,
  }: {
    title?: string;
    message?: string;
    buttons?: any;
    cancelable?: boolean;
  }) {
    // Alert.alert(title, message, buttons, {cancelable: true});
    return new Promise((resolve, eject) => {
      const new_buttons = buttons.map((button: any, index) => {
        return {text: button.text, onPress: () => resolve(index)};
      });
      Alert.alert(title, message, new_buttons, {cancelable});
    });
  }

  static async open_browser(url: string) {
    let openInBrowser = url.includes('?openInBrowser');
    if (
      !url.toLowerCase().startsWith('http') &&
      !url.toLowerCase().startsWith('https')
    ) {
      url = 'https://' + url;
    }
    try {
      if ((await InAppBrowser.isAvailable()) && !openInBrowser) {
        await InAppBrowser.close();
        await InAppBrowser.open(url, {
          /* iOS */
          dismissButtonStyle: 'close',
          animated: true,
          preferredControlTintColor: colors.THEFACULTY,
          modalEnabled: false,
          enableBarCollapsing: false,

          /* Android */
          showTitle: true,
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          showInRecents: false,
        });
      } else {
        Linking.openURL(url);
      }
    } catch (e) {}
  }

  static update_badge_notification() {
    // RenderBadges.update_badge_notification();
  }

  static async add_firebase_event_log(
    section: string,
    log_name: string,
    other_props?: any,
  ) {
    var device_id = undefined;
    try {
      device_id = DeviceInfo.getUniqueId();
    } catch (e) {
      console.log('1 Error on Firebase Event Log:', e);
    }

    try {
      if (UserData.getUserData().user_id !== undefined) {
        analytics().setUserId(UserData.getUserData().user_id);
      }
      if (UserData.getUserData().user_id) {
        analytics().logEvent(section + '_' + log_name, {
          user_id: UserData.getUserData().user_id,
          device_id: device_id,
          ...other_props,
        });
      } else {
        analytics().logEvent(section + '_' + log_name, {
          device_id: device_id,
          ...other_props,
        });
      }
    } catch (e) {
      console.log('2 Error on Firebase Event Log:', e);
    }
  }

  /*
    [USAGE EXAMPLE]
    let success = await standardFunctions.uploadImage({
          contentType: file_type,
          uploadUrl: signed_url,
          fileName: file_name
    }, local_file_uri);
  */
  static async uploadImage(resourceData, file) {
    return new Promise((resolver, rejecter) => {
      try {
        const xhr = new XMLHttpRequest();

        xhr.onload = () => {
          if (xhr.status < 400) {
            resolver(true);
          } else {
            const error = new Error(xhr.response);
            console.log(error);
            rejecter(error);
          }
        };
        xhr.onerror = error => {
          console.log(error);
          rejecter(error);
        };

        xhr.open('PUT', resourceData.uploadUrl);
        xhr.setRequestHeader('Content-Type', resourceData.contentType);
        xhr.setRequestHeader(
          'x-goog-meta-original-filename',
          resourceData.fileName,
        );
        xhr.send({uri: file});
      } catch (error) {
        console.log('error on upload', error);
      }
    });
  }

  /*
    [USAGE EXAMPLE]
    standardFunctions.play_sound_effect(path_to_sound);
  */
  static play_sound_effect(sound_path: string) {
    try {
      Sound.setCategory('Playback');
      if (sound_path !== undefined && sound_path !== '') {
        let sound = new Sound(sound_path, error => {
          if (error) {
            console.log('Cannot play sound effect:', error);
            return;
          }

          sound.setVolume(.2);
          sound.play(success => {
            sound.reset();
          });
        });
      } else {
        console.log('Cannot play sound effect: sound effect not found');
      }
    } catch (e) {
      console.log('Cannot play sound effect:', e);
    }
  }

  static play_tap_sound() {
    try {
      Sound.setCategory('Playback');
      let sound = new Sound(sounds.GENERAL.MAIN_CLICK, error => {
        if (error) {
          console.log('Cannot play sound effect:', error);
          return;
        }

        sound.setVolume(.2);
        sound.play(success => {
          sound.reset();
        });
      });
    } catch (e) {
      console.log('Cannot play sound effect:', e);
    }
  }

  static async open_inapp_action(navigation, action, props = {}) {
    if (action === undefined || action === '') return;
    let action_split = action.split('#');
    if (action_split.length >= 3) {
      if (action_split[0] === 'APP') {
        if (action_split[1] === 'COUPONS' && action_split[2] === 'GENERAL') {
          const category = action_split[3];
          navigation.navigate(routes.COUPONS, {
            autoselected_tab: 0,
            autoselected_category: category,
          });
        } else if (
          action_split[1] === 'COUPONS' &&
          action_split[2] === 'SAFE'
        ) {
          navigation.navigate(routes.COUPONS, {
            autoselected_tab: 1,
          });
        } else if (
          action_split[1] === 'COUPONS' &&
          action_split[2] !== undefined
        ) {
          // Go to Coupon Screen
          let loading_overlay_id = InAppLoadingPopover().show({navigation});
          await store.dispatch(loadCouponList());
          await store.dispatch(loadObtainedCouponList());
          let coupon_id = action_split[2];

          Overlay.hide(loading_overlay_id, true);

          // @ts-ignore
          const {
            route: {params},
          } = props as any;
          const title = ((params && params['carousel_data']) || {}).page_title;
          navigation.navigate(routes.COUPONS_NAVIGATOR, {
            screen: routes.COUPONS_COUPON,
            params: {coupon_id, title},
          });
        } else if (
          (action_split[1] === 'BESTOF' || action_split[1] === 'BESTOFS') &&
          action_split[2] === 'GENERAL'
        ) {
          navigation.navigate({
            name: routes.BESTOF,
          });
        } else if (
          action_split[1] === 'FRIENDS' &&
          action_split[2] === 'GENERAL'
        ) {
          navigation.navigate(routes.COMMUNITY, {
            screen: routes.FRIENDS,
          });
        } else if (
          action_split[1] === 'SETTINGS' &&
          action_split[2] === 'GENERAL'
        ) {
          navigation.navigate(routes.SETTINGS_NAVIGATOR, {
            screen: routes.SETTINGS_HOME,
          });
        } else if (
          action_split[1] === 'TEST' &&
          action_split[2] === 'GENERAL'
        ) {
          navigation.navigate(routes.TEST_NAVIGATOR, {
            screen: routes.TEST_HOME,
          });
        } else if (
          action_split[1] === 'COINS' &&
          action_split[2] === 'GENERAL'
        ) {
          navigation.navigate({
            name: routes.WALLET,
          });
        } else if (
          action_split[1] === 'REFERRAL_CODE' &&
          action_split[2] === 'GENERAL'
        ) {
          navigation.navigate({
            name: routes.REFERRAL_CODE,
          });
        } else if (
          action_split[1] === 'PROFILE' &&
          action_split[2] === 'GENERAL'
        ) {
          navigation.navigate(routes.PROFILE_NAVIGATOR, {
            screen: routes.PROFILE_HOME,
          });
        } else if (
          action_split[1] === 'PROFILE' &&
          action_split[2] === 'VERIFY_STUDENT'
        ) {
          navigation.navigate(routes.PROFILE_NAVIGATOR, {
            screen: routes.PROFILE_HOME,
            params: {auto_enable_university_type: true},
          });
        }

        if (action_split[1] === 'BROWSER') {
          let url_to_open = action.replace('APP#BROWSER#', '');
          standardFunctions.open_browser(url_to_open);
        }
      }
    }
  }

  static play_vibration_effect(
    type: HapticFeedbackTypes,
    feedbackOptions = undefined,
  ) {
    return;
    if (
      Observable.getReduxValue('is_vibration_enabled') !== undefined &&
      Observable.getReduxValue('is_vibration_enabled') !== false
    ) {
      ReactNativeHapticFeedback.trigger(
        type,
        feedbackOptions
          ? feedbackOptions
          : {enableVibrateFallback: true, ignoreAndroidSystemSettings: true},
      );
    }
  }
}

export default standardFunctions;
