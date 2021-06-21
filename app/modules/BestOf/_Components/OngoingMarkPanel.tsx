import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, strings } from "../../../config";
import constants from "../../../config/constants";

const OngoingMarkPanel = props => {
  const {win, lost} = props;
  return (
    <View style={styles.markContainer}>
      <View style={styles.mark}>
        <Text style={styles.markText1}>
          {strings.BESTOF.ONGOING_SCREEN.WIN}
        </Text>
        <Text style={styles.markText2}>{win}</Text>
      </View>
      <View style={[styles.mark, styles.mark1]}>
        <Text style={styles.markText1}>
          {strings.BESTOF.ONGOING_SCREEN.LOST}
        </Text>
        <Text style={styles.markText2}>{lost}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  markContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    width: 300,
    alignSelf: 'center',
  },
  mark: {flexDirection: 'column', width: '50%', alignItems: 'center'},
  mark1: {borderLeftColor: colors.SILVER, borderLeftWidth: 1},
  markText1: {fontFamily: constants.DEFAULT_FONT_MEDIUM, fontSize: 14},
  markText2: {fontFamily: constants.DEFAULT_FONT_BOLD, fontSize: 34},
});

export default OngoingMarkPanel;
