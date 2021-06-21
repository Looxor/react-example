import { Observable, useViewModel, ViewModelBase } from "../../_CommonModels/ViewModelBase";
import BestOf from "../_Models/BestOf";
import { delay } from "../../../utils/misc/Timer";
import { getCurrentISOTime } from "../../../utils/misc/Time";
import BestOfConstants from "../_Models/BestOfConstants";
import { routes } from "../../../navigation/rootNavigation/navigation.constants";
import { CallServerPromise } from "../../../utils/app/CallServer";
import standardFunctions from "../../../utils/app/StandardFunctions";
import { colors, sounds, strings } from "../../../config";
import Question from "../_Models/Question";
import { UserData } from "../../../config/constants";
import { HapticFeedbackTypes } from "react-native-haptic-feedback";
import InAppActionPopover from "../../../components/InAppActionPopover";
import { Platform } from "react-native";
import { Overlay } from "teaset";
import EventCenter from "../../../utils/misc/EventCenter";
import NavigationService from "../../../utils/app/NavigationService";

class QuestionViewModel extends ViewModelBase {
  question: Question;
  answerable: boolean = false;
  answering: boolean = false;
  currentTime: any;
  isInPreviewTime: boolean = false;
  questionPollingInterval: any;
  answeredMoment: number;
  answerClickedMoment: number;
  temporaryScore: number;
  correctAnswerNumber: number = -1;
  isAnswered: boolean = false;
  gGameTimeoutId: number = 0;
  userName: string;
  isAnsweredCorrectly: boolean = false;
  loading: boolean = false;
  markDescription: string = '';
  timeTickingTimeoutId: ReturnType<typeof setTimeout>;

  initValues() {
    this.loading = false;
    this.userName = UserData.getUserData().nickname;
    BestOf.clearAnsweredQuestion();
    this.question = BestOf.question;
    this.answerable = false;
    this.answering = false;
    this.answerClickedMoment = null;
    this.temporaryScore = null;
    this.isInPreviewTime = false;
    this.currentTime = null;
    this.correctAnswerNumber = -1;
    this.isAnswered = false;
    this.isAnsweredCorrectly = false;
    this.gGameTimeoutId = 0;
    this.markDescription = '';
    this.stopQuestionPolling();
  }

  resetValues() {
    this.loading = false;
    this.question = undefined;
    this.answerable = false;
    this.answering = false;
    this.answerClickedMoment = null;
    this.temporaryScore = null;
    this.isInPreviewTime = false;
    this.currentTime = null;
    this.correctAnswerNumber = -1;
    this.isAnswered = false;
    this.isAnsweredCorrectly = false;
    this.gGameTimeoutId = 0;
    this.markDescription = '';
    this.stopQuestionPolling();
  }

