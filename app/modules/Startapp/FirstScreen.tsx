// Libraries //
import * as React from "react";
import { useState } from "react";
import { Dimensions, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
// Configs //
import { routes } from "../../navigation/rootNavigation/navigation.constants";
import Carousel from "react-native-snap-carousel";
import FastImage from "react-native-fast-image";
import CarouselItem, { CarouselDotItem, onboardings } from "./_Components/CarouselItem";
import FirstButtons from "./_Components/FirstButtons";
import { colors } from "../../config";
import standardFunctions from "../../utils/app/StandardFunctions";

const sliderWidth = Dimensions.get('window').width,
  itemWidth = sliderWidth * 0.8;

const renderCarouselItem = ({item, index}) => {
  return <CarouselItem item={item} index={index} key={String(index)} />;
};

const renderCarouselDotItem = ({index, selected}) => (
  <CarouselDotItem index={index} selected={selected} key={String(index)} />
);

const FirstScreen = props => {
  const {navigation} = props;

  const [selectedDotIndex, setSelectedDotIndex] = useState(0);

  const handleButtonSignUpClicked = () => {
    navigation.navigate(routes.LOGIN);
  };

  const handleButtonLoginClicked = () => {
    navigation.navigate(routes.LOGIN);
  };

  return (
    <>
      <SafeAreaView testID={'welcome'} style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor="transparent"
        />
        <View style={{height: '73%'}}>
          <FastImage
            resizeMode={'contain'}
            style={styles.logoImage}
            source={require('../../../assets/images/logo/icn_complete_logo_2021.png')}
          />
          <Carousel
            containerCustomStyle={styles.onboardSlider}
            data={onboardings}
            renderItem={renderCarouselItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            onSnapToItem={selectedIndex => {
              standardFunctions.add_firebase_event_log(
                'onboarding',
                'onboarding_first_screen_showed',
                {page: selectedIndex},
              );
              setSelectedDotIndex(selectedIndex);
            }}
          />
          <View style={styles.dotItemsContainer}>
            {onboardings.map((item, index) =>
              renderCarouselDotItem({
                index,
                selected: selectedDotIndex === index,
              }),
            )}
          </View>
        </View>
        <View style={{padding: 0}}>
          <FirstButtons
            onPressSignup={handleButtonSignUpClicked}
            onPressLogin={handleButtonLoginClicked}
          />
        </View>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.THEFACULTY}} />
    </>
  );
};

FirstScreen.navigationOptions = () => ({
  header: null,
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.WHITE,
  },
  logoImage: {
    width: 500,
    height: 90,
    alignSelf: 'center',
    marginTop: 15,
  },
  onboardSlider: {},
  dotItemsContainer: {
    width: '100%',
    marginTop: 10,
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export default FirstScreen;
