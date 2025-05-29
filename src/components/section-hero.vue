<script setup lang="ts">
import Leo3dEarthHero from '@/components/leo-3d-earth-hero.vue';
import LeoIntro from '@/components/leo-intro.vue';
import LeoOutline from '@/components/leo-outline.vue';
import Mock from '@/components/mock.vue';
import str from '@/locales/section-hero.json';
</script>

<template>
  <div class="leo-hero">
    <leo-3d-earth-hero />
    <leo-intro>
      <p>{{ str.title }}</p>
      <p>{{ str.subTitle }}</p>
    </leo-intro>
    <p>{{ str.p1t1 }}</p>
    <p>{{ str.p1t2 }}</p>
    <Mock :title="true" :caption="true" />
    <Mock :title="true" :caption="true" />
    <Mock :title="true" :caption="true" />
    <p>{{ str.p2t1 }}</p>
    <p>{{ str.p3t1 }}</p>
    <p>{{ str.p3t2 }}</p>
    <leo-outline />
  </div>
</template>

<style lang="scss"></style>
