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
  <div id="taiwan" class="ls-tw leo-article text-[#404040]">
    <div class="leo-container">
      <div class="leo-section">
        <h2 class="ls-tw-h3 text-center font-medium">{{ str.title1 }}</h2>
        <div class="mt-10">
          <p>{{ str.p1t1 }}</p>
        </div>
      </div>
    </div>

    <!-- feature grid -->
    <div class="leo-container-lg">
      <div class="leo-section">
        <h3 class="ls-tw-h3 md:text-center">{{ str.title2 }}</h3>
        <div class="my-5">
          <h4 class="ls-tw-h3-sub md:text-center">
            {{ str.title2Subtitle }}
          </h4>
        </div>
        <div class="ls-tw-feat-grid-wrap">
          <ul class="grid gap-4 sm:grid-cols-2 md:grid-cols-6">
            <li
              v-for="(item, index) in FEAT_GRID_DATA"
              :key="item.title"
              class="ls-tw__feat-grid-item"
              :class="{
                'sm:col-span-2': index === FEAT_GRID_DATA.length - 1,
                'md:col-span-2': [0, 1, 2].includes(index),
                'md:col-span-3': [3, 4].includes(index),
              }"
            >
              <div class="ls-tw__feat-grid-item-content px-[20px] py-[30px]">
                <h4 class="ls-tw__feat-title">
                  {{ item.title }}
                </h4>
                <div>
                  <p class="text-[#00F4DC]">
                    <span class="ls-tw__feat-digit">{{ item.amount }}</span>
                    <span class="ls-tw__feat-unit">{{ str.featBillion }}</span>
                  </p>
                </div>
                <p class="ls-tw__feat-desc">{{ item.desc }}</p>
              </div>
            </li>
          </ul>

          <div class="flex justify-end items-center mt-3">
            <svg
              width="92"
              height="23"
              viewBox="0 0 92 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 11H90.5"
                stroke="url(#paint0_linear_441_1476)"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M80.4465 1L90.8931 11.4466L80.4465 21.8932"
                stroke="#7B57D9"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_441_1476"
                  x1="1"
                  y1="11.5"
                  x2="90.5"
                  y2="11.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#00F4DC" />
                  <stop offset="1" stop-color="#8D41D9" />
                </linearGradient>
              </defs>
            </svg>

            <p class="ml-3 text-[#8D41D9]">
              <span>
                {{ str.featTotal }}
              </span>
              <span class="text-5xl font-bold">
                {{ str.featTotalAmount }}
              </span>
              <span>
                {{ str.featBillion }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="leo-container">
      <p>{{ str.p2t1 }}</p>
      <p>{{ str.p2t2 }}</p>
      <p>{{ str.p2t3 }}</p>
      <p>{{ str.p2t4 }}</p>
      <p>{{ str.p2t5 }}</p>

      <div class="leo-section">
        <h3 class="ls-tw-h3">{{ str.title3 }}</h3>
        <div class="mt-10">
          <p>{{ str.p3t1 }}</p>
        </div>
      </div>

      <div class="leo-section text-white">
        <LeoReadMore
          chapter="tw"
          :title="str.relatedTitle"
          :data="[
            {
              title: str.related1Title,
              desc: str.related1Desc,
              link: str.related1Link,
              bg: 'img/newspaceera2025_pic16',
            },
          ]"
        />
      </div>
      <div class="leo-section">
        <p>{{ str.p3t2 }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.ls-tw {
  position: relative;

  &__feat-title {
    font-size: 18px;
    line-height: 36px;
    font-weight: 700;
  }

  &__feat-digit {
    font-size: 36px;
    line-height: 46px;
    font-weight: 700;

    @include rwd-min(pc) {
      font-size: 50px;
      line-height: 68px;
    }
  }

  &__feat-unit {
    font-size: 18px;
    line-height: 36px;
    font-weight: 500;
  }

  &__feat-desc {
    margin-top: 20px;
    font-weight: 300;
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
    background-color: #fff;
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

.ls-tw-h3 {
  font-size: 28px;
  line-height: 40px;
  font-weight: 500;

  @include rwd-min(pad) {
    font-size: 32px;
    line-height: 48px;
  }
}

.ls-tw-h3-sub {
  font-size: 20px;
  line-height: 32px;
  font-weight: 500;
}
</style>
