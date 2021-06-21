import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { constants } from "../config";

const BackButtonTop = props => {
  const {navigation, dismiss, onBackPress, color, icon, title, style} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        ...style,
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: 50,
          height: '100%',
        }}
        onPress={() => {
          if (dismiss) navigation.dismiss();
          else if (onBackPress) onBackPress();
          else navigation.goBack(null);
        }}>
        <FastImage
          source={
            icon ||
            (color === 'white'
              ? require('../../assets/images/icons/icn_arrow_left_white.png')
              : require('../../assets/images/icons/icn_back_bestofs.png'))
          }
          resizeMode={'contain'}
          style={{
            width: 20,
            height: 20,
            alignSelf: 'center',
            ...props.iconStyle,
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: constants.DEFAULT_FONT,
          fontSize: 18,
        }}>
        {title}
      </Text>
    </View>
  );
};

export default BackButtonTop;
