import React from "react";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../../../../config";

const IOSScrollViewTweak = props => {
  return (
    <View
      style={{width: '100%', height: '68%', position: 'absolute', zIndex: -2}}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[colors.GENERAL.START, colors.GENERAL.FINISH]}
        style={{width: '100%', height: '80%'}}
      />
    </View>
  );
};

export default IOSScrollViewTweak;
