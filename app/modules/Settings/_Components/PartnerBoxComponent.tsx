import React from "react";
import { StyleSheet, View } from "react-native";

import LinearGradient from "react-native-linear-gradient";
import FastImage from "react-native-fast-image";

import { colors } from "../../../config";

const PartnerBoxComponent = props => {
  return (
    <View style={[styles.container, props.style]}>
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: 0}}
        colors={[colors.GENERAL.START, colors.GENERAL.FINISH]}
        style={styles.gradientView}>
        <FastImage
          resizeMode={'contain'}
          style={styles.mainImage}
          source={require('../../../../assets/images/icons/icn_hands.png')}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    margin: 5,
    marginTop: 7,
  },
  gradientView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  mainImage: {
    width: 80,
    height: 80,
  },
  text: {
    color: colors.WHITE,
    fontSize: 16,
    marginTop: 7,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  textBold: {
    fontWeight: 'bold',
  },
});

export default PartnerBoxComponent;
