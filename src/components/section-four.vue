<script setup lang="ts">
import { ref } from 'vue';
import LeoScrollTrigger from '@/components/leo-scroll-trigger.vue';
import LeoSectionIntro from '@/components/leo-section-intro.vue';
import LeoSectionLayout from '@/components/leo-section-layout.vue';
import LeoSvgPathAnimation from '@/components/leo-svg-path-animation.vue';
import LeoReadMore from '@/components/leo-read-more.vue';
import LeoPic from '@/components/leo-pic.vue';
import str from '@/locales/section4.json';

const isTrashFloatEnter = ref(false);

function handleTranshFloatEnter(enter: boolean) {
  isTrashFloatEnter.value = enter;
}
</script>

<template>
  <div id="debris" class="ls-four leo-article">
    <LeoSectionLayout>
      <template #space>
        <div class="relative w-full h-[calc(var(--init-screen-height)*1)]">
          <LeoPic
            class="leo-section-bg"
            src="img/newspaceera2025_pic13_1_bg"
            :webp="false"
            :use2x="false"
            :width="450"
            :height="450"
          />
          <div class="relative z-10">
            <LeoSvgPathAnimation :element-number="2">
              <template #element-1>
                <LeoPic
                  src="img/newspaceera2025_pic13_2_bg"
                  ext="png"
                  :webp="false"
                  :use2x="false"
                  :width="450"
                  :height="450"
                />
              </template>
              <template #element-2>
                <LeoPic
                  src="img/newspaceera2025_pic13_3_bg"
                  ext="png"
                  :webp="false"
                  :use2x="false"
                  :width="450"
                  :height="450"
                />
              </template>
            </LeoSvgPathAnimation>
          </div>
        </div>
      </template>
      <template #intro>
        <LeoSectionIntro chapter="04">
          <h2 class="max-w-[448px]">
            <span class="block text-4xl md:text-6xl mb-5">{{ str.title }}</span>
            <span class="block text-2xl">{{ str.subTitle }}</span>
          </h2>
        </LeoSectionIntro>
      </template>
      <template #article>
        <div
          class="leo-section leo-section--no-mt leo-section--pt relative z-10"
        >
          <div class="leo-container">
            <p>{{ str.p1t1 }}</p>
            <p>{{ str.p1t2 }}</p>
            <p>{{ str.p1t3 }}</p>
          </div>
        </div>

        <!-- trash float -->
        <div
          class="ls-four__trash relative h-[calc(var(--init-screen-height)*1)] overflow-hidden"
        >
          <div
            class="ls-four__trash-bg absolute bottom-0 left-[50%] w-full flex translate-x-[-50%]"
          >
            <LeoPic
              src="img/newspaceera2025_pic14_bg"
              :webp="false"
              :use2x="false"
              :width="430"
              :height="120"
            />
          </div>

          <div
            class="absolute top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden"
          >
            <LeoScrollTrigger
              class="w-full max-w-[800px] px-[26px]"
              @change="handleTranshFloatEnter"
            >
              <div
                class="ls-four__trash-float ls-four__trash-float--1"
                :class="{ 'ls-four__trash-float--enter': isTrashFloatEnter }"
              >
                <div class="w-full max-w-[475px]">
                  <div>
                    <span class="text-[80px] sm:text-[100px] leading-[100px]">{{
                      str.p1t4
                    }}</span>
                    <span class="text-[24px] leading-[36px]">{{
                      str.p1tBillion
                    }}</span>
                  </div>
                  <div class="mb-2 text-[24px] leading-[36px]">
                    {{ str.p1t5 }}
                  </div>
                  <p class="leo-caption">{{ str.p1tCaption1 }}</p>
                  <p class="leo-caption">{{ str.p1tCaption2 }}</p>
                </div>
              </div>

              <div
                class="ls-four__trash-float ls-four__trash-float--2 flex justify-end"
                :class="{ 'ls-four__trash-float--enter': isTrashFloatEnter }"
              >
                <div class="w-full max-w-[475px]">
                  <div>
                    <span class="text-[80px] sm:text-[100px] leading-[100px]">{{
                      str.p1t6
                    }}</span>
                    <span class="text-[24px] leading-[36px]">{{
                      str.p1tBillion
                    }}</span>
                  </div>
                  <div class="mb-2 text-[24px] leading-[36px]">
                    {{ str.p1t7 }}
                  </div>
                  <p class="leo-caption">{{ str.p1tCaption3 }}</p>
                </div>
              </div>
            </LeoScrollTrigger>
          </div>
        </div>

        <div class="leo-section leo-section--pb relative z-40">
          <div class="leo-container">
            <p>{{ str.p2t1 }}</p>
            <p>{{ str.p2t2 }}</p>
            <p>{{ str.p2t3 }}</p>

            <figure>
              <div
                class="flourish-embed flourish-chart"
                data-src="visualisation/23290332"
              />
            </figure>

            <p>{{ str.p3t1 }}</p>
            <p>{{ str.p3t2 }}</p>

            <LeoReadMore
              :data="[
                {
                  title: str.related1Title,
                  desc: str.related1Desc,
                  link: str.related1Link,
                  bg: 'img/newspaceera2025_pic15',
                },
              ]"
            />
          </div>
        </div>

        <div class="gradient-bg" role="presentation"></div>
      </template>
    </LeoSectionLayout>
  </div>
</template>

<style lang="scss">
.ls-four {
  position: relative;

  &__trash-bg {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: bottom center;
    }
  }

  &__trash-float {
    width: 100%;
    opacity: 0;

    &--1 {
      margin-bottom: 50px;
      transform: translateX(-100%);
      transition: 1s ease-in-out;
    }

    &--2 {
      transform: translateX(100%);
      transition: 1s ease-in-out;
    }

    &--enter {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &__trash {
    img {
      width: 100%;
      height: auto;
    }
  }
}

.gradient-bg {
  position: absolute;
  z-index: 30;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 700px;
  transform: translateY(10%);
  background: linear-gradient(
    180deg,
    #000000 19.86%,
    #6d4aed 61.43%,
    rgba(255, 255, 255, 1) 85.43%
  );
  pointer-events: none;
}
</style>
