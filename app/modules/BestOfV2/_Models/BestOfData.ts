import Question from "./Question";
import UserBestOfSubject from "./UserBestOfSubject";
import profile_image from "../../../utils/misc/ProfileImage";

class BestOfData {
  user_id: string;
  bestof_id: string;
  faculty_id: string;
  is_bot: boolean;
  last_update_date: string;
  ongoing: boolean;
  questions: Array<Question>;
  start_date: string;
  user1_bestof_subjects: Array<UserBestOfSubject>;
  user1_faculty_id: string;
  user1_faculty_image_url: string;
  user1_faculty_name: string;
  user1_id: string;
  user1_avg_score: number;
  user1_bestof_scoreboard_avg_score: number;
  user1_nickname: string;
  user1_profile_image_url: string;
  user1_university_id: string;
  user1_university_name: string;
  user2_bestof_subjects: Array<UserBestOfSubject>;
  user2_faculty_id: string;
  user2_faculty_image_url: string;
  user2_faculty_name: string;
  user2_id: string;
  user2_avg_score: number;
  user2_bestof_scoreboard_avg_score: number;
  user2_nickname: string;
  user2_profile_image_url: string;
  user2_university_id: string;
  user2_university_name: string;
  winner_name: string;
  version: number;

  constructor(params) {
    if (params) {
      this.user_id = params.user_id;
      this.bestof_id = params.bestof_id;
      this.faculty_id = params.faculty_id;
      this.is_bot = params.is_bot;
      this.last_update_date = params.last_update_date;
      this.ongoing = params.ongoing;
      this.start_date = params.start_date;
      this.questions = params.questions
        ? params.questions.map(question => new Question(question))
        : [];
      this.user1_bestof_subjects = params.user1_bestof_subjects
        ? params.user1_bestof_subjects.map(
            subject => new UserBestOfSubject(subject),
          )
        : [];
      this.user1_faculty_id = params.user1_faculty_id;
      this.user1_faculty_image_url = params.user1_faculty_image_url
        ? params.user1_faculty_image_url
        : '';
      this.user1_faculty_name = params.user1_faculty_name;
      this.user1_id = params.user1_id;
      this.user1_avg_score = params.user1_avg_score;
      this.user1_bestof_scoreboard_avg_score =
        params.user1_bestof_scoreboard_avg_score;
      this.user1_nickname = params.user1_nickname;
      this.user1_profile_image_url = params.user1_profile_image_url
        ? params.user1_profile_image_url
        : profile_image['O'];
      this.user1_university_id = params.user1_university_id;
      this.user1_university_name = params.user1_university_name;
      this.user2_bestof_subjects = params.user2_bestof_subjects
        ? params.user2_bestof_subjects.map(
            subject => new UserBestOfSubject(subject),
          )
        : [];
      this.user2_faculty_id = params.user2_faculty_id;
      this.user2_faculty_image_url = params.user2_faculty_image_url
        ? params.user2_faculty_image_url
        : '';
      this.user2_faculty_name = params.user2_faculty_name;
      this.user2_id = params.user2_id;
      this.user2_avg_score = params.user2_avg_score;
      this.user2_bestof_scoreboard_avg_score =
        params.user2_bestof_scoreboard_avg_score;
      this.user2_nickname = params.user2_nickname;
      this.user2_profile_image_url = params.user2_profile_image_url
        ? params.user2_profile_image_url
        : profile_image['O'];
      this.user2_university_id = params.user2_university_id;
      this.user2_university_name = params.user2_university_name;
      this.winner_name = params.winner_name;
      this.version = params.version;
    }
  }

  getUser1() {
    return {
      bestof_subjects: this.user1_bestof_subjects,
      faculty_id: this.user1_faculty_id,
      faculty_image_url: this.user1_faculty_image_url,
      faculty_name: this.user1_faculty_name,
      user_id: this.user1_id,
      nickname: this.user1_nickname,
      profile_image_url: this.user1_profile_image_url,
      university_id: this.user1_university_id,
      university_name: this.user1_university_name,
      bestof_scoreboard_avg_score: this.user1_bestof_scoreboard_avg_score,
    };
  }

  getUser2() {
    return {
      bestof_subjects: this.user2_bestof_subjects,
      faculty_id: this.user2_faculty_id,
      faculty_image_url: this.user2_faculty_image_url,
      faculty_name: this.user2_faculty_name,
      user_id: this.user2_id,
      nickname: this.user2_nickname,
      profile_image_url: this.user2_profile_image_url,
      university_id: this.user2_university_id,
      university_name: this.user2_university_name,
    };
  }

  isUser1() {
    return this.user_id === this.user1_id;
  }

  isUser2() {
    return this.user_id === this.user2_id;
  }

  getScores() {
    if (this.isUser1() || this.isUser2()) {
      return this.questions
        ? this.questions.map(question => ({
            gameUser1Score: question.user1_score,
            gameUser2Score: question.user2_score,
            subjectImageUrl: question.subject_image_url,
          }))
        : [];
    } else {
      return [];
    }
  }

  getAvgScore() {
    let gameUser1Score = 0;
    let gameUser2Score = 0;
    if (this.isUser1() || this.isUser2()) {
      gameUser1Score = this.user1_avg_score;
      gameUser2Score = this.user2_avg_score;
    }
    return {
      gameUser1Score,
      gameUser2Score,
    };
    /*
    const scores = this.getScores();
    let gameUser1Score = 0;
    let gameUser2Score = 0;
    scores.map(score => {
      gameUser1Score += Number(score.gameUser1Score || 0);
      gameUser2Score += Number(score.gameUser2Score || 0);
    });
    return {
      gameUser1Score,
      gameUser2Score,
    };*/
  }

  getWinnerName() {
    return this.winner_name;
  }

  isWon() {
    return (
      (this.isUser1() && this.getWinnerName() === 'user1') ||
      (this.isUser2() && this.getWinnerName() === 'user2')
    );
  }

  isLost() {
    return (
      (this.isUser1() && this.getWinnerName() === 'user2') ||
      (this.isUser2() && this.getWinnerName() === 'user1')
    );
  }

  isBothPlayersAnswered(question_number) {
    if (!this.questions) {
      return false;
    } else {
      if (!this.questions[question_number]) {
        return false;
      } else {
        return (
          this.questions[question_number].user1_has_answered === true &&
          this.questions[question_number].user2_has_answered === true
        );
      }
    }
  }

  getTotalQuestionsCount() {
    if (!this.questions) {
      return 0;
    } else {
      return this.questions.length;
    }
  }

  getNextStartDate(question_number) {
    if (this.questions && question_number < this.questions.length - 1) {
      return new Date(this.questions[question_number + 1].start_date);
    } else {
      return new Date();
    }
  }

  getQuestionSummaries() {
    let summaries;
    if (this.questions && this.questions.length > 0) {
      const all_questions_count = this.questions.length;
      summaries = this.questions.map(question =>
        question.getSummary(all_questions_count),
      );
    } else {
      summaries = [];
    }
    return summaries;
  }

  getSummaryUserInfo() {
    return {
      user1: {
        profile_image_url: this.user1_profile_image_url,
        nickname: this.user1_nickname,
      },
      user2: {
        profile_image_url: this.user2_profile_image_url,
        nickname: this.user2_nickname,
      },
    };
  }
}

export default BestOfData;
