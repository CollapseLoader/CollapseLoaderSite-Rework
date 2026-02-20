<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Languages, Github, Download } from 'lucide-vue-next';

const { locale, setLocale } = useI18n();
const isScrolled = ref(false);

const changeLanguage = (lang: string) => {
    setLocale(lang as 'en' | 'ru');
};

onMounted(() => {
    const handleScroll = () => {
        isScrolled.value = window.scrollY > 50;
    };

    window.addEventListener('scroll', handleScroll);
})
</script>

<template>
    <header
        class="navbar bg-base-100/80 backdrop-blur-md shadow-lg sticky top-0 z-50 transition-all duration-300 border-b border-base-content/5"
        :class="{ 'navbar-scrolled': isScrolled }">
        <div class="navbar-start">
            <div class="dropdown">
                <label tabindex="0" class="btn btn-ghost lg:hidden hover:scale-105 transition-transform"
                    aria-label="Open menu">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </label>
                <ul tabindex="0"
                    class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-100 rounded-box w-52 animate-in fade-in slide-in-from-top-2">
                    <li>
                        <a href="#features" class="hover:text-primary transition-colors">{{ $t('nav.why') }}</a>
                    </li>
                    <li>
                        <a href="#exclusive-features" class="hover:text-primary transition-colors">{{ $t('nav.features')
                            }}</a>
                    </li>
                    <li>
                        <a href="#downloads" class="hover:text-primary transition-colors">{{ $t('nav.download') }}</a>
                    </li>
                    <li>
                        <NuxtLink to="/clients" class="font-medium nav-link">
                            {{ $t('nav.clients') }}
                        </NuxtLink>
                    </li>

                    <div class="divider my-1"></div>

                    <li>
                        <div class="px-1">
                            <div class="text-xs text-base-content/70 mb-1">
                                {{ $t('lang') }}
                            </div>
                        </div>

                        <button @click="changeLanguage('en')" :class="{
                            'font-bold text-primary': locale === 'en',
                        }" class="btn btn-ghost btn-xs w-full">
                            {{ $t('lang_en') }}
                        </button>
                        <button @click="changeLanguage('ru')" :class="{
                            'font-bold text-primary': locale === 'ru',
                        }" class="btn btn-ghost btn-xs w-full">
                            {{ $t('lang_ru') }}
                        </button>
                    </li>

                    <div class="divider my-1"></div>

                    <li>
                        <a href="https://discord.com/invite/FyKtnFqs6J" target="_blank" rel="noopener noreferrer"
                            class="hover:text-primary transition-colors">{{ $t('footer.discord') }}</a>
                    </li>
                    <li>
                        <a href="https://t.me/collapseloader" target="_blank" rel="noopener noreferrer"
                            class="hover:text-primary transition-colors">{{ $t('footer.telegram') }}</a>
                    </li>

                    <li>
                        <a href="https://github.com/dest4590/CollapseLoader" target="_blank" rel="noopener noreferrer"
                            class="hover:text-primary transition-colors">{{ $t('download.source_code') }}</a>
                    </li>

                    <li>
                        <a href="#downloads" class="btn btn-primary btn-sm w-full mt-4">
                            {{ $t('nav.download') }}
                        </a>
                    </li>
                </ul>
            </div>
            <a
                class="btn btn-ghost text-2xl font-bold text-primary tracking-wide hover:scale-105 transition-transform flex items-center gap-2">
                <img src="~/assets/img/collapse.svg" alt="CollapseLoader Logo" class="h-8 w-8" />
                {{ $t('brand') }}
            </a>
        </div>

        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1">
                <li>
                    <a href="#features" class="font-medium nav-link">{{
                        $t('nav.why')
                        }}</a>
                </li>
                <li>
                    <a href="#exclusive-features" class="font-medium nav-link">{{ $t('nav.features') }}</a>
                </li>
                <li>
                    <a href="#downloads" class="font-medium nav-link">{{
                        $t('nav.download')
                        }}</a>
                </li>
                <li>
                    <NuxtLink to="/clients" class="font-medium nav-link">
                        {{ $t('nav.clients') }}
                    </NuxtLink>
                </li>
            </ul>
        </div>

        <div class="navbar-end items-center gap-2 hidden lg:flex">
            <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle hover:scale-110 transition-transform"
                    aria-label="Language">
                    <Languages class="h-6 w-6" />
                </label>
                <ul tabindex="0"
                    class="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-100 rounded-box w-36 animate-in fade-in slide-in-from-top-2">
                    <li>
                        <button @click="changeLanguage('en')" :class="{
                            'font-bold text-primary': locale === 'en',
                        }" class="hover:scale-105 transition-transform">
                            {{ $t('lang_en') }}
                        </button>
                    </li>
                    <li>
                        <button @click="changeLanguage('ru')" :class="{
                            'font-bold text-primary': locale === 'ru',
                        }" class="hover:scale-105 transition-transform">
                            {{ $t('lang_ru') }}
                        </button>
                    </li>
                </ul>
            </div>

            <a href="https://discord.com/invite/FyKtnFqs6J" target="_blank" rel="noopener noreferrer"
                class="btn btn-ghost btn-circle hover:scale-110 transition-all duration-300"
                :aria-label="$t('footer.discord')">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                    class="h-6 w-6">
                    <path
                        d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
            </a>

            <a href="https://t.me/collapseloader" target="_blank" rel="noopener noreferrer"
                class="btn btn-ghost btn-circle hover:scale-110 transition-all duration-300"
                :aria-label="$t('footer.telegram')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240.1 240.1">
                    <path fill="currentColor"
                        d="M54.3,118.8c35-15.2,58.3-25.3,70-30.2 c33.3-13.9,40.3-16.3,44.8-16.4c1,0,3.2,0.2,4.7,1.4c1.2,1,1.5,2.3,1.7,3.3s0.4,3.1,0.2,4.7c-1.8,19-9.6,65.1-13.6,86.3 c-1.7,9-5,12-8.2,12.3c-7,0.6-12.3-4.6-19-9c-10.6-6.9-16.5-11.2-26.8-18c-11.9-7.8-4.2-12.1,2.6-19.1c1.8-1.8,32.5-29.8,33.1-32.3 c0.1-0.3,0.1-1.5-0.6-2.1c-0.7-0.6-1.7-0.4-2.5-0.2c-1.1,0.2-17.9,11.4-50.6,33.5c-4.8,3.3-9.1,4.9-13,4.8 c-4.3-0.1-12.5-2.4-18.7-4.4c-7.5-2.4-13.5-3.7-13-7.9C45.7,123.3,48.7,121.1,54.3,118.8z" />
                </svg>
            </a>

            <a href="https://github.com/dest4590/CollapseLoader" target="_blank" rel="noopener noreferrer"
                class="btn btn-ghost btn-circle hover:scale-110 transition-all duration-300"
                aria-label="GitHub Repository">
                <Github class="h-6 w-6" />
            </a>

            <a href="#downloads"
                class="btn btn-primary ml-2 animate-cta-pulse hidden md:flex hover:scale-105 transition-transform">
                <Download class="inline-block mr-1 h-5 w-5" />
                {{ $t('nav.download') }}
            </a>
        </div>
    </header>
</template>

<style scoped>
@reference "../assets/style.css";

.navbar-scrolled {
    @apply bg-base-100/95 shadow-xl;
}

.nav-link {
    @apply relative after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-4/5;
}

@keyframes fade-in {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes slide-in-from-top-2 {
    from {
        transform: translateY(-8px);
    }

    to {
        transform: translateY(0);
    }
}

.animate-in {
    animation-duration: 200ms;
    animation-fill-mode: both;
}

.fade-in {
    animation-name: fade-in;
}

.slide-in-from-top-2 {
    animation-name: slide-in-from-top-2;
}
</style>
