import React from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { colors, constants } from "../../../../../config";

import Strings from "../../../../../utils/misc/TextComponents";

const ProgressBox = props => {
  const progress = props.progress - 2 || -2;
  const descriptionDesc = props.descriptionDesc || '';

  return (
    <View style={styles.container}>
      {props.progress !== -100 &&
        Strings.makeBold(descriptionDesc, {style: styles.title})}
      {props.progress === -100 && (
        <ActivityIndicator
          style={{alignSelf: 'center'}}
          color={colors.THEFACULTY}
        />
      )}
      {props.progress !== -100 && (
        <View style={styles.progressBarContainer}>
          <Image
            resizeMode={'contain'}
            source={require('../../../../../../assets/images/icons/icn_expiring_bar_wallet.png')}
            style={styles.progressImage}
          />
          <View style={styles.calendarIconContainer}>
            <Image
              resizeMode={'contain'}
              source={
                props.progress < 85
                  ? require('../../../../../../assets/images/icons/icn_calendar_blue.png')
                  : require('../../../../../../assets/images/icons/icn_calendar_red.png')
              }
              style={[
                styles.calendarIcon,
                {
                  left: `${
                    progress >= -2 && progress <= 100
                      ? progress
                      : progress > 100
                      ? 98
                      : progress
                  }%`,
                },
              ]}
            />
          </View>
        </View>
      )}
      {descriptionDesc === '' && <View style={{height: 10}} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    marginHorizontal: 15,
    padding: 20,
    backgroundColor: colors.WHITE,
    borderRadius: 18,
    shadowColor: colors.lightGray,
    shadowOpacity: 0.4,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 8,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    top: 20,
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    marginBottom: 5,
  },
  progressBarContainer: {
    marginVertical: 5,
    width: '100%',
  },
  progressImage: {
    marginTop: 30,
    width: '100%',
  },
  calendarIconContainer: {
    position: 'absolute',
    width: '92%',
  },
  calendarIcon: {
    marginTop: 17,
    shadowColor: colors.lightGray,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    left: '-2%',
  },
});

export default ProgressBox;
