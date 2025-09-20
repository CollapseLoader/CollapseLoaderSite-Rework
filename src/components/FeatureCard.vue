<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Component } from 'vue';

interface Props {
    title: string;
    description: string;
    icon: Component;
    delay?: number;
}

withDefaults(defineProps<Props>(), {
    delay: 0,
});

const cardRef = ref<HTMLElement>();

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
        { threshold: 0.2 }
    );

    if (cardRef.value) {
        observer.observe(cardRef.value);
    }
});
</script>

<template>
    <div
        ref="cardRef"
        class="card-feature group animate-on-scroll anim-fade-up"
        :style="{ '--delay': `${delay}ms` }"
    >
        <div class="card-body items-center text-center p-8 relative z-10">
            <div class="card-icon-wrapper">
                <div
                    class="card-icon transition-all duration-500"
                    :class="['bg-primary/10 text-primary border-primary/20']"
                >
                    <component
                        :is="icon"
                        class="h-10 w-10 transition-all duration-300"
                    />
                </div>
                <div
                    class="icon-glow"
                    :class="['bg-primary', 'group-hover:opacity-60']"
                ></div>
            </div>

            <h3
                class="card-title text-xl mt-6 mb-3 transition-all duration-300"
            >
                {{ title }}
            </h3>

            <p
                class="transition-all duration-300 leading-relaxed"
                :class="['group-hover:text-base-content']"
                v-html="description"
            ></p>
        </div>

        <div
            class="card-glow"
            :class="['bg-primary', 'group-hover:opacity-100']"
        ></div>
        <div
            class="card-border-glow"
            :class="['border-primary', 'group-hover:opacity-100']"
        ></div>
    </div>
</template>

<style scoped>
@reference "tailwindcss";
@plugin "daisyui";

.card-feature {
    @apply card bg-base-200/80 backdrop-blur-sm shadow-lg border border-transparent transition-all duration-500 relative overflow-hidden;
    @apply hover:shadow-2xl hover:border-primary/30 hover:bg-base-300/90;
    transform-style: preserve-3d;
}

.card-icon-wrapper {
    @apply relative;
}

.card-icon {
    @apply rounded-xl p-4 border-2 relative z-10;
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.icon-glow {
    @apply absolute inset-0 rounded-xl opacity-0 transition-all duration-500 blur-md;
    transform: scale(1.2);
}

.card-glow {
    @apply absolute inset-0 opacity-0 transition-all duration-500 pointer-events-none blur-xl;
    background: radial-gradient(
        circle at center,
        currentColor,
        transparent 70%
    );
    opacity: 0.1;
}

.card-border-glow {
    @apply absolute inset-0 opacity-0 transition-all duration-500 pointer-events-none rounded-2xl;
    border-width: 2px;
    background: linear-gradient(45deg, transparent, currentColor, transparent);
    mask: linear-gradient(white, white) content-box,
        linear-gradient(white, white);
    mask-composite: exclude;
}

.animate-on-scroll {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1),
        transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    transition-delay: var(--delay, 0ms);
}

.animate-on-scroll.is-visible {
    opacity: 1;
    transform: translateY(0);
}
</style>
