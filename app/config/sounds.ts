const sounds = {
  GENERAL: {
    MAIN_BUTTON: require('../../assets/sounds/general/main_button.wav'),
    MAIN_CLICK: require('../../assets/sounds/general/main_click.wav'),
  },
  BESTOFS: {
    FINDING_OPPONENT: require('../../assets/sounds/bestofs/matchmaking/finding_opponent.wav'),
    OPPONENT_FOUND: require('../../assets/sounds/bestofs/matchmaking/opponent_found.wav'),
    FINDING_OPPONENT_1: require('../../assets/sounds/bestofs/matchmaking/finding_opponent/1.wav'),
    FINDING_OPPONENT_2: require('../../assets/sounds/bestofs/matchmaking/finding_opponent/2.wav'),

    OPPONENT_FOUND_1: require('../../assets/sounds/bestofs/matchmaking/opponent_found/1.wav'),
    OPPONENT_FOUND_2: require('../../assets/sounds/bestofs/matchmaking/opponent_found/2.wav'),
    OPPONENT_FOUND_3: require('../../assets/sounds/bestofs/matchmaking/opponent_found/3.wav'),
    OPPONENT_FOUND_4: require('../../assets/sounds/bestofs/matchmaking/opponent_found/4.wav'),
    OPPONENT_FOUND_5: require('../../assets/sounds/bestofs/matchmaking/opponent_found/5.wav'),
    OPPONENT_FOUND_6: require('../../assets/sounds/bestofs/matchmaking/opponent_found/6.wav'),
    OPPONENT_FOUND_7: require('../../assets/sounds/bestofs/matchmaking/opponent_found/7.wav'),
    OPPONENT_FOUND_8: require('../../assets/sounds/bestofs/matchmaking/opponent_found/8.wav'),
    OPPONENT_FOUND_9: require('../../assets/sounds/bestofs/matchmaking/opponent_found/9.wav'),

    MATCH_QUESTION_FADE_IN: require('../../assets/sounds/bestofs/match_question_fade_in.wav'),
    MATCH_ANSWER_FADE_IN: require('../../assets/sounds/bestofs/match_answer_fade_in.wav'),
    MATCH_CHOOSEN_ANSWER: require('../../assets/sounds/bestofs/match_choosen_answer.wav'),
    MATCH_CORRECT_ANSWER: require('../../assets/sounds/bestofs/match_correct_answer.wav'),
    MATCH_WRONG_ANSWER: require('../../assets/sounds/bestofs/match_wrong_answer.wav'),
    MATCH_WON: require('../../assets/sounds/bestofs/match_won.wav'),
    MATCH_LOST: require('../../assets/sounds/bestofs/match_lost.wav'),
    MATCH_DRAW: require('../../assets/sounds/bestofs/match_draw.wav'),
    MATCH_TIME_TICKING: require('../../assets/sounds/bestofs/match_time_ticking.wav'),

    MATCH_ANSWER_FADE_IN_1: require('../../assets/sounds/bestofs/match/answer_fade/fade_in_1.wav'),
    MATCH_ANSWER_FADE_IN_2: require('../../assets/sounds/bestofs/match/answer_fade/fade_in_2.wav'),
    MATCH_ANSWER_FADE_IN_3: require('../../assets/sounds/bestofs/match/answer_fade/fade_in_3.wav'),
    MATCH_ANSWER_FADE_OUT_1: require('../../assets/sounds/bestofs/match/answer_fade/fade_out_1.wav'),
    MATCH_ANSWER_FADE_OUT_2: require('../../assets/sounds/bestofs/match/answer_fade/fade_out_2.wav'),
    MATCH_ANSWER_FADE_OUT_3: require('../../assets/sounds/bestofs/match/answer_fade/fade_out_3.wav'),

    MATCH_CORRECT_ANSWER_1: require('../../assets/sounds/bestofs/match/correct_answer/1.wav'),
    MATCH_CORRECT_ANSWER_2: require('../../assets/sounds/bestofs/match/correct_answer/2.wav'),

    MATCH_WRONG_ANSWER_1: require('../../assets/sounds/bestofs/match/wrong_answer/1.wav'),
    MATCH_WRONG_ANSWER_2: require('../../assets/sounds/bestofs/match/wrong_answer/2.wav'),

    MATCH_WON_APPLAUSE_V1_1: require('../../assets/sounds/bestofs/match/match_won/applause_v1_1.wav'),
    MATCH_WON_APPLAUSE_V1_2: require('../../assets/sounds/bestofs/match/match_won/applause_v1_2.wav'),
    MATCH_WON_APPLAUSE_V1_3: require('../../assets/sounds/bestofs/match/match_won/applause_v1_3.wav'),
    MATCH_WON_APPLAUSE_V2_1: require('../../assets/sounds/bestofs/match/match_won/applause_v2_1.wav'),
    MATCH_WON_APPLAUSE_V2_2: require('../../assets/sounds/bestofs/match/match_won/applause_v2_2.wav'),
    MATCH_WON_APPLAUSE_V2_3: require('../../assets/sounds/bestofs/match/match_won/applause_v2_3.wav'),

    MATCH_WON_1: require('../../assets/sounds/bestofs/match/match_won/won_1.wav'),

    WHOOSH: require('../../assets/sounds/bestofs/whoosh.wav'),
    WHOOSH_1: require('../../assets/sounds/bestofs/whoosh/1.wav'),
    WHOOSH_2: require('../../assets/sounds/bestofs/whoosh/2.wav'),

    EARNED_COINS: require('../../assets/sounds/bestofs/menu_sounds/earned_coins.wav'),
    HISTORY_BOOKMARK: require('../../assets/sounds/bestofs/menu_sounds/history_bookmark.wav'),
    MATCH_BOOKMARK: require('../../assets/sounds/bestofs/menu_sounds/match_bookmark.wav'),
    SUBJECTS_BOOKMARK: require('../../assets/sounds/bestofs/menu_sounds/subjects_bookmark.wav'),
    START_BESTOF_BUTTON: require('../../assets/sounds/bestofs/menu_sounds/start_bestof_button.wav'),
  },
  BENEFITS: {
    COUPONS_BOOKMARK: require('../../assets/sounds/benefits/coupons_bookmark.wav'),
    PRIZES_BOOKMARK: require('../../assets/sounds/benefits/prizes_bookmark.wav'),
  },
  PROFILE: {
    //TODO: capire come mappare i suoni, se tramite id o tramite nome
    FACULTIES: {
      //"Lingue e letterature straniere"
      '5cbc7d188fae6fc644fa3505': require('../../assets/sounds/profile/languages_faculty.wav'),
      //"Arti e architettura"
      '5b6c837b808cc3c159833215': require('../../assets/sounds/profile/art_faculty.wav'),
      //"Scienze mediche e sanitarie"
      '5b53441c3cb6d44f9d87a685': require('../../assets/sounds/profile/medical_science_faculty.wav'),
      //"Scienze naturali"
      '5b6c837b808cc3c15983320f': require('../../assets/sounds/profile/natural_science_faculty.wav'),
      //"Scienze umane e pedagogiche"
      '5b6c837b808cc3c159833213': require('../../assets/sounds/profile/humanities_science_faculty.wav'),
      //"Studi economici"
      '5b53441c3cb6d44f9d87a681': require('../../assets/sounds/profile/economic_faculty.wav'),
      //"Studi giuridici"
      '5b53441c3cb6d44f9d87a67f': require('../../assets/sounds/profile/legal_faculty.wav'),
      //"Studi matematici e tecnologici"
      '5b53441c3cb6d44f9d87a683': require('../../assets/sounds/profile/mathematical_faculty.wav'),
      // "Studi storici, filosofici e letterari"
      '5b6c837b808cc3c15983320d': require('../../assets/sounds/profile/historical_faculty.wav'),
    },
  },
};

export default sounds;
