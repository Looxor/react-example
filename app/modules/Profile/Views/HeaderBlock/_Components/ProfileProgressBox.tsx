import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, constants, strings } from "../../../../../config";

import Strings from "../../../../../utils/misc/TextComponents";
import ProgressBar from "../../../../../components/ProgressBar";
import FastImage from "react-native-fast-image";

const ProfileProgressBox = props => {
  const progress = props.progress || 0;
  const descriptionDesc = props.descriptionDesc || ''; //'Inserisci [bold]i tuoi dati[/bold] per ottenere subito 20 gettoni';
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {strings.PROFILE.HOME.TITLE} {progress}%
      </Text>
      <View style={styles.progressBarContainer}>
        <ProgressBar
          progress={progress}
          colors={[colors.GENERAL.START, colors.PURPLE_TF]}
          backBarColor={colors.LIGHT_SILVER}
          height={11}
          style={{
            flex: 1,
            borderRadius: 0,
            borderBottomLeftRadius: 5,
            borderTopLeftRadius: 5,
          }}
        />
        <View style={styles.rocketIconContainer}>
          <FastImage
            style={styles.rocketIcon}
            source={require('../../../../../../assets/images/icons/icn_rocket_small.png')}
          />
        </View>
      </View>
      {descriptionDesc !== '' &&
        Strings.makeBold(descriptionDesc, {style: styles.description})}
      {descriptionDesc === '' && <View style={{height: 10}} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    padding: 20,
    backgroundColor: colors.WHITE,
    borderRadius: 18,
    shadowColor: colors.lightGray,
    shadowOpacity: 0.2,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 8,
    elevation: 10,
  },
  title: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 16,
    marginBottom: 5,
  },
  progressBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -7,
  },
  description: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
  },
  rocketIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    shadowColor: colors.lightGray,
    shadowOpacity: 0.2,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 8,
    elevation: 10,
  },
  rocketIcon: {
    width: 13,
    height: 23,
  },
});

export default ProfileProgressBox;
