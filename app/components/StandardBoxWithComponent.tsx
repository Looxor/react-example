import * as React from "react";
import { StyleSheet } from "react-native";
import colors from "../config/colors";
import LinearGradient from "react-native-linear-gradient";

interface Props {
  background_start_color: string;
  background_finish_color: string;
  viewStyle?: any;
}

class StandardBoxWithContainer extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const {background_start_color, background_finish_color} = this.props;
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[background_start_color, background_finish_color]}
        style={{...styles.view, ...this.props.viewStyle}}>
        {this.props.children}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    // width: '100%',
    marginHorizontal: 10,
    height: 100,
    backgroundColor: colors.THEFACULTY,
    borderRadius: 18,
    margin: 10,
  },
});

export default StandardBoxWithContainer;
