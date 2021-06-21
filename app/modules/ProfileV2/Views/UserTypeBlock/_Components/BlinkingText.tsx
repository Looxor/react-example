import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';

const BlinkingText = props => {
  let [showText, setShowText] = useState(true);
  let timer, timer2;
  const componentDidMount = () => {
    if (!props.enabled) {
      return;
    }

    timer = setInterval(() => {
      setShowText(prevShowText => !prevShowText);
    }, 800);
    timer2 = setTimeout(() => {
      setShowText(prevShowText => true);
      clearInterval(timer);
    }, 5600);
    return componentWillUnmount;
  };

  const componentWillUnmount = () => {
    clearInterval(timer);
    clearTimeout(timer2);
  };

  useEffect(componentDidMount, []);
  return (
    <Text style={props.style}>
      {props.enabled ? (showText ? props.text : '') : props.text}
    </Text>
  );
};
export default BlinkingText;
