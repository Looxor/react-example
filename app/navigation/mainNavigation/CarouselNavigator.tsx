import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {routes} from '../rootNavigation/navigation.constants';
import {stackConfig} from './MainTabNavigator';
import CarouselPageScreen from '../../modules/Home/CarouselPage';

const CarouselStack = createStackNavigator();

const CarouselStackScreens = () => (
  <CarouselStack.Navigator
    headerMode={'screen'}
    // @ts-ignore
    screenOptions={stackConfig.defaultNavigationOptions}>
    <CarouselStack.Screen
      name={routes.CAROUSEL_PAGE}
      component={CarouselPageScreen}
      // @ts-ignore
      options={CarouselPageScreen.navigationOptions}
    />
  </CarouselStack.Navigator>
);

export default CarouselStackScreens;
