import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

import { colors, constants, strings } from "../../../../../config";
import Strings from "../../../../../utils/misc/TextComponents";
import ProgressBox from "./ProgressBox";
import standardFunctions from "../../../../../utils/app/StandardFunctions";

const boxWidth = Dimensions.get('window').width;
const boxHeight = 180;
const vOffset = 60;
const hOffset = 50;

const MainHeaderBox = props => {
  // @ts-ignore
  const today = Math.round(Math.abs(new Date() / (24 * 60 * 60 * 1000)));
  // @ts-ignore
  const a_month = Math.round(
    Math.abs(
      (+new Date(props.next_coins_reset_date) - 2592000000) /
        (24 * 60 * 60 * 1000),
    ),
  );
  // @ts-ignore
  const end_day = Math.round(
    Math.abs(+new Date(props.next_coins_reset_date) / (24 * 60 * 60 * 1000)),
  );
  const percentage = 100 - ((end_day - today) * 100) / (end_day - a_month);

  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
        <Svg
          height={boxHeight}
          width={boxWidth}
          viewBox={`0 0 ${boxWidth} ${boxHeight}`}>
          <Defs>
            <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop
                offset="0%"
                stopColor={colors.GENERAL.START}
                stopOpacity="1"
              />
              <Stop
                offset="100%"
                stopColor={colors.GENERAL.FINISH}
                stopOpacity="1"
              />
            </LinearGradient>
          </Defs>
          <Path
            d={`M -${hOffset},0 L -${hOffset},${boxHeight} C -${hOffset},${
              boxHeight - vOffset
            } ${boxWidth + hOffset},${boxHeight - vOffset} ${
              boxWidth + hOffset
            },${boxHeight} l 0, -${boxHeight}`}
            fill="url(#grad)"
            // fill={colors.WHITE}
          />
        </Svg>
        <View style={styles.headerPointsContainer}>
          <Image
            resizeMode={'contain'}
            source={require('../../../../../../assets/images/icons/icn_new_tf_coin.png')}
            style={styles.pointsIcon}
          />
          <Text style={styles.pointsText}>
            {Strings.currencyFormat(props.total_coins)}
          </Text>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <ProgressBox
          progress={
            props.next_coins_reset_date === undefined ||
            props.next_coins_reset_date === ''
              ? -100
              : percentage
          }
          descriptionDesc={strings.WALLET.MAIN.RESET_COINS_LABEL.replace(
            '{DATE}',
            standardFunctions.convert_date_from_rfc_to_string(
              props.next_coins_reset_date,
            ),
          )}
        />
      </View>
    </View>
  );
};

/*
<PointsBox
          color={colors.WHITE}
          textColor={colors.THEFACULTY}
          displayValue={props.total_coins}
          currentValue={percentage}
          start_color={percentage <= 10 ? colors.RED_TF : colors.THEFACULTY}
          finish_color={percentage <= 10 ? colors.RED_TF : colors.THEFACULTY}
          maxValue={100}
        />
 */

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: boxHeight + 20,
    alignItems: 'center',
  },
  pointsContainer: {
    width: '100%',
    height: boxHeight + 5,
    alignItems: 'center',
    overflow: 'visible',
  },
  headerPointsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    height: 90,
  },
  pointsText: {
    marginTop: -3,
    marginLeft: 5,
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT_BOLD,
    color: colors.WHITE,
    fontSize: 28,
  },
  pointsIcon: {
    marginTop: -5,
    width: 30,
    height: 30,
  },
  progressContainer: {
    position: 'absolute',
    width: '100%',
    marginTop: 80,
  },
});

export default MainHeaderBox;
