<script setup lang="ts">
import { useAnalytics } from '@/composables/useAnalytics';
import { useGitHubReleases } from '@/composables/useGitHubReleases';
import VanillaTilt from 'vanilla-tilt';
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

declare global {
    interface Window {
        Odometer: any;
    }
}

import AppHeader from '@/components/AppHeader.vue';
import ExclusiveFeatures from '@/components/ExclusiveFeatures.vue';
import FeatureCard from '@/components/FeatureCard.vue';
import ScrollProgress from '@/components/ScrollProgress.vue';

import {
    BarChart,
    CheckCircle,
    ChevronRight,
    Download,
    FileSearch,
    Github,
    Rocket,
    ShieldCheck,
    Unlock,
    Zap,
} from 'lucide-vue-next';

const { t } = useI18n();
const tiltElement = ref<HTMLElement | null>(null);
const heroRef = ref<HTMLElement | null>(null);
const analyticsRef = ref<HTMLElement | null>(null);

const {
    latestReleaseUrl,
    latestReleaseLoaded,
    latestPrereleaseUrl,
    latestPrereleaseLoaded,
} = useGitHubReleases('https://api.github.com/repos/dest4590/CollapseLoader');

const { totalLoaderLaunches, totalClientDownloads, totalClientLaunches } =
    useAnalytics();

const loaderOdometer = ref<any>(null);
const downloadsOdometer = ref<any>(null);
const launchesOdometer = ref<any>(null);

onMounted(() => {
    if (tiltElement.value) {
        VanillaTilt.init(tiltElement.value, {
            max: 25,
            speed: 400,
            glare: true,
            'max-glare': 0.15,
            scale: 1.02,
        });
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    if (entry.target === analyticsRef.value) {
                        // Initialize odometers only once when analytics section is visible
                        loaderOdometer.value = new window.Odometer({
                            el: document.querySelector(
                                '#loader-launches-odometer'
                            ),
                            value: 0,
                            format: '(,ddd)',
                            duration: 2000,
                            theme: 'minimal',
                        });
                        loaderOdometer.value.update(totalLoaderLaunches.value);

                        downloadsOdometer.value = new window.Odometer({
                            el: document.querySelector(
                                '#client-downloads-odometer'
                            ),
                            value: 0,
                            format: '(,ddd)',
                            duration: 2000,
                            theme: 'minimal',
                        });
                        downloadsOdometer.value.update(
                            totalClientDownloads.value
                        );

                        launchesOdometer.value = new window.Odometer({
                            el: document.querySelector(
                                '#client-launches-odometer'
                            ),
                            value: 0,
                            format: '(,ddd)',
                            duration: 2000,
                            theme: 'minimal',
                        });
                        launchesOdometer.value.update(
                            totalClientLaunches.value
                        );

                        observer.unobserve(entry.target);
                    }
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        }
    );

    document
        .querySelectorAll('.animate-on-scroll')
        .forEach((el) => observer.observe(el));

    if (analyticsRef.value) {
        observer.observe(analyticsRef.value);
    }
});

watch(totalLoaderLaunches, (val) => {
    if (loaderOdometer.value) {
        loaderOdometer.value.update(val);
    }
});
watch(totalClientDownloads, (val) => {
    if (downloadsOdometer.value) {
        downloadsOdometer.value.update(val);
    }
});
watch(totalClientLaunches, (val) => {
    if (launchesOdometer.value) {
        launchesOdometer.value.update(val);
    }
});
</script>

