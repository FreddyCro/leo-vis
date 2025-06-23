<script setup lang="ts">
import { ref } from 'vue';
import LeoScrollTrigger from '@/components/leo-scroll-trigger.vue';
import LeoSectionIntro from '@/components/leo-section-intro.vue';
import LeoSectionLayout from '@/components/leo-section-layout.vue';
import LeoSvgPathAnimation from '@/components/leo-svg-path-animation.vue';
import Leo3dMoonSite from '@/components/leo-3d-moon-site.vue';
import LeoReadMore from '@/components/leo-read-more.vue';
import LeoPic from '@/components/leo-pic.vue';
import str from '@/locales/section3.json';

type MoonSiteCategory = 'all' | 'soviet' | 'us' | 'cn' | 'others';

const currentCategory = ref<MoonSiteCategory>('all');
const isMoonSvgEnter = ref(false);
const isSatelliteEnter = ref(false);

function handleChangeCategory(
  isIntersecting: boolean,
  category: MoonSiteCategory,
) {
  if (!isIntersecting) return;
  currentCategory.value = category;
}

function handleSvgContent(isIntersecting: boolean) {
  isMoonSvgEnter.value = isIntersecting;
}

function handleSatelliteContent(isIntersecting: boolean) {
  isSatelliteEnter.value = isIntersecting;
}
</script>

