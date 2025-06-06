<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';

interface Props {
  threshold?: number | number[];
  rootMargin?: string;
  disabled?: boolean;
  scrollHeight?: string;
  devMode?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (
    e: 'change',
    isIntersecting: boolean,
    entry: IntersectionObserverEntry,
  ): void;
}>();

const triggerRef = ref<HTMLElement | null>(null);
const isIntersecting = ref(false);
let observer: IntersectionObserver | null = null;

// Expose ref and state for v-model usage
defineExpose({ triggerRef, isIntersecting });

watch(
  () => props.disabled,
  (val) => {
    if (val) {
      observer?.disconnect();
    } else {
      createObserver();
      if (triggerRef.value) observer!.observe(triggerRef.value);
    }
  },
);

onMounted(() => {
  if (props.disabled) return;

  createObserver();

  if (triggerRef.value) {
    observer!.observe(triggerRef.value);
  }
});

onUnmounted(() => {
  observer?.disconnect();
});

function createObserver() {
  if (observer) observer.disconnect();
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isIntersecting.value = entry.isIntersecting;
        emit('change', entry.isIntersecting, entry);
      });
    },
    {
      threshold: props.threshold ?? 0.1,
      rootMargin: props.rootMargin ?? '0px',
    },
  );
}
</script>

<template>
  <div
    ref="triggerRef"
    class="l-scroll-trigger"
    :class="devMode ? 'relative z-100 w-full border border-red-500' : ''"
    :style="{ '--scroll-height': props.scrollHeight || 'auto' }"
  >
    <slot :is-intersecting="isIntersecting" />
  </div>
</template>

<style lang="scss">
.l-scroll-trigger {
  --scroll-height: auto;

  height: var(--scroll-height);
}
</style>
