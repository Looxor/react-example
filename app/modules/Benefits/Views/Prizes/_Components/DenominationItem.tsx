import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../../../config";
import constants from "../../../../../config/constants";

const DenominationItem = props => {
  const {selected, denomination, onPressDenomination} = props;
  return (
    <TouchableOpacity
      style={[
        styles.denominationItem,
        selected ? styles.denominationItemSelected : {},
      ]}
      activeOpacity={constants.ACTIVE_OPACITY}
      onPress={onPressDenomination}>
      <Text style={styles.denominationText}>{denomination.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  denominationItem: {
    paddingHorizontal: 10,
    minWidth: 95,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 5,
    backgroundColor: colors.WHITE,
    borderWidth: 3,
    borderColor: 'transparent',
    borderRadius: 20,
    shadowColor: colors.DARK_ALOE_TF,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 4,
    elevation: 3,
  },
  denominationItemSelected: {
    borderColor: colors.DARK_ALOE_TF,
  },
  denominationText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 30,
    color: colors.DARK_ALOE_TF,
  },
});

export default DenominationItem;
