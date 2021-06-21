import { Observable, useViewModel, ViewModelBase } from "../../_CommonModels/ViewModelBase";
import { abortController, CallServerPromise } from "../../../utils/app/CallServer";
import { UserData } from "../../../config/constants";
import { Overlay } from "teaset";

const DEFAULT_SEARCH_PARAMS = {
  limit: 15,
  endings: ['winner', 'loser', 'tie'],
};

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 25;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

class HistoryViewModel extends ViewModelBase {
  oldBestOfs: any;
  loading: boolean;
  searchParams: any = {};
  isToShowAnimation: boolean;

  initValues() {
    this.oldBestOfs = this.loadDataFromCache();
    this.isToShowAnimation = false;
    this.searchParams = DEFAULT_SEARCH_PARAMS;
    this.loading = false;
  }

  resetValues() {
    this.oldBestOfs = this.loadDataFromCache();
    this.isToShowAnimation = false;
    this.searchParams = DEFAULT_SEARCH_PARAMS;
    this.loading = false;
  }

  loadMore(e) {
    const {layoutMeasurement, contentOffset, contentSize} = e.nativeEvent;
    const isEndOfScroll = isCloseToBottom({
      layoutMeasurement,
      contentOffset,
      contentSize,
    });
    if (
      isEndOfScroll &&
      this.oldBestOfs.length >= DEFAULT_SEARCH_PARAMS['limit']
    ) {
      this.getDataFromServer(true);
    }
  }

  getDataFromServer = async (loadMore = false) => {
    if (this.loading) return;
    let bestOfsFromCache = this.loadDataFromCache();
    this.loading = true;
    this.updateView();

    abortController.abort();
    this.buildSearchCondition(loadMore);
    const responseBestOfs: any = await CallServerPromise.get_finished_bestofs(
      this.searchParams || DEFAULT_SEARCH_PARAMS,
    );
    if (responseBestOfs.success) {
      if (loadMore === true) {
        this.oldBestOfs = [].concat(this.oldBestOfs, responseBestOfs.data);
      } else {
        this.oldBestOfs = responseBestOfs.data;
      }
    }

    if (
      (this.searchParams &&
        this.searchParams.sorting !== 'ascending' &&
        this.searchParams.endings.length === 3 &&
        (!this.searchParams.opponent_faculty_id ||
          this.searchParams.opponent_faculty_id === '') &&
        (!this.searchParams.opponent_university_id ||
          this.searchParams.opponent_university_id === '')) ||
      !this.searchParams
    ) {
      this.saveToCache(responseBestOfs.data);
      if (
        !loadMore &&
        bestOfsFromCache &&
        this.oldBestOfs.length > 0 &&
        bestOfsFromCache.length > 0
      ) {
        if (this.oldBestOfs[0].bestof_id !== bestOfsFromCache[0].bestof_id) {
          this.setAnimationToShow(true);
        }
      }
    }

    this.loading = false;
    this.updateView();

    try {
      let loading_popover_view_history = Observable.getReduxValue(
        'loading_popover_view_history',
      );
      if (
        loading_popover_view_history &&
        typeof loading_popover_view_history !== 'object'
      ) {
        Observable.setReduxValue('loading_popover_view_history', undefined);
        Overlay.hide(loading_popover_view_history, true);
      }
    } catch (e) {}
  };

  loadDataFromCache = () => {
    let new_finished_bestofs = Observable.getReduxValue(
      UserData.getUserData().user_id + '_new_finished_bestofs',
    );
    return Array.isArray(new_finished_bestofs) ? new_finished_bestofs : [];
  };

  saveToCache = finished_bestofs => {
    Observable.setReduxValue(
      UserData.getUserData().user_id + '_new_finished_bestofs',
      finished_bestofs,
    );
  };

  applyFilterParams(searchParams) {
    const params = this.searchParams;
    if (searchParams.dateFilter === 'recent') {
      params['sorting'] = 'descending';
    } else if (searchParams.dateFilter === 'old') {
      params['sorting'] = 'ascending';
    }

    if (searchParams.endingsFilter) {
      params['endings'] = searchParams.endingsFilter;
    }

    if (
      searchParams.selectedOpponentFacultyID &&
      searchParams.selectedOpponentFacultyID !== ''
    ) {
      params['opponent_faculty_id'] = searchParams.selectedOpponentFacultyID;
    } else {
      delete params['opponent_faculty_id'];
    }

    if (
      searchParams.selectedOpponentUniversityID &&
      searchParams.selectedOpponentUniversityID !== ''
    ) {
      params['opponent_university_id'] =
        searchParams.selectedOpponentUniversityID;
    } else {
      delete params['opponent_university_id'];
    }

    this.searchParams = params;
  }

  removeFilterParams() {
    this.searchParams = {
      limit: 15,
      endings: ['winner', 'loser', 'tie'],
    };
    try {
      let loading_popover_view_history = Observable.getReduxValue(
        'loading_popover_view_history',
      );
      if (
        loading_popover_view_history &&
        typeof loading_popover_view_history !== 'object'
      ) {
        Observable.setReduxValue('loading_popover_view_history', undefined);
        Overlay.hide(loading_popover_view_history, true);
      }
    } catch (e) {}
  }

  buildSearchCondition(loadMore = false) {
    const params = this.searchParams;
    params['limit'] = DEFAULT_SEARCH_PARAMS['limit'];
    params['skip'] = this.oldBestOfs && loadMore ? this.oldBestOfs.length : 0;
  }

  setAnimationToShow(show) {
    this.isToShowAnimation = show;
  }

  componentDidMount() {
    this.initValues();
  }

  componentWillUnmount() {}
}

export default useViewModel(new HistoryViewModel());
