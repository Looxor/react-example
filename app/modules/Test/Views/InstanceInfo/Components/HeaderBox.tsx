import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StandardBoxWithComponent } from "../../../../../components";
import { colors, constants, strings } from "../../../../../config";
import FastImage from "react-native-fast-image";

const HeaderBox = props => {
  const navigation = useNavigation();
  const onPressLinkButton = () => {};
  return (
    <StandardBoxWithComponent
      background_start_color={colors.TEST.START}
      background_finish_color={colors.TEST.FINISH}
      viewStyle={styles.headerBox}>
      <TouchableOpacity style={styles.headerBoxLinkButton}>
        <FastImage
          style={styles.headerBoxLinkImage}
          source={require('../../../../../../assets/images/icons/icn_search_green.png')}
        />
        <Text style={styles.headerBoxLinkText}>
          simulatore.thefacultyapp.com
        </Text>
      </TouchableOpacity>
      <Text style={styles.headerBoxText}>
        {strings.TEST.INSTANCE_INFO.BOX_SUBDESC}
      </Text>
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
    textAlign: 'left',
    fontSize: 12,
    color: colors.WHITE,
    paddingHorizontal: 30,
    fontFamily: constants.DEFAULT_FONT,
  },
  headerBoxLinkButton: {
    flexDirection: 'row',
    marginBottom: 7,
  },
  headerBoxLinkText: {
    fontSize: 14,
    color: colors.WHITE,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
  },
  headerBoxLinkImage: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
});

export default HeaderBox;
