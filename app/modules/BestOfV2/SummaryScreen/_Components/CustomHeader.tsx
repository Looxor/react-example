import { Dimensions, Platform, StatusBar, StyleSheet, View } from "react-native";
import { BackButtonTop } from "../../../../components";
import React from "react";
import Svg, { LinearGradient, Path, Stop } from "react-native-svg";
import { colors } from "../../../../config";

const width = Dimensions.get('window').width + 1;
const height = 50;
const archHeight = 6;

const CustomHeader = ({navigation}) => (
  <>
    <View
      style={[
        styles.container,
        Platform.OS === 'android' && {marginTop: StatusBar.currentHeight},
      ]}>
      <Svg
        viewBox={`0 0 ${width} ${height + archHeight}`}
        style={{width, height: height + archHeight, ...styles.navBarShadow}}>
        <Path
          fill={'url(#gradient)'}
          d={`
                m0,0 
                L0,${height} 
                C100 ${height + archHeight},${width - 100} ${
            height + archHeight
          },${width} ${height} 
                l0,-${height}z`}
        />
        <LinearGradient id="gradient" x1={0} y1={0} x2={1} y2={0}>
          <Stop offset="0" stopColor={colors.WHITE} />
          <Stop offset="1" stopColor={colors.WHITE} />
        </LinearGradient>
      </Svg>

      <View style={[styles.navBarContainer]}>
        <BackButtonTop
          navigation={navigation}
          icon={require('../../../../../assets/images/icons/icn_back_bestofs.png')}
          iconStyle={{width: 22, height: 22, marginLeft: 30}}
        />
      </View>
    </View>
  </>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: height,
    backgroundColor: 'transparent',
    elevation: 100,
    zIndex: 100,
  },
  navBarContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    elevation: 100,
    zIndex: 100,
  },
  navBarShadow: {
    borderWidth: 0,
    shadowColor: colors.lightGray,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 3,
    elevation: 0,
  },
});

export default CustomHeader;