<template>
    <div class="bg-base-200 bg-grid-pattern overflow-x-hidden relative">
        <div class="absolute inset-0 pointer-events-none z-0">
            <div class="absolute inset-0 hero-gradient-bg opacity-50"></div>
            <div class="absolute inset-0 pattern-dots opacity-30"></div>
        </div>

        <ScrollProgress />
        <AppHeader />

        <main class="relative z-10">
            <section
                ref="heroRef"
                class="hero min-h-screen relative overflow-hidden flex items-center"
            >
                <div
                    class="hero-content grid lg:grid-cols-2 gap-16 lg:gap-20 items-center w-full max-w-7xl mx-auto px-6 z-10 py-24 lg:py-0"
                >
                    <div class="text-center lg:text-left space-y-6">
                        <div class="space-y-4">
                            <h1
                                class="text-5xl md:text-7xl font-extrabold text-primary mb-4 drop-shadow-xl relative animate-slide-in-up"
                                style="
                                    --stagger: 0;
                                    font-family: 'Kind Sans', sans-serif;
                                "
                            >
                                {{ t('hero.title') }}
                            </h1>
                            <p
                                class="text-xl md:text-2xl mb-4 font-semibold text-base-content animate-slide-in-up"
                                style="
                                    --stagger: 1;
                                    font-family: 'Kind Sans Semibold',
                                        sans-serif;
                                "
                            >
                                {{ t('hero.subtitle') }}
                            </p>
                            <p
                                class="text-lg text-base-content/80 mb-10 leading-relaxed animate-slide-in-up max-w-xl"
                                style="--stagger: 2"
                            >
                                {{ t('hero.desc') }}
                            </p>
                        </div>

                        <div
                            class="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start animate-slide-in-up"
                            style="--stagger: 3"
                        >
                            <a
                                href="#download"
                                class="btn btn-primary btn-lg shadow-xl hover:scale-105 transition-all duration-300 animate-cta-pulse group relative overflow-hidden"
                            >
                                <span
                                    class="relative z-10 flex items-center gap-2"
                                >
                                    {{ t('hero.download') }}
                                    <ChevronRight
                                        class="h-6 w-6 group-hover:translate-x-1 transition-transform"
                                    />
                                </span>
                                <div class="btn-shine"></div>
                            </a>
                            <a
                                href="https://github.com/dest4590/CollapseLoader"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="btn btn-ghost btn-lg hover:bg-base-content/10 hover:scale-105 transition-all duration-300 group border-2 border-transparent hover:border-primary/30"
                            >
                                <span class="flex items-center gap-2">
                                    {{ t('hero.source') }}
                                    <Github
                                        class="h-6 w-6 transition-transform"
                                    />
                                </span>
                            </a>
                        </div>
                    </div>

                    <div
                        ref="tiltElement"
                        class="showcase-wrapper relative"
                        style="--stagger: 1"
                    >
                        <div class="showcase-glow"></div>
                        <div
                            class="showcase shadow-2xl hover:shadow-primary/20 group"
                        >
                            <div class="showcase-front"></div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" class="relative py-24">
                <div class="section-wave-divider-top"></div>
                <div class="bg-base-100 py-24">
                    <div class="container mx-auto px-6 text-center">
                        <div class="max-w-4xl mx-auto mb-20">
                            <h2
                                class="section-title animate-on-scroll anim-fade-up"
                            >
                                {{ t('why.title') }}
                            </h2>
                            <p
                                class="section-subtitle animate-on-scroll anim-fade-up text-xl"
                                style="--delay: 100ms"
                            >
                                {{ t('why.desc') }}
                            </p>
                        </div>

                        <div
                            class="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto"
                        >
                            <FeatureCard
                                :title="t('why.open.title')"
                                :description="t('why.open.desc')"
                                :icon="Unlock"
                                :delay="200"
                                variant="primary"
                                class="animate-on-scroll anim-scale-in"
                            />
                            <FeatureCard
                                :title="t('why.modern.title')"
                                :description="t('why.modern.desc')"
                                :icon="Zap"
                                :delay="300"
                                variant="secondary"
                                class="animate-on-scroll anim-scale-in"
                            />
                            <FeatureCard
                                :title="t('why.safe.title')"
                                :description="t('why.safe.desc')"
                                :icon="ShieldCheck"
                                :delay="400"
                                variant="accent"
                                class="animate-on-scroll anim-scale-in"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <ExclusiveFeatures />

            <section
                id="analytics"
                ref="analyticsRef"
                class="relative py-24 bg-base-100"
            >
                <div class="container mx-auto px-6 text-center">
                    <h2 class="section-title animate-on-scroll anim-fade-up">
                        {{ t('analytics.title') }}
                    </h2>
                    <p
                        class="section-subtitle animate-on-scroll anim-fade-up"
                        style="--delay: 100ms"
                    >
                        {{ t('analytics.desc') }}
                    </p>
                    <div
                        class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16"
                    >
                        <div
                            class="card shadow-xl p-6 border border-primary/20 bg-primary/5 transition-all duration-300 animate-on-scroll anim-scale-in"
                            style="--delay: 200ms"
                        >
                            <div class="flex items-center justify-center mb-4">
                                <BarChart
                                    class="h-12 w-12 text-primary group-hover:scale-110 transition-transform"
                                />
                            </div>
                            <h3 class="text-2xl font-bold text-primary mb-2">
                                {{ t('analytics.loader_launches') }}
                            </h3>
                            <p
                                id="loader-launches-odometer"
                                class="odometer text-4xl font-extrabold text-primary"
                            >
                                0
                            </p>
                            <p class="text-base-content/70 mt-2">
                                {{ t('analytics.loader_launches_desc') }}
                            </p>
                        </div>
                        <div
                            class="card shadow-xl p-6 border border-primary/20 bg-primary/5 transition-all duration-300 animate-on-scroll anim-scale-in"
                            style="--delay: 300ms"
                        >
                            <div class="flex items-center justify-center mb-4">
                                <Download
                                    class="h-12 w-12 text-primary group-hover:scale-110 transition-transform"
                                />
                            </div>
                            <h3 class="text-2xl font-bold text-primary mb-2">
                                {{ t('analytics.client_downloads') }}
                            </h3>
                            <p
                                id="client-downloads-odometer"
                                class="odometer text-4xl font-extrabold text-primary"
                            >
                                0
                            </p>
                            <p class="text-base-content/70 mt-2">
                                {{ t('analytics.client_downloads_desc') }}
                            </p>
                        </div>
                        <div
                            class="card shadow-xl p-6 border border-primary/20 bg-primary/5 transition-all duration-300 animate-on-scroll anim-scale-in"
                            style="--delay: 400ms"
                        >
                            <div class="flex items-center justify-center mb-4">
                                <Rocket
                                    class="h-12 w-12 text-primary group-hover:scale-110 transition-transform"
                                />
                            </div>
                            <h3 class="text-2xl font-bold text-primary mb-2">
                                {{ t('analytics.client_launches') }}
                            </h3>
                            <p
                                id="client-launches-odometer"
                                class="odometer text-4xl font-extrabold text-accent"
                            >
                                0
                            </p>
                            <p class="text-base-content/70 mt-2">
                                {{ t('analytics.client_launches_desc') }}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="safety" class="relative py-24">
                <div class="section-wave-divider-bottom"></div>
                <div class="bg-base-100 py-24">
                    <div
                        class="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center"
                    >
                        <div
                            class="text-center md:text-left animate-on-scroll anim-fade-left"
                        >
                            <h2 class="section-title !text-left !mx-0">
                                {{ t('safety.title') }}
                            </h2>
                            <p class="text-lg text-base-content/80">
                                {{ t('safety.desc') }}
                            </p>
                            <ul class="space-y-4 mt-6 text-left">
                                <li
                                    class="flex items-start gap-3 animate-on-scroll anim-fade-up"
                                    style="--delay: 100ms"
                                >
                                    <CheckCircle
                                        class="h-6 w-6 text-success shrink-0 mt-1 animate-icon-pulse-green"
                                    /><span class="font-semibold">{{
                                        t('safety.public')
                                    }}</span>
                                </li>
                                <li
                                    class="flex items-start gap-3 animate-on-scroll anim-fade-up"
                                    style="--delay: 200ms"
                                >
                                    <CheckCircle
                                        class="h-6 w-6 text-success shrink-0 mt-1 animate-icon-pulse-green"
                                    /><span class="font-semibold">{{
                                        t('safety.reviewed')
                                    }}</span>
                                </li>
                                <li
                                    class="flex items-start gap-3 animate-on-scroll anim-fade-up"
                                    style="--delay: 300ms"
                                >
                                    <CheckCircle
                                        class="h-6 w-6 text-success shrink-0 mt-1 animate-icon-pulse-green"
                                    /><span class="font-semibold">{{
                                        t('safety.no_malware')
                                    }}</span>
                                </li>
                            </ul>
                            <a
                                href="https://github.com/dest4590/CollapseLoader"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="btn btn-primary no-underline mt-8 animate-on-scroll anim-fade-up"
                                style="--delay: 400ms"
                            >
                                {{ t('safety.review') }}
                            </a>
                        </div>
                        <div
                            class="card card-glass shadow-xl p-8 hover:shadow-2xl transition-all duration-300 group border border-base-content/10 animate-on-scroll anim-scale-in"
                            style="--delay: 200ms"
                        >
                            <figure class="px-10 pt-10 pb-6">
                                <FileSearch
                                    class="h-24 w-24 text-primary transition-transform duration-300 group-hover:scale-110"
                                />
                            </figure>
                            <div
                                class="card-body items-center text-center pt-0"
                            >
                                <h2 class="card-title text-2xl">
                                    {{ t('safety.verify') }}
                                </h2>
                                <p class="text-base-content/70">
                                    {{ t('safety.verify_desc') }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="section-wave-divider-top transform scale-y-[-1] rotate-180"
                ></div>
            </section>

            <section
                id="download"
                class="py-32 bg-base-200/95 backdrop-blur-sm relative"
            >
                <div class="absolute inset-0 pointer-events-none z-0">
                    <div
                        class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-screen-xl h-1/2 download-gradient-bg"
                    ></div>
                </div>

                <div class="container mx-auto px-6 text-center relative z-10">
                    <h2 class="section-title animate-on-scroll anim-fade-up">
                        {{ t('download.title') }}
                    </h2>
                    <p
                        class="section-subtitle animate-on-scroll anim-fade-up"
                        style="--delay: 100ms"
                    >
                        {{ t('download.desc') }}
                    </p>
                    <div
                        class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center"
                    >
                        <div
                            class="card-download group animate-on-scroll anim-scale-in hover:scale-105 transition-all duration-300"
                            style="--delay: 200ms"
                        >
                            <div
                                class="card-body p-8 text-center flex flex-col"
                            >
                                <Rocket
                                    class="download-icon text-primary h-16 w-16 mx-auto mb-4"
                                />
                                <h3 class="card-title text-2xl mb-2">
                                    {{ t('download.latest') }}
                                </h3>
                                <p class="text-base-content/70 mb-6 grow">
                                    {{ t('download.latest_desc') }}
                                </p>
                                <a
                                    :href="
                                        latestReleaseUrl ||
                                        'https://github.com/dest4590/CollapseLoader/releases'
                                    "
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="btn btn-download"
                                    :class="{
                                        'btn-disabled loading':
                                            !latestReleaseLoaded &&
                                            !latestReleaseUrl,
                                        'btn-success':
                                            latestReleaseLoaded &&
                                            latestReleaseUrl,
                                    }"
                                >
                                    <span v-if="latestReleaseLoaded">{{
                                        t('download.get_latest')
                                    }}</span>
                                    <span v-else>Loading...</span>
                                </a>
                            </div>
                        </div>
                        <div
                            class="card-download group animate-on-scroll anim-scale-in hover:scale-105 transition-all duration-300"
                            style="--delay: 300ms"
                        >
                            <div
                                class="card-body p-8 text-center flex flex-col"
                            >
                                <Download
                                    class="download-icon text-primary h-16 w-16 mx-auto mb-4"
                                />
                                <h3
                                    class="card-title text-2xl mb-2 text-primary"
                                >
                                    Nightly
                                </h3>
                                <p class="text-base-content/70 mb-6 grow">
                                    {{ t('download.nightly_desc') }}
                                </p>
                                <a
                                    :href="
                                        latestPrereleaseUrl ||
                                        'https://github.com/dest4590/CollapseLoader/releases'
                                    "
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="btn btn-download"
                                    :class="{
                                        'btn-disabled loading':
                                            !latestPrereleaseLoaded &&
                                            !latestPrereleaseUrl,
                                        'btn-success':
                                            latestPrereleaseLoaded &&
                                            latestPrereleaseUrl,
                                    }"
                                >
                                    <span v-if="latestPrereleaseLoaded">{{
                                        t('download.get_nightly')
                                    }}</span>
                                    <span v-else>Loading...</span>
                                </a>
                            </div>
                        </div>
                        <div
                            class="card-download group animate-on-scroll anim-scale-in hover:scale-105 transition-all duration-300"
                            style="--delay: 400ms"
                        >
                            <div
                                class="card-body p-8 text-center flex flex-col"
                            >
                                <Github
                                    class="download-icon text-primary h-16 w-16 mx-auto mb-4"
                                />
                                <h3
                                    class="card-title text-2xl mb-2 text-primary"
                                >
                                    {{ t('download.source_code') }}
                                </h3>
                                <p class="text-base-content/70 mb-6 grow">
                                    {{ t('download.source_code_desc') }}
                                </p>
                                <a
                                    href="https://github.com/dest4590/CollapseLoader"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="btn btn-download btn-accent"
                                >
                                    {{ t('download.view_source') }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <footer
            class="footer footer-center p-10 bg-base-300 text-base-content relative"
        >
            <div
                class="section-wave-divider-bottom"
                style="top: 0px; transform: translateY(-100%)"
            ></div>
            <aside class="animate-on-scroll anim-fade-up">
                <p class="text-2xl font-bold text-primary">{{ t('brand') }}</p>
                <p v-html="t('footer.desc')"></p>
                <p>{{ t('footer.copyright') }}</p>
            </aside>
            <nav class="animate-on-scroll anim-fade-up" style="--delay: 100ms">
                <div class="grid grid-flow-col gap-4">
                    <a
                        href="https://github.com/dest4590/CollapseLoader/discussions"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="link link-hover"
                        >{{ t('footer.discussions') }}</a
                    >
                    <a
                        href="https://github.com/dest4590/CollapseLoader/issues"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="link link-hover"
                        >{{ t('footer.issues') }}</a
                    >
                    <a
                        href="https://github.com/dest4590/CollapseLoader"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Repository"
                        class="hover:text-primary transition-colors"
                    >
                        <Github class="h-6 w-6" />
                    </a>
                </div>
                <p class="text-xs text-base-content/60 max-w-xs mx-auto pt-4">
                    {{ t('footer.not_affiliated') }}
                </p>
            </nav>
        </footer>
    </div>
</template>

<style>
@reference 'tailwindcss';
@plugin 'daisyui';
@import url('https://cdnjs.cloudflare.com/ajax/libs/odometer.js/0.4.8/themes/odometer-theme-minimal.css');

html {
    scroll-behavior: smooth;
    scroll-padding-top: 6rem;
}

@keyframes slide-in-up {
    from {
        opacity: 0;
        transform: translateY(30px) scale(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.animate-slide-in-up {
    animation: slide-in-up 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards;
    animation-delay: calc(var(--stagger, 0) * 90ms);
    opacity: 0;
}

.animate-on-scroll {
    opacity: 0;
    will-change: opacity, transform;
    transition: opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1),
        transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    transition-delay: var(--delay, 0ms);
}

.animate-on-scroll.anim-fade-up {
    transform: translateY(40px);
}
.animate-on-scroll.anim-fade-left {
    transform: translateX(-40px);
}
.animate-on-scroll.anim-fade-right {
    transform: translateX(40px);
}
.animate-on-scroll.anim-scale-in {
    transform: scale(0.9);
}

.animate-on-scroll.is-visible {
    opacity: 1;
    transform: translateY(0) translateX(0) scale(1);
}

.showcase-wrapper {
    position: relative;
    transform-style: preserve-3d;
    perspective: 1500px;
}
.showcase-glow {
    position: absolute;
    inset: -20px;
    background: radial-gradient(
        circle at 50% 50%,
        hsl(var(--p) / 0.15),
        transparent 70%
    );
    transition: opacity 0.4s ease;
    opacity: 0;
    transform: translateZ(-50px);
}
.showcase-wrapper:hover .showcase-glow {
    opacity: 1;
}

.showcase {
    aspect-ratio: 743 / 424;
    background-image: url('@/assets/img/loader-back.png');
    background-size: cover;
    transform-style: preserve-3d;
    border-radius: 0.75rem;
    will-change: transform;
}
.showcase-front {
    background-image: url('@/assets/img/loader-front.png');
    width: 100%;
    height: 100%;
    background-size: cover;
    transition: transform 500ms cubic-bezier(0.23, 1, 0.32, 1);
}
.showcase:hover .showcase-front {
    transform: translateZ(20px) scale(1.03);
}

@keyframes icon-bounce {
    0%,
    100% {
        transform: translateY(0) rotate(0deg) scale(1);
    }
    30% {
        transform: translateY(-10px) rotate(-3deg) scale(1.02);
    }
    50% {
        transform: translateY(-15px) rotate(5deg) scale(1.05);
    }
    70% {
        transform: translateY(-8px) rotate(-2deg) scale(1.03);
    }
    90% {
        transform: translateY(-4px) rotate(1deg) scale(1.01);
    }
}
.group-hover\:animate-icon-bounce:hover,
.group:hover .group-hover\:animate-icon-bounce {
    animation: icon-bounce 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes icon-pulse-green {
    0%,
    100% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.1);
        opacity: 0.8;
    }
}
.animate-icon-pulse-green {
    animation: icon-pulse-green 2s ease-in-out infinite alternate;
}

@keyframes cta-pulse {
    0% {
        box-shadow: 0 0 0 0 hsl(var(--p) / 0.5);
    }
    70% {
        box-shadow: 0 0 0 20px hsl(var(--p) / 0);
    }
    100% {
        box-shadow: 0 0 0 0 hsl(var(--p) / 0);
    }
}
.animate-cta-pulse {
    animation: cta-pulse 2.5s ease-out infinite;
    will-change: box-shadow;
}

.btn-shine {
    @apply absolute inset-0 opacity-0 transition-opacity duration-300;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
    );
    transform: translateX(-100%);
    will-change: transform, opacity;
}

.btn:hover .btn-shine {
    @apply opacity-100;
    animation: btn-shine 0.8s ease-out;
}

@keyframes btn-shine {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100%);
    }
}

