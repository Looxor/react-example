export default {
  APP_NAME: "thefaculty",
  LOADING: "Caricamento",
  LOADING_DATA: "Caricamento dati...",
  LOGIN_LABEL: "ENTRA",
  LOGIN_LABEL_LOWER: "Entra",
  NEEDS_TO_UPDATE: "Aggiornamento necessario! Vai allo store per installare l'ultima versione di thefaculty: ti aspettano tante novità!",
  SIGNUP_LABEL: "REGISTRATI",
  WELCOME_TO_LOGIN: "Benvenuto!",
  ALERTS: {
    BESTOF: {
      ERROR_WHILE_STARTING: {
        MESSAGE: "Si è verificato un problema.\nRiprova più tardi.",
        TITLE: "Oops!"
      }
    },
    CONTEST: {
      CONTEST_NOT_AVAILABLE: {
        MESSAGE: "Il Concorso non è più disponibile",
        TITLE: "Concorso non disponibile"
      },
      ERROR_WHILE_FINISHING: {
        MESSAGE: "Si è verificato un problema con la chiusura della partita. Se il problema persiste contattaci su assistenza@thefaculty.it.",
        TITLE: "Oops!"
      },
      ERROR_WHILE_GETTING_AD: {
        MESSAGE: "Si è verificato un errore nel caricamento della pubblicità. Riprova più tardi.",
        TITLE: "Oops!"
      },
      ERROR_WHILE_GETTING_USER_POSITION: {
        MESSAGE: "Si è verificato un problema durante il caricamento della posizione. Riprova più tardi.",
        TITLE: "Oops!"
      },
      ERROR_WHILE_STARTING: {
        MESSAGE: "Si è verificato un problema durante l'inizio della partita",
        MESSAGE_WITH_RETRY: "Purtroppo qualcosa non ha funzionato durante l'inizio della partita. Vuoi riprovare?",
        TITLE: "Oops!"
      },
      ERROR_WHILE_TESTING: {
        MESSAGE: "Si è verificato un problema durante l'invio della risposta.",
        TITLE: "Oops!"
      },
      NO_CONTESTS_AVAILABLE: {
        MESSAGE: "Per oggi hai esaurito le partite a disposizione, ma torna domani per giocare di nuovo!",
        TITLE: "Nessuna partita disponibile"
      }
    },
    CONTEST_SCOREBOARD: {
      ERROR_WHILE_GETTING: "Si è verificato un errore durante il caricamento della Classifica. Riprova più tardi.",
      ERROR_WHILE_GETTING_AD: "Si è verificato un errore nel caricamento della pubblicità.",
      TITLE: "Opps!"
    },
    ERRORS: {
      LOGIN: {
        ACCOUNT_IS_DISABLED_BUTTON: "Riattiva account",
        ACCOUNT_IS_DISABLED_MESSAGE: "Siamo felici che tu voglia tornare nel mondo di thefaculty! Tuttavia l'account collegato a questo indirizzo email è stato eliminato in precedenza, dunque per creare un nuovo profilo devi utilizzare un altro indirizzo email.\nSe hai bisogno di aiuto scrivici una email ad assistenza@thefaculty.it",
        ACCOUNT_IS_DISABLED_TITLE: "Attenzione",
        EMAIL_NOT_VERIFIED: "Email non ancora verificata.",
        IS_UNIVERSITY_EMAIL: "L'indirizzo email inserito è un indirizzo email universitario. Per poter accedere a thefaculty occorre inserire la tua email personale.",
        NETWORK_REQUEST_FAILED: "Si è verificato un problema di connessione. Riprova più tardi. Se il problema persiste contattaci su assistenza@thefaculty.it.",
        OTHER_MESSAGES: "Qualcosa è andato storto durante l'accesso. Riprova più tardi. Se il problema persiste contattaci su assistenza@thefaculty.it.",
        TITLE: "Oops!",
        TOO_MANY_REQUEST: "Stai tentando di accedere troppe volte a questo account. Riprova più tardi. Se il problema persiste contattaci su assistenza@thefaculty.it.",
        TOO_MANY_UNSUCCESSFUL_LOGIN: "Stai facendo troppi tentativi. Riprova più tardi.",
        USER_DISABLED: "Siamo felici che tu voglia tornare nel mondo di thefaculty! Tuttavia l'account collegato a questo indirizzo email è stato eliminato in precedenza, dunque per creare un nuovo profilo devi utilizzare un altro indirizzo email.\nSe hai bisogno di aiuto scrivici una email ad assistenza@thefaculty.it",
        WRONG_EMAIL_OR_PASSWORD: "Verifica di aver inserito correttamente la tua email o la password e riprova!"
      },
      MENU: {
        PROFILE_IMAGE_PICKER: {
          MESSAGE: "Non è stato possibile selezionare l'immagine: controlla di avere abilitato i permessi alla fotocamere nelle Impostazioni del tuo dispositivo e riprova.",
          TITLE: "Oops"
        },
        UPDATE_PROFILE_IMAGE: {
          MESSAGE: "Non è possibile modificare l'immagine di profilo. Riprova più tardi.",
          TITLE: "Oops!"
        }
      },
      REFERRAL_CODE: {
        ALREADY_USED: "Hai già usato questo codice promozionale! Riprova con un'altro.",
        ERROR_ON_APPLY_REFERRAL_CODE: "Non siamo riusciti a validare il codice promozionale inserito. Verifica il codice e riprova, se il problema persiste contattaci su assistenza@thefaculty.it",
        EXPIRED_REFERRAL_CODE: "Questo codice promozionale è scaduto",
        GO_TO_TEST_SECTION_BUTTON: "Vai alla sezione test",
        INVALID_REFERRAL_CODE: "Questo codice promozionale non è valido",
        IS_A_SIMULATION_CODE: "Per avviare la simulazione scansiona questo codice QR dalla sezione Test",
        NOT_A_VERIFIED_ESSELUNGA_CUSTOMER: "Per poter riscattare questo codice devi essere possessore di una Carta Fìdaty. Puoi inserirla in Impostazioni.",
        NO_MORE_AVAILABLE: "Il codice promozionale inserito non è più valido. Se ne possiedi un altro prova ad utilizzare il codice nuovo.",
        REFERRAL_CODE_EMPTY: "Inserisci un codice promozionale nel box oppure scansiona il codice QR per scoprire cosa contiene",
        TITLE_ESSELUNGA: "Carta Fìdaty richiesta!",
        TITLE_GENERIC: "Oops!",
        TITLE_WRONG_PLACE: "Posto sbagliato!",
        USER_HAS_NOT_PLAYED_A_CONTEST_GAME: "Devi aver giocato almeno una partita nel Concorso per usare questo codice! Torna più tardi!"
      },
      RESET_PASSWORD: {
        EMAIL_NOT_SENT: {
          MESSAGE: "Qualcosa è andato storto nell'invio della email di ripristino. Verifica i dati inseriti e riprova!",
          TITLE: "Oops!",
          NOT_EMAIL_PROVIDER: {
            MESSAGE: "Questa email è collegata ad un accesso social. Usa {PROVIDERS} per accedere di nuovo al tuo account.",
            OTHER_SOCIAL: "l'accesso social collegato a questa email",
            TITLE: "Oops!"
          },
          NOT_VALID_USER: {
            MESSAGE: "Non è stato trovato nessun account, verifica i dati inseriti e riprova.",
            TITLE: "Oops!"
          },
          NOT_VERIFIED: {
            MESSAGE: "Prima di poter ripristinare la password è necessario confermare l'email.",
            TITLE: "Oops!"
          },
          OTHER: {
            MESSAGE: "Qualcosa è andato storto nell'invio della email di ripristino. Verifica i dati inseriti e riprova!",
            TITLE: "Oops!"
          },
          RESET_IN_PROGRESS: {
            MESSAGE: "È già stata inviata una email di ripristino precedentemente. Verifica la tua casella email oppure controlla anche in spam, se non è arrivata nessuna email contattaci su assistenza@thefaculty.it",
            TITLE: "Oops!"
          }
        }
      },
      SIGNUP: {
        CREATION_SUCCESS: "Il tuo account è stato creato correttamente! Ti abbiamo inviato una mail di conferma all'indirizzo che ci hai fornito.",
        EMAIL_INVLID: "L'indirizzo email non è valido",
        EMAIL_IN_USE: "Esiste già un account con questa email, prova ad accedere oppure contatta l'Assistenza su assistenza@thefaculty.it",
        ERROR_FIRSTNAME_MIN_LENGTH: "Il nome deve avere almeno 3 caratteri, se è corretto contattaci su assistenza@thefaculty.it",
        ERROR_LASTNAME_MIN_LENGTH: "Il cognome deve avere almeno 3 caratteri, se è corretto contattaci su assistenza@thefaculty.it",
        ERROR_NICKNAME_EXISTS: "Il nickname è già in uso",
        OPERATION_NOT_ALLOWED: "C'è qualcosa che non va, contatta l'Assistenza su assistenza@thefaculty.it",
        OTHER_MESSAGES: "C'è qualcosa che non ha funzionato, riprova più tardi oppure contatta l'Assistenza su assistenza@thefaculty.it",
        TITLE: "Oops!",
        TITLE_SUCCESS: "Cogratulazioni!",
        UNIVERSITY_EMAIL: "Per procedere devi inserire una email non universitaria",
        WEAK_PASSWORD: "La password non è abbastanza sicura"
      },
      STANDARD: {
        ERROR: "Errore",
        FILL_ALL_FIELDS_TO_PROCEED: "Devi compilare tutti i campi per poter procedere",
        OOPS: "Oops!",
        SERVER_CONNECTION: "Errore nella connessione al server. Verifica la tua connessione, se il problema persiste contatta l'assistenza",
        SOMETHING_WENT_WRONG: "Qualcosa è andato storto",
        SOMETHING_WENT_WRONG_CONNECTION: "Qualcosa non ha funzionato, verifica la connessione e riprova più tardi",
        UNEXPECTED_ERROR: "Si è verificato un errore imprevisto",
        WARNING: "Attenzione"
      }
    },
    FRIENDS: {
      FRIEND_ADDED: {
        FAIL: {
          MESSAGE: "Hai già inviato la richiesta di amicizia a questo amico oppure qualcosa è andato storto nell'aggiunta",
          TITLE: "Oops"
        },
        SUCCESS: {
          MESSAGE: "Attendi la conferma da parte del tuo amico!",
          TITLE: "Richiesta inviata!"
        }
      },
      FRIEND_REMOVED: {
        FAIL: {
          MESSAGE: "Qualcosa è andato storto nella rimozione dell'amico, riprova più tardi",
          TITLE: "Oops"
        },
        SUCCESS: {
          MESSAGE: "Non lo vedrai più nella tua lista amici.",
          TITLE: "Amico Rimosso"
        }
      },
      RESPOND_TO_REQUEST_FAILED: {
        MESSAGE: "Qualcosa è andato storto nella risposta alla richiesta di amicizia, riprova più tardi",
        TITLE: "Oops!"
      }
    },
    LOGOUT: {
      LOGOUT: "Logout",
      LOGOUT_REQUESTED: {
        MESSAGE: "Stai per effettuare il logout da thefaculty, sei davvero sicuro\ndi voler procedere?",
        TITLE: "Sei sicuro?"
      },
      LOGOUT_SUCCESSFULL: {
        MESSAGE: "Logout effettuato con successo.",
        TITLE: "Logout"
      }
    },
    REFERRAL_CODE: {
      SUCCESS_TO_INSERT: {
        MESSAGE: "Il codice promozionale è valido!",
        MESSAGE_WITH_TITLE: "Il codice promozionale è valido!\n",
        TITLE: "Fantastico!"
      }
    },
    RESET_PASSWORD: {
      EMAIL_SENT: {
        MESSAGE: "Ti abbiamo inviato una email all'indirizzo {EMAIL}: segui le istruzioni riportate nella email per ripristinare la password. Ti aspettiamo!",
        TITLE: "Email di ripristino inviata!"
      }
    }
  },
  BESTOF: {
    FIRST_SCREEN_FRIEND_TEXT: "Sfida un amico",
    FIRST_SCREEN_RANDOM_TEXT: "Sfida avversario casuale",
    FRIEND_LIST_SCREEN_TEXT: "Scegli chi vuoi sfidare",
    HOME_BOX_TEXT: "Inizia una nuova sfida, accumula gettoni e ottieni subito gli sconti!",
    HOME_BOX_TITLE: "SFIDE",
    HOME_SCREEN_BUTTON_TEXT: "CLASSIFICA",
    HOME_SCREEN_NEW_BATTLE_STATUS: "{NUM2} vite di {NUM1}.",
    HOME_SCREEN_NEW_BATTLE_STATUS_ALL: "hai tutte le vite",
    HOME_SCREEN_NEW_BATTLE_STATUS_MINS: "prossima vita tra {NUM1}m e {NUM2}s",
    HOME_SCREEN_NEW_BATTLE_TEXT: "Nuova sfida",
    HOME_SCREEN_ONGOING_TEXT: "Sfide in corso",
    HOME_SCREEN_PARTNERS_TEXT: "Gioca alle sfide e sblocca gli sconti:",
    HOME_SCREEN_POINTS: "gettoni",
    HOME_SCREEN_POINTS_CAPTION: "gettoni",
    NO_FRIENDS_AVAILABLE: "Nessun amico presente, vai su Amici e cerca un amico della tua facoltà per poterlo sfidare.",
    OPPONENT: "Avversario",
    OPPONENT_TURN: "È il turno dell'avversario!",
    YOU: "Tu",
    YOUR_TURN: "Ora tocca a te!",
    BATTLE_SCREEN: {
      DESCRIPTION: "È il tuo turno, gioca ora!",
      ERROR_WHILE_GETTING_INFO: "Si è verificato un problema di connessione. Riprova più tardi.",
      ERROR_WHILE_STARTING: "Si è verificato un problema durante l'avvio della partita. Riprova più tardi.",
      ITS_MY_TURN: "È il tuo turno, gioca ora!",
      ITS_OPPONENT_TURN: "È il turno dell'avversario: aspetta che finisca di giocare.",
      MOVE_TO_HISTORY_BUTTON: "SPOSTA IN STORIA",
      PLAY_BUTTON: "GIOCA",
      REJECT_BUTTON: "Abbandona sfida",
      RESULT_MESSAGE1_ABSTAINED: "Ti sei astenuto!",
      RESULT_MESSAGE1_LOST: "Che peccato, hai perso!",
      RESULT_MESSAGE1_WON: "Complimenti! Hai vinto!",
      RESULT_MESSAGE2: "Hai ottenuto {NUM1} gettoni!",
      ROUND_CAPTION: "Round {NUM1} di {NUM2}",
      TITLE: "Sfida"
    },
    HISTORY: {
      EMPTY_DESC: "Sposta le sfide terminate in storico\nper ritrovarle qui",
      TITLE: "Storico sfide"
    },
    HOME_SCREEN: {
      FIRST_MESSAGE: "Completa una sfida per accumulare 20 gettoni.\nUna volta accumulati i gettoni, potrai utilizzarli per sbloccare gli sconti"
    },
    ONGOING_SCREEN: {
      LOST: "Sfide perse",
      WIN: "Sfide vinte"
    },
    STATUS: {
      PLAYED_WITH: "Hai giocato contro {NAME}",
      PLAYING_MATCHES: "Partite in corso",
      PLAYING_WITH: "Stai giocando contro {NAME}",
      SEARCHING: "In cerca dell'avversario...",
      TERMINATED_MATCHES: "Partite terminate"
    },
    WON_LOST: {
      LOST: "Hai perso {NUM1} a {NUM2}",
      LOST_DEFAULT: "Hai perso a tavolino",
      PAREGED: "Hai pareggiato",
      WON: "Hai vinto {NUM1} a {NUM2}",
      WON_DEFAULT: "Hai vinto a tavolino"
    }
  },
  CAROUSEL_PAGE: {
    ERROR_NEED_TO_BE_STUDENT_MESSAGE: "Devi essere studente universitario per poter accedere a questa sezione.",
    ERROR_NEED_TO_BE_STUDENT_TITLE: "Verifica studente richiesta"
  },
  CONTEST: {
    HOME_SCREEN: {
      FIRST_MESSAGE: "Accumula i punti rispondendo correttamente alle domande. I primi classificati vinceranno i premi in palio!"
    },
    YOUR_PRIZES: {
      OVERLAY_CONGRAT_TEXT: "Complimenti! Hai vinto il Concorso!",
      OVERLAY_INSTRUCT_TEXT: "Riscatta subito i premi vinti!"
    }
  },
  COUPONS: {
    AVAILABLE_COUPONS_MORE: "sconti disponibili",
    AVAILABLE_COUPONS_ONE: "sconto disponibile",
    BARCODE: "Codice a barre",
    COPY: "COPIA",
    COUPONS_PAGE_TITLE: "Coupons",
    GENERATE_COUPON: "BRUCIA SCONTO",
    OPEN: "APRI",
    QRCODE: "Codice QR",
    USED_COUPONS: "Coupons ottenuti",
    CONDITIONS_SCREEN: {
      TITLE: "Condizioni d'uso"
    },
    COUPON_SCREEN: {
      CONDITION_BUTTON: "Terms of use",
      CONDITION_LABEL: "Termini e condizioni",
      DISCOUNT_USED: "Sconto utilizzato",
      ERROR_ON_MARKING_UNUSED: "An error occurred while marking as unused",
      ERROR_ON_MARKING_USED: "An error occurred while marking as used",
      ERROR_WHILE_REDEEM: "Si è verificato un problema durante la generazione dello Sconto. Verifica tutte le condizioni d'uso oppure se il problema persiste contattaci su assistenza@thefaculty.it",
      MARK_UNUSED: "Ripristina",
      QUESTION_USED_COUPONS: "Hai utilizzato lo sconto?",
      QUESTION_USED_COUPONS_DESC: "Confermi di averlo appena utilizzato con il nostro partner?",
      REDEEMING_TEXT: "Generazione sconto in corso...",
      REDEEM_BUTTON: "SBLOCCA SCONTO",
      REQUIREMENTS_LABEL: "Requisiti",
      TO_UNLOCK_LABEL: "Per sbloccare servono",
      VALID_FROM_TO: "Valido dal {START_DATE} al {FINISH_DATE}"
    },
    HISTORY_SCREEN: {
      EXPIRED_COUPON: "Questo sconto è scaduto il {NUM2}",
      TITLE: "Coupons ottenuti",
      VALID_FROM_TO: "Valido dal {NUM1} al {NUM2}"
    },
    HOME: {
      COUPONS_NOT_AVAILABLE: "Gli sconti attualmente non sono disponibili.\nRitorna più tardi.",
      DESC1: "Sono disponibili {NUM} sconti",
      DESC2: "Ne hai già generati {NUM}",
      DISCOVER_LABEL: "Scopri",
      LOAD_MORE_COUPONS: "Carica altri sconti",
      LOCK_AUTH_BUTTON: "CERTIFICA",
      LOCK_DESCRIPTION1: "Per poter accedere alla sezione Coupons devi prima certificare che tu sia uno studente universtiario dalla sezione Profilo.",
      LOCK_DESCRIPTION2: "Compila i campi richiesti nella sezione 'Università' sul tuo profilo e potrai accedere a tutti i vantaggi di uno studente universitario!",
      MARKED_UNUSED_LABEL: "Da utilizzare",
      MARKED_USED_LABEL: "Già utilizzati",
      NOT_STUDENT: "Per entrare in questa sezione devi essere uno studente universitario riconosciuto.",
      POINT_CAPTION: "Gettoni",
      POINT_CAPTION_FREE: " GRATIS",
      REMAINING_CAPTION1: "Solo",
      REMAINING_CAPTION2: "sconti rimasti!",
      REMAINING_CAPTION2_ONE: "Ultimo sconto rimasto!",
      VALIDATE_UNTIL: "Valido fino al "
    },
    INVALID_REASONS: {
      ALREADY_USED: "Hai già generato questo sconto o uno sconto simile precedentemente.",
      ANY_LEFT: "Questi sconti sono esauriti.\nTorna presto per altri sconti!",
      COINS_REQUIREMENT: "Non hai abbastanza gettoni per poter generare questo sconto.",
      EPASTA_STORE_VISITED: "Per sbloccare questo sconto scannerizza il codice QR di the[bold]faculty[/bold] che trovi nelle cucine di èPasta!",
      ESSELUNGA_VERIFIED_CUSTOMER: "Per sbloccare questo sconto devi avere associato la Carta Fìdaty da Menù dell'App.",
      EXCLUDE_USED: "Hai già generato uno sconto simile a questo in precendenza.\nNon puoi ottenere questo sconto.",
      IS_ACTIVE: "Questo sconto sarà disponibile a partire dal {start_date}.",
      MCFIT_TRIAL_DAY_DONE: "Per sbloccare questo sconto vai in una palestra McFIT, fai la giornata di prova e scannerizza dalla sezione codice promozionale il codice QR di the[bold]faculty[/bold] che troverai in palestra!",
      OBAG_STORE_VISITED: "Per sbloccare questo sconto vai in uno dei negozi O bag aderenti all'iniziativa e scannerizza il codice QR di the[bold]faculty[/bold]!",
      OTHER: "Al momento questo sconto non è generabile.",
      PREVIOUS_COUPON_USED: "Hai già generato questo sconto o uno sconto simile precedentemente."
    },
    SCONTI: {
      AVAILABLE: "Disponibili",
      USED: "Ottenuti"
    },
    TABS: {
      PREMI: {
        TITLE: "Prizes"
      },
      SCONTI: {
        TITLE: "Coupons"
      }
    },
    VIEW: {
      BARCODE_ACTIVATION_CODE: "Codice univoco:",
      BARCODE_DESC: "Mostra il barcode in cassa per\nusufruire dello sconto",
      CODE_COPIED_MESSAGE: "Il codice dello sconto è stato copiato negli appunti",
      CODE_COPIED_TITLE: "Codice copiato",
      LINK_DESC: "Clicca sul link mostrato sotto per usufruire dello sconto",
      LINK_POPUP_MESSAGE: "Il link dello sconto è stato copiato, incollalo nel tuo browser per utilizzare lo sconto.",
      LINK_POPUP_TITLE: "Link copiato",
      NOTHING_DESC: "Hai già usufruito di questo sconto.",
      NOTHING_DESC_ESSE: "Complimenti! Lo sconto di 5€ è stato caricato correttamente sulla tua\nCarta Fìdaty. Recati in negozio e lo sconto verrà automaticamente\napplicato dalla cassa al passaggio della Carta Fìdaty e al\nsuperamento della soglia prevista. Lo sconto non è valido per le\nspese effettuate online.",
      NOTHING_DESC_MCFIT: "Lo sconto è stato sbloccato!\nMostra questa schermata al trainer per attivare l'abbonamento al prezzo agevolato.",
      QRCODE_DESC: "Mostra il QR code in cassa per usufruire dello sconto",
      QRCODE_PROBLEM_DESC: "Problemi con il QR code?\nInserisci questo codice:",
      TEXT_DESC: "Ecco il codice per usufruire dello sconto",
      TIMEOUT_DESC_COMPLETED: "Hai già usufruito di questo sconto.",
      TIMEOUT_DESC_COUNTING: "Mostra questa schermata in cassa per usufruire dello sconto",
      TIMEOUT_POPUP_MESSAGE1: "Ti trovi presso questo negozio?",
      TIMEOUT_POPUP_MESSAGE1_DEFAULT: "Ti trovi presso {PARTNER_NAME}?",
      TIMEOUT_POPUP_MESSAGE2: "Mostra questa schermata ad un addetto!",
      TIMEOUT_POPUP_MESSAGE2_M: "Sarà lui a premere OK per poter abilitare lo sconto."
    }
  },
  FIRST_SCREEN: {
    CONFIRM_QUESTION: "Hai gia un account?",
    ONBOARD1: {
      TEXT: "Entra subito nell'app a\nmisura di studente!\nDivertiti, esercitati e risparmia!",
      TITLE: "[bold]Benvenuto su[/bold] the[bold]faculty![/bold]"
    },
    ONBOARD2: {
      TEXT: "Scegli la facoltà che più ti si addice.\nCompeti con altri studenti sulle\nmaterie d'esame.",
      TITLE: "[bold]Sfida i tuoi amici[/bold]"
    },
    ONBOARD3: {
      TEXT: "Guadagna i gettoni e sblocca sconti,\nabbonamenti e vantaggi esclusivi.\nCon alcuni partner potrai addirittura\nguadagnare!",
      TITLE: "[bold]Ottieni vantaggi[/bold]"
    },
    ONBOARD4: {
      TEXT: "Allenati per entrare nell'università dei\ntuoi sogni. Mettiti alla prova con le\nsimulazioni o concentrati sulle\nmaterie più difficili.",
      TITLE: "[bold]Ripassa giocando[/bold]"
    },
    ONBOARD5: {
      TEXT: "Vuoi saperne di più?\nRegistrati ora e inizia subito a usare l'app!\nDivertiti, esercitati e risparmia!",
      TITLE: "[bold]Scopri[/bold] the[bold]faculty[/bold]"
    }
  },
  FRIENDS: {
    FRIENDS_LABEL: "Amici",
    HOME_BOX_TEXT: "Aggiungi i tuoi amici su thefaculty: divertitevi e sfidatevi per ottenere numerosi gettoni!",
    HOME_BOX_TITLE: "AMICI",
    NEW_PENDING_REQUESTS: "Nuove richieste di amicizia",
    SEARCHING_LABEL: "Utenti trovati",
    SEARCH_FRIEND_PLACEHOLDER: "Cerca un amico...",
    YOUR_FRIENDS_LABEL: "I tuoi amici",
    PENDING_REQUESTS: {
      BUTTON_ACCEPT: "ACCETTA",
      BUTTON_REJECT: "RIFIUTA",
      NO_PENDING_FRIENDSHIP_REQUESTS: "Nessuna nuova richiesta",
      PENDING_REQUESTS_TITLE: "Richieste di amicizia"
    },
    USER_DETAILS: {
      ACCEPT_REQUEST_BUTTON: "ACCETTA RICHIESTA",
      ADD_FRIEND_BUTTON: "AGGIUNGI AGLI AMICI",
      FRIENDS_LABEL: "Amici",
      LOST_BESTOFS: "Sfide perse",
      NOT_IN_SCOREBOARD_LABEL: "Non in classifica",
      PROFILE_TITLE: "Profilo",
      REMOVE_FRIEND_BUTTON: "RIMUOVI DAGLI AMICI",
      SCOREBOARD_LABEL: "in classifica",
      SCORES_LABEL: "Punti",
      START_TEXT_1: "Inizia una",
      START_TEXT_2: "nuova sfida",
      STUDYTOWN_DESCRIPTION: "Città di studio: ",
      WON_BESTOFS: "Sfide vinte"
    }
  },
  HOME: {
    ONBOARD1: {
      TEXT: "Ora potrai [bold]divertirti[/bold], [bold]esercitarti[/bold] e [bold]risparmiare[/bold] con l'app a misura di studente.",
      TITLE: "[bold]Benvenuto su[/bold] the[bold]faculty[/bold]!"
    },
    ONBOARD2: {
      TEXT: "Inizia una [bold]sfida[/bold], [bold]rispondi alle domande[/bold] e [bold]guadagna gettoni[/bold]. Potrai usarli per ottenere tanti vantaggi!",
      TITLE: "[bold]Inizia subito ad esplorare l'app![/bold]"
    }
  },
  LOGIN: {
    EMAIL_PLACEHOLDER: "Email",
    LOGIN_BUTTON_TEXT: "CONTINUA",
    LOGIN_TITLE: "Entra su thefaculty",
    NO_ACCOUNT: "Non hai un account?",
    PASSWORD_PLACEHOLDER: "Password",
    REMEMBER_PASSWORD: "Non ti ricordi più la password?",
    SIGNUP_LABEL: "Registrati"
  },
  LOGINV2: {
    ALTERNATIVE: "oppure",
    CONTINUE: "CONTINUA",
    DESCRIPTION: "Non sei ancora registrato? Continua con Google, Facebook, Apple,",
    DESCRIPTION2: "oppure",
    EMAIL_OR_NICKNAME: "Email",
    FORGOT_PASSWORD: "Non ricordi la password?",
    PASSWORD: "Password",
    REGISTER_BY_EMAIL: "registrati con l'email",
    SOCIAL_SIGNIN: {
      APPLE: "Continua con Apple",
      FACEBOOK: "Continua con Facebook",
      FACEBOOK_CANCELLED_MESSAGE: "Si è verificato un problema nei server di Facebook, ti chiediamo di riprovare più tardi.",
      FACEBOOK_CANCELLED_TITLE: "Richiesta annullata",
      GOOGLE: "Continua con Google",
      INSTAGRAM: "Continua con [bold]Instagram[/bold]",
      LINKEDIN: "Continua con [bold]Linkedin[/bold]",
      PASSWORD: "Continua con [bold]Password`[/bold]"
    }
  },
  MENU: {
    UPDATE_PROFILE_IMAGE: {
      DEFAULT_TITLE: "Immagine",
      PREVIEW_TITLE: "Anteprima"
    }
  },
  MONTHS: {
    1: "gennaio",
    10: "ottobre",
    11: "novembre",
    12: "dicembre",
    2: "febbraio",
    3: "marzo",
    4: "aprile",
    5: "maggio",
    6: "giugno",
    7: "luglio",
    8: "agosto",
    9: "settembre"
  },
  OTHER: {
    CAMERA_PERMISSIONS_REQUIRED: "I permessi alla fotocamera sono disattivati. Vai su Impostazioni del tuo dispositivo e abilita i permessi alla fotocamera per poter procedere.",
    CANCEL: "Annulla",
    CANT_USE_FIREBASE: "Non è possibile utilizzare Firebase in questo dispositivo.",
    CLOSE: "Chiudi",
    COINS: "gettoni",
    CONFIRM: "Conferma",
    DONE: "Fine",
    EDIT: "Modifica",
    ERROR_CONNECTING_SERVER: "Qualcosa non ha funzionato nella connessione al server, verifica la tua connessione internet o riprova più tardi",
    ERROR_FIRESTORE_UPLOADING: "An error occurred on uploading to the FireStore!",
    ERROR_UPDATING_ACCOUNT: "An error occurred on updating account!",
    EURO_SIGN: "€",
    LOADING: "Caricamento",
    NO: "No",
    NO_DATA: "Nessun dato disponibile",
    OK: "OK",
    RETRY: "Riprova",
    SAVE: "Salva",
    SEARCH: "Cerca...",
    SELECT: "Seleziona",
    SELECT_IMAGE: "Seleziona immagine",
    SELECT_IMAGE_FROM_LIBRARY: "Seleziona dalla libreria",
    TAKE_IMAGE: "Scatta una foto",
    UPDATE: "Aggiorna",
    WARNING: "Attenzione",
    YES: "Si"
  },
  PROFILE: {
    CONFIRM_EMAIL: {
      DESCRIPTION: "Ti abbiamo inviato un'email all'indirizzo \n[bold]{EMAIL}[/bold].\nClicca sul link per certificare la tua email.\nSe non trovi l'email potrebbe essere finita della cartella 'spam'",
      RESEND_EMAIL: "Reinvia email",
      RETURN_TO_PROFILE: "TORNA AL PROFILO",
      TITLE: "Certificazione email",
      VERIFY_EMAIL: "Verifica email"
    },
    FAIL_DIALOG: {
      DESCRIPTION: "Hai completato i tuoi dati, hai guadagnato [bold]{COIN} gettoni[/bold]!",
      TITLE: "Oops!"
    },
    HOME: {
      BIRTHDAY: "Data di nascita",
      EMAIL: "Email di contatto",
      FACULTY_INFO: "Ti serve per trovare altri giocatori con i tuoi stessi interessi",
      FACULTY_TITLE: "Cosa mi piace?",
      GENDER: "Genere",
      GENDER_F: "Donna",
      GENDER_M: "Uomo",
      GENDER_O: "Altro",
      MODIFY_BUTTON: "Modifica",
      SAVE_BUTTON: "Salva",
      SELECT_FACULTY: "Scegli l'area di tuo interesse",
      TITLE: "Profilo",
      USER_TYPE_TITLE: "Cosa frequento?",
      USE_MAIN_EMAIL: "Usa la mia email principale",
      YOUR_DATA: "Chi sono?"
    },
    MESSAGE: {
      CANT_VERIFY_CONTACT_EMAIL: "Non puoi verificare la tua email di contatto, riprova più tardi.",
      CANT_VERIFY_STUDENT_EMAIL: "La verifica della tua email è già in corso. Se hai sbagliato qualche dato attendi 5 minuti e torna in questa sezione per procedere con una nuova verifica.",
      CHANGED_TO_VERIFY_STUDENT_EMAIL: "Nuova email di verifica inviata all'indirizzo {EMAIL} per la verifica.",
      CONTACT_EMAIL_ALREADY_EXISTS: "Questa email è già stata usata da un altro account, usane un'altra per poter procedere.",
      DATA_MODIFY_FAIL: "Non siamo riusciti a modificare i tuoi dati, riprova più tardi.",
      DATA_MODIFY_SUCCESS: "Dati modificati con successo!",
      DESCRIPTION_LABEL: "Inserisci \"[bold]{WHAT}[/bold]\" per ottenere subito [bold]{COIN} gettoni[/bold]!",
      DESCRIPTION_LABEL_BASIC_DATA: "Chi sono?",
      DESCRIPTION_LABEL_FACULTY: "Inserisci \"[bold]{WHAT}[/bold]\" per completare il tuo profilo!",
      DESCRIPTION_LABEL_FACULTY_DATA: "Cosa mi piace?",
      DESCRIPTION_LABEL_NEW: "Completa il tuo profilo per farti conoscere dagli altri studenti. Otterrai anche dei gettoni!",
      DESCRIPTION_LABEL_USER_TYPE: "Cosa frequento?",
      FAILED_TO_VERIFY_STUDENT_EMAIL: "Si è verificato un problema durante l'invio della email di verifica.",
      SUCCESS_TO_VERIFY_STUDENT_EMAIL: "Email inviata con successo!",
      UNKNOWN_ERROR: "Si è verificato un errore imprevisto, riprova più tardi.",
      VERIFY_CONTACT_AND_GOT_REWARD: "Hai completato chi sei, hai guadagnato [bold]{COIN} gettoni[/bold]!",
      VERIFY_STUDENT_AND_GOT_REWARD: "Hai completato cosa studi, hai guadagnato [bold]{COIN} gettoni[/bold]!",
      VERIFY_STUDENT_EMAIL_OR_CARD_AND_GOT_REWARD: "Hai completato questo blocco, hai guadagnato [bold]{COIN} gettoni[/bold]!"
    },
    SUCCESS_DIALOG: {
      DESCRIPTION: "Hai completato i tuoi dati, hai guadagnato [bold]{COIN} gettoni[/bold]!",
      TITLE: "Complimenti!"
    },
    USER_TYPE: {
      ANNO: "Anno",
      CITY: "Città di residenza",
      COURSE_OF_STUDY: "Corso di studi",
      EDUCATION_LEVEL: "Livello d'istruzione",
      FUORI: "Fuori sede",
      FUORI_NO: "No, non sono uno studente fuori sede",
      FUORI_YES: "Sì, sono uno studente fuori sede",
      HIGH_SCHOOL: "Superiori",
      INSTITUTION_NAME: "Nome istituto",
      NON_STUDENT: "Non studente",
      UNIVERSITY: "Università",
      YEAR_DESCRIPTION: "° anno"
    },
    VERIFY_BUTTON: {
      CARD_VERIFY_IN_PROGRESS: "In attesa di verifica...\nIl badge è in fase di revisione da un nostro operatore, ci potrebbe volere qualche giorno.",
      EMAIL_VERIFY_IN_PROGRESS: "In attesa di verifica...\nTi abbiamo inviato un'email di verifica, se hai sbagliato l'email torna qui tra 5 minuti.",
      EMPTY_DATA: "Accreditati come studente universitario\nper sbloccare tutti i vantaggi",
      EMPTY_DATA_EDIT: "In attesa di verifica...\nSe hai sbagliato qualche dato, clicca qui per poter effettuare una nuova verifica.",
      EMPTY_DATA_TITLE: "Certifica Università"
    }
  },
  REFERRAL_CODE: {
    ALERT_ESSELUNGA: "Oops! Per poter utilizzare un codice promozionale di Esselunga devi prima associare la tua Carta Fìdaty!",
    HOME_BOX_TEXT: "Hai trovato un codice promozionale o un codice QR thefaculty? Utilizzalo e ricevi la tua ricompensa",
    HOME_BOX_TITLE: "CODICE PROMO",
    INSERT_NEW_REFERRAL_CODE: "Inserisci il codice promozionale",
    NO_USED_CODES: "Nessun codice promozionale\nutilizzato fino ad ora.",
    OR_LABEL: "oppure",
    PAGE_BOX_TEXT: "Scansiona un codice promozionale e scopri subito cosa contiene!",
    REFERRAL_CODE: "Codice Promozionale",
    REFERRAL_CODE_BOX_LABEL: "Codice ",
    SCAN_BUTTON_TEXT: "Scansiona il codice QR",
    SCAN_QRCODE_TITLE: "Scansiona codice QR",
    USE_NOW_BUTTON: "UTILIZZA",
    WHEN_USED: "Usato il "
  },
  RESET_PASSWORD: {
    DESCRIPTION_TEXT: "Inserisci l'email (personale o universitaria) oppure il tuo nickname usati durante la registrazione tramite email, ti invieremo le istruzioni per il ripristino della tua password.\n",
    EMAIL_PLACEHOLDER: "Email o nickname",
    ERROR_RESETTING_PASSWORD_MESSAGE: "Qualcosa è andato storto durante l'invio della email di ripristino della password. Riprova più tardi oppure contattaci su assistenza@thefaculty.it",
    ERROR_RESETTING_PASSWORD_TITLE: "Oops!",
    RESET_PASSWORD_TITLE: "Recupera password",
    SEND_BUTTON_TEXT: "RECUPERA PASSWORD"
  },
  SECTIONS: {
    BESTOF: "Sfide",
    CONTEST: "Concorso",
    COUPONS: "Coupons",
    FRIENDS: "Amici",
    HOME: "Home",
    MENU: "Menù",
    TEST: "Test"
  },
  SETTINGS: {
    TITLE: "Impostazioni",
    BARCODE_READER: {
      READ_FAILED: "Codice a barre non letto",
      READ_SUCCESS: "Codice a barre letto con successo!",
      TITLE_BARCODE: "Scansiona codice a barre",
      TITLE_QRODE: "Scansiona codice QR"
    },
    CARD_REGISTER_ID: {
      CONTINUE_BUTTON: "CONTINUA",
      ERROR_INVALID_CARD_BACK: "Scatta nuovamente l'immagine del retro del documento e attendi che il caricamento sia completato",
      ERROR_INVALID_CARD_FRONT: "Scatta nuovamente l'immagine del retro del documento e attendi che il caricamento sia completato",
      HEADER_LABEL: "Inserisci la foto della tua carta d'identità",
      PLACE_HOLDER1: "Interno Carta d'Identità",
      PLACE_HOLDER1_UPLOADED: "Foto interna caricata",
      PLACE_HOLDER2: "Esterno Carta d'Identità",
      PLACE_HOLDER2_UPLOADED: "Foto esterna caricata",
      TITLE: "Carta d'identità"
    },
    CARD_REGISTER_TAX: {
      CONTINUE_BUTTON: "CONTINUA",
      ERROR_ALREADY_SENT: "Hai già inviato i documenti",
      ERROR_INVALID_CARD_BACK: "Scatta nuovamente l'immagine del retro del codice fiscale e attendi che il caricamento sia completato",
      ERROR_INVALID_CARD_FRONT: "Scatta nuovamente l'immagine frontale del codice fiscale e attendi che il caricamento sia completato",
      ERROR_SAVING_URLS: "Si è verificato un problema durante il caricamento dei documenti. Riprova più tardi, se il problema persiste contatta l'Assistenza tramite assistenza@thefaculty.it",
      HEADER_LABEL: "Inserisci la foto del tuo codice fiscale",
      PLACE_HOLDER1: "Fronte Codice Fiscale",
      PLACE_HOLDER1_UPLOADED: "Fronte Codice Fiscale",
      PLACE_HOLDER2: "Retro Codice Fiscale",
      PLACE_HOLDER2_UPLOADED: "Retro Codice Fiscale",
      SUCCESS_SAVING_URLS: "Hai caricato correttamente i documenti!",
      TITLE: "Codice fiscale"
    },
    CARTA_FIDATY: {
      BARCODE_PLACEHOLDER: "Codice Carta Fìdaty",
      DESC_NOT_VERIFIED: "Per riscattare gli sconti e i premi offerti da Esselunga sull'App thefaculty avrai bisogno della tua Carta Fìdaty.\n\nAssocia ora la tua Carta Fìdaty",
      DESC_VERIFIED: "Hai già associato una Carta Fìdaty. È possibile modificare una Carta Fìdaty per smarrimento o furto, sostituzione della Carta per deterioramento o passaggio ad altra tipologia di Carta Fìdaty",
      DISCOVER_CARD: "Scopri la Fìdaty Card",
      DONE: "FATTO",
      DONT_HAVE_CARD: "Non hai ancora una Carta Fìdaty?",
      HOW_TO_REQUEST: "Scopri come richiederla",
      NOT_NOW: "Non ora",
      SHOULD_BE_13: "Il codice dovrebbe contenere 13 caratteri!",
      TITLE: "Esselunga",
      TITLE2: "Carta Fidaty - Esselunga",
      VERIFY_CARD_BLOCKED: "La tua Carta Fìdaty risulta bloccata. Per maggiori informazioni contatta il Servizio Clienti Esselunga al Numero Verde gratuito 800-666555",
      VERIFY_CARD_CANCELED: "La tua Carta Fìdaty risulta cancellata. Per maggiori informazioni contatta il Servizio Clienti Esselunga al Numero Verde gratuito 800-666555",
      VERIFY_ERROR_TITLE: "Attenzione!",
      VERIFY_ERROR_UNKNOWN: "Errore sconosciuto!",
      VERIFY_MUST_BE_NUMBERIC: "Il numero della Carta Fìdaty è composto da sole cifre. Inserisci le 13 cifre e riprova",
      VERIFY_NOT_COMPLETED: "Il numero della Carta inserito è corretto ma la registrazione al Programma Fìdaty non è completa. Accedi al sito www.esselunga.it per completarla",
      VERIFY_NOT_NEW_CARD: "La tua Carta Fìdaty risulta cancellata. Per maggiori informazioni contatta il Servizio Clienti Esselunga al Numero Verde gratuito 800-666555",
      VERIFY_SUCCESS_TEXT: "La tua Carta Fìdaty è stata associata correttamente!",
      VERIFY_SUCCESS_TITLE: "Carta Fìdaty associata",
      VERIFY_WRONG_CARD: "La Carta Fìdaty inserita non è corretta. Controlla il numero inserito e riprova",
      VERIFY_WRONG_NAME: "I dati della Carta Fìdaty non corrispondono a quelli inseriti in fase di registrazione a thefaculty. Verifica che la Carta sia intestata a te e riprova"
    },
    CHANGE_LEGAL_CHECKS: {
      DESCRIPTION: "Vuoi modificare le tue preferenze riguardanti i consensi legali?",
      ERROR_WHILE_UPDATING: "Non siamo riusciti a modificare le tue preferenze, riprova più tardi.",
      SAVE_BUTTON: "SALVA MODIFICHE",
      SUCCESS_UPDATING_MESSAGE: "La tue preferenze sono state modificate con successo.",
      SUCCESS_UPDATING_TITLE: "Fatto!",
      TITLE: "Consensi legali"
    },
    CHANGE_PASSWORD: {
      CHANGE_BUTTON: "MODIFICA PASSWORD",
      DESCRIPTION: "Vuoi impostare una nuova password?",
      ERROR_UNKNOWN: "Si è verificato un problema durante la modifica della password, riprova più tardi.",
      ERROR_WRONG_PASSWORD: "La vecchia password inserita non è valida",
      LEGEND_1_CHECKED: "✓ 8 caratteri",
      LEGEND_1_UNCHECKED: "- 8 caratteri",
      LEGEND_2_CHECKED: "✓ una lettera minuscola e maiuscola",
      LEGEND_2_UNCHECKED: "- una lettera minuscola e maiuscola",
      LEGEND_3_CHECKED: "✓ un numero",
      LEGEND_3_UNCHECKED: "- un numero",
      LEGEND_DESCRIPTION: "La password deve contenere almeno:",
      NEW_PASSWORD: "Inserisci la nuova password",
      OLD_PASSWORD: "Inserisci la vecchia password",
      SUCCESS_CHANGE_PASSWORD: "Hai modificato correttamente la password!",
      TITLE: "Modifica password"
    },
    DELETE_ACCOUNT: {
      CONFIRM_BUTTON: "CONFERMA",
      CONFIRM_DESC: "Perchè vuoi lasciare the[bold]faculty[/bold]?",
      CONFIRM_MESSAGE: "Ci dispiace che tu voglia disabilitare il tuo account. Sei davvero sicuro di voler procedere?",
      ERROR_ON_DELETE: "Si è verificato un problema durante la cancellazione del tuo account, riprova più tardi. Se il problema persiste contatta l'assistenza scrivendo ad assistenza@thefaculty.it",
      ERROR_ON_LOGGING_OUT: "Si è verificato un problema durante il logout automatico. Ti chiediamo di eseguire manualmente il logout dall'App.",
      ERROR_UNKNOWN: "Si è verificato un problema, riprova più tardi. Se il problema persiste contatta l'assistenza scrivendo ad assistenza@thefaculty.it",
      REMAIN_BUTTON: "Rimani su thefaculty",
      TITLE: "Elimina account"
    },
    DELETE_ACCOUNT_AFTER: {
      CLOSE_BUTTON: "ESCI",
      DESCRIPTION: "Torna a trovarci presto!\nSarai sempre il benvenuto!",
      TITLE: "Profilo disattivato"
    },
    EDIT_FACULTY: {
      ALL_FACULTIES: "Tutte le aree di interesse",
      BUTTON_TITLE: "CONFERMA",
      ERROR_WHILE_UPDATING_FACULTY: "Si è verificato un problema durante la modifica della tua area di interesse. Riprova più tardi.",
      SUCCESS_TO_UPDATING_FACULTY: "Complimenti, hai modificato la tua area di interesse con successo!",
      TITLE: "Area di interesse",
      YOUR_FACULTY: "La tua area di interesse è "
    },
    EDIT_SUBJECT_WEIGHT: {
      BUTTON1: "Ripristina le frequenze originali",
      BUTTON2: "SCEGLI LE FREQUENZE",
      EMPTY_ERROR: "Si è verificato un problema durante il ripristino delle materie. Riprova più tardi.",
      EMPTY_SUCCESS: "Ripristino effettuato!",
      NO_DATA: "Nessuna materia presente al momento",
      OTHER_SUBJECTS_PLAYING_WITH: "Altre materie impostate:",
      SPECIFY_SUBJECTS_FOR_YOUR_FACULTY: "Le materie della tua facoltà:",
      TITLE: "Frequenza delle materie",
      YOUR_FACULTY: "Facoltà di "
    },
    EDIT_SUBJECT_WEIGHT2: {
      CONTINUE: "CONTINUA",
      DESCRIPTION: "Scegli, per ciascuna materia, la frequenza di estrazione delle domande.",
      TITLE: "Materie della tua facoltà"
    },
    EDIT_SUBJECT_WEIGHT3: {
      CONTINUE: "CONTINUA",
      DESCRIPTION: "Scegli altre materie con cui vuoi giocare. Potrai modificare la tua scelta in qualsiasi momento.",
      ERROR: "Si è verificato un problema durante il ripristino delle materie con cui vuoi giocare. Riprova più tardi.",
      LOAD_MORE_SUBJECTS: "Mostra tutte le materie",
      LOAD_SUGGESTED_SUBJECTS: "Mostra materie consigliate",
      SUCCESS: "Le materie con cui vuoi giocare sono state modificate con successo!",
      TITLE: "Altre materie"
    },
    FAQ: {
      NOTHING_FOUND: "Nessuna domanda trovata, se hai bisogno di aiuto contattaci su assistenza:",
      PAGE_TITLE: "Domande frequenti",
      SEARCH_PLACEHOLDER: "Cerca una domanda...",
      TITLE: "FAQ"
    },
    HOME: {
      AGREEMENTS_SETTINGS: "Consensi legali e privacy",
      APP_SETTINGS: "[bold]Impostazioni app[/bold]",
      CARTA_FIDATY: "Carta Fìdaty | Esselunga",
      DELETE_ACCOUNT_SETTINGS: "Elimina account",
      DEV_SETTINGS: "[bold]Development settings[/bold]",
      EDIT_FACULTY: "Change your faculty",
      EDIT_SUBJECT: "Change your subjects",
      EMAIL_CLIENT_NO_EXITS: "Per contattare l'assistenza scrivici una mail ad assistenza@thefaculty.it",
      EMAIL_SUPPORT: "Contatta l'assistenza",
      EMAIL_SUPPORT_BODY: "\n\n----------\n[USER_ID]\nData: [DATETIME]\nNickname: [NICKNAME]\nNome: [NAME]\n----------\n\n",
      EMAIL_SUPPORT_BODY_ACCOUNT_DISABLED: "Ciao,\nvoglio tornare a giocare e approfittare dei vantaggi di thefaculty.\n\nPer questo desidero la riattivazione dell'account.",
      EMAIL_SUPPORT_SUBJECT: "Assistenza - thefaculty: [NICKNAME]",
      EMAIL_SUPPORT_SUBJECT_ACCOUNT_DISABLED: "Account disabilitato",
      FACULTY_INFORMATION: "About the[bold]faculty[/bold]",
      FAQ: "FAQ",
      INSTAGRAM_PAGE: "Pagina Instagram di the[bold]faculty[/bold]",
      LINKEDIN_PAGE: "Pagina LinkedIn di the[bold]faculty[/bold]",
      LOGOUT: "Esci dall'app",
      NEED_HELP: "Hai bisogno di aiuto?",
      NOTIFICATION_SETTINGS: "Livello notifiche",
      PASSWORD_SETTINGS: "Modifica password",
      PRIAVACY_POLICY: "Privacy policy",
      PROFILE: "Profilo",
      QUESTIONS_QUALITY: "Qualità dei quesiti",
      SETTINGS: "Account settings",
      SOCIAL_LABEL: "[bold]Social[/bold]",
      SOCIAL_POPUP: "Our social networks",
      SOCIAL_POPUP_CANCEL: "Back",
      SOCIAL_POPUP_TITLE: "Social",
      SOCIAL_POPUP_WEBSITE: "thefacultyapp.com",
      STORE_PAGES: "Valuta l'App",
      SUPPORT: "Assistenza",
      SUPPORT_LABEL: "the[bold]faculty e supporto[/bold]",
      THEFACULTY_PARTNER: "Partner of the[bold]faculty[/bold]",
      THEFACULTY_WEBSITE: "Visita il sito di the[bold]faculty[/bold]",
      TOS: "Terms and conditions",
      UPGRADE_TO_STUDENT_ACCOUNT: "Accreditati come studente",
      USER_SETTINGS: "[bold]Impostazioni account[/bold]"
    },
    PARTNERS: {
      ERROR_ON_GETTING_DATA: "Si è verificato un problema di connessione. Riprova più tardi.",
      TITLE: "Partner"
    },
    QUESTIONS_QUALITY: {
      ERROR_ON_GETTING_DATA: "Si è verificato un problema di connessione. Riprova più tardi.",
      TITLE: "Selexi"
    },
    SETTINGS_HOME: {
      CHANGE_PASSWORD: "Modifica password",
      DELETE_ACCOUNT: "Elimina account",
      NOTIFICATION_SETTINGS: "Impostazioni notifiche",
      STUDY_AT: "Città di studio: ",
      TITLE: "Impostazioni"
    },
    SETTINGS_NOTIFICATION: {
      CAPTION1: "Ti avvisiamo quando sarà il tuo turno nelle Sfide o quando completi una simulazione.",
      CAPTION1_TITLE: "Livello minimo",
      CAPTION2: "Come il livello minimo, in più ti avvisiamo quando ci sono nuovi Coupons.",
      CAPTION2_TITLE: "Livello base",
      CAPTION3: "Come il livello medio, in più ti teniamo aggiornato sulle novità dell'App.",
      CAPTION3_TITLE: "Livello massimo",
      DESCRIPTION: "Scegli quanto vuoi rimanere aggiornato su quello che accade su the[bold]faculty[/bold]",
      SET_LEVEL_ERROR: "Si è verificato un problema. Riprova più tardi.",
      TITLE: "Impostazioni notifiche"
    }
  },
  SIGNUP: {
    ADD_MAJOR_EMAIL: {
      CONFIRM_EMAIL: "Ripeti email",
      CONTINUE: "CONTINUA",
      DESCRIPTION: "Ciao{firstname} per poter continuare ad utilizzare the[bold]faculty[/bold] ci servirebbe avere una tua email che [bold]non[/bold] sia universitaria.",
      EMAIL: "Email",
      ERROR_ON_ALREADY_EXISTS: "L'indirizzo email inserito è già presente, prova ad accedere al tuo account",
      ERROR_ON_ALREADY_REGISTERED: "Hai già inserito una mail personale, esegui il logout e accedi nuovamente",
      ERROR_ON_FILLING_EMAIL: "Si è verificato un problema durante l'invio dei dati, riprova più tardi oppure contattaci su assistenza@thefaculty.it",
      ERROR_ON_IS_UNIV_EMAIL: "L'indirizzo email inserito è una mail universitaria. Per poter proseguire devi inserire una mail che non sia universitaria",
      MAJOR: "Corso di laurea",
      NOT_NOW: "Torna al login",
      SUCCESS_MESSAGE: "Da ora la tua email con cui accedere a thefaculty sarà sempre {email}! Conferma la tua email e accedi nuovamente a thefaculty!",
      SUCCESS_TITLE: "Grazie!",
      TITLE: "Ancora un attimo"
    },
    CONFIRM_EMAIL_SCREEN: {
      CHANGE_EMAIL_MESSAGE1: "Se hai sbagliato ad inserire l'indirizzo email fai il logout e registrati nuovamente con l'indirizzo corretto",
      CHANGE_EMAIL_MESSAGE2: "Se hai sbagliato ad inserire l'indirizzo email universitario attendi qualche minuto e puoi reinserirlo di nuovo in questa sezione",
      CHANGE_EMAIL_POPUP: "Cambia email",
      CHANGE_EMAIL_TITLE: "Email errata?",
      CLOSE_BUTTON: "ESCI",
      CLOSE_POPUP: "Chiudi",
      CLOSE_POPUP_TITLE: "Stai riscontrando problemi?",
      DESCRIPTION: "Ti abbiamo inviato un'email all'indirizzo {EMAIL}. Clicca sul link per certificare la tua email. Se non trovi l'email potrebbe essere finita nella casella 'spam'.",
      DESCRIPTION1: "Ti abbiamo inviato un'email all'indirizzo che ci hai fornito.",
      DESCRIPTION2: "Clicca sul link contenuto nell'email per completare la registrazione.\n\nSe non trovi l'email, potrebbe essere finita nella cartella \"spam\" oppure, se stai riscontrando problemi, contattaci tramite assistenza@thefaculty.it",
      ERROR_RESENDING_CONFIRMATION_EMAIL: "Non siamo riusciti ad inviarti una nuova email di verifica. Riprova più tardi",
      GOING_TO_MAIN_SCREEN: "Caricamento...",
      LOGOUT_POPUP: "Logout",
      RESEND_BUTTON: "Reinvia email",
      SUCCESS_RESENDING_CONFIRMATION_EMAIL: "Email reinviata con successo!",
      TITLE: "Verifica email"
    },
    FIFTH_SCREEN: {
      CONTINUE_BUTTON: "CONTINUA",
      FIRST_CELL_TEXT: "Inserisci e seleziona il corso di laurea a te più affine",
      INPUT_MAJOR: "Cerca un corso di laurea",
      PAGE_TITLE: "Corso di laurea"
    },
    FOURTH_SCREEN: {
      CONTINUE_BUTTON: "CONTINUA",
      ERROR_EMAIL_NOT_MATCH: "Le due email non coincidono",
      ERROR_EXISTS: "L'indirizzo email inserito è già presente, prova ad accedere al tuo account",
      ERROR_INVALID_EMAIL: "Email non valida",
      ERROR_IS_UNIVERSITY_EMAIL: "Hai inserito una mail universitaria",
      FIRST_CELL_TEXT1: "Inserisci una mail ",
      FIRST_CELL_TEXT2: "universitaria",
      FIRST_CELL_TEXT_BOLD: "non",
      INPUT_CONFIRM_EMAIL: "Conferma email",
      INPUT_EMAIL: "Email",
      PAGE_TITLE: "Email"
    },
    SECOND_SCREEN: {
      CONTINUE_BUTTON: "CONTINUA",
      INPUT_BIRTHDAY: "Data di nascita",
      INPUT_BIRTHPLACE: "Luogo di nascita",
      INPUT_FIRSTNAME: "Nome",
      INPUT_GENDER: "Sesso",
      INPUT_LASTNAME: "Cognome",
      PAGE_TITLE: "I tuoi dati",
      GENDERS: {
        0: "Uomo",
        1: "Donna",
        2: "Altro"
      }
    },
    SIXTH_SCREEN: {
      CONTINUE_BUTTON: "REGISTRATI",
      FIRST_CELL_TEXT: "Hai selezionato il corso di studio",
      PAGE_TITLE: "Facoltà",
      SECOND_CELL_TEXT: "Giocherai nella facoltà di",
      SHOW_ALL_FACULTIES_BUTTON: "Mostra tutte le facoltà",
      SHOW_SUGGESTED_FACULTIES_BUTTON: "Mostra facoltà consigliate"
    },
    STUDENT1: {
      ALREADY_EXIST: "L'email universitaria inserita è già stata associata da un altro account. Usa un'altra email universitaria o accedi tramite l'account al quale è già associata.",
      ALREADY_IN_PROGRESS: "La verifica della tua email è già in corso. Se hai sbagliato qualche dato attendi qualche minuto e torna in questa sezione per procedere con una nuova verifica.",
      COMPILE_ALL_FIELDS_FOR_STUDYTOWN: "Per poter inserire la città di studio devi inserire la tua email universitaria.",
      CONFIRM_EMAIL: "Conferma email universitaria",
      CONTINUE_BUTTON: "CONTINUA",
      DESCRIPTION: "Inserisci i dati richiesti qui sotto per poter verificare il tuo account come studente universitario.",
      DESCRIPTION_STUDENT: "Hai già effettuato la verifica di studente universitario. Se vuoi modificare la tua email universitaria o la città dove studi compila i campi qui sotto.",
      EMAIL: "Email universitaria",
      FAILED_UPGRADE: "Non siamo riusciti a mandarti l'email di conferma.\nRiprova più tardi",
      GRADUATION_YEAR: "Anno previsto di laurea",
      HAS_NO_EMAIL: "Sei uno studente universitario ma non hai una email universitaria? Clicca qui",
      HAS_NO_EMAIL2: "Sono universitario ma non ho un'email universitaria",
      INVALID_CITY_INDEX: "Si prega seleziona una città di studio",
      INVALID_CITY_NAME: "Si prega seleziona una città di studio",
      INVALID_EMAIL: "Si prega di inserire una email universitaria valida per poter procedere",
      INVALID_GRADUATION_YEAR: "Anno di laurea non valido",
      NOTMATCH_EMAIL: "Le due email non corrispondono",
      NOT_NOW: "Non ora",
      NOT_UNIVERSITY_EMAIL: "La tua email non è riconosciuta tra gli indirizzi email abilitati. Prova con un altro indirizzo email oppure contattaci su assistenza@thefaculty.it se pensi che il tuo indirizzo sia valido",
      OEVERLAY_DONE: "Fine",
      OEVERLAY_HEADER: "Città di studio",
      STUDY_TOWN: "Città di studio",
      SUCCESS_UPGRADE_STUDENT_CARD: "Perfetto! La procedura di upgrade dell'account è quasi terminata: il tuo badge universitario è ora in revisione",
      SUCCESS_UPGRADE_STUDENT_EMAIL: "Perfetto! La procedura di upgrade dell'account è quasi terminata: ti basta confermare la tua email tramite il link che ti abbiamo inviato",
      TITLE: "Studente Universitario"
    },
    STUDENT_CARD_PENDING: {
      CLOSE_BUTTON: "CHIUDI",
      DESCRIPTION: "Stiamo verificando i dati che ci hai fornito.\nRiceverai una notifica sullo stato della verifica il prima possibile.\nCi potrebbe volere qualche giorno.",
      TITLE: "Badge in revisione"
    },
    STUDENT_CARD_VERIFY: {
      CAMERA_NOT_WORKING: "La fotocamera non sta funzionando",
      CARD: "Badge universitario",
      CARD_UPLOADED: "Foto del badge caricata",
      DESCRIPTION: "Se non disponi di una email universitaria puoi inviarci la foto del tuo badge universitario o di un qualsiasi documento universitario valido. Ricorda che devono essere ben visibili i tuoi dati sul badge affinché venga approvato.",
      ERROR_UPLOADING: "Verifica di aver caricato correttamente la tua immagine. Per poterla caricare verifica che compaia la scritta 'Foto del badge caricata' all'interno del box.",
      GRADATION_YEAR: "Anno di previsione della laurea",
      INVALID_CARD_URL: "Verifica di aver caricato correttamente la tua immagine. Per poterla caricare verifica che compaia la scritta 'Foto del badge caricata' all'interno del box.",
      INVALID_UNIVERSITY: "Devi selezionare un'università per poter procedere",
      SCAN_DESCRIPTION: "Posiziona il badge all'interno del riquadro.\nRicorda che devono essere ben visibili i tuoi dati affinché venga approvato.",
      SCAN_DESCRIPTION2: "Se non possiedi un badge puoi fare la foto ad un documento universitario valido con i tuoi dati ben visibili.",
      SEARCH_UNIVERSITY: "Cerca la tua università",
      STUDY_CITY: "Città di studio",
      TAKE_PICTURE: "SCATTA FOTO",
      TITLE: "Studente Universitario",
      UNIVERSITY: "Università"
    },
    TERMS_AND_CONDITIONS: {
      ACCEPT_BUTTON: "I AGREE",
      CONTINUE_BUTTON: "CONTINUA",
      FIRST_CELL1: "Acconsento al trattamento dei miei dati per finalità di funzionamento dell'App the",
      FIRST_CELL2_BOLD: "faculty ",
      FIRST_CELL3: "per la partecipazione ai Concorsi a premi e per le iniziative promozionali dei Partner.",
      PAGE_TITLE: "Termini e condizioni",
      SECOND_CELL1: "Dichiaro di aver letto ed accettato la ",
      SECOND_CELL1_LINK: "Privacy Policy",
      THIRD_CELL1: "Dichiaro di aver letto ed accettato le",
      THIRD_CELL1_LINK: "Condizioni di licenza",
      THIRD_CELL2: "e il ",
      THIRD_CELL2_LINK: "Regolamento del Concorso"
    },
    THIRD_SCREEN: {
      CONTINUE_BUTTON: "CONTINUA",
      INPUT_NICKNAME: "Nickname",
      INPUT_PASSWORD: "Password",
      LEGEND_1_CHECKED: "✓ 8 caratteri",
      LEGEND_1_UNCHECKED: "- 8 caratteri",
      LEGEND_2_CHECKED: "✓ una lettera minuscola e maiuscola",
      LEGEND_2_UNCHECKED: "- una lettera minuscola e maiuscola",
      LEGEND_3_CHECKED: "✓ un numero",
      LEGEND_3_UNCHECKED: "- un numero",
      LEGEND_DESCRIPTION: "La password deve contenere almeno:",
      PAGE_TITLE: "Accesso e utilizzo"
    }
  },
  SIGNUPV2: {
    EMAILSIGNUP: {
      SIGNIN_LOADING: "Accesso in corso...",
      TITLE: "Registrazione",
      EMAIL_INPUT: {
        ALREADY_LINKED_EMAIL: "Account già registrato",
        ALREADY_LINKED_EMAIL_DESC: "Questa mail è già associata a un account. Usala per accedere o recupera la password se non te la ricordi",
        ALREADY_LINKED_SOCIAL: "Email già registrata",
        ALREADY_LINKED_SOCIAL_DESC: "L’email inserità è già stata usata per un accesso social. Vuoi continuare con il social login?",
        CONTINUE_BUTTON: "CONTINUA",
        EMAIL: "Email",
        ERROR_160100: "L'email inserita è una email universitaria. Per poter accedere a thefaculty è necessario usare il proprio indirizzo email personale.",
        ERROR_160101: "L'email utilizzata per l'accesso con Facebook è cambiata, prova ad utilizzare la tua email precedente per poter accedere di nuovo al tuo account, oppure contattaci su assistenza@thefaculty.it",
        ERROR_160103: "Esiste già un account associato a questa email. Recupera la password o accedi da un social per poter entrare su thefaculty.",
        ERROR_160104: "Esiste già un account associato a questa email. Recupera la password o accedi da un social per poter entrare su thefaculty.",
        ERROR_160105: "Non abbiamo ottenuto l’indirizzo email associata al tuo account Facebook, riprova condividendo la tua mail.",
        ERROR_160106: "L’email associata all’account Facebook non corrisponde alla email nei nostri server: registrati di nuovo.",
        ERROR_CHECKING_NICKNAME: "Si è verificato un errore imprevisto durante la verifica del nickname, riprova più tardi.",
        ERROR_CREATING_USER: "Qualcosa non ha funzionato nella registrazione. Se il problema persiste contattaci su assistenza@thefaulty.it",
        ERROR_GETTING_SIGNIN_METHOD: "Si è verificato un errore imprevisto. Se il problema persiste contattaci su assistenza@thefaculty.it",
        ERROR_UNKNOWN: "Si è verificato un errore imprevisto. Se il problema persiste contattaci su assistenza@thefaculty.it",
        LEGEND_1_CHECKED: "✓ 8 caratteri",
        LEGEND_1_UNCHECKED: "- 8 caratteri",
        LEGEND_2_CHECKED: "✓ una lettera maiuscola e minuscola",
        LEGEND_2_UNCHECKED: "- una lettera maiuscola e minuscola",
        LEGEND_3_CHECKED: "✓ un numero",
        LEGEND_3_UNCHECKED: "- un numero",
        LEGEND_DESCRIPTION: "La password deve contenere almeno:",
        PASSWORD: "Password",
        SUBTITLE: "Email e password"
      },
      NAME_INPUT: {
        CONTINUE_BUTTON: "CONTINUA",
        FIRST_NAME: "Nome",
        LAST_NAME: "Cognome",
        NICKNAME: "Nickname",
        SUBTITLE: "I tuoi dati"
      }
    },
    SOCIALSIGNUP: {
      ACCOUNT_ONLY_ON_DB_MESSAGE: "Hai già un account esistente con questa email. Ti chiediamo tuttavia di contattarci su assistenza@thefaculty.it per poter risolvere questo problema.",
      ERROR_IS_UNIVERSITY_EMAIL: "L'email inserita è una email universitaria. Per poter accedere a thefaculty è necessario usare il proprio indirizzo email personale.",
      ERROR_NEED_FB_EMAIL: "Per poter procedere con la registrazione tramite Facebook è necessario consentire l'accesso alla email.",
      ERROR_NICKNAME_TOO_LONG: "Il nickname può essere di massimo 13 caratteri.",
      ERROR_NICKNAME_WITHOUT_SPACES: "Il nickname non può contenere spazi, prova con un altro nickname per poter procedere.",
      ERROR_RETRY_A_NEW_SIGNUP: "Purtroppo qualcosa è andato storto durante la registrazione. Prova a riavviare l'app e registrati nuovamente. Se il problema persiste contattaci su assistenza@thefaculty.it",
      ERROR_SIGNING_IN_APPLE: "Si è verificato un problema durante l'accesso tramite Apple",
      ERROR_SIGNING_IN_FACEBOOK: "Si è verificato un problema durante l'accesso tramite Facebook",
      ERROR_SIGNING_IN_GOOGLE: "Si è verificato un problema durante l'accesso tramite Google",
      ERROR_SIGNING_IN_SOCIAL: "Si è verificato un problema durante l'accesso social",
      OTHER_PROVIDERS_MESSAGE: "L'email inserita è già usata per un accesso social. Vuoi continuare con il social login?",
      OTHER_PROVIDERS_TITLE: "Accesso tramite social",
      PASSWORD_PROVIDER_MESSAGE: "Questa email è già associata ad un account. Usala per accedere oppure recupera la password se non te la ricordi.",
      PASSWORD_PROVIDER_TITLE: "Email già esistente",
      TITLE: "Registrazione",
      NAME_INPUT: {
        CONTINUE_BUTTON: "CONTINUA",
        DESCRIPTION: "Nome e cognome verranno visualizzati solo dai tuoi amici.",
        FIRST_NAME: "Nome",
        LAST_NAME: "Cognome",
        NICKNAME: "Nickname",
        SUBTITLE: "I tuoi dati"
      }
    },
    TERMS_AND_CONDITION: {
      LEGAL_CHECK1_DESC: "Acconsento a ricevere messaggi pubblicitari, promozionali e di marketing da SmartCreative e dai Partner presenti in app.",
      LEGAL_CHECK2_DESC: "Acconsento alla raccolta di dati a fini di profilazione commerciale e ricerca statistica, ivi compresa la geolocalizzazione.",
      LEGAL_CHECK3_DESC1: "Dichiaro di aver letto ed accettato le ",
      LEGAL_CHECK3_DESC2: "e l’",
      LEGAL_CHECK3_DESC3: "per l’utilizzo della App.",
      LEGAL_CHECK3_LINK1: " Condizioni ",
      LEGAL_CHECK3_LINK2: "di ",
      LEGAL_CHECK3_LINK3: "Licenza",
      LEGAL_CHECK3_LINK4: "Informativa ",
      LEGAL_CHECK3_LINK5: " sulla ",
      LEGAL_CHECK3_LINK6: "Privacy",
      SUBTITLE: "Termini e condizioni"
    }
  },
  STATIC_IMAGES: {
    PROFILE_IMAGE_FEMALE: "https://firebasestorage.googleapis.com/v0/b/thefaculty-a498a.appspot.com/o/static_images%2Fico_profile_female.png?alt=media&token=10b59cbd-d165-4d02-a58d-12d733be0c59",
    PROFILE_IMAGE_MALE: "https://firebasestorage.googleapis.com/v0/b/thefaculty-a498a.appspot.com/o/static_images%2Fico_profile_male.png?alt=media&token=3a6157dc-9d73-45dc-9313-54f1fa61f7a7",
    PROFILE_IMAGE_OTHER: "https://firebasestorage.googleapis.com/v0/b/thefaculty-a498a.appspot.com/o/static_images%2Fico_profile_other.png?alt=media&token=eedba3f3-9f59-42d3-95d8-5866bb689c41"
  },
  TEST: {
    DEFAULT_TOPIC: "Argomento predefinito",
    ERROR_CLONE_NOT_AVAILABLE: "Hai ottenuto tutte le simulazioni\npossibili per questo test!",
    ERROR_SELEXI_SERVER: "Si è verificato un problema nei server di Selexi, riprova più tardi.",
    ERROR_SIMULATION_ALREADY_RUNNING: "Una simulazione è già in corso. Prima di poterne iniziare una nuova devi terminare quella attualmente in corso.",
    ERROR_STARTING_SIMULATION: "Il codice scansionato non è valido.",
    ERROR_TEST_ALREADY_BOUGHT: "Hai già acquistato questa simulazione.\nSblocca le altre!",
    ERROR_TITLE: "Oops!",
    ERROR_UNKNOWN: "Si è verificato un errore, riprova più tardi.",
    ERROR_WHILE_GETTING_DATA: "Si è verificato un errore, riprova più tardi.",
    ERROR_WHILE_SAVING_DATA: "Si è verificato un errore, riprova più tardi.",
    HOME_BOX_TEXT: "Devi affrontare un test di ingresso o esercitarti su una materia specifica? Allenati qui!",
    HOME_BOX_TITLE: "TEST",
    ACTIVE_INSTANCE: {
      BOX_SUBTITLE: "la simulazione è attiva sul computer",
      BOX_TITLE: "Simulazione in corso",
      CONFIRM_BUTTON: "TERMINA LA SIMULAZIONE",
      CONFIRM_DESC: "Sei veramente sicuro di volere terminare forzatamente la simulazione perdendone i risultati?",
      DESC_CONTENT: "[bold]Come terminare la simulazione?[/bold]\n\nDopo aver risposto alle domande fai click sul pulsante [bold]\"Chiudi la simulazione\" in alto a destra del simulatore desktop[/bold]. Successivamente potrai vedere i risultati qui sull'app.",
      DESC_CONTENT2: "[bold]Sei rimasto bloccato?[/bold] \n\nHai accidentalmente chiuso il browser senza aver premuto il pulsante \"Chiudi la simulazione\"?",
      DESC_TITLE: "",
      ERROR_UNKNOWN: "Si è verificato un errore, riprova più tardi.",
      ERROR_WHILE_GETTING_DATA: "Si è verificato un errore, riprova più tardi.",
      NO_CONFIRM_BUTTON: "NO, GRAZIE",
      TERMINATE_BUTTON: "Chiudi forzatamente la simulazione senza salvare i risultati",
      TERMINATE_SUCCESS: "La simulazione è stata interrotta.",
      TITLE: "Simulazione attiva"
    },
    ACTIVE_SIMULATION: {
      CAPTION: "Simulazione attiva su desktop",
      STARTED_AT: "Simulazione in corso iniziata il {START_DATE}"
    },
    ALLENAMENTO_HOME: {
      EMPTY_DESCRIPTION: "Hai bisogno di esercitarti su materie specifiche? \nStiamo sviluppando una nuova funzionalità per te!"
    },
    COURSE_OF_STUDY: {
      BOX_TITLE: "A quale corso di studi vorresti accedere?",
      SEARCH_PLACEHOLDER: "Inserisci il corso di studi",
      TITLE: "Nuovo test"
    },
    ENDED_RESULT: {
      CLONE_INFO_TITLE: "Potrai consultare questi risultati nella sezione 'Risultati' della Palestra.",
      CORRECT_ANSWER_TITLE: "risposte corrette",
      DETAIL_BUTTON: "DETTAGLI",
      HOME_BUTTON: "HOME",
      NON_ANSWER_TITLE: "risposte non date",
      RANKING_UNIT: "º",
      SUBTITLE: "Hai completato correttamente\nla simulazione, ecco i tuoi risultati:",
      TITLE: "Simulazione completata",
      TOTAL_RESULT_TITLE: "In totale hai realizzato",
      UNIT_POINT: "Punti",
      WAYBACK_CUTOFF_COMPLIMENT: "riuscendo ad accedere al corso!\nComplimenti!",
      WAYBACK_CUTOFF_COMPLIMENT2: "saresti riuscito ad accedere al corso!\nComplimenti!",
      WAYBACK_CUTOFF_NOT_COMPLIMENT: "e non saresti stato ammesso!",
      WAYBACK_CUTOFF_NOT_COMPLIMENT2: "non saresti stato ammesso!",
      WAYBACK_RANKING_TITLE: "Se avessi sostenuto questo test,",
      WAYBACK_RANKING_TITLE2: "ti saresti classificato: ",
      WRONG_ANSWER_TITLE: "risposte errate"
    },
    HOME: {
      SUB_TITLE_ALLENAMENTO: "Allenamento",
      SUB_TITLE_RESULT: "Risultati",
      SUB_TITLE_TEST: "Test",
      TITLE: "Test"
    },
    INSTANCE_DETAIL: {
      ANTEPRIMA_POPUP_TITLE: "Anteprima domande",
      BOX_TITLE: "Mettiti alla prova con il test dello scorso anno, potrai scoprire come ti saresti classificato!",
      BOX_TITLE_2_4: "Mettiti alla prova con il test dello scorso anno, potrai scoprire come ti saresti classificato!",
      BOX_TITLE_3_2: "Ottieni una simulazione conforme al tuo test con domande certificate",
      BOX_TITLE_3_3: "Questo test ti permette di confrontarti con la prova dello scorso anno; una volta terminato, scoprirai se saresti passato",
      COINS_DESC_ENOUGH: "Confermi di voler spendere {COINS} gettoni per \nottenere la simulazione \"{TEST_NAME}\"?",
      COINS_DESC_FREE: "Confermi di voler creare gratuitamente la simulazione \"{TEST_NAME}\"?",
      COINS_DESC_NOT_ENOUGH: "Non hai abbastanza gettoni per procedere con \nl'operazione. Acquista subito nuovi gettoni!",
      CREATE_BUTTON: "CREA",
      CREATE_CONFIRM: "CONFERMA",
      CREATE_CONFIRM_CLOSE: "NO, GRAZIE",
      DESC_CONTENT: "Il test consiste in domande a scelta multipla (5 alternative) con una sola risposta esatta. Le \nmaterie che compongono il test sono le seguenti:",
      DESC_TITLE: "Descrizione",
      GOTO_STORE: "VAI AL NEGOZIO",
      INFORMATION: "Questa simulazione coincide con quella ufficiale dell'anno indicato.",
      INFORMATION2: "Domande certificate da ",
      QRCODE_NOT_VALID: "Questo codice QR non è corretto. Scansiona quello che trovi su simulatore.thefacultyapp.com",
      QRCODE_NOT_VALID_TITLE: "Non ci siamo!",
      QUESTIONS_LABEL: "domande",
      QUESTION_LABEL: "domanda",
      SCORE_INFO_CLOSE_BUTTON: "CHIUDI",
      SCORE_INFO_DESCRIPTION: "I punti assegnati alle risposte per queste materie sono:",
      SCORE_INFO_TEXT1: "Risposta corretta: [bold]{CORRECT_ANSWER}[/bold] punti",
      SCORE_INFO_TEXT2: "Risposta errata: [bold]{WRONG_ANSWER}[/bold] punti",
      SCORE_INFO_TEXT3: "Risposta non data: [bold]{NO_ANSWER}[/bold] punti",
      SELEXI_DESC: "Le domande e la sua struttura di questa simulazione ricalcano il più fedelmente possibile ciò che troverai il giorno del test. Le domande sono state verificate e validate da Selexi, società che opera nel settore da oltre 20 anni.",
      TITLE: "Nuovo test",
      VEDI_BUTTON: "Scopri domande"
    },
    INSTANCE_INFO: {
      BOX_SUBDESC: "Entra nel simulatore da computer usando il link sopra. Scansiona poi il codice QR che trovi sulla pagina.",
      BOX_SUBDESC2: "Apri il browser sul tuo computer e scansiona il codice QR che trovi all'indirizzo:",
      CONTINUE_BUTTON: "SCANSIONA",
      DESCRIPTION: "Il test consiste in domande a scelta multipla (5 alternative) con una sola risposta esatta. Le materie che compongono il test sono le seguenti:",
      INFO_DESC: "Questa simulazione coincide al test effettivamente somministrato.",
      TITLE: "Simulazione da computer"
    },
    INSTANCE_MENU: {
      BOX_SUBTITLE: "Scegli la simulazione",
      CREATE_BUTTON: "Crea nuova simulazione",
      CREATE_NEW_BUTTON: "Crea nuova simulazione",
      ITEM_GRATUITA: "Gratuita",
      POINT: "gettoni",
      PRICE_ZERO: "Gratuita!",
      SIMULAZIONE: "Simulazione 1",
      TITLE: "Simulazione"
    },
    NEW_INSTANCE: {
      BOX_SUBTITLE: "Scegli la simulazione",
      BOX_TITLE: "Quale tipo di simulazione vuoi aggiungere?",
      ITEM_GRATUITA: "Gratuita",
      NEW_SIMULAZIONE: "Crea nuova simulazione",
      POINT: "gettoni",
      PRICE_ZERO: "Gratuita!",
      SIMULAZIONE: "Crea simulazione casuale",
      TITLE: "Nuovo test",
      TITLE_FIRST: "Nuovo test",
      TITLE_NOT_FIRST: "Nuova simulazione"
    },
    ONBOARD1: {
      TEXT: "Scegli il [bold]corso di studi[/bold] e l'[bold]università a cui vuoi accedere[/bold]: troverai i test certificati da Selexi, società leader nel settore. Così potrai allenarti con domande specifiche e passare il test d'ingresso!",
      TITLE: "[bold]Allenati per entrare nell'università dei tuoi sogni[/bold]"
    },
    ONBOARD2: {
      TEXT: "Mettiti alla prova con i [bold]test degli anni passati[/bold] per vedere quale posto avresti avuto in graduatoria, oppure prova [bold]simulazioni nuove[/bold] con domande simili a quelle che troverai nel test!",
      TITLE: "[bold]Con il simulatore ti sembrerà proprio il giorno del test[/bold]"
    },
    RESULT_DETAIL: {
      CLOSE_BUTTON: "CHIUDI",
      TITLE: "Risultati simulazione",
      TOTAL_LABEL: "Totale",
      UNIT_POINT: "pt"
    },
    RESULT_HOME: {
      EMPTY_DESCRIPTION: "Non hai effettuato ancora \nsimulazioni o allenamenti.\nInizia subito un test!",
      FILTER_BUTTON_APPLY: "APPLICA",
      FILTER_BUTTON_REMOVE: "RIMUOVI TUTTI I FILTRI",
      FILTER_LABEL_DATE: "Data",
      FILTER_LABEL_MAJOR: "Corso di studi",
      FILTER_LABEL_TYPE: "Tipo",
      FILTER_TEXT: "Filtri",
      FILTER_VALUE_DATE: "Seleziona data",
      FILTER_VALUE_MAJOR: "Seleziona corso di studi",
      FILTER_VALUE_TYPE: "Seleziona tipologia",
      SIMULATION: "Simulazione",
      TITLE: "Risultati",
      FILTER_TYPES: {
        CLONE: "Simulazioni",
        WAYBACK: "Test anni precedenti"
      }
    },
    RESULT_QUESTION: {
      TITLE: "Domanda n°{QUESTION_NUMBER}"
    },
    SELECT_UNIVERSITY: {
      BOX_TITLE: "A quale università vorresti accedere?",
      ERROR_UNKNOWN: "Si è verificato un errore imprevisto. Riprova più tardi.",
      ERROR_WHILE_GETTING_DATA: "Si è verificato un errore imprevisto. Riprova più tardi.",
      SEARCH_PLACEHOLDER: "Inserisci università",
      TITLE: "Nuovo test"
    },
    TEST_SCREEN: {
      ALLENAMENTO: "ALLENAMENTO",
      ALLENAMENTO_MESSAGE: "Questa funzionalità sarà presto disponibile!",
      CREATE_NEW_BUTTON: "Crea nuovo test",
      EMPTY_DESCRIPTION: "Non hai effettuato ancora simulazioni o allenamenti. Inizia subito un test!",
      RESULT: "RISULTATI",
      SIMULATE: "SIMULAZIONE",
      SUCCESS_CREATED: "Nuova simulazione!",
      SUCCESS_CREATED_TEST: "Nuovo test!"
    }
  },
  WALLET: {
    ERROR_UNKNOWN: "Si è verificato un errore imprevisto. Riprova più tardi.",
    ERROR_WHILE_GETTING_DATA: "Si è verificato un errore imprevisto. Riprova più tardi.",
    MAIN: {
      BUY: "ACQUISTA",
      DESC_ON_EMPTY: "Non hai ancora ottenuto dei\ngettoni. Gioca alle sfide o\nacquistali qui",
      ERROR_GETTING_COINS_PACKETS: "Si è verificato un errore durante il caricamento dei pacchetti. Riprova più tardi.",
      ERROR_GETTING_COINS_TRANSACTIONS: "Si è verificato un errore durante il caricamento delle ultime transazioni. Riprova più tardi.",
      ERROR_GETTING_PURCHASE_TRANSACTIONS: "Si è verificato un errore durante il caricamento delle ultime transazioni. Riprova più tardi.",
      TITLE: "Borsellino",
      ITEM: {
        DATE: "Data",
        DESCRIPTION: "Causale",
        FREE: "GRATIS",
        QUANTITY: "Quantità"
      }
    },
    SHOP: {
      COINS_TAB_TITLE: "Gettoni",
      HISTORY_TAB_TITLE: "Storico",
      TITLE: "Negozio",
      CANNOT_BUY_PRODUCT: {
        MESSAGE: "Questo pacchetto non è al momento acquistabile, riprova più tardi.",
        TITLE: "Attenzione"
      },
      SUCCESSFULL_TRANSACTION: {
        MESSAGE: "L'acquisto è stato completato con successo! Riceverai una email con il riepilogo del tuo acquisto appena effettuato.",
        TITLE: "Grazie!"
      },
      TRANSACTION_ERROR: {
        MESSAGE: "Purtroppo l'acquisto non è andato a buon fine, contattaci su assistenza@thefaculty.it.",
        TITLE: "Attenzione"
      }
    },
    SHOP_COINS: {
      DESC: "Quale pacchetto gettoni vuoi acquistare?"
    },
    SHOP_HISTORY: {
      DESC_ON_EMPTY: "Non hai ancora acquistato dei\ngettoni in app: qui vedrai tutte\nle transazioni.",
      GET_COINS: "OTTIENI GETTONI",
      RECENT_FIRST: "Dal più recente",
      ITEM: {
        DATE: "Data",
        PACKET_NAME: "Acquisto",
        PRICE: "Prezzo"
      }
    }
  }
};