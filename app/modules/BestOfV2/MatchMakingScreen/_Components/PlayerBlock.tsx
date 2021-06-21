import React from "react";
import RNLinearGradient from "react-native-linear-gradient";

import UserInfoBlock from "./UserInfoBlock";
import { colors } from "../../../../config";
import { View } from "react-native";

const PlayerBlock = props => {
  const {position, player, topSpace, marginVertical} = props;
  const subjects = player && player.subjects;
  const isUp = position === 'up';
  return (
    <View
      style={{
        flex: 1,
        justifyContent: isUp ? 'flex-end' : 'flex-start',
        backgroundColor: 'trasparent',
        ...props.style,
      }}>
      <RNLinearGradient
        style={[
          {
            position: 'absolute',
            width: '100%',
            height: '100%',
          },
          isUp && topSpace && {top: -topSpace},
          !isUp && topSpace && {top: topSpace},
        ]}
        start={{x: 0.5, y: 1}}
        end={{x: 0.5, y: 0}}
        colors={
          isUp
            ? [colors.BESTOF2.BG1, colors.BESTOF2.BG1]
            : [colors.BESTOF2.BG2_2, colors.BESTOF2.BG2_1]
        }
      />
      <UserInfoBlock
        marginVertical={marginVertical}
        position={position}
        player={player}
        fade={!isUp}
      />
    </View>
  );
};

export default PlayerBlock;
