import { Platform } from "react-native";
import VersionManager from "./VersionManager";
import constants, { Firebase_IDToken } from "../../config/constants";
import { Observable } from "../../modules/_CommonModels/ViewModelBase";

function callServer(api: string, post_data: object, result: any) {
  const apiUrl =
    constants.APP_MODE_CONTROLLED_BY_SERVER === 'PRODUCTION'
      ? constants.PRODUCTION_SERVER_URL
      : constants.TESTING_SERVER_URL;
  fetch(apiUrl + api, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      charset: 'utf-8',
      'User-Agent':
        'thefaculty-' + Platform.OS + '/' + VersionManager.getCurrentVersion(),
    },
    body: JSON.stringify(post_data),
  })
    .then(responseJson => {
      responseJson.json().then(function (data) {
        let auto_retry_call_number =
          typeof Observable.getReduxValue('auto_retry_call_number') === 'number'
            ? Observable.getReduxValue('auto_retry_call_number')
            : 0;
        if (data.error === 'conflict detected' && auto_retry_call_number < 3) {
          Observable.setReduxValue(
            'auto_retry_call_number',
            auto_retry_call_number + 1,
          );
          result(callServer(api, post_data, result));
        } else {
          Observable.setReduxValue('auto_retry_call_number', 0);
          result(data);
        }
      });
    })
    .catch(error => {
      result({success: false, error});
    });
}

export class server {
  /*
        Server's APIs
  */

  static get_user_data(handleResult: any) {
    let post_data = {firebase_idToken: Firebase_IDToken.firebase_idToken};
    callServer('profile/get_user_data', post_data, handleResult);
  }

  static update_account(new_data: any, handleResult: any) {
    var api_to_call = 'profile/update_account';
    new_data['firebase_idToken'] = Firebase_IDToken.firebase_idToken;
    callServer(api_to_call, new_data, handleResult);
  }

  static update_phone_carrier_name(
    phone_carrier_name: string,
    handleResult: any,
  ) {
    let post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      phone_carrier_name,
    };
    callServer('profile/update_phone_carrier_name', post_data, handleResult);
  }

  /*
        General APIs
      */
  static get_carousel(handleResult: any) {
    let post_data = {firebase_idToken: Firebase_IDToken.firebase_idToken};
    callServer('server/get_carousel', post_data, handleResult);
  }

  static get_homepage_blocks(handleResult: any) {
    let post_data = {firebase_idToken: Firebase_IDToken.firebase_idToken};
    callServer('server/get_homepage_blocks', post_data, handleResult);
  }

  static is_legal_check_update_required(handleResult: any) {
    let post_data = {firebase_idToken: Firebase_IDToken.firebase_idToken};
    callServer(
      'server/is_legal_check_update_required',
      post_data,
      handleResult,
    );
  }

  /*
        Referral Codes APIs
      */
  static get_used_referral_codes(handleResult: any) {
    let post_data = {firebase_idToken: Firebase_IDToken.firebase_idToken};
    callServer('referral_code/get_used_codes', post_data, handleResult);
  }

  /*
        Community APIs
      */
  static get_friends(handleResult: any) {
    let post_data = {firebase_idToken: Firebase_IDToken.firebase_idToken};
    callServer('community/get_friends', post_data, handleResult);
  }

  static get_user_data_by_user_id(user_id: string, handleResult: any) {
    let post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      user_id: user_id,
    };
    callServer('community/get_user_data_by_user_id', post_data, handleResult);
  }

  static send_friend_request(friend_user_id: string, handleResult: any) {
    let post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      friend_user_id: friend_user_id,
    };
    callServer('community/send_friend_request', post_data, handleResult);
  }

  static remove_friendship(friend_user_id: string, handleResult: any) {
    let post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      friend_user_id: friend_user_id,
    };
    callServer('community/remove_friendship', post_data, handleResult);
  }

  static get_pending_friendship_requests(handleResult: any) {
    let post_data = {firebase_idToken: Firebase_IDToken.firebase_idToken};
    callServer(
      'community/get_pending_friendship_requests',
      post_data,
      handleResult,
    );
  }

  static respond_to_friendship_request(
    friendship_id: string,
    action: string,
    handleResult: any,
  ) {
    let post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      friendship_id: friendship_id,
      action: action,
    };
    callServer(
      'community/respond_to_friendship_request',
      post_data,
      handleResult,
    );
  }

  /*
        Contest APIs
      */

  static is_esselunga_page_to_show(handleResult: any) {
    let post_data = {name: 'is_esselunga_page_to_show'};
    callServer('server/get_static_variable', post_data, handleResult);
  }

  static get_next_coins_reset_date(handleResult: any) {
    let post_data = {name: 'next_coins_reset_date'};
    callServer('server/get_static_variable', post_data, handleResult);
  }

  static get_popups(handleResult: any) {
    let post_data = {firebase_idToken: Firebase_IDToken.firebase_idToken};
    callServer('server/get_popups', post_data, handleResult);
  }
}

