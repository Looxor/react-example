import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { colors, constants } from "../../../config";

const SelectSubjectBox = props => {
  const {
    selected,
    subject,
    setSelected,
    containerStyle = [],
    textStyle = [],
    loading = false,
  } = props;

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setSelected(subject);
        }}
        style={[styles.subjectContainer, ...containerStyle]}>
        {!loading ? (
          <FastImage
            resizeMode={'contain'}
            style={styles.checkBoxSubject}
            source={
              selected
                ? require('../../../../assets/images/icons/icn_checkbox_checked.png')
                : require('../../../../assets/images/icons/icn_checkbox_unchecked.png')
            }
          />
        ) : (
          <ActivityIndicator
            style={{marginLeft: 22, marginTop: -20}}
            color={colors.BESTOF2.BG1}
          />
        )}
        <View style={styles.subjectTextContainer}>
          <Text style={[styles.subjectName, ...textStyle]}>{subject.name}</Text>
        </View>
        <FastImage
          resizeMode={'contain'}
          style={styles.subjectIcon}
          source={{uri: subject.image_url}}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  subjectContainer: {
    height: 62,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  subjectTextContainer: {
    width: '70%',
    marginRight: 13,
    marginLeft: 13,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subjectName: {
    color: colors.BESTOF2.BG1,
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT,
    lineHeight: 20.8,
  },
  subjectIcon: {
    top: -2,
    position: 'absolute',
    right: 20,
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  checkBoxSubject: {
    width: 16,
    height: 16,
    marginTop: 2,
    marginLeft: 26,
  },
});

export default SelectSubjectBox;
