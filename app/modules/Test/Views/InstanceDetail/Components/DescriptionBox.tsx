import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, constants, strings } from "../../../../../config";
import FastImage from "react-native-fast-image";

const DescriptionBox = props => {
  // test.getTimeoutOfCloneBlocks().inMinutes()
  // test.getCloneNotes()
  const {minutes, notes} = props;
  return (
    <View style={styles.descriptionContainer}>
      <View style={styles.descriptionTitleContainer}>
        <Text style={styles.descriptionTitle}>
          {strings.TEST.INSTANCE_DETAIL.DESC_TITLE}
        </Text>
        <View style={styles.descriptionTimeContainer}>
          <Text style={styles.descriptionTimeText}>{minutes} min.</Text>
          <FastImage
            style={styles.descriptionTimeIcon}
            source={require('../../../../../../assets/images/icons/icn_alarm.png')}
          />
        </View>
      </View>
      <Text style={styles.descriptionText}>{notes}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionContainer: {
    marginHorizontal: 15,
  },
  descriptionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descriptionTitle: {
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT_BOLD,
  },
  descriptionTimeContainer: {
    flexDirection: 'row',
  },
  descriptionTimeText: {
    fontSize: 14,
    color: colors.gray,
    marginRight: 7,
    fontFamily: constants.DEFAULT_FONT,
  },
  descriptionTimeIcon: {
    width: 16,
    height: 16,
  },
  descriptionText: {
    fontSize: 15,
    color: colors.gray,
    lineHeight: 21,
    marginTop: 10,
    marginBottom: 15,
    fontFamily: constants.DEFAULT_FONT,
  },
});

export default DescriptionBox;
