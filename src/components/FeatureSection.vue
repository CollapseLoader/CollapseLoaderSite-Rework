<script setup lang="ts">
import type { Component } from 'vue';

interface Props {
    title: string;
    description: string;
    icon: Component;
    badges: string[];
    iconColor: 'primary' | 'secondary' | 'accent';
    reverse?: boolean;
    delay?: number;
}

withDefaults(defineProps<Props>(), {
    reverse: false,
    delay: 0,
});
</script>

<template>
    <div
        class="grid md:grid-cols-2 gap-20 items-center max-w-7xl mx-auto"
        :class="{ 'md:grid-flow-dense': reverse }"
    >
        <div
            class="feature-image-container animate-on-scroll group"
            :class="[
                reverse ? 'anim-fade-right md:col-start-2' : 'anim-fade-left',
            ]"
            :style="{ '--delay': `${delay}ms` }"
        >
            <div class="feature-icon-wrapper">
                <component
                    :is="icon"
                    class="h-32 w-32 transition-all duration-500 group-hover:scale-110"
                    :class="`text-${iconColor}`"
                />
            </div>
        </div>

        <div
            class="text-center space-y-6 animate-on-scroll"
            :class="[
                reverse
                    ? 'md:text-right anim-fade-left md:col-start-1'
                    : 'md:text-left anim-fade-right',
            ]"
            :style="{ '--delay': `${delay + 200}ms` }"
        >
            <h3 class="text-4xl font-bold mb-6">{{ title }}</h3>
            <p class="text-xl text-base-content/80 leading-relaxed">
                {{ description }}
            </p>
            <div
                class="flex flex-wrap gap-3"
                :class="[
                    reverse
                        ? 'justify-center md:justify-end'
                        : 'justify-center md:justify-start',
                ]"
            >
                <span
                    v-for="badge in badges"
                    :key="badge"
                    class="badge badge-lg"
                    :class="`badge-${iconColor}`"
                >
                    {{ badge }}
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
@reference "tailwindcss";
@plugin "daisyui";

.feature-image-container {
    @apply rounded-3xl bg-gradient-to-br from-base-100 to-base-200 p-12 flex items-center justify-center shadow-xl h-80 w-full;
    @apply border border-base-content/10;
}

.feature-icon-wrapper {
    @apply relative;
}

.group:hover .feature-icon-glow {
    @apply opacity-10;
}

.animate-on-scroll {
    opacity: 0;
    transition: opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1),
        transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    transition-delay: var(--delay, 0ms);
}

.animate-on-scroll.anim-fade-left {
    transform: translateX(-40px);
}

.animate-on-scroll.anim-fade-right {
    transform: translateX(40px);
}

.animate-on-scroll.is-visible {
    opacity: 1;
    transform: translateY(0) translateX(0);
}
</style>