.bg-grid-pattern {
    background-image: linear-gradient(rgb(var(--b3) / 0.5) 1px, transparent 1px),
        linear-gradient(to right, rgb(var(--b3) / 0.5) 1px, transparent 1px);
    background-size: 3rem 3rem;
}

.hero-gradient-bg {
    background: radial-gradient(
            ellipse at 50% 0%,
            hsl(var(--p) / 0.1),
            transparent 60%
        ),
        radial-gradient(
            ellipse at 0% 100%,
            hsl(var(--s) / 0.08),
            transparent 70%
        ),
        radial-gradient(
            ellipse at 100% 100%,
            hsl(var(--a) / 0.08),
            transparent 70%
        );
}

.download-gradient-bg {
    background: radial-gradient(
        ellipse at 50% 100%,
        hsl(var(--p) / 0.1),
        transparent 70%
    );
}

.pattern-dots {
    background-image: radial-gradient(currentColor 0.7px, transparent 0.7px);
    background-size: 15px 15px;
    color: hsl(var(--b3) / 0.7);
    animation: pan-dots 60s linear infinite reverse;
    will-change: background-position;
}
@keyframes pan-dots {
    0% {
        background-position: 0% 0%;
    }
    100% {
        background-position: 15px 15px;
    }
}

.feature-icon-wrapper {
    @apply relative;
}

