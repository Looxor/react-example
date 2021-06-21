import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, constants, strings } from "../../../../../config";
import FastImage from "react-native-fast-image";

const InfoBox4CloneBlock = props => {
  const [closed, setClosed] = useState(true);
  return (
    <>
      <View style={styles.informationContainer}>
        <Text style={styles.informationText2}>
          {strings.TEST.INSTANCE_DETAIL.INFORMATION2}
        </Text>
        <FastImage
          style={styles.informationIcon2}
          source={require('../../../../../../assets/images/icons/icn_selexi_color.png')}
        />
        <TouchableOpacity
          style={[styles.selexiButton, !closed && styles.selexiButtonClosed]}
          onPress={() => setClosed(!closed)}>
          <FastImage
            style={styles.informationIcon}
            source={require('../../../../../../assets/images/icons/icn_open.png')}
          />
        </TouchableOpacity>
      </View>
      {!closed && (
        <Text style={styles.selexiDesc}>
          {strings.TEST.INSTANCE_DETAIL.SELEXI_DESC}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  informationContainer: {
    flexDirection: 'row',
    marginHorizontal: 50,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  informationIcon: {
    width: 19,
    height: 19,
  },
  informationIcon2: {
    width: 50,
    height: 25,
    marginRight: 20,
    marginTop: -3,
  },
  informationText2: {
    fontSize: 14,
    color: colors.gray,
    marginTop: -2,
    width: '65%',
    fontFamily: constants.DEFAULT_FONT,
  },
  selexiDesc: {
    fontSize: 14,
    color: colors.gray,
    marginHorizontal: 20,
    marginBottom: 10,
    fontFamily: constants.DEFAULT_FONT,
  },
  selexiButton: {},
  selexiButtonClosed: {
    transform: [{rotate: '45deg'}],
  },
});

export default InfoBox4CloneBlock;
