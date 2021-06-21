import * as React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../config/colors";
import constants from "../../../config/constants";
import LinearGradient from "react-native-linear-gradient";
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
  onPress: () => void;
  white_indicator?: boolean;
}

class HomeBoxWithoutImage extends React.Component<Props> {
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
      onPress,
      white_indicator,
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
          <View style={{flexDirection: 'column'}}>
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
  arrow_right: {
    width: 30,
    height: 30,
    right: 15,
    top: 15,
    position: 'absolute',
    flexDirection: 'row',
  },
  box_title: {
    flexWrap: 'wrap',
    marginTop: 15,
    marginLeft: 25,
    marginRight: 25,
    fontFamily: constants.DEFAULT_FONT,
    color: colors.WHITE,
    fontSize: 24,
  },
  box_text: {
    flexWrap: 'wrap',
    marginTop: 5,
    marginLeft: 25,
    marginRight: 40,
    marginBottom: 15,
    fontFamily: constants.DEFAULT_FONT,
    color: colors.WHITE,
    fontSize: 16,
  },
});

export default HomeBoxWithoutImage;