.nav-link {
    @apply relative after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-4/5;
}

.section-title {
    @apply text-4xl md:text-5xl font-bold mb-4 text-center;
}
.section-subtitle {
    @apply text-lg text-base-content/70 mb-16 max-w-3xl mx-auto;
}

.card-feature {
    @apply card bg-base-200 shadow-lg border border-transparent transition-all duration-400;
    @apply hover:shadow-2xl hover:border-primary/50 hover:bg-base-300;
    will-change: transform, box-shadow, border-color, background-color;
}
.card-icon {
    @apply rounded-lg p-4 transition-all duration-400 group-hover:scale-110 group-hover:rotate-6;
    will-change: transform;
}

.card-download {
    @apply card bg-base-100 shadow-xl transition-all duration-300;
    @apply hover:shadow-2xl hover:-translate-y-2;
    border-color: currentColor;
    will-change: transform, box-shadow;
}
.card-download:hover {
    border-color: hsl(var(--p) / 0.5);
}
.card-download:nth-child(1) {
    @apply text-primary;
    --tw-shadow-color: hsl(var(--p) / 0.1);
}
.card-download:nth-child(1):hover {
    --tw-shadow-color: hsl(var(--p) / 0.3);
    border-color: hsl(var(--p));
}
.card-download:nth-child(2) {
    @apply text-secondary;
    --tw-shadow-color: hsl(var(--s) / 0.1);
}
.card-download:nth-child(2):hover {
    --tw-shadow-color: hsl(var(--s) / 0.3);
    border-color: hsl(var(--s));
}
.card-download:nth-child(3) {
    @apply text-accent;
    --tw-shadow-color: hsl(var(--a) / 0.1);
}
.card-download:nth-child(3):hover {
    --tw-shadow-color: hsl(var(--a) / 0.3);
    border-color: hsl(var(--a));
}

