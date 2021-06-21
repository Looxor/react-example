import { Observable, useViewModel, ViewModelBase } from "../../_CommonModels/ViewModelBase";
import { abortController, CallServerPromise } from "../../../utils/app/CallServer";
import standardFunctions from "../../../utils/app/StandardFunctions";
import { strings } from "../../../config";

export type ScoreboardDirection = 'top' | 'bottom' | '';

const isCloseToTop = ({contentOffset}) => {
  const paddingToTop = 25;
  return contentOffset.y <= paddingToTop;
};

class ScoreboardViewModel extends ViewModelBase {
  scoreboard: Array<{}>;
  temporaryTopScoreboard: Array<{}>;
  next_data: any = {};
  loading: boolean = true;
  justLoaded: boolean = true;
  loadingTop: boolean = false;
  loadingBottom: boolean = false;
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

  async loadMoreOld(e, listRef) {
    const {layoutMeasurement, contentOffset, contentSize} = e.nativeEvent;
    const isStartOfScroll = isCloseToTop({contentOffset});
    if (
      isStartOfScroll &&
      this.scoreboard.length > 10 &&
      this.temporaryTopScoreboard.length > 10
    ) {
      let diff = -1;
      if (this.temporaryTopScoreboard.length !== this.scoreboard.length) {
        diff = this.temporaryTopScoreboard.length - this.scoreboard.length;
      }
      this.scoreboard = this.temporaryTopScoreboard;
      if (diff !== -1) {
        setTimeout(() => {
          //listRef.current.scrollToIndex({ animated: false, index: diff+3});
        }, 200);
      }
      return;
    }

    let offset = e.nativeEvent.contentOffset.y;
    let currentIndex = Math.round(offset / 130);
    if (this.scoreboard && this.scoreboard.length) {
      let totalTemporaryUsers = this.scoreboard.length;
      if (
        currentIndex <= (this.scoreboard.length > 100 ? 40 : 20) &&
        !this.loading &&
        !this.justLoaded
      ) {
        await this.loadScoreboardData('top');
        standardFunctions.add_firebase_event_log('bestofs', 'loaded_mr_scrbd', {
          direction: 'top',
        });
      } else if (
        currentIndex >=
          totalTemporaryUsers - (this.scoreboard.length > 100 ? 40 : 20) &&
        !this.loading &&
        !this.justLoaded
      ) {
        await this.loadScoreboardData('bottom');
        standardFunctions.add_firebase_event_log('bestofs', 'loaded_mr_scrbd', {
          direction: 'bottom',
        });
        this.updateView();
      }
    }
  }

  async loadMore(direction) {
    await this.loadScoreboardData(direction);
    standardFunctions.add_firebase_event_log('bestofs', 'loaded_mr_scrbd', {
      direction,
    });
    this.updateView();
  }

  async loadScoreboardData(direction: ScoreboardDirection = '') {
    try {
      this.loading = true;
      this.updateView();
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
        this.loading = false;
        this.updateView();
        if (request.success && request.data) {
          if (!this.scoreboard) this.scoreboard = [];
          this.setNextData(request.data.next_data);
          if (this.direction === '' && direction === '') {
            this.scoreboard = request.data.scoreboard;
          } else {
            if (direction === 'top') {
              this.temporaryTopScoreboard = request.data.scoreboard
                .reverse()
                .concat(this.scoreboard);
            } else if (direction === 'bottom') {
              this.scoreboard = this.scoreboard.concat(request.data.scoreboard);
            } else if (direction === '') {
              this.scoreboard = request.data.scoreboard;
            }
          }
          this.direction = direction;
          this.loading = false;
          this.setJustLoaded();
          this.updateView();
        } else if (request.aborted !== true) {
          this.loading = false;
          this.updateView();
          await standardFunctions.show_alert_async(
            strings.OTHER.WARNING,
            strings.BESTOF2.HOME_SCREEN.SCOREBOARD_SCREEN.ERROR_ON_LOADING_DATA,
          );
          console.log(
            'An error occurred while loading scoreboard data',
            request,
          );
        }
        this.loading = false;
        this.updateView();
        this.setJustLoaded();
      }
      this.loading = false;
      this.updateView();
    } catch (e) {
      this.loading = false;
      this.updateView();
      console.log('An error occurred while loading scoreboard data', e);
    }
  }

  setJustLoaded() {
    this.justLoaded = true;
    setTimeout(() => {
      this.justLoaded = false;
      this.updateView();
    }, 1500);
  }

  componentDidMount() {}

  componentWillUnmount() {}
}

export default useViewModel(new ScoreboardViewModel());
