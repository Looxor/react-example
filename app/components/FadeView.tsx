import React, { useEffect, useState } from "react";
import { Animated } from "react-native";

const FadeView = props => {
  const {mode, style, duration} = props;
  const [initialValue, setInitialValue] = useState(0);
  const fadeAnim = new Animated.Value(initialValue);
  const onModeChanged = () => {
    console.log('mode', mode);
    setInitialValue(mode === 'in' ? 0 : 1);
  };
  useEffect(onModeChanged, [mode]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: initialValue === 0 ? 1 : 0,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...style,
        opacity: fadeAnim, // Bind opacity to animated value,
      }}>
      {props.children}
    </Animated.View>
  );
};

export default FadeView;
