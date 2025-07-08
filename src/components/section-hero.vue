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
const isChart1Intersecting = ref(false);

function onZoomOutIntersectChange(isIntersecting: boolean) {
  // When the zoom out section is intersecting, we want to zoom out the globe
  isZoomOut.value = isIntersecting;
}

function onFlourishChartIntersectChange(isIntersecting: boolean) {
  isFlourishChartIntersecting.value = isIntersecting;
}

function onChart1IntersectChange(isIntersecting: boolean) {
  isChart1Intersecting.value = isIntersecting;
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
              <span class="block leo-intro-h2">{{ str.title }}</span>
              <span class="block leo-intro-h2-sub-lg">{{ str.subTitle }}</span>
            </h1>
          </LeoSectionIntro>
        </div>
      </template>
      <template #before-article>
        <!-- text 1 -->
        <!-- hide intro, move globe to center -->
        <div class="min-h-[calc(var(--init-screen-height)*1)]">
          <LeoScrollTrigger
            :threshold="0"
            scroll-height="calc(var(--init-screen-height)*1)"
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
      </template>
      <template #article>
        <div>
          <!-- chart 1 -->
          <div class="leo-container-larger">
            <LeoScrollTrigger
              class="w-full flex items-center justify-center mb-[100px] sm:mb-0"
              scroll-height="calc(var(--init-screen-height)*1)"
              @change="onChart1IntersectChange"
            >
              <div class="leo-section-chart">
                <figure
                  class="w-full transition-all duration-500 ease-in-out"
                  :class="{ 'opacity-0': !isChart1Intersecting }"
                >
                  <!-- <h3 class="leo-h3 text-left">
                    {{ str.g1Title }}
                  </h3> -->
                  <div class="flex justify-center">
                    <figure class="w-full ls-hero__chart flex justify-center">
                      <LeoPic
                        src="img/newspaceera2025_pic1_1_chart"
                        ext="svg"
                        :use2x="false"
                        :webp="false"
                      />
                    </figure>
                    <!-- <div class="mt-4">
                      <p class="leo-caption">
                        {{ str.g1Caption }}
                      </p>
                    </div> -->
                  </div>
                </figure>
              </div>
            </LeoScrollTrigger>
          </div>

          <!-- chart 2 -->
          <div
            class="sticky top-0 w-full h-[calc(var(--init-screen-height)*1)] flex items-center"
          >
            <div class="leo-container-larger bg-black">
              <div class="leo-section-chart">
                <LeoScrollTrigger
                  class="w-full"
                  @change="onFlourishChartIntersectChange"
                >
                  <figure
                    class="w-full flex items-center justify-center transition-all duration-500 ease-in-out"
                    :class="{ 'opacity-0': !isFlourishChartIntersecting }"
                  >
                    <div
                      class="w-full flourish-embed flourish-chart"
                      data-src="visualisation/23264843"
                    />
                  </figure>
                </LeoScrollTrigger>
              </div>
            </div>
          </div>

          <!-- text 2 -->
          <div
            class="sticky top-0 w-full min-h-[calc(var(--init-screen-height)*1.15)] flex items-center"
          >
            <div class="leo-container-pc">
              <div class="min-h-[calc(var(--init-screen-height)*1)]">
                <div class="leo-text-box">
                  <p>{{ str.p2t1 }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- rest article -->
        <div class="leo-section">
          <div class="leo-container">
            <p>{{ str.p3t1 }}</p>
            <p>{{ str.p3t2 }}</p>
          </div>
        </div>

        <!-- read more -->
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
  .ls-layout-article {
    margin-top: 0;
  }

  .ls-layout-article-trigger {
    position: sticky;
    top: 0;
  }

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
