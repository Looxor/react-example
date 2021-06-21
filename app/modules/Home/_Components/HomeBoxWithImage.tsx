import * as React from "react";
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../config/colors";
import constants from "../../../config/constants";
import LinearGradient from "react-native-linear-gradient";

import EventCenter, { EV_START_ANIM_INTERVAL, EV_STOP_ANIM_INTERVAL } from "../../../utils/misc/EventCenter";
import Strings from "../../../utils/misc/TextComponents";

interface Props {
  box_title: string;
  box_text: string;
  title_color: string;
  text_color: string;
  background_start_color: string;
  background_finish_color: string;
  border_color: string;
  border_width: number;
  images: Array<string>;
  onPress: () => void;
  white_indicator?: boolean;
}

interface State {
  images: Array<string>;
  interval: number;
  image_shown: string;
  fade_animation_value: Animated.Value;
}

class BoxWithImage extends React.Component<Props> {
  readonly state: State = {
    images: [],
    interval: 0,
    image_shown: '',
    fade_animation_value: new Animated.Value(0),
  };
  private _isMounted = false;

  constructor(props) {
    super(props);
    this.setState = this.setState.bind(this);
  }

  loadImages = () => {
    Animated.timing(this.state.fade_animation_value, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  startAnimater = () => {
    var prop_images = this.props.images ? this.props.images : [];
    this._isMounted = true;

    this.state.interval && clearInterval(this.state.interval);
    const _interval = setInterval(() => {
      let images = this.state.images;

      if (images.length === 0) images = prop_images;

      if (this._isMounted) {
        if (images.length == 0) return;

        if (images.length == 1) {
          this.setState({
            image_shown: images[0],
          });
          return;
        }

        var random_image_index = Math.floor(Math.random() * images.length);
        var current_image = images[random_image_index];

        this.setState({
          fade_animation_value: new Animated.Value(0),
          image_shown: current_image,
        });
      }
    }, 1000);

    this.setState({
      interval: _interval,
    });
  };

  componentDidMount() {
    this.startAnimater();
    EventCenter.on(EV_STOP_ANIM_INTERVAL, () => {
      clearInterval(this.state.interval);
    });
    EventCenter.on(EV_START_ANIM_INTERVAL, () => {
      this.startAnimater();
    });
  }

  componentCleanup() {
    this._isMounted = false;
    clearInterval(this.state.interval);
    this.setState({interval: null});
  }

  componentWillUnmount() {
    this.componentCleanup();
  }

  componentDidUpdate(prevProps) {
    if (this.props.images.length !== prevProps.images.length) {
      this.setState({
        images: this.props.images,
        image_shown: this.props.images[0],
      });
    }
  }

  render() {
    const {
      box_title,
      box_text,
      title_color,
      text_color,
      background_start_color,
      background_finish_color,
      border_color,
      border_width,
      white_indicator,
      onPress,
    } = this.props;
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={1.0}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[background_start_color, background_finish_color]}
          style={[
            styles.view,
            {borderColor: border_color, borderWidth: border_width},
          ]}>
          <View style={styles.flap_image} />
          <View style={styles.flap_container}>
            <View style={styles.flap_image_container}>
              <Animated.Image
                source={
                  this.state.image_shown != ''
                    ? {uri: this.state.image_shown}
                    : {}
                }
                onLoad={this.loadImages}
                style={[
                  styles.partner_logo,
                  {
                    opacity: this.state.fade_animation_value,
                    transform: [
                      {
                        scale: this.state.fade_animation_value.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.85, 1],
                        }),
                      },
                    ],
                  },
                ]}
              />
            </View>
          </View>
          <View style={{flexDirection: 'column', width: '58%'}}>
            <Text style={[styles.box_title, {color: title_color}]}>
              {Strings.makeBold(box_title)}
            </Text>
            <Text style={[styles.box_text, {color: text_color}]}>
              {Strings.makeBold(box_text)}
            </Text>
          </View>
          <Image
            resizeMode={'contain'}
            source={
              white_indicator
                ? require('../../../../assets/images/icons/icn_arrow_right_white.png')
                : require('../../../../assets/images/icons/icn_arrow_right_blu.png')
            }
            style={styles.arrow_right}
          />
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    width: Dimensions.get('window').width - 20,
    minHeight: 130,
    borderRadius: 18,
    flexDirection: 'row',
    marginTop: 10,
  },
  flap_container: {
    width: 95,
    height: '100%',
    alignItems: 'center',
  },
  flap_image_container: {
    position: 'absolute',
    width: 95,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flap_image: {
    zIndex: 0,
    position: 'absolute',
    width: 100,
    height: '101%',
    borderTopRightRadius: 500,
    borderBottomRightRadius: 500,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    backgroundColor: 'white',
  },
  flap_image_old: {
    marginLeft: -1,
    width: 105,
    height: 130,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  partner_logo: {
    // elevation: 200,
    zIndex: 200,
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  arrow_right: {
    width: 30,
    height: 30,
    right: 15,
    top: 15,
    position: 'absolute',
    flexDirection: 'row',
  },
  box_title: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 0,
    fontFamily: constants.DEFAULT_FONT,
    color: colors.WHITE,
    fontSize: 24,
  },
  box_text: {
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    fontFamily: constants.DEFAULT_FONT,
    color: colors.WHITE,
    fontSize: 16,
  },
});

export default BoxWithImage;
