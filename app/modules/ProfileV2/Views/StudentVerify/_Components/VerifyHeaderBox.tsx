import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors, constants} from '../../../../../config';
import Strings from '../../../../../utils/misc/TextComponents';

const VerifyHeaderBox = props => {
  const {
    image,
    title,
    text,
    text2,
    viewStyle,
    iconStyle,
    titleStyle,
    textStyle,
  } = props;
  return (
    <View style={{...styles.view, ...viewStyle}}>
      <FastImage
        resizeMode="contain"
        style={{...styles.image, ...iconStyle}}
        source={image}
      />
      <Text style={{...styles.title, ...titleStyle}}>{title}</Text>
      <Text style={{...styles.text, ...textStyle}}>
        {Strings.makeBold(text)}
        {text2 && Strings.makeBold(text2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    borderRadius: 18,
    margin: 10,
    marginTop: 35,
  },
  image: {
    width: 80,
    height: 80,
  },
  title: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 24,
    color: colors.DARK_ALOE_TF,
    marginTop: 35,
    marginLeft: -2,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 18,
    color: colors.DARK_ALOE_TF,
    marginTop: 5,
    lineHeight: 20,
    marginLeft: -2,
  },
});

export default VerifyHeaderBox;
