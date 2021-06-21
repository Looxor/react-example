import React from "react";
import { colors, constants } from "../config";
import { Label, Popover } from "teaset";
import { StyleSheet } from "react-native";

const PopoverItem = props => {
  const {style, arrow, paddingCorner, textStyle, text} = props;
  return (
    <Popover
      style={[styles.popoverContainer, style]}
      arrow={arrow || 'bottomLeft'}
      paddingCorner={paddingCorner || 20}>
      <Label style={[styles.popoverTextStyle, textStyle]} text={text} />
    </Popover>
  );
};

const styles = StyleSheet.create({
  popoverContainer: {
    backgroundColor: colors.THEFACULTY,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    position: 'absolute',
    zIndex: 2,
    top: -12,
    left: 10,
    width: 200,
    borderRadius: 15,
    shadowColor: '#777',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  popoverTextStyle: {
    color: colors.WHITE,
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
  },
});
export default PopoverItem;
