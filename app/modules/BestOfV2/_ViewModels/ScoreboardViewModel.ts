import { Observable, useViewModel, ViewModelBase } from "../../_CommonModels/ViewModelBase";
import { abortController, CallServerPromise } from "../../../utils/app/CallServer";
import standardFunctions from "../../../utils/app/StandardFunctions";
import { strings } from "../../../config";

export type ScoreboardDirection = 'top' | 'bottom' | '';

class ScoreboardViewModel extends ViewModelBase {
  scoreboard: Array<{}>;
  next_data: any = {};
  loading: boolean = true;
  direction: ScoreboardDirection = '';

  setNextData(next_data) {
    if (next_data.top) {
      !this.next_data.top && (this.next_data.top = {});
      this.next_data.top.redis_score = next_data.top.redis_score;
      next_data.top.sorting &&
        (this.next_data.top.sorting = next_data.top.sorting);
    }
    if (next_data.bottom) {
      !this.next_data.bottom && (this.next_data.bottom = {});
      this.next_data.bottom.redis_score = next_data.bottom.redis_score;
      next_data.bottom.sorting &&
        (this.next_data.bottom.sorting = next_data.bottom.sorting);
    }
  }

  queryMoreMessages: (n: number) => Promise<Array<{nickname}>> = n => {
    return new Promise(resolve => {
      const newMessages: Array<{nickname}> = [];

      for (let i = 0; i < n; i++) {
        newMessages.push({
          nickname: 'new ' + i,
        });
      }

      console.log(newMessages);
      // Lets resolve after 500 ms, to simulate network latency.
      setTimeout(() => {
        resolve(newMessages);
      }, 500);
    });
  };

  async loadMore(direction) {
    // await standardFunctions.add_firebase_event_log('bestofs', 'loaded_mr_scrbd', {direction});
    // await this.loadScoreboardData(direction);
  }

  async loadScoreboardData(direction: ScoreboardDirection = '') {
    try {
      this.setLoading(true);
      let default_data =
        Observable.getReduxValue('bestof_scoreboard_score_and_rank') &&
        Observable.getReduxValue('bestof_scoreboard_score_and_rank')
          .avg_score === '--'
          ? {sorting: 'descending', limit: 40}
          : {limit: 40};
      const next_data =
        direction && this.next_data
          ? direction === 'top'
            ? this.next_data.top
            : direction === 'bottom'
            ? this.next_data.bottom
            : default_data
          : default_data;
      if (next_data && next_data.redis_score !== null) {
        abortController.abort();
        let dataToSend = next_data;
        if (!dataToSend.limit) {
          dataToSend['limit'] = 50;
        }
        const request: any = await CallServerPromise.get_bestof_scoreboard(
          dataToSend,
        );
        if (request.success && request.data) {
          if (!this.scoreboard) this.scoreboard = [];
          this.setNextData(request.data.next_data);
          if (this.direction === '' && direction === '') {
            this.scoreboard = request.data.scoreboard;
          } else {
            if (direction === 'top') {
              this.scoreboard = request.data.scoreboard.concat(
                this.scoreboard.reverse(),
              );
            } else if (direction === 'bottom') {
              this.scoreboard = this.scoreboard.concat(request.data.scoreboard);
            } else if (direction === '') {
              this.scoreboard = request.data.scoreboard;
            }
          }
          this.direction = direction;
        } else if (request.aborted !== true) {
          await standardFunctions.show_alert_async(
            strings.OTHER.WARNING,
            strings.BESTOF2.HOME_SCREEN.SCOREBOARD_SCREEN.ERROR_ON_LOADING_DATA,
          );
          console.log(
            'An error occurred while loading scoreboard data',
            request,
          );
        }
      }
      this.setLoading(false);
    } catch (e) {
      this.setLoading(false);
      console.log('An error occurred while loading scoreboard data', e);
    }
  }

  setLoading(loading) {
    this.loading = loading;
    this.updateView();
  }

  componentDidMount() {}

  componentWillUnmount() {}
}

export default useViewModel(new ScoreboardViewModel());
