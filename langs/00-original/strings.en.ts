const strings = {
  APP_NAME: 'The Faculty App',
  LOADING: 'Loading',
  LOADING_DATA: 'Loading data ...',
  LOGIN_LABEL: 'LOGIN',
  SIGNUP_LABEL: 'REGISTER',
  WELCOME_TO_LOGIN: 'Welcome to the login screen!',
  SECTIONS: {
    HOME: 'Home',
    BESTOF: 'Challenges',
    CONTEST: 'Competition',
    FRIENDS: 'Friends',
    MENU: 'Menu',
    TEST: 'Test',
    COUPONS: 'Discounts',
  },
  LOGIN: {
    LOGIN_TITLE: 'Login',
    NO_ACCOUNT: "Don't have an account?",
    SIGNUP_LABEL: 'Register',
    LOGIN_BUTTON_TEXT: 'LOGIN',
    EMAIL_PLACEHOLDER: 'Email',
    PASSWORD_PLACEHOLDER: 'Password',
    REMEMBER_PASSWORD: "I can't remember my password",
  },
  RESET_PASSWORD: {
    RESET_PASSWORD_TITLE: 'Password recovery',
    DESCRIPTION_TEXT:
      'Enter the email address used during registration, we will send you an email to reset your password',
    EMAIL_PLACEHOLDER: 'Email',
    SEND_BUTTON_TEXT: 'SEND',
  },
  BESTOF: {
    HOME_BOX_TITLE: 'CHALLENGES',
    HOME_BOX_TEXT:
      'Start a new challenge, collect coins and get discounts immediately!',
    HOME_SCREEN: {
      FIRST_MESSAGE:
        'Complete a challenge to accumulate 20 tokens.  NOnce you have accumulated the tokens, you can use them to unlock the discounts',
    },
    HOME_SCREEN_POINTS: 'tokens',
    HOME_SCREEN_POINTS_CAPTION: 'tokens',
    HOME_SCREEN_BUTTON_TEXT: 'RANKING',
    HOME_SCREEN_PARTNERS_TEXT: 'Play challenges and unlock discounts:',
    HOME_SCREEN_ONGOING_TEXT: 'Challenges in progress',
    HOME_SCREEN_NEW_BATTLE_TEXT: 'New challenge',
    HOME_SCREEN_NEW_BATTLE_STATUS: '{NUM2} lives of {NUM1}.',
    HOME_SCREEN_NEW_BATTLE_STATUS_MINS:
      'next life between {NUM1} m and {NUM2} s',
    HOME_SCREEN_NEW_BATTLE_STATUS_ALL: 'you have all the lives',
    FIRST_SCREEN_FRIEND_TEXT: 'Challenge a friend',
    FIRST_SCREEN_RANDOM_TEXT: 'Random opponent challenge',
    FRIEND_LIST_SCREEN_TEXT: 'Choose who you want to challenge',
    YOU: 'You',
    OPPONENT: 'Opponent',
    YOUR_TURN: "It's your turn!",
    OPPONENT_TURN: "It's the opponent's turn!",
    STATUS: {
      PLAYED_WITH: 'You played against {NAME}',
      PLAYING_WITH: "You're playing against {NAME}",
      SEARCHING: 'Looking for the opponent ...',
      PLAYING_MATCHES: 'Games in progress',
      TERMINATED_MATCHES: 'Games ended',
    },
    ONGOING_SCREEN: {
      WIN: 'Challenges Won',
      LOST: 'Lost challenges',
    },
    BATTLE_SCREEN: {
      TITLE: 'Challenge',
      ROUND_CAPTION: 'Round {NUM1} of {NUM2}',
      PLAY_BUTTON: 'PLAY',
      REJECT_BUTTON: 'Leave challenge',
      MOVE_TO_HISTORY_BUTTON: 'MOVE TO HISTORY',
      DESCRIPTION: "It's your turn, play now!",
      ITS_MY_TURN: "It's your turn, play now!",
      ITS_OPPONENT_TURN:
        "It's the opponent's turn. Wait for the opponent to finish playing.",
      ERROR_WHILE_GETTING_INFO: 'A connection problem has occurred. Try later.',
      ERROR_WHILE_STARTING: 'There was a problem starting the game. Try later.',
      RESULT_MESSAGE1_LOST: 'What a pity, you lost!',
      RESULT_MESSAGE1_WON: 'Congratulations! You won!',
      RESULT_MESSAGE2: 'You have accumulated {NUM1} tokens!',
    },
    HISTORY: {
      TITLE: 'Historic challenges',
      EMPTY_DESC: 'Move challenges to history and see it in this page',
    },
    WON_LOST: {
      WON: 'You won {NUM1} in {NUM2}',
      LOST: 'You lost {NUM1} to {NUM2}',
      PAREGED: 'You drew',
      WON_DEFAULT: 'You won at the table',
      LOST_DEFAULT: 'You lost at the table',
    },
  },
  FRIENDS: {
    FRIENDS_LABEL: 'Friends',
    SEARCH_FRIEND_PLACEHOLDER: 'Search for a friend',
    NEW_PENDING_REQUESTS: 'New friend requests',
    YOUR_FRIENDS_LABEL: 'Your friends',
    USER_DETAILS: {
      PROFILE_TITLE: 'Profile',
      STUDYTOWN_DESCRIPTION: 'Study city:',
      FRIENDS_LABEL: 'Friends',
      SCORES_LABEL: 'Points',
      SCOREBOARD_LABEL: 'in the ranking',
      NOT_IN_SCOREBOARD_LABEL: 'Not ranked',
      START_TEXT_1: 'Start one',
      START_TEXT_2: 'new challenge',
      WON_BESTOFS: 'Won challenges',
      LOST_BESTOFS: 'Lost challenges',
      ADD_FRIEND_BUTTON: 'ADD TO FRIENDS',
      REMOVE_FRIEND_BUTTON: 'REMOVE FROM FRIENDS',
      ACCEPT_REQUEST_BUTTON: 'ACCEPT REQUEST',
    },
    PENDING_REQUESTS: {
      PENDING_REQUESTS_TITLE: 'Friend requests',
      NO_PENDING_FRIENDSHIP_REQUESTS: 'No new requests',
      BUTTON_ACCEPT: 'ACCEPT',
      BUTTON_REJECT: 'REFUSE',
    },
  },
  MENU: {
    UPDATE_PROFILE_IMAGE: {
      DEFAULT_TITLE: 'Image',
      PREVIEW_TITLE: 'Preview',
    },
  },
  COUPONS: {
    QRCODE: 'QR code',
    BARCODE: 'Barcode',
    COPY: 'COPY',
    OPEN: 'OPEN',
    GENERATE_COUPON: 'BURN DISCOUNT',
    COUPONS_PAGE_TITLE: 'Discounts',
    AVAILABLE_COUPONS_ONE: 'discount available',
    AVAILABLE_COUPONS_MORE: 'discounts available',
    USED_COUPONS: 'Discounts obtained',
    HOME: {
      POINT_CAPTION: 'Tokens',
      POINT_CAPTION_FREE: 'FREE',
      DESC1: '{NUM} discounts are available',
      DESC2: 'You already generated {NUM}',
      VALIDATE_UNTIL: 'Valid until',
      LOCK_DESCRIPTION1: 'Please, verify that you are a student with your university email or the photo of your student card',
      LOCK_DESCRIPTION2: 'In this way you can spend your coins to obtain coupons and exclusive benefits',
      LOCK_AUTH_BUTTON: 'AUTHENTICATE',
      
    },
    COUPON_SCREEN: {
      CONDITION_BUTTON: 'Terms of use',
      REDEEM_BUTTON: 'CREATE DISCOUNT',
      REDEEMING_TEXT: 'Generating discount in progress ...',
      ERROR_WHILE_REDEEM:
        'A problem occurred while generating the Discount. Check all the conditions of use or if the problem persists contact us on assistenza@thefaculty.it ',
    },
    CONDITIONS_SCREEN: {
      TITLE: 'Terms of use',
    },
    INVALID_REASONS: {
      ALREADY_USED: 'You have already generated this discount before.',
      EXCLUDE_USED:
        'You have already generated a discount similar to this one before.  NYou cannot get this discount.',
      PREVIOUS_COUPON_USED: 'You have already generated this discount before.',
      ANY_LEFT:
        'These discounts are sold out.  NGo back for more discounts soon!',
      IS_ACTIVE: 'This discount is available starting from {start_date}.',
      COINS_REQUIREMENT:
        "You don't have enough tokens to generate this discount.",
      MCFIT_TRIAL_DAY_DONE:
        'To unlock this discount go to a McFIT gym, do the test day and scan the QR code of the faculty that you will find in the gym from the Promotional Code section!',
      ESSELUNGA_VERIFIED_CUSTOMER:
        'To unlock this discount you must have associated the Fìdaty Card from the App Menu.',
      OTHER: 'This discount is currently not payable.',
    },
    VIEW: {
      BARCODE_DESC:
        'Click on the QR to enlarge it. Problems with the QR? Enter this: ',
      QRCODE_DESC:
        'Click on the barcode to enlarge it. Problems with the barcode? Enter this: ',
      NOTHING_DESC_ESSE: `Congratulations! The € 5 discount has been successfully uploaded to yours
        Fìdaty card. Go to the store and the discount will come automatically
        applied from the cash desk to the passage of the Fìdaty Card and
        exceeding the expected threshold. The discount is not valid for
        online expenses.`,
      NOTHING_DESC_MCFIT: `The discount has been unlocked! \n Show this screen to the trainer to activate the discounted rate subscription.`,
      TEXT_DESC: 'Your discount code is',
      LINK_DESC:
        'Press the OPEN or COPY button on your browser to immediately open your personal account!',
      LINK_POPUP_TITLE: 'Link copied',
      LINK_POPUP_MESSAGE:
        'The Discount link has been copied, paste it in your browser to take advantage of the discount.',
      TIMEOUT_DESC_COUNTING: 'The discount was generated!',
      TIMEOUT_DESC_COMPLETED:
        'Congratulations! Your discount has been successfully used! ',
      TIMEOUT_POPUP_MESSAGE1: 'Are you in this shop?',
      TIMEOUT_POPUP_MESSAGE1_DEFAULT: 'Are you at {PARTNER_NAME}?',
      TIMEOUT_POPUP_MESSAGE2: 'Show this screen to an employee!',
      TIMEOUT_POPUP_MESSAGE2_M: 'He will press OK to enable the discount.',
    },

    HISTORY_SCREEN: {
      TITLE: 'Discounts obtained',
      VALID_FROM_TO: 'Valid from {NUM1} to {NUM2}',
      EXPIRED_COUPON: 'This discount expired on {NUM2}',
    },
  },
  SETTINGS: {
    TITLE: 'Settings',
    HOME: {
      PROFILE: 'Profile',
      UPGRADE_TO_STUDENT_ACCOUNT: 'Upgrade to student account',
      EDIT_FACULTY: 'Change your faculty',
      EDIT_SUBJECT: 'Change your subjects',
      CARTA_FIDATY: 'Carta Fìdaty | Esselunga',
      SETTINGS: 'Account settings',
      FACULTY_INFORMATION: 'About the[bold]faculty[/bold]',
      QUESTIONS_QUALITY: 'Quality questions | Selexi ',
      SOCIAL_POPUP: 'Our social networks',
      STORE_PAGES: 'Evaluate the App',
      THEFACULTY_PARTNER: 'Partner of the[bold]faculty[/bold]',
      TOS: 'Terms and conditions',
      PRIAVACY_POLICY: 'Privacy policy',
      SUPPORT: 'Do you need help?',
      FAQ: 'Frequently asked questions',
      EMAIL_SUPPORT: 'Contact support',
      EMAIL_SUPPORT_SUBJECT: 'Assistance - thefaculty: [NICKNAME]',
      EMAIL_SUPPORT_BODY:
        ' n  n ----------  n [USER_ID]  nDate: [DATETIME]  nNickname: [NICKNAME]  nName: [NAME]  n ----------  n  n ',
      LOGOUT: 'Exit',
      NEED_HELP: 'Do you need help?',
      EMAIL_CLIENT_NO_EXITS:
        'To contact support write us an email at assistenza@thefaculty.it',

      SOCIAL_POPUP_TITLE: 'Social',
      SOCIAL_POPUP_WEBSITE: 'thefacultyapp.com',
      SOCIAL_POPUP_CANCEL: 'Back',
    },
    EDIT_FACULTY: {
      TITLE: 'Change faculty',
      YOUR_FACULTY: 'Your faculty is',
      ALL_FACULTIES: 'All faculties',
      BUTTON_TITLE: 'CHANGE FACULTY',
      ERROR_WHILE_UPDATING_FACULTY:
        'There was a problem changing your faculty. Try later.',
      SUCCESS_TO_UPDATING_FACULTY:
        'Congratulations, you have successfully modified your faculty!',
    },
    EDIT_SUBJECT_WEIGHT: {
      NO_DATA: 'No subject present at the moment',
      TITLE: 'Subjects',
      YOUR_FACULTY: 'Your faculty is',
      SPECIFY_SUBJECTS_FOR_YOUR_FACULTY: 'Specific subjects of your faculty',
      OTHER_SUBJECTS_PLAYING_WITH: 'Other subjects you are playing with',
      BUTTON1: 'Reset values',
      BUTTON2: 'CHANGE THE WEIGHTS',
      EMPTY_SUCCESS:
        'The subjects you want to play with have been successfully restored!',
      EMPTY_ERROR:
        'There was a problem restoring the subjects you want to play with. Try later.',
    },
    EDIT_SUBJECT_WEIGHT2: {
      TITLE: 'Weight of materials',
      DESCRIPTION: `Choose how often you want to play with snowshoes of these subjects in the [bold] Challenges [/ bold] and [bold] Competitions [/ bold] sections`,
      CONTINUE: 'CONTINUE',
    },
    EDIT_SUBJECT_WEIGHT3: {
      TITLE: 'Choice of subjects',
      DESCRIPTION: `Choose other subjects you want to play with. You can change your choice at any time.`,
      CONTINUE: 'CONTINUE',
      LOAD_MORE_SUBJECTS: 'Show all subjects',
      LOAD_SUGGESTED_SUBJECTS: 'Show recommended subjects',
      SUCCESS:
        'The subjects you want to play with have been successfully modified!',
      ERROR:
        'There was a problem restoring the subjects you want to play with. Try later.',
    },
    SETTINGS_HOME: {
      TITLE: 'Settings',
      NOTIFICATION_SETTINGS: 'Notification settings',
      CHANGE_PASSWORD: 'Change password',
      DELETE_ACCOUNT: 'Delete account',
      STUDY_AT: 'Study city:',
    },
    SETTINGS_NOTIFICATION: {
      TITLE: 'Notification settings',
      DESCRIPTION:
        'Choose how long you want to stay updated on what happens in the App',
      CAPTION1:
        'Minimum level:  nImportant news such as winning a prize or approving a document',
      CAPTION2: 'Basic level:  nImportant news and notifications about friends',
      CAPTION3:
        'Maximum level  nAll game notifications or inserting a new prize',
      SET_LEVEL_ERROR:
        'There was a problem changing the notification level. Try later.',
    },
    CHANGE_PASSWORD: {
      TITLE: 'Change password',
      DESCRIPTION: 'Do you want to set a  nnew password?',
      OLD_PASSWORD: 'Enter the old password',
      NEW_PASSWORD: 'Enter the new password',
      LEGEND_DESCRIPTION: 'The password must contain at least:',
      LEGEND_1_UNCHECKED: '- 8 characters',
      LEGEND_2_UNCHECKED: '- a lowercase and uppercase letter',
      LEGEND_3_UNCHECKED: '- a number',
      LEGEND_1_CHECKED: '✓ 8 characters',
      LEGEND_2_CHECKED: '✓ a lowercase and uppercase letter',
      LEGEND_3_CHECKED: '✓ a number',
      CHANGE_BUTTON: 'CHANGE PASSWORD',
      SUCCESS_CHANGE_PASSWORD: 'You have successfully changed your password!',
      ERROR_WRONG_PASSWORD: 'The password is not valid.',
      ERROR_UNKNOWN:
        'A problem occurred while changing the notification level. Try later.',
    },
    DELETE_ACCOUNT: {
      TITLE: 'Delete account',
      CONFIRM_MESSAGE:
        'We are sorry you want to leave us. Are you really sure you want to proceed? ',
      CONFIRM_DESC: 'Why do you want to leave the faculty?',
      CONFIRM_BUTTON: 'CONFIRM',
      REMAIN_BUTTON: 'Stay on thefaculty',
      ERROR_ON_LOGGING_OUT:
        'A problem occurred during the automatic logout. We ask you to manually log out of the App. ',
      ERROR_ON_DELETE:
        'There was a problem canceling your account. Try again later, if the problem persists, contact Support via assistenza@thefaculty.it ',
      ERROR_UNKNOWN:
        'An unknown problem has occurred. Try again later, if the problem persists, contact Support via assistenza@thefaculty.it ',
    },
    DELETE_ACCOUNT_AFTER: {
      DESCRIPTION:
        'Your profile has been deleted. Come back soon! You will always be welcome! ',
      CLOSE_BUTTON: 'CLOSE',
    },
    QUESTIONS_QUALITY: {
      TITLE: 'Selexi',
      ERROR_ON_GETTING_DATA: 'A connection problem has occurred. Try later.',
    },
    PARTNERS: {
      TITLE: 'Partner',
      ERROR_ON_GETTING_DATA: 'A connection problem has occurred. Try later.',
    },
    FAQ: {
      TITLE: 'FAQ',
      PAGE_TITLE: 'Frequently asked questions',
    },
    CARTA_FIDATY: {
      TITLE: 'Esselunga',
      TITLE2: 'Carta Fidaty - Esselunga',
      DESC_NOT_VERIFIED:
        'To redeem the discounts and prizes offered by Esselunga on the thefaculty App you will need your Fìdaty Card.  N  nAssociate your Fìdaty Card now',
      DESC_VERIFIED:
        'You have already associated a Fìdaty Card. You can modify a Fìdaty Card for loss or theft, replace the Card for deterioration or change to another type of Fìdaty Card',
      BARCODE_PLACEHOLDER: 'Fìdaty Card Code',
      DONT_HAVE_CARD: "Don't you have a Fìdaty card yet?",
      HOW_TO_REQUEST: 'Find out how to request it',
      DISCOVER_CARD: 'Discover the Fìdaty Card',
      NOT_NOW: 'Not now',
      DONE: 'DONE',
      SHOULD_BE_13: 'The code should be 13 characters!',
      VERIFY_SUCCESS_TITLE: 'Carta Fìdaty associata',
      VERIFY_SUCCESS_TEXT:
        'La tua Carta Fìdaty è stata associata correttamente!',
      VERIFY_ERROR_TITLE: 'Attenzione!',
      VERIFY_ERROR_UNKNOWN: 'Errore sconosciuto!',
      VERIFY_MUST_BE_NUMBERIC:
        'Il numero della Carta Fìdaty è composto da sole cifre. Inserisci le 13 cifre e riprova',
      VERIFY_CARD_BLOCKED:
        'La tua Carta Fìdaty risulta bloccata. Per maggiori informazioni contatta il Servizio Clienti Esselunga al Numero Verde gratuito 800-666555',
      VERIFY_CARD_CANCELED: `La tua Carta Fìdaty risulta cancellata. Per maggiori informazioni contatta il Servizio Clienti Esselunga al Numero Verde gratuito 800-666555`,
      VERIFY_NOT_NEW_CARD:
        'La tua Carta Fìdaty risulta cancellata. Per maggiori informazioni contatta il Servizio Clienti Esselunga al Numero Verde gratuito 800-666555',
      VERIFY_NOT_COMPLETED:
        'Il numero della Carta inserito è corretto ma la registrazione al Programma Fìdaty non è completa. Accedi al sito www.esselunga.it per completarla',
      VERIFY_WRONG_NAME:
        'I dati della Carta Fìdaty non corrispondono a quelli inseriti in fase di registrazione a thefaculty. Verifica che la Carta sia intestata a te e riprova',
      VERIFY_WRONG_CARD:
        'La Carta Fìdaty inserita non è corretta. Controlla il numero inserito e riprova',
    },
    BARCODE_READER: {
      TITLE_BARCODE: 'Scan barcode',
      TITLE_QRODE: 'Scan qrcode',
      READ_SUCCESS: 'Barcode code successfully read!',
      READ_FAILED: 'Unread barcode code',
    },
  },
  CONTEST: {
    HOME_SCREEN: {
      FIRST_MESSAGE:
        'Accumulate points by correctly answering questions. The first place winners will win the prizes! ',
    },
    HOME_BOX_TITLE: 'COMPETITION',
    HOME_BOX_TEXT: 'Win fantastic prizes from our Partners every week!',
    SCOREBOARD_BUTTON_TEXT: 'RANKING',
    SCORES_LABEL: 'Points',
    PRIZES_LABEL: 'AWARDS',
    CONTEST_JACKPOT: 'Total prize pool of',
    FROM_LABEL: 'From',
    TO_LABEL: 'al',
    UP_FOR_GRABS: 'up for grabs',
    PLAY_NOW: 'Play now',
    THREE_CONTESTS: 'games of 3',
    CONTESTS_24_HOUR: ', they regenerate every 24 hours',
    CONTEST_SCOREBOARD: {
      MENU_CANCEL: 'Close',
      DEFAULT_TITLE: 'Competition Ranking',
      FRIENDS_SCOREBOARD: 'Friends Ranking',
      OLD_SCOREBOARD: 'Previous Competition Rankings',
      GENERAL_SCOREBOARD: 'General Classification',
      ACTUAL_SCOREBOARD: 'Current Competition Rankings',
      FACULTY_FILTER: 'Faculty filter',
      SELECT_A_FACULTY: 'Select a faculty',
      SCORES: 'points',
      LOGGED_USER_POSITION: 'classified',
      ME_LABEL: 'I',
    },
    FIRST_SCREEN: {
      FIRST_CELL_TEXT: 'Get ready, the game is about to begin!',
    },
    RESULT_SCREEN: {
      PAGE_TITLE: 'Results',
      FIRST_CELL_TEXT: 'Rankings',
      SECOND_CELL_TEXT: '{NUM1} of {NUM2} correct answers',
      SHARE_MESSAGE:
        "I'm playing thefaculty! Download it now for free: thefacultyapp.com",
      BTN_CLOSE: "CLOSE"
    },
    RECAP_SCREEN: {
      PAGE_TITLE: 'Game details',
      FIRST_CELL_TEXT: 'Match HistoryTab',
      SCORES_LABEL: 'points',
    },
  },
  REFERRAL_CODE: {
    REFERRAL_CODE: 'Promotional Code',
    HOME_BOX_TITLE: 'PROMO CODE',
    HOME_BOX_TEXT:
      'Have you found a promotional code or a QR code the faculty? Use it and get your reward ',
    PAGE_BOX_TEXT: 'Scan a Promotional Code and find out what it contains',
    SCAN_BUTTON_TEXT: 'Scan the QR Code',
    OR_LABEL: 'or',
    USE_NOW_BUTTON: 'USE NOW',
    INSERT_NEW_REFERRAL_CODE: 'Enter the promotional code',
    NO_USED_CODES: 'No promotional code  nutilized so far.',
    REFERRAL_CODE_BOX_LABEL: 'Code',
    WHEN_USED: 'Used on',
    ALERT_ESSELUNGA:
      'Oops! In order to use an Esselunga Promo Code, you must first associate your Fìdaty Card! ',
    SCAN_QRCODE_TITLE: 'Scan QR code',
  },
  TEST: {
    HOME_BOX_TITLE: 'TEST',
    HOME_BOX_TEXT:
      'Do you have to take an entrance test or practice a specific subject? Train here! ',
  },
  MONTHS: {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  },
  SIGNUP: {
    TERMS_AND_CONDITIONS: {
      PAGE_TITLE: 'Terms and conditions',
      FIRST_CELL1:
        "I consent to the processing of my data for the purpose of the App's functioning",
      FIRST_CELL2_BOLD: 'faculty',
      FIRST_CELL3:
        'for participation in the Prize Contests and for the promotional initiatives of the Partners.',
      SECOND_CELL1: 'I declare that I have read and accepted the',
      SECOND_CELL1_LINK: 'Privacy Policy',
      THIRD_CELL1: 'I declare that I have read and accepted the',
      THIRD_CELL1_LINK: 'License terms',
      THIRD_CELL2: 'and the',
      THIRD_CELL2_LINK: 'Competition Rules',
      ACCEPT_BUTTON: 'I AGREE',
    },
    SECOND_SCREEN: {
      PAGE_TITLE: 'Your data',
      INPUT_FIRSTNAME: 'Name',
      INPUT_LASTNAME: 'Surname',
      INPUT_GENDER: 'Sex',
      INPUT_BIRTHDAY: 'Date of birth',
      INPUT_BIRTHPLACE: 'Place of birth',
      CONTINUE_BUTTON: 'CONTINUE',
      GENDERS: ['Man', 'Woman', 'Other'],
    },
    THIRD_SCREEN: {
      PAGE_TITLE: 'Access and use',
      INPUT_NICKNAME: 'Nickname',
      INPUT_PASSWORD: 'Password',
      LEGEND_DESCRIPTION: 'The password must contain at least:',
      LEGEND_1_UNCHECKED: '- 8 characters',
      LEGEND_2_UNCHECKED: '- a lowercase and uppercase letter',
      LEGEND_3_UNCHECKED: '- a number',
      LEGEND_1_CHECKED: '✓ 8 characters',
      LEGEND_2_CHECKED: '✓ a lowercase and uppercase letter',
      LEGEND_3_CHECKED: '✓ a number',
      CONTINUE_BUTTON: 'CONTINUE',
    },
    FOURTH_SCREEN: {
      PAGE_TITLE: 'Email',
      FIRST_CELL_TEXT1: 'Enter an email',
      FIRST_CELL_TEXT_BOLD: ' not',
      FIRST_CELL_TEXT2: 'university',
      INPUT_EMAIL: 'Email',
      INPUT_CONFIRM_EMAIL: 'Confirm email',
      CONTINUE_BUTTON: 'CONTINUE',
      ERROR_INVALID_EMAIL: 'Invalid email',
      ERROR_EMAIL_NOT_MATCH: "The two emails don't match",
      ERROR_EXISTS: 'Email already exists',
      ERROR_IS_UNIVERSITY_EMAIL: 'It is the university email',
    },
    FIFTH_SCREEN: {
      PAGE_TITLE: 'Degree course',
      FIRST_CELL_TEXT: 'Enter and select the degree program closest to you',
      INPUT_MAJOR: 'Degree course',
      CONTINUE_BUTTON: 'CONTINUE',
    },
    SIXTH_SCREEN: {
      PAGE_TITLE: 'Facolty',
      FIRST_CELL_TEXT: 'You have selected this major:',
      SECOND_CELL_TEXT: 'You will play in this faculty:',
      SHOW_ALL_FACULTIES_BUTTON: 'Show all faculties',
      SHOW_SUGGESTED_FACULTIES_BUTTON: 'Show suggested faculties',
      CONTINUE_BUTTON: 'SIGNUP',
    },
    STUDENT1: {
      TITLE: 'Studente Universitario',
      DESCRIPTION:
        'Per poter partecipare ai Concorsi presenti su the[bold]faculty[/bold] ci serve la tua email universitaria',
      EMAIL: 'University email',
      CONFIRM_EMAIL: 'Confirm university email',
      HAS_NO_EMAIL:
        "Are you an university student but you don't have an university email?",
      GRADUATION_YEAR: 'Graduation year expected',
      STUDY_TOWN: 'Study town',
      NOT_NOW: 'Non ora',
      CONTINUE_BUTTON: 'CONTINUE',
      OEVERLAY_HEADER: 'Citta di studio',
      OEVERLAY_DONE: 'Done',
      INVALID_EMAIL: 'Email is not valid',
      NOTMATCH_EMAIL: 'Confirm Email does not match to Email',
      INVALID_GRADUATION_YEAR: 'Invalid graduation year',
      INVALID_CITY_INDEX: 'Si prega seleziona una città di studio',
      INVALID_CITY_NAME: 'Please select a study town',
      ALREADY_EXIST: 'Your email is already registered',
      NOT_UNIVERSITY_EMAIL: `Your email is not recognized as an university email. Try with another email or contact us on assistenza@thefaculty.it if you think this is an university email.`,
      SUCCESS_UPGRADE_STUDENT_EMAIL: 'Perfetto! La procedura di upgrade dell\'account è quasi terminata: ti basta confermare la tua email tramite il link che ti abbiamo inviato',
      SUCCESS_UPGRADE_STUDENT_CARD: 'Perfetto! La procedura di upgrade dell\'account è quasi terminata: il tuo badge universitario è ora in revisione',
      FAILED_UPGRADE: 'Failed to send to the confirmation request.\nPlease try again later',
      ALREADY_IN_PROGRESS: 'The verification is already in progress',
    },
    STUDENT_CARD_VERIFY: {
      TITLE: 'Card verify',
      DESCRIPTION:
        'Per poter partecipare ai Concorsi presenti su the[bold]faculty[/bold] ci serve avere la foto del tuo tesserino o badge universitario',
      CARD: 'Tessernio o badge universitario',
      CARD_UPLOADED: 'Foto del tesserino caricata',
      UNIVERSITY: 'Universita',
      GRADATION_YEAR: 'Anno di previsione della laurea',
      STUDY_CITY: 'Citta di studio',
      TAKE_PICTURE: 'Take picture',
      CAMERA_NOT_WORKING: 'Camera is not working',
      INVALID_CARD_URL: 'Card url is invalid!',
      ERROR_UPLOADING: 'An error occurred on uploading the picture!',
      INVALID_UNIVERSITY: 'Please select a university',
    },
    STUDENT_CARD_PENDING: {
      TITLE: 'Card is pending',
      DESCRIPTION:
        'Stimao verificando i dati che ci hai fornito.\nRicevarai una notifica sullo stato della verifica il prima poissibile. Ci potrebbe volere ancora qualche giomo',
      CLOSE_BUTTON: 'Close',
    },
    CONFIRM_EMAIL_SCREEN: {
      TITLE: 'Certificazione email',
      DESCRIPTION1: 'Ti abbiamo inviato un\'email all\'indirizzo',
      DESCRIPTION2: `Clicca sul link contenuto nell\'email per completare la registrazione\n\nSe non trovi l'email, potrebbe essere finita nella cartella "spam" `,
      RESEND_BUTTON: 'Reinvia email',
      CLOSE_BUTTON: 'ESCI',
      ERROR_RESENDING_CONFIRMATION_EMAIL: 'An error occurred while resending confirmation email',
      SUCCESS_RESENDING_CONFIRMATION_EMAIL: 'Successfully sent the confirmation email',
      CLOSE_POPUP_TITLE: 'Stai riscontrando problemi?',
      CHANGE_EMAIL_POPUP: 'Cambia email',
      LOGOUT_POPUP: 'Logout',
      CLOSE_POPUP: 'Close',
      CHANGE_EMAIL_TITLE: 'Email errata?',
      CHANGE_EMAIL_MESSAGE1: `Se hai sbagliato ad inserire l'indirizzo email fai il logout e registrati nuovamente con l'indirizzo corretto`,
      CHANGE_EMAIL_MESSAGE2: `Se hai sbagliato ad inserire l'indirizzo email universitario attendi qualche minuto e puoi reinserirlo di nuovo in questa sezione`,
      GOING_TO_MAIN_SCREEN: 'Going to main screen ...',
    }
  },
  ALERTS: {
    ERRORS: {
      STANDARD: {
        OOPS: 'Oops!',
        WARNING: 'Attention',
        ERROR: 'Error',
        UNEXPECTED_ERROR: 'An unexpected error has occurred',
        SOMETHING_WENT_WRONG: 'Something went wrong',
        SOMETHING_WENT_WRONG_CONNECTION:
          'Something went wrong, check the connection and try again later',
        SERVER_CONNECTION:
          'Error connecting to the server. Check your connection, if the problem persists contact support',
        FILL_ALL_FIELDS_TO_PROCEED:
          'You must fill in all the fields in order to proceed',
      },
      SIGNUP: {
        TITLE: 'Oops!',
        ERROR_NICKNAME_EXISTS: 'The nickname is already in use',
        EMAIL_IN_USE:
          'An account with this email already exists, try logging in or contact Support at assistenza@thefaculty.it',
        EMAIL_INVLID: 'The email address is not valid',
        WEAK_PASSWORD: 'The password is not secure enough',
        OPERATION_NOT_ALLOWED:
          'Something is wrong, contact Support at assistenza@thefaculty.it',
        OTHER_MESSAGES:
          'Something went wrong during login, please try again later. If the problem persists, contact us at assistenza@thefaculty.it ',
        TITLE_SUCCESS: 'Cogratulations!',
        CREATION_SUCCESS: 'Your account has been successfully created!',
        ERROR_FIRSTNAME_MIN_LENGTH:
          'The name must have at least 3 characters, if it is correct contact us on assistenza@thefaculty.it',
        ERROR_LASTNAME_MIN_LENGTH:
          'The surname must have at least 3 characters, if it is correct contact us on assistenza@thefaculty.it',
      },
      LOGIN: {
        TITLE: 'Oops!',
        WRONG_EMAIL_OR_PASSWORD:
          "Make sure you've entered your email or password correctly and try again!",
        USER_DISABLED:
          'The email address you entered corresponds to a disabled account, please contact Support at assistenza@thefaculty.it.',
        TOO_MANY_REQUEST:
          'You are trying to access this account too many times. Please try again later. If the problem persists, contact us on assistenza@thefaculty.it.',
        NETWORK_REQUEST_FAILED:
          'A connection problem has occurred. Try later. If the problem persists, contact us on assistenza@thefaculty.it. ',
        OTHER_MESSAGES:
          'Something went wrong while logging in. Try again later. If the problem persists, contact us on assistenza@thefaculty.it.',
        EMAIL_NOT_VERIFIED: 'Email not yet verified.',
      },
      RESET_PASSWORD: {
        EMAIL_NOT_SENT: {
          TITLE: 'Oops!',
          MESSAGE:
            'Something went wrong in sending the recovery email. Please check the email address entered and try again!',
        },
      },
      REFERRAL_CODE: {
        TITLE_GENERIC: 'Oops!',
        TITLE_ESSELUNGA: 'Fìdaty card required!',
        REFERRAL_CODE_EMPTY:
          'Enter a Promotional Code in the box or scan the QR code to find out what it contains',
        INVALID_REFERRAL_CODE: 'The promotional code entered is not valid',
        NO_MORE_AVAILABLE: 'The promotional code entered is no longer valid',
        NOT_A_VERIFIED_ESSELUNGA_CUSTOMER:
          'In order to redeem this code, you must have a Fìdaty Card. If you have it, you can enter it in settings and return to this screen to redeem the discount voucher. ',
        EXPIRED_REFERRAL_CODE: 'This promotional code has expired',
        USER_HAS_NOT_PLAYED_A_CONTEST_GAME:
          'You must have played at least one game in the Contest to use this code! Come back later! ',
        ALREADY_USED:
          'You have used this Promo Code previously, if you have another try again',
      },
      MENU: {
        UPDATE_PROFILE_IMAGE: {
          TITLE: 'Oops!',
          MESSAGE: 'Your profile picture could not be changed. Try later.',
        },
        PROFILE_IMAGE_PICKER: {
          TITLE: 'Oops',
          MESSAGE:
            'The image could not be selected, please check that you have enabled camera permissions via the Settings of your device.',
        },
      },
    },
    RESET_PASSWORD: {
      EMAIL_SENT: {
        TITLE: 'Email sent!',
        MESSAGE:
          'We have sent you a password recovery email, follow the instructions in the email to be able to access thefaculty again!',
      },
    },
    CONTEST: {
      NO_CONTESTS_AVAILABLE: {
        TITLE: 'No games available',
        MESSAGE:
          'You have run out of games for today, but come back tomorrow to play again!',
      },
      ERROR_WHILE_STARTING: {
        TITLE: 'Oops!',
        MESSAGE: 'There was a problem starting the game.',
      },
      ERROR_WHILE_TESTING: {
        TITLE: 'Oops!',
        MESSAGE: 'There was a problem sending the reply.',
      },
      ERROR_WHILE_FINISHING: {
        TITLE: 'Oops!',
        MESSAGE:
          'There was a problem with closing the game. If the problem persists, contact us on assistenza@thefaculty.it. ',
      },
      ERROR_WHILE_GETTING_AD: {
        TITLE: 'Oops!',
        MESSAGE: 'An error occurred loading the advertisement. Try later.',
      },
      ERROR_WHILE_GETTING_USER_POSITION: {
        TITLE: 'Oops!',
        MESSAGE: 'There was a problem loading the location. Try later.',
      },
    },
    BESTOF: {
      ERROR_WHILE_STARTING: {
        TITLE: 'Oops!',
        MESSAGE: 'There was a problem.  NPlease try again later.',
      },
    },
    CONTEST_SCOREBOARD: {
      TITLE: 'Opps!',
      ERROR_WHILE_GETTING:
        'An error occurred while loading the Leaderboard. Please try again later.',
      ERROR_WHILE_GETTING_AD: 'An error occurred loading the advertisement.',
    },
    FRIENDS: {
      FRIEND_ADDED: {
        SUCCESS: {
          TITLE: 'Added Friend!',
          MESSAGE: 'You added this user to your friends!',
        },
        FAIL: {
          TITLE: 'Oops',
          MESSAGE:
            'Something went wrong in removing the friend. Try again later.',
        },
      },
      FRIEND_REMOVED: {
        SUCCESS: {
          TITLE: 'Friend Removed',
          MESSAGE: 'You have removed this user from your friends!',
        },
        FAIL: {
          TITLE: 'Oops',
          MESSAGE:
            'Something went wrong in removing the friend. Try again later.',
        },
      },
      RESPOND_TO_REQUEST_FAILED: {
        TITLE: 'Oops',
        MESSAGE:
          'Something went wrong in the friendship response. Try again later.',
      },
    },
    REFERRAL_CODE: {
      SUCCESS_TO_INSERT: {
        TITLE: 'Fantastic!',
        MESSAGE: 'The promotional code entered is valid!',
        MESSAGE_WITH_TITLE: 'The promotional code entered is valid:',
      },
    },
    LOGOUT: {
      LOGOUT: 'Logout',
      LOGOUT_REQUESTED: {
        TITLE: 'Are you sure?',
        MESSAGE: 'You are about to leave the faculty, are you sure?',
      },
      LOGOUT_SUCCESSFULL: {
        TITLE: 'Logout',
        MESSAGE: 'Logout successful.',
      },
    },
  },
  STATIC_IMAGES: {
    PROFILE_IMAGE_MALE:
      'Https://firebasestorage.googleapis.com/v0/b/thefaculty-a498a.appspot.com/o/static_images%2Fico_profile_male.png?alt=media&token=3a6157dc-9d73-45dc-9313-54f1fa61f7a7',
    PROFILE_IMAGE_FEMALE:
      'Https://firebasestorage.googleapis.com/v0/b/thefaculty-a498a.appspot.com/o/static_images%2Fico_profile_female.png?alt=media&token=10b59cbd-d165-4d02-a58d-12d733be0c59',
    PROFILE_IMAGE_OTHER:
      'Https://firebasestorage.googleapis.com/v0/b/thefaculty-a498a.appspot.com/o/static_images%2Fico_profile_other.png?alt=media&token=eedba3f3-9f59-42d3-95d8-5866bb689c41',
  },
  OTHER: {
    YES: 'Yes',
    NO: 'No',
    OK: 'OK',
    CANCEL: 'Cancel',
    DONE: 'End',
    SELECT: 'Select',
    LOADING: 'Loading',
    SAVE: 'Save',
    EDIT: 'Edit',
    SELECT_IMAGE: 'Select image',
    TAKE_IMAGE: 'Take a photo',
    SELECT_IMAGE_FROM_LIBRARY: 'Select from library',
    ERROR_CONNECTING_SERVER: 'An error occurred while connecting to server',
  },
};

export default strings;
