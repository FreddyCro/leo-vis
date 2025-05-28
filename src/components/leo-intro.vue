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
  <div class="w-full h-screen bg-gray-800">
    <slot />
    <!-- title -->

    <!-- toc -->
    <p>{{ str1.title }}</p>
    <p>{{ str1.subTitle }}</p>
    <p>{{ str2.title }}</p>
    <p>{{ str2.subTitle }}</p>
    <p>{{ str3.title }}</p>
    <p>{{ str3.subTitle }}</p>
    <p>{{ str4.title }}</p>
    <p>{{ str4.subTitle }}</p>

    <!-- chapter -->
    <div v-if="chapter" class="text-5xl">{{ chapter }}</div>
  </div>
</template>

<style lang="scss"></style>
