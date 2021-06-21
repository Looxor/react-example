import { routes } from "../../../navigation/rootNavigation/navigation.constants";
import { CallServerPromise } from "../../../utils/app/CallServer";
import { strings } from "../../../config";
import standardFunctions from "../../../utils/app/StandardFunctions";
import ContestModel from "./Contest";
import { ANSWER_TYPE } from "./Question";
import BestOfManager from "./BestOfManager";

class ContestManager {
  bestof_id: string;
  contestData: ContestModel;

  showErrorPopup(errorResult) {
    let title = '',
      message = '';
    switch (errorResult.code) {
      case 2:
        title = strings.ALERTS.ERRORS.STANDARD.OOPS;
        message = errorResult.error;
        break;
      case 111:
        title = strings.ALERTS.ERRORS.STANDARD.OOPS;
        message = errorResult.error;
        break;
      default:
        title = strings.ALERTS.ERRORS.STANDARD.OOPS;
        message = strings.ALERTS.CONTEST.ERROR_WHILE_TESTING.MESSAGE;
    }
    return new Promise((resolve, eject) => {
      standardFunctions.show_alert(title, message, true, () => {
        resolve('');
      });
    });
  }

  setBestOfId(bestof_id) {
    this.bestof_id = bestof_id;
  }

  init(contestData) {
    this.contestData = new ContestModel(contestData);
  }

  async goNextQuestion(navigation) {
    this.contestData.question_index++;
    this.contestData.answer_submitted = false;
    if (this.contestData.question_index < this.contestData.questions.length) {
      navigation.replace(routes.BESTOF_QUESTION);
    } else {
      await BestOfManager.finishRound(this.bestof_id, this.contestData.round);
      // @ts-ignore
      global.backHandler && global.backHandler.remove();
      navigation.goBack(null);
      // navigation.dismiss();
      // navigation.navigate(routes.BESTOF_BATTLE);
      // navigation.replace(routes.CONTEST_RESULT);
    }
  }

  async sendContestAnswer(answer_number): Promise<any> {
    try {
      this.contestData.answer_submitted = true;
      const request = await CallServerPromise.send_bestof_answer({
        bestof_id: this.bestof_id,
        round_string: this.contestData.round,
        question_number:
          this.contestData.questions[this.contestData.question_index]
            .question_number,
        answer_number,
      });
      if (request.success) {
        if (request.data.correct_answer === answer_number) {
          this.contestData.questions[this.contestData.question_index].feedback =
            ANSWER_TYPE.CORRECT;
        } else {
          if (answer_number !== -1) {
            this.contestData.questions[
              this.contestData.question_index
            ].feedback = ANSWER_TYPE.WRONG;
          }
        }
        return {
          correct_answer: request.data.correct_answer,
          success: true,
        };
      } else {
        return request;
      }
    } catch (e) {
      return {...e, success: false};
    }
  }

  async restart(navigation) {
    await this.init(navigation);
  }

  parseQuestion = question => {
    const matches = question.match(/([^\$]+)|(\$[^\$]+\$)/gim);
    if (matches) {
      return matches;
    } else return [question];
  };

  getTotalScore = () => {
    return this.contestData.total_score;
  };
}

export default new ContestManager();
