<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import LeoNavbar from '@/components/leo-navbar.vue';
import LeoFooter from '@/components/leo-footer.vue';
import LeoHero from '@/components/section-hero.vue';

const AsyncSectionOne = defineAsyncComponent(
  () => import('@/components/section-one.vue'),
);
const AsyncSectionTwo = defineAsyncComponent(
  () => import('@/components/section-two.vue'),
);
const AsyncSectionThree = defineAsyncComponent(
  () => import('@/components/section-three.vue'),
);
const AsyncSectionFour = defineAsyncComponent(
  () => import('@/components/section-four.vue'),
);
const AsyncSectionTw = defineAsyncComponent(
  () => import('@/components/section-tw.vue'),
);
</script>

<template>
  <div class="app">
    <LeoNavbar />
    <main class="leo-main">
      <div class="bg-black text-white">
        <LeoHero />
        <AsyncSectionOne />
        <AsyncSectionTwo />
        <AsyncSectionThree />
        <AsyncSectionFour />
      </div>
      <AsyncSectionTw />
    </main>
    <LeoFooter />
  </div>
</template>
