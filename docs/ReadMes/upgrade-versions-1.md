# Install React-Native from ground

`react-native init thefaculty`


# Install dependencies
`yarn add @dudigital/react-native-zoomable-view @invertase/react-native-apple-authentication @nartc/react-native-barcode-mask @react-native-community/async-storage @react-native-community/google-signin @react-native-community/picker @react-native-community/push-notification-ios @react-native-community/slider @react-native-firebase/analytics @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/crashlytics @react-native-firebase/messaging @react-native-firebase/storage @stream-io/flat-list-mvcp date-fns deprecated-react-native-listview eases lottie-ios lottie-react-native moment native-base pako react react-native-action-sheet react-native-bidirectional-infinite-scroll react-native-calendars react-native-camera react-native-card-flip react-native-carrier-info react-native-circular-progress react-native-custom-tabs react-native-datepicker react-native-device-info react-native-elements react-native-fast-image react-native-fbsdk react-native-gesture-handler react-native-get-location react-native-haptic-feedback react-native-iap react-native-image-picker react-native-inappbrowser-reborn react-native-linear-gradient react-native-mathjax-svg react-native-parsed-text react-native-progress react-native-progress-bar-animated react-native-qrcode-svg react-native-reanimated react-native-screens react-native-sliding-up-down-panels react-native-snap-carousel react-native-sound react-native-sound-player react-native-splash-screen react-native-store-review react-native-stripe-checkout-webview react-native-svg react-native-tab-view react-native-timeago react-native-touchable-scale react-native-vector-icons react-native-webview react-native-youtube react-navigation react-navigation-hooks react-navigation-stack react-navigation-tabs react-navigation-transitions react-redux reanimated-bottom-sheet recompose recyclerlistview redux redux-persist redux-promise redux-thunk rn-jsbarcode teaset`  

`yarn remove @react-native-community/async-storage @react-native-community/picker`  
 
`yarn add react-native-async-storage/async-storage @react-native-picker/picker`   

`yarn remove react-navigation react-navigation-hooks react-navigation-stack react-navigation-tabs  react-navigation-transitions `  

`yarn @babel/core @react-native-community/eslint-config @types/node @types/react-native-snap-carousel @types/react-redux babel-jest detox eslint jest jest-circus jetifier metro-react-native-babel-preset node-fetch prop-types --dev`  

`yarn add @react-navigation/native`  
`yarn remove react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view`  
`yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view`  


# Update Android project
- Rename project name
- Update XML files, BUCK file
- Copy resource files


# Copy files
- index.js
