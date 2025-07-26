<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { changeLanguage } from '@/i18n';
import { Languages, Github, Download } from 'lucide-vue-next';

const { locale } = useI18n();
const isScrolled = ref(false);

onMounted(() => {
    const handleScroll = () => {
        isScrolled.value = window.scrollY > 50;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <header
        class="navbar bg-base-100/80 backdrop-blur-md shadow-lg sticky top-0 z-50 transition-all duration-300 border-b border-base-content/5"
        :class="{ 'navbar-scrolled': isScrolled }"
    >
        <div class="navbar-start">
            <div class="dropdown">
                <label
                    tabindex="0"
                    class="btn btn-ghost lg:hidden hover:scale-105 transition-transform"
                    aria-label="Open menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16"
                        />
                    </svg>
                </label>
                <ul
                    tabindex="0"
                    class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-100 rounded-box w-52 animate-in fade-in slide-in-from-top-2"
                >
                    <li>
                        <a
                            href="#features"
                            class="hover:text-primary transition-colors"
                            >{{ $t('nav.why') }}</a
                        >
                    </li>
                    <li>
                        <a
                            href="#exclusive-features"
                            class="hover:text-primary transition-colors"
                            >{{ $t('nav.features') }}</a
                        >
                    </li>
                    <li>
                        <a
                            href="#safety"
                            class="hover:text-primary transition-colors"
                            >{{ $t('nav.safety') }}</a
                        >
                    </li>
                    <li>
                        <a
                            href="#download"
                            class="hover:text-primary transition-colors"
                            >{{ $t('nav.download') }}</a
                        >
                    </li>
                </ul>
            </div>
            <a
                class="btn btn-ghost text-2xl font-bold text-primary tracking-wide hover:scale-105 transition-transform"
            >
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
                    <a
                        href="#exclusive-features"
                        class="font-medium nav-link"
                        >{{ $t('nav.features') }}</a
                    >
                </li>
                <li>
                    <a href="#safety" class="font-medium nav-link">{{
                        $t('nav.safety')
                    }}</a>
                </li>
                <li>
                    <a href="#download" class="font-medium nav-link">{{
                        $t('nav.download')
                    }}</a>
                </li>
            </ul>
        </div>

        <div class="navbar-end flex items-center gap-2">
            <div class="dropdown dropdown-end">
                <label
                    tabindex="0"
                    class="btn btn-ghost btn-circle hover:scale-110 transition-transform"
                    aria-label="Language"
                >
                    <Languages class="h-6 w-6" />
                </label>
                <ul
                    tabindex="0"
                    class="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-100 rounded-box w-36 animate-in fade-in slide-in-from-top-2"
                >
                    <li>
                        <button
                            @click="changeLanguage('en')"
                            :class="{
                                'font-bold text-primary': locale === 'en',
                            }"
                            class="hover:scale-105 transition-transform"
                        >
                            {{ $t('lang_en') }}
                        </button>
                    </li>
                    <li>
                        <button
                            @click="changeLanguage('ru')"
                            :class="{
                                'font-bold text-primary': locale === 'ru',
                            }"
                            class="hover:scale-105 transition-transform"
                        >
                            {{ $t('lang_ru') }}
                        </button>
                    </li>
                </ul>
            </div>

            <a
                href="https://github.com/dest4590/CollapseLoader"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-ghost btn-circle hover:scale-110 transition-all duration-300"
                aria-label="GitHub Repository"
            >
                <Github class="h-6 w-6" />
            </a>

            <a
                href="#download"
                class="btn btn-primary ml-2 animate-cta-pulse hidden md:flex hover:scale-105 transition-transform"
            >
                <Download class="inline-block mr-1 h-5 w-5" />
                {{ $t('nav.download') }}
            </a>
        </div>
    </header>
</template>

<style scoped>
@reference "tailwindcss";
@plugin "daisyui";

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
