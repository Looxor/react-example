import { Observable, useViewModel, ViewModelBase } from "../../_CommonModels/ViewModelBase";
import BestOf from "../_Models/BestOf";
import { StackActions } from "@react-navigation/native";
import { routes } from "../../../navigation/rootNavigation/navigation.constants";
import Question from "../_Models/Question";
import BestOfConstants from "../_Models/BestOfConstants";
import { CallServerPromise } from "../../../utils/app/CallServer";
import { getCurrentISOTime } from "../../../utils/misc/Time";
import PushNotification from "../../../utils/app/PushNotification";
import { zlib_decompress } from "../../../utils/misc/ZLib";
import InAppActionPopover from "../../../components/InAppActionPopover";
import { colors, sounds, strings } from "../../../config";
import EventCenter from "../../../utils/misc/EventCenter";
import { Overlay } from "teaset";
import standardFunctions from "../../../utils/app/StandardFunctions";
import NavigationService from "../../../utils/app/NavigationService";

class MatchResultViewModel extends ViewModelBase {
  loaded: boolean = false;
  componentLoadedAt: number;
  gameUser1: any;
  gameUser2: any;
  scores: Array<any>;
  avgScore: any;
  currentQuestionNumber: number = 0;
  totalQuestionsCount: number = 0;
  answeredQuestion: Question;
  timeout: number = 0;

  isWon: boolean;
  isLost: boolean;
  meIsUser1: boolean;
  opponentIsAnswered: boolean = false;
  questionPollingInterval: any = 0;

  unsubscribeNotif: any;

  disappear: boolean;

  loadData() {
    // BestOf.set(demoBestOfs[0]);
    if (BestOf) {
      this.gameUser1 = BestOf.getUser1();
      this.gameUser2 = BestOf.getUser2();
      this.meIsUser1 = BestOf.isUser1();
      this.scores = BestOf.getScores();
      this.avgScore = BestOf.getAvgScore();
      this.totalQuestionsCount = BestOf.getTotalQuestionsCount();
      this.answeredQuestion = BestOf.getAnsweredQuestion();
      this.isWon = BestOf.isWon();
      this.isLost = BestOf.isLost();
      this.loaded = true;
      this.disappear = false;
    }
  }

  async onCloseHandler(askConfirm = true) {
    if (askConfirm) {
      await InAppActionPopover().show({
        navigation: this.props.navigation,
        title: strings.BESTOF2.QUESTION_SCREEN.LEAVE_CONFIRM_POPUP.TITLE,
        description:
          strings.BESTOF2.QUESTION_SCREEN.LEAVE_CONFIRM_POPUP.MESSAGE,
        action: 'LEAVE_POPUP',
        negativeLabel:
          strings.BESTOF2.QUESTION_SCREEN.LEAVE_CONFIRM_POPUP.POSITIVE_BUTTON,
        action_title:
          strings.BESTOF2.QUESTION_SCREEN.LEAVE_CONFIRM_POPUP.NEGATIVE_BUTTON,
        actionFunction: async () => {},
        negativeActionFunction: async () => {
          await CallServerPromise.leave_bestof_v2(BestOf.bestof_data.bestof_id);
          this.stopQuestionPolling.call(this);
          this.unsubscribeNotif && this.unsubscribeNotif();
          EventCenter.trigger('GameFinished');
          NavigationService.goBack();
        },
        buttonsColumn: true,
        smallIcon: require('../../../../assets/images/icons/icn_alert_bestofs.png'),
        extraTitleStyle: {color: colors.BESTOF2.BG1},
        extraDescriptionStyle: {color: colors.BESTOF2.BG1},
        extraMainButtonStyle: {
          backgroundColor: colors.WHITE,
          width: '92%',
          height: 48,
          borderRadius: 15,
          alignSelf: 'center',
          shadowColor: colors.lightGray,
          shadowOpacity: 0.4,
          shadowOffset: {width: 0, height: 0},
          shadowRadius: 5,
          elevation: 2,
        },
        extraNegativeButtonStyle: {
          backgroundColor: colors.BESTOF2.BG1,
          width: '92%',
          height: 48,
          borderRadius: 15,
          alignSelf: 'center',
          shadowColor: colors.lightGray,
          shadowOpacity: 0.4,
          shadowOffset: {width: 0, height: 0},
          shadowRadius: 5,
          elevation: 2,
        },
        extraMainButtonTextStyle: {color: colors.BESTOF2.BG1},
        extraNegativeButtonTextStyle: {color: colors.WHITE},
      });
    } else {
      await Observable.setReduxValue('is_to_check_max_coins', true);
      standardFunctions.add_firebase_event_log('bestofs', 'x_prsd');
      EventCenter.trigger('GameFinished');
      NavigationService.goBack();
    }
  }

