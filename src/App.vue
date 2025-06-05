<script setup lang="ts">
// import SvgPathAnimation from '@/components/lab/svg-path-animation.vue';

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
    <!-- <SvgPathAnimation /> -->
    <LeoHeader />
    <main class="leo-main">
      <div class="bg-black text-white">
        <SectionHero />
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
      </div>
      <SectionTw />
    </main>
    <LeoFooter />
  </div>
</template>
