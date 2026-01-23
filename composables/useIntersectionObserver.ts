import { onMounted, onUnmounted, type Ref } from 'vue';

export interface UseIntersectionObserverOptions {
    threshold?: number;
    rootMargin?: string;
    root?: Element | null;
}

export function useIntersectionObserver(
    target: Ref<Element | undefined>,
    callback: IntersectionObserverCallback,
    options: UseIntersectionObserverOptions = {}
) {
    let observer: IntersectionObserver | undefined;

    const cleanup = () => {
        if (observer) {
            observer.disconnect();
            observer = undefined;
        }
    };

    onMounted(() => {
        if (target.value) {
            observer = new IntersectionObserver(callback, {
                threshold: 0.1,
                ...options
            });
            observer.observe(target.value);
        }
    });

    onUnmounted(cleanup);

    return { cleanup };
}
