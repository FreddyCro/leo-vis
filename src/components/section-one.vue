<script setup lang="ts">
import { ref } from 'vue';
import { sendGA } from '../utils/ga';
import LeoScrollTrigger from '@/components/leo-scroll-trigger.vue';
import LeoSectionIntro from '@/components/leo-section-intro.vue';
import LeoSectionLayout from '@/components/leo-section-layout.vue';

// import LeoSvgPathAnimation from '@/components/leo-svg-path-animation.vue';
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
const isSpaceEnter = ref<boolean>(false);
const isArticleEnter = ref<boolean>(false);

function handleChangeSpace(isIntersecting: boolean) {
  isSpaceEnter.value = isIntersecting;
}

function handleChangeArticle(isIntersecting: boolean) {
  isArticleEnter.value = isIntersecting;
}

function handleChangeCategory(isIntersecting: boolean, category: string) {
  if (!isIntersecting) return;
  currentCategory.value = category;
}

function handleOpenDialog() {
  showDialog.value = true;

  // 發送 GA 事件：click_btn with term = supplychains
  sendGA({
    hitType: 'event',
    eventAction: 'click_btn',
    eventCategory: 'interaction',
    term: 'supplychains',
  });
}

function onDialogClose() {
  showDialog.value = false;
}
</script>

