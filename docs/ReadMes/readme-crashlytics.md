# Installation

## Android

### Add Package
```
yarn add @react-native-firebase/crashlytics
```

### Android: Additional Steps

#### Add Fabric Gradle Tools  

1. Add the Fabric Maven repository

android/build.gradle:
```

// ..
buildscript {
  // ..
  repositories {
    // ..
    maven {
      url 'https://maven.fabric.io/public'
    }
  }
  // ..
}
```

2. Add the Fabric Tools Plugin dependency

android/build.gradle:

```
// ..
buildscript {
  // ..
  dependencies {
    // ..
    classpath 'io.fabric.tools:gradle:1.28.1'
  }
  // ..
}

```

3. Apply the Fabric Tools Plugin to your app


android/app/build.gradle:

```
apply plugin: 'com.android.application' // apply after this line
apply plugin: 'io.fabric'
// ..

```


4. Enable Crashlytics NDK reporting
Crashlytics NDK reporting allows you to capture Native Development Kit crashes, e.g. in React Native this will capture crashes originating from the Yoga layout engine.

android/app/build.gradle:

```
// ..
apply plugin: 'io.fabric'
// ..
crashlytics {
  enableNdk true
}
```

5. Rebuild the project

Once the above steps have been completed, rebuild your Android project:

```
npx react-native run-android
```