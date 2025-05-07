<script setup lang="ts">
import LeoHeader from '@/components/leo-header.vue';
import LeoFooter from '@/components/leo-footer.vue';
import Lottie from '@/components/lottie.vue';
import LeoEarth from '@/components/leo-earth-3d.vue';
import ScrollTrigger from '@/components/scroll-trigger.vue';
</script>

<template>
  <div>
    <leo-header />
    <lottie />
    <scroll-trigger />
    <leo-earth />
    <leo-footer />
  </div>
</template>
