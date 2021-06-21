import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../config/colors";
import constants from "../config/constants";
import Button from "./Button";

interface Props {
  main_button_label?: any;
  main_button_color?: string;
  main_button_visible: boolean;

  secondary_button_label?: any;
  secondary_button_color?: string;
  secondary_button_visible: boolean;

  onPressMain?: () => void;
  onPressSecondary?: () => void;
}

const CustomText = (props: any) => {
  if (typeof props.children === 'string') {
    return <Text {...props}>{props.children}</Text>;
  } else {
    return props.children;
  }
};

class StandardBottomButtons extends React.Component<Props> {
  render() {
    const {
      main_button_label,
      secondary_button_label,
      main_button_color,
      secondary_button_color,
      onPressMain,
      onPressSecondary,
      main_button_visible,
      secondary_button_visible,
    } = this.props;
    if (main_button_visible && secondary_button_visible) {
      return (
        <View style={styles.bottom_buttons}>
          <TouchableOpacity onPress={onPressSecondary}>
            <CustomText
              style={[
                styles.secondary_button,
                {color: secondary_button_color},
              ]}>
              {secondary_button_label}
            </CustomText>
          </TouchableOpacity>
          <Button
            style={{
              marginTop: 8,
              backgroundColor: main_button_color,
              alignSelf: 'center',
            }}
            onPress={onPressMain}>
            {main_button_label}
          </Button>
        </View>
      );
    } else if (main_button_visible && !secondary_button_visible) {
      return (
        <View style={styles.bottom_buttons}>
          <Button
            style={{
              marginTop: 8,
              backgroundColor: main_button_color,
              alignSelf: 'center',
            }}
            onPress={onPressMain}>
            {main_button_label}
          </Button>
        </View>
      );
    } else if (!main_button_visible && secondary_button_visible) {
      return (
        <View style={styles.bottom_buttons}>
          <TouchableOpacity onPress={onPressSecondary}>
            <CustomText style={styles.secondary_button}>
              {secondary_button_label}
            </CustomText>
          </TouchableOpacity>
        </View>
      );
    } else {
      return {};
    }
  }
}

const styles = StyleSheet.create({
  bottom_buttons: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 2,
  },
  secondary_button: {
    color: colors.BLACK,
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    marginTop: 12,
  },
});

export default StandardBottomButtons;
