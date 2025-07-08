import { createWebHistory, createRouter } from 'vue-router'

import App from './App.vue'

const routes = [
    { path: '/', component: App },
    {
        path: '/telegram',
        component: {
            beforeRouteEnter() {
                window.location.href = 'https://t.me/CollapseLoader';
                return '/';
            }
        }
    },
    {
        path: '/discord',
        component: {
            beforeRouteEnter() {
                window.location.href = 'https://discord.gg/FyKtnFqs6J';
                return '/';
            }
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;