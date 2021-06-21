import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors, constants } from "../../../config";

interface Props {
  label: string;
  style: {};
  onPress: () => void;
}

class StandardButton extends React.Component<Props> {
  render() {
    const {label, onPress, style} = this.props;
    return (
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <Text style={styles.text}>{label}</Text>
        <Image
          resizeMode={'contain'}
          source={require('../../../../assets/images/icons/icn_camera_white.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.THEFACULTY,
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  text: {
    marginTop: -4,
    height: 20,
    color: colors.WHITE,
    textAlign: 'left',
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 18,
    marginLeft: 20,
  },
  icon: {
    width: 23,
    height: 23,
    marginRight: 20,
  },
});

export default StandardButton;
