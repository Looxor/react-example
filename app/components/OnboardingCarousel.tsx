import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Overlay } from "teaset";

import { colors, constants, strings } from "../config";
import FastImage from "react-native-fast-image";
import Strings from "../utils/misc/TextComponents";
import Carousel from "react-native-snap-carousel";
import { Observable } from "../modules/_CommonModels/ViewModelBase";
import { UserData } from "../config/constants";
import standardFunctions from "../utils/app/StandardFunctions";

/*
    !!! IMPORTANT THINGS TO KNOW !!!
    If there is a new section on the onboardings there is to add this line of code when user do the logout:
    // await Observable.setReduxValue("user_{USER_ID}_{SECTION_NAME}_onboarding_showed", false);
 */
const onboardings = {
  home_screen: [
    {
      image: require('../../assets/images/logo/icn_complete_logo_2021.png'),
      imageWidth: 180,
      imageHeight: 180,
      title: strings.HOME.ONBOARD1.TITLE,
      text: strings.HOME.ONBOARD1.TEXT,
    },
    {
      image: require('../../assets/images/icons/icn_crown_coins.png'),
      imageWidth: 120,
      imageHeight: 120,
      title: strings.HOME.ONBOARD2.TITLE,
      text: strings.HOME.ONBOARD2.TEXT,
    },
  ],
  test_screen: [
    {
      image: require('../../assets/images/icons/icn_onboarding_test_1.png'),
      imageWidth: 180,
      imageHeight: 180,
      title: strings.TEST.ONBOARD1.TITLE,
      text: strings.TEST.ONBOARD1.TEXT,
    },
    {
      image: require('../../assets/images/icons/icn_onboarding_test_2.png'),
      imageWidth: 180,
      imageHeight: 180,
      title: strings.TEST.ONBOARD2.TITLE,
      text: strings.TEST.ONBOARD2.TEXT,
    },
  ],
  coupons_screen: [
    {
      image: require('../../assets/images/icons/icn_onboarding_benefits_1.png'),
      imageWidth: 180,
      imageHeight: 180,
      title: strings.COUPONS.ONBOARD1_COUPONS.TITLE,
      text: strings.COUPONS.ONBOARD1_COUPONS.TEXT,
    },
    {
      image: require('../../assets/images/icons/icn_onboarding_benefits_2.png'),
      imageWidth: 180,
      imageHeight: 180,
      title: strings.COUPONS.ONBOARD2_COUPONS.TITLE,
      text: strings.COUPONS.ONBOARD2_COUPONS.TEXT,
    },
  ],
};

const CarouselItem = props => {
  const {item, index} = props;
  return (
    <View key={String(index)} style={styles.itemContainer}>
      <View style={styles.itemContainer2}>
        <Text style={styles.title}>{Strings.parseCoinsText(item.title)}</Text>
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
        <Text style={styles.text}>{Strings.parseSmartText(item.text)}</Text>
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

/*
    user_{USER_ID}_{SECTION_NAME}_onboarding_showed
 */
const OnboardingCarouselPopover = (props: any = {}) => {
  return {
    show: ({screen, always_to_show = false}) => {
      let already_showed = Observable.getReduxValue(
        'user_' +
          UserData.getUserData().user_id +
          '_' +
          screen +
          '_onboarding_showed',
      );
      if (!already_showed || always_to_show) {
        standardFunctions.add_firebase_event_log(
          'onboarding',
          'onboarding_' + screen + '_showed',
          {page: 0},
        );
        Observable.setReduxValue(
          'user_' +
            UserData.getUserData().user_id +
            '_' +
            screen +
            '_onboarding_showed',
          true,
        );
        const overlayId = Overlay.show(
          overlayView({
            getOverlayIdFunc: () => overlayId,
            screen,
          }),
        );
      }
    },
  };
};

const overlayView = ({getOverlayIdFunc, screen}) => (
  <Overlay.View style={styles.overlayContainer}>
    <OverlayChildView
      onHidePopover={() => {
        const overlayId = getOverlayIdFunc();
        Overlay.hide(overlayId, true);
      }}
      screen={screen}
      getOverlayIdFunc={getOverlayIdFunc}
    />
  </Overlay.View>
);

const OverlayChildView = props => {
  const {screen} = props;
  const [selectedDotIndex, setSelectedDotIndex] = useState(0);
  const sliderWidth = Dimensions.get('window').width * (90 / 100),
    itemWidth = sliderWidth * 0.8;

  const closePopover = () => {
    props.onHidePopover && props.onHidePopover();
  };

  const renderCarouselItem = ({item, index}) => {
    return <CarouselItem item={item} index={index} key={String(index)} />;
  };

  const renderCarouselDotItem = ({index, selected}) => (
    <CarouselDotItem index={index} selected={selected} key={String(index)} />
  );

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.closeButton} onPress={closePopover}>
        <FastImage
          style={{width: 20, height: 20}}
          source={require('../../assets/images/icons/icn_close_bestofs_blue.png')}
        />
      </TouchableOpacity>
      <Carousel
        inactiveSlideOpacity={0}
        autoplay={true}
        autoplayInterval={7000}
        loop={false}
        containerCustomStyle={{}}
        data={onboardings[screen]}
        renderItem={renderCarouselItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        onSnapToItem={selectedIndex => {
          standardFunctions.add_firebase_event_log(
            'onboarding',
            'onboarding_' + screen + '_showed',
            {page: selectedIndex},
          );
          setSelectedDotIndex(selectedIndex);
        }}
      />
      {onboardings[screen].length > 1 && (
        <View style={styles.dotItemsContainer}>
          {onboardings[screen].map((item, index) =>
            renderCarouselDotItem({
              index,
              selected: selectedDotIndex === index,
            }),
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  overlay: {
    width: '90%',
    marginHorizontal: 20,
    backgroundColor: colors.WHITE,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    height: 480,
  },
  container: {
    width: '96%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotItemsContainer: {
    width: '100%',
    marginBottom: 15,
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  itemContainer: {
    marginTop: 20,
    backgroundColor: 'transparent',
    height: '100%',
  },
  itemContainer2: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    width: 30,
    height: 30,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    zIndex: 2,
    elevation: 2,
  },
  imageContainer: {
    marginTop: -15,
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {},
  textContainer: {},
  title: {
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 20,
    marginTop: -10,
    color: colors.DARK_ALOE_TF,
  },
  text: {
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    marginTop: -20,
    color: colors.DARK_ALOE_TF,
  },
  dotItem: {
    backgroundColor: colors.THEFACULTY,
    width: 6,
    height: 6,
    borderRadius: 5,
    marginHorizontal: 6,
    opacity: 0.1,
    marginTop: -40,
  },
  selectedDotItem: {
    width: 10,
    height: 10,
    opacity: 0.8,
  },
});

export default OnboardingCarouselPopover;
