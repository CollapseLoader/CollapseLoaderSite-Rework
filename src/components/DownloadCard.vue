<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Component } from 'vue';

type Variant = 'primary' | 'secondary' | 'accent';

interface Props {
    title: string;
    description: string;
    icon: Component;
    href: string;
    ctaText: string;
    loading?: boolean;
    variant?: Variant;
    delay?: number;
    options?: Array<{ label: string; href: string }>;
}

withDefaults(defineProps<Props>(), {
    loading: false,
    variant: 'primary',
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

    if (cardRef.value) observer.observe(cardRef.value);
});

const colorMap = {
    primary: {
        glow: 'bg-primary',
        button: 'btn-primary',
        borderGlow: 'border-primary',
    },
    secondary: {
        glow: 'bg-secondary',
        button: 'btn-secondary',
        borderGlow: 'border-secondary',
    },
    accent: {
        glow: 'bg-accent',
        button: 'btn-accent',
        borderGlow: 'border-accent',
    },
} as const;
</script>

<template>
    <div
        ref="cardRef"
        class="card-download card-feature group animate-on-scroll anim-fade-up"
        :style="{ '--delay': `${delay}ms` }"
    >
        <div class="card-body items-center text-center p-8 relative z-10">
            <div class="card-icon-wrapper">
                <div
                    class="card-icon transition-all duration-500 bg-primary/10 text-primary border-primary/20"
                >
                    <component :is="icon" class="h-10 w-10" />
                </div>
                <div
                    class="icon-glow"
                    :class="[colorMap[variant].glow, 'group-hover:opacity-60']"
                ></div>
            </div>

            <h3 class="card-title text-2xl mt-6 mb-3">
                {{ title }}
            </h3>
            <p
                class="text-base-content/80 leading-relaxed mb-6"
                v-html="description"
            ></p>

            <template v-if="options && options.length > 0">
                <div class="dropdown dropdown-top dropdown-center">
                    <button
                        class="btn"
                        :class="[
                            colorMap[variant].button,
                            { 'btn-disabled loading': loading },
                        ]"
                        :disabled="loading"
                        tabindex="0"
                    >
                        {{ loading ? 'Loading...' : ctaText }}
                    </button>
                    <ul
                        tabindex="0"
                        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-56 mt-2"
                    >
                        <li v-for="opt in options" :key="opt.label">
                            <a
                                :href="opt.href"
                                target="_blank"
                                rel="noopener noreferrer"
                                >{{ opt.label }}</a
                            >
                        </li>
                    </ul>
                </div>
            </template>
            <template v-else>
                <a
                    :href="href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn"
                    :class="[
                        colorMap[variant].button,
                        { 'btn-disabled loading': loading },
                    ]"
                >
                    {{ loading ? 'Loading...' : ctaText }}
                </a>
            </template>
        </div>

        <div
            class="card-glow"
            :class="[colorMap[variant].glow, 'group-hover:opacity-100']"
        ></div>
        <div
            class="card-border-glow"
            :class="[colorMap[variant].borderGlow, 'group-hover:opacity-100']"
        ></div>
    </div>
</template>

<style scoped>
@reference "tailwindcss";
@plugin "daisyui";

.card-feature {
    @apply card bg-base-300/80 backdrop-blur-sm shadow-lg border border-transparent transition-all duration-500 relative overflow-hidden;
    @apply hover:shadow-2xl hover:border-primary/30 hover:bg-base-300/90;
    transform-style: preserve-3d;
}

.card-icon-wrapper {
    @apply relative;
}
.card-icon {
    @apply rounded-xl p-4 border-2 relative z-10;
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
