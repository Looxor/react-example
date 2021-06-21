import React, { useRef } from "react";
import { Animated } from "react-native";

const FadeInView = props => {
  const {
    duration = 1000,
    startAfter = 0,
    enabled = true,
    alwaysShow = false,
    onFadeIn = () => {},
  } = props;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!enabled) return;
    setTimeout(() => {
      onFadeIn && onFadeIn();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }).start();
    }, startAfter);
  }, [fadeAnim, enabled]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: alwaysShow ? 1 : fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

export default FadeInView;
