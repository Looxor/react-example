import React from "react";
import { StyleSheet, View } from "react-native";

import LinearGradient from "react-native-linear-gradient";
import FastImage from "react-native-fast-image";

import { colors } from "../../../config";

const CartaBoxWithComponent = props => {
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: 0}}
        colors={[colors.COUPONS.START, colors.COUPONS.FINISH]}
        style={styles.gradientView}>
        <FastImage
          style={styles.mainImage}
          source={require('../../../../assets/images/icons/icn_esselunga_1.png')}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 135,
  },
  gradientView: {
    height: 135,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 18,
  },
  mainImage: {
    width: 75,
    height: 75,
  },
  yourFacultyText: {
    color: colors.WHITE,
    fontSize: 16,
    marginTop: 7,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  yourFacultyTextBold: {
    fontWeight: 'bold',
  },
});

export default CartaBoxWithComponent;
