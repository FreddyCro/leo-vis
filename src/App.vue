<script setup lang="ts">
import LeoHeader from '@/components/LeoHeader.vue';
import LeoFooter from '@/components/LeoFooter.vue';
import Lottie from '@/components/lottie.vue';
import LeoThreeGlobe from '@/components/leo-three-globe.vue';
import LeoThreeMoon from '@/components/leo-three-moon.vue';
import LeoEarth from '@/components/leo-earth-3d.vue';
import Wording from '@/components/wording.vue';
// import ScrollTrigger from '@/components/scroll-trigger.vue';
</script>

<template>
  <div>
    <leo-header />
    <leo-three-globe />
    <leo-three-moon />
    <leo-earth />
    <leo-footer />
    <wording />
    <!-- <lottie /> -->
    <!-- <scroll-trigger /> -->
  </div>
</template>
