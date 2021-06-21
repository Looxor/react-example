import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import Strings from "../../../utils/misc/TextComponents";
import colors from "../../../config/colors";
import { constants, strings } from "../../../config";

const onboardings = [
  {
    image: require('../../../../assets/images/icons/icn_ob_1.png'),
    imageWidth: 177,
    imageHeight: 151,
    title: strings.FIRST_SCREEN.ONBOARD1.TITLE,
    text: strings.FIRST_SCREEN.ONBOARD1.TEXT,
  },
  {
    image: require('../../../../assets/images/icons/icn_ob_2.png'),
    imageWidth: 151,
    imageHeight: 165,
    title: strings.FIRST_SCREEN.ONBOARD2.TITLE,
    text: strings.FIRST_SCREEN.ONBOARD2.TEXT,
  },
  {
    image: require('../../../../assets/images/icons/icn_onboarding_benefits_1.png'),
    imageWidth: 161,
    imageHeight: 168,
    title: strings.FIRST_SCREEN.ONBOARD3.TITLE,
    text: strings.FIRST_SCREEN.ONBOARD3.TEXT,
  },
  {
    image: require('../../../../assets/images/icons/icn_ob_5.png'),
    imageWidth: 202,
    imageHeight: 169,
    title: strings.FIRST_SCREEN.ONBOARD4.TITLE,
    text: strings.FIRST_SCREEN.ONBOARD4.TEXT,
  },
];

const CarouselItem = props => {
  const {item, index} = props;
  return (
    <View key={String(index)} style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.imageContainer}>
          <FastImage
            resizeMode={'contain'}
            source={item.image}
            style={[
              styles.image,
              {width: item.imageWidth, height: item.imageHeight},
            ]}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{Strings.makeBold(item.title)}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    </View>
  );
};

const CarouselDotItem = props => {
  const {index, selected} = props;
  return (
    <View
      key={String(index)}
      style={[styles.dotItem, selected ? styles.selectedDotItem : {}]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    height: '95%',
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 18,
    shadowColor: colors.lightGray,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 4,
    elevation: 6,
  },
  container2: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 20,
    borderRadius: 18,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  imageContainer: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {},
  textContainer: {},
  title: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 20,
  },
  text: {
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    color: colors.gray,
  },
  dotItem: {
    backgroundColor: colors.THEFACULTY,
    width: 6,
    height: 6,
    borderRadius: 5,
    marginHorizontal: 6,
    opacity: 0.1,
  },
  selectedDotItem: {
    width: 10,
    height: 10,
    opacity: 0.8,
  },
});

export default CarouselItem;
export {onboardings, CarouselDotItem};
