import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import i18n, { changeLanguage } from './i18n/index'
import router from './router'

const app = createApp(App).use(router).use(i18n)

router.isReady().then(() => {
    const currentPath = window.location.pathname;
    const pathLang = currentPath.split('/')[1];

    if (pathLang === 'en' || pathLang === 'ru') {
        changeLanguage(pathLang);
    } else if (currentPath === '/') {
        const rawLang = navigator && (navigator.language ?? 'en');
        const browserLang: string = (String(rawLang).split('-')[0] || 'en');
        const supportedLanguages = ['en', 'ru'];
        const detectedLang: string = supportedLanguages.includes(browserLang) ? browserLang : 'en';

        window.history.replaceState({}, '', `/${detectedLang}`);
        changeLanguage(detectedLang);
    }

    app.mount('#app');
});
