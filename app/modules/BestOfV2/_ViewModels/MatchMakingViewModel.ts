import { useViewModel, ViewModelBase } from "../../_CommonModels/ViewModelBase";
import { CallServerPromise } from "../../../utils/app/CallServer";
import BestOf from "../_Models/BestOf";
import BestOfConstants from "../_Models/BestOfConstants";
import BestOfHistory from "../_Models/BestOfHistory";
import { delay } from "../../../utils/misc/Timer";
import { StackActions } from "@react-navigation/native";
// MISSING
import { routes } from "../../../navigation/rootNavigation/navigation.constants";
import PushNotification from "../../../utils/app/PushNotification";
import { zlib_decompress } from "../../../utils/misc/ZLib";
import { sounds } from "../../../config";
import standardFunctions from "../../../utils/app/StandardFunctions";
import NavigationService from "../../../utils/app/NavigationService";
import EventCenter from "../../../utils/misc/EventCenter";

class MatchMakingViewModel extends ViewModelBase {
  gameUser1: any;
  gameUser2: any;
  questions: any;
  searchTime: number;
  searchPollingInterval: any;
  IamInOpponentStatus: boolean;
  loggedUserLeftTheGame: boolean;
  unsubscribeNotif: any;
  opponentEntered: boolean;

  async onCloseHandler() {
    this.loggedUserLeftTheGame = true;
    this.unsubscribeNotif && this.unsubscribeNotif();
    await CallServerPromise.leave_bestof_v2(BestOf.bestof_data.bestof_id);
    BestOf.init();
    this.stopSearchPolling.call(this);
    EventCenter.trigger('GameFinished');
    NavigationService.goBack();
    /*
    await InAppActionPopover().show({
      navigation: this.props.navigation,
      title: strings.BESTOF2.QUESTION_SCREEN.LEAVE_CONFIRM_POPUP.TITLE,
      description: strings.BESTOF2.QUESTION_SCREEN.LEAVE_CONFIRM_POPUP.MESSAGE,
      action: '',
      action_title:
      strings.BESTOF2.QUESTION_SCREEN.LEAVE_CONFIRM_POPUP.POSITIVE_BUTTON,
      actionFunction: async () => {
        const request = await CallServerPromise.leave_bestof_v2(
          BestOf.bestof_data.bestof_id,
        );
        if (request.success) {
          this.stopSearchPolling();
          this.unsubscribeNotif && this.unsubscribeNotif();
          this.props.navigation.dismiss();
        }
      },
    });
    */
  }

  // @params:
  // userType : 'user1' or 'user2'
  getPlayerByType(userType) {
    const bestof_data = BestOf.bestof_data;
    const user_id = bestof_data[userType + '_id'];
    return user_id
      ? {
          faculty_id: bestof_data[userType + '_faculty_id'],
          faculty_image_url: bestof_data[userType + '_faculty_image_url'],
          faculty_name: bestof_data[userType + '_faculty_name'],
          user_id,
          nickname: bestof_data[userType + '_nickname'],
          profile_image_url: bestof_data[userType + '_profile_image_url'],
          university_id: bestof_data[userType + '_university_id'],
          university_name: bestof_data[userType + '_university_name'],
          avg_score: bestof_data[userType + '_bestof_scoreboard_avg_score'],
          subjects: bestof_data[userType + '_bestof_subjects'],
        }
      : null;
  }

  loadLoggedPlayer() {
    if (BestOf.isUser1()) {
      this.gameUser1 = this.getPlayerByType('user1');
      this.gameUser2 = null;
      this.updateView();
    } else if (BestOf.isUser2()) {
      this.gameUser1 = this.getPlayerByType('user2');
      this.gameUser2 = null;
      this.IamInOpponentStatus = true;
      this.updateView();
    }
  }

  loadOpponentPlayer() {
    if (BestOf.hasValidQuestion()) {
      if (BestOf.isUser1()) {
        this.gameUser2 = this.getPlayerByType('user2');
        this.questions = BestOf.bestof_data['questions'];
        this.updateView();
      } else if (BestOf.isUser2()) {
        this.gameUser2 = this.getPlayerByType('user1');
        this.questions = BestOf.bestof_data['questions'];
        this.updateView();
      }
    }
  }

  async waitWhilePresentationTime() {
    await delay(BestOfConstants.get('presentation_time') * 1000);
  }

  gotoQuestionScreen() {
    if (this.loggedUserLeftTheGame) return;
    standardFunctions.play_sound_effect(sounds.BESTOFS.MATCH_QUESTION_FADE_IN);
    this.props.navigation.dispatch(
      StackActions.replace(routes.BESTOF2_QUESTION),
    );
  }

  async onOpponentEntered() {
    if (this.opponentEntered) return;
    this.opponentEntered = true;
    this.loadOpponentPlayer();
    await this.waitWhilePresentationTime();
    this.gotoQuestionScreen();
  }

  startSearchPolling() {
    this.stopSearchPolling();
    this.unsubscribeNotif = PushNotification.registerOnMessageListener(
      message => {
        this.whenReceivedDataPacket.call(this, message);
      },
    );
    this.searchPollingInterval = setInterval(async () => {
      try {
        const request = await CallServerPromise.get_bestof_data_v2(
          BestOf.bestof_data.bestof_id,
        );
        if (
          request.success &&
          request.data &&
          request.data.bestof_data.user2_id
        ) {
          BestOf.set(request.data);
          if (BestOf.hasValidQuestion()) {
            this.stopSearchPolling();
            await BestOfHistory.set(request.data);
            await this.onOpponentEntered();
          }
        }
      } catch (e) {}
    }, BestOfConstants.get('search_polling_time') * 1000);
  }

  stopSearchPolling() {
    clearInterval(this.searchPollingInterval);
    this.unsubscribeNotif && this.unsubscribeNotif();
  }

  onTimeout() {
    if (this.gameUser2 === null) {
      // this.props.navigation.dismiss();
    }
  }

  async whenReceivedDataPacket(message) {
    if (
      message &&
      message.data &&
      message.data.event === 'user_joined_bestof'
    ) {
      if (this.opponentEntered) return;
      const decoded_data = JSON.parse(
        zlib_decompress(message.data.compressed_data),
      );
      if (decoded_data.bestof_data.bestof_id !== BestOf.bestof_data.bestof_id)
        return;
      BestOf.set(decoded_data);
      if (BestOf.hasValidQuestion()) {
        this.stopSearchPolling();
        this.onOpponentEntered();
      }
    }
  }

  componentDidMount() {
    this.loggedUserLeftTheGame = false;
    this.gameUser2 = null;
    this.opponentEntered = false;
    this.updateView();
    this.searchTime = BestOfConstants.get('search_time');
    this.loadLoggedPlayer();
    if (this.IamInOpponentStatus) {
      // when you joined as opponent
      if (BestOf.hasValidQuestion()) {
        this.onOpponentEntered();
      } else {
        this.startSearchPolling();
      }
    } else {
      // when you start a new game as logged user
      this.startSearchPolling();
    }
  }

  componentWillUnmount() {
    this.opponentEntered = false;
    this.stopSearchPolling();
  }
}

export default useViewModel(new MatchMakingViewModel());
