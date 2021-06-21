import React from "react";

import { StyleSheet, Text, View } from "react-native";
import { colors, strings } from "../../../../config";
import constants from "../../../../config/constants";

const NothingView = props => {
  const nothing_message = props.nothing_message;
  return (
    <>
      <View style={[styles.container]}>
        <Text style={styles.description}>
          {nothing_message !== '' && nothing_message !== undefined
            ? nothing_message
            : strings.COUPONS.VIEW.NOTHING_DESC}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    color: colors.DARK_ALOE_TF,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default NothingView;
