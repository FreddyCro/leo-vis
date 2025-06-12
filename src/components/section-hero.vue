<script setup lang="ts">
import { computed, ref } from 'vue';
import Leo3dEarthHero from '@/components/leo-3d-earth-hero.vue';
import LeoBarChart from '@/components/leo-bar-chart.vue';
import LeoScrollTrigger from '@/components/leo-scroll-trigger.vue';
import LeoSectionIntro from '@/components/leo-section-intro.vue';
import LeoSectionLayout from '@/components/leo-section-layout.vue';
import LeoOutline from '@/components/leo-outline.vue';
import str from '@/locales/section-hero.json';
import spaceEconomics from '@/assets/json/space-economics.json';

const isZoomOut = ref(false);
const isBarChartTriggerIntersecting = ref(false);

const barChartData = computed(() => ({
  labels: spaceEconomics.labels,
  datasets: isBarChartTriggerIntersecting.value
    ? spaceEconomics.datasets2 || []
    : spaceEconomics.datasets1 || [],
}));

function onZoomOutIntersectChange(isIntersecting: boolean) {
  isZoomOut.value = isIntersecting;
}

function onBarChartIntersectChange(isIntersecting: boolean) {
  isBarChartTriggerIntersecting.value = isIntersecting;
}
</script>

<template>
  <div class="ls-hero">
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
            <p>{{ str.title }}</p>
            <p>{{ str.subTitle }}</p>
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

                <LeoBarChart
                  :data="barChartData"
                  :options="{
                    barHeight: 24,
                    barGap: 18,
                    labelWidth: 48,
                  }"
                />

                <figcaption>
                  {{ str.g1Caption }}
                </figcaption>
              </figure>
            </div>

            <!-- scroll to toggle chart -->
            <LeoScrollTrigger
              :dev-mode="true"
              scroll-height="50vh"
              @change="onBarChartIntersectChange"
            >
              bar chart trigger
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
