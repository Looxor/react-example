import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { colors, constants } from "../../../../../../config";

const PartnersPickerItem = props => {
  const {
    selected,
    partner,
    onSelectPartner,
    containerStyle = [],
    textStyle = [],
    loading = false,
  } = props;

  const [newSelected, setNewSelected] = useState(selected);

  return (
    <TouchableOpacity
      onPress={() => {
        setNewSelected(!newSelected);
        onSelectPartner(partner, !newSelected);
      }}
      activeOpacity={constants.ACTIVE_OPACITY}
      style={[styles.subjectContainer, ...containerStyle]}>
      {!loading ? (
        <FastImage
          resizeMode={'contain'}
          style={styles.checkBoxSubject}
          source={
            newSelected
              ? require('../../../../../../../assets/images/icons/icn_checkbox_checked.png')
              : require('../../../../../../../assets/images/icons/icn_checkbox_unchecked.png')
          }
        />
      ) : (
        <ActivityIndicator
          style={{marginLeft: 22, marginTop: -20}}
          color={colors.BESTOF2.BG1}
        />
      )}
      <View style={styles.subjectTextContainer}>
        <Text style={[styles.subjectName, ...textStyle]}>
          {partner.partner_name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  subjectContainer: {
    height: 62,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    zIndex: 105,
    elevation: 105,
  },
  subjectTextContainer: {
    width: '70%',
    marginRight: 13,
    marginLeft: 13,
    flexDirection: 'row',
    flexWrap: 'wrap',
    zIndex: 110,
    elevation: 110,
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

export default PartnersPickerItem;
