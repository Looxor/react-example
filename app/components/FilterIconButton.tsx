import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { constants } from "../config";

const FilterIconButton = props => {
  const {style, onPress} = props;
  return (
    <TouchableOpacity
      activeOpacity={constants.ACTIVE_OPACITY}
      onPress={onPress}
      style={[styles.container, style]}>
      <FastImage
        style={styles.filterIcon}
        source={require('../../assets/images/icons/icn_filter_bestofs.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  filterIcon: {
    width: 19,
    height: 22,
  },
});

export default FilterIconButton;
