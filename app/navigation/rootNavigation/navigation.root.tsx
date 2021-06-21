import React from "react";
import { Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import SwitchNavigator from "./navigation.switchStack";
import NavigationService from "../../utils/app/NavigationService";
import { colors, constants } from "../../config";

// const AppContainer = createAppContainer(SwitchNavigator);

const RootNavigator = () => {
  return (
    <>
      {false && constants.APP_MODE_CONTROLLED_BY_SERVER === 'TESTING' && (
        <View
          style={{
            width: 160,
            height: 50,
            top: -35,
            left: -50,
            transform: [{rotateZ: '-35deg'}],
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0, 138, 174, 0.5)',
            position: 'absolute',
            zIndex: 1000,
            elevation: 1000,
          }}>
          <Text
            style={{
              fontFamily: constants.DEFAULT_FONT_MEDIUM,
              color: colors.WHITE,
              fontSize: 8,
              paddingLeft: 45,
            }}>
            TESTING
          </Text>
        </View>
      )}
      <NavigationContainer
        ref={navigatorRef =>
          NavigationService.setTopLevelNavigator(navigatorRef)
        }>
        <SwitchNavigator />
      </NavigationContainer>
    </>
  );
};
/*

        <View style={{width: 120, height: 15, top: 10, left: -20, transform: [{ rotateZ: "-35deg" }], justifyContent: 'center', backgroundColor: colors.THEFACULTY, position: 'absolute', zIndex: 1000, elevation: 1000}}>
          <Text style={{fontFamily: constants.DEFAULT_FONT_MEDIUM, color: colors.WHITE, textAlign: 'center', fontSize: 8}}>TESTING</Text>
        </View>
 */

export default RootNavigator;
