import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, constants, strings } from "../../../../../config";
import FastImage from "react-native-fast-image";

const InfoBoxWayback = props => {
  return (
    <View style={styles.informationContainer}>
      <FastImage
        style={styles.informationIcon}
        source={require('../../../../../../assets/images/icons/icn_info.png')}
      />
      <Text style={styles.informationText}>
        {strings.TEST.INSTANCE_DETAIL.INFORMATION}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  informationContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  informationIcon: {
    width: 20,
    height: 20,
  },
  informationText: {
    fontSize: 14,
    color: colors.gray,
    marginTop: -5,
    marginLeft: 10,
    fontFamily: constants.DEFAULT_FONT,
  },
});

export default InfoBoxWayback;
