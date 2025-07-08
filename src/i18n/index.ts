import { createI18n } from 'vue-i18n';

import en from './locales/en.json';
import ru from './locales/ru.json';

const messages = {
    en,
    ru
};

const getStoredLanguage = () => {
    return localStorage.getItem('language') || 'en';
};

export const getCurrentLanguage = () => {
    return i18n.global.locale.value;
};

export const getAvailableLanguages = () => {
    return [
        { code: 'en', name: 'English', nativeName: 'English' },
        { code: 'ru', name: 'Russian', nativeName: 'Русский' }
    ];
};

export const changeLanguage = async (locale: string) => {
    i18n.global.locale.value = locale as any;
    localStorage.setItem('language', locale);
    document.documentElement.setAttribute('lang', locale);
}

const i18n = createI18n({
    legacy: false,
    locale: getStoredLanguage(),
    fallbackLocale: 'en',
    messages,
    globalInjection: true
});

export default i18n;