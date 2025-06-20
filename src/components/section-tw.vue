<script setup lang="ts">
import LeoReadMore from '@/components/leo-read-more.vue';
import str from '@/locales/section-tw.json';

interface FeatGridItem {
  title: string;
  amount: string;
  desc: string;
}

const FEAT_GRID_DATA: FeatGridItem[] = [
  {
    title: str.feat1Title,
    amount: str.feat1Amount,
    desc: str.feat1Desc,
  },
  {
    title: str.feat2Title,
    amount: str.feat2Amount,
    desc: str.feat2Desc,
  },
  {
    title: str.feat3Title,
    amount: str.feat3Amount,
    desc: str.feat3Desc,
  },
  {
    title: str.feat4Title,
    amount: str.feat4Amount,
    desc: str.feat4Desc,
  },
  {
    title: str.feat5Title,
    amount: str.feat5Amount,
    desc: str.feat5Desc,
  },
];
</script>

<template>
  <div>
    <div class="leo-container">
      <h3>{{ str.title1 }}</h3>
      <p>{{ str.p1t1 }}</p>
      <h3>{{ str.title2 }}</h3>
    </div>

    <!-- feature grid -->
    <div class="leo-section">
      <div class="ls-one-feat-grid-wrap">
        <ul class="grid gap-4 sm:grid-cols-2">
          <li
            v-for="item in FEAT_GRID_DATA"
            :key="item.title"
            class="border border-white px-[20px] py-[30px] rounded-lg"
          >
            <div class="ls-one-feat-grid-item">
              <h3>{{ item.title }}</h3>
              <p>{{ item.amount }}</p>
              <p>{{ str.featBillion }}</p>
              <p>{{ item.desc }}</p>
            </div>
          </li>
        </ul>

        <p>{{ str.featTotal }}</p>
        <p>{{ str.featTotalAmount }}</p>
        <p>{{ str.featBillion }}</p>
      </div>
    </div>

    <div class="leo-container">
      <p>{{ str.p2t1 }}</p>
      <p>{{ str.p2t2 }}</p>
      <p>{{ str.p2t3 }}</p>
      <p>{{ str.p2t4 }}</p>
      <p>{{ str.p2t5 }}</p>
      <h3>{{ str.title3 }}</h3>
      <p>{{ str.p3t1 }}</p>

      <div class="leo-section text-white">
        <LeoReadMore
          :title="str.relatedTitle"
          :data="[
            {
              title: str.related1Title,
              link: str.related1Link,
              bg: 'img/newspaceera2025_pic16',
            },
          ]"
        />
      </div>

      <p>{{ str.p3t2 }}</p>
    </div>
  </div>
</template>

<style lang="scss"></style>
