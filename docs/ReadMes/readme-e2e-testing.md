### 1. Installing Detox CLI
<pre>
> yarn global add detox-cli
</pre>

### 2. Building for E2E-Testing
Please run this command just once.
#### 2.1 Android
<pre>
> detox build --configuration android.emu.debug
</pre>
#### 2.2 iOS
#### Preparing
You need to know that the following values is set in XCode, but you don't need to change it because it's already updated in XCode project.
<pre>
XCode -> Build Settings -> Exclude Architecture -> (+ Debug) -> arm64
</pre>
#### Install necessary utils
<pre>
brew update
xcode-select --install # If you have selected it in XCode, then this is not ncessary
brew tap wix/brew
brew install applesimutils
</pre>
#### Add UDID into .detoxrc.json
Here you need to add UDID of your desired simulator.
##### To get UDID from Terminal
`applesimutils --list --byName "iPhone 11 Pro"`  
Copy UUID string from a line like this.  
`"udid" : "6C2EA810-00A6-4C8E-B6B0-AC11D9746BD9",`  
If you can't get the UUID using the command, please run this command to get all available simulators.  
`applesimutils --list`  
And then you can pick up one from the list as you want.
#### Add UUID
If you open `.detoxrc.json`, you can see the json object.
Here, paste the copied UUID into this line.  
ex: 
``
"ios.sim.debug": {
  "binaryPath": "ios/build/Build/Products/Debug-iphonesimulator/thefaculty.app",
  "build": "xcodebuild -workspace ios/thefaculty.xcworkspace -scheme thefaculty -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build",
  "type": "ios.simulator",
  "device": {
    "id": "6C2EA810-00A6-4C8E-B6B0-AC11D9746BD9", // <--- here
    "type": "iPhone 11 Pro",
    "name": "iPhone 11 Pro",
    "os": "iOS 14.0"
  }
},
``
#### Build command
<pre>
> detox build --configuration ios.sim.debug
</pre>

### 3. Running E2E-Testing
#### 3.0 Preparing
<pre>
> yarn start
</pre>
And then open new tab.
#### 3.1 Android
<pre>
> detox test --configuration android.emu.debug
</pre>
#### 3.2 iOS
<pre>
> detox test --configuration ios.sim.debug
</pre>

### 4. Simple Description about Testing files
#### 4.1 Testing Files
Testing files are placed in e2e directory.
Sample file is `Login-Coupons-Logout.e2e.js`.

#### 4.2 Simple Explanation
In the testing file above, there is a code snippet like this.
````
it('should have welcome screen', async () => {
  await expect(element(by.id('welcome'))).toBeVisible();
});
````
This means that there is a code like as following.
(`app/modules/Startapp/FirstScreen.tsx:Ln41`)
````
return (
  <>
    <SafeAreaView testID={'welcome'} style={styles.container}>
      <StatusBar
````

### 5. Reference
https://github.com/wix/Detox/tree/master/docs
