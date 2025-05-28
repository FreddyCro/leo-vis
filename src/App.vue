<script setup lang="ts">
import LeoHeader from '@/components/leo-header.vue';
import LeoFooter from '@/components/leo-footer.vue';
import SectionHero from '@/components/section-hero.vue';
import SectionOne from '@/components/section1.vue';
import SectionTwo from '@/components/section2.vue';
import SectionThree from '@/components/section3.vue';
import SectionFour from '@/components/section4.vue';
import SectionTw from '@/components/section-tw.vue';
</script>

<template>
  <div class="app">
    <leo-header />
    <main class="leo-main">
      <div class="bg-black text-white">
        <section-hero />
        <section-one />
        <section-two />
        <section-three />
        <section-four />
      </div>
      <section-tw />
    </main>
    <leo-footer />
  </div>
</template>