<template>
  <div id="economic" class="ls-one leo-article">
    <LeoSectionLayout
      @change-space="handleChangeSpace"
      @change-article="handleChangeArticle"
    >
      <template #space>
        <div class="relative w-full h-[calc(var(--init-screen-height)*1)]">
          <div
            class="ls-one__space-pic-1"
            :class="{
              'ls-one__space-pic-1--enter': isSpaceEnter,
              'ls-one__space-pic-1--under': isArticleEnter,
            }"
          >
            <LeoPic
              src="img/newspaceera2025_pic3_1_bg"
              :webp="false"
              :use2x="false"
              :width="720"
              :height="1280"
            />
          </div>

          <div
            class="ls-one__space-pic-2"
            :class="{
              'ls-one__space-pic-2--enter': isSpaceEnter,
              'ls-one__space-pic-2--under': isArticleEnter,
            }"
          >
            <LeoPic
              src="img/newspaceera2025_pic3_2_bg"
              ext="png"
              :webp="false"
              :use2x="false"
              :width="369"
              :height="246"
            />
          </div>
        </div>
      </template>
      <template #intro>
        <LeoSectionIntro chapter="01">
          <h2 class="max-w-[448px]">
            <span class="block leo-intro-h2">{{ str.title }}</span>
            <span class="block leo-intro-h2-sub">{{ str.subTitle }}</span>
          </h2>
        </LeoSectionIntro>
      </template>
      <template #article>
        <div class="leo-section leo-section--pt leo-section--no-mt">
          <div class="min-h-[calc(var(--init-screen-height)*4)]">
            <div class="sticky top-0">
              <Leo3dEarthSatellite :current-category="currentCategory" />
            </div>

            <!-- trigger all -->
            <LeoScrollTrigger
              class="l-scroll-trigger my-[calc(var(--init-screen-height)*1)] sm:my-[calc(var(--init-screen-height)*0.6)]"
              scroll-height="calc(var(--init-screen-height)*1)"
              @change="handleChangeCategory($event, SATELLITE_LABEL_ALL)"
            >
              <div class="leo-container-pc">
                <div class="leo-text-box">
                  <p v-html="str.p1t1" />
                </div>
              </div>
            </LeoScrollTrigger>

            <!-- trigger LEO -->
            <LeoScrollTrigger
              class="l-scroll-trigger my-[calc(var(--init-screen-height)*1)] sm:my-[calc(var(--init-screen-height)*0.6)]"
              scroll-height="calc(var(--init-screen-height)*1)"
              @change="handleChangeCategory($event, SATELLITE_LABEL_APOGEE)"
            >
              <div class="leo-container-pc">
                <div class="leo-text-box">
                  <p v-html="str.p2t1" />
                  <p>{{ str.p2t2 }}</p>
                </div>
              </div>
            </LeoScrollTrigger>

            <!-- trigger SpaceX -->
            <LeoScrollTrigger
              class="l-scroll-trigger my-[calc(var(--init-screen-height)*1)] sm:my-[calc(var(--init-screen-height)*0.6)]"
              scroll-height="calc(var(--init-screen-height)*1)"
              @change="handleChangeCategory($event, SATELLITE_LABEL_STARLINK)"
            >
              <div class="leo-container-pc">
                <div class="leo-text-box">
                  <p v-html="str.p3t1" />
                </div>
              </div>
            </LeoScrollTrigger>

            <!-- trigger OneWeb, Kuiper -->
            <LeoScrollTrigger
              scroll-height="calc(var(--init-screen-height)*1)"
              @change="
                handleChangeCategory($event, SATELLITE_LABEL_ONEWEB_KUIPER)
              "
            >
              <div class="leo-container-pc">
                <div class="leo-text-box">
                  <p v-html="str.p4t1" />
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
              <ul class="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
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
                    class="ls-one__feat-grid-item-content ls-one__feat-grid-item-content--gray min-h-[255px] md:min-h-auto flex flex-col items-center justify-center px-[20px] py-[30px] leo-h4 font-medium"
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
            <template #title>
              <h4 class="leo-h4 font-bold noto-sans-tc text-[#404040]">
                {{ str.dialogTitle }}
              </h4>
            </template>
            <template #content>
              <div class="ls-one__dialog relative">
                <div class="sticky top-0 left-0 w-full">
                  <LeoPic
                    src="img/supplier_head"
                    ext="jpg"
                    :use-prefix="false"
                    :webp="false"
                    :width="760"
                    :height="42"
                  />
                </div>
                <LeoPic
                  src="img/supplier"
                  ext="jpg"
                  :use-prefix="false"
                  :webp="false"
                  :width="760"
                  :height="3494"
                />
              </div>
            </template>
          </LeoDialog>
        </div>

        <div class="leo-section">
          <div class="leo-container-lg">
            <LeoReadMore
              chapter="ch1"
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
  &__space-pic-1 {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transform: scale(1.15) rotate(5deg);

    &--enter {
      /* rotate 15deg => 0 */
      transform: rotate(0deg);
      opacity: 1;
      transition: 2s ease-in-out;
    }

    &--under {
      transform: rotate(0deg);
      opacity: 1;
      transition: 2s ease-in-out;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: right;
    }
  }

  &__space-pic-2 {
    position: absolute;
    top: 10%;
    left: 10%;
    opacity: 0;
    transform: scale(0.8) translate(-30%, -10%) rotate(10deg);

    @include rwd-min(md) {
      transform: translate(50%, -10%) rotate(10deg);
    }

    &--enter {
      /* fly from left 10% to left 90% */
      transform: scale(0.8) translate(10%, -10%) rotate(0deg);
      opacity: 1;
      transition: 3.5s ease-in-out;

      @include rwd-min(md) {
        transform: translate(60%, -0%) rotate(0deg);
      }
    }

    &--under {
      transform: scale(0.8) translate(0%, -100%) rotate(0deg);
      opacity: 1;
      transition: 3s ease-in-out;

      @include rwd-min(md) {
        transform: translate(-20%, -120%) rotate(0deg);
      }
    }

    img {
      width: auto;
    }
  }

  &__dialog {
    width: max-content;

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
      transition: background-color 0.3s ease-in-out;
    }
  }

  &__feat-grid-item-content {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #000;
    border-radius: 20px;

    &--gray {
      transition: 0.25s ease-in-out-in-out;

      &:hover {
        background-color: #1b1b1b;
        box-shadow: 0px 0px 12px 0px rgba(0, 244, 220, 1);
      }
    }
  }

  .country-label {
    color: #000;
    border-radius: 2px;
    padding: 2px;
  }

  .orange {
    background-color: #ff8f00;
  }

  .white {
    background-color: #fff;
  }

  .green {
    background-color: #00f4dc;
  }

  .yellow {
    background-color: #fffb18;
  }

  .purple {
    background-color: #8d41d9;
  }
}
</style>
