<script setup lang="ts">
import { ref } from 'vue';
import Leo3dEarthHero from '@/components/leo-3d-earth-hero.vue';
import LeoScrollTrigger from '@/components/leo-scroll-trigger.vue';
import LeoSectionIntro from '@/components/leo-section-intro.vue';
import LeoSectionLayout from '@/components/leo-section-layout.vue';
import LeoOutline from '@/components/leo-outline.vue';
import LeoPic from '@/components/leo-pic.vue';
import LeoLoading from '@/components/leo-loading.vue';
import str from '@/locales/section-hero.json';

const isEarthReady = ref(false);
const isZoomOut = ref(false);
const isFlourishChartIntersecting = ref(false);

function onZoomOutIntersectChange(isIntersecting: boolean) {
  isZoomOut.value = isIntersecting;
}

function onFlourishChartIntersectChange(isIntersecting: boolean) {
  isFlourishChartIntersecting.value = isIntersecting;
}

function onEarthReady() {
  isEarthReady.value = true;
}
</script>

<template>
  <div class="ls-hero leo-article">
    <div
      class="relative z-10 transition-all duration-1000 ease-in-out"
      :class="{
        'opacity-0 pointer-events-none': isEarthReady,
        'opacity-100': !isEarthReady,
      }"
    >
      <LeoLoading />
    </div>
    <LeoSectionLayout :use-space-bg="true">
      <template #space>
        <Leo3dEarthHero :is-zoom-out="isZoomOut" @on-ready="onEarthReady" />
      </template>
      <template #intro>
        <div
          class="ls-hero__intro transition-all duration-500 ease-in-out"
          :class="{
            'opacity-0 pointer-events-none': isZoomOut,
          }"
        >
          <LeoSectionIntro>
            <h1 class="ls-hero__title-shadow max-w-[362px] sm:max-w-[448px]">
              <span class="block text-5xl md:text-7xl mb-5 font-medium">{{
                str.title
              }}</span>
              <span class="block text-[28px] leading-10 font-light">{{
                str.subTitle
              }}</span>
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
            <div class="leo-container-pc">
              <div class="leo-text-box">
                <p>{{ str.p1t1 }}</p>
                <p>{{ str.p1t2 }}</p>
              </div>
            </div>
          </LeoScrollTrigger>
        </div>

        <div class="leo-container">
          <div
            class="min-h-[calc(var(--init-screen-height)*1)] flex flex-col justify-center items-center"
          >
            <h3 class="leo-h3 text-left">
              {{ str.g1Title }}
            </h3>
            <div>
              <figure class="w-full ls-hero__chart">
                <LeoPic
                  src="img/newspaceera2025_pic1_1_chart"
                  ext="svg"
                  :use2x="false"
                  :webp="false"
                />
              </figure>
              <div class="mt-4">
                <p class="leo-caption">
                  {{ str.g1Caption }}
                </p>
              </div>
            </div>
          </div>

          <div class="min-h-[calc(var(--init-screen-height)*2)]">
            <div
              class="sticky top-0 w-full min-h-[calc(var(--init-screen-height)*1)] flex items-center"
            >
              <figure
                class="w-full transition-all duration-500 ease-in-out"
                :class="{ 'opacity-0': !isFlourishChartIntersecting }"
              >
                <div
                  class="flourish-embed flourish-chart"
                  data-src="visualisation/23264843"
                />
              </figure>
            </div>

            <LeoScrollTrigger
              class="mt-[calc(var(--init-screen-height)*-0.35)] md:mt-[calc(var(--init-screen-height)*-0.15)]"
              scroll-height="calc(var(--init-screen-height) * 1)"
              @change="onFlourishChartIntersectChange"
            >
              <!-- scroll over chart -->
              <div class="relative z-10 leo-text-box">
                <p>{{ str.p2t1 }}</p>
              </div>
            </LeoScrollTrigger>
          </div>

          <!-- rest article -->
          <div class="leo-section">
            <p>{{ str.p3t1 }}</p>
            <p>{{ str.p3t2 }}</p>
          </div>
        </div>
        <div class="leo-section">
          <div class="leo-container-lg">
            <LeoOutline />
          </div>
        </div>
      </template>
    </LeoSectionLayout>
  </div>
</template>

<style lang="scss">
.ls-hero {
  &__title-shadow {
    text-shadow: 0 0 16px #fff;
  }

  // override the default height
  .ls-layout {
    --ls-layout-header-h: calc(var(--init-screen-height) * 2);
  }

  &__chart {
    img {
      @include rwd-max(sm) {
        width: 100%;
        max-width: 362px;
      }
    }
  }
}
</style>
