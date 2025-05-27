<script setup lang="ts">
// import Leo3dEarthHero from '@/components/leo-3d-earth-hero.vue';
import LeoIntro from '@/components/leo-intro.vue';
import LeoOutline from '@/components/leo-outline.vue';
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
    <p>{{ str.g1Title }}</p>
    <div class="w-[640px] h-[360px] bg-green-300"></div>
    <p>{{ str.g2Title }}</p>
    <div class="w-[640px] h-[360px] bg-green-300"></div>
    <p>{{ str.g3Title }}</p>
    <div class="w-[640px] h-[360px] bg-green-300"></div>
    <p>{{ str.p2t1 }}</p>
    <p>{{ str.p3t1 }}</p>
    <p>{{ str.p3t2 }}</p>
    <leo-outline />
  </div>
</template>

<style lang="scss"></style>
