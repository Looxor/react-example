import * as React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../../config/colors";
import constants from "../../../config/constants";

interface Props {
  label: string;
  color: string;
  onPress: () => void;
  style: {};
}

class StandardButtonText extends React.Component<Props> {
  render() {
    const {label, color, onPress, style} = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.button, {color: color}, style]}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    color: colors.BLACK,
    textAlign: 'center',
    height: 20,
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    marginTop: 12,
  },
});

export default StandardButtonText;
