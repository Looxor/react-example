import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, constants } from "../../../../../config";
import FastImage from "react-native-fast-image";

const TitleBox = props => {
  const {title, universityMajorName} = props;
  return (
    <View style={styles.titleContainer}>
      {typeof title === 'string' ? (
        <Text style={styles.title}>{title}</Text>
      ) : (
        title
      )}
      <View style={styles.subTitleContainer}>
        <FastImage
          style={styles.subTitleIcon}
          source={require('../../../../../../assets/images/icons/icn_location.png')}
        />
        <Text style={styles.subTitleText} numberOfLines={3}>
          {universityMajorName}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 7,
    fontFamily: constants.DEFAULT_FONT_BOLD,
  },
  subTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  subTitleIcon: {
    width: 9,
    height: 14,
  },
  subTitleText: {
    marginLeft: 7,
    marginTop: -2,
    fontSize: 15,
    color: colors.gray,
    fontFamily: constants.DEFAULT_FONT,
    textAlign: 'center',
  },
});

export default TitleBox;
