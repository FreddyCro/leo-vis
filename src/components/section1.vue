<script setup lang="ts">
import LeoIntro from '@/components/leo-intro.vue';
import LeoReadMore from '@/components/leo-read-more.vue';
import str from '@/locales/section1.json';

interface FeatGridItem {
  title: string;
  amount: string;
  desc: string;
}

const FEAT_GRID_DATA: FeatGridItem[] = [
  {
    title: str.feat1Title,
    amount: str.feat1Number,
    desc: str.feat1Desc,
  },
  {
    title: str.feat2Title,
    amount: str.feat2Number,
    desc: str.feat2Desc,
  },
  {
    title: str.feat3Title,
    amount: str.feat3Number,
    desc: str.feat3Desc,
  },
  {
    title: str.feat4Title,
    amount: str.feat4Number,
    desc: str.feat4Desc,
  },
  {
    title: str.feat5Title,
    amount: str.feat5Number,
    desc: str.feat5Desc,
  },
];
</script>

<template>
  <div class="l-sec1">
    <!-- <Leo3dEarthSatellite /> -->

    <LeoIntro chapter="01">
      <p>{{ str.title }}</p>
      <p>{{ str.subTitle }}</p>
    </LeoIntro>

    <div class="leo-container">
      <p>{{ str.p1t1 }}</p>

      <!-- feature grid -->
      <div class="l-sec1-feat-gri d-wrap">
        <ul class="grid gap-4 sm:grid-cols-2">
          <li
            v-for="item in FEAT_GRID_DATA"
            :key="item.title"
            class="border border-white"
          >
            <div class="l-sec1-feat-grid-item">
              <h3>{{ item.title }}</h3>
              <p>{{ str.featFactory }}</p>
              <p>{{ item.amount }}</p>
              <p>{{ item.desc }}</p>
            </div>
          </li>

          <!-- see full data -->
          <li></li>
        </ul>
      </div>

      <LeoReadMore
        :title="str.relatedTitle"
        :data="[
          {
            title: str.related1Title,
            link: str.related1Link,
            bg: 'https://placehold.co/480x320/gray/white',
          },
          {
            title: str.related2Title,
            link: str.related2Link,
            bg: 'https://placehold.co/480x320/gray/white',
          },
          {
            title: str.related3Title,
            link: str.related3Link,
            bg: 'https://placehold.co/480x320/gray/white',
          },
        ]"
      />
    </div>
  </div>
</template>
