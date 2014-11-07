// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'com.piyiku.meteoris',
  name: 'Meteoris',
  description: 'Meteoris, a Boilerplate Base on Meteor JS',
  author: 'Ega Radiegtya',
  email: 'radiegtya@gmail.com',
  website: 'http://meteoris.piyiku.biz'
});

// Set up resources such as icons and launch screens.
App.icons({
  'android_mdpi': 'mobile-configs/icons/android_mdpi.png',
  'android_hdpi': 'mobile-configs/icons/android_hdpi.png',
  // ... more screen sizes and platforms ...
});

App.launchScreens({
  'android_mdpi_landscape': 'mobile-configs/splash/android_mdpi_landscape.png',
  'android_mdpi_portrait': 'mobile-configs/splash/android_mdpi_portrait.png',
  'android_hdpi_landscape': 'mobile-configs/splash/android_hdpi_landscape.png',
  'android_hdpi_portrait': 'mobile-configs/splash/android_hdpi_portrait.png',
  // ... more screen sizes and platforms ...
});

// Set PhoneGap/Cordova preferences
//App.setPreference('BackgroundColor', '0xff0000ff');
//App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('SplashScreen', 'screen');
App.setPreference('SplashScreenDelay', '10000');