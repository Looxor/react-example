import * as React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import constants from "../../../config/constants";
import FastImage from "react-native-fast-image";

interface Props {
  data: any;
  onPress: () => void;
}

class FriendBox extends React.Component<Props> {
  render() {
    const {data, onPress} = this.props;
    return (
      <TouchableOpacity
        style={styles.containerRow}
        onPress={onPress}
        activeOpacity={constants.ACTIVE_OPACITY}>
        <FastImage
          source={{uri: data.friend_profile_image_url}}
          style={styles.rowUserImage}
        />
        <Text style={styles.rowTitle}>
          {data.friend_firstname} {data.friend_lastname}
          <Text style={styles.rowText}>
            {'\n'}
            {data.friend_nickname}
          </Text>
        </Text>
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
});

export default FriendBox;
