<script setup lang="ts">
import Leo3dEarthSatellite from '@/components/leo-3d-earth-satellite.vue';
import LeoIntro from '@/components/leo-intro.vue';
import LeoFeatureGrid from '@/components/leo-feature-grid.vue';
import LeoReadMore from '@/components/leo-read-more.vue';
import str from '@/locales/section1.json';
</script>

<template>
  <div>
    <Leo3dEarthSatellite />

    <LeoIntro chapter="01">
      <p>{{ str.title }}</p>
      <p>{{ str.subTitle }}</p>
    </LeoIntro>

    <p>{{ str.p1t1 }}</p>

    <LeoFeatureGrid></LeoFeatureGrid>

    <LeoReadMore
      :title="str.relatedTitle"
      :data="[
        {
          title: str.related1Title,
          link: str.related1Link,
        },
        {
          title: str.related2Title,
          link: str.related2Link,
        },
        {
          title: str.related3Title,
          link: str.related3Link,
        },
      ]"
    />
  </div>
</template>
