<p align='center'>
<img src='https://raw.githubusercontent.com/williamniemiec/nfit-app/master/docs/images/logo/logo.jpg' />
</p>

<h1 align='center'>nFit - APP</h1>
<p align='center'>Simple work out app.</p>
<p align="center">
	<a href="https://github.com/williamniemiec/nfit-app/actions/workflows/windows.yml"><img src="https://github.com/williamniemiec/nfit-app/actions/workflows/windows.yml/badge.svg" alt=""></a>
	<a href="https://github.com/williamniemiec/nfit-app/actions/workflows/macos.yml"><img src="https://github.com/williamniemiec/nfit-app/actions/workflows/macos.yml/badge.svg" alt=""></a>
	<a href="https://github.com/williamniemiec/nfit-app/actions/workflows/ubuntu.yml"><img src="https://github.com/williamniemiec/nfit-app/actions/workflows/ubuntu.yml/badge.svg" alt=""></a>
	<a href="https://reactnative.dev/"><img src="https://img.shields.io/badge/React Native-0.66+-D0008F.svg" alt="React Native compatibility"></a>
	<a href="https://github.com/williamniemiec/nfit-app/blob/master/LICENSE"><img src="https://img.shields.io/github/license/williamniemiec/nfit-app" alt="License"></a>
	<a href="https://github.com/williamniemiec/nfit-app/releases"><img src="https://img.shields.io/github/v/release/williamniemiec/nfit-app" alt="Release"></a>
</p>

<p align="center">
	<a href='https://play.google.com/store/apps/details?id=wniemiec.app.nfit&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' width=172 /></a>
</p>

<hr />

## ❇ Introduction
nFit is a simple work out app made using [React Native](https://reactnative.dev/). The main objective was to develop a mobile application for learning purposes only, not for profit. You can interact with the project downloading the app on your smartphone through PlayStore ([click here to access](https://play.google.com/store/apps/details?id=wniemiec.app.nfit)).

## ✔ Requirements
- [JDK 8+](https://www.oracle.com/java/technologies/downloads/);
- [NodeJS](https://nodejs.org/en/download/);
- [Android SDK](https://developer.android.com/studio/install);
- [Android SDK Platform](https://developer.android.com/studio/install);
- [Android Virtual Device](https://developer.android.com/studio/install);
- [React Native CLI](https://reactnative.dev/docs/environment-setup).

## ℹ How to run

Type in your terminal:

1. npm install

#### Local - Windows
2. react-native run-android OR react-native run-ios

#### Local - Linux
2. react-native start
3. react-native run-android OR react-native run-ios

#### Expo
2. npm install -g expo-cli
3. expo start

#### Throubleshoot
##### Error

```
error SHA-1 for file /usr/local/lib/node_modules/react-native/node_modules/metro/src/lib/polyfills/require.js (/usr/local/lib/node_modules/react-native/node_modules/metro/src/lib/polyfills/require.js) is not computed. Run CLI with --verbose flag for more details.
ReferenceError: SHA-1 for file /usr/local/lib/node_modules/react-native/node_modules/metro/src/lib/polyfills/require.js (/usr/local/lib/node_modules/react-native/node_modules/metro/src/lib/polyfills/require.js) is not computed
```

##### Solution - Linux
> npx react-native start

##### Solution - Windows
> npx react-native run-android

## 🖼 Gallery

<div style="display: flex; flex-direction: row; justify-content: center; align-items: center; flex-wrap: wrap">

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/nfit-app/master/docs/images/screens/screen1.png" alt="image 1" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/nfit-app/master/docs/images/screens/screen2.png" alt="image 2" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/nfit-app/master/docs/images/screens/screen3.png" alt="image 3" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/nfit-app/master/docs/images/screens/screen4.png" alt="image 4" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/nfit-app/master/docs/images/screens/screen5.png" alt="image 5" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/nfit-app/master/docs/images/screens/screen6.png" alt="image 6" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/nfit-app/master/docs/images/screens/screen7.png" alt="image 7" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/nfit-app/master/docs/images/screens/screen8.png" alt="image 8" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/nfit-app/master/docs/images/screens/screen9.png" alt="image 9" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/nfit-app/master/docs/images/screens/screen10.png" alt="image 10" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/nfit-app/master/docs/images/screens/screen11.png" alt="image 11" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/nfit-app/master/docs/images/screens/screen12.png" alt="image 12" />
</div>


## 🚩 Changelog
Details about each version are documented in the [releases section](https://github.com/williamniemiec/nfit-app/releases).

## 🗺 Project structure
![architecture](https://raw.githubusercontent.com/williamniemiec/nfit-app/master/docs/images/design/architecture.png)

## 📁 Files

### /
|        Name        |Type|Description|
|----------------|-------------------------------|-----------------------------|
|\_\_tests\_\_|`Directory`|Test files|
|android|`Directory`|Android source files|
|docs |`Directory`|Documentation files|
|ios|`Directory`|iOS source files|
|src     |`Directory`| Source files|

### /src
|        Name        |Type|Description|
|----------------|-------------------------------|-----------------------------|
|assets|`Directory`|Application static files|
|components|`Directory`|Reusable objects|
|config|`Directory`|Configuration files|
|locales|`Directory`|Translation files|
|navigators|`Directory`|React Navigation files|
|reducers|`Directory`|React Redux files|
|screens|`Directory`|Application screens|
|services|`Directory`|Classes responsible for providing data from APIs and utility services|
|App.js|`File`|Application point entry|
|Store.js|`File`|React Redux configuration file|