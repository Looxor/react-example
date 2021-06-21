// Libraries //
import * as React from "react";
import Carousel from "react-native-snap-carousel";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import colors from "../../../config/colors";
import SliderEntry from "./SliderEntry";

interface Props {
  data: any;
  onPress: () => void;
  navigation: any;
}

export default class HomeCarousel extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  _renderItem({item, index}) {
    return <SliderEntry navigation={this.props.navigation} data={item} />;
  }

  render() {
    const {data, onPress, navigation} = this.props;
    data && (data.navigation = navigation);
    return (
      <View style={styles.container_carousel}>
        <Carousel
          data={data}
          renderItem={this._renderItem.bind(this)}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          hasParallaxImages={true}
          firstItem={0}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          containerCustomStyle={styles.slider}
          loop={true}
          autoplay={true}
          autoplayDelay={0}
          autoplayInterval={4000}
          removeClippedSubviews={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container_carousel: {
    flex: 1,
  },
  item: {
    height: 230,
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
  subtitle: {
    marginTop: 5,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: colors.THEFACULTY,
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
