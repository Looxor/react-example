const strings = {
  APP_NAME: 'thefaculty',
  LOADING: 'Caricamento',
  LOADING_DATA: 'Caricamento dati...',
  LOGIN_LABEL: 'ACCEDI',
  SIGNUP_LABEL: 'REGISTRATI',
  WELCOME_TO_LOGIN: 'Benvenuto!',
  SECTIONS: {
    HOME: 'Home',
    BESTOF: 'Sfide',
    CONTEST: 'Concorso',
    FRIENDS: 'Amici',
    MENU: 'Menù',
    TEST: 'Test',
    COUPONS: 'Coupons',
  },
  LOGIN: {
    LOGIN_TITLE: 'Accedi',
    NO_ACCOUNT: 'Non hai un account?',
    SIGNUP_LABEL: 'Registrati',
    LOGIN_BUTTON_TEXT: 'ACCEDI',
    EMAIL_PLACEHOLDER: 'Email',
    PASSWORD_PLACEHOLDER: 'Password',
    REMEMBER_PASSWORD: 'Non ti ricordi più la password?',
  },
  RESET_PASSWORD: {
    RESET_PASSWORD_TITLE: 'Recupera password',
    DESCRIPTION_TEXT:
      "Inserisci l'email personale usata in fase di registrazione, ti invieremo le istruzioni per il ripristino della tua password",
    EMAIL_PLACEHOLDER: 'Email',
    SEND_BUTTON_TEXT: 'RECUPERA PASSWORD',
  },
  BESTOF: {
    HOME_BOX_TITLE: 'SFIDE',
    HOME_BOX_TEXT:
      'Inizia una nuova sfida, accumula gettoni e ottieni subito gli sconti!',
    HOME_SCREEN: {
      FIRST_MESSAGE:
        'Completa una sfida per accumlare 20 gettoni.\nUna volta accumlati i gettoni, potral utilizzarli per sbloccare gli sconti',
    },
    HOME_SCREEN_POINTS: 'gettoni',
    HOME_SCREEN_POINTS_CAPTION: 'gettoni',
    HOME_SCREEN_BUTTON_TEXT: 'CLASSIFICA',
    HOME_SCREEN_PARTNERS_TEXT: 'Gioca alle sfide e sblocca gli sconti:',
    HOME_SCREEN_ONGOING_TEXT: 'Sfide in corso',
    HOME_SCREEN_NEW_BATTLE_TEXT: 'Nuova sfida',
    HOME_SCREEN_NEW_BATTLE_STATUS: '{NUM2} vite di {NUM1}.',
    HOME_SCREEN_NEW_BATTLE_STATUS_MINS: 'prossima vita tra {NUM1}m e {NUM2}s',
    HOME_SCREEN_NEW_BATTLE_STATUS_ALL: 'hai tutte le vite',
    FIRST_SCREEN_FRIEND_TEXT: 'Sfida un amico',
    FIRST_SCREEN_RANDOM_TEXT: 'Sfida avversario casuale',
    FRIEND_LIST_SCREEN_TEXT: 'Scegli chi vuoi sfidare',
    YOU: 'Tu',
    OPPONENT: 'Avversario',
    YOUR_TURN: 'È il tuo turno!',
    OPPONENT_TURN: "È il turno dell'avversario!",
    STATUS: {
      PLAYED_WITH: 'Hai giocato contro {NAME}',
      PLAYING_WITH: 'Stai giocando contro {NAME}',
      SEARCHING: "In cerca dell'avversario...",
      PLAYING_MATCHES: 'Partite in corso',
      TERMINATED_MATCHES: 'Partite terminate',
    },
    ONGOING_SCREEN: {
      WIN: 'Sfide vinte',
      LOST: 'Sfide perse',
    },
    BATTLE_SCREEN: {
      TITLE: 'Sfida',
      ROUND_CAPTION: 'Round {NUM1} di {NUM2}',
      PLAY_BUTTON: 'GIOCA',
      REJECT_BUTTON: 'Abbandona sfida',
      MOVE_TO_HISTORY_BUTTON: 'SPOSTA IN STORIA',
      DESCRIPTION: 'È il tuo turno, gioca ora!',
      ITS_MY_TURN: 'È il tuo turno, gioca ora!',
      ITS_OPPONENT_TURN:
        "È il turno dell'avversario. Attendi che l'avversario finisca di giocare.",
      ERROR_WHILE_GETTING_INFO: 'Si è verificato un problema di connessione. Riprova più tardi.',
      ERROR_WHILE_STARTING: "Si è verificato un problema durante l'avvio della partita. Riprova più tardi.",
      RESULT_MESSAGE1_LOST: 'Che peccato, hai perso!',
      RESULT_MESSAGE1_WON: 'Complimenti! Hai vinto!',
      RESULT_MESSAGE2: 'Hai accumulato {NUM1} gettoni!',
    },
    HISTORY: {
      TITLE: 'Storico sfide',
      EMPTY_DESC: 'Sposta le sfide terminate in storico per ritrovarle qui',
    },
    WON_LOST: {
      WON: 'Hai vinto {NUM1} a {NUM2}',
      LOST: 'Hai perso {NUM1} a {NUM2}',
      PAREGED: 'Hai pareggiato',
      WON_DEFAULT: 'Hai vinto a tavolino',
      LOST_DEFAULT: 'Hai perso a tavolino',
    },
  },
  FRIENDS: {
    FRIENDS_LABEL: 'Amici',
    SEARCH_FRIEND_PLACEHOLDER: 'Cerca un amico',
    NEW_PENDING_REQUESTS: 'Nuove richieste di amicizia',
    YOUR_FRIENDS_LABEL: 'I tuoi amici',
    USER_DETAILS: {
      PROFILE_TITLE: 'Profilo',
      STUDYTOWN_DESCRIPTION: 'Città di studio: ',
      FRIENDS_LABEL: 'Amici',
      SCORES_LABEL: 'Punti',
      SCOREBOARD_LABEL: 'in classifica',
      NOT_IN_SCOREBOARD_LABEL: 'Non in classifica',
      START_TEXT_1: 'Inizia una',
      START_TEXT_2: 'nuova sfida',
      WON_BESTOFS: 'Sfide won',
      LOST_BESTOFS: 'Sfide lost',
      ADD_FRIEND_BUTTON: 'AGGIUNGI AGLI AMICI',
      REMOVE_FRIEND_BUTTON: 'RIMUOVI DAGLI AMICI',
      ACCEPT_REQUEST_BUTTON: 'ACCETTA RICHIESTA',
    },
    PENDING_REQUESTS: {
      PENDING_REQUESTS_TITLE: 'Richieste di amicizia',
      NO_PENDING_FRIENDSHIP_REQUESTS: 'Nessuna nuova richiesta',
      BUTTON_ACCEPT: 'ACCETTA',
      BUTTON_REJECT: 'RIFIUTA',
    },
  },
  MENU: {
    UPDATE_PROFILE_IMAGE: {
      DEFAULT_TITLE: 'Immagine',
      PREVIEW_TITLE: 'Anteprima',
    },
  },
  COUPONS: {
    QRCODE: 'QR code',
    BARCODE: 'Barcode',
    COPY: 'COPIA',
    OPEN: 'APRI',
    GENERATE_COUPON: 'BRUCIA SCONTO',
    COUPONS_PAGE_TITLE: 'Coupons',
    AVAILABLE_COUPONS_ONE: 'sconto disponibile',
    AVAILABLE_COUPONS_MORE: 'sconti disponibili',
    USED_COUPONS: 'Coupons ottenuti',
    HOME: {
      POINT_CAPTION: 'Gettoni',
      POINT_CAPTION_FREE: ' GRATIS',
      DESC1: 'Sono disponibili {NUM} sconti',
      DESC2: 'Ne hai già generati {NUM}',
      VALIDATE_UNTIL: 'Valido fino al ',
      LOCK_DESCRIPTION1: 'Certifica che sei uno studente universitario inserendo la tua email istituzionale o la foto del tuo badge',
      LOCK_DESCRIPTION2: 'Potrai spendere i tuoi gettoni per ottenere sconti e vantaggi esclusivi',
      LOCK_AUTH_BUTTON: 'CERTIFICA',
    },
    COUPON_SCREEN: {
      CONDITION_BUTTON: "Condizioni d'uso",
      REDEEM_BUTTON: 'GENERA SCONTO',
      REDEEMING_TEXT: 'Generazione sconto in corso...',
      ERROR_WHILE_REDEEM:
        "Si è verificato un problema durante la generazione dello Sconto. Verifica tutte le condizioni d'uso oppure se il problema persiste contattaci su assistenza@thefaculty.it",
    },
    CONDITIONS_SCREEN: {
      TITLE: "Condizioni d'uso",
    },
    INVALID_REASONS: {
      ALREADY_USED: 'Hai già generato questo sconto in precendenza.',
      EXCLUDE_USED:
        'Hai già generato uno sconto simile a questo in precendenza.\nNon puoi ottenere questo sconto.',
      PREVIOUS_COUPON_USED: 'Hai già generato questo sconto in precendenza.',
      ANY_LEFT: 'Questi sconti sono esauriti.\nTorna presto per altri sconti!',
      IS_ACTIVE: 'Questo sconto è disponibile a partire dal {start_date}.',
      COINS_REQUIREMENT:
        'Non hai abbastanza gettoni per poter generare questo sconto.',
      MCFIT_TRIAL_DAY_DONE:
        'Per sbloccare questo sconto vai in una palestra McFIT, fai la giornata di prova e scannerizza dalla sezione Codice promozionale il codice QR di thefaculty che troverai in palestra!',
      ESSELUNGA_VERIFIED_CUSTOMER:
        "Per sbloccare questo sconto devi avere associato la Carta Fìdaty da Menù dell'App.",
      OTHER: 'Al momento questo sconto non è generabile.',
    },
    VIEW: {
      BARCODE_DESC:
        'Clicca sul QR per ingrandirlo. Problemi con il QR? Inserisci questo:',
      QRCODE_DESC:
        'Clicca sul barcode per ingrandirlo. Problemi con il barcode? Inserisci questo:',
      NOTHING_DESC_ESSE: `Complimenti! Lo sconto di 5€ è stato caricato correttamente sulla tua
      Carta Fìdaty. Recati in negozio e lo sconto verrà automaticamente
      applicato dalla cassa al passaggio della Carta Fìdaty e al
      superamento della soglia prevista. Lo sconto non è valido per le
      spese effettuate online.`,
      NOTHING_DESC_MCFIT: `Lo sconto è stato sbloccato!\nMostra questa schermata al trainer per attivare l'abbonamento al prezzo agevolato.`,
      TEXT_DESC: 'Il tuo codice sconto è',
      LINK_DESC:
        'Prizes il tasto APRI o COPIA il link nel tuo browser per aprire subito il tuo conto personale!',
      LINK_POPUP_TITLE: 'Link copiato',
      LINK_POPUP_MESSAGE:
        'Il link dello Sconto è stato copiato, incollalo nel tuo browser per approfittare dello sconto.',
      TIMEOUT_DESC_COUNTING: 'Lo sconto è stato generato!',
      TIMEOUT_DESC_COMPLETED:
        'Complimenti! Il tuo sconto è stato utilizzato correttamente!',
      TIMEOUT_POPUP_MESSAGE1: 'Ti trovi presso questo negozio?',
      TIMEOUT_POPUP_MESSAGE1_DEFAULT: 'Ti trovi presso {PARTNER_NAME}?',
      TIMEOUT_POPUP_MESSAGE2: 'Mostra questa schermata ad un addetto!',
      TIMEOUT_POPUP_MESSAGE2_M:
        'Sarà lui a premere OK per poter abilitare lo sconto.',
    },

    HISTORY_SCREEN: {
      TITLE: 'Coupons ottenuti',
      VALID_FROM_TO: 'Valido dal {NUM1} al {NUM2}',
      EXPIRED_COUPON: 'Questo sconto è scaduto il {NUM2}',
    },
  },
  SETTINGS: {
    TITLE: 'Impostazioni',
    HOME: {
      PROFILE: 'Profilo',
      UPGRADE_TO_STUDENT_ACCOUNT: 'Accreditati come studente',
      EDIT_FACULTY: 'Modifica la tua facoltà',
      EDIT_SUBJECT: 'Modifica le tue materie',
      CARTA_FIDATY: 'Carta Fìdaty | Esselunga',
      SETTINGS: 'Impostazioni account',
      FACULTY_INFORMATION: 'Informazioni su the[bold]faculty[/bold]',
      QUESTIONS_QUALITY: 'Qualità quesiti | Selexi',
      SOCIAL_POPUP: 'I nostri social',
      STORE_PAGES: "Valuta l'App",
      THEFACULTY_PARTNER: 'Partner di the[bold]faculty[/bold]',
      TOS: 'Termini e condizioni',
      PRIAVACY_POLICY: 'Informativa sulla privacy',
      SUPPORT: 'Hai bisogno di aiuto?',
      FAQ: 'Domande frequenti',
      EMAIL_SUPPORT: "Contatta l'assistenza",
      EMAIL_SUPPORT_SUBJECT: 'Assistenza - thefaculty: [NICKNAME]',
      EMAIL_SUPPORT_BODY:
        '\n\n----------\n[USER_ID]\nDate: [DATETIME]\nNickname: [NICKNAME]\nName: [NAME]\n----------\n\n',
      LOGOUT: 'Esci',
      NEED_HELP: 'Hai bisogno di aiuto?',
      EMAIL_CLIENT_NO_EXITS:
        "Per contattare l'assistenza scrivici una mail ad assistenza@thefaculty.it",

      SOCIAL_POPUP_TITLE: 'Social',
      SOCIAL_POPUP_WEBSITE: 'thefacultyapp.com',
      SOCIAL_POPUP_CANCEL: 'Indietro',
    },
    EDIT_FACULTY: {
      TITLE: 'Modifica facoltà',
      YOUR_FACULTY: 'La tua facoltà è ',
      ALL_FACULTIES: 'Tutte le facoltà',
      BUTTON_TITLE: 'MODIFICA FACOLTÀ',
      ERROR_WHILE_UPDATING_FACULTY:
        'Si è verificato un problema durante la modifica della tua facoltà. Riprova più tardi.',
      SUCCESS_TO_UPDATING_FACULTY:
        'Complimenti, hai modificato la tua facoltà con successo!',
    },
    EDIT_SUBJECT_WEIGHT: {
      NO_DATA: 'Nessuna materia presente al momento',
      TITLE: 'Materie',
      YOUR_FACULTY: 'La tua facoltà è ',
      SPECIFY_SUBJECTS_FOR_YOUR_FACULTY: 'Materie specifiche della tua facoltà',
      OTHER_SUBJECTS_PLAYING_WITH: 'Altre materie con cui stai giocando',
      BUTTON1: 'Ripristina valori',
      BUTTON2: 'MODIFICA I PESI',
      EMPTY_SUCCESS:
        'Le materie con cui vuoi giocare sono state ripristinate con successo!',
      EMPTY_ERROR:
        'Si è verificato un problema durante il ripristino delle materie con cui vuoi giocare. Riprova più tardi.',
    },
    EDIT_SUBJECT_WEIGHT2: {
      TITLE: 'Peso materie',
      DESCRIPTION: `Scegli quanto spesso vuoi giocare con ciascure di queste materie nelle sezioni [bold]Sfide[/bold] e [bold]Concorsi[/bold]`,
      CONTINUE: 'CONTINUA',
    },
    EDIT_SUBJECT_WEIGHT3: {
      TITLE: 'Scelta materie',
      DESCRIPTION: `Scegli altre materie con cui vuoi giocare. Potrai modificare la tua scelta in qualsiasi momento.`,
      CONTINUE: 'CONTINUA',
      LOAD_MORE_SUBJECTS: 'Mostra tutte le materie',
      LOAD_SUGGESTED_SUBJECTS: 'Mostra materie consigliate',
      SUCCESS:
        'Le materie con cui vuoi giocare sono state modificate con successo!',
      ERROR:
        'Si è verificato un problema durante il ripristino delle materie con cui vuoi giocare. Riprova più tardi.',
    },
    SETTINGS_HOME: {
      TITLE: 'Impostazioni',
      NOTIFICATION_SETTINGS: 'Impostazioni notifiche',
      CHANGE_PASSWORD: 'Modifica password',
      DELETE_ACCOUNT: 'Elimina account',
      STUDY_AT: 'Città di studio: ',
    },
    SETTINGS_NOTIFICATION: {
      TITLE: 'Impostazioni notifiche',
      DESCRIPTION:
        'Scegli quanto vuoi rimanere aggiornato su quello che accade in App',
      CAPTION1:
        "Livello minimo:\nNotizie importanti come la vincta di un premio o l'approvazione di un documento",
      CAPTION2: 'Livello base:\nNotizie importanti e notifiche sugli amici',
      CAPTION3:
        "Livello massimo\nTutte le notifiche di gioco o l'inserimento di un nuovo premio",
      SET_LEVEL_ERROR:
        'Si è verificato un problema durante la modifica del livello di notifica. Riprova più tardi.',
    },
    CHANGE_PASSWORD: {
      TITLE: 'Modifica password',
      DESCRIPTION: 'Vuoi impostare una\nnuova password?',
      OLD_PASSWORD: 'Inserisci la vecchia password',
      NEW_PASSWORD: 'Inserisci la nuova password',
      LEGEND_DESCRIPTION: 'La password deve contenere almeno:',
      LEGEND_1_UNCHECKED: '- 8 caratteri',
      LEGEND_2_UNCHECKED: '- una lettera minuscola e maiuscola',
      LEGEND_3_UNCHECKED: '- un numero',
      LEGEND_1_CHECKED: '✓ 8 caratteri',
      LEGEND_2_CHECKED: '✓ una lettera minuscola e maiuscola',
      LEGEND_3_CHECKED: '✓ un numero',
      CHANGE_BUTTON: 'MODIFICA PASSWORD',
      SUCCESS_CHANGE_PASSWORD: 'Hai modificato correttamente la password!',
      ERROR_WRONG_PASSWORD: 'La password non è valida.',
      ERROR_UNKNOWN:
        'Si è verificato un problema durante la modifica del livello di notifica. Riprova più tardi.',
    },
    DELETE_ACCOUNT: {
      TITLE: 'Elimina account',
      CONFIRM_MESSAGE:
        'Ci dispiace che tu voglia lasciarci. Sei davvero sicuro di voler procedere?',
      CONFIRM_DESC: 'Perchè vuoi lasciare thefaculty?',
      CONFIRM_BUTTON: 'CONFERMA',
      REMAIN_BUTTON: 'Rimani su thefaculty',
      ERROR_ON_LOGGING_OUT:
        "Si è verificato un problema durante il logout automatico. Ti chiediamo di eseguire manualmente il logout dall'App.",
      ERROR_ON_DELETE:
        "Si è verificato un problema durante la cancellazione del tuo account. Riprova più tardi, se il problema persiste contatta l'Assistenza tramite assistenza@thefaculty.it",
      ERROR_UNKNOWN:
        "Si è verificato un problema sconosciuto. Riprova più tardi, se il problema persiste contatta l'Assistenza tramite assistenza@thefaculty.it",
    },
    DELETE_ACCOUNT_AFTER: {
      DESCRIPTION:
        'Il tuo profilo e stato cancellato. Torna a trovarci presto! Sarai sempre il benvenuto!',
      CLOSE_BUTTON: 'CHIUDI',
    },
    QUESTIONS_QUALITY: {
      TITLE: 'Selexi',
      ERROR_ON_GETTING_DATA:
        'Si è verificato un problema di connessione. Riprova più tardi.',
    },
    PARTNERS: {
      TITLE: 'Partner',
      ERROR_ON_GETTING_DATA:
        'Si è verificato un problema di connessione. Riprova più tardi.',
    },
    FAQ: {
      TITLE: 'FAQ',
      PAGE_TITLE: 'Domande frequenti',
    },
    CARTA_FIDATY: {
      TITLE: 'Esselunga',
      TITLE2: 'Carta Fidaty - Esselunga',
      DESC_NOT_VERIFIED:
        "Per riscattare gli sconti e i premi offerti da Esselunga sull'App thefaculty avrai bisogno della tua Carta Fìdaty.\n\nAssocia ora la tua Carta Fìdaty",
      DESC_VERIFIED:
        'Hai già associato una Carta Fìdaty. È possibile modificare una Carta Fìdaty per smarrimento o furto, sostituzione della Carta per deterioramento o passaggio ad altra tipologia di Carta Fìdaty',
      BARCODE_PLACEHOLDER: 'Codice Carta Fìdaty',
      DONT_HAVE_CARD: 'Non hai ancora una Carta Fìdaty?',
      HOW_TO_REQUEST: 'Scopri come richiederla',
      DISCOVER_CARD: 'Scopri la Carta Fìdaty',
      NOT_NOW: 'Non ora',
      DONE: 'FATTO',
      SHOULD_BE_13: 'Il codice dovrebbe contenere 13 caratteri!',
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
      TITLE_BARCODE: 'Scansiona barcode',
      TITLE_QRODE: 'Scansiona QR code',
      READ_SUCCESS: 'Codice barcode letto con successo!',
      READ_FAILED: 'Codice barcode non letto',
    },
  },
  CONTEST: {
    HOME_SCREEN: {
      FIRST_MESSAGE:
        'Accumula i punti rispondendo correttamente alle domande. I primi classificati vinceranno i premi in palio!',
    },
    HOME_BOX_TITLE: 'CONCORSO',
    HOME_BOX_TEXT: 'Vinci ogni settimana fantastici premi dai nostri Partner!',
    SCOREBOARD_BUTTON_TEXT: 'CLASSIFICA',
    SCORES_LABEL: 'Punti',
    PRIZES_LABEL: 'PREMI',
    CONTEST_JACKPOT: 'Montepremi totale di',
    FROM_LABEL: 'Dal',
    TO_LABEL: 'al',
    UP_FOR_GRABS: 'in palio',
    PLAY_NOW: 'Gioca ora',
    THREE_CONTESTS: 'partite di 3',
    CONTESTS_24_HOUR: ', si rigenerano ogni 24 ore',
    CONTEST_SCOREBOARD: {
      MENU_CANCEL: 'Chiudi',
      DEFAULT_TITLE: 'Classifica Concorso',
      FRIENDS_SCOREBOARD: 'Classifica Amici',
      OLD_SCOREBOARD: 'Classifica Concorso Precedente',
      GENERAL_SCOREBOARD: 'Classifica Generale',
      ACTUAL_SCOREBOARD: 'Classifica Concorso Attuale',
      FACULTY_FILTER: 'Filtro Facoltà',
      SELECT_A_FACULTY: 'Seleziona una facoltà',
      SCORES: 'punti',
      LOGGED_USER_POSITION: 'classificato',
      ME_LABEL: 'Io',
    },
    FIRST_SCREEN: {
      FIRST_CELL_TEXT: 'Preparati, la partita sta per iniziare!',
    },
    RESULT_SCREEN: {
      PAGE_TITLE: "Risultati",
      FIRST_CELL_TEXT: "Posizione in classifica",
      SECOND_CELL_TEXT: "{NUM1} di {NUM2} risposte esatte",
      SHARE_MESSAGE: "Sto giocando a thefaculty! Scaricala anche tu ora gratuitamente: thefacultyapp.com",
      BTN_CLOSE: "CHIUDI"
    },
    RECAP_SCREEN: {
      PAGE_TITLE: 'Dettagli partita',
      FIRST_CELL_TEXT: 'Risultato partita',
      SCORES_LABEL: 'punti',
    },
  },
  REFERRAL_CODE: {
    REFERRAL_CODE: 'Codice Promozionale',
    HOME_BOX_TITLE: 'CODICE PROMO',
    HOME_BOX_TEXT:
      'Hai trovato un codice promozionale o un QR code thefaculty? Utilizzalo e ricevi la tua ricompensa',
    PAGE_BOX_TEXT: 'Scansiona un Codice Promozionale e scopri cosa contiene',
    SCAN_BUTTON_TEXT: 'Scansiona il QR Code',
    OR_LABEL: 'oppure',
    USE_NOW_BUTTON: 'USA ORA',
    INSERT_NEW_REFERRAL_CODE: 'Inserisci il codice promozionale',
    NO_USED_CODES: 'Nessun codice promozionale\nutilizzato fino ad ora.',
    REFERRAL_CODE_BOX_LABEL: 'Codice ',
    WHEN_USED: 'Usato il ',
    ALERT_ESSELUNGA:
      'Oops! Per poter utilizzare un Codice Promozionale di Esselunga devi prima associare la tua Carta Fìdaty!',
    SCAN_QRCODE_TITLE: 'Scansiona QR code',
  },
  TEST: {
    HOME_BOX_TITLE: 'TEST',
    HOME_BOX_TEXT:
      'Devi affrontare un test di ingresso o esercitarti su una materia specifica? Allenati qui!',
  },
  MONTHS: {
    1: 'gennaio',
    2: 'febbraio',
    3: 'marzo',
    4: 'aprile',
    5: 'maggio',
    6: 'giugno',
    7: 'luglio',
    8: 'agosto',
    9: 'settembre',
    10: 'ottobre',
    11: 'novembre',
    12: 'dicembre',
  },
  SIGNUP: {
    TERMS_AND_CONDITIONS: {
      PAGE_TITLE: 'Termini e condizioni',
      FIRST_CELL1:
        "Acconsento al trattamento dei miei dati per finalità di funzionamento dell'App the",
      FIRST_CELL2_BOLD: 'faculty ',
      FIRST_CELL3:
        'per la partecipazione ai Concorsi a premi e per le iniziative promozionali dei Partner.',
      SECOND_CELL1: 'Dichiaro di aver letto ed accettato la ',
      SECOND_CELL1_LINK: 'Privacy Policy',
      THIRD_CELL1: 'Dichiaro di aver letto ed accettato le',
      THIRD_CELL1_LINK: 'Condizioni di licenza',
      THIRD_CELL2: 'e il ',
      THIRD_CELL2_LINK: 'Regolamento del Concorso',
      ACCEPT_BUTTON: 'ACCETTO',
    },
    SECOND_SCREEN: {
      PAGE_TITLE: 'I tuoi dati',
      INPUT_FIRSTNAME: 'Nome',
      INPUT_LASTNAME: 'Cognome',
      INPUT_GENDER: 'Sesso',
      INPUT_BIRTHDAY: 'Data di nascita',
      INPUT_BIRTHPLACE: 'Luogo di nascita',
      CONTINUE_BUTTON: 'CONTINUA',
      GENDERS: ['Uomo', 'Donna', 'Altro'],
    },
    THIRD_SCREEN: {
      PAGE_TITLE: 'Accesso e utilizzo',
      INPUT_NICKNAME: 'Nickname',
      INPUT_PASSWORD: 'Password',
      LEGEND_DESCRIPTION: 'La password deve contenere almeno:',
      LEGEND_1_UNCHECKED: '- 8 caratteri',
      LEGEND_2_UNCHECKED: '- una lettera minuscola e maiuscola',
      LEGEND_3_UNCHECKED: '- un numero',
      LEGEND_1_CHECKED: '✓ 8 caratteri',
      LEGEND_2_CHECKED: '✓ una lettera minuscola e maiuscola',
      LEGEND_3_CHECKED: '✓ un numero',
      CONTINUE_BUTTON: 'CONTINUA',
    },
    FOURTH_SCREEN: {
      PAGE_TITLE: 'Email',
      FIRST_CELL_TEXT1: 'Inserisci una mail ',
      FIRST_CELL_TEXT_BOLD: 'non',
      FIRST_CELL_TEXT2: 'universitaria',
      INPUT_EMAIL: 'Email',
      INPUT_CONFIRM_EMAIL: 'Confirm email',
      CONTINUE_BUTTON: 'CONTINUE',
      ERROR_INVALID_EMAIL: 'Email non valida',
      ERROR_EMAIL_NOT_MATCH: 'Le due email non coincidono',
      ERROR_EXISTS: 'Email già esistente',
      ERROR_IS_UNIVERSITY_EMAIL: 'It is the university email',
    },
    FIFTH_SCREEN: {
      PAGE_TITLE: 'Corso di laurea',
      FIRST_CELL_TEXT:
        'Inserisci e seleziona il corso di laurea a te più affine',
      INPUT_MAJOR: 'Corso di laurea',
      CONTINUE_BUTTON: 'CONTINUE',
    },
    SIXTH_SCREEN: {
      PAGE_TITLE: 'Facoltà',
      FIRST_CELL_TEXT: 'Hai selezionato il corso di studio',
      SECOND_CELL_TEXT: 'Giocherai nella facoltà di',
      SHOW_ALL_FACULTIES_BUTTON: 'Mostra tutte le facoltà',
      SHOW_SUGGESTED_FACULTIES_BUTTON: 'Mostra facoltà consigliate',
      CONTINUE_BUTTON: 'REGISTRATI',
    },
    STUDENT1: {
      TITLE: 'Studente Universitario',
      DESCRIPTION:
        'Per poter partecipare ai Concorsi presenti su the[bold]faculty[/bold] ci serve la tua email universitaria',
      EMAIL: 'Email universitaria',
      CONFIRM_EMAIL: 'Conferma email universitaria',
      HAS_NO_EMAIL:
        "Sei uno studente universitario ma non hai una email universitaria? Clicca qui",
      GRADUATION_YEAR: 'Anno previsto di laurea',
      STUDY_TOWN: 'Città di studio',
      NOT_NOW: 'Non ora',
      CONTINUE_BUTTON: 'CONTINUA',
      OEVERLAY_HEADER: 'Citta di studio',
      OEVERLAY_DONE: 'Fine',
      INVALID_EMAIL: 'Si prega di inserire una email universitaria valida per poter procedere',
      NOTMATCH_EMAIL: 'Le due email non corrispondono',
      INVALID_GRADUATION_YEAR: 'Anno di laurea non valido',
      INVALID_CITY_INDEX: 'Si prega seleziona una città di studio',
      INVALID_CITY_NAME: 'Si prega seleziona una città di studio',
      ALREADY_EXIST: 'L\'email inserita è già presente',
      NOT_UNIVERSITY_EMAIL: `La tua email non è riconosciuta tra gli indirizzi email abilitati. Prova con un altro indirizzo email oppure contattaci su assistenza@thefaculty.it se pensi che il tuo indirizzo sia valido`,
      SUCCESS_UPGRADE_STUDENT_EMAIL: 'Perfetto! La procedura di upgrade dell\'account è quasi terminata: ti basta confermare la tua email tramite il link che ti abbiamo inviato',
      SUCCESS_UPGRADE_STUDENT_CARD: 'Perfetto! La procedura di upgrade dell\'account è quasi terminata: il tuo badge universitario è ora in revisione',
      FAILED_UPGRADE: 'Non siamo riusciti a mandarti l\'email di conferma.\nRiprova più tardi',
      ALREADY_IN_PROGRESS: 'La verifica della tua email è già in corso. Se hai sbagliato qualche dato attendi qualche minuto e torna in questa sezione per procedere con una nuova verifica',
    },
    STUDENT_CARD_VERIFY: {
      TITLE: 'Studente Universitario',
      DESCRIPTION:
        'Per poter partecipare ai Concorsi presenti su the[bold]faculty[/bold] ci serve avere la foto del tuo tesserino o badge universitario',
      CARD: 'Tesserino o badge universitario',
      CARD_UPLOADED: 'Foto del tesserino caricata',
      UNIVERSITY: 'Università',
      GRADATION_YEAR: 'Anno di previsione della laurea',
      STUDY_CITY: 'Città di studio',
      TAKE_PICTURE: 'SCATTA',
      CAMERA_NOT_WORKING: 'La fotocamera non sta funzionando',
      INVALID_CARD_URL: 'Immagine non caricata, ti chiediamo di procedere con una nuova verifica',
      ERROR_UPLOADING: 'Immagine non caricata, ti chiediamo di procedere con una nuova verifica',
      INVALID_UNIVERSITY: 'Devi selezionare un\'università per poter procedere',
    },
    STUDENT_CARD_PENDING: {
      TITLE: 'Badge in revisione',
      DESCRIPTION:
          'Stiamo verificando i dati che ci hai fornito.\nRiceverai una notifica sullo stato della verifica il prima possibile. Ci potrebbe volere ancora qualche giorno',
      CLOSE_BUTTON: 'CHIUDI',
    },
    CONFIRM_EMAIL_SCREEN: {
      TITLE: 'Certificazione email',
      DESCRIPTION1: 'Ti abbiamo inviato un\'email all\'indirizzo che ci hai fornito.',
      DESCRIPTION2: `Clicca sul link contenuto nell\'email per completare la registrazione.\n\nSe non trovi l'email, potrebbe essere finita nella cartella "spam" oppure, se stai riscontrando problemi, contattaci tramite assistenza@thefaculty.it`,
      RESEND_BUTTON: 'Reinvia email',
      CLOSE_BUTTON: 'ESCI',
      ERROR_RESENDING_CONFIRMATION_EMAIL: 'Non siamo riusciti ad inviarti una nuova email di verifica. Riprova più tardi',
      SUCCESS_RESENDING_CONFIRMATION_EMAIL: 'Email reinviata con successo!',
      CLOSE_POPUP_TITLE: 'Stai riscontrando problemi?',
      CHANGE_EMAIL_POPUP: 'Cambia email',
      LOGOUT_POPUP: 'Logout',
      CLOSE_POPUP: 'Chiudi',
      CHANGE_EMAIL_TITLE: 'Email errata?',
      CHANGE_EMAIL_MESSAGE1: `Se hai sbagliato ad inserire l'indirizzo email fai il logout e registrati nuovamente con l'indirizzo corretto`,
      CHANGE_EMAIL_MESSAGE2: `Se hai sbagliato ad inserire l'indirizzo email universitario attendi qualche minuto e puoi reinserirlo di nuovo in questa sezione`,
      GOING_TO_MAIN_SCREEN: 'Caricamento...',
    }
  },
  ALERTS: {
    ERRORS: {
      STANDARD: {
        OOPS: 'Oops!',
        WARNING: 'Attenzione',
        ERROR: 'Errore',
        UNEXPECTED_ERROR: 'Si è verificato un errore imprevisto',
        SOMETHING_WENT_WRONG: 'Qualcosa è andato storto',
        SOMETHING_WENT_WRONG_CONNECTION:
          'Qualcosa non ha funzionato, verifica la connessione e riprova più tardi',
        SERVER_CONNECTION:
          "Errore nella connessione al server. Verifica la tua connessione, se il problema persiste contatta l'assistenza",
        FILL_ALL_FIELDS_TO_PROCEED:
          'Devi compilare tutti i campi per poter procedere',
      },
      SIGNUP: {
        TITLE: 'Oops!',
        ERROR_NICKNAME_EXISTS: 'Il nickname è già in uso',
        EMAIL_IN_USE:
          "Esiste già un account con questa email, prova ad accedere oppure contatta l'Assistenza su assistenza@thefaculty.it",
        EMAIL_INVLID: "L'indirizzo email non è valido",
        WEAK_PASSWORD: 'La password non è abbastanza sicura',
        OPERATION_NOT_ALLOWED:
          "C'è qualcosa che non va, contatta l'Assistenza su assistenza@thefaculty.it",
        OTHER_MESSAGES:
          'Qualcosa è andato storto durante il login, riprova più tardi. Se il problema persiste, contattaci a assistenza@thefaculty.it',
        TITLE_SUCCESS: 'Cogratulazioni!',
        CREATION_SUCCESS: 'Il tuo account è stato creato correttamente!',
        ERROR_FIRSTNAME_MIN_LENGTH:
          'Il nome deve avere almeno 3 caratteri, se è corretto contattaci su assistenza@thefaculty.it',
        ERROR_LASTNAME_MIN_LENGTH:
          'Il cognome deve avere almeno 3 caratteri, se è corretto contattaci su assistenza@thefaculty.it',
      },
      LOGIN: {
        TITLE: 'Oops!',
        WRONG_EMAIL_OR_PASSWORD:
          'Verifica di aver inserito correttamente la tua email o la password e riprova!',
        USER_DISABLED:
          "L'indirizzo email inserito corrisponde ad un account disabilitato, si prega di contattare l'Assistenza su assistenza@thefaculty.it.",
        TOO_MANY_REQUEST:
          'Stai tentando di accedere troppe volte a questo account. Riprova più tardi. Se il problema persiste contattaci su assistenza@thefaculty.it.',
        NETWORK_REQUEST_FAILED:
          'Si è verificato un problema di connessione. Riprova più tardi. Se il problema persiste contattaci su assistenza@thefaculty.it.',
        OTHER_MESSAGES:
          "Qualcosa è andato storto durante l'accesso. Riprova più tardi. Se il problema persiste contattaci su assistenza@thefaculty.it.",
        EMAIL_NOT_VERIFIED: 'Email non ancora verificata.',
      },
      RESET_PASSWORD: {
        EMAIL_NOT_SENT: {
          TITLE: 'Oops!',
          MESSAGE:
            "Qualcosa è andato storto nell'invio della mail di ripristino. Verifica l'indirizzo email inserito e riprova!",
        },
      },
      REFERRAL_CODE: {
        TITLE_GENERIC: 'Oops!',
        TITLE_ESSELUNGA: 'Carta Fìdaty richiesta!',
        REFERRAL_CODE_EMPTY:
          'Inserisci un Codice Promozionale nel box oppure scansiona il QR code per scoprire cosa contiene',
        INVALID_REFERRAL_CODE: 'Il Codice Promozionale inserito non è valido',
        NO_MORE_AVAILABLE: 'Il Codice Promozionale inserito non è più valido',
        NOT_A_VERIFIED_ESSELUNGA_CUSTOMER:
          'Per poter riscattare questo codice devi essere possessore di una Carta Fìdaty. Se la possiedi puoi inserirla in impostazioni e tornare in questa schermata per riscattare il buono sconto.',
        EXPIRED_REFERRAL_CODE: 'Questo Codice Promozionale è scaduto',
        USER_HAS_NOT_PLAYED_A_CONTEST_GAME:
          'Devi aver giocato almeno una partita nel Concorso per usare questo codice! Torna più tardi!',
        ALREADY_USED:
          'Hai già utilizzato questo Codice Promozionale in precedenza, se ne possiedi un altro riprova',
      },
      MENU: {
        UPDATE_PROFILE_IMAGE: {
          TITLE: 'Oops!',
          MESSAGE:
            'Non è stato possibile modificare la tua immagine di profilo. Riprova più tardi.',
        },
        PROFILE_IMAGE_PICKER: {
          TITLE: 'Oops',
          MESSAGE:
            "Non è stato possibile selezionare l'immagine, controlla di avere abilitato i permessi alla fotocamere tramite Impostazioni del tuo dispositivo.",
        },
      },
    },
    RESET_PASSWORD: {
      EMAIL_SENT: {
        TITLE: 'Email inviata!',
        MESSAGE:
          'Ti abbiamo inviato una mail di recupero password, segui le istruzioni riportate nella email per poter accedere nuovamente a thefaculty!',
      },
    },
    CONTEST: {
      NO_CONTESTS_AVAILABLE: {
        TITLE: 'Nessuna partita disponibile',
        MESSAGE:
          'Per oggi hai esaurito le partite a disposizione, ma torna domani per giocare di nuovo!',
      },
      ERROR_WHILE_STARTING: {
        TITLE: 'Oops!',
        MESSAGE: "Si è verificato un problema durante l'inizio della partita.",
      },
      ERROR_WHILE_TESTING: {
        TITLE: 'Oops!',
        MESSAGE: "Si è verificato un problema durante l'invio della risposta.",
      },
      ERROR_WHILE_FINISHING: {
        TITLE: 'Oops!',
        MESSAGE:
          'Si è verificato un problema con la chiusura della partita. Se il problema persiste contattaci su assistenza@thefaculty.it.',
      },
      ERROR_WHILE_GETTING_AD: {
        TITLE: 'Oops!',
        MESSAGE:
          'Si è verificato un errore nel caricamento della pubblicità. Riprova più tardi.',
      },
      ERROR_WHILE_GETTING_USER_POSITION: {
        TITLE: 'Oops!',
        MESSAGE:
          'Si è verificato un problema durante il caricamento della posizione. Riprova più tardi.',
      },
    },
    BESTOF: {
      ERROR_WHILE_STARTING: {
        TITLE: 'Oops!',
        MESSAGE: 'Si è verificato un problema.\nRiprova più tardi.',
      },
    },
    CONTEST_SCOREBOARD: {
      TITLE: 'Opps!',
      ERROR_WHILE_GETTING:
        'Si è verificato un errore durante il caricamento della Classifica. Riprova più tardi.',
      ERROR_WHILE_GETTING_AD:
        'Si è verificato un errore nel caricamento della pubblicità.',
    },
    FRIENDS: {
      FRIEND_ADDED: {
        SUCCESS: {
          TITLE: 'Amico Aggiunto!',
          MESSAGE: 'Hai aggiunto questo utente ai tuo amici!',
        },
        FAIL: {
          TITLE: 'Oops',
          MESSAGE:
            "Qualcosa è andato storto nella rimozione dell'amico. Riprova più tardi.",
        },
      },
      FRIEND_REMOVED: {
        SUCCESS: {
          TITLE: 'Amico Rimosso',
          MESSAGE: 'Hai rimosso questo utente dai tuo amici!',
        },
        FAIL: {
          TITLE: 'Oops',
          MESSAGE:
            "Qualcosa è andato storto nella rimozione dell'amico. Riprova più tardi.",
        },
      },
      RESPOND_TO_REQUEST_FAILED: {
        TITLE: 'Oops',
        MESSAGE:
          "Qualcosa è andato storto nella risposta dell'amicizia. Riprova più tardi.",
      },
    },
    REFERRAL_CODE: {
      SUCCESS_TO_INSERT: {
        TITLE: 'Fantastico!',
        MESSAGE: 'Il Codice Promozionale inserito è valido!',
        MESSAGE_WITH_TITLE: 'Il Codice Promozionale inserito è valido: ',
      },
    },
    LOGOUT: {
      LOGOUT: 'Logout',
      LOGOUT_REQUESTED: {
        TITLE: 'Sei sicuro?',
        MESSAGE: 'Stai per uscire da thefaculty, sei sicuro?',
      },
      LOGOUT_SUCCESSFULL: {
        TITLE: 'Logout',
        MESSAGE: 'Logout effettuato con successo.',
      },
    },
  },
  STATIC_IMAGES: {
    PROFILE_IMAGE_MALE:
      'https://firebasestorage.googleapis.com/v0/b/thefaculty-a498a.appspot.com/o/static_images%2Fico_profile_male.png?alt=media&token=3a6157dc-9d73-45dc-9313-54f1fa61f7a7',
    PROFILE_IMAGE_FEMALE:
      'https://firebasestorage.googleapis.com/v0/b/thefaculty-a498a.appspot.com/o/static_images%2Fico_profile_female.png?alt=media&token=10b59cbd-d165-4d02-a58d-12d733be0c59',
    PROFILE_IMAGE_OTHER:
      'https://firebasestorage.googleapis.com/v0/b/thefaculty-a498a.appspot.com/o/static_images%2Fico_profile_other.png?alt=media&token=eedba3f3-9f59-42d3-95d8-5866bb689c41',
  },
  OTHER: {
    YES: 'Si',
    NO: 'No',
    OK: 'OK',
    CANCEL: 'Annulla',
    DONE: 'Fine',
    SELECT: 'Seleziona',
    LOADING: 'Caricamento',
    SAVE: 'Salva',
    EDIT: 'Modifica',
    SELECT_IMAGE: 'Seleziona immagine',
    TAKE_IMAGE: 'Scatta una foto',
    SELECT_IMAGE_FROM_LIBRARY: 'Seleziona dalla libreria',
    ERROR_CONNECTING_SERVER: 'Si è verificato un errore nella connessione al server, riprova più tardi',
  },
};

export default strings;
