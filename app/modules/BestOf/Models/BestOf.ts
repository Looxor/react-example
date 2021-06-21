import { UserData } from "../../../config/constants";
import { strings } from "../../../config";
import { ANSWER_TYPE } from "./Question";

const ROUNDS_COUNT = 3;
const WIN_STATUS = {
  WON: 1,
  LOST: 2,
  PAREGED: 3,
  UNKNOWN: 4,
};

class BestOf {
  user_id: string = '';
  bestof_id: string = '';
  current_name: string = '';
  dates: any;
  faculty_id: string = '';
  last_update_date: string = '';
  questions: any;
  start_date: string = '';
  user1_id: string = '';
  user1_nickname: string = '';
  user1_profile_image_url: string = '';
  user1_total_score: number = 0;
  user2_id: string = '';
  user2_nickname: string = '';
  user2_profile_image_url: string = '';
  user2_total_score: number = 0;
  version: 0;
  winner_name: string = '';
  totalRound: 3;
  me: any;
  opponent: any;
  data: any;
  auto_terminated: boolean = false;
  rejected: boolean = false;

  constructor(params) {
    this.data = params;
    const {user_id} = UserData.getUserData();
    user_id && (this.user_id = user_id);
    params.bestof_id && (this.bestof_id = params.bestof_id);
    params.current_name && (this.current_name = params.current_name);
    params.dates && (this.dates = params.dates);
    params.faculty_id && (this.faculty_id = params.faculty_id);
    params.last_update_date &&
      (this.last_update_date = params.last_update_date);
    params.questions && (this.questions = params.questions);
    params.start_date && (this.start_date = params.start_date);
    params.user1_id && (this.user1_id = params.user1_id);
    this.user1_nickname = params.user1_nickname || params.user1_nick;
    params.user1_profile_image_url &&
      (this.user1_profile_image_url = params.user1_profile_image_url);
    params.user2_id && (this.user2_id = params.user2_id);
    this.user2_nickname = params.user2_nickname || params.user2_nick;
    params.user2_profile_image_url &&
      (this.user2_profile_image_url = params.user2_profile_image_url);
    params.version && (this.version = params.version);
    params.winner_name && (this.winner_name = params.winner_name);
    params.auto_terminated && (this.auto_terminated = params.auto_terminated);

    params.user1_total_score &&
      (this.user1_total_score = params.user1_total_score);
    params.user2_total_score &&
      (this.user2_total_score = params.user2_total_score);

    params.rejected && (this.rejected = params.rejected);

    if (this.user1_id === this.user_id) {
      this.me = {
        user_id: this.user1_id,
        user_nickname: this.user1_nickname,
        turn: this.current_name === 'user1',
        profile_image_url: this.user1_profile_image_url,
      };
      this.opponent = {
        user_id: this.user2_id,
        user_nickname: this.user2_nickname,
        profile_image_url: this.user2_profile_image_url,
      };
    } else if (this.user2_id === this.user_id) {
      this.me = {
        user_id: this.user2_id,
        user_nickname: this.user2_nickname,
        turn: this.current_name === 'user2',
        profile_image_url: this.user2_profile_image_url,
      };
      this.opponent = {
        user_id: this.user1_id,
        user_nickname: this.user1_nickname,
        profile_image_url: this.user1_profile_image_url,
      };
    } else {
      this.me = {turn: false};
      this.opponent = {};
    }
  }

  getMyImage() {
    if (!this.me) return '';
    return this.me.profile_image_url;
  }

  getOpponentImage() {
    if (!this.opponent) return '';
    return this.opponent.profile_image_url;
  }

  getOpponentName() {
    if (!this.opponent) return strings.BESTOF.BATTLE_SCREEN.NO_OPPONENT_NAME;
    return (
      this.opponent.user_nickname ||
      strings.BESTOF.BATTLE_SCREEN.NO_OPPONENT_NAME
    );
  }

  getTotalRound() {
    return this.totalRound;
  }

  getCurrentRound() {
    if (this.dates && this.dates.round3 && this.dates.round3.user1_start_date)
      return 3;
    else if (
      this.dates &&
      this.dates.round2 &&
      this.dates.round2.user1_start_date
    )
      return 2;
    else if (
      this.dates &&
      this.dates.round1 &&
      this.dates.round1.user1_start_date
    )
      return 1;
    else return 1;
  }

  getMyAnswerResults() {
    if (this.user_id == this.user1_id)
      return this.analyzeRound(this.questions, 'user1');
    else if (this.user_id == this.user2_id)
      return this.analyzeRound(this.questions, 'user2');
    else return [];
  }

  getOpponentAnswerResults() {
    if (this.user_id != this.user1_id)
      return this.analyzeRound(this.questions, 'user1');
    else if (this.user_id != this.user2_id)
      return this.analyzeRound(this.questions, 'user2');
    else return [];
  }

  hasOpponent() {
    return this.opponent && this.opponent.user_id;
  }

  isMyTurn() {
    if (!this.me) return false;
    return this.me.turn;
  }

