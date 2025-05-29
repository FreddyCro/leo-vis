<script setup lang="ts">
// import Leo3dGlobeSatellite from '@/components/leo-3d-globe-satellite.vue';
import LeoFeatureGrid from '@/components/leo-feature-grid.vue';
import str from '@/locales/section-tw.json';
</script>

<template>
  <div>
    <p>{{ str.title }}</p>

    <leo-feature-grid></leo-feature-grid>
  </div>
</template>

<style lang="scss"></style>
