<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ref: https://stackblitz.com/edit/vitejs-vite-t1nmfa?file=src%2FApp.vue
gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  gsap.to('.test', {
    scrollTrigger: {
      trigger: '.test',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
    scale: 0.5,
    rotation: 360,
    duration: 1,
  });
});

onUnmounted(() => {
  gsap.killTweensOf('.test');
  ScrollTrigger.getAll().forEach((t) => t.kill());
  gsap.unregisterPlugin(ScrollTrigger);
});
</script>

<template>
  <div class="test">
    <div class="h-screen bg-blue-300">section 1</div>
    <div class="h-screen bg-green-300">section 2</div>
    <div class="h-screen bg-yellow-300">section 3</div>
  </div>
</template>
