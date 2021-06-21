import React, { Component } from "react";
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import FastImage from "react-native-fast-image";
import { colors, constants } from "../../../config";
import { routes } from "../../../navigation/rootNavigation/navigation.constants";
import LinearGradient from "react-native-linear-gradient";
import standardFunctions from '../../../utils/app/StandardFunctions';

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
    navigation: PropTypes.any,
  };

  openCarouselPage(data: any, navigation: any) {
    if (data.action === 1) {
      return;
    }
    standardFunctions.play_tap_sound();
    navigation.navigate(routes.CAROUSEL, {
      screen: routes.CAROUSEL_PAGE,
      params: {carousel_data: data},
    });
  }

  render() {
    let {
      // @ts-ignore
      data: {
        title,
        text,
        media_url,
        background_home_text_start_color,
        background_home_text_finish_color,
        home_title_color,
        home_text_color,
      },
      // @ts-ignore
      navigation,
    } = this.props;

    background_home_text_finish_color =
      background_home_text_finish_color || '#FFFFFF';
    background_home_text_start_color =
      background_home_text_start_color || '#FFFFFF';
    home_text_color = home_text_color || '#444';
    home_title_color = home_title_color || colors.THEFACULTY;

    const uppercaseTitle = title ? (
      <Text style={[styles.title, {color: home_title_color}]} numberOfLines={2}>
        {title}
      </Text>
    ) : (
      <Text style={[styles.title, {color: home_title_color}]} />
    );

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => {
          // @ts-ignore
          this.openCarouselPage(this.props.data, navigation);
        }}>
        <View style={[styles.imageContainer]}>
          <FastImage source={{uri: media_url}} style={styles.image} />
        </View>
        <LinearGradient
          style={[styles.textContainer]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[
            background_home_text_start_color,
            background_home_text_finish_color,
          ]}>
          {uppercaseTitle}
          <Text
            style={[styles.subtitle, {color: home_text_color}]}
            numberOfLines={2}
            ellipsizeMode={'tail'}>
            {text}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  slideInnerContainer: {
    width: Dimensions.get('window').width,
  },
  imageContainer: {
    aspectRatio: 16 / 9,
    width: Dimensions.get('window').width,
    marginBottom: Platform.OS === 'ios' ? 0 : -1,
    backgroundColor: 'white',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  textContainer: {
    justifyContent: 'center',
    height: 95,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  title: {
    marginTop: 5,
    justifyContent: 'center',
    fontSize: 20,
    lineHeight: 21,
    fontFamily: constants.DEFAULT_FONT_BOLD,
  },
  subtitle: {
    marginTop: 6,
    fontFamily: constants.DEFAULT_FONT,
    color: '#666',
    fontSize: 14,
  },
});
