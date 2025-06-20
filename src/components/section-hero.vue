<script setup lang="ts">
import { ref } from 'vue';
import Leo3dEarthHero from '@/components/leo-3d-earth-hero.vue';
import LeoScrollTrigger from '@/components/leo-scroll-trigger.vue';
import LeoSectionIntro from '@/components/leo-section-intro.vue';
import LeoSectionLayout from '@/components/leo-section-layout.vue';
import LeoOutline from '@/components/leo-outline.vue';
import LeoPic from '@/components/leo-pic.vue';
import str from '@/locales/section-hero.json';

const isZoomOut = ref(false);
const isBarChartTriggerIntersecting = ref(false);

function onZoomOutIntersectChange(isIntersecting: boolean) {
  isZoomOut.value = isIntersecting;
}

function onBarChartIntersectChange(isIntersecting: boolean) {
  isBarChartTriggerIntersecting.value = isIntersecting;
}
</script>

<template>
  <div class="ls-hero leo-article">
    <LeoSectionLayout>
      <template #space>
        <Leo3dEarthHero :is-zoom-out="isZoomOut" />
      </template>
      <template #intro>
        <div
          class="ls-hero__intro transition-all duration-500 ease-in-out"
          :class="{
            'opacity-0 pointer-events-none': isZoomOut,
          }"
        >
          <LeoSectionIntro>
            <h1 class="max-w-[448px]">
              <span class="block text-5xl md:text-7xl mb-5">{{
                str.title
              }}</span>
              <span class="block text-3xl">{{ str.subTitle }}</span>
            </h1>
          </LeoSectionIntro>
        </div>
      </template>
      <template #article>
        <div class="absolute top-[-75vh] h-screen w-full">
          <!-- hide intro, move globe to center -->
          <LeoScrollTrigger
            scroll-height="75vh"
            @change="onZoomOutIntersectChange"
          >
            <div class="leo-container">
              <div class="leo-text-box">
                <p>{{ str.p1t1 }}</p>
                <p>{{ str.p1t2 }}</p>
              </div>
            </div>
          </LeoScrollTrigger>
        </div>

        <div class="leo-container">
          <div class="min-h-[200vh]">
            <div
              class="sticky top-0 min-h-[100vh] flex items-center justify-center"
            >
              <figure>
                <figcaption>
                  {{ str.g1Title }}
                </figcaption>

                <LeoPic
                  v-if="!isBarChartTriggerIntersecting"
                  src="img/newspaceera2025_pic1_1_chart"
                  ext="svg"
                  :use2x="false"
                  :webp="false"
                  :width="430"
                  :height="120"
                />

                <LeoPic
                  v-else
                  src="img/newspaceera2025_pic1_2_chart"
                  ext="svg"
                  :use2x="false"
                  :webp="false"
                  :width="430"
                  :height="120"
                />

                <figcaption>
                  {{ str.g1Caption }}
                </figcaption>
              </figure>
            </div>

            <!-- scroll to toggle chart -->
            <LeoScrollTrigger
              scroll-height="50vh"
              @change="onBarChartIntersectChange"
            >
            </LeoScrollTrigger>
          </div>

          <div class="min-h-[250vh]">
            <div class="sticky top-0 min-h-[50vh]">
              <figure>
                <div
                  class="flourish-embed flourish-chart"
                  data-src="visualisation/23264843"
                />
              </figure>
            </div>

            <!-- scroll over chart -->
            <div class="relative z-10 leo-text-box">
              <p>{{ str.p2t1 }}</p>
            </div>
          </div>

          <!-- rest article -->
          <div class="leo-section">
            <p>{{ str.p3t1 }}</p>
            <p>{{ str.p3t2 }}</p>
          </div>
          <div class="leo-section">
            <LeoOutline />
          </div>
        </div>
      </template>
    </LeoSectionLayout>
  </div>
</template>

<style lang="scss">
.ls-hero {
  // override the default height
  .ls-layout {
    --ls-layout-header-h: 200vh;
  }
}
</style>
