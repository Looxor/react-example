import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../../../../config';
import GradientBackground from './GradientBackground';

const IOSScrollViewTweak = props => {
  return <GradientBackground height={400} />;
};

export default IOSScrollViewTweak;
