import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { colors, constants } from "../../../../config";

const SelectBox = props => {
  const {
    id,
    name,
    icon = null,
    selected,
    setSelected,
    containerStyle = [],
    textStyle = [],
    loading = false,
  } = props;

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setSelected(id);
        }}
        style={[styles.container, ...containerStyle]}>
        {!loading ? (
          <FastImage
            resizeMode={'contain'}
            style={styles.checkBox}
            source={
              selected
                ? require('../../../../../assets/images/icons/icn_checkbox_checked.png')
                : require('../../../../../assets/images/icons/icn_checkbox_unchecked.png')
            }
          />
        ) : (
          <ActivityIndicator
            style={{marginLeft: 22, marginTop: -20}}
            color={colors.BESTOF2.BG1}
          />
        )}
        <View style={styles.textContainer}>
          <Text style={[styles.name, ...textStyle]}>{name}</Text>
        </View>
        {icon && (
          <FastImage
            resizeMode={'contain'}
            style={styles.icon}
            source={{uri: icon}}
          />
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 30,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  textContainer: {
    width: '70%',
    marginRight: 13,
    marginLeft: 13,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  name: {
    color: colors.BESTOF2.BG1,
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT,
    lineHeight: 20.8,
  },
  checkBox: {
    width: 16,
    height: 16,
    marginTop: -1,
    marginLeft: 26,
  },
  icon: {
    top: -2,
    position: 'absolute',
    right: 20,
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
});

export default SelectBox;
