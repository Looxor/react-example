// import {delay} from "../app/utils/misc/Timer";
// import {strings} from "../app/config";
var strings = require('../app/config/strings.it').default;

var delay = function (timeout) {
  return new Promise(function (resolve, eject) {
    setTimeout(function() {
      resolve(true);
    }, timeout);
  });
}

describe('TheFacultyApp', () => {
  beforeEach(async () => {
    // await device.reloadReactNative();
  });

  it('should have a confirmation for iOS notification', async () => {
    // await expect(element(by.text('Allow'))).toBeVisible();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('welcome'))).toBeVisible();
  });

  it('should signup/login screen after tap to Signup button', async () => {
    await element(by.id('signupButton')).tap();
    await expect(element(by.id('SignUpScreen'))).toBeVisible();
  });

  it('should login with valid credential', async () => {
    await element(by.id('email_address')).typeText('jeannahrae@gmail.com');
    await element(by.id('password')).typeText('Password123');
    await element(by.id('continueButtonOnLoginScreen')).tap();
    await element(by.id('continueButtonOnLoginScreen')).tap();
    await waitFor(element(by.id('HomeScreenContainer'))).toBeVisible().withTimeout(15000);
    // if (device.getPlatform() === 'android') {
      await device.pressBack();
    // }
  });

  it('should be able to go to Benefits Screen', async () => {
    await element(by.id('couponsTabBarIconUnFocused')).tap();
    // if (device.getPlatform() === 'android') {
    //   await delay(1000);
      await device.pressBack();
    // }
    await expect(element(by.id('couponsTabCurvedView'))).toBeVisible();
  });

  it('should be able to refresh Benefits Screen', async () => {
    await element(by.id('scontiHomeScrollView')).swipe('down', 'slow', 0.75);
  });

  it('should be able to logout', async () => {
    await element(by.id('TopBarRightSettingsButton')).tap();
    await element(by.id('settingsHomeScreenScrollView')).scroll(400, 'down', NaN, 0.85);
    await element(by.id('logoutButton')).tap();
    if( device.getPlatform() === 'android' ) {
      await element(by.text(strings.OTHER.YES.toUpperCase())).tap();
    }
    await expect(element(by.id('welcome'))).toBeVisible();
    await delay(2000);
  });

});
