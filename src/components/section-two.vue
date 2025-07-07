<script setup lang="ts">
import { ref } from 'vue';
import LeoSectionIntro from '@/components/leo-section-intro.vue';
import LeoSectionLayout from '@/components/leo-section-layout.vue';
import LeoReadMore from '@/components/leo-read-more.vue';
import LeoPic from '@/components/leo-pic.vue';
import str from '@/locales/section2.json';

const isSpaceEnter = ref<boolean>(false);
const isArticleEnter = ref<boolean>(false);

function handleChangeSpace(isIntersecting: boolean) {
  isSpaceEnter.value = isIntersecting;
}

function handleChangeArticle(isIntersecting: boolean) {
  isArticleEnter.value = isIntersecting;
}
</script>

<template>
  <div id="security" class="ls-two leo-article">
    <LeoSectionLayout
      @change-space="handleChangeSpace"
      @change-article="handleChangeArticle"
    >
      <template #space>
        <div class="relative w-full h-[calc(var(--init-screen-height)*1)]">
          <div
            class="ls-two__space-pic-1"
            :class="{
              'ls-two__space-pic-1--enter': isSpaceEnter,
              'ls-two__space-pic-1--under': isArticleEnter,
            }"
          >
            <LeoPic
              src="img/newspaceera2025_pic5_1_bg"
              :webp="false"
              :use2x="false"
              :width="450"
              :height="450"
            />
          </div>

          <div
            class="ls-two__space-pic-2"
            :class="{
              'ls-two__space-pic-2--enter': isSpaceEnter,
              'ls-two__space-pic-2--under': isArticleEnter,
            }"
          >
            <LeoPic
              src="img/newspaceera2025_pic5_2_bg"
              ext="png"
              :webp="false"
              :use2x="false"
              :width="450"
              :height="450"
            />
          </div>

          <div
            class="ls-two__space-pic-3"
            :class="{
              'ls-two__space-pic-3--enter': isSpaceEnter,
              'ls-two__space-pic-3--under': isArticleEnter,
            }"
          >
            <LeoPic
              src="img/newspaceera2025_pic5_3_bg"
              ext="png"
              :webp="false"
              :use2x="false"
              :width="450"
              :height="450"
            />
          </div>
        </div>
      </template>
      <template #intro>
        <LeoSectionIntro chapter="02">
          <h2 class="max-w-[448px]">
            <span class="block leo-intro-h2">{{ str.title }}</span>
            <span class="block leo-intro-h2-sub">{{ str.subTitle }}</span>
          </h2>
        </LeoSectionIntro>
      </template>
      <template #article>
        <div class="leo-container">
          <div class="leo-section leo-section--pt leo-section--no-mt">
            <p>{{ str.p1t1 }}</p>
            <p>{{ str.p1t2 }}</p>
            <p></p>

            <!-- chart 1 -->
            <figure class="w-full">
              <div
                class="flourish-embed flourish-chart"
                data-src="visualisation/23266793"
              />
            </figure>
            <p>{{ str.p2t1 }}</p>
            <p></p>

            <!-- chart 2 -->
            <figure class="w-full">
              <div
                class="flourish-embed flourish-chart"
                data-src="visualisation/23267137"
              />
            </figure>
            <p></p>
            <p>{{ str.p3t1 }}</p>
            <p>{{ str.p3t2 }}</p>
          </div>
        </div>

        <!-- chart 3 -->
        <div class="min-h-[calc(var(--init-screen-height)*2)] w-full">
          <div
            class="sticky top-0 w-full min-h-[calc(var(--init-screen-height)*1)] flex items-center"
          >
            <div class="leo-container">
              <figure class="w-full">
                <div
                  class="flourish-embed flourish-chart"
                  data-src="visualisation/23265551"
                />
              </figure>
            </div>
          </div>
          <div class="leo-container-pc">
            <div
              class="leo-section leo-section--no-mb pb-[calc(var(--init-screen-height)*1)]"
            >
              <p class="leo-text-box">{{ str.p4t1 }}</p>
            </div>
          </div>
        </div>

        <!-- chart 4 -->
        <div class="min-h-[calc(var(--init-screen-height)*2)] w-full">
          <div
            class="sticky top-0 w-full min-h-[calc(var(--init-screen-height)*1)] flex items-center"
          >
            <figure class="w-full">
              <figcaption>
                {{ str.g4Title }}
              </figcaption>

              <LeoPic
                src="img/newspaceera2025_pic6_chart"
                ext="svg"
                :use2x="false"
                :webp="false"
                :width="430"
                :height="120"
              />

              <figcaption>
                {{ str.g4Caption }}
              </figcaption>
            </figure>
          </div>
          <div class="leo-container-pc">
            <div
              class="leo-section leo-section--no-mb pb-[calc(var(--init-screen-height)*1)]"
            >
              <p class="leo-text-box">{{ str.p5t1 }}</p>
            </div>
          </div>
        </div>

        <div class="leo-container">
          <p>{{ str.p5t2 }}</p>
        </div>

        <div class="leo-container-lg">
          <div class="leo-section">
            <LeoReadMore
              chapter="ch2"
              :title="str.relatedTitle"
              :data="[
                {
                  title: str.related1Title,
                  link: str.related1Link,
                  bg: 'img/newspaceera2025_pic7_1',
                },
                {
                  title: str.related2Title,
                  link: str.related2Link,
                  bg: 'img/newspaceera2025_pic7_2',
                },
                {
                  title: str.related3Title,
                  link: str.related3Link,
                  bg: 'img/newspaceera2025_pic7_3',
                },
                {
                  title: str.related4Title,
                  link: str.related4Link,
                  bg: 'img/newspaceera2025_pic7_4',
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
.ls-two {
  &__space-pic-1 {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transform: scale(1.15) rotate(-5deg);

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

  /* moon */
  &__space-pic-2 {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transform: scale(0.5) translate(-25%, -25%);
    transform-origin: 0 0;

    &--enter {
      /* rotate 15deg => 0 */
      transform: scale(0.5) translate(0, 0);
      opacity: 1;
      transition: 2s ease-in-out;
    }

    &--under {
      transform: scale(0.5) translate(0, 0);
      opacity: 1;
      transition: 2s ease-in-out;
    }

    @include rwd-min(md) {
      transform: translate(-25%, -25%);

      &--enter {
        transform: translate(0, 0);
      }

      &--under {
        transform: translate(0, 0);
      }
    }

    img {
      width: auto;
    }
  }

  &__space-pic-3 {
    position: absolute;
    top: 35%;
    left: 35%;
    opacity: 0;
    transform: translate(0%, 50%) rotate(25deg);

    @include rwd-min(md) {
      transform: translate(0%, 0%) rotate(25deg);
    }

    &--enter {
      /* rotate 15deg => 0 */
      transform: translate(0%, 50%) rotate(0);
      opacity: 1;
      transition: 3.5s ease-in-out;

      @include rwd-min(md) {
        transform: translate(30%, 5%) rotate(0deg);
      }
    }

    &--under {
      transform: translate(50%, 100%) rotate(0deg);
      opacity: 1;
      transition: 3.5s ease-in-out;

      @include rwd-min(md) {
        transform: translate(50%, 50%) rotate(0deg);
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: right;
    }
  }

  &__moon {
    img {
      width: auto;
    }
  }
}
</style>
