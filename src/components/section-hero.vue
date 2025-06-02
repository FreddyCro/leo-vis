<script setup lang="ts">
import Leo3dEarthHero from '@/components/leo-3d-earth-hero.vue';
import LeoIntro from '@/components/leo-intro.vue';
import LeoOutline from '@/components/leo-outline.vue';
import Mock from '@/components/mock.vue';
import str from '@/locales/section-hero.json';

// TODO: if intro is out of viewport, move the globe to center
</script>

<template>
  <div class="leo-hero">
    <div class="leo-hero-globe-wrap">
      <div class="leo-hero-globe">
        <Leo3dEarthHero />
      </div>
      <div class="leo-hero-intro-wrap">
        <LeoIntro>
          <p>{{ str.title }}</p>
          <p>{{ str.subTitle }}</p>
        </LeoIntro>
      </div>
    </div>
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

<style lang="scss">
.leo-hero-globe-wrap {
  position: relative;
  height: 200vh;
  min-height: calc(var(--hero-min-h) * 2);
}

.leo-hero-globe {
  position: sticky;
  top: 0;
}

.leo-hero-intro-wrap {
  position: absolute;
  top: 0;
}
</style>
