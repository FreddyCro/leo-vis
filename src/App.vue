<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue';
import LeoNavbar from '@/components/leo-navbar.vue';
import LeoFooter from '@/components/leo-footer.vue';
import SectionHero from '@/components/section-hero.vue';

// import SectionOne from '@/components/section-one.vue';
import SectionTwo from '@/components/section-two.vue';

// import SectionThree from '@/components/section-three.vue';
import SectionFour from '@/components/section-four.vue';

// import SectionTw from '@/components/section-tw.vue';

const AsyncSectionOne = defineAsyncComponent(
  () => import('@/components/section-one.vue'),
);
const AsyncSectionThree = defineAsyncComponent(
  () => import('@/components/section-three.vue'),
);
const AsyncSectionTw = defineAsyncComponent(
  () => import('@/components/section-tw.vue'),
);

const root = ref<HTMLElement | null>(null);
const initScreenHeight = window.innerHeight;

onMounted(() => {
  setInitScreenHeight();
  window.addEventListener('resize', setInitScreenHeight);
});

onUnmounted(() => {
  window.removeEventListener('resize', setInitScreenHeight);
});

function setInitScreenHeight() {
  root.value?.style.setProperty(
    '--init-screen-height',
    window.matchMedia('(min-width: 1024px)').matches
      ? '100vh'
      : `${initScreenHeight}px`,
  );
}
</script>

<template>
  <div ref="root" class="app">
    <LeoNavbar />
    <main class="leo-main">
      <div class="bg-black text-white">
        <SectionHero />

        <AsyncSectionOne />
        <!-- <SectionOne /> -->

        <!-- don't use async component to prevent flourish error -->
        <SectionTwo />

        <AsyncSectionThree />
        <!-- <SectionThree /> -->

        <!-- don't use async component to prevent flourish error -->
        <SectionFour />
      </div>
      <AsyncSectionTw />
      <!-- <SectionTw /> -->
    </main>
    <LeoFooter />
  </div>
</template>

<style lang="scss">
.app {
  max-width: 2560px;
  margin: 0 auto;
}
</style>
