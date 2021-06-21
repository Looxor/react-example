export default {
  APP_NAME: 'The Faculty App',
  LOADING: 'Loading',
  LOADING_DATA: 'Loading data ...',
  LOGIN_LABEL: 'LOGIN',
  LOGIN_LABEL_LOWER: 'Entra',
  NEEDS_TO_UPDATE:
    'This app is out of date. Please update the App on the Store',
  SIGNUP_LABEL: 'REGISTER',
  WELCOME_TO_LOGIN: 'Welcome to the login screen!',
  ALERTS: {
    BESTOF: {
      ERROR_WHILE_STARTING: {
        MESSAGE: 'There was a problem. NPlease try again later.',
        TITLE: 'Oops!',
      },
    },
    CONTEST: {
      CONTEST_NOT_AVAILABLE: {
        MESSAGE: 'The Contest is not available. Retry later.',
        TITLE: 'Contest not available',
      },
      ERROR_WHILE_FINISHING: {
        MESSAGE:
          'There was a problem with closing the game. If the problem persists, contact us on assistenza@thefaculty.it. ',
        TITLE: 'Oops!',
      },
      ERROR_WHILE_GETTING_AD: {
        MESSAGE: 'An error occurred loading the advertisement. Try later.',
        TITLE: 'Oops!',
      },
      ERROR_WHILE_GETTING_USER_POSITION: {
        MESSAGE: 'There was a problem loading the location. Try later.',
        TITLE: 'Oops!',
      },
      ERROR_WHILE_STARTING: {
        MESSAGE: 'There was a problem starting the game.',
        MESSAGE_WITH_RETRY:
          'There was a problem starting the game. Will you try again?',
        TITLE: 'Oops!',
      },
      ERROR_WHILE_TESTING: {
        MESSAGE: 'There was a problem sending the reply.',
        TITLE: 'Oops!',
      },
      NO_CONTESTS_AVAILABLE: {
        MESSAGE:
          'You have run out of games for today, but come back tomorrow to play again!',
        TITLE: 'No games available',
      },
    },
    CONTEST_SCOREBOARD: {
      ERROR_WHILE_GETTING:
        'An error occurred while loading the Leaderboard. Please try again later.',
      ERROR_WHILE_GETTING_AD: 'An error occurred loading the advertisement.',
      TITLE: 'Opps!',
    },
    ERRORS: {
      LOGIN: {
        ACCOUNT_IS_DISABLED_BUTTON: 'Riattiva account',
        ACCOUNT_IS_DISABLED_MESSAGE:
          "Siamo felici che tu voglia tornare nel mondo di thefaculty! Tuttavia l'account collegato a questo indirizzo email è stato eliminato in precedenza, dunque per creare un nuovo profilo devi utilizzare un altro indirizzo email.\nSe hai bisogno di aiuto scrivici una email ad assistenza@thefaculty.it",
        ACCOUNT_IS_DISABLED_TITLE: 'Attenzione',
        EMAIL_NOT_VERIFIED: 'Email not yet verified.',
        IS_UNIVERSITY_EMAIL:
          "L'indirizzo email inserito è un indirizzo email universitario. Per poter accedere a thefaculty occorre inserire la tua email personale.",
        NETWORK_REQUEST_FAILED:
          'A connection problem has occurred. Try later. If the problem persists, contact us on assistenza@thefaculty.it. ',
        OTHER_MESSAGES:
          'Something went wrong while logging in. Try again later. If the problem persists, contact us on assistenza@thefaculty.it.',
        TITLE: 'Oops!',
        TOO_MANY_REQUEST:
          'You are trying to access this account too many times. Please try again later. If the problem persists, contact us on assistenza@thefaculty.it.',
        TOO_MANY_UNSUCCESSFUL_LOGIN:
          'Stai facendo troppi tentativi. Riprova più tardi.',
        USER_DISABLED:
          'The email address you entered corresponds to a disabled account, please contact Support at assistenza@thefaculty.it.',
        WRONG_EMAIL_OR_PASSWORD:
          "Make sure you've entered your email or password correctly and try again!",
      },
      MENU: {
        PROFILE_IMAGE_PICKER: {
          MESSAGE:
            'The image could not be selected, please check that you have enabled camera permissions via the Settings of your device.',
          TITLE: 'Oops',
        },
        UPDATE_PROFILE_IMAGE: {
          MESSAGE: 'Your profile picture could not be changed. Try later.',
          TITLE: 'Oops!',
        },
      },
      REFERRAL_CODE: {
        ALREADY_USED:
          'You have used this Promo Code previously, if you have another try again',
        ERROR_ON_APPLY_REFERRAL_CODE:
          'Non siamo riusciti a validare il codice promozionale inserito. Verifica il codice e riprova, se il problema persiste contattaci su assistenza@thefaculty.it',
        EXPIRED_REFERRAL_CODE: 'This promotional code has expired',
        GO_TO_TEST_SECTION_BUTTON: 'Vai alla sezione test',
        INVALID_REFERRAL_CODE: 'The promotional code entered is not valid',
        IS_A_SIMULATION_CODE:
          'Per avviare la simulazione scansiona questo codice QR dalla sezione Test',
        NOT_A_VERIFIED_ESSELUNGA_CUSTOMER:
          'In order to redeem this code, you must have a Fìdaty Card. If you have it, you can enter it in settings and return to this screen to redeem the discount voucher. ',
        NO_MORE_AVAILABLE: 'The promotional code entered is no longer valid',
        REFERRAL_CODE_EMPTY:
          'Enter a Promotional Code in the box or scan the QR code to find out what it contains',
        TITLE_ESSELUNGA: 'Fìdaty card required!',
        TITLE_GENERIC: 'Oops!',
        TITLE_WRONG_PLACE: 'Posto sbagliato!',
        USER_HAS_NOT_PLAYED_A_CONTEST_GAME:
          'You must have played at least one game in the Contest to use this code! Come back later! ',
      },
      RESET_PASSWORD: {
        EMAIL_NOT_SENT: {
          MESSAGE:
            'Something went wrong in sending the recovery email. Please check the email address entered and try again!',
          TITLE: 'Oops!',
          NOT_EMAIL_PROVIDER: {
            MESSAGE:
              'Questa email è collegata ad un accesso social. Usa {PROVIDERS} per accedere di nuovo al tuo account.',
            OTHER_SOCIAL: "l'accesso social collegato a questa email",
            TITLE: 'Oops!',
          },
          NOT_VALID_USER: {
            MESSAGE:
              'Non è stato trovato nessun account, verifica i dati inseriti e riprova.',
            TITLE: 'Oops!',
          },
          NOT_VERIFIED: {
            MESSAGE:
              "Prima di poter ripristinare la password è necessario confermare l'email.",
            TITLE: 'Oops!',
          },
          OTHER: {
            MESSAGE:
              "Qualcosa è andato storto nell'invio della email di ripristino. Verifica i dati inseriti e riprova!",
            TITLE: 'Oops!',
          },
          RESET_IN_PROGRESS: {
            MESSAGE:
              'È già stata inviata una email di ripristino precedentemente. Verifica la tua casella email oppure controlla anche in spam, se non è arrivata nessuna email contattaci su assistenza@thefaculty.it',
            TITLE: 'Oops!',
          },
        },
      },
      SIGNUP: {
        CREATION_SUCCESS: 'Your account has been successfully created!',
        EMAIL_INVLID: 'The email address is not valid',
        EMAIL_IN_USE:
          'An account with this email already exists, try logging in or contact Support at assistenza@thefaculty.it',
        ERROR_FIRSTNAME_MIN_LENGTH:
          'The name must have at least 3 characters, if it is correct contact us on assistenza@thefaculty.it',
        ERROR_LASTNAME_MIN_LENGTH:
          'The surname must have at least 3 characters, if it is correct contact us on assistenza@thefaculty.it',
        ERROR_NICKNAME_EXISTS: 'The nickname is already in use',
        OPERATION_NOT_ALLOWED:
          'Something is wrong, contact Support at assistenza@thefaculty.it',
        OTHER_MESSAGES:
          'Something went wrong during login, please try again later. If the problem persists, contact us at assistenza@thefaculty.it ',
        TITLE: 'Oops!',
        TITLE_SUCCESS: 'Cogratulations!',
        UNIVERSITY_EMAIL:
          'Per procedere devi inserire una email non universitaria',
        WEAK_PASSWORD: 'The password is not secure enough',
      },
      STANDARD: {
        ERROR: 'Error',
        FILL_ALL_FIELDS_TO_PROCEED:
          'You must fill in all the fields in order to proceed',
        OOPS: 'Oops!',
        SERVER_CONNECTION:
          'Error connecting to the server. Check your connection, if the problem persists contact support',
        SOMETHING_WENT_WRONG: 'Something went wrong',
        SOMETHING_WENT_WRONG_CONNECTION:
          'Something went wrong, check the connection and try again later',
        UNEXPECTED_ERROR: 'An unexpected error has occurred',
        WARNING: 'Attention',
      },
    },
    FRIENDS: {
      FRIEND_ADDED: {
        FAIL: {
          MESSAGE:
            'Something went wrong in removing the friend. Try again later.',
          TITLE: 'Oops',
        },
        SUCCESS: {
          MESSAGE: 'You added this user to your friends!',
          TITLE: 'Added Friend!',
        },
      },
      FRIEND_REMOVED: {
        FAIL: {
          MESSAGE:
            'Something went wrong in removing the friend. Try again later.',
          TITLE: 'Oops',
        },
        SUCCESS: {
          MESSAGE: 'You have removed this user from your friends!',
          TITLE: 'Friend Removed',
        },
      },
      RESPOND_TO_REQUEST_FAILED: {
        MESSAGE:
          'Something went wrong in the friendship response. Try again later.',
        TITLE: 'Oops',
      },
    },
    LOGOUT: {
      LOGOUT: 'Logout',
      LOGOUT_REQUESTED: {
        MESSAGE: 'You are about to leave the faculty, are you sure?',
        TITLE: 'Are you sure?',
      },
      LOGOUT_SUCCESSFULL: {
        MESSAGE: 'Logout successful.',
        TITLE: 'Logout',
      },
    },
    REFERRAL_CODE: {
      SUCCESS_TO_INSERT: {
        MESSAGE: 'The promotional code entered is valid!',
        MESSAGE_WITH_TITLE: 'The promotional code entered is valid:',
        TITLE: 'Fantastic!',
      },
    },
    RESET_PASSWORD: {
      EMAIL_SENT: {
        MESSAGE:
          'We have sent you a password recovery email, follow the instructions in the email to be able to access thefaculty again!',
        TITLE: 'Email sent!',
      },
    },
  },
  BESTOF: {
    FIRST_SCREEN_FRIEND_TEXT: 'Challenge a friend',
    FIRST_SCREEN_RANDOM_TEXT: 'Random opponent challenge',
    FRIEND_LIST_SCREEN_TEXT: 'Choose who you want to challenge',
    HOME_BOX_TEXT:
      'Start a new challenge, collect coins and get discounts immediately!',
    HOME_BOX_TITLE: 'CHALLENGES',
    HOME_SCREEN_BUTTON_TEXT: 'RANKING',
    HOME_SCREEN_NEW_BATTLE_STATUS: '{NUM2} lives of {NUM1}.',
    HOME_SCREEN_NEW_BATTLE_STATUS_ALL: 'you have all the lives',
    HOME_SCREEN_NEW_BATTLE_STATUS_MINS:
      'next life between {NUM1} m and {NUM2} s',
    HOME_SCREEN_NEW_BATTLE_TEXT: 'New challenge',
    HOME_SCREEN_ONGOING_TEXT: 'Challenges in progress',
    HOME_SCREEN_PARTNERS_TEXT: 'Play challenges and unlock discounts:',
    HOME_SCREEN_POINTS: 'tokens',
    HOME_SCREEN_POINTS_CAPTION: 'tokens',
    NO_FRIENDS_AVAILABLE: 'Nessun amico presente',
    OPPONENT: 'Opponent',
    OPPONENT_TURN: "It's the opponent's turn!",
    YOU: 'You',
    YOUR_TURN: "It's your turn!",
    BATTLE_SCREEN: {
      DESCRIPTION: "It's your turn, play now!",
      ERROR_WHILE_GETTING_INFO: 'A connection problem has occurred. Try later.',
      ERROR_WHILE_STARTING: 'There was a problem starting the game. Try later.',
      ITS_MY_TURN: "It's your turn, play now!",
      ITS_OPPONENT_TURN:
        "It's the opponent's turn. Wait for the opponent to finish playing.",
      MOVE_TO_HISTORY_BUTTON: 'MOVE TO HISTORY',
      PLAY_BUTTON: 'PLAY',
      REJECT_BUTTON: 'Leave challenge',
      RESULT_MESSAGE1_ABSTAINED: 'Ti sei astenuto!',
      RESULT_MESSAGE1_LOST: 'What a pity, you lost!',
      RESULT_MESSAGE1_WON: 'Congratulations! You won!',
      RESULT_MESSAGE2: 'You have accumulated {NUM1} tokens!',
      ROUND_CAPTION: 'Round {NUM1} of {NUM2}',
      TITLE: 'Challenge',
    },
    HISTORY: {
      EMPTY_DESC: 'Move challenges to history and see it in this page',
      TITLE: 'Historic challenges',
    },
    HOME_SCREEN: {
      FIRST_MESSAGE:
        'Complete a challenge to accumulate 20 tokens. NOnce you have accumulated the tokens, you can use them to unlock the discounts',
    },
    ONGOING_SCREEN: {
      LOST: 'Lost challenges',
      WIN: 'Challenges Won',
    },
    STATUS: {
      PLAYED_WITH: 'You played against {NAME}',
      PLAYING_MATCHES: 'Games in progress',
      PLAYING_WITH: "You're playing against {NAME}",
      SEARCHING: 'Looking for the opponent ...',
      TERMINATED_MATCHES: 'Games ended',
    },
    WON_LOST: {
      LOST: 'You lost {NUM1} to {NUM2}',
      LOST_DEFAULT: 'You lost at the table',
      PAREGED: 'You drew',
      WON: 'You won {NUM1} in {NUM2}',
      WON_DEFAULT: 'You won at the table',
    },
  },
  CAROUSEL_PAGE: {
    ERROR_NEED_TO_BE_STUDENT_MESSAGE:
      'Devi essere studente universitario per poter accedere a questa sezione.',
    ERROR_NEED_TO_BE_STUDENT_TITLE: 'Verifica studente richiesta',
  },
  CONTEST: {
    HOME_SCREEN: {
      FIRST_MESSAGE:
        'Accumulate points by correctly answering questions. The first place winners will win the prizes! ',
    },
    YOUR_PRIZES: {
      OVERLAY_CONGRAT_TEXT: 'Congratulations, you won the Contest!',
      OVERLAY_INSTRUCT_TEXT: 'Redeem now your prizes!',
    },
  },
  COUPONS: {
    AVAILABLE_COUPONS_MORE: 'discounts available',
    AVAILABLE_COUPONS_ONE: 'discount available',
    BARCODE: 'Barcode',
    COPY: 'COPY',
    COUPONS_PAGE_TITLE: 'Discounts',
    GENERATE_COUPON: 'BURN DISCOUNT',
    OPEN: 'OPEN',
    QRCODE: 'QR code',
    USED_COUPONS: 'Discounts obtained',
    CONDITIONS_SCREEN: {
      TITLE: 'Terms of use',
    },
    COUPON_SCREEN: {
      CONDITION_BUTTON: 'Terms of use',
      CONDITION_LABEL: 'Termini e condizioni',
      DISCOUNT_USED: 'Sconto utilizzato',
      ERROR_ON_MARKING_UNUSED: 'An error occurred while marking as unused',
      ERROR_ON_MARKING_USED: 'An error occurred while marking as used',
      ERROR_WHILE_REDEEM:
        'A problem occurred while generating the Discount. Check all the conditions of use or if the problem persists contact us on assistenza@thefaculty.it ',
      MARK_UNUSED: 'Ripristina',
      QUESTION_USED_COUPONS: 'Hai utilizzato lo sconto?',
      QUESTION_USED_COUPONS_DESC:
        'Confermi di averlo appena utilizzato con il nostro partner?',
      REDEEMING_TEXT: 'Generating discount in progress ...',
      REDEEM_BUTTON: 'CREATE DISCOUNT',
      REQUIREMENTS_LABEL: 'Requisiti',
      TO_UNLOCK_LABEL: 'Per sbloccare servono',
      VALID_FROM_TO: 'Valido dal {START_DATE} al {FINISH_DATE}',
    },
    HISTORY_SCREEN: {
      EXPIRED_COUPON: 'This discount expired on {NUM2}',
      TITLE: 'Discounts obtained',
      VALID_FROM_TO: 'Valid from {NUM1} to {NUM2}',
    },
    HOME: {
      COUPONS_NOT_AVAILABLE: 'Benefits are not available now, retry later',
      DESC1: '{NUM} discounts are available',
      DESC2: 'You already generated {NUM}',
      DISCOVER_LABEL: 'Scopri',
      LOAD_MORE_COUPONS: 'Carica altri sconti',
      LOCK_AUTH_BUTTON: 'AUTHENTICATE',
      LOCK_DESCRIPTION1:
        'Please, verify that you are a student with your university email or the photo of your student card',
      LOCK_DESCRIPTION2:
        'In this way you can spend your coins to obtain coupons and exclusive benefits',
      MARKED_UNUSED_LABEL: 'Da utilizzare',
      MARKED_USED_LABEL: 'Già utilizzati',
      NOT_STUDENT: 'You must be student to access to this section',
      POINT_CAPTION: 'Tokens',
      POINT_CAPTION_FREE: 'FREE',
      REMAINING_CAPTION1: 'Solo',
      REMAINING_CAPTION2: 'sconti rimasti!',
      REMAINING_CAPTION2_ONE: 'Ultimo sconto rimasto!',
      VALIDATE_UNTIL: 'Valid until',
    },
    INVALID_REASONS: {
      ALREADY_USED: 'You have already generated this discount before.',
      ANY_LEFT:
        'These discounts are sold out. NGo back for more discounts soon!',
      COINS_REQUIREMENT:
        "You don't have enough tokens to generate this discount.",
      EPASTA_STORE_VISITED:
        'Per sbloccare questo sconto scannerizza il codice QR di the[bold]faculty[/bold] che trovi nelle cucine di èPasta!',
      ESSELUNGA_VERIFIED_CUSTOMER:
        'To unlock this discount you must have associated the Fìdaty Card from the App Menu.',
      EXCLUDE_USED:
        'You have already generated a discount similar to this one before. NYou cannot get this discount.',
      IS_ACTIVE: 'This discount is available starting from {start_date}.',
      MCFIT_TRIAL_DAY_DONE:
        'To unlock this discount go to a McFIT gym, do the test day and scan the QR code of the faculty that you will find in the gym from the Promotional Code section!',
      OBAG_STORE_VISITED:
        "Per sbloccare questo sconto vai in uno dei negozi O bag aderenti all'iniziativa e scannerizza il codice QR di the[bold]faculty[/bold]!",
      OTHER: 'This discount is currently not payable.',
      PREVIOUS_COUPON_USED: 'You have already generated this discount before.',
    },
    SCONTI: {
      AVAILABLE: 'Disponibili',
      USED: 'Ottenuti',
    },
    TABS: {
      PREMI: {
        TITLE: 'Prizes',
      },
      SCONTI: {
        TITLE: 'Coupons',
      },
    },
    VIEW: {
      BARCODE_ACTIVATION_CODE: 'Codice univoco:',
      BARCODE_DESC:
        'Click on the QR to enlarge it. Problems with the QR? Enter this: ',
      CODE_COPIED_MESSAGE: 'The coupon code is copied in the clipboard',
      CODE_COPIED_TITLE: 'Code copied',
      LINK_DESC:
        'Press the OPEN or COPY button on your browser to immediately open your personal account!',
      LINK_POPUP_MESSAGE:
        'The Discount link has been copied, paste it in your browser to take advantage of the discount.',
      LINK_POPUP_TITLE: 'Link copied',
      NOTHING_DESC: 'Hai già usufruito di questo sconto.',
      NOTHING_DESC_ESSE:
        'Congratulations! The € 5 discount has been successfully uploaded to yours\nFìdaty card. Go to the store and the discount will come automatically\napplied from the cash desk to the passage of the Fìdaty Card and\nexceeding the expected threshold. The discount is not valid for\nonline expenses.',
      NOTHING_DESC_MCFIT:
        'The discount has been unlocked! \nShow this screen to the trainer to activate the discounted rate subscription.',
      QRCODE_DESC:
        'Click on the barcode to enlarge it. Problems with the barcode? Enter this: ',
      QRCODE_PROBLEM_DESC: 'Problemi con il QR code?\nInserisci questo codice:',
      TEXT_DESC: 'Your discount code is',
      TIMEOUT_DESC_COMPLETED:
        'Congratulations! Your discount has been successfully used! ',
      TIMEOUT_DESC_COUNTING: 'The discount was generated!',
      TIMEOUT_POPUP_MESSAGE1: 'Are you in this shop?',
      TIMEOUT_POPUP_MESSAGE1_DEFAULT: 'Are you at {PARTNER_NAME}?',
      TIMEOUT_POPUP_MESSAGE2: 'Show this screen to an employee!',
      TIMEOUT_POPUP_MESSAGE2_M: 'He will press OK to enable the discount.',
    },
  },
  FIRST_SCREEN: {
    CONFIRM_QUESTION: 'Hai gia un account?',
    ONBOARD1: {
      TEXT: "Entra subito nell'app a\nmisura di studente!\nDivertiti, esercitati e risparmia!",
      TITLE: '[bold]Benvenuto su[/bold] the[bold]faculty![/bold]',
    },
    ONBOARD2: {
      TEXT: "Scegli la facoltà che più ti si addice.\nCompeti con altri studenti sulle\nmaterie d'esame.",
      TITLE: '[bold]Sfida i tuoi amici[/bold]',
    },
    ONBOARD3: {
      TEXT: 'Guadagna i gettoni e sblocca sconti,\nabbonamenti e vantaggi esclusivi.\nCon alcuni partner potrai addirittura\nguadagnare!',
      TITLE: '[bold]Ottieni vantaggi[/bold]',
    },
    ONBOARD4: {
      TEXT: "Allenati per entrare nell'università dei\ntuoi sogni. Mettiti alla prova con le\nsimulazioni o concentrati sulle\nmaterie più difficili.",
      TITLE: '[bold]Ripassa giocando[/bold]',
    },
    ONBOARD5: {
      TEXT: "Vuoi saperne di più?\nRegistrati ora e inizia subito a usare l'app!\nDivertiti, esercitati e risparmia!",
      TITLE: '[bold]Scopri[/bold] the[bold]faculty[/bold]',
    },
  },
  FRIENDS: {
    FRIENDS_LABEL: 'Friends',
    HOME_BOX_TEXT:
      'Aggiungi i tuoi amici su thefaculty: divertitevi e sfidatevi per ottenere numerosi gettoni!',
    HOME_BOX_TITLE: 'AMICI',
    NEW_PENDING_REQUESTS: 'New friend requests',
    SEARCHING_LABEL: 'Users found',
    SEARCH_FRIEND_PLACEHOLDER: 'Search for a friend',
    YOUR_FRIENDS_LABEL: 'Your friends',
    PENDING_REQUESTS: {
      BUTTON_ACCEPT: 'ACCEPT',
      BUTTON_REJECT: 'REFUSE',
      NO_PENDING_FRIENDSHIP_REQUESTS: 'No new requests',
      PENDING_REQUESTS_TITLE: 'Friend requests',
    },
    USER_DETAILS: {
      ACCEPT_REQUEST_BUTTON: 'ACCEPT REQUEST',
      ADD_FRIEND_BUTTON: 'ADD TO FRIENDS',
      FRIENDS_LABEL: 'Friends',
      LOST_BESTOFS: 'Lost challenges',
      NOT_IN_SCOREBOARD_LABEL: 'Not ranked',
      PROFILE_TITLE: 'Profile',
      REMOVE_FRIEND_BUTTON: 'REMOVE FROM FRIENDS',
      SCOREBOARD_LABEL: 'in the ranking',
      SCORES_LABEL: 'Points',
      START_TEXT_1: 'Start one',
      START_TEXT_2: 'new challenge',
      STUDYTOWN_DESCRIPTION: 'Study city:',
      WON_BESTOFS: 'Won challenges',
    },
  },
  HOME: {
    ONBOARD1: {
      TEXT: "Ora potrai [bold]divertirti[/bold], [bold]esercitarti[/bold] e [bold]risparmiare[/bold] con l'app a misura di studente.",
      TITLE: '[bold]Benvenuto su[/bold] the[bold]faculty[/bold]!',
    },
    ONBOARD2: {
      TEXT: 'Inizia una [bold]sfida[/bold], [bold]rispondi alle domande[/bold] e [bold]guadagna gettoni[/bold]. Potrai usarli per ottenere tanti vantaggi!',
      TITLE: "[bold]Inizia subito ad esplorare l'app![/bold]",
    },
  },
  LOGIN: {
    EMAIL_PLACEHOLDER: 'Email',
    LOGIN_BUTTON_TEXT: 'LOGIN',
    LOGIN_TITLE: 'Login',
    NO_ACCOUNT: "Don't have an account?",
    PASSWORD_PLACEHOLDER: 'Password',
    REMEMBER_PASSWORD: "I can't remember my password",
    SIGNUP_LABEL: 'Register',
  },
  LOGINV2: {
    ALTERNATIVE: 'oppure',
    CONTINUE: 'CONTINUA',
    DESCRIPTION:
      'Non sei ancora registrato? Continua con Google, Facebook, Apple,',
    DESCRIPTION2: 'oppure',
    EMAIL_OR_NICKNAME: 'Email',
    FORGOT_PASSWORD: 'Non ricordi la password?',
    PASSWORD: 'Password',
    REGISTER_BY_EMAIL: "registrati con l'email",
    SOCIAL_SIGNIN: {
      APPLE: 'Continua con Apple',
      FACEBOOK: 'Continua con Facebook',
      FACEBOOK_CANCELLED_MESSAGE:
        'Si è verificato un problema nei server di Facebook, ti chiediamo di riprovare più tardi.',
      FACEBOOK_CANCELLED_TITLE: 'Richiesta annullata',
      GOOGLE: 'Continua con Google',
      INSTAGRAM: 'Continua con [bold]Instagram[/bold]',
      LINKEDIN: 'Continua con [bold]Linkedin[/bold]',
      PASSWORD: 'Continua con [bold]Password`[/bold]',
    },
  },
  MENU: {
    UPDATE_PROFILE_IMAGE: {
      DEFAULT_TITLE: 'Image',
      PREVIEW_TITLE: 'Preview',
    },
  },
  MONTHS: {
    1: 'January',
    10: 'October',
    11: 'November',
    12: 'December',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
  },
  OTHER: {
    CAMERA_PERMISSIONS_REQUIRED:
      'I permessi alla fotocamera sono disattivati. Vai su Impostazioni del tuo dispositivo e abilita i permessi alla fotocamera per poter procedere.',
    CANCEL: 'Cancel',
    CANT_USE_FIREBASE:
      'Non è possibile utilizzare Firebase in questo dispositivo.',
    CLOSE: 'Chiudi',
    COINS: 'gettoni',
    CONFIRM: 'Confirm',
    DONE: 'End',
    EDIT: 'Edit',
    ERROR_CONNECTING_SERVER: 'An error occurred while connecting to server',
    ERROR_FIRESTORE_UPLOADING:
      'An error occurred on uploading to the FireStore!',
    ERROR_UPDATING_ACCOUNT: 'An error occurred on updating account!',
    EURO_SIGN: '€',
    LOADING: 'Loading',
    NO: 'No',
    NO_DATA: 'There is no data to display',
    OK: 'OK',
    RETRY: 'Retry',
    SAVE: 'Save',
    SEARCH: 'Cerca...',
    SELECT: 'Select',
    SELECT_IMAGE: 'Select image',
    SELECT_IMAGE_FROM_LIBRARY: 'Select from library',
    TAKE_IMAGE: 'Take a photo',
    UPDATE: 'Update',
    WARNING: 'Warning',
    YES: 'Yes',
  },
  PROFILE: {
    CONFIRM_EMAIL: {
      DESCRIPTION:
        "Ti abbiamo inviato un'email all'indirizzo \n[bold]{EMAIL}[/bold].\nClicca sul link per certificare la tua email.\nSe non trovi l'email potrebbe essere finita della cartella 'spam'",
      RESEND_EMAIL: 'Reinvia email',
      RETURN_TO_PROFILE: 'TORNA AL PROFILO',
      TITLE: 'Certificazione email',
      VERIFY_EMAIL: 'Verifica email',
    },
    FAIL_DIALOG: {
      DESCRIPTION:
        'Hai completato i tuoi dati, hai guadagnato [bold]{COIN} gettoni[/bold]!',
      TITLE: 'Oops!',
    },
    HOME: {
      BIRTHDAY: 'Data di nascita',
      EMAIL: 'Email di contatto',
      FACULTY_INFO:
        'Ti serve per trovare altri giocatori con i tuoi stessi interessi',
      FACULTY_TITLE: 'Cosa mi piace?',
      GENDER: 'Genere',
      GENDER_F: 'Donna',
      GENDER_M: 'Uomo',
      GENDER_O: 'Altro',
      MODIFY_BUTTON: 'Modifica',
      SAVE_BUTTON: 'Salva',
      SELECT_FACULTY: "Scegli l'area di tuo interesse",
      TITLE: 'Profilo',
      USER_TYPE_TITLE: 'Cosa frequento?',
      USE_MAIN_EMAIL: 'Usa la mia email principale',
      YOUR_DATA: 'Chi sono?',
    },
    MESSAGE: {
      CANT_VERIFY_CONTACT_EMAIL:
        'Non puoi verificare la tua email di contatto, riprova più tardi.',
      CANT_VERIFY_STUDENT_EMAIL:
        'La verifica della tua email è già in corso. Se hai sbagliato qualche dato attendi 5 minuti e torna in questa sezione per procedere con una nuova verifica.',
      CHANGED_TO_VERIFY_STUDENT_EMAIL:
        "Nuova email di verifica inviata all'indirizzo {EMAIL} per la verifica.",
      CONTACT_EMAIL_ALREADY_EXISTS:
        "Questa email è già stata usata da un altro account, usane un'altra per poter procedere.",
      DATA_MODIFY_FAIL:
        'Non siamo riusciti a modificare i tuoi dati, riprova più tardi.',
      DATA_MODIFY_SUCCESS: 'Dati modificati con successo!',
      DESCRIPTION_LABEL:
        'Inserisci "[bold]{WHAT}[/bold]" per ottenere subito [bold]{COIN} gettoni[/bold]!',
      DESCRIPTION_LABEL_BASIC_DATA: 'Chi sono?',
      DESCRIPTION_LABEL_FACULTY:
        'Inserisci "[bold]{WHAT}[/bold]" per completare il tuo profilo!',
      DESCRIPTION_LABEL_FACULTY_DATA: 'Cosa mi piace?',
      DESCRIPTION_LABEL_NEW:
        'Completa il tuo profilo per farti conoscere dagli altri studenti. Otterrai anche dei gettoni!',
      DESCRIPTION_LABEL_USER_TYPE: 'Cosa frequento?',
      FAILED_TO_VERIFY_STUDENT_EMAIL:
        "Si è verificato un problema durante l'invio della email di verifica.",
      SUCCESS_TO_VERIFY_STUDENT_EMAIL: 'Email inviata con successo!',
      UNKNOWN_ERROR: 'Si è verificato un errore imprevisto, riprova più tardi.',
      VERIFY_CONTACT_AND_GOT_REWARD:
        'Hai completato chi sei, hai guadagnato [bold]{COIN} gettoni[/bold]!',
      VERIFY_STUDENT_AND_GOT_REWARD:
        'Hai completato cosa studi, hai guadagnato [bold]{COIN} gettoni[/bold]!',
      VERIFY_STUDENT_EMAIL_OR_CARD_AND_GOT_REWARD:
        'Hai completato questo blocco, hai guadagnato [bold]{COIN} gettoni[/bold]!',
    },
    SUCCESS_DIALOG: {
      DESCRIPTION:
        'Hai completato i tuoi dati, hai guadagnato [bold]{COIN} gettoni[/bold]!',
      TITLE: 'Complimenti!',
    },
    USER_TYPE: {
      ANNO: 'Anno',
      CITY: 'Città di residenza',
      COURSE_OF_STUDY: 'Corso di studi',
      EDUCATION_LEVEL: "Livello d'istruzione",
      FUORI: 'Fuori sede',
      FUORI_NO: 'No, non sono uno studente fuori sede',
      FUORI_YES: 'Sì, sono uno studente fuori sede',
      HIGH_SCHOOL: 'Superiori',
      INSTITUTION_NAME: 'Nome istituto',
      NON_STUDENT: 'Non studente',
      UNIVERSITY: 'Università',
      YEAR_DESCRIPTION: '° anno',
    },
    VERIFY_BUTTON: {
      CARD_VERIFY_IN_PROGRESS:
        'In attesa di verifica...\nIl badge è in fase di revisione da un nostro operatore, ci potrebbe volere qualche giorno.',
      EMAIL_VERIFY_IN_PROGRESS:
        "In attesa di verifica...\nTi abbiamo inviato un'email di verifica, se hai sbagliato l'email torna qui tra 5 minuti.",
      EMPTY_DATA:
        'Accreditati come studente universitario\nper sbloccare tutti i vantaggi',
      EMPTY_DATA_EDIT:
        'In attesa di verifica...\nSe hai sbagliato qualche dato, clicca qui per poter effettuare una nuova verifica.',
      EMPTY_DATA_TITLE: 'Certifica Università',
    },
  },
  REFERRAL_CODE: {
    ALERT_ESSELUNGA:
      'Oops! In order to use an Esselunga Promo Code, you must first associate your Fìdaty Card! ',
    HOME_BOX_TEXT:
      'Have you found a promotional code or a QR code the faculty? Use it and get your reward ',
    HOME_BOX_TITLE: 'PROMO CODE',
    INSERT_NEW_REFERRAL_CODE: 'Enter the promotional code',
    NO_USED_CODES: 'No promotional code nutilized so far.',
    OR_LABEL: 'or',
    PAGE_BOX_TEXT: 'Scan a Promotional Code and find out what it contains',
    REFERRAL_CODE: 'Promotional Code',
    REFERRAL_CODE_BOX_LABEL: 'Code',
    SCAN_BUTTON_TEXT: 'Scan the QR Code',
    SCAN_QRCODE_TITLE: 'Scan QR code',
    USE_NOW_BUTTON: 'USE NOW',
    WHEN_USED: 'Used on',
  },
  RESET_PASSWORD: {
    DESCRIPTION_TEXT:
      'Enter the email address used during registration, we will send you an email to reset your password',
    EMAIL_PLACEHOLDER: 'Email',
    ERROR_RESETTING_PASSWORD_MESSAGE:
      "Qualcosa è andato storto durante l'invio della email di ripristino della password. Riprova più tardi oppure contattaci su assistenza@thefaculty.it",
    ERROR_RESETTING_PASSWORD_TITLE: 'Oops!',
    RESET_PASSWORD_TITLE: 'Password recovery',
    SEND_BUTTON_TEXT: 'SEND',
  },
  SECTIONS: {
    BESTOF: 'Challenges',
    CONTEST: 'Competition',
    COUPONS: 'Discounts',
    FRIENDS: 'Friends',
    HOME: 'Home',
    MENU: 'Menu',
    TEST: 'Test',
  },
  SETTINGS: {
    TITLE: 'Settings',
    BARCODE_READER: {
      READ_FAILED: 'Unread barcode code',
      READ_SUCCESS: 'Barcode code successfully read!',
      TITLE_BARCODE: 'Scan barcode',
      TITLE_QRODE: 'Scan qrcode',
    },
    CARD_REGISTER_ID: {
      CONTINUE_BUTTON: 'Continue',
      ERROR_INVALID_CARD_BACK: 'Invalid card url for the back side',
      ERROR_INVALID_CARD_FRONT: 'Invalid card url for the front side',
      HEADER_LABEL: 'Inserisci la foto della tua carta d’identità',
      PLACE_HOLDER1: 'Interno Carta d’Identità',
      PLACE_HOLDER1_UPLOADED: 'Foto interna caricata',
      PLACE_HOLDER2: 'Esterno Carta d’Identità',
      PLACE_HOLDER2_UPLOADED: 'Foto esterna caricata',
      TITLE: 'Carta d’identità',
    },
    CARD_REGISTER_TAX: {
      CONTINUE_BUTTON: 'Continue',
      ERROR_ALREADY_SENT: 'You have already sent documentation',
      ERROR_INVALID_CARD_BACK: 'Invalid card url for the back side',
      ERROR_INVALID_CARD_FRONT: 'Invalid card url for the front side',
      ERROR_SAVING_URLS:
        'There was an error occurred while saving documents.\nPlease try again later!',
      HEADER_LABEL: 'Inserisci la foto del tuo codice fiscale',
      PLACE_HOLDER1: 'Fronte Codice Fiscale',
      PLACE_HOLDER1_UPLOADED: 'Fronte Codice Fiscale',
      PLACE_HOLDER2: 'Retro Codice Fiscale',
      PLACE_HOLDER2_UPLOADED: 'Retro Codice Fiscale',
      SUCCESS_SAVING_URLS: 'Successfully saved the URLs!',
      TITLE: 'Codice fiscale',
    },
    CARTA_FIDATY: {
      BARCODE_PLACEHOLDER: 'Fìdaty Card Code',
      DESC_NOT_VERIFIED:
        'To redeem the discounts and prizes offered by Esselunga on the thefaculty App you will need your Fìdaty Card. N nAssociate your Fìdaty Card now',
      DESC_VERIFIED:
        'You have already associated a Fìdaty Card. You can modify a Fìdaty Card for loss or theft, replace the Card for deterioration or change to another type of Fìdaty Card',
      DISCOVER_CARD: 'Discover the Fìdaty Card',
      DONE: 'DONE',
      DONT_HAVE_CARD: "Don't you have a Fìdaty card yet?",
      HOW_TO_REQUEST: 'Find out how to request it',
      NOT_NOW: 'Not now',
      SHOULD_BE_13: 'The code should be 13 characters!',
      TITLE: 'Esselunga',
      TITLE2: 'Carta Fidaty - Esselunga',
      VERIFY_CARD_BLOCKED:
        'La tua Carta Fìdaty risulta bloccata. Per maggiori informazioni contatta il Servizio Clienti Esselunga al Numero Verde gratuito 800-666555',
      VERIFY_CARD_CANCELED:
        'La tua Carta Fìdaty risulta cancellata. Per maggiori informazioni contatta il Servizio Clienti Esselunga al Numero Verde gratuito 800-666555',
      VERIFY_ERROR_TITLE: 'Attenzione!',
      VERIFY_ERROR_UNKNOWN: 'Errore sconosciuto!',
      VERIFY_MUST_BE_NUMBERIC:
        'Il numero della Carta Fìdaty è composto da sole cifre. Inserisci le 13 cifre e riprova',
      VERIFY_NOT_COMPLETED:
        'Il numero della Carta inserito è corretto ma la registrazione al Programma Fìdaty non è completa. Accedi al sito www.esselunga.it per completarla',
      VERIFY_NOT_NEW_CARD:
        'La tua Carta Fìdaty risulta cancellata. Per maggiori informazioni contatta il Servizio Clienti Esselunga al Numero Verde gratuito 800-666555',
      VERIFY_SUCCESS_TEXT:
        'La tua Carta Fìdaty è stata associata correttamente!',
      VERIFY_SUCCESS_TITLE: 'Carta Fìdaty associata',
      VERIFY_WRONG_CARD:
        'La Carta Fìdaty inserita non è corretta. Controlla il numero inserito e riprova',
      VERIFY_WRONG_NAME:
        'I dati della Carta Fìdaty non corrispondono a quelli inseriti in fase di registrazione a thefaculty. Verifica che la Carta sia intestata a te e riprova',
    },
    CHANGE_LEGAL_CHECKS: {
      DESCRIPTION:
        'Vuoi modificare le tue preferenze riguardanti i consensi legali?',
      ERROR_WHILE_UPDATING:
        'Non siamo riusciti a modificare le tue preferenze, riprova più tardi.',
      SAVE_BUTTON: 'SALVA MODIFICHE',
      SUCCESS_UPDATING_MESSAGE:
        'La tue preferenze sono state modificate con successo.',
      SUCCESS_UPDATING_TITLE: 'Fatto!',
      TITLE: 'Consensi legali',
    },
    CHANGE_PASSWORD: {
      CHANGE_BUTTON: 'CHANGE PASSWORD',
      DESCRIPTION: 'Do you want to set a nnew password?',
      ERROR_UNKNOWN:
        'A problem occurred while changing the notification level. Try later.',
      ERROR_WRONG_PASSWORD: 'The password is not valid.',
      LEGEND_1_CHECKED: '✓ 8 characters',
      LEGEND_1_UNCHECKED: '- 8 characters',
      LEGEND_2_CHECKED: '✓ a lowercase and uppercase letter',
      LEGEND_2_UNCHECKED: '- a lowercase and uppercase letter',
      LEGEND_3_CHECKED: '✓ a number',
      LEGEND_3_UNCHECKED: '- a number',
      LEGEND_DESCRIPTION: 'The password must contain at least:',
      NEW_PASSWORD: 'Enter the new password',
      OLD_PASSWORD: 'Enter the old password',
      SUCCESS_CHANGE_PASSWORD: 'You have successfully changed your password!',
      TITLE: 'Change password',
    },
    DELETE_ACCOUNT: {
      CONFIRM_BUTTON: 'CONFIRM',
      CONFIRM_DESC: 'Why do you want to leave the faculty?',
      CONFIRM_MESSAGE:
        'We are sorry you want to leave us. Are you really sure you want to proceed? ',
      ERROR_ON_DELETE:
        'There was a problem canceling your account. Try again later, if the problem persists, contact Support via assistenza@thefaculty.it ',
      ERROR_ON_LOGGING_OUT:
        'A problem occurred during the automatic logout. We ask you to manually log out of the App. ',
      ERROR_UNKNOWN:
        'An unknown problem has occurred. Try again later, if the problem persists, contact Support via assistenza@thefaculty.it ',
      REMAIN_BUTTON: 'Stay on thefaculty',
      TITLE: 'Delete account',
    },
    DELETE_ACCOUNT_AFTER: {
      CLOSE_BUTTON: 'CLOSE',
      DESCRIPTION:
        'Your profile has been deleted. Come back soon! You will always be welcome! ',
      TITLE: 'Profilo disattivato',
    },
    EDIT_FACULTY: {
      ALL_FACULTIES: 'All faculties',
      BUTTON_TITLE: 'CHANGE FACULTY',
      ERROR_WHILE_UPDATING_FACULTY:
        'There was a problem changing your faculty. Try later.',
      SUCCESS_TO_UPDATING_FACULTY:
        'Congratulations, you have successfully modified your faculty!',
      TITLE: 'Change faculty',
      YOUR_FACULTY: 'Your faculty is',
    },
    EDIT_SUBJECT_WEIGHT: {
      BUTTON1: 'Reset values',
      BUTTON2: 'CHANGE THE WEIGHTS',
      EMPTY_ERROR:
        'There was a problem restoring the subjects you want to play with. Try later.',
      EMPTY_SUCCESS:
        'The subjects you want to play with have been successfully restored!',
      NO_DATA: 'No subject present at the moment',
      OTHER_SUBJECTS_PLAYING_WITH: 'Other subjects you are playing with',
      SPECIFY_SUBJECTS_FOR_YOUR_FACULTY: 'Specific subjects of your faculty',
      TITLE: 'Subjects',
      YOUR_FACULTY: 'Your faculty is',
    },
    EDIT_SUBJECT_WEIGHT2: {
      CONTINUE: 'CONTINUE',
      DESCRIPTION:
        'Choose how often you want to play with snowshoes of these subjects in the [bold] Challenges [/ bold] and [bold] Competitions [/ bold] sections',
      TITLE: 'Weight of materials',
    },
    EDIT_SUBJECT_WEIGHT3: {
      CONTINUE: 'CONTINUE',
      DESCRIPTION:
        'Choose other subjects you want to play with. You can change your choice at any time.',
      ERROR:
        'There was a problem restoring the subjects you want to play with. Try later.',
      LOAD_MORE_SUBJECTS: 'Show all subjects',
      LOAD_SUGGESTED_SUBJECTS: 'Show recommended subjects',
      SUCCESS:
        'The subjects you want to play with have been successfully modified!',
      TITLE: 'Choice of subjects',
    },
    FAQ: {
      NOTHING_FOUND:
        'Nessuna domanda trovata, se hai bisogno di aiuto contattaci su assistenza:',
      PAGE_TITLE: 'Frequently asked questions',
      SEARCH_PLACEHOLDER: 'Cerca una domanda...',
      TITLE: 'FAQ',
    },
    HOME: {
      AGREEMENTS_SETTINGS: 'Consensi legali e privacy',
      APP_SETTINGS: '[bold]Impostazioni app[/bold]',
      CARTA_FIDATY: 'Carta Fìdaty | Esselunga',
      DELETE_ACCOUNT_SETTINGS: 'Elimina account',
      DEV_SETTINGS: '[bold]Development settings[/bold]',
      EDIT_FACULTY: 'Change your faculty',
      EDIT_SUBJECT: 'Change your subjects',
      EMAIL_CLIENT_NO_EXITS:
        'To contact support write us an email at assistenza@thefaculty.it',
      EMAIL_SUPPORT: 'Contact support',
      EMAIL_SUPPORT_BODY:
        ' n n ---------- n [USER_ID] nDate: [DATETIME] nNickname: [NICKNAME] nName: [NAME] n ---------- n n ',
      EMAIL_SUPPORT_BODY_ACCOUNT_DISABLED:
        "Ciao,\nvoglio tornare a giocare e approfittare dei vantaggi di thefaculty.\n\nPer questo desidero la riattivazione dell'account.",
      EMAIL_SUPPORT_SUBJECT: 'Assistance - thefaculty: [NICKNAME]',
      EMAIL_SUPPORT_SUBJECT_ACCOUNT_DISABLED: 'Account disabilitato',
      FACULTY_INFORMATION: 'About the[bold]faculty[/bold]',
      FAQ: 'Frequently asked questions',
      INSTAGRAM_PAGE: 'Pagina Instagram di the[bold]faculty[/bold]',
      LINKEDIN_PAGE: 'Pagina LinkedIn di the[bold]faculty[/bold]',
      LOGOUT: 'Exit',
      NEED_HELP: 'Do you need help?',
      NOTIFICATION_SETTINGS: 'Livello notifiche',
      PASSWORD_SETTINGS: 'Modifica password',
      PRIAVACY_POLICY: 'Privacy policy',
      PROFILE: 'Profile',
      QUESTIONS_QUALITY: 'Quality questions | Selexi ',
      SETTINGS: 'Account settings',
      SOCIAL_LABEL: '[bold]Social[/bold]',
      SOCIAL_POPUP: 'Our social networks',
      SOCIAL_POPUP_CANCEL: 'Back',
      SOCIAL_POPUP_TITLE: 'Social',
      SOCIAL_POPUP_WEBSITE: 'thefacultyapp.com',
      STORE_PAGES: 'Evaluate the App',
      SUPPORT: 'Do you need help?',
      SUPPORT_LABEL: 'the[bold]faculty e supporto[/bold]',
      THEFACULTY_PARTNER: 'Partner of the[bold]faculty[/bold]',
      THEFACULTY_WEBSITE: 'Visita il sito di the[bold]faculty[/bold]',
      TOS: 'Terms and conditions',
      UPGRADE_TO_STUDENT_ACCOUNT: 'Upgrade to student account',
      USER_SETTINGS: '[bold]Impostazioni account[/bold]',
    },
    PARTNERS: {
      ERROR_ON_GETTING_DATA: 'A connection problem has occurred. Try later.',
      TITLE: 'Partner',
    },
    QUESTIONS_QUALITY: {
      ERROR_ON_GETTING_DATA: 'A connection problem has occurred. Try later.',
      TITLE: 'Selexi',
    },
    SETTINGS_HOME: {
      CHANGE_PASSWORD: 'Change password',
      DELETE_ACCOUNT: 'Delete account',
      NOTIFICATION_SETTINGS: 'Notification settings',
      STUDY_AT: 'Study city:',
      TITLE: 'Settings',
    },
    SETTINGS_NOTIFICATION: {
      CAPTION1:
        'Minimum level: nImportant news such as winning a prize or approving a document',
      CAPTION1_TITLE: 'Livello minimo',
      CAPTION2: 'Basic level: nImportant news and notifications about friends',
      CAPTION2_TITLE: 'Livello base',
      CAPTION3:
        'Maximum level nAll game notifications or inserting a new prize',
      CAPTION3_TITLE: 'Livello massimo',
      DESCRIPTION:
        'Choose how long you want to stay updated on what happens in the App',
      SET_LEVEL_ERROR:
        'There was a problem changing the notification level. Try later.',
      TITLE: 'Notification settings',
    },
  },
  SIGNUP: {
    ADD_MAJOR_EMAIL: {
      CONFIRM_EMAIL: 'Confirm email',
      CONTINUE: 'CONTINUE',
      DESCRIPTION:
        'Hi {firstname}, to be able to use the[bold]faculty[/bold] again we need a [bold]not[/bold] university email and to know your major',
      EMAIL: 'Email',
      ERROR_ON_ALREADY_EXISTS: 'Your email address already exists',
      ERROR_ON_ALREADY_REGISTERED:
        'You have already registered the major email',
      ERROR_ON_FILLING_EMAIL: 'An error occurred while filling email',
      ERROR_ON_IS_UNIV_EMAIL: 'Your email address is the university email',
      MAJOR: 'Major',
      NOT_NOW: 'Logout',
      SUCCESS_MESSAGE:
        'Da ora la tua email con cui accedere a thefaculty sarà sempre {email}! Conferma la tua email e accedi nuovamente a thefaculty!',
      SUCCESS_TITLE: 'Grazie!',
      TITLE: 'Wait a moment',
    },
    CONFIRM_EMAIL_SCREEN: {
      CHANGE_EMAIL_MESSAGE1:
        "Se hai sbagliato ad inserire l'indirizzo email fai il logout e registrati nuovamente con l'indirizzo corretto",
      CHANGE_EMAIL_MESSAGE2:
        "Se hai sbagliato ad inserire l'indirizzo email universitario attendi qualche minuto e puoi reinserirlo di nuovo in questa sezione",
      CHANGE_EMAIL_POPUP: 'Cambia email',
      CHANGE_EMAIL_TITLE: 'Email errata?',
      CLOSE_BUTTON: 'ESCI',
      CLOSE_POPUP: 'Close',
      CLOSE_POPUP_TITLE: 'Stai riscontrando problemi?',
      DESCRIPTION:
        "Ti abbiamo inviato un'email all'indirizzo {EMAIL}. Clicca sul link per certificare la tua email. Se non trovi l'email potrebbe essere finita nella casella 'spam'.",
      DESCRIPTION1: "Ti abbiamo inviato un'email all'indirizzo",
      DESCRIPTION2:
        'Clicca sul link contenuto nell\'email per completare la registrazione\n\nSe non trovi l\'email, potrebbe essere finita nella cartella "spam" ',
      ERROR_RESENDING_CONFIRMATION_EMAIL:
        'An error occurred while resending confirmation email',
      GOING_TO_MAIN_SCREEN: 'Going to main screen ...',
      LOGOUT_POPUP: 'Logout',
      RESEND_BUTTON: 'Reinvia email',
      SUCCESS_RESENDING_CONFIRMATION_EMAIL:
        'Successfully sent the confirmation email',
      TITLE: 'Certificazione email',
    },
    FIFTH_SCREEN: {
      CONTINUE_BUTTON: 'CONTINUE',
      FIRST_CELL_TEXT: 'Enter and select the degree program closest to you',
      INPUT_MAJOR: 'Degree course',
      PAGE_TITLE: 'Degree course',
    },
    FOURTH_SCREEN: {
      CONTINUE_BUTTON: 'CONTINUE',
      ERROR_EMAIL_NOT_MATCH: "The two emails don't match",
      ERROR_EXISTS: 'Email already exists',
      ERROR_INVALID_EMAIL: 'Invalid email',
      ERROR_IS_UNIVERSITY_EMAIL: 'It is the university email',
      FIRST_CELL_TEXT1: 'Enter an email',
      FIRST_CELL_TEXT2: 'university',
      FIRST_CELL_TEXT_BOLD: ' not',
      INPUT_CONFIRM_EMAIL: 'Confirm email',
      INPUT_EMAIL: 'Email',
      PAGE_TITLE: 'Email',
    },
    SECOND_SCREEN: {
      CONTINUE_BUTTON: 'CONTINUE',
      INPUT_BIRTHDAY: 'Date of birth',
      INPUT_BIRTHPLACE: 'Place of birth',
      INPUT_FIRSTNAME: 'Name',
      INPUT_GENDER: 'Sex',
      INPUT_LASTNAME: 'Surname',
      PAGE_TITLE: 'Your data',
      GENDERS: {
        0: 'Man',
        1: 'Woman',
        2: 'Other',
      },
    },
    SIXTH_SCREEN: {
      CONTINUE_BUTTON: 'SIGNUP',
      FIRST_CELL_TEXT: 'You have selected this major:',
      PAGE_TITLE: 'Facolty',
      SECOND_CELL_TEXT: 'You will play in this faculty:',
      SHOW_ALL_FACULTIES_BUTTON: 'Show all faculties',
      SHOW_SUGGESTED_FACULTIES_BUTTON: 'Show suggested faculties',
    },
    STUDENT1: {
      ALREADY_EXIST: 'Your email is already registered',
      ALREADY_IN_PROGRESS: 'The verification is already in progress',
      COMPILE_ALL_FIELDS_FOR_STUDYTOWN:
        'Per poter inserire la città di studio devi inserire la tua email universitaria.',
      CONFIRM_EMAIL: 'Confirm university email',
      CONTINUE_BUTTON: 'CONTINUE',
      DESCRIPTION:
        'Per poter partecipare ai Concorsi presenti su the[bold]faculty[/bold] ci serve la tua email universitaria',
      DESCRIPTION_STUDENT:
        'Hai già effettuato la verifica di studente universitario. Se vuoi modificare la tua email universitaria o la città dove studi compila i campi qui sotto.',
      EMAIL: 'University email',
      FAILED_UPGRADE:
        'Failed to send to the confirmation request.\nPlease try again later',
      GRADUATION_YEAR: 'Graduation year expected',
      HAS_NO_EMAIL:
        "Are you an university student but you don't have an university email?",
      HAS_NO_EMAIL2: "Sono universitario ma non ho un'email universitaria",
      INVALID_CITY_INDEX: 'Si prega seleziona una città di studio',
      INVALID_CITY_NAME: 'Please select a study town',
      INVALID_EMAIL: 'Email is not valid',
      INVALID_GRADUATION_YEAR: 'Invalid graduation year',
      NOTMATCH_EMAIL: 'Confirm Email does not match to Email',
      NOT_NOW: 'Non ora',
      NOT_UNIVERSITY_EMAIL:
        'Your email is not recognized as an university email. Try with another email or contact us on assistenza@thefaculty.it if you think this is an university email.',
      OEVERLAY_DONE: 'Done',
      OEVERLAY_HEADER: 'Citta di studio',
      STUDY_TOWN: 'Study town',
      SUCCESS_UPGRADE_STUDENT_CARD:
        "Perfetto! La procedura di upgrade dell'account è quasi terminata: il tuo badge universitario è ora in revisione",
      SUCCESS_UPGRADE_STUDENT_EMAIL:
        "Perfetto! La procedura di upgrade dell'account è quasi terminata: ti basta confermare la tua email tramite il link che ti abbiamo inviato",
      TITLE: 'Studente Universitario',
    },
    STUDENT_CARD_PENDING: {
      CLOSE_BUTTON: 'Close',
      DESCRIPTION:
        'Stimao verificando i dati che ci hai fornito.\nRicevarai una notifica sullo stato della verifica il prima poissibile. Ci potrebbe volere ancora qualche giomo',
      TITLE: 'Card is pending',
    },
    STUDENT_CARD_VERIFY: {
      CAMERA_NOT_WORKING: 'Camera is not working',
      CARD: 'Tessernio o badge universitario',
      CARD_UPLOADED: 'Foto del tesserino caricata',
      DESCRIPTION:
        'Per poter partecipare ai Concorsi presenti su the[bold]faculty[/bold] ci serve avere la foto del tuo tesserino o badge universitario',
      ERROR_UPLOADING: 'An error occurred on uploading the picture!',
      GRADATION_YEAR: 'Anno di previsione della laurea',
      INVALID_CARD_URL: 'Card url is invalid!',
      INVALID_UNIVERSITY: 'Please select a university',
      SCAN_DESCRIPTION:
        "Posiziona il badge all'interno del riquadro.\nRicorda che devono essere ben visibili i tuoi dati affinché venga approvato.",
      SCAN_DESCRIPTION2:
        'Se non possiedi un badge puoi fare la foto ad un documento universitario valido con i tuoi dati ben visibili.',
      SEARCH_UNIVERSITY: 'Cerca la tua università',
      STUDY_CITY: 'Citta di studio',
      TAKE_PICTURE: 'Take picture',
      TITLE: 'Card verify',
      UNIVERSITY: 'Universita',
    },
    TERMS_AND_CONDITIONS: {
      ACCEPT_BUTTON: 'I AGREE',
      CONTINUE_BUTTON: 'CONTINUA',
      FIRST_CELL1:
        "I consent to the processing of my data for the purpose of the App's functioning",
      FIRST_CELL2_BOLD: 'faculty',
      FIRST_CELL3:
        'for participation in the Prize Contests and for the promotional initiatives of the Partners.',
      PAGE_TITLE: 'Terms and conditions',
      SECOND_CELL1: 'I declare that I have read and accepted the',
      SECOND_CELL1_LINK: 'Privacy Policy',
      THIRD_CELL1: 'I declare that I have read and accepted the',
      THIRD_CELL1_LINK: 'License terms',
      THIRD_CELL2: 'and the',
      THIRD_CELL2_LINK: 'Competition Rules',
    },
    THIRD_SCREEN: {
      CONTINUE_BUTTON: 'CONTINUE',
      INPUT_NICKNAME: 'Nickname',
      INPUT_PASSWORD: 'Password',
      LEGEND_1_CHECKED: '✓ 8 characters',
      LEGEND_1_UNCHECKED: '- 8 characters',
      LEGEND_2_CHECKED: '✓ a lowercase and uppercase letter',
      LEGEND_2_UNCHECKED: '- a lowercase and uppercase letter',
      LEGEND_3_CHECKED: '✓ a number',
      LEGEND_3_UNCHECKED: '- a number',
      LEGEND_DESCRIPTION: 'The password must contain at least:',
      PAGE_TITLE: 'Access and use',
    },
  },
  SIGNUPV2: {
    EMAILSIGNUP: {
      SIGNIN_LOADING: 'Accesso in corso...',
      TITLE: 'Registrazione',
      EMAIL_INPUT: {
        ALREADY_LINKED_EMAIL: 'Account già registrato',
        ALREADY_LINKED_EMAIL_DESC:
          'Questa mail è già associata a un account. Usala per accedere o recupera la password se non te la ricordi',
        ALREADY_LINKED_SOCIAL: 'Email già registrata',
        ALREADY_LINKED_SOCIAL_DESC:
          'L’email inserità è già stata usata per un accesso social. Vuoi continuare con il social login?',
        CONTINUE_BUTTON: 'CONTINUA',
        EMAIL: 'Email',
        ERROR_160100:
          "L'email inserita è una email universitaria. Per poter accedere a thefaculty è necessario usare il proprio indirizzo email personale.",
        ERROR_160101:
          "L'email utilizzata per l'accesso con Facebook è cambiata, prova ad utilizzare la tua email precedente per poter accedere di nuovo al tuo account, oppure contattaci su assistenza@thefaculty.it",
        ERROR_160103:
          'Esiste già un account associato a questa email. Recupera la password o accedi da un social per poter entrare su thefaculty.',
        ERROR_160104:
          'Esiste già un account associato a questa email. Recupera la password o accedi da un social per poter entrare su thefaculty.',
        ERROR_160105:
          'Non abbiamo ottenuto l’indirizzo email associata al tuo account Facebook, riprova condividendo la tua mail.',
        ERROR_160106:
          'L’email associata all’account Facebook non corrisponde alla email nei nostri server: registrati di nuovo.',
        ERROR_CHECKING_NICKNAME:
          'Si è verificato un errore imprevisto durante la verifica del nickname, riprova più tardi.',
        ERROR_CREATING_USER:
          'Qualcosa non ha funzionato nella registrazione. Se il problema persiste contattaci su assistenza@thefaulty.it',
        ERROR_GETTING_SIGNIN_METHOD:
          'Si è verificato un errore imprevisto. Se il problema persiste contattaci su assistenza@thefaculty.it',
        ERROR_UNKNOWN:
          'Si è verificato un errore imprevisto. Se il problema persiste contattaci su assistenza@thefaculty.it',
        LEGEND_1_CHECKED: '✓ 8 caratteri',
        LEGEND_1_UNCHECKED: '- 8 caratteri',
        LEGEND_2_CHECKED: '✓ una lettera maiuscola e minuscola',
        LEGEND_2_UNCHECKED: '- una lettera maiuscola e minuscola',
        LEGEND_3_CHECKED: '✓ un numero',
        LEGEND_3_UNCHECKED: '- un numero',
        LEGEND_DESCRIPTION: 'La password deve contenere almeno:',
        PASSWORD: 'Password',
        SUBTITLE: 'Email e password',
      },
      NAME_INPUT: {
        CONTINUE_BUTTON: 'CONTINUA',
        FIRST_NAME: 'Nome',
        LAST_NAME: 'Cognome',
        NICKNAME: 'Nickname',
        SUBTITLE: 'I tuoi dati',
      },
    },
    SOCIALSIGNUP: {
      ACCOUNT_ONLY_ON_DB_MESSAGE:
        'Hai già un account esistente con questa email. Ti chiediamo tuttavia di contattarci su assistenza@thefaculty.it per poter risolvere questo problema.',
      ERROR_IS_UNIVERSITY_EMAIL:
        "L'email inserita è una email universitaria. Per poter accedere a thefaculty è necessario usare il proprio indirizzo email personale.",
      ERROR_NEED_FB_EMAIL:
        "Per poter procedere con la registrazione tramite Facebook è necessario consentire l'accesso alla email.",
      ERROR_NICKNAME_TOO_LONG:
        'Il nickname può essere di massimo 13 caratteri.',
      ERROR_NICKNAME_WITHOUT_SPACES:
        'Il nickname non può contenere spazi, prova con un altro nickname per poter procedere.',
      ERROR_RETRY_A_NEW_SIGNUP:
        "Purtroppo qualcosa è andato storto durante la registrazione. Prova a riavviare l'app e registrati nuovamente. Se il problema persiste contattaci su assistenza@thefaculty.it",
      ERROR_SIGNING_IN_APPLE:
        "Si è verificato un problema durante l'accesso tramite Apple",
      ERROR_SIGNING_IN_FACEBOOK:
        "Si è verificato un problema durante l'accesso tramite Facebook",
      ERROR_SIGNING_IN_GOOGLE:
        "Si è verificato un problema durante l'accesso tramite Google",
      ERROR_SIGNING_IN_SOCIAL:
        "Si è verificato un problema durante l'accesso social",
      OTHER_PROVIDERS_MESSAGE:
        "L'email inserita è già usata per un accesso social. Vuoi continuare con il social login?",
      OTHER_PROVIDERS_TITLE: 'Accesso tramite social',
      PASSWORD_PROVIDER_MESSAGE:
        'Questa email è già associata ad un account. Usala per accedere oppure recupera la password se non te la ricordi.',
      PASSWORD_PROVIDER_TITLE: 'Email già esistente',
      TITLE: 'Registrazione',
      NAME_INPUT: {
        CONTINUE_BUTTON: 'CONTINUA',
        DESCRIPTION:
          'Nome e cognome verranno visualizzati solo dai tuoi amici.',
        FIRST_NAME: 'Nome',
        LAST_NAME: 'Cognome',
        NICKNAME: 'Nickname',
        SUBTITLE: 'I tuoi dati',
      },
    },
    TERMS_AND_CONDITION: {
      LEGAL_CHECK1_DESC:
        'Acconsento a ricevere messaggi pubblicitari, promozionali e di marketing da SmartCreative e dai Partner presenti in app.',
      LEGAL_CHECK2_DESC:
        'Acconsento alla raccolta di dati a fini di profilazione commerciale e ricerca statistica, ivi compresa la geolocalizzazione.',
      LEGAL_CHECK3_DESC1: 'Dichiaro di aver letto ed accettato le ',
      LEGAL_CHECK3_DESC2: 'e l’',
      LEGAL_CHECK3_DESC3: 'per l’utilizzo della App.',
      LEGAL_CHECK3_LINK1: ' Condizioni ',
      LEGAL_CHECK3_LINK2: 'di ',
      LEGAL_CHECK3_LINK3: 'Licenza',
      LEGAL_CHECK3_LINK4: 'Informativa ',
      LEGAL_CHECK3_LINK5: ' sulla ',
      LEGAL_CHECK3_LINK6: 'Privacy',
      SUBTITLE: 'Termini e condizioni',
    },
  },
  STATIC_IMAGES: {
    PROFILE_IMAGE_FEMALE:
      'Https://firebasestorage.googleapis.com/v0/b/thefaculty-a498a.appspot.com/o/static_images%2Fico_profile_female.png?alt=media&token=10b59cbd-d165-4d02-a58d-12d733be0c59',
    PROFILE_IMAGE_MALE:
      'Https://firebasestorage.googleapis.com/v0/b/thefaculty-a498a.appspot.com/o/static_images%2Fico_profile_male.png?alt=media&token=3a6157dc-9d73-45dc-9313-54f1fa61f7a7',
    PROFILE_IMAGE_OTHER:
      'Https://firebasestorage.googleapis.com/v0/b/thefaculty-a498a.appspot.com/o/static_images%2Fico_profile_other.png?alt=media&token=eedba3f3-9f59-42d3-95d8-5866bb689c41',
  },
  TEST: {
    DEFAULT_TOPIC: 'Argomento predefinito',
    ERROR_CLONE_NOT_AVAILABLE:
      'Hai ottenuto tutte le simulazioni\npossibili per questo test!',
    ERROR_SELEXI_SERVER:
      'Si è verificato un problema nei server di Selexi, riprova più tardi.',
    ERROR_SIMULATION_ALREADY_RUNNING:
      'Una simulazione è già in corso. Prima di poterne iniziare una nuova devi terminare quella attualmente in corso.',
    ERROR_STARTING_SIMULATION: 'Il codice scansionato non è valido.',
    ERROR_TEST_ALREADY_BOUGHT:
      'Hai già acquistato questa simulazione.\nSblocca le altre!',
    ERROR_TITLE: 'Oops!',
    ERROR_UNKNOWN: 'An unknown error occurred. Try again later.',
    ERROR_WHILE_GETTING_DATA:
      'An error occurred while getting data. Try again later.',
    ERROR_WHILE_SAVING_DATA: 'An error occurred while saving data.',
    HOME_BOX_TEXT:
      'Do you have to take an entrance test or practice a specific subject? Train here! ',
    HOME_BOX_TITLE: 'TEST',
    ACTIVE_INSTANCE: {
      BOX_SUBTITLE: 'una simulazione è attiva su desktop.',
      BOX_TITLE: 'Simulazione in corso',
      CONFIRM_BUTTON: 'CONFERMA',
      CONFIRM_DESC:
        'Sei sicuro di volere terminare la simulazione?\nSolo se la completi da desktop potrai \nvisualizzarne i risultati nell’app.',
      DESC_CONTENT:
        '[bold]Da desktop[/bold]\n\nSe termini la simulazione da desktop, potrai visualizzarne i risultati nella sezione ‘Risultati’ dell’app.\n\nPuoi chiudere l browser e riaprirlo in seguito, senza perdere i progressi della simulazione. Se il tuo browser non verrà riaperto entro tot. tempo, la simulazione sarà interrotta e i risultati non saranno consultabili.\n\n[bold]Dall’app di[/bold] the[bold]faculty[/bold]\n\nSe premi il pulsante ‘INTERROMPI’ in questa schermata, la simulazione su desktop sarà interrotta e potrai continuare ad usare l’app, ma nessun risultato verrà visualizzato.\n\nPuoi uscire dell’app durante la simulazione senza perderne i progressi. Ad un accesso successivo, potrai usare le funzioni dell’app normalmente.',
      DESC_CONTENT2:
        '[bold]Sei rimasto bloccato?[/bold] \n\nHai accidentalmente chiuso il browser senza aver premuto il pulsante "Chiudi la simulazione"?',
      DESC_TITLE: 'Interrompere la simulazione',
      ERROR_UNKNOWN: 'An unknown error occurred. Try again later.',
      ERROR_WHILE_GETTING_DATA:
        'An error occurred while getting data. Try again later.',
      NO_CONFIRM_BUTTON: 'NO, GRAZIE',
      TERMINATE_BUTTON: 'INTERROMPI',
      TERMINATE_SUCCESS: 'La simulazione è stata interrotta.',
      TITLE: 'Simulazione attiva',
    },
    ACTIVE_SIMULATION: {
      CAPTION: 'Simulazione attiva su desktop',
      STARTED_AT: 'Simulazione in corso iniziata il {START_DATE}',
    },
    ALLENAMENTO_HOME: {
      EMPTY_DESCRIPTION:
        'Hai bisogno di esercitarti su materie specifiche? \nStiamo sviluppando una nuova funzionalità per te!',
    },
    COURSE_OF_STUDY: {
      BOX_TITLE: 'A quale corso di studi vorresti accedere?',
      SEARCH_PLACEHOLDER: 'Inserisci il corso di studi',
      TITLE: 'Nuovo test',
    },
    ENDED_RESULT: {
      CLONE_INFO_TITLE:
        'Potrai consultare questi risultati nella sezione ‘Risultati’ della Palestra.',
      CORRECT_ANSWER_TITLE: 'rispose corrette',
      DETAIL_BUTTON: 'DETTAGLI',
      HOME_BUTTON: 'HOME',
      NON_ANSWER_TITLE: 'rispose non date',
      RANKING_UNIT: 'º',
      SUBTITLE:
        'Hai completato correttamente\nla simulazione, ecco i tuoi risultati:',
      TITLE: 'Simulazione completata',
      TOTAL_RESULT_TITLE: 'In totale hai realizzato',
      UNIT_POINT: 'Punti',
      WAYBACK_CUTOFF_COMPLIMENT:
        'riuscendo ad accedere al corso!\nComplimenti!',
      WAYBACK_CUTOFF_COMPLIMENT2:
        'saresti riuscito ad accedere al corso!\nComplimenti!',
      WAYBACK_CUTOFF_NOT_COMPLIMENT: 'e non saresti stato ammesso!',
      WAYBACK_CUTOFF_NOT_COMPLIMENT2: 'non saresti stato ammesso!',
      WAYBACK_RANKING_TITLE:
        'Se avessi sostenuto questo test,\nti saresti classificato: ',
      WAYBACK_RANKING_TITLE2: 'ti saresti classificato: ',
      WRONG_ANSWER_TITLE: 'risponse errate',
    },
    HOME: {
      SUB_TITLE_ALLENAMENTO: 'Allenamento',
      SUB_TITLE_RESULT: 'Risultati',
      SUB_TITLE_TEST: 'Test',
      TITLE: 'Test',
    },
    INSTANCE_DETAIL: {
      ANTEPRIMA_POPUP_TITLE: 'Anteprima domande',
      BOX_TITLE:
        'Mettiti alla prova con il test dello scorso anno, potrai scoprire come ti saresti classificato!',
      BOX_TITLE_2_4:
        'Mettiti alla prova con il test dello scorso anno, potrai scoprire come ti saresti classificato!',
      BOX_TITLE_3_2:
        'Ottieni una simulazione conforme al tuo test con domande certificate',
      BOX_TITLE_3_3:
        'Questo test ti permette di confrontarti con la prova dello scorso anno; una volta terminato, scoprirai se saresti passato',
      COINS_DESC_ENOUGH:
        'Confermi di voler spendere {COINS} gettoni per \nottenere la simulazione “{TEST_NAME}”?',
      COINS_DESC_FREE:
        'Confermi di voler creare gratuitamente la simulazione “{TEST_NAME}”?',
      COINS_DESC_NOT_ENOUGH:
        'Non hai abbastanza gettoni per procedere con \nl’operazione. Acquista subito nuovi gettoni!',
      CREATE_BUTTON: 'CREA',
      CREATE_CONFIRM: 'CONFERMA',
      CREATE_CONFIRM_CLOSE: 'NO, GRAZIE',
      DESC_CONTENT:
        'Il test consiste in domande a scelta multipla (5 alternative) con una sola risposta esatta. Le \nmaterie che compongono il test sono le seguenti:',
      DESC_TITLE: 'Descrizione',
      GOTO_STORE: 'VAI AL NEGOZIO',
      INFORMATION:
        'Questa simulazione coincide con quella ufficiale dell’anno indicato.',
      INFORMATION2: 'Domande certificate da ',
      QRCODE_NOT_VALID:
        'Questo codice QR non è corretto. Scansiona quello che trovi su simulatore.thefacultyapp.com',
      QRCODE_NOT_VALID_TITLE: 'Non ci siamo!',
      QUESTIONS_LABEL: 'domande',
      QUESTION_LABEL: 'domanda',
      SCORE_INFO_CLOSE_BUTTON: 'CHIUDI',
      SCORE_INFO_DESCRIPTION:
        'Le domande del blocco di materie selezionato sono valutate secondo i seguenti criterI:',
      SCORE_INFO_TEXT1:
        'Risposta corretta: [bold]{CORRECT_ANSWER}[/bold] punto',
      SCORE_INFO_TEXT2: 'Risposta errata: [bold]{WRONG_ANSWER}[/bold] punti',
      SCORE_INFO_TEXT3: 'Risposta non data: [bold]{NO_ANSWER}[/bold] punti',
      SELEXI_DESC:
        'Le domande che troverai in questa simulazione e la sua struttura ricalcano il più fedelmente possibile ciò che potrai trovare il giorno dell’esame. Le domande sono state verificate e validate da Selexi, società che opera nel settore da oltre 20 anni',
      TITLE: 'Nuovo test',
      VEDI_BUTTON: 'VEDI DOMANDE',
    },
    INSTANCE_INFO: {
      BOX_SUBDESC:
        'Dirigiti con il tuo pc all’indirizzo web mostrato e premi il pulsante “Continua” qui in basso. Scannerizza poi tramite app il codice QR mostrato sul desktop per iniziare il test.',
      BOX_SUBDESC2:
        "Apri il browser sul tuo computer e scansiona il codice QR che trovi all'indirizzo:",
      CONTINUE_BUTTON: 'CONTINUA',
      DESCRIPTION:
        'Il test consiste in domande a scelta multipla (5 alternative) con una sola risposta esatta. Le materie che compongono il test sono le seguenti:',
      INFO_DESC:
        'Questa simulazione coincide con quella ufficiale dell’anno indicato.',
      TITLE: 'Simulazione Desktop',
    },
    INSTANCE_MENU: {
      BOX_SUBTITLE: 'Scegli la simulazione',
      CREATE_BUTTON: 'Crea nuova simulazione',
      CREATE_NEW_BUTTON: 'Crea nuova simulazione',
      ITEM_GRATUITA: 'Gratuita',
      POINT: 'gettoni',
      PRICE_ZERO: 'Gratuita!',
      SIMULAZIONE: 'Simulazione 1',
      TITLE: 'Simulazione',
    },
    NEW_INSTANCE: {
      BOX_SUBTITLE: 'Scegli la simulazione',
      BOX_TITLE: 'Quale tipo di simulazione vuoi aggiungere?',
      ITEM_GRATUITA: 'Gratuita',
      NEW_SIMULAZIONE: 'Crea nuova simulazione',
      POINT: 'gettoni',
      PRICE_ZERO: 'Gratuita!',
      SIMULAZIONE: 'Crea simulazione casuale',
      TITLE: 'Nuovo test',
      TITLE_FIRST: 'Nuovo test',
      TITLE_NOT_FIRST: 'Nuova simulazione',
    },
    ONBOARD1: {
      TEXT: "Scegli il [bold]corso di studi[/bold] e l'[bold]università a cui vuoi accedere[/bold]: troverai i test certificati da Selexi, società leader nel settore. Così potrai allenarti con domande specifiche e passare il test d'ingresso!",
      TITLE: "[bold]Allenati per entrare nell'università dei tuoi sogni[/bold]",
    },
    ONBOARD2: {
      TEXT: 'Mettiti alla prova con i [bold]test degli anni passati[/bold] per vedere quale posto avresti avuto in graduatoria, oppure prova [bold]simulazioni nuove[/bold] con domande simili a quelle che troverai nel test!',
      TITLE:
        '[bold]Con il simulatore ti sembrerà proprio il giorno del test[/bold]',
    },
    RESULT_DETAIL: {
      CLOSE_BUTTON: 'CHIUDI',
      TITLE: 'Risultati simulazione',
      TOTAL_LABEL: 'Totale',
      UNIT_POINT: 'pt',
    },
    RESULT_HOME: {
      EMPTY_DESCRIPTION:
        'Non hai effettuato ancora \nsimulazioni o allenamenti.\nInizia subito un test!',
      FILTER_BUTTON_APPLY: 'APPLICA',
      FILTER_BUTTON_REMOVE: 'RIMUOVI FILTRI',
      FILTER_LABEL_DATE: 'Data',
      FILTER_LABEL_MAJOR: 'Corso di studi',
      FILTER_LABEL_TYPE: 'Tipologia',
      FILTER_TEXT: 'Filtri',
      FILTER_VALUE_DATE: 'Qualunque',
      FILTER_VALUE_MAJOR: 'Tutti',
      FILTER_VALUE_TYPE: 'Tutte',
      SIMULATION: 'Simulazione',
      TITLE: 'Risultati',
      FILTER_TYPES: {
        CLONE: 'Simulazioni',
        WAYBACK: 'Test',
      },
    },
    RESULT_QUESTION: {
      TITLE: 'Domanda n°{QUESTION_NUMBER}',
    },
    SELECT_UNIVERSITY: {
      BOX_TITLE: 'In quale università vorresti accedere?',
      ERROR_UNKNOWN: 'An unknown error occurred. Try again later.',
      ERROR_WHILE_GETTING_DATA:
        'An error occurred while getting data. Try again later.',
      SEARCH_PLACEHOLDER: 'Inserisci università',
      TITLE: 'Nuovo test',
    },
    TEST_SCREEN: {
      ALLENAMENTO: 'ALLENAMENTO',
      ALLENAMENTO_MESSAGE: 'Questa funzionalità sarà presto disponibile!',
      CREATE_NEW_BUTTON: 'Crea nuovo test',
      EMPTY_DESCRIPTION:
        'Non hai effettuato ancora simulazioni o allenamenti. Inizia subito un test!',
      RESULT: 'RISULTATI',
      SIMULATE: 'SIMULAZIONE',
      SUCCESS_CREATED: 'Test creato!',
      SUCCESS_CREATED_TEST: 'Nuovo test!',
    },
  },
  WALLET: {
    ERROR_UNKNOWN: 'An unknown error occurred. Try again later.',
    ERROR_WHILE_GETTING_DATA:
      'An error occurred while getting data. Try again later.',
    MAIN: {
      BUY: 'ACQUISTA',
      DESC_ON_EMPTY:
        'Non hai ancora ottenuto dei\ngettoni. Gioca alle sfide o\nacquistali qui',
      ERROR_GETTING_COINS_PACKETS:
        'An error occurred while getting coin packets. Try again later.',
      ERROR_GETTING_COINS_TRANSACTIONS:
        'An error occurred while getting coin transactions. Try again later.',
      ERROR_GETTING_PURCHASE_TRANSACTIONS:
        'An error occurred while getting purchase history. Try again later.',
      TITLE: 'Borsellino',
      ITEM: {
        DATE: 'Data',
        DESCRIPTION: 'Causale',
        FREE: 'gratis',
        QUANTITY: 'Quantità',
      },
    },
    SHOP: {
      COINS_TAB_TITLE: 'Gettoni',
      HISTORY_TAB_TITLE: 'Storico',
      TITLE: 'Negozio',
      CANNOT_BUY_PRODUCT: {
        MESSAGE:
          'Questo pacchetto non è al momento acquistabile, riprova più tardi.',
        TITLE: 'Attenzione',
      },
      SUCCESSFULL_TRANSACTION: {
        MESSAGE:
          "L'acquisto è stato completato con successo! Riceverai una email con il riepilogo del tuo acquisto appena effettuato.",
        TITLE: 'Grazie!',
      },
      TRANSACTION_ERROR: {
        MESSAGE:
          "Purtroppo l'acquisto non è andato a buon fine, contattaci su assistenza@thefaculty.it.",
        TITLE: 'Attenzione',
      },
    },
    SHOP_COINS: {
      DESC: 'Quale pacchetto gettoni vuoi acquistare?',
    },
    SHOP_HISTORY: {
      DESC_ON_EMPTY:
        'Non hai ancora acquistato dei\ngettoni in app. Qui vedrai le tue\nfuture transazioni.',
      GET_COINS: 'OTTIENI GETTONI',
      RECENT_FIRST: 'Dal più recente',
      ITEM: {
        DATE: 'Data',
        PACKET_NAME: 'Acquisto',
        PRICE: 'Prezzo',
      },
    },
  },
};
