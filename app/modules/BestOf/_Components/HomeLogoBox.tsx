import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

import { colors } from "../../../config";
import PointsBox from "./PointsBox";
import { Observable } from "../../_CommonModels/ViewModelBase";

const boxWidth = Dimensions.get('window').width;
const boxHeight = 140;
const vOffset = 60;
const hOffset = 50;

const HomeLogoBox = props => {
  const userTotalCoins = Observable.getReduxValue('total_coins');
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
                stopColor={colors.BESTOF.START}
                stopOpacity="1"
              />
              <Stop
                offset="100%"
                stopColor={colors.BESTOF.FINISH}
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
        <PointsBox
          color={colors.BESTOF.DEFAULT}
          start_color={colors.BESTOF.START}
          finish_color={colors.BESTOF.FINISH}
          displayValue={userTotalCoins}
        />
      </View>
    </View>
  );
};

/* SCOREBOARD BOX
      <Button style={styles.classButton} textStyle={styles.classButtonText}>
        {strings.BESTOF.HOME_SCREEN_BUTTON_TEXT}
      </Button>
*/

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: boxHeight + 60,
    alignItems: 'center',
  },
  pointsContainer: {
    width: '100%',
    height: boxHeight + 5,
    alignItems: 'center',
    overflow: 'visible',
  },
  classButton: {
    marginTop: 10,
    width: 150,
    height: 31,
    justifyContent: 'center',
  },
  classButtonText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default HomeLogoBox;
