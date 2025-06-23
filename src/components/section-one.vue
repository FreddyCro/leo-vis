<script setup lang="ts">
import { ref } from 'vue';
import LeoScrollTrigger from '@/components/leo-scroll-trigger.vue';
import LeoSectionIntro from '@/components/leo-section-intro.vue';
import LeoSectionLayout from '@/components/leo-section-layout.vue';
import LeoSvgPathAnimation from '@/components/leo-svg-path-animation.vue';
import Leo3dEarthSatellite from '@/components/leo-3d-earth-satellite.vue';
import LeoReadMore from '@/components/leo-read-more.vue';
import LeoPic from '@/components/leo-pic.vue';
import LeoDialog from '@/components/leo-dialog.vue';
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
const showDialog = ref<boolean>(false);

function handleChangeCategory(isIntersecting: boolean, category: string) {
  if (!isIntersecting) return;
  currentCategory.value = category;
}

function handleOpenDialog() {
  showDialog.value = true;
}

function onDialogClose() {
  showDialog.value = false;
}
</script>

<template>
  <div class="ls-one leo-article">
    <LeoSectionLayout>
      <template #space>
        <div class="relative w-full h-[100vh]">
          <LeoPic
            class="leo-section-bg"
            src="img/newspaceera2025_pic3_1_bg"
            :webp="false"
            :use2x="false"
            :width="620"
            :height="450"
          />
          <div class="relative z-10">
            <LeoSvgPathAnimation :element-number="1">
              <template #element-1>
                <LeoPic
                  src="img/newspaceera2025_pic3_2_bg"
                  ext="png"
                  :webp="false"
                  :use2x="false"
                  :width="620"
                  :height="450"
                />
              </template>
            </LeoSvgPathAnimation>
          </div>
        </div>
      </template>
      <template #intro>
        <LeoSectionIntro chapter="01">
          <h2 class="max-w-[448px]">
            <span class="block text-4xl md:text-6xl mb-5">{{ str.title }}</span>
            <span class="block text-2xl">{{ str.subTitle }}</span>
          </h2>
        </LeoSectionIntro>
      </template>
      <template #article>
        <div class="leo-section leo-section--pt leo-section--no-mt">
          <div class="min-h-[400vh]">
            <div class="sticky top-0">
              <Leo3dEarthSatellite :current-category="currentCategory" />
            </div>

            <!-- trigger all -->
            <LeoScrollTrigger
              scroll-height="100vh"
              @change="handleChangeCategory($event, SATELLITE_LABEL_ALL)"
            >
              <div class="leo-container-pc">
                <div class="leo-text-box">
                  <p>{{ str.p1t1 }}</p>
                </div>
              </div>
            </LeoScrollTrigger>

            <!-- trigger LEO -->
            <LeoScrollTrigger
              scroll-height="100vh"
              @change="handleChangeCategory($event, SATELLITE_LABEL_APOGEE)"
            >
              <div class="leo-container-pc">
                <div class="leo-text-box">
                  <p>{{ str.p2t1 }}</p>
                  <p>{{ str.p2t2 }}</p>
                </div>
              </div>
            </LeoScrollTrigger>

            <!-- trigger SpaceX -->
            <LeoScrollTrigger
              scroll-height="100vh"
              @change="handleChangeCategory($event, SATELLITE_LABEL_STARLINK)"
            >
              <div class="leo-container-pc">
                <div class="leo-text-box">
                  <p>{{ str.p3t1 }}</p>
                </div>
              </div>
            </LeoScrollTrigger>

            <!-- trigger OneWeb, Kuiper -->
            <LeoScrollTrigger
              scroll-height="100vh"
              @change="
                handleChangeCategory($event, SATELLITE_LABEL_ONEWEB_KUIPER)
              "
            >
              <div class="leo-container">
                <div class="leo-text-box">
                  <p>{{ str.p4t1 }}</p>
                </div>
              </div>
            </LeoScrollTrigger>
          </div>
        </div>

        <div class="leo-section">
          <div class="leo-container">
            <p>{{ str.p5t1 }}</p>
            <p role="presentation"></p>
          </div>
        </div>

        <div class="leo-section">
          <div class="leo-container-lg">
            <!-- feature grid -->
            <div class="ls-one-feat-grid-wrap">
              <ul class="grid gap-4 sm:grid-cols-2">
                <li
                  v-for="item in FEAT_GRID_DATA"
                  :key="item.title"
                  class="ls-one__feat-grid-item"
                >
                  <div
                    class="ls-one__feat-grid-item-content px-[20px] py-[30px]"
                  >
                    <h4 class="leo-h4 text-center font-medium">
                      {{ item.title }}
                    </h4>
                    <div class="mt-4">
                      <p class="text-[#00F4DC] font-bold">
                        <span>
                          {{ str.featFactory }}
                        </span>
                        <span class="text-5xl">
                          {{ item.amount }}
                        </span>
                      </p>
                    </div>
                    <p>{{ item.desc }}</p>
                  </div>
                </li>

                <!-- see full data -->
                <li class="ls-one__feat-grid-item">
                  <button
                    class="ls-one__feat-grid-item-content ls-one__feat-grid-item-content--gray flex flex-col items-center justify-center leo-h4 font-medium"
                    @click="handleOpenDialog"
                  >
                    <span class="mb-2 md:mb-3">
                      {{ str.feat6Title }}
                    </span>
                    <svg
                      width="37"
                      height="34"
                      viewBox="0 0 37 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.2463 3L34.6184 16.9084L20.2463 30.8168"
                        stroke="white"
                        stroke-width="3"
                      />
                      <path
                        d="M0.000111328 16.6901H34.4931"
                        stroke="white"
                        stroke-width="3"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>

            <!-- caption -->
            <div class="leo-caption mt-[10px]">
              <p>{{ str.featCaption }}</p>
            </div>
          </div>

          <LeoDialog v-model="showDialog" @close="onDialogClose">
            <div class="ls-one__dialog">
              <LeoPic
                src="img/supplier"
                ext="jpg"
                :use-prefix="false"
                :webp="false"
                :width="430"
                :height="120"
              />
            </div>
          </LeoDialog>
        </div>

        <div class="leo-section">
          <div class="leo-container-lg">
            <LeoReadMore
              :title="str.relatedTitle"
              :data="[
                {
                  title: str.related1Title,
                  link: str.related1Link,
                  bg: 'img/newspaceera2025_pic4_1',
                },
                {
                  title: str.related2Title,
                  link: str.related2Link,
                  bg: 'img/newspaceera2025_pic4_2',
                },
                {
                  title: str.related3Title,
                  link: str.related3Link,
                  bg: 'img/newspaceera2025_pic4_3',
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
.ls-one {
  &__dialog {
    img {
      width: 760px;
      max-width: auto;
    }
  }

  &__feat-grid-item {
    position: relative;
    padding: 2px;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 20px;
      background: linear-gradient(225deg, #8d41d9 0%, #00f4dc 100%);
      transition: background-color 0.3s ease;
    }
  }

  &__feat-grid-item-content {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #000;
    border-radius: 20px;

    &--gray {
      transition: 0.25s ease-in-out;

      &:hover {
        background-color: #1b1b1b;
        box-shadow: 0px 0px 12px 0px rgba(0, 244, 220, 1);
      }
    }
  }
}
</style>
