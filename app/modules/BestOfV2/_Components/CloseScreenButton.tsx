import React from "react";
import { TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";

const CloseScreenButton = props => {
  return (
    <TouchableOpacity
      style={{
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 2,
        elevation: 2,
        right: 30,
        top: 50,
        ...(props.style || {}),
      }}
      onPress={props.onPress}>
      <FastImage
        style={{width: 20, height: 20}}
        source={require('../../../../assets/images/icons/icn_close_bestofs_blue.png')}
      />
    </TouchableOpacity>
  );
};

export default CloseScreenButton;
