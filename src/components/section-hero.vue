<script setup lang="ts">
import Leo3dEarthHero from '@/components/leo-3d-earth-hero.vue';
import LeoIntro from '@/components/leo-intro.vue';
import LeoOutline from '@/components/leo-outline.vue';
import Mock from '@/components/mock.vue';
import str from '@/locales/section-hero.json';
</script>

<template>
  <div class="leo-hero">
    <Leo3dEarthHero />
    <LeoIntro>
      <p>{{ str.title }}</p>
      <p>{{ str.subTitle }}</p>
    </LeoIntro>
    <div class="leo-container">
      <p>{{ str.p1t1 }}</p>
      <p>{{ str.p1t2 }}</p>
      <figure>
        <figcaption>
          {{ str.g1Title }}
        </figcaption>
        <Mock />
        <figcaption>
          {{ str.g1Caption }}
        </figcaption>
      </figure>
      <figure>
        <!-- 23264843 -->
        <div
          class="flourish-embed flourish-chart"
          data-src="visualisation/20500490"
        ></div>
        <!-- <figcaption>
          {{ 'str.taichungSection4ImgCaption' }}
        </figcaption> -->
      </figure>
      <p>{{ str.p2t1 }}</p>
      <p>{{ str.p3t1 }}</p>
      <p>{{ str.p3t2 }}</p>
    </div>
    <LeoOutline />
  </div>
</template>

<style lang="scss"></style>
