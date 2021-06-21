import React from "react";
import FastImage from "react-native-fast-image";

export default props => {
  const props2 = {...props};
  const source = props.source;
  const normalisedSource =
    source &&
    typeof source.uri === 'string' &&
    (source.uri.split('https://')[1] || source.uri.split('http://')[1])
      ? source
      : null;
  props2.source = normalisedSource;
  return <FastImage {...props2} />;
};
