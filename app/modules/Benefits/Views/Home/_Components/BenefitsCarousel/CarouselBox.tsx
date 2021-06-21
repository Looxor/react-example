import React, { useEffect, useState } from "react";

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";

import standardFunctions from "../../../../../../utils/app/StandardFunctions";
import { colors, strings } from "../../../../../../config";
import constants from "../../../../../../config/constants";

const CarouselBox = props => {
  const {item, ribbonImages, noCarousel} = props;
  const [secondTitle, setSecondTitle] = useState('');

  const componentDidMount = () => {
    if (item.denominations) {
      item.denominations.forEach(denomination => {
        if (denomination.is_highlighted) {
          setSecondTitle(' ' + denomination.name);
        }
      });
    }
  };

  useEffect(componentDidMount, []);

  return (
    <TouchableOpacity
      activeOpacity={constants.ACTIVE_OPACITY}
      style={[styles.container, noCarousel && styles.containerNoCarousel]}
      onPress={() => props.onSelectItem({item})}>
      <View style={styles.ribbonImageContainer}>
        {ribbonImages.map((ribbonImage, index) => {
          return ribbonImage !== 'multiple_use_label' &&
            ribbonImage !== 'cashback_label' ? (
            <Image
              key={String(index)}
              resizeMode={'contain'}
              style={[styles.ribbonImage, index !== 0 && {marginLeft: -5}]}
              source={ribbonImage}
            />
          ) : (
            <Text key={String(index)} style={styles.ribbonLabel}>
              {ribbonImage === 'multiple_use_label'
                ? strings.COUPONS.HOME.MULTIPLE_USE_RIBBON_LABEL
                : strings.COUPONS.HOME.CASHBACK_RIBBON_LABEL}
            </Text>
          );
        })}
      </View>
      <View
        style={[
          styles.topContainer,
          {width: props.imageWidth, height: props.imageHeight},
        ]}>
        <FastImage source={{uri: item.image_url}} style={[styles.topImage]} />
      </View>
      <View
        style={[
          styles.bottomContainer,
          {width: props.width, height: props.titleHeight},
        ]}>
        <View />
        <Text style={styles.bottomTitle} lineBreakMode="tail" numberOfLines={3}>
          {item.title + secondTitle}
        </Text>
        {item.finish_date && (
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.bottomFinishDate}>
              {strings.COUPONS.HOME.GENERABLE_UNTIL}
            </Text>
            <Text
              style={[
                styles.bottomFinishDate,
                {fontFamily: constants.DEFAULT_FONT_BOLD},
              ]}>
              {standardFunctions.convert_date_from_rfc_to_string(
                item.finish_date,
              )}
            </Text>
          </View>
        )}
        <View />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: colors.lightGray,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 3,
    elevation: 3,
    marginLeft: -2,
    marginRight: -2,
    transform: [{perspective: 600}, {rotateX: '-3deg'}],
  },
  containerNoCarousel: {
    marginLeft: 12,
    marginRight: 12,
  },
  topContainer: {
    borderWidth: 0,
    height: '100%',
    backgroundColor: colors.GREEN_TF,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.WHITE,
  },
  bottomContainer: {
    backgroundColor: colors.WHITE,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomTitle: {
    color: colors.DARK_ALOE_TF,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 16,
    textAlign: 'center',
  },
  bottomFinishDate: {
    marginTop: -6,
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    color: colors.LIGHT_ALOE_TF,
    textAlign: 'center',
  },
  bottomFinishDateBold: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 10,
    color: colors.LIGHT_ALOE_TF,
    textAlign: 'center',
  },
  ribbonImageContainer: {
    flexDirection: 'row',
    width: 100,
    height: 25,
    position: 'absolute',
    zIndex: 2,
    elevation: 10,
    left: 5,
    top: 5,
  },
  ribbonImage: {
    height: 25,
    zIndex: 2,
    // elevation: 10,
  },
  ribbonLabel: {
    width: 100,
    top: 3.5,
    color: colors.WHITE,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    textShadowColor: colors.BLACK,
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
    elevation: 12,
    zIndex: 25,
  },
});

export default CarouselBox;