<template>
  <div class="ls-three leo-article max-w-screen">
    <LeoSectionLayout>
      <template #space>
        <div class="relative w-full h-[100vh]">
          <LeoPic
            class="leo-section-bg"
            src="img/newspaceera2025_pic8_1_bg"
            :webp="false"
            :use2x="false"
            :width="450"
            :height="450"
          />
          <div class="relative z-10">
            <LeoSvgPathAnimation :element-number="3">
              <template #element-1>1</template>
              <template #element-2>2</template>
              <template #element-3>3</template>
            </LeoSvgPathAnimation>
          </div>
        </div>
      </template>
      <template #intro>
        <LeoSectionIntro chapter="03">
          <h2 class="max-w-[448px]">
            <span class="block text-4xl md:text-6xl mb-5">{{ str.title }}</span>
            <span class="block text-2xl">{{ str.subTitle }}</span>
          </h2>
        </LeoSectionIntro>
      </template>
      <template #article>
        <div class="leo-container">
          <div class="leo-section leo-section--pt leo-section--no-mt">
            <p>{{ str.p1t1 }}</p>
            <p>{{ str.p1t2 }}</p>
            <div>{{ str.p1ChartTitle }}</div>
            <div>{{ str.p1ChartText1 }}</div>
            <div>{{ str.p1ChartText2 }}</div>
            <div>{{ str.p1ChartText3 }}</div>
            <div>{{ str.p1ChartText4 }}</div>
            <div>{{ str.p1ChartText5 }}</div>
            <div>{{ str.p1ChartText6 }}</div>
            <p class="leo-caption">{{ str.p1ChartCaption }}</p>
          </div>
        </div>

        <!-- satellite fall down -->
        <div class="leo-section">
          <LeoScrollTrigger
            scroll-height="150vh"
            @change="handleSatelliteContent"
          >
            <div class="ls-three__fall-down relative">
              <LeoPic
                class="ls-three__fall-down-bg"
                src="img/newspaceera2025_pic9_1_bg"
                :use2x="false"
                :webp="false"
                :width="430"
                :height="120"
              />

              <div class="ls-three__fall-down-satellite-wrap">
                <LeoPic
                  class="ls-three__fall-down-satellite"
                  src="img/newspaceera2025_pic9_2"
                  ext="png"
                  :webp="false"
                  :use2x="false"
                  :width="430"
                  :height="120"
                />

                <div
                  class="ls-three__fall-down-satellite-text"
                  :class="{
                    'ls-three__fall-down-satellite-text--fade-in':
                      isSatelliteEnter,
                  }"
                >
                  {{ str.falldownTitle }}
                  {{ str.falldownDesc }}
                </div>
              </div>
            </div>
          </LeoScrollTrigger>
        </div>

        <div class="leo-section">
          <div class="leo-container">
            <p>{{ str.p2t1 }}</p>
          </div>
        </div>

        <!-- 3d moon site -->
        <div class="grid gird-cols-2 gap-4">
          <div class="sticky top-0 min-h-[100vh]">
            <div class="ls-three__3d-moon-site">
              <Leo3dMoonSite :current-category="currentCategory" />

              <!-- TODO label -->
            </div>
          </div>

          <!-- article -->
          <div class="relative flex justify-end">
            <!-- reset 3d moon site -->
            <div class="w-[0]">
              <LeoScrollTrigger @change="handleChangeCategory($event, 'all')" />
            </div>

            <div class="w-full md:w-[50%]">
              <!-- 3d moon site part soviet -->
              <LeoScrollTrigger
                @change="handleChangeCategory($event, 'soviet')"
              >
                <div class="ls-three__moon-text-box min-h-[100vh] my-[500px]">
                  <p>{{ str.p3t1 }}</p>

                  <div class="leo-section-sm">
                    <LeoPic
                      src="img/newspaceera2025_pic10_1"
                      :webp="false"
                      :use-prefix="false"
                      :width="430"
                      :height="120"
                    />
                    <p class="leo-caption">{{ str.p3Caption }}</p>
                  </div>
                  <p>{{ str.p3t2 }}</p>
                </div>
              </LeoScrollTrigger>

              <!-- 3d moon site part us -->
              <LeoScrollTrigger @change="handleChangeCategory($event, 'us')">
                <div class="ls-three__moon-text-box min-h-[100vh] my-[500px]">
                  <p>{{ str.p4t1 }}</p>

                  <div class="leo-section-sm">
                    <LeoPic
                      src="img/newspaceera2025_pic10_2"
                      :webp="false"
                      :use-prefix="false"
                      :width="430"
                      :height="120"
                    />
                    <p class="leo-caption">{{ str.p4Caption1 }}</p>
                  </div>
                  <p>{{ str.p4t2 }}</p>

                  <div class="leo-section-sm">
                    <LeoPic
                      src="img/newspaceera2025_pic10_3"
                      :webp="false"
                      :use-prefix="false"
                      :width="430"
                      :height="120"
                    />
                    <p class="leo-caption">{{ str.p4Caption2 }}</p>
                  </div>
                  <p>{{ str.p4t3 }}</p>
                </div>
              </LeoScrollTrigger>

              <!-- 3d moon site part cn -->
              <LeoScrollTrigger @change="handleChangeCategory($event, 'cn')">
                <div class="ls-three__moon-text-box min-h-[100vh] my-[500px]">
                  <div class="leo-section-sm">
                    <LeoPic
                      src="img/newspaceera2025_pic10_4"
                      :webp="false"
                      :use-prefix="false"
                      :width="430"
                      :height="120"
                    />
                    <p class="leo-caption">{{ str.p5Caption1 }}</p>
                  </div>
                  <p>{{ str.p5t2 }}</p>
                  <div class="leo-section-sm">
                    <LeoPic
                      src="img/newspaceera2025_pic10_5"
                      :webp="false"
                      :use-prefix="false"
                      :width="430"
                      :height="120"
                    />
                    <p class="leo-caption">{{ str.p5Caption2 }}</p>
                  </div>
                </div>
              </LeoScrollTrigger>

              <!-- 3d moon site part others -->
              <LeoScrollTrigger
                @change="handleChangeCategory($event, 'others')"
              >
                <div class="ls-three__moon-text-box min-h-[100vh] my-[500px]">
                  <p>{{ str.p6t1 }}</p>
                  <div class="leo-section-sm">
                    <LeoPic
                      src="img/newspaceera2025_pic10_6"
                      :webp="false"
                      :use-prefix="false"
                      :width="430"
                      :height="120"
                    />
                    <p class="leo-caption">{{ str.p6Caption1 }}</p>
                  </div>
                  <p>{{ str.p6t2 }}</p>
                  <div class="leo-section-sm">
                    <LeoPic
                      src="img/newspaceera2025_pic10_7"
                      :webp="false"
                      :use-prefix="false"
                      :width="430"
                      :height="120"
                    />
                    <p class="leo-caption">{{ str.p6Caption2 }}</p>
                  </div>
                </div>
              </LeoScrollTrigger>
            </div>
          </div>
        </div>

        <!-- moon svg content -->
        <div class="flex items-center justify-center">
          <LeoScrollTrigger @change="handleSvgContent" />

          <h3>{{ str.moonTitle }}</h3>
          <div class="ls-three__moon-svg-wrap">
            <div class="ls-three__moon-svg-img">
              <LeoPic
                v-if="isMoonSvgEnter"
                src="img/newspaceera2025_pic11_1_chart"
                ext="svg"
                :use2x="false"
                :webp="false"
                :width="430"
                :height="120"
              />
              <LeoPic
                v-else
                src="img/newspaceera2025_pic11_2_chart"
                ext="svg"
                :use2x="false"
                :webp="false"
                :width="430"
                :height="120"
              />
            </div>
            <div class="ls-three__moon-svg-labels">
              <div class="ls-three__moon-svg-label ls-three__moon-svg-label--1">
                <h4>{{ str.moon1t1 }}</h4>
                <p>{{ str.moon1t2 }}</p>
                <p>{{ str.moon1t3 }}</p>
              </div>
              <div class="ls-three__moon-svg-label ls-three__moon-svg-label--2">
                <h4>{{ str.moon2t1 }}</h4>
                <p>{{ str.moon2t2 }}</p>
                <p>{{ str.moon2t3 }}</p>
              </div>
              <div class="ls-three__moon-svg-label ls-three__moon-svg-label--3">
                <h4>{{ str.moon3t1 }}</h4>
                <p>{{ str.moon3t2 }}</p>
                <p>{{ str.moon3t3 }}</p>
              </div>
              <div class="ls-three__moon-svg-label ls-three__moon-svg-label--4">
                <h4>{{ str.moon4t1 }}</h4>
                <p>{{ str.moon4t2 }}</p>
                <p>{{ str.moon4t3 }}</p>
              </div>
              <div class="ls-three__moon-svg-label ls-three__moon-svg-label--5">
                <h4>{{ str.moon5t1 }}</h4>
                <p>{{ str.moon5t2 }}</p>
                <p>{{ str.moon5t3 }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="leo-container">
          <div class="leo-section">
            <p>{{ str.p3t1 }}</p>
          </div>

          <div class="leo-section">
            <LeoReadMore
              :title="str.relatedTitle"
              :data="[
                {
                  title: str.related1Title,
                  link: str.related1Link,
                  bg: 'img/newspaceera2025_pic12_1',
                },
                {
                  title: str.related2Title,
                  link: str.related2Link,
                  bg: 'img/newspaceera2025_pic12_2',
                },
              ]"
            />
          </div>
        </div>
      </template>
    </LeoSectionLayout>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/mixins';

.ls-three {
  &__3d-moon-site {
    @include rwd-min(md) {
      transform: translateX(-25%);
    }
  }

  &__fall-down {
  }

  &__fall-down-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__fall-down-satellite-wrap {
    position: absolute;
    top: 0;
    left: 0;
  }

  &__fall-down-satellite {
    &--fade-in {
    }
  }

  &__fall-down-text {
    position: absolute;
    top: 0;
    left: 0;
  }

  &__moon-svg-wrap {
    position: relative;
  }

  &__moon-svg-img {
  }

  &__moon-svg-labels {
  }

  &__moon-svg-label {
    position: absolute;
    top: 0;
    left: 0;

    &--1 {
    }
    &--2 {
    }
    &--3 {
    }
    &--4 {
    }
    &--5 {
    }
  }

  &__moon-text-box {
    padding: 40px 20px;
    border: solid 1px #808080;

    @include rwd-min(sm) {
      padding: 40px;
      width: 100%;
      max-width: 530px;
      margin: 500px auto;
    }

    @include rwd-max(md) {
      @include mixins.blur(10px);
    }

    @include rwd-min(md) {
      width: 100%;
      max-width: 100%;
      padding: 0 110px;
      border: 0;
    }
  }
}
</style>
