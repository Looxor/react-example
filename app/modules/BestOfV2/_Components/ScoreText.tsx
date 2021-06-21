import React from "react";
import { Platform, Text } from "react-native";

const OS = Platform.OS;

const ScoreText = props => {
  const {style, score, minorFontSize} = props;
  const scoreString = score ? score.toString() : '--';
  return (
    <Text style={style}>
      {scoreString.slice(0, 2)}
      <Text
        style={[
          {
            fontSize: minorFontSize ? minorFontSize : 16,
            fontFamily: 'Kalam-Regular',
          },
          OS === 'android' && {fontWeight: 'normal'},
        ]}>
        {scoreString.slice(2, 5).replace('.', ',')}
      </Text>
    </Text>
  );
};

export default ScoreText;
