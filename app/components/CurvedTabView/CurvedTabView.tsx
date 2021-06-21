// @ts-ignore
import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";

import CurvedTabBar, { TabBackground } from "./CurvedTabBar";
import RoutesManager from "./Routes/RouteManager";

const initialLayout = {width: Dimensions.get('window').width};
const TABBAR_HEIGHT = 100;

const CurvedTabView = props => {
  const [index, setIndex] = useState(0);
  const routes = RoutesManager.loadRoutes(props.children);
  const renderScene = SceneMap(RoutesManager.getSceneMap());
  const {
    background_start_color,
    background_finish_color,
    tabBarHeight,
    gutterWidth,
    swipeEnabled,
    testID,
  } = props;

  useEffect(() => {
    if (props.autoselected_tab !== undefined) {
      setIndex(props.autoselected_tab);
      props.onAutoSelectedTab && props.onAutoSelectedTab();
    }
  });

  return (
    <View testID={testID} style={props.style}>
      <TabBackground
        background_start_color={background_start_color}
        background_finish_color={background_finish_color}
        style={{height: tabBarHeight || TABBAR_HEIGHT}}
      />
      <TabView
        swipeEnabled={swipeEnabled === undefined || false}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={props => (
          <CurvedTabBar
            gutterWidth={gutterWidth}
            {...{
              ...props,
              width: initialLayout.width,
              tabBarHeight: tabBarHeight || TABBAR_HEIGHT,
            }}
          />
        )}
        style={{zIndex: 2}}
      />
    </View>
  );
};

const Route = props => {
  return null;
};

export default CurvedTabView;
export {Route};
