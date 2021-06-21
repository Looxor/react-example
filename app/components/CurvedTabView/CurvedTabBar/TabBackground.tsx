import React from "react";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default props => {
  const {background_start_color, background_finish_color} = props;

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={[background_start_color, background_finish_color]}
      style={{...styles.container, ...props.style}}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
  },
});
