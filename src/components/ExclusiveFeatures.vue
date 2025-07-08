<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import FeatureSection from './FeatureSection.vue';
import { Users, Settings, MessageCircle, MapPin } from 'lucide-vue-next';

const { t, tm } = useI18n();

onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    document
        .querySelectorAll('.animate-on-scroll')
        .forEach((el) => observer.observe(el));
});
</script>

<template>
    <section
        id="exclusive-features"
        class="py-32 bg-transparent relative"
    >
        <div class="container mx-auto px-6 text-center relative z-10">
            <div class="max-w-4xl mx-auto mb-20">
                <h2 class="section-title animate-on-scroll anim-fade-up">
                    {{ t('features.title') }}
                </h2>
                <p
                    class="section-subtitle animate-on-scroll anim-fade-up text-xl"
                    style="--delay: 100ms"
                >
                    {{ t('features.desc') }}
                </p>
            </div>
        </div>

        <div class="container mx-auto px-6 space-y-32 mt-16">
            <FeatureSection
                :title="t('features.cloud.title')"
                :description="t('features.cloud.desc')"
                :icon="Users"
                :badges="tm('features.cloud.badges')"
                icon-color="primary"
                :delay="0"
            />

            <FeatureSection
                :title="t('features.custom.title')"
                :description="t('features.custom.desc')"
                :icon="Settings"
                :badges="tm('features.custom.badges')"
                icon-color="primary"
                :reverse="true"
                :delay="200"
            />

            <FeatureSection
                :title="t('features.cord.title')"
                :description="t('features.cord.desc')"
                :icon="MapPin"
                :badges="tm('features.cord.badges')"
                icon-color="primary"
                :delay="400"
            />

            <FeatureSection
                :title="t('features.irc.title')"
                :description="t('features.irc.desc')"
                :icon="MessageCircle"
                :badges="tm('features.irc.badges')"
                icon-color="primary"
                :reverse="true"
                :delay="600"
            />
        </div>
    </section>
</template>

<style scoped>
@reference "tailwindcss";
@plugin "daisyui";

.section-title {
    @apply text-4xl md:text-5xl font-bold mb-4 text-center;
}

.section-subtitle {
    @apply text-lg text-base-content/70 mb-16 max-w-3xl mx-auto;
}

.animate-on-scroll {
    opacity: 0;
    transition: opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1),
        transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    transition-delay: var(--delay, 0ms);
}

.animate-on-scroll.anim-fade-up {
    transform: translateY(40px);
}

.animate-on-scroll.is-visible {
    opacity: 1;
    transform: translateY(0) translateX(0);
}
</style>