  getMyScore() {
    if (!this.me) return 0;

    if (this.me.user_id === this.user1_id) return this.user1Score();
    if (this.me.user_id === this.user2_id) return this.user2Score();
    return 0;
  }

  user1Score() {
    return this.getScoreByUserType('user1');
  }

  user2Score() {
    return this.getScoreByUserType('user2');
  }

  getOpponentScore() {
    if (!this.me) return 0;

    if (this.me.user_id !== this.user1_id) return this.user1Score();
    if (this.me.user_id !== this.user2_id) return this.user2Score();
    return 0;
  }

  completedRounds() {
    if (
      this.dates &&
      this.dates.round3 &&
      this.dates.round3.user1_start_date &&
      this.dates.round3.user2_start_date
    ) {
      return 3;
    } else if (
      this.dates &&
      this.dates.round2 &&
      this.dates.round2.user1_start_date &&
      this.dates.round2.user2_start_date
    ) {
      return 2;
    } else if (
      this.dates &&
      this.dates.round1 &&
      this.dates.round1.user1_start_date &&
      this.dates.round1.user2_start_date
    ) {
      return 1;
    } else return 0;
  }

  isAllRoundCompleted() {
    return ROUNDS_COUNT === this.completedRounds();
  }

  isRejected() {
    return this.rejected;
  }

  addMissingData() {
    this.data.user1_profile_image_url = this.user1_profile_image_url;
    this.data.user2_profile_image_url = this.user2_profile_image_url;
  }

  getData() {
    this.addMissingData();
    return this.data;
  }

  getPlayedStatus() {
    return strings.BESTOF.STATUS.PLAYED_WITH.replace(
      '{NAME}',
      this.getOpponentName(),
    );
  }

  getWinStatus() {
    let text = '';
    let winStatus = WIN_STATUS.UNKNOWN;
    if (this.winner_name === 'user1') {
      if (this.user1_id === this.user_id) {
        text = this.auto_terminated
          ? strings.BESTOF.WON_LOST.WON_DEFAULT
          : strings.BESTOF.WON_LOST.WON;
        winStatus = WIN_STATUS.WON;
      } else {
        text = this.auto_terminated
          ? strings.BESTOF.WON_LOST.LOST_DEFAULT
          : strings.BESTOF.WON_LOST.LOST;
        winStatus = WIN_STATUS.LOST;
      }
    } else if (this.winner_name === 'user2') {
      if (this.user2_id === this.user_id) {
        text = this.auto_terminated
          ? strings.BESTOF.WON_LOST.WON_DEFAULT
          : strings.BESTOF.WON_LOST.WON;
        winStatus = WIN_STATUS.WON;
      } else {
        text = this.auto_terminated
          ? strings.BESTOF.WON_LOST.LOST_DEFAULT
          : strings.BESTOF.WON_LOST.LOST;
        winStatus = WIN_STATUS.LOST;
      }
    } else if (this.winner_name === '') {
      text = strings.BESTOF.WON_LOST.PAREGED;
      winStatus = WIN_STATUS.PAREGED;
    }

    if (text.indexOf('{NUM1}') > -1) {
      text = text.replace('{NUM1}', String(this.getMyScore()));
      text = text.replace('{NUM2}', String(this.getOpponentScore()));
    }
    return {winStatus, winStatusText: text};
  }

  isMeWon() {
    return (
      (this.winner_name === 'user1' && this.user1_id === this.user_id) ||
      (this.winner_name === 'user2' && this.user2_id === this.user_id)
    );
  }

  rejectedByMe() {
    return this.rejected && this.isMeLost();
  }

  isMeLost() {
    return !this.isMeWon();
  }

  private analyzeRound = (questions, user_type) => {
    const analyzeAnswer = answer => {
      if (answer) {
        const answered = answer[user_type + '_has_answered'];
        if (!answered) return ANSWER_TYPE.NOT_ANSWERED;
        if (answer[user_type + '_score'] == 0) return ANSWER_TYPE.WRONG;
        if (answer[user_type + '_score'] == 1) return ANSWER_TYPE.CORRECT;
        return ANSWER_TYPE.NOT_ANSWERED;
      } else {
        return ANSWER_TYPE.NOT_ANSWERED;
      }
    };
    return [
      [
        analyzeAnswer(
          questions && questions['round1'] && questions['round1'][0],
        ),
        analyzeAnswer(
          questions && questions['round1'] && questions['round1'][1],
        ),
      ],
      [
        analyzeAnswer(
          questions && questions['round2'] && questions['round2'][0],
        ),
        analyzeAnswer(
          questions && questions['round2'] && questions['round2'][1],
        ),
      ],
      [
        analyzeAnswer(
          questions && questions['round3'] && questions['round3'][0],
        ),
        analyzeAnswer(
          questions && questions['round3'] && questions['round3'][1],
        ),
      ],
    ];
  };

  private getScoreByUserType = user_type => {
    if (user_type === 'user1') return this.user1_total_score;
    if (user_type === 'user2') return this.user2_total_score;
    return 0;
  };
}

export default BestOf;
export {WIN_STATUS};
