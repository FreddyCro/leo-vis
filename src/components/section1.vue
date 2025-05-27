<script setup lang="ts">
// import Leo3dGlobeSatellite from '@/components/leo-3d-globe-satellite.vue';
import LeoIntro from '@/components/leo-intro.vue';
import LeoFeatureGrid from '@/components/leo-feature-grid.vue';
import LeoReadMore from '@/components/leo-read-more.vue';
import str from '@/locales/section1.json';
</script>

<template>
  <div>
    <leo-intro>
      <p>{{ str.title }}</p>
      <p>{{ str.subTitle }}</p>
    </leo-intro>

    <leo-feature-grid></leo-feature-grid>
    <leo-read-more />
  </div>
</template>

<style lang="scss"></style>
