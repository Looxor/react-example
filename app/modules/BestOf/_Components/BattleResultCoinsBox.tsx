import React from "react";

import { StyleSheet, View } from "react-native";
import PointsBox from "./PointsBox";
import { colors } from "../../../config";

const styles = StyleSheet.create({
  container: {},
});

const BattleResultCoinsBox = props => {
  if (!props.obtained_coins) return null;
  return (
    <View style={[styles.container, props.style]}>
      <PointsBox
        color={colors.BESTOF.DEFAULT}
        start_color={colors.BESTOF.START}
        finish_color={colors.BESTOF.FINISH}
        currentValue={props.total_coins}
        maxValue={props.max_coins}
        displayValue={'+' + props.obtained_coins}
      />
    </View>
  );
};

export default BattleResultCoinsBox;
