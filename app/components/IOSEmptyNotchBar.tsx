import React from "react";
import { Platform, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import { colors } from "../config";

const IOSEmptyNotchBar = ({
  backgroundColor = colors.WHITE,
  defaultHeaderHeight = 30,
}) => {
  const height = DeviceInfo.hasNotch() ? 35 : defaultHeaderHeight;
  return Platform.OS === 'ios' ? (
    <View style={{backgroundColor, height}} />
  ) : null;
};

export default IOSEmptyNotchBar;
