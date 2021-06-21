import * as React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import constants from "../config/constants";
import standardFunctions from '../utils/app/StandardFunctions';

interface Props {
  label?: string;
  style?: {};
  textStyle?: any;
  disabled?: boolean;
  onPress?: () => void;
  testID?: any;
}

const CustomText = (props: any) => {
  if (typeof props.children === 'string') {
    return <Text style={props.style}>{props.children}</Text>;
  } else {
    return props.children || <Text />;
  }
};

class Button extends React.Component<Props> {
  onPress() {
    this.props.onPress();
    standardFunctions.play_tap_sound();
  }

  render() {
    const {style, textStyle, disabled, testID} = this.props;
    return (
      <TouchableOpacity
        testID={testID}
        disabled={disabled}
        style={[styles.container, disabled ? styles.disabledButton : {}, style]}
        activeOpacity={constants.ACTIVE_OPACITY}
        onPress={() => this.onPress()}>
        <CustomText style={[styles.text, textStyle]}>
          {this.props.children}
        </CustomText>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '92%',
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: colors.THEFACULTY,
    backgroundColor: colors.DARK_ALOE_TF,
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 15,
    borderWidth: 0,
    shadowColor: colors.lightGray,
    shadowOpacity: 0.4,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    elevation: 1,
  },
  text: {
    flex: 1,
    color: colors.WHITE,
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 18,
  },
  disabledButton: {
    backgroundColor: colors.lightGray,
    borderColor: colors.lightGray,
  },
});

export default Button;
