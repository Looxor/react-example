// Libraries //
import * as React from "react";
import { Dimensions, Text, View } from "react-native";
import { DataProvider, LayoutProvider, RecyclerListView } from "recyclerlistview";
import FastImage from "react-native-fast-image";
// Configs //
import { styles } from "./PendingFriendshipsScreen.style";
import { routes } from "../../navigation/rootNavigation/navigation.constants";
import { constants, strings } from "../../config";
import PendingFriendBox from "./_Components/PendingFriendBox";

interface Props {
  navigation: any;
}

interface State {
  pending_friendship_requests: Array<Object>;
  updateData: any;
  dataProvider: DataProvider;
}

class PendingFriendshipsScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: strings.FRIENDS.PENDING_REQUESTS.PENDING_REQUESTS_TITLE,
  };
  readonly state: State = {
    pending_friendship_requests: [],
    updateData: () => {},
    dataProvider: new DataProvider((r1, r2) => {
      return r1 !== r2;
    }).cloneWithRows(['']),
  };
  _layoutProvider = new LayoutProvider(
    index => {
      if (this.state.pending_friendship_requests.length == 0) {
        return 0;
      } else {
        return 1;
      }
    },
    (type, dim) => {
      if (type == 0) {
        dim.width = Dimensions.get('window').width;
        dim.height = Dimensions.get('window').height;
      } else {
        dim.width = Dimensions.get('window').width;
        dim.height = 170;
      }
    },
  );

  constructor(props) {
    super(props);
    this._rowRenderer = this._rowRenderer.bind(this);
  }

  componentDidMount() {
    var pending_friendship_requests = this.props.navigation.getParam(
      'pending_friendship_requests',
      [],
    );
    this.setState({
      pending_friendship_requests,
      updateData: this.props.navigation.getParam('updateData', () => {}),
      dataProvider: new DataProvider((r1, r2) => {
        return r1 !== r2;
      }).cloneWithRows(pending_friendship_requests),
    });
  }

  openUserPage = (
    user_id: string,
    nickname: string,
    firstname: string,
    lastname: string,
    friendship_id: string,
  ) => {
    const {navigation} = this.props;
    navigation.navigate(routes.USER_DETAILS, {
      user_id,
      nickname,
      firstname,
      lastname,
      user_is_friend: false,
      is_logged_user: false,
      is_pending_friendship: true,
      friendship_id,
      self: this,
      updateData: this.state.updateData,
    });
  };

  _rowRenderer(type, data) {
    if (type == 0) {
      return (
        <View style={{alignItems: 'center', marginTop: 50}}>
          <FastImage
            source={require('../../../assets/images/icons/icn_big_sad_light.png')}
            style={{width: 100, height: 100}}
          />
          <Text
            style={{
              marginTop: 10,
              textAlign: 'center',
              fontSize: 16,
              fontFamily: constants.DEFAULT_FONT,
              color: '#888',
            }}>
            {strings.FRIENDS.PENDING_REQUESTS.NO_PENDING_FRIENDSHIP_REQUESTS}
          </Text>
        </View>
      );
    } else if (type == 1) {
      return (
        <PendingFriendBox
          self={this}
          updateData={this.state.updateData}
          data={data}
          onPress={() => {
            this.openUserPage(
              data.sender_id,
              data.sender_nickname,
              data.sender_firstname,
              data.sender_lastname,
              data._id,
            );
          }}
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.safeArea}>
        <RecyclerListView
          style={{width: '100%'}}
          rowRenderer={this._rowRenderer}
          dataProvider={this.state.dataProvider}
          layoutProvider={this._layoutProvider}
        />
      </View>
    );
  }
}

export default PendingFriendshipsScreen;