  onBothPlayersAnswered() {
    this.loadData();
    this.opponentIsAnswered = true;
    const current_question_number = BestOf.getCurrentQuestionNumber();
    const nextStartDate = BestOf.getNextStartDate(current_question_number);
    const currentTime = getCurrentISOTime();

    this.timeout = Math.max(1, (+nextStartDate - +currentTime) / 1000);

    const elapsedTime = (+new Date() - this.componentLoadedAt) / 1000;
    if (BestOf.isLastQuestion() && elapsedTime > 1) {
      this.timeout = 3;
    }

    this.updateView();
  }

  opponentNotAnsweredYet() {
    this.opponentIsAnswered = false;
    this.timeout = BestOf.remaining_time;
    this.updateView();
    this.startQuestionPolling();
  }

  startQuestionPolling() {
    this.stopQuestionPolling();
    this.unsubscribeNotif = PushNotification.registerOnMessageListener(
      this.whenReceivedDataPacket,
    );
    this.questionPollingInterval = setInterval(async () => {
      try {
        const request = await CallServerPromise.get_bestof_data_v2(
          BestOf.bestof_data.bestof_id,
        );
        if (request.success && request.data) {
          BestOf.set(request.data);
          if (BestOf.isBothPlayersAnswered()) {
            this.stopQuestionPolling();
            this.onBothPlayersAnswered();
          }
        }
      } catch (e) {}
    }, BestOfConstants.get('question_polling_time') * 1000);
  }

  stopQuestionPolling() {
    clearInterval(this.questionPollingInterval);
    // this.unsubscribeNotif && this.unsubscribeNotif();
  }

  gotoNextQuestion() {
    if (BestOf.isBothPlayersAnswered()) {
      const overlay_leave_popup = Observable.getReduxValue(
        'overlay_leave_popup',
      );
      if (
        overlay_leave_popup &&
        overlay_leave_popup !== '' &&
        Object.keys(overlay_leave_popup).length === 0
      ) {
        Overlay.hide(overlay_leave_popup, true);
      }
      if (BestOf.question !== null && BestOf.isNotLastQuestion()) {
        standardFunctions.play_sound_effect(
          sounds.BESTOFS.MATCH_QUESTION_FADE_IN,
        );
        this.props.navigation.dispatch(
          StackActions.replace(routes.BESTOF2_QUESTION),
        );
      } else if (BestOf.isLastQuestion()) {
        if (!BestOf.isWon() && !BestOf.isLost()) {
          standardFunctions.play_sound_effect(sounds.BESTOFS.MATCH_DRAW);
        } else if (BestOf.isWon()) {
          standardFunctions.play_sound_effect(sounds.BESTOFS.MATCH_WON);
        } else if (BestOf.isLost()) {
          standardFunctions.play_sound_effect(sounds.BESTOFS.MATCH_LOST);
        }
        this.props.navigation.dispatch(
          StackActions.replace(routes.BESTOF2_FINAL_RESULT),
        );
      }
    }
  }

  setDisappear() {
    this.disappear = true;
    this.updateView();
  }

  async whenReceivedDataPacket(message) {
    if (
      message &&
      message.data &&
      (message.data.event === 'next_question_bestof' ||
        message.data.event === 'finished_bestof')
    ) {
      const decoded_data = JSON.parse(
        zlib_decompress(message.data.compressed_data),
      );

      if (decoded_data.bestof_data.bestof_id !== BestOf.bestof_data.bestof_id)
        return;
      BestOf.set(decoded_data);
      if (BestOf.isBothPlayersAnswered()) {
        this.stopQuestionPolling();
        this.onBothPlayersAnswered();
      }
    }
  }

  componentDidMount() {
    this.stopQuestionPolling();
    this.disappear = false;
    this.opponentIsAnswered = false;
    this.componentLoadedAt = +new Date();
    this.loadData();
    if (BestOf.isBothPlayersAnswered()) {
      this.onBothPlayersAnswered();
    } else {
      this.opponentNotAnsweredYet();
    }
  }

  componentWillUnmount() {
    this.stopQuestionPolling();
    this.unsubscribeNotif && this.unsubscribeNotif();
  }
}

export default useViewModel(new MatchResultViewModel());
