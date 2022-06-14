import { Platform, NativeModules } from 'react-native';
import I18n from 'i18n-js';
import en from './en-US';
import pt from './pt-BR';


//-----------------------------------------------------------------------------
//        Constants
//-----------------------------------------------------------------------------
const normalizeTranslate = {
  'en_US': 'en_US',
  'pt_BR': 'pt_BR',
  'en': 'en_US',
  'pt_US': 'pt_BR',
}

I18n.translations = {
  'en_US': { ...I18n.translations['en_US'], ...en },
  'pt_BR': pt,
}


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function setLanguageToI18n() {
  const systemLanguage = normalizeTranslate[getLanguageByDevice()];
  
  if (hasCompatibilityWithLanguage(systemLanguage)) {
    I18n.locale = systemLanguage;
  }
  else {
    I18n.defaultLocale = 'en_US';
  }
}

setLanguageToI18n();

export function translate(key) {
  if (I18n.t(key).includes("[missing")) {
    return key;
  }

  return I18n.t(key);
}

function getLanguageByDevice() {
  return (Platform.OS === 'ios')
    ? NativeModules.SettingsManager.settings.AppleLocale 
    : NativeModules.I18nManager.localeIdentifier 
}

function hasCompatibilityWithLanguage(language) {
  return I18n.translations.hasOwnProperty(language);
}
