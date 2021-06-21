import * as React from "react";
import { StyleSheet } from "react-native";
import colors from "../config/colors";
import LinearGradient from "react-native-linear-gradient";
import FastImage from "react-native-fast-image";

interface Props {
  image: object;
  background_start_color: string;
  background_finish_color: string;
  viewStyle?: any;
  iconStyle?: any;
}

class StandardBoxWithImage extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const {image, background_start_color, background_finish_color} = this.props;
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[background_start_color, background_finish_color]}
        style={{...styles.view, ...this.props.viewStyle}}>
        <FastImage
          resizeMode="contain"
          style={{...styles.image, ...this.props.iconStyle}}
          source={image}
        />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '92%',
    height: 130,
    backgroundColor: colors.THEFACULTY,
    borderRadius: 18,
    margin: 10,
  },
  image: {
    flex: 1,
    width: '40%',
  },
});

export default StandardBoxWithImage;
