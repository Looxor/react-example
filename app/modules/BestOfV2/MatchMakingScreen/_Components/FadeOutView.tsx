import React, { useRef } from "react";
import { Animated } from "react-native";

const FadeOutView = props => {
  const {duration = 1000, startAfter = 0, enabled = true} = props;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (!enabled) return;
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }).start();
    }, startAfter);
  }, [fadeAnim, enabled]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

export default FadeOutView;
