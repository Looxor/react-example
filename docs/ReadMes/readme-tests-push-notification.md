### Cases of receiving push notifications

#### 1. Android
##### While running the app

app/modules/Home/ScontiHome.tsx:  
```
unsubscribeSimulationNotif = PushNotification.registerOnMessageListener(whenArrivedSimulationMessage);
```

##### While running on Background or closed

index.js:  
```
await Observable.setReduxValue('notification_message', notification_message)
```


app/modules/Home/ScontiHome.tsx:    
```
checkPushNotification();
```

app/modules/Home/ScontiHome.tsx:     
```
const notification_message = Observable.getReduxValue('notification_message');
```


#### 2. iOS
##### While running the app


index.js:  
```
messaging().onNotificationOpenedApp(async notification_message => {  
...
```


##### While running on Background or closed



index.js:  
```
messaging().getInitialNotification().then(async remoteMessage => {  
...
```

app/modules/Home/ScontiHome.tsx:    
```
checkPushNotification();
```

app/modules/Home/ScontiHome.tsx:     
```
const notification_message = Observable.getReduxValue('notification_message');
```
