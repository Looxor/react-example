# Roadmap of Replacing Firebase with React-Native-Firebase  

## 1. app\config\constants.ts  
**E:\Work\projects\thefaculty\react_app\thefaculty\app\config\constants.ts**
  2,8: import Firebase from 'firebase';  
  27,6: if (!Firebase.apps.length) {  
  28,18:   firebase_app = Firebase.initializeApp(firebaseConfigTesting);  
  67,34:   SET_USER_DATA: function (user: Firebase.User) {  

## 2. app\config\AppLifecycle.ts  
**E:\Work\projects\thefaculty\react_app\thefaculty\app\config\AppLifecycle.ts**  
  5,4: // Firebase token lifecycle is 1hr, but it refreshes in 1min, before 1hr  
  6,14: const refreshFirebaseToken = async () => {  
  20,16: export {refreshFirebaseToken, TOKEN_LIFECYCLE};  
  
## 3. app\modules\AppView.tsx  
**E:\Work\projects\thefaculty\react_app\thefaculty\app\modules\AppView.tsx**  
  12,16: import {refreshFirebaseToken, TOKEN_LIFECYCLE} from '../config/session';  
  34,14:       refreshFirebaseToken();  
  
## 4. app\modules\Login\_actions.ts  
**E:\Work\projects\thefaculty\react_app\thefaculty\app\modules\Login\_actions.ts**  
  1,8: import Firebase from 'firebase';  
  27,13:       await Firebase.auth().setPersistence(Firebase.auth.Auth.Persistence.LOCAL);  
  27,44:       await Firebase.auth().setPersistence(Firebase.auth.Auth.Persistence.LOCAL);  
  28,13:       await Firebase.auth().signInWithEmailAndPassword(  
  33,26:       const signedUser = Firebase.auth().currentUser;  
  
## 5. app\modules\Login\LoginScreen.tsx  
**E:\Work\projects\thefaculty\react_app\thefaculty\app\modules\Login\LoginScreen.tsx**  
  5,8: import Firebase from 'firebase';  
  6,11: import {onFirebaseStateChanged} from '../../utils/misc/firebaseUtil';  
  126,11:           Firebase.auth().onAuthStateChanged(  
  127,15:             onFirebaseStateChanged(() => ({navigation, verbose: true})),  
  
## 6. app\modules\Login\ResetPasswordScreen.tsx  
**E:\Work\projects\thefaculty\react_app\thefaculty\app\modules\Login\ResetPasswordScreen.tsx**  
  3,8: import Firebase from 'firebase';  
  52,9:         Firebase.auth().sendPasswordResetEmail(this.state.email)  
  
## 7. app\modules\SignUp\_actions.ts  
**E:\Work\projects\thefaculty\react_app\thefaculty\app\modules\SignUp\_actions.ts**  
  1,8: import Firebase from 'firebase';  
  135,13:       await Firebase.auth().setPersistence(  
  136,9:         Firebase.auth.Auth.Persistence.LOCAL,  
  138,13:       await Firebase.auth().createUserWithEmailAndPassword(email, password);  
  140,26:       const signedUser = Firebase.auth().currentUser;  
  
## 8. app\modules\SignUp\Screen6.tsx  
**E:\Work\projects\thefaculty\react_app\thefaculty\app\modules\SignUp\Screen6.tsx**  
  3,8: import Firebase from 'firebase';  
  25,11: import {onFirebaseStateChanged} from '../../utils/misc/firebaseUtil';  
  111,11:           Firebase.auth().onAuthStateChanged(  
  112,15:             onFirebaseStateChanged(() => ({navigation})),  
  
## 9. app\modules\Startapp\SplashScreenSS.tsx  
**E:\Work\projects\thefaculty\react_app\thefaculty\app\modules\Startapp\SplashScreenSS.tsx**  
  3,8: import Firebase from 'firebase';  
  11,11: import {onFirebaseStateChanged, onFirebaseTokenChanged} from '../../utils/misc/firebaseUtil';  
  11,35: import {onFirebaseStateChanged, onFirebaseTokenChanged} from '../../utils/misc/firebaseUtil';  
  35,25:     const unsubscribe = Firebase.auth().onAuthStateChanged(  
  36,9:       onFirebaseStateChanged(() => ({navigation, unsubscribe})),  
  38,5:     Firebase.auth().onIdTokenChanged(onFirebaseTokenChanged);  
  38,40:     Firebase.auth().onIdTokenChanged(onFirebaseTokenChanged);  
  
## 10. app\navigation\mainNavigation\MainTabNavigator.tsx  
**E:\Work\projects\thefaculty\react_app\thefaculty\app\navigation\mainNavigation\MainTabNavigator.tsx**  
  3,8: import Firebase from 'firebase';  
  92,9:         Firebase.auth()  
  
  
## 11. app\screens\Community\UserProfileImageScreen.tsx  
**E:\Work\projects\thefaculty\react_app\thefaculty\app\screens\Community\UserProfileImageScreen.tsx**  
  8,8: import Firebase from 'firebase';  
  86,28:         let firebase_uid = Firebase.auth().currentUser.uid;  
  93,17:                 Firebase.storage.TaskEvent.STATE_CHANGED,  
  
## 12. app\utils\misc\firebaseUtil.js  
**E:\Work\projects\thefaculty\react_app\thefaculty\app\utils\misc\firebaseUtil.js**  
  15,9: const onFirebaseStateChanged = getParams => user => {  
  59,9: const onFirebaseTokenChanged = user => {  
  76,11: export {onFirebaseStateChanged, onFirebaseTokenChanged};  
  76,35: export {onFirebaseStateChanged, onFirebaseTokenChanged};  