export const CallServer = server;
export let abortController;

class CallServerPromiseClass {
  timeoutId: any = 0;

  call_server_promise(
    api: string,
    post_data: object,
    always_production: boolean = false,
    timeout: number = 10000,
  ): Promise<{success: boolean; data: any; aborted: boolean}> {
    return new Promise((resolve, eject) => {
      const fetchUrl = always_production
        ? constants.PRODUCTION_SERVER_URL
        : constants.APP_MODE_CONTROLLED_BY_SERVER === 'PRODUCTION'
        ? constants.PRODUCTION_SERVER_URL
        : constants.TESTING_SERVER_URL;
      abortController = new AbortController();
      let responseText = '';
      fetch(fetchUrl + api, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          charset: 'utf-8',
          'User-Agent':
            'thefaculty-' +
            Platform.OS +
            '/' +
            VersionManager.getCurrentVersion(),
        },
        body: JSON.stringify(post_data),
        signal: abortController.signal,
      })
        .then(async response => {
          responseText = await response.text();
          try {
            return JSON.parse(responseText);
          } catch (e) {
            return {success: false, data: null, aborted: true};
          }
        })
        .then(response => {
          if (response) {
            let auto_retry_call_number =
              typeof Observable.getReduxValue('auto_retry_call_number') ===
              'number'
                ? Observable.getReduxValue('auto_retry_call_number')
                : 0;
            if (
              response.error !== 'conflict detected' ||
              auto_retry_call_number >= 3
            ) {
              Observable.setReduxValue('auto_retry_call_number', 0);
              resolve(response);
            } else if (auto_retry_call_number < 3) {
              console.log(
                'Autoretrying conflict detected: ',
                auto_retry_call_number + 1,
              );
              Observable.setReduxValue(
                'auto_retry_call_number',
                auto_retry_call_number + 1,
              );
              resolve(
                this.call_server_promise(
                  api,
                  post_data,
                  always_production,
                  timeout,
                ),
              );
            }
          }
        })
        .catch(error => {
          // To do: need to handle error of expired firebase token
          // error on request {"code": 10, "error": "expired firebase token", "success": false}
          if (error.name === 'AbortError') {
            resolve({success: false, data: null, aborted: true});
          } else {
            error.responseText = responseText;
            eject(error);
          }
        });
      if (this.timeoutId) clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(
        () => {
          abortController.abort();
        },
        timeout ? timeout : 10000,
      );
    });
  }

  is_application_available() {
    let post_data = {
      names: ['is_application_available', 'application_unavailable_message'],
    };
    return this.call_server_promise(
      '/server/get_many_static_variables',
      post_data,
    );
  }

  update_firebase_notification_token(firebase_notificationToken: string) {
    let post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      firebase_notificationToken,
    };
    return this.call_server_promise(
      'profile/update_firebase_notificationtoken',
      post_data,
    );
  }

  remove_firebase_notification_token(firebase_notificationToken: string) {
    let post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      firebase_notificationToken,
    };
    return this.call_server_promise(
      'profile/remove_firebase_notificationtoken',
      post_data,
    );
  }

  get_user_data(idToken = '') {
    let post_data = {
      firebase_idToken: idToken || Firebase_IDToken.firebase_idToken,
    };
    return this.call_server_promise('profile/get_user_data', post_data);
  }

  password_reset(pattern = '') {
    let post_data = {
      pattern,
    };
    return this.call_server_promise('profile/password_reset', post_data);
  }

  check_nickname_exists(nickname: string) {
    let post_data = {nickname};
    return this.call_server_promise(
      '/profile/does_nickname_already_exist',
      post_data,
    );
  }

  check_email_exists(email: string) {
    let post_data = {email: email.toLowerCase()};
    return this.call_server_promise(
      '/profile/does_email_already_exist',
      post_data,
    );
  }

  check_is_university_email(email: string) {
    let post_data = {email: email.toLowerCase()};
    return this.call_server_promise('/profile/is_student_email', post_data);
  }

  search_majors(search_data) {
    return this.call_server_promise('/profile/search_major', search_data);
  }

  search_universities(search_data) {
    const post_data = {
      ...search_data,
      firebase_idToken: Firebase_IDToken.getIDToken(),
    };
    return this.call_server_promise('/profile/search_university', post_data);
  }

  get_all_faculties() {
    return this.call_server_promise('/profile/get_all_faculties', {});
  }

  get_suggested_subjects() {
    const post_data = {
      firebase_idToken: Firebase_IDToken.getIDToken(),
    };
    return this.call_server_promise(
      '/profile/get_suggested_subjects',
      post_data,
    );
  }

  create_standard_account(userInfo) {
    const post_data = userInfo;
    return this.call_server_promise(
      '/profile/create_standard_account',
      post_data,
    );
  }

  create_standard_account_v2(signUpInfo) {
    return this.call_server_promise(
      '/profile/create_standard_account',
      signUpInfo,
    );
  }

  get_static_variable(name: string) {
    let post_data = {name};
    return this.call_server_promise('/server/get_static_variable', post_data);
  }

  get_partners() {
    let post_data = {firebase_idToken: Firebase_IDToken.firebase_idToken};
    return this.call_server_promise('coupons/get_partners', post_data);
  }

  get_partners_ads() {
    let post_data = {firebase_idToken: Firebase_IDToken.firebase_idToken};
    return this.call_server_promise('ads/get_partners', post_data);
  }

  get_user_total_coins() {
    let post_data = {firebase_idToken: Firebase_IDToken.firebase_idToken};
    return this.call_server_promise('coins/get_user_total_coins', post_data);
  }

  get_max_coins() {
    let post_data = {name: 'max_coins'};
    return this.call_server_promise('server/get_static_variable', post_data);
  }

  get_games_available() {
    let post_data = {firebase_idToken: Firebase_IDToken.firebase_idToken};
    return this.call_server_promise(
      'bestof/get_available_bestofs_data',
      post_data,
    );
  }

  get_faculty_friends() {
    let post_data = {firebase_idToken: Firebase_IDToken.firebase_idToken};
    return this.call_server_promise('community/get_faculty_friends', post_data);
  }

  insert_new_code(referral_code: string) {
    let post_data = {
      referral_code,
      firebase_idToken: Firebase_IDToken.firebase_idToken,
    };
    return this.call_server_promise('referral_code/insert_new_code', post_data);
  }

  // BestOf v1
  start_bestof(friend_id = '') {
    let post_data = {
      friend_id,
      firebase_idToken: Firebase_IDToken.firebase_idToken,
    };
    return this.call_server_promise('bestof/start_bestof', post_data);
  }

  get_ongoing_bestofs() {
    let post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
    };
    return this.call_server_promise('bestof/get_ongoing_bestofs', post_data);
  }

  get_finished_bestofs_limited() {
    let post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
    };
    return this.call_server_promise(
      'bestof/get_finished_bestofs_limited',
      post_data,
    );
  }

  get_bestof_data(bestof_id) {
    let post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      bestof_id,
    };
    return this.call_server_promise('bestof/get_bestof_data', post_data);
  }

  start_round(bestof_id) {
    let post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      bestof_id,
    };
    return this.call_server_promise('bestof/start_round', post_data);
  }

  send_bestof_answer({
    bestof_id,
    round_string,
    question_number,
    answer_number,
  }) {
    let post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      bestof_id,
      round_string,
      question_number,
      answer_number,
    };
    return this.call_server_promise(
      'bestof/send_bestof_answer_and_get_correct_answer',
      post_data,
    );
  }

  finish_round(bestof_id, round_string) {
    let post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      bestof_id,
      round_string,
    };
    return this.call_server_promise('bestof/finish_round', post_data);
  }

  reject_bestof(bestof_id) {
    let post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      bestof_id,
    };
    return this.call_server_promise('bestof/reject_bestof', post_data);
  }

  get_coins_transactions_old() {
    let post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
    };
    return this.call_server_promise('coins/get_coins_transactions', post_data);
  }

  get_coins_transactions(params) {
    let post_data = {
      ...params,
      firebase_idToken: Firebase_IDToken.firebase_idToken,
    };
    return this.call_server_promise('coins/get_coins_transactions', post_data);
  }

  get_bestofs_won_or_lost_count() {
    let post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
    };
    return this.call_server_promise(
      'bestof/get_bestofs_won_or_lost_count',
      post_data,
    );
  }

  // BestOf v2

  get_bestof_constants() {
    let post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
    };
    return this.call_server_promise('bestof/get_bestof_constants', post_data);
  }

  start_bestof_v2({friend_user_id = undefined, same_faculty = true}) {
    let post_data = {
      friend_user_id,
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      same_faculty,
    };
    return this.call_server_promise('bestof/start_bestof', post_data);
  }

  get_bestof_scoreboard_score_and_rank() {
    let post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
    };
    return this.call_server_promise(
      'bestof/get_bestof_scoreboard_score_and_rank',
      post_data,
    );
  }

  get_bestof_scoreboard(request_data = {}) {
    let post_data = {
      ...request_data,
      firebase_idToken: Firebase_IDToken.firebase_idToken,
    };
    return this.call_server_promise('bestof/get_bestof_scoreboard', post_data);
  }

  get_finished_bestofs(request_data = {}) {
    let post_data = {
      ...request_data,
      firebase_idToken: Firebase_IDToken.firebase_idToken,
    };
    return this.call_server_promise('bestof/get_finished_bestofs', post_data);
  }

  get_finished_bestofs_opponents_faculties_universities() {
    let post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
    };
    return this.call_server_promise(
      'bestof/get_finished_bestofs_opponents_faculties_universities',
      post_data,
    );
  }

  get_bestof_data_v2(bestof_id) {
    let post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      bestof_id,
    };
    return this.call_server_promise('bestof/get_bestof_data', post_data);
  }

  send_bestof_answer_v2(answer_data: any = {}) {
    const {bestof_id, question_number, answer_number, answer_time} =
      answer_data;

    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      bestof_id,
      question_number,
      answer_number,
      answer_time,
    };
    return this.call_server_promise('bestof/send_bestof_answer', post_data);
  }

  get_mark_description(mark) {
    let post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      mark,
    };
    return this.call_server_promise('bestof/get_mark_description', post_data);
  }

  leave_bestof_v2(bestof_id) {
    let post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      bestof_id,
    };
    return this.call_server_promise('bestof/leave_bestof', post_data);
  }

  question_feedback(params) {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      ...params,
    };
    return this.call_server_promise('bestof/question_feedback', post_data);
  }

  get_date_string() {
    return this.call_server_promise('server/get_date_string', {});
  }

  get_is_bestof_available() {
    const post_data = {
      name: 'is_bestof_available',
    };
    return this.call_server_promise('server/get_static_variable', post_data);
  }

  get_is_coupons_available() {
    const post_data = {
      name: 'is_coupons_available',
    };
    return this.call_server_promise('server/get_static_variable', post_data);
  }

  get_is_prizes_available() {
    const post_data = {
      name: 'is_prizes_available',
    };
    return this.call_server_promise('server/get_static_variable', post_data);
  }

  get_coupons() {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
    };
    return this.call_server_promise('coupons/get_coupons', post_data);
  }

  get_used_coupons_marked_unused(skip?) {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      limit: 20,
      ...(skip && {skip}),
    };
    return this.call_server_promise(
      'coupons/get_used_coupons_marked_unused',
      post_data,
    );
  }

  get_used_coupons_marked_used(skip?) {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      limit: 20,
      ...(skip && {skip}),
    };
    return this.call_server_promise(
      'coupons/get_used_coupons_marked_used',
      post_data,
    );
  }

  mark_coupon_as_used(coupon_id) {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      coupon_id,
    };
    return this.call_server_promise('coupons/mark_coupon_as_used', post_data);
  }

  mark_coupon_as_unused(coupon_id) {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      coupon_id,
    };
    return this.call_server_promise('coupons/mark_coupon_as_unused', post_data);
  }

  get_used_coupons(skip?) {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      limit: 20,
      ...(skip && {skip}),
    };
    return this.call_server_promise('coupons/get_used_coupons', post_data);
  }

  get_used_coupons_old(params) {
    const post_data = {
      ...params,
      firebase_idToken: Firebase_IDToken.firebase_idToken,
    };
    return this.call_server_promise('coupons/get_used_coupons', post_data);
  }

  redeem_coupon(coupon_id) {
    const post_data = {
      coupon_id,
      firebase_idToken: Firebase_IDToken.firebase_idToken,
    };
    return this.call_server_promise(
      'coupons/redeem_coupon',
      post_data,
      false,
      60000,
    );
  }

  get_faq_text() {
    const post_data = {
      name: 'faq_text',
    };
    return this.call_server_promise('server/get_static_variable', post_data);
  }

  update_account(new_data: any) {
    new_data['firebase_idToken'] = Firebase_IDToken.firebase_idToken;
    console.log('new_data', new_data);
    return this.call_server_promise('profile/update_account', new_data);
  }

  get_by_choice_subjects() {
    var post_data = {firebase_idToken: Firebase_IDToken.firebase_idToken};
    return this.call_server_promise(
      'profile/get_by_choice_subjects',
      post_data,
    );
  }

  verify_esselunga_account(fidaty_card) {
    var post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      fidaty_card,
    };
    return this.call_server_promise(
      'partners/verify_esselunga_account',
      post_data,
    );
  }

  send_uninstall_reasons(uninstall_reasons) {
    var post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      uninstall_reasons,
    };
    return this.call_server_promise(
      'profile/send_uninstall_reasons',
      post_data,
    );
  }

  disable_account() {
    var post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
    };
    return this.call_server_promise('profile/disable_account', post_data);
  }

  does_email_already_exist(email) {
    var post_data = {
      email,
    };
    return this.call_server_promise(
      'profile/does_email_already_exist',
      post_data,
    );
  }

  is_student_email(email) {
    const post_data = {
      email,
    };
    return this.call_server_promise('profile/is_student_email', post_data);
  }

  get_university_data_from_email(email) {
    var post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      email,
    };
    return this.call_server_promise(
      'profile/get_university_data_from_email',
      post_data,
    );
  }

  upgrade_to_student_account(params) {
    const post_data = {
      firebase_idToken: Firebase_IDToken.getIDToken(),
      ...params,
    };
    return this.call_server_promise(
      'profile/upgrade_to_student_account',
      post_data,
    );
  }

  is_verify_standard_account_email_available(token = {}) {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      ...token,
    };

    return this.call_server_promise(
      'profile/is_verify_standard_account_email_available',
      post_data,
    );
  }

  verify_standard_account_email(token = {}) {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      ...token,
    };
    return this.call_server_promise(
      'profile/verify_standard_account_email',
      post_data,
    );
  }

  is_upgrade_to_student_account_available() {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
    };
    return this.call_server_promise(
      'profile/is_upgrade_to_student_account_available',
      post_data,
    );
  }

  get_many_static_variables(names) {
    let post_data = {names};
    return this.call_server_promise(
      'server/get_many_static_variables',
      post_data,
    );
  }

  get_versions(names) {
    let post_data = {names};
    return this.call_server_promise(
      'server/get_many_static_variables',
      post_data,
      true,
    );
  }

  check_for_pending_prizes() {
    let post_data = {firebase_idToken: Firebase_IDToken.firebase_idToken};
    return this.call_server_promise(
      'prizes/check_for_pending_prizes',
      post_data,
    );
  }

  check_for_missing_verification() {
    let post_data = {firebase_idToken: Firebase_IDToken.firebase_idToken};
    return this.call_server_promise(
      'prizes/check_for_missing_verification',
      post_data,
    );
  }

  send_verification({
    id_card_front_image_url,
    id_card_back_image_url,
    tax_card_front_image_url,
    tax_card_back_image_url,
  }) {
    let post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      id_card_front_image_url,
      id_card_back_image_url,
      tax_card_front_image_url,
      tax_card_back_image_url,
    };
    return this.call_server_promise('prizes/send_verification', post_data);
  }

  get_friends() {
    let post_data = {firebase_idToken: Firebase_IDToken.firebase_idToken};
    return this.call_server_promise('community/get_friends', post_data);
  }

  get_pending_friendship_requests() {
    let post_data = {firebase_idToken: Firebase_IDToken.firebase_idToken};
    return this.call_server_promise(
      'community/get_pending_friendship_requests',
      post_data,
    );
  }

  search_user(pattern: string) {
    let post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      pattern: pattern,
    };
    return this.call_server_promise('community/search_user', post_data);
  }

  is_standard_email_missing() {
    let post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
    };
    return this.call_server_promise(
      'profile/is_standard_email_missing',
      post_data,
    );
  }

  fill_missing_standard_email(email: string) {
    let post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      email,
    };
    return this.call_server_promise(
      'profile/fill_missing_standard_email',
      post_data,
    );
  }

  get_bought_test_instances(): Promise<{data: []; success: boolean}> {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
    };
    return this.call_server_promise(
      'tests/get_bought_test_instances',
      post_data,
    );
  }

  get_all_majors(): Promise<{data: []; success: boolean}> {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
    };
    return this.call_server_promise('tests/get_all_majors', post_data);
  }

  get_major_tests(major_id) {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      major_id,
    };
    return this.call_server_promise('tests/get_major_tests', post_data);
  }

  buy_test_instance({test_id, type, wayback_number}) {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      test_id,
      type,
      wayback_number,
    };
    return this.call_server_promise('tests/buy_test_instance', post_data);
  }

  get_coins_packets() {
    return this.call_server_promise('coins/get_coins_packets', {});
  }

  get_inapp_coins_purchases_transactions(limit = 100, skip = 0) {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      ...(limit && limit > 0 && {limit}),
      ...(skip && {skip}),
    };
    return this.call_server_promise(
      'coins/get_inapp_coins_purchases_transactions',
      post_data,
    );
  }

  validate_receipt(transactionReceipt) {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      platform: Platform.OS === 'ios' ? 'appstore' : 'playstore',
      transactionReceipt: transactionReceipt,
    };
    return this.call_server_promise('coins/validate_receipt', post_data);
  }

  get_test(test_id) {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      test_id,
    };
    return this.call_server_promise('tests/get_test', post_data);
  }

  start_simulation(instance_id, simulator_qr_code) {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      instance_id,
      simulator_qr_code,
    };
    return this.call_server_promise('tests/start_simulation', post_data);
  }

  force_terminate_simulation(simulation_id) {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      simulation_id,
    };
    return this.call_server_promise(
      'tests/force_terminate_simulation',
      post_data,
    );
  }

  get_active_simulation() {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
    };
    return this.call_server_promise('tests/get_active_simulation', post_data);
  }

  get_simulations_filtered(params) {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      ...params,
    };
    return this.call_server_promise(
      'tests/get_simulations_filtered',
      post_data,
    );
  }

  initialize_file_upload(file_type, filename) {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      file_type,
      filename,
    };
    return this.call_server_promise('server/initialize_file_upload', post_data);
  }

  check_is_verify_contact_available() {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
    };
    return this.call_server_promise(
      'profile/is_verify_contact_available',
      post_data,
    );
  }

  verify_contact(contact_email) {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      contact_email,
    };
    return this.call_server_promise('profile/verify_contact', post_data);
  }

  check_is_verify_student_available() {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
    };
    return this.call_server_promise(
      'profile/is_verify_student_available',
      post_data,
    );
  }

  verify_student(params) {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      ...params,
    };
    return this.call_server_promise('profile/verify_student', post_data);
  }

  get_prizes() {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
    };
    return this.call_server_promise('prizes/get_prizes', post_data);
  }

  get_used_prizes(skip?) {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      limit: 20,
      ...(skip && {skip}),
    };
    return this.call_server_promise('prizes/get_used_prizes', post_data);
  }

  redeem_prize(params) {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      ...params,
    };
    return this.call_server_promise(
      'prizes/redeem_prize',
      post_data,
      false,
      60000,
    );
  }

  get_prize_purchase(params) {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      ...params,
    };
    return this.call_server_promise('prizes/get_prize_purchase', post_data);
  }

  mark_prize_as_used(prize_purchase_id) {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      prize_purchase_id,
    };
    return this.call_server_promise('prizes/mark_prize_as_used', post_data);
  }

  mark_prize_as_unused(prize_purchase_id) {
    const post_data = {
      firebase_idToken: Firebase_IDToken.firebase_idToken,
      prize_purchase_id,
    };
    return this.call_server_promise('prizes/mark_prize_as_unused', post_data);
  }
}

export const CallServerPromise = new CallServerPromiseClass();
