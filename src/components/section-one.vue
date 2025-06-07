<script setup lang="ts">
import { ref } from 'vue';
import LeoScrollTrigger from '@/components/leo-scroll-trigger.vue';
import LeoSectionIntro from '@/components/leo-section-intro.vue';
import LeoSectionLayout from '@/components/leo-section-layout.vue';
import LeoSvgPathAnimation from '@/components/leo-svg-path-animation.vue';
import Leo3dEarthSatellite from '@/components/leo-3d-earth-satellite.vue';
import LeoReadMore from '@/components/leo-read-more.vue';
import str from '@/locales/section1.json';
import {
  SATELLITE_LABEL_ALL,
  SATELLITE_LABEL_APOGEE,
  SATELLITE_LABEL_ONEWEB_KUIPER,
  SATELLITE_LABEL_STARLINK,
} from '@/utils/constants';

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

const currentCategory = ref<string>(SATELLITE_LABEL_ALL);

function handleChangeCategory(isIntersecting: boolean, category: string) {
  if (!isIntersecting) return;
  currentCategory.value = category;
}
</script>

<template>
  <div class="ls-one">
    <LeoSectionLayout>
      <template #space>
        <LeoSvgPathAnimation :element-number="3">
          <template #element-1>1</template>
          <template #element-2>2</template>
          <template #element-3>3</template>
        </LeoSvgPathAnimation>
      </template>
      <template #intro>
        <LeoSectionIntro chapter="01">
          <p>{{ str.title }}</p>
          <p>{{ str.subTitle }}</p>
        </LeoSectionIntro>
      </template>
      <template #article>
        <div class="leo-section leo-section--pt leo-section--no-mt">
          <div class="min-h-[400vh]">
            <div class="sticky top-0 min-h-[100vh]">
              <Leo3dEarthSatellite :current-category="currentCategory" />
            </div>

            <!-- trigger all -->
            <LeoScrollTrigger
              :dev-mode="true"
              scroll-height="100vh"
              @change="handleChangeCategory($event, SATELLITE_LABEL_ALL)"
            >
              <div>trigger all</div>
              <div class="leo-container">
                <div class="leo-text-box">
                  <p>{{ str.p1t1 }}</p>
                </div>
              </div>
            </LeoScrollTrigger>

            <!-- trigger LEO -->
            <LeoScrollTrigger
              :dev-mode="true"
              scroll-height="100vh"
              @change="handleChangeCategory($event, SATELLITE_LABEL_APOGEE)"
            >
              <div>trigger LEO</div>
              <div class="leo-container">
                <div class="leo-text-box">
                  <p>{{ str.p2t1 }}</p>
                  <p>{{ str.p2t2 }}</p>
                </div>
              </div>
            </LeoScrollTrigger>

            <!-- trigger SpaceX -->
            <LeoScrollTrigger
              :dev-mode="true"
              scroll-height="100vh"
              @change="handleChangeCategory($event, SATELLITE_LABEL_STARLINK)"
            >
              <div>trigger SpaceX</div>
              <div class="leo-container">
                <div class="leo-text-box">
                  <p>{{ str.p3t1 }}</p>
                </div>
              </div>
            </LeoScrollTrigger>

            <!-- trigger OneWeb, Kuiper -->
            <LeoScrollTrigger
              :dev-mode="true"
              scroll-height="100vh"
              @change="
                handleChangeCategory($event, SATELLITE_LABEL_ONEWEB_KUIPER)
              "
            >
              <div>trigger OneWeb, Kuiper</div>
              <div class="leo-container">
                <div class="leo-text-box">
                  <p>{{ str.p4t1 }}</p>
                </div>
              </div>
            </LeoScrollTrigger>
          </div>
        </div>

        <div class="leo-container">
          <div class="leo-section">
            <p>{{ str.p5t1 }}</p>

            <!-- feature grid -->
            <div class="ls-one-feat-grid-wrap">
              <ul class="grid gap-4 sm:grid-cols-2">
                <li
                  v-for="item in FEAT_GRID_DATA"
                  :key="item.title"
                  class="border border-white"
                >
                  <div class="ls-one-feat-grid-item">
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
          </div>

          <div class="leo-section">
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
    </LeoSectionLayout>
  </div>
</template>

<style lang="scss"></style>
