import { Platform } from "react-native";

const hasNotchBar = () => {
  console.log('Platform version ====', Number(Platform.Version));
  return Platform.OS === 'ios' && Number(Platform.Version) >= 9;
};

export {hasNotchBar};
