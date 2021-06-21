import React from "react";
import { TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";

const ShareButtonTop = props => {
  const {navigation, dismiss, onButtonPress, color} = props;
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: 80,
        height: '100%',
      }}
      onPress={() => {
        if (onButtonPress) onButtonPress();
      }}>
      <FastImage
        source={require('../../assets/images/icons/icn_share.png')}
        style={{
          marginTop: 2,
          width: 25,
          height: 25,
          position: 'absolute',
          right: 10,
        }}
      />
    </TouchableOpacity>
  );
};

export default ShareButtonTop;