  async onCloseHandler() {
    await InAppActionPopover().show({
      navigation: this.props.navigation,
      title: strings.BESTOF2.QUESTION_SCREEN.LEAVE_CONFIRM_POPUP.TITLE,
      description: strings.BESTOF2.QUESTION_SCREEN.LEAVE_CONFIRM_POPUP.MESSAGE,
      action: 'LEAVE_POPUP',
      negativeLabel:
        strings.BESTOF2.QUESTION_SCREEN.LEAVE_CONFIRM_POPUP.POSITIVE_BUTTON,
      action_title:
        strings.BESTOF2.QUESTION_SCREEN.LEAVE_CONFIRM_POPUP.NEGATIVE_BUTTON,
      actionFunction: async () => {},
      negativeActionFunction: async () => {
        this.breakWaitingWhileGameTimeout.call(this);
        this.stopQuestionPolling.call(this);
        await CallServerPromise.leave_bestof_v2(BestOf.bestof_data.bestof_id);
        EventCenter.trigger('GameFinished');
        // NavigationService.reset({index: 1});
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
  }

  startPreview(updateView = false) {
    this.isInPreviewTime = true;
    updateView && this.updateView();
  }

  stopPreview(updateView = false) {
    this.isInPreviewTime = false;
    updateView && this.updateView();
  }

  makeAnswerable(answerable: true | false, updateView = false) {
    this.answerable = answerable;
    updateView && this.updateView();
  }

  async waitWhilePreviewTime() {
    const currentISOTime = +getCurrentISOTime();
    const diffTime =
      +new Date(BestOf.question.start_date) -
      currentISOTime +
      +BestOfConstants.get('question_preview_time') * 1000;
    await delay(diffTime);
  }

  async waitWhileGameTimeout(updateView = true) {
    const _timeout = +BestOf.question.timeout * 1000 + 1200;

    //5 secondi prima che il tempo scada faccio partire il suono MATCH_TIME_TICKING
    this.timeTickingTimeoutId = setInterval(() => {
      standardFunctions.play_sound_effect(sounds.BESTOFS.MATCH_TIME_TICKING);
    }, _timeout - 5 * 1000);

    await delay(_timeout, timeoutId => {
      this.gGameTimeoutId = timeoutId;
    });
  }

  gotoMatchResultScreen() {
    this.temporaryScore = null;
    standardFunctions.play_sound_effect(sounds.BESTOFS.WHOOSH);
    NavigationService.replace(routes.BESTOF2_MATCH_RESULT);
  }

  gotoFinalResultScreen() {
    standardFunctions.play_sound_effect(sounds.BESTOFS.WHOOSH);
    NavigationService.replace(routes.BESTOF2_FINAL_RESULT);
  }

  startQuestionPolling() {
    this.questionPollingInterval = setInterval(async () => {
      try {
        const request = await CallServerPromise.get_bestof_data_v2(
          BestOf.bestof_data.bestof_id,
        );
        if (request.success && request.data) {
          BestOf.saveAnsweredQuestion();
          BestOf.set(request.data);
        }
      } catch (e) {}
    }, BestOfConstants.get('question_polling_time') * 1000);
  }

  stopQuestionPolling() {
    clearInterval(this.questionPollingInterval);
  }

  recordAnswerStartMoment() {
    this.answeredMoment = +new Date();
  }

  getAnswerTime() {
    this.answerClickedMoment = Math.round(
      (+new Date() - this.answeredMoment) / 1000,
    );
    this.temporaryScore =
      BestOfConstants.scores_table[
        Math.min(
          Math.floor(
            (this.answerClickedMoment / BestOf.question.timeout) *
              BestOfConstants.scores_table.length,
          ),
          BestOfConstants.scores_table.length - 1,
        )
      ];
    return this.answerClickedMoment;
  }

  async onSelectAnswer(answer) {
    this.answering = true;
    this.setLoading(true);
    try {
      const overlay_question_image = Observable.getReduxValue(
        'overlay_question_image',
      );
      if (
        overlay_question_image &&
        overlay_question_image !== '' &&
        Object.keys(overlay_question_image).length === 0
      ) {
        Overlay.hide(overlay_question_image, true);
      }

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
      const {answer_number} = answer;
      const answerData = {
        bestof_id: BestOf.bestof_data.bestof_id,
        question_number: BestOf.question.question_number,
        answer_number,
        answer_time: this.getAnswerTime(),
      };
      this.makeAnswerable(false, true);
      const request: any = await CallServerPromise.send_bestof_answer_v2(
        answerData,
      );

      if (request.success && request.data) {
        this.isAnswered = true;
        this.answering = false;
        this.correctAnswerNumber = request.data.correct_answer;
        this.isAnsweredCorrectly =
          answer_number === request.data.correct_answer;
        this.updateView();

        if (answer_number === request.data.correct_answer) {
          let type: HapticFeedbackTypes =
            Platform.OS === 'android' ? 'impactLight' : 'impactHeavy';
          standardFunctions.play_sound_effect(
            sounds.BESTOFS.MATCH_CORRECT_ANSWER,
          );
          standardFunctions.play_vibration_effect(type);
        } else {
          standardFunctions.play_sound_effect(
            sounds.BESTOFS.MATCH_WRONG_ANSWER,
          );
          standardFunctions.play_vibration_effect('notificationError');
        }

        await delay(100);
        // save old-answered question as temp in order to use it in result screen
        BestOf.saveAnsweredQuestion();
        BestOf.set(request.data);
        this.onAnswerSuccess();
      } else {
        console.log(
          'ERROR ANSWERING 1: ',
          UserData.getUserData().nickname,
          request.error,
          answerData,
        );
        if (
          request.error !== 'conflict detected' &&
          request.error !== 'question not started'
        ) {
          await standardFunctions.show_alert_async(
            strings.OTHER.WARNING,
            strings.BESTOF2.QUESTION_SCREEN.FAILED_TO_ANSWER,
          );
        } else if (request.error === 'conflict detected') {
          await standardFunctions.show_alert_async(
            strings.OTHER.WARNING,
            strings.BESTOF2.QUESTION_SCREEN.FAILED_TO_ANSWER_CONFLICT,
          );
        }
        this.makeAnswerable(true, true);
      }
    } catch (e) {
      const {answer_number} = answer;
      console.log(
        'ERROR ANSWERING 2: ',
        UserData.getUserData().nickname,
        e,
        answer_number,
        BestOf.bestof_data.bestof_id,
      );
      this.setLoading(false);
      this.makeAnswerable(true, true);
    }
  }

  async getMarkDescription(mark) {
    if (mark !== '-1') {
      const requestQuestionMark: any =
        await CallServerPromise.get_mark_description(mark);
      if (requestQuestionMark.success) {
        this.markDescription = requestQuestionMark.data
          ? requestQuestionMark.data.text
          : '';
        this.updateView();
      }
    }
  }

  setLoading(loading) {
    this.loading = loading;
    this.updateView();
  }

  async onAnswerSuccess() {
    this.breakWaitingWhileGameTimeout();
    // Stop question polling
    this.stopQuestionPolling();

    await delay(1000);
    this.resetValues();

    BestOf.saveRemainingTime();
    await delay(BestOfConstants.get('correct_answer_time') * 1000);
    this.gotoMatchResultScreen();
  }

  breakWaitingWhileGameTimeout() {
    clearInterval(this.gGameTimeoutId);
    clearInterval(this.timeTickingTimeoutId);
  }

  async startGame() {
    // Init current question number
    BestOf.setCurrentQuestionNumber();
    // Start preview, Wait for preview time
    this.startPreview();
    this.makeAnswerable(false, true);
    await this.waitWhilePreviewTime();
    this.recordAnswerStartMoment();

    // Stop preview, make answer items enable, start polling
    this.stopPreview();
    // Start the answering
    // now you can start answering
    this.makeAnswerable(true, true);
    this.startQuestionPolling();
    await this.waitWhileGameTimeout();

    // if not answered yet, send answer (-1)
    if (!this.isAnswered) {
      await this.onSelectAnswer({answer_number: -1});
    }
  }

  componentDidMount() {
    // BestOf.set(demoBestOfs[0]);
    this.initValues();
    this.startGame();
  }

  componentWillUnmount() {
    this.resetValues();
  }
}

export default useViewModel(new QuestionViewModel());
