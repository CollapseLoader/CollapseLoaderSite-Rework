<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const progress = ref(0);

const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
    progress.value = (scrollTop / docHeight) * 100;
};

onMounted(() => {
    window.addEventListener('scroll', updateProgress);
    updateProgress();
});

onUnmounted(() => {
    window.removeEventListener('scroll', updateProgress);
});
</script>

<template>
    <div
        class="scroll-progress-container fixed top-0 left-0 w-full h-1 bg-base-300/50 z-50"
    >
        <div
            class="scroll-progress-bar h-full bg-gradient-to-r from-primary to-secondary transition-all duration-150 ease-out"
            :style="{ width: `${progress}%` }"
        ></div>
    </div>
</template>

<style scoped>
.scroll-progress-bar {
    box-shadow: 0 0 10px hsl(var(--p) / 0.5);
}
</style>
