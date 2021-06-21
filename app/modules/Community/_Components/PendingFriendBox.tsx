import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, constants, strings } from "../../../config";
import FastImage from "react-native-fast-image";
import { CallServer } from "../../../utils/app/CallServer";
import standardFunctions from "../../../utils/app/StandardFunctions";
import { DataProvider } from "recyclerlistview";

interface Props {
  data: any;
  onPress: () => void;
  self: any;
  updateData: any;
}

class PendingFriendBox extends React.Component<Props> {
  handleRespondClicked = (self, friendship_id, action) => {
    CallServer.respond_to_friendship_request(friendship_id, action, result1 => {
      CallServer.get_pending_friendship_requests(result2 => {
        CallServer.get_friends(result3 => {
          if (!result1.success || !result2.success || !result3.success) {
            standardFunctions.show_alert(
              strings.ALERTS.FRIENDS.RESPOND_TO_REQUEST_FAILED.TITLE,
              strings.ALERTS.FRIENDS.RESPOND_TO_REQUEST_FAILED.MESSAGE,
            );
            return;
          }
          self.setState({pending_friendship_requests: result2.data});
          this.props.updateData({
            pending_friendship_requests: result2.data,
            users_list: result3.data,
            dataProvider: new DataProvider((r1, r2) => {
              return r1 !== r2;
            }).cloneWithRows([{}, {}, {}, {}].concat(result3.data)),
          });
          standardFunctions.update_badge_notification();
        });
      });
    });
  };

  render() {
    const {data, onPress, self} = this.props;
    return (
      <TouchableOpacity
        style={styles.containerRow}
        onPress={onPress}
        activeOpacity={constants.ACTIVE_OPACITY}>
        <FastImage
          source={{uri: data.sender_profile_image_url}}
          style={styles.rowUserImage}
        />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.rowTitle}>
            {data.sender_firstname} {data.sender_lastname}
            <Text style={styles.rowText}>
              {'\n'}
              {data.sender_nickname}
              {'\n'}
              {data.sender_university_name}
            </Text>
          </Text>
          <View style={styles.buttons_view}>
            <TouchableOpacity
              activeOpacity={constants.ACTIVE_OPACITY}
              style={styles.button_accept}
              onPress={() => {
                this.handleRespondClicked(self, data._id, 'accepted_by_user');
              }}>
              <Text style={styles.button_accept_text}>
                {strings.FRIENDS.PENDING_REQUESTS.BUTTON_ACCEPT}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={constants.ACTIVE_OPACITY}
              style={styles.button_reject}
              onPress={() => {
                this.handleRespondClicked(self, data._id, 'rejected');
              }}>
              <Text style={styles.button_reject_text}>
                {strings.FRIENDS.PENDING_REQUESTS.BUTTON_REJECT}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  containerRow: {
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    width: 'auto',
    flex: 1,
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowTitle: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    marginLeft: 0,
    fontSize: 17,
  },
  rowText: {
    fontWeight: 'normal',
    fontFamily: constants.DEFAULT_FONT,
    marginLeft: 15,
    fontSize: 15,
  },
  rowUserImage: {
    height: 63,
    width: 63,
    margin: 15,
    borderRadius: 100,
  },
  buttons_view: {
    marginTop: 10,
    width: 230,
    height: 38,
    flexDirection: 'row',
  },
  button_accept: {
    justifyContent: 'center',
    width: 110,
    marginRight: 5,
    backgroundColor: colors.THEFACULTY,
    borderRadius: 19,
  },
  button_reject: {
    justifyContent: 'center',
    width: 110,
    marginLeft: 5,
    backgroundColor: colors.RED_TF,
    borderRadius: 19,
  },
  button_accept_text: {
    alignSelf: 'center',
    textAlign: 'center',
    width: 110,
    color: colors.WHITE,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 17,
  },
  button_reject_text: {
    alignSelf: 'center',
    textAlign: 'center',
    width: 110,
    color: colors.WHITE,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 17,
  },
});

export default PendingFriendBox;
