import { useViewModel, ViewModelBase } from "../../_CommonModels/ViewModelBase";
import { DataProvider } from "recyclerlistview";
import { CallServerPromise } from "../../../utils/app/CallServer";

import IntervalCheck from "../../../utils/misc/IntervalCheck";
import { routes } from "../../../navigation/rootNavigation/navigation.constants";
import { UserData } from "../../../config/constants";

const LIST_TYPE = {
  FRIENDS: 1,
  USERS: 2,
};

const SEARCH_REQUEST_MIN_INTERVAL_IN_MILLIS = 300;
const intervalCheck = new IntervalCheck();
let timeout: any = 0;

const getDataProvider = data => {
  return new DataProvider((r1, r2) => r1 !== r2).cloneWithRows([].concat(data));
};

const prevRequestController = new AbortController();

class FriendScreenViewModel extends ViewModelBase {
  users: Array<{}> = [];
  friends: Array<{}> = [];
  pending_friends: Array<{}> = [];
  loading: boolean = false;
  searching: boolean = false;
  dataProvider: any = {};
  willUnmount: boolean = false;
  func_searching: boolean = false;
  searchKey: string = '';
  listType: number = 0;

  constructor() {
    super();
    this.users = [];
    this.friends = [];
    this.pending_friends = [];
    this.loading = false;
    this.dataProvider = getDataProvider([]);
    this.willUnmount = false;
    this.searchKey = '';
  }

  openPendingFriendshipRequestsPage() {
    const {navigation} = this.props;
    navigation.navigate(routes.PENDING_FRIENDSHIP_REQUESTS, {
      pending_friendship_requests: this.pending_friends,
      updateData: () => {
        if (this.searchKey.length > 2) this.searchUser(this.searchKey);
        else this.loadFriends();
      },
    });
  }

  async updateSearchKey(searchKey) {
    if (searchKey.length > 2) {
      if (intervalCheck.passedLessThan(SEARCH_REQUEST_MIN_INTERVAL_IN_MILLIS)) {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(
          () => this.searchUser(searchKey),
          SEARCH_REQUEST_MIN_INTERVAL_IN_MILLIS,
        );
      } else {
        this.searchUser(searchKey);
      }
    } else if (searchKey.length === 0) {
      this.loadFriends();
    }
    this.searchKey = searchKey;
    this.updateView();
  }

  before_sending(params = {}) {
    this.searching = true;
    this.loading = true;
  }

  after_sending() {
    this.searching = false;
    this.loading = false;
  }

  async loadFriends() {
    this.before_sending();
    this.listType = LIST_TYPE.FRIENDS;
    this.dataProvider = getDataProvider([]);
    this.updateView();
    try {
      prevRequestController.abort();
      const request_friends = await CallServerPromise.get_friends();
      this.after_sending();

      if (request_friends.success) {
        const request_friends_pending =
          await CallServerPromise.get_pending_friendship_requests();
        if (request_friends_pending.success) {
          this.friends = request_friends.data;
          this.pending_friends = request_friends_pending.data;
          this.dataProvider = getDataProvider(request_friends.data);
        }
      }
      this.updateView();
    } catch (error) {
      this.after_sending();
      this.updateView();
    }
  }

  async searchUser(searchKey) {
    if (this.func_searching) {
      return;
    } else this.func_searching = true;
    try {
      this.before_sending();
      this.listType = LIST_TYPE.USERS;
      this.users = [];
      this.dataProvider = getDataProvider([]);
      this.updateView();
      prevRequestController.abort();
      const request = await CallServerPromise.search_user(searchKey);
      if (request.success) {
        this.users = request.data;
        this.dataProvider = getDataProvider(request.data);
      }
      this.func_searching = false;
      this.after_sending();
      this.updateView();
    } catch (error) {
      this.func_searching = false;
      this.after_sending();
      this.updateView();
    }
  }

  openUserPage(
    user_id: string,
    nickname: string,
    firstname: string,
    lastname: string,
    user_is_friend: boolean,
  ) {
    const {navigation} = this.props;
    navigation.navigate(routes.USER_DETAILS, {
      onBackPress: () => {
        if (this.searchKey.length > 2) this.searchUser(this.searchKey);
        else this.loadFriends();
      },
      user_id,
      nickname,
      firstname,
      lastname,
      user_is_friend,
      is_logged_user: user_id == UserData.getUserData().user_id,
    });
  }

  componentDidMount() {
    const didFocus = () => {
      // @ts-ignore
      if (global.friendsSelectedFlag) {
        if (this.searchKey.length > 2) this.searchUser(this.searchKey);
        else this.loadFriends();
      }
      // @ts-ignore
      global.friendsSelectedFlag = false;
    };
    this.loadFriends();
    this.props.navigation.addListener('focus', didFocus);
  }

  componentWillUnmount() {
    this.willUnmount = true;
  }
}

export default useViewModel(new FriendScreenViewModel());
export {LIST_TYPE};
