module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          'react-native/Libraries/Animated/src/Easing':
            'react-native/Libraries/Animated/Easing',
        },
      },
    ],
  ],
};
