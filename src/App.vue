<script setup lang="ts">
import LeoNavbar from '@/components/leo-navbar.vue';
import LeoFooter from '@/components/leo-footer.vue';
import SectionHero from '@/components/section-hero.vue';
import SectionOne from '@/components/section-one.vue';
import SectionTwo from '@/components/section-two.vue';
import SectionThree from '@/components/section-three.vue';
import SectionFour from '@/components/section-four.vue';
import SectionTw from '@/components/section-tw.vue';
</script>

<template>
  <div class="app">
    <LeoNavbar />
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
