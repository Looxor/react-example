import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { colors, constants, strings } from "../../../config";

const BattleProgressBar = props => {
  const total = props.total == undefined ? 3 : props.total;
  const current = props.current == undefined ? 2 : props.current;
  return (
    <View style={[styles.container, props.style]}>
      <View style={[styles.progressBarContainer]}>
        {/*// @ts-ignore*/}
        {[...Array(total).keys()].map((_, index) =>
          index + 1 <= current ? (
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={[colors.BESTOF.START, colors.BESTOF.FINISH]}
              style={[styles.bar, {width: String((100 - total) / total) + '%'}]}
            />
          ) : (
            <View
              style={[
                styles.bar,
                {
                  width: String((100 - total) / total) + '%',
                  backgroundColor: colors.SILVER,
                },
              ]}
            />
          ),
        )}
      </View>
      <Text style={styles.roundCaption}>
        {strings.BESTOF.BATTLE_SCREEN.ROUND_CAPTION.replace(
          '{NUM1}',
          current,
        ).replace('{NUM2}', total)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 35,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  progressBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bar: {
    height: 5,
    borderRadius: 5,
  },
  roundCaption: {
    fontFamily: constants.DEFAULT_FONT,
    alignSelf: 'center',
    fontSize: 16,
  },
});

export default BattleProgressBar;
