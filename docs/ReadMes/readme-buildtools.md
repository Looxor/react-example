# Build Tools
### Prerequisites
#### Need to remove temporary codes and files
**Note:  
Please remove followings only when you need to make a product version, and moreover you should recover the files since it's necessary in the development environment.**
1. All `console.log`s
2. `docs/TestData/`
3. `app/modules/Test/_demo_data/`
4. `app/modules/Settings/MathJaxTestScreen.tsx`
5. `app/modules/Settings/_Components/ProfileSettings.tsx: Ln257-277`  
   `{__DEV__ && () ...}`
6. `app/modules/Login/LoginScreen.tsx: Ln266-299`  
   `{__DEV__ && () ...}`

## 1. Android
### 1.1. Windows
#### 1.1.1. Make APK
```
yarn build-apk:win
```
### 1.2. Mac
#### 1.2.1. Make APK
```
yarn build-apk:mac
```

## 2. iOS
### 2.1. Mac
#### 2.2.1. Running iOS App in Simulator
```
yarn run-ios:sim [SIMULATOR_NAME]
# Default SIMULATOR_NAME: "iPhone 11 Pro"
```

## 3. Prepare Firebase in App
### 3.1. Prepare for our Testers
```
yarn prepare:test
```

### 3.2. Prepare for Apple-Reviews
```
yarn prepare:prod
```