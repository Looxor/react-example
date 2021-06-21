import React from "react";
import { Dimensions, SafeAreaView } from "react-native";
import Carousel from "react-native-snap-carousel";
import styles from "./SummaryScreen.style";
import CustomHeader from "./_Components/CustomHeader";
import SummaryItem from "./_Components/SummaryItem";
import useSummaryViewModel from "../_ViewModels/SummaryViewModel";
import FastImage from "react-native-fast-image";

const deviceWidth = Dimensions.get('window').width;

const SummaryScreen = props => {
  const view = useSummaryViewModel({props});
  const summary_user_info = view.summary_user_info;
  const summary = view.summaries[0];
  console.log('summary', summary);
  return (
    <SafeAreaView style={styles.container}>
      <FastImage
        resizeMode={'contain'}
        source={require('../../../../assets/images/icons/bestofs_trasparent_background_blue.png')}
        style={styles.imageBackgroundContainer}>
        <CustomHeader navigation={props.navigation} />
        <Carousel
          data={view.summaries}
          renderItem={({item, index}) => {
            return (
              <SummaryItem
                bestof_id={view.bestof_id}
                summary_user_info={summary_user_info}
                summary={item}
              />
            );
          }}
          sliderWidth={deviceWidth}
          itemWidth={deviceWidth * 0.9}
          hasParallaxImages={true}
          firstItem={0}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          containerCustomStyle={styles.slider}
          loop={false}
          autoplay={false}
          autoplayDelay={0}
          autoplayInterval={4000}
          removeClippedSubviews={false}
        />
      </FastImage>
    </SafeAreaView>
  );
};

export default SummaryScreen;
