import React from "react";

import { Clipboard, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, strings } from "../../../../config";
import constants from "../../../../config/constants";
import standardFunctions from "../../../../utils/app/StandardFunctions";

const TextView = props => {
  const {code} = props;
  const copyCodeToClipboard = () => {
    try {
      Clipboard.setString(code.toString());
      standardFunctions.show_alert(
        strings.COUPONS.VIEW.CODE_COPIED_TITLE,
        strings.COUPONS.VIEW.CODE_COPIED_MESSAGE,
      );
    } catch (e) {}
  };

  return (
    <TouchableOpacity
      activeOpacity={1.0}
      onLongPress={copyCodeToClipboard}
      style={[styles.container, props.style]}>
      <Text style={styles.description}>{strings.COUPONS.VIEW.TEXT_DESC}</Text>
      <View style={styles.couponCodeContainer}>
        <View style={styles.couponCodeContainerInternal}>
          <Text style={styles.couponCodeValue}>{code}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
  couponCodeContainer: {
    marginTop: 20,
    borderRadius: 18,
    width: '100%',
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
    shadowColor: colors.DARK_ALOE_TF,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    elevation: 8,
  },
  couponCodeContainerInternal: {
    width: '95%',
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  couponCodeValue: {
    fontSize: 20,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    lineHeight: 25,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: colors.DARK_ALOE_TF,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: colors.DARK_ALOE_TF,
  },
});

export default TextView;
