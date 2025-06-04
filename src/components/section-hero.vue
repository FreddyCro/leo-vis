<script setup lang="ts">
import LeoIntro from '@/components/leo-intro.vue';
import LeoOutline from '@/components/leo-outline.vue';
import Mock from '@/components/mock.vue';
import str from '@/locales/section-hero.json';

// TODO: if intro is out of viewport, move the globe to center
</script>

<template>
  <div class="l-hero">
    <div class="l-hero-globe-wrap">
      <div class="l-hero-globe">
        <!-- <Leo3dEarthHero /> -->
      </div>
      <div class="l-hero-intro-wrap">
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
        <div
          class="flourish-embed flourish-chart"
          data-src="visualisation/23264843"
        />
      </figure>
      <p>{{ str.p2t1 }}</p>
      <p>{{ str.p3t1 }}</p>
      <p>{{ str.p3t2 }}</p>

      <LeoOutline />
    </div>
  </div>
</template>

<style lang="scss">
.l-hero-globe-wrap {
  position: relative;
  height: 200vh;
  min-height: calc(var(--hero-min-h) * 2);
}

.l-hero-globe {
  position: sticky;
  top: 0;
  background-image: url('./img/bg_star.jpg');
  background-size: cover;
}

.l-hero-intro-wrap {
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
