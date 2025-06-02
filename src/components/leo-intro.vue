<script setup lang="ts">
import str1 from '@/locales/section1.json';
import str2 from '@/locales/section2.json';
import str3 from '@/locales/section3.json';
import str4 from '@/locales/section4.json';

interface Props {
  chapter?: string;
  current?: number;
}

defineProps<Props>();
</script>

<template>
  <div
    class="leo-intro w-full h-screen min-h-[var(--hero-min-h)] flex flex-col items-center justify-center"
  >
    <!-- title -->
    <div class="mb-8">
      <slot />
    </div>

    <!-- toc -->
    <div class="w-full flex gap-4">
      <p>{{ str1.title }}</p>
      <p>{{ str2.title }}</p>
      <p>{{ str3.title }}</p>
      <p>{{ str4.title }}</p>
    </div>

    <!-- chapter -->
    <div v-if="chapter" class="text-5xl">{{ chapter }}</div>
  </div>
</template>

<style lang="scss"></style>