.section-wave-divider-top,
.section-wave-divider-bottom {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100px;
    background-color: hsl(var(--b1));
    z-index: 1;
    pointer-events: none;
}

.section-wave-divider-top {
    top: 0;
}

.section-wave-divider-bottom {
    bottom: 0;
}

.section-wave-divider-bottom[style*='top: -1px'] {
    transform: translateY(-100%);
}
.section-wave-divider-top[style*='transform: scale-y(-1) rotate-180'] {
    bottom: 0;
    transform: scaleX(-1) scaleY(-1) rotate(180deg);
    height: 100px;
    background-color: hsl(var(--b1));
}

.odometer {
    font-family: 'Kind Sans', sans-serif;
    line-height: 1.2;
}

.odometer.odometer-auto-theme,
.odometer.odometer-theme-minimal {
    @apply text-4xl font-extrabold text-base-content;
}

@media (prefers-reduced-motion: reduce) {
    *,
    ::before,
    ::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }

    .animate-on-scroll,
    .animate-slide-in-up {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
    }

    .showcase-glow {
        opacity: 0 !important;
        transition: none !important;
    }
    .showcase:hover .showcase-front {
        transform: none !important;
        transition: none !important;
    }

    .btn-shine {
        opacity: 0 !important;
        animation: none !important;
    }

    .bg-grid-pattern,
    .pattern-dots {
        animation: none !important;
    }

    .animate-cta-pulse,
    .group-hover\:animate-icon-bounce,
    .animate-icon-pulse-green,
    [data-vanilla-tilt] {
        transform: none !important;
    }

    .odometer {
        animation: none !important;
        transition: none !important;
    }
}
</style>
