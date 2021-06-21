import React from "react";
import { StyleSheet, Text } from "react-native";
import { StandardBoxWithComponent } from "../../../../../components";
import { colors, constants } from "../../../../../config";

const HeaderBox = props => {
  return (
    <StandardBoxWithComponent
      background_start_color={colors.TEST.START}
      background_finish_color={colors.TEST.FINISH}
      viewStyle={styles.headerBox}>
      <Text style={styles.headerBoxText}>{props.text}</Text>
    </StandardBoxWithComponent>
  );
};

const styles = StyleSheet.create({
  headerBox: {
    width: '96%',
    height: 115,
    marginHorizontal: 0,
    alignSelf: 'center',
    borderRadius: 12,
  },
  headerBoxText: {
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 17,
    color: colors.WHITE,
    paddingHorizontal: 30,
    fontFamily: constants.DEFAULT_FONT,
  },
});

export default HeaderBox;
