/**
 * Navigation routes gathered here
 * to avoid mispells of routes
 */

export const routes = {
  // Switch Routes
  INITIAL: 'Initial',
  SPLASH: 'SplashScreenFlow',
  AUTH: 'AuthFlow',
  TABBAR: 'TabBarFlow',
  MAIN: 'MainFlow',
  CAROUSEL: 'CarouselFlow',
  PROFILE_IMAGE: 'ProfileImageFlow',
  COMMUNITY: 'CommunityFlow',
  REFERRAL_CODE: 'ReferralCodeFlow',

  // SplashScreen Routes
  SPLASHSCREEN: 'SplashScreen',

  // Auth Routes
  STARTAPP: 'Startapp',
  LOGIN: 'Login',
  REGISTER: 'Register',
  RESET_PASSWORD: 'ResetPassword',

  // Signup Routes
  SIGNUP: {
    SCREEN1: 'Screen1',
    SCREEN2: 'Screen2',
    SCREEN3: 'Screen3',
    SCREEN4: 'Screen4',
    SCREEN5: 'Screen5',
    SCREEN6: 'Screen6',
    STUDENT_EMAIL_VERIFY: 'StudentEmailVerify',
    STUDENT_CARD_VERIFY: 'StudentCardVerify',
    STUDENT_CARD_PENDING: 'StudentCardPending',
    EMAIL_PENDING_SCREEN: 'EmailPendingScreen',
    ADD_MAJOR_EMAIL: 'AddMajorEmailScreen',
    CAMERA_SCREEN: 'CameraScreen',
  },

  SIGNUPV2: {
    EMAILSIGNUP: {
      EMAIL_INPUT: 'EmailSignUpEmailInput',
      NAME_INPUT: 'EmailSignUpNameInput',
      EMAIL_PENDING: 'EmailSignUpEmailPendingV2',
    },
    SOCIALSIGNUP: {
      NAME_INPUT: 'SocialSignUpNameInput',
    },
    TERMS_AND_CONDITION: 'TermsAndCondition',
  },

  // Shop Routes
  HOME: 'Home',
  BESTOF: 'BestOf',
  CONTEST: 'Contest',
  FRIENDS: 'Friends',
  MENU: 'Menu',
  COUPONS: 'Benefits',
  TEST: 'Test',
  CAROUSEL_PAGE: 'CarouselPage',

  // ReferralCode Routes
  REFERRAL_CODE_HOME: 'ReferralCode',
  QRCODESCANNER: 'QRCodeScanner',

  // User Details Routes
  USER_PROFILE_IMAGE_FLOW: 'UserProfileImageFlow',
  USER_DETAILS: 'UserDetails',
  USER_PROFILE_IMAGE: 'UserProfileImage',
  PENDING_FRIENDSHIP_REQUESTS: 'PendingFriendshipRequests',

  // Contest Routes
  CONTEST_SCOREBOARD: 'ContestScoreboard',
  CONTEST_NAVIGATOR: 'ContestNavigator',
  CONTEST_FIRST: 'ContestFirst',
  CONTEST_MATCH: 'ContestMatch',
  CONTEST_RESULT: 'ContestResult',
  CONTEST_RECAP: 'ContestRecap',
  CONTEST_ALL_PRIZES: 'ContestAllPrizes',
  CONTEST_PRIZE_DETAIL: 'ContestPrizeDetail',
  CONTEST_YOUR_PRIZES: 'ContestYourPrizes',
  CONTEST_PRIZE_REQUEST1: 'ContestPrizeRequest1',
  CONTEST_PRIZE_REQUEST2: 'ContestPrizeRequest2',

  // BestOf Routes
  /*
   */
  BESTOF_EDIT_FACULTY: 'EditFacultyBestOf',
  BESTOF_HOME: 'BestOfHome',
  BESTOF_NEW_BATTLE: 'BestOfNewBattle',
  BESTOF_FRIEND_LIST: 'BestOfFriendList',
  BESTOF_BATTLE: 'BestOfBattle',
  BESTOF_QUESTION: 'BestOfQuestion',
  BESTOF_ONGOING: 'BestOfOngoing',
  BESTOF_HISTORY: 'BestOfHistory',

  BESTOF2_NAVIGATOR: 'BestOf2Navigator',
  BESTOF2_HOME: 'BestOf2Home',
  BESTOF2_MATCHMAKING: 'BestOf2Matchmaking',
  BESTOF2_QUESTION: 'BestOf2Question',
  BESTOF2_MATCH_RESULT: 'BestOf2MatchResult',
  BESTOF2_FINAL_RESULT: 'BestOf2FinalResult',
  BESTOF2_HISTORY: 'BestOf2History',
  BESTOF2_HISTORY_RESULT_SCREEN: 'BestOf2HistoryResult',
  BESTOF2_HISTORY_FILTER: 'BestOf2HistoryFilter',
  BESTOF2_SUMMARY: 'BestOf2Summary',
  BESTOF2_CHOOSE_FACULTY: 'BestOf2ChooseFaculty',
  BESTOF2_CHOOSE_SUBJECTS: 'BestOf2ChooseSubjects',
  BESTOF2_FINAL_ONBOARDING_SCREEN: 'BestOf2FinalOnboardingScreen',

  // Benefits
  COUPONS_NAVIGATOR: 'CouponsNavigator',
  COUPONS_HOME: 'CouponsHome',
  COUPONS_COUPON: 'CouponsCoupon',
  COUPONS_PRIZE_DETAIL: 'CouponsPrizeDetail',
  COUPONS_PRIZE_CHECKOUT: 'CouponsPrizeCheckout',
  COUPONS_PRIZE_PURCHASE_INFO: 'CouponsPrizePurchase',
  COUPONS_PRIZE_FILTER_SCREEN: 'CouponPrizesFilterScreen',
  COUPONS_CONDITIONS: 'CouponsConditionsScreen',
  COUPONS_CODE: 'CouponsCodeScreen',
  COUPONS_HISTORY_LIST: 'CouponsHistoryListScreen',
  COUPONS_HISTORY: 'CouponsHistoryScreen',

  // Test
  TEST_NAVIGATOR: 'TestNavigator',
  TEST_HOME: 'TestHome',
  TEST_COURSE_OF_STUDY: 'CourseOfStudy',
  TEST_SELECT_UNIVERSITY: 'TestUniversityListScreen',
  TEST_NEW_INSTANCE: 'TestWaybackScreen',
  TEST_INSTANCE_DETAIL: 'TestInstanceDetail',
  TEST_INSTANCE_MENU: 'TestInstanceMenu',
  TEST_INSTANCE_INFO: 'TestInstanceInfo',
  TEST_CODE_READER: 'TestCodeReader',
  TEST_ACTIVE_INSTANCE: 'TestActiveInstance',
  TEST_ENDED_RESULT: 'TestEndedResult',
  TEST_RESULT_HOME: 'TestResultHome',
  TEST_RESULT_DETAIL: 'TestResultDetail',
  TEST_RESULT_QUESTION: 'TestResultQuestion',

  // Wallet
  WALLET: 'WalletFlow',
  WALLET_MAIN: 'WalletMain',
  WALLET_SHOP: 'WalletShop',

  // Settings
  SETTINGS_NAVIGATOR: 'SettingsNavigator',
  SETTINGS_HOME: 'SettingsHome',
  SETTINGS_EDIT_FACULTY: 'EditFaculty',
  SETTINGS_EDIT_SUBJECT: 'EditSubject',
  SETTINGS_EDIT_SUBJECT_WEIGHT1: 'EditSubjectWeight',
  SETTINGS_EDIT_SUBJECT_WEIGHT2: 'EditSubjectWeight2',
  SETTINGS_EDIT_SUBJECT_WEIGHT3: 'EditSubjectWeight3',
  SETTINGS_CARTA_FIDATY: 'CartaFidaty',
  SETTINGS_SCOPRI_DISCOVER: 'CartaFidatyScopriDiscover',
  SETTINGS_BARCODE_READER: 'BarcodeReader',
  SETTINGS_SETTINGS_HOME: 'SettingsSettingsHome',
  SETTINGS_SETTINGS_NOTIFICATION: 'SettingsSettingsNotification',
  SETTINGS_CHANGE_PASSWORD: 'SettingsChangePassword',
  SETTINGS_CHANGE_LEGAL_CHECKS: 'SettingsChangeLegalChecks',
  SETTINGS_DELETE_ACCOUNT: 'SettingsDeleteAccount',
  SETTINGS_DELETE_ACCOUNT_AFTER: 'SettingsDeleteAccountAfter',
  SETTINGS_FACULTY_INFORMATION: 'FacultyInformation',
  SETTINGS_QUESTIONS_QUALITY: 'QuestionsQuality',
  SETTINGS_THEFACULTY_PARTNER: 'ThefacultyPartner',
  SETTINGS_FAQ: 'Faq',
  SETTINGS_EMAIL_SUPPORT: 'EmailSupport',
  SETTINGS_CARD_REGISTER: 'SettingsCardRegister',
  SETTINGS_MATHJAX: 'SettingsMathJax',
  SETTINGS_SOCIAL_SIGNIN: 'SettingsSocialLogin',
  SETTINGS_STRIPE_TEST_SCREEN: 'StripeTestScreen',
  SETTINGS_FLATLIST_TEST_SCREEN: 'FlatListTestScreen',

  CHANGE_LEGAL_CHECKS_NAVIGATOR: 'ChangeLegalChecksNavigator',

  // Profile
  PROFILE_NAVIGATOR: 'ProfileNavigator',
  PROFILE_HOME: 'ProfileHome',
  PROFILE_CONFIRM_EMAIL: 'ProfileConfirmEmail',
  PROFILE_STUDENT_VERIFY_EMAIL: 'ProfileStudentVerifyEmail',
  PROFILE_STUDENT_VERIFY_CARD: 'ProfileStudentVerifyCard',
  PROFILE_STUDENT_VERIFY_EMAIL_PENDING: 'ProfileStudentVerifyEmailPending',
  PROFILE_STUDENT_VERIFY_CARD_PENDING: 'ProfileStudentVerifyCardPending',

  GENERAL_WEBVIEW: 'GeneralWebView',
  WEBVIEW_NAVIGATOR: 'WebViewNavigator',
};
