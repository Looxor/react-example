import * as React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import constants from "../config/constants";
import standardFunctions from '../utils/app/StandardFunctions';

interface Props {
  label?: any;
  style?: {};
  onPress?: () => void;
  labelColor?: string;
  disabled?: boolean;
}

const CustomText = (props: any) => {
  if (typeof props.children === 'string') {
    return <Text {...props}>{props.children}</Text>;
  } else {
    return props.children;
  }
};

class StandardButton extends React.Component<Props> {
  onPress() {
    this.props.onPress();
    standardFunctions.play_tap_sound();
  }
  render() {
    const {label, style, labelColor, disabled} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={constants.ACTIVE_OPACITY}
        disabled={disabled}
        style={[styles.container, style]}
        onPress={() => this.onPress()}>
        <CustomText
          style={[
            styles.text,
            {color: labelColor ? labelColor : colors.WHITE},
          ]}>
          {label}
        </CustomText>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: colors.THEFACULTY,
    backgroundColor: colors.DARK_ALOE_TF,
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  text: {
    flex: 1,
    color: colors.WHITE,
    textAlign: 'center',
    height: 20,
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 18,
  },
});

export default StandardButton;
