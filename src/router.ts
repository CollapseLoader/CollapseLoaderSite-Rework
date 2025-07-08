import { createWebHistory, createRouter } from 'vue-router'
import { changeLanguage } from './i18n/index'

import App from './App.vue'

const routes = [
    { path: '/', component: App },
    { path: '/en', component: App },
    { path: '/ru', component: App },
    {
        path: '/telegram',
        component: {
            beforeRouteEnter() {
                window.location.href = 'https://t.me/CollapseLoader';
            }
        }
    },
    {
        path: '/discord',
        component: {
            beforeRouteEnter() {
                window.location.href = 'https://discord.gg/FyKtnFqs6J';
            }
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const pathLang = to.path.split('/')[1];

    if (pathLang === 'en' || pathLang === 'ru') {
        await changeLanguage(pathLang);
        next();
    } else if (to.path === '/') {
        next();
    } else {
        next();
    }
});

export default router;