import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, strings } from "../../../../../config";
import FastImage from "react-native-fast-image";

const InfoBox = props => {
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
    width: 19,
    height: 19,
  },
  informationText: {
    fontSize: 14,
    color: colors.gray,
    marginTop: -2,
    marginLeft: 10,
  },
});

export default InfoBox;
