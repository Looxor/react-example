import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors, constants } from "../../../config";
import FastImage from "react-native-fast-image";

const SubjectButtonComponent = props => {
  const {subject, style, selected} = props;
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.container, style]}>
      <Text style={styles.text}>{subject.name}</Text>
      {selected && (
        <FastImage
          style={styles.icon}
          source={require('../../../../assets/images/icons/icn_selected_blue.png')}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    backgroundColor: colors.WHITE,
    marginBottom: 10,
    borderRadius: 18,
    paddingLeft: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 16,
  },
  icon: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 15,
  },
});

export default SubjectButtonComponent;
