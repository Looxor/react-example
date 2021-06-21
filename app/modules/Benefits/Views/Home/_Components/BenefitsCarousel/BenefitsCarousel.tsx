import React, { useEffect, useState } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import colors from "../../../../../../config/colors";
import { CallServerPromise } from "../../../../../../utils/app/CallServer";

import CarouselBox from "./CarouselBox";
import moment from "moment";

const R = 6 / 16; // image is 16:9
const TITLE_HEIGHT = 60; // height of title in container

const width = Dimensions.get('window').width - 20;
const height = width * R + TITLE_HEIGHT;
export const HOME_CAROUSEL_HEIGHT = height;

const BenefitsCarousel = props => {
  const {items, getRibbonImages} = props;

  const [dispData, setDispData] = useState({
    activeIndex: 0,
    dateString: '',
  });

  const _renderItem = ({item, index, noCarousel}, dateString, ribbonImages) => (
    <CarouselBox
      onSelectItem={props.onSelectItem}
      dateString={dateString}
      ribbonImages={ribbonImages}
      item={item}
      width={width}
      height={height}
      imageWidth={width}
      imageHeight={width * R}
      titleHeight={TITLE_HEIGHT}
      noCarousel={noCarousel}
    />
  );

  const componentDidMount = () => {
    moment.locale('it');
    const loadDateString = async () => {
      const request = await CallServerPromise.get_date_string();
      if (request.success) {
        const dateString = request.data;
        setDispData({...dispData, dateString});
      }
    };
    loadDateString();
    return () => {};
  };
  useEffect(componentDidMount, []);

  return items.length === 0 ? null : (
    <View
      style={[
        styles.container,
        {width: width + 20},
        {height: height + (items.length > 1 ? 25 : 0)},
        props.style,
      ]}>
      <View style={[styles.subContainer, {height: height + 10}]}>
        {items.length === 1 &&
          _renderItem(
            {item: items[0], index: 0, noCarousel: true},
            dispData.dateString,
            getRibbonImages ? getRibbonImages(items[0]) : [],
          )}
        {items.length > 1 && (
          <Carousel
            data={items}
            renderItem={({item, index}) =>
              _renderItem(
                {item, index, noCarousel: false},
                dispData.dateString,
                getRibbonImages ? getRibbonImages(item) : [],
              )
            }
            keyExtractor={(item, index) => String(index)}
            sliderWidth={width + 20}
            itemWidth={width - 15}
            hasParallaxImages={true}
            firstItem={0}
            inactiveSlideScale={0.9}
            inactiveSlideOpacity={0.5}
            loop={true}
            autoplay={false}
            autoplayDelay={500}
            autoplayInterval={3000}
            removeClippedSubviews={false}
            onSnapToItem={selectedIndex => {
              setDispData({...dispData, activeIndex: selectedIndex});
            }}
          />
        )}
      </View>
      {items.length > 1 && (
        <Pagination
          containerStyle={{marginTop: -25}}
          dotsLength={items.length}
          activeDotIndex={dispData.activeIndex}
          dotStyle={{
            width: 12,
            height: 12,
            borderRadius: 10,
            backgroundColor: colors.COUPONS.BG1, //'rgba(0, 0, 255, 0.92)'
          }}
          inactiveDotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: 'rgba(255, 255, 255, 1)',
          }}
          inactiveDotScale={1}
          inactiveDotOpacity={1}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    marginTop: 10,
    shadowColor: colors.lightGray,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
  },
  subContainer: {
    width: '100%',
    height: '100%',
  },
  item: {
    flexDirection: 'column',
  },
  slider: {},
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}),
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  title: {
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: colors.THEFACULTY,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BenefitsCarousel;
