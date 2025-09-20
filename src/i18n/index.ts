import { createI18n } from 'vue-i18n';

import en from './locales/en.json';
import ru from './locales/ru.json';

const messages = {
    en,
    ru
};

const getBrowserLanguage = () => {
    const rawLang = navigator && (navigator.language ?? 'en');
    const browserLang: string = (String(rawLang).split('-')[0] || 'en');
    const supportedLanguages = ['en', 'ru'];
    return supportedLanguages.includes(browserLang) ? browserLang : 'en';
};

const getLanguageFromURL = () => {
    const pathLang = window.location.pathname.split('/')[1];
    return (pathLang === 'en' || pathLang === 'ru') ? pathLang : null;
};

const getStoredLanguage = () => {
    return getLanguageFromURL() || localStorage.getItem('language') || getBrowserLanguage();
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

    const currentPath = window.location.pathname;
    const currentLang = currentPath.split('/')[1];

    if (currentLang === 'en' || currentLang === 'ru') {
        const newPath = currentPath.replace(`/${currentLang}`, `/${locale}`);
        window.history.pushState({}, '', newPath);
    } else if (currentPath === '/') {
        window.history.pushState({}, '', `/${locale}`);
    }
}

const i18n = createI18n({
    legacy: false,
    locale: getStoredLanguage(),
    fallbackLocale: 'en',
    messages,
    globalInjection: true
});

export default i18n;