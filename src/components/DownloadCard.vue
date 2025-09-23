<script setup lang="ts">
import { onMounted, ref, onUnmounted, nextTick } from 'vue';
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

const props = defineProps<Props>();

const cardRef = ref<HTMLElement>();
const dropdownRef = ref<HTMLElement>();
const buttonRef = ref<HTMLElement>();
const isOpen = ref(false);
const hoveredIndex = ref(-1);

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
    hoveredIndex.value = -1;
};

const closeDropdown = () => {
    isOpen.value = false;
    hoveredIndex.value = -1;
};

const handleClickOutside = (event: MouseEvent) => {
    if (
        dropdownRef.value &&
        !dropdownRef.value.contains(event.target as Node)
    ) {
        closeDropdown();
    }
};

const handleKeydown = (event: KeyboardEvent) => {
    if (!isOpen.value) return;

    const options = dropdownRef.value?.querySelectorAll('.dropdown-option');
    if (!options) return;

    switch (event.key) {
        case 'Escape':
            closeDropdown();
            break;
        case 'ArrowDown':
            event.preventDefault();
            hoveredIndex.value =
                hoveredIndex.value < options.length - 1
                    ? hoveredIndex.value + 1
                    : 0;
            break;
        case 'ArrowUp':
            event.preventDefault();
            hoveredIndex.value =
                hoveredIndex.value > 0
                    ? hoveredIndex.value - 1
                    : options.length - 1;
            break;
        case 'Enter':
        case ' ':
            event.preventDefault();
            if (hoveredIndex.value >= 0 && options[hoveredIndex.value]) {
                const option = options[hoveredIndex.value];
                const link = option?.querySelector('a') as HTMLAnchorElement;
                if (link) {
                    link.click();
                    closeDropdown();
                }
            }
            break;
        case 'Tab':
            closeDropdown();
            break;
    }
};

const handleButtonKeydown = (event: KeyboardEvent) => {
    switch (event.key) {
        case 'ArrowDown':
        case 'ArrowUp':
            event.preventDefault();
            if (!isOpen.value) {
                toggleDropdown();
                nextTick(() => {
                    hoveredIndex.value =
                        event.key === 'ArrowDown'
                            ? 0
                            : (props.options?.length || 1) - 1;
                });
            }
            break;
    }
};

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

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
    document.removeEventListener('keydown', handleKeydown);
});
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
                    class="icon-glow bg-secondary group-hover:opacity-60"
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
                <div ref="dropdownRef" class="custom-dropdown">
                    <button
                        ref="buttonRef"
                        @click="toggleDropdown"
                        @keydown="handleButtonKeydown"
                        class="btn btn-secondary dropdown-trigger"
                        :class="[
                            {
                                'btn-disabled loading': loading,
                                'dropdown-open': isOpen,
                            },
                        ]"
                        :disabled="loading"
                        :aria-expanded="isOpen"
                        aria-haspopup="true"
                    >
                        <span>{{ loading ? 'Loading...' : ctaText }}</span>
                        <svg
                            class="dropdown-arrow"
                            :class="{ 'dropdown-arrow-open': isOpen }"
                            width="12"
                            height="8"
                            viewBox="0 0 12 8"
                            fill="none"
                        >
                            <path
                                d="M1 1.5L6 6.5L11 1.5"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>

                    <Transition name="dropdown" appear>
                        <div v-if="isOpen" class="dropdown-menu" role="menu">
                            <div class="dropdown-content">
                                <div
                                    v-for="(opt, index) in options"
                                    :key="opt.label"
                                    class="dropdown-option"
                                    :class="{
                                        'dropdown-option-hovered':
                                            index === hoveredIndex,
                                    }"
                                    :style="{
                                        '--stagger-delay': `${index * 50}ms`,
                                    }"
                                    @mouseenter="hoveredIndex = index"
                                    @mouseleave="hoveredIndex = -1"
                                    role="menuitem"
                                >
                                    <a
                                        :href="opt.href"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        @click="closeDropdown"
                                        class="dropdown-link"
                                    >
                                        {{ opt.label }}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </template>
            <template v-else>
                <a
                    :href="href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-secondary"
                    :class="[{ 'btn-disabled loading': loading }]"
                >
                    {{ loading ? 'Loading...' : ctaText }}
                </a>
            </template>
        </div>

        <div class="card-glow bg-secondary group-hover:opacity-100"></div>
        <div
            class="card-border-glow border-secondary group-hover:opacity-100"
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

.custom-dropdown {
    @apply relative;
}

.dropdown-trigger {
    @apply flex items-center gap-2 relative overflow-hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    outline: none;
    box-shadow: none;
}

.dropdown-trigger:hover {
    @apply shadow-lg scale-105;
    transform: translateY(-1px) scale(1.05);
}

.dropdown-trigger:focus {
    outline: none !important;
    box-shadow: none !important;
}

.dropdown-trigger:focus-visible {
    outline: none !important;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5) !important;
}

.dropdown-trigger.dropdown-open {
    @apply shadow-xl;
    transform: translateY(-2px);
}

.dropdown-arrow {
    @apply transition-all duration-300 ease-out;
    transform-origin: center;
}

.dropdown-arrow-open {
    transform: rotate(180deg);
}

.dropdown-menu {
    @apply absolute bottom-full left-1/2 mb-2 z-50;
    transform: translateX(-50%);
    min-width: 200px;
}

.dropdown-content {
    @apply bg-base-100 rounded-xl shadow-2xl border border-base-300/50 overflow-hidden backdrop-blur-sm;
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.dropdown-option {
    @apply transition-all duration-200 ease-out;
    animation: dropdown-item-enter 0.3s ease-out;
    animation-delay: var(--stagger-delay, 0ms);
    animation-fill-mode: both;
}

@keyframes dropdown-item-enter {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.dropdown-option:first-child .dropdown-link {
    @apply rounded-t-xl;
}

.dropdown-option:last-child .dropdown-link {
    @apply rounded-b-xl;
}

.dropdown-link {
    @apply block px-4 py-3 text-base-content hover:bg-primary/10 hover:text-primary transition-all duration-200 ease-out;
    position: relative;
    overflow: hidden;
}

.dropdown-link::before {
    content: '';
    @apply absolute left-0 top-0 w-full h-full opacity-0 transition-all duration-300 ease-out;
    transform: translateX(-100%);
}

.dropdown-option-hovered .dropdown-link {
    @apply bg-primary/10 text-primary transform scale-105;
    box-shadow: inset 0 0 20px rgba(59, 130, 246, 0.1);
}

.dropdown-option-hovered .dropdown-link::before {
    opacity: 1;
    transform: translateX(0);
}

.dropdown-enter-active {
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.dropdown-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.dropdown-enter-from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px) scale(0.8);
}

.dropdown-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(10px) scale(0.95);
}

.dropdown-enter-to,
.dropdown-leave-from {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
}

.dropdown-trigger::after {
    content: '';
    @apply absolute inset-0 opacity-0 transition-all duration-300;
    transform: translateX(-100%);
}

.dropdown-trigger:hover::after {
    opacity: 1;
    transform: translateX(0);
}

.dropdown-trigger:active {
    transform: translateY(0) scale(0.98);
}
</style>
