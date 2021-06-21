// @ts-ignore
import React from "react";
import { Text, View } from "react-native";
import Indicator from "./Indicator";
import { TabBar } from "react-native-tab-view";
import colors from "../../../config/colors";
import { constants } from "../../../config";

const renderIndicator = ({navigationState, width}) => {
  const indicatorWidth = width / navigationState.routes.length;
  return (
    <Indicator
      index={navigationState.index}
      width={indicatorWidth}
      containerWidth={width}
      color={colors.DEFAULT_BACKGROUND}
      style={{position: 'absolute', bottom: 0}}
    />
  );
};

const renderLabel = (props, props2) => {
  const gutter = ((props2 && props2.gutterWidth) || 0) / 4;
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
      }}>
      <Text
        style={{
          width: '100%',
          ...(props.route.index === 0 ? {right: gutter} : {left: gutter}),
          textAlign: 'center',
          fontSize: 20,
          color: props.color,
          fontFamily: props.focused
            ? constants.DEFAULT_FONT_BOLD
            : constants.DEFAULT_FONT,
          ...(props.route && props.route.labelStyle),
        }}>
        {props.route.title}
      </Text>
    </View>
  );
};

const CurvedTabBar = props => (
  <TabBar
    {...props}
    renderLabel={labelProps =>
      renderLabel(labelProps, {
        gutterWidth: props.gutterWidth,
        width: props.width,
      })
    }
    renderIndicator={props2 => renderIndicator({...props2, width: props.width})}
    tabStyle={{height: props.tabBarHeight}}
    style={{
      backgroundColor: 'rgba(255,255,255,0.01)',
      elevation: 0,
      shadowOffset: {height: 0, width: 0},
      shadowColor: 'transparent',
      shadowOpacity: 0,
    }}
  />
);

export default CurvedTabBar;
