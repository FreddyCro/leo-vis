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
  <div class="ls-four leo-article">
    <LeoSectionLayout>
      <template #space>
        <div class="relative w-full h-[100vh]">
          <LeoPic
            class="leo-section-bg"
            src="img/newspaceera2025_pic13_1_bg"
            :webp="false"
            :use2x="false"
            :width="620"
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
        <LeoSectionIntro chapter="04">
          <h2 class="max-w-[448px]">
            <span class="block text-4xl md:text-6xl mb-5">{{ str.title }}</span>
            <span class="block text-2xl">{{ str.subTitle }}</span>
          </h2>
        </LeoSectionIntro>
      </template>
      <template #article>
        <div class="leo-section leo-section--no-mt leo-section--pt">
          <div class="leo-container">
            <p>{{ str.p1t1 }}</p>
            <p>{{ str.p1t2 }}</p>
            <p>{{ str.p1t3 }}</p>
          </div>
        </div>

        <!-- trash float -->
        <div class="relative">
          <LeoPic
            src="img/newspaceera2025_pic14_bg"
            :webp="false"
            :use2x="false"
            :width="430"
            :height="120"
          />

          <div
            class="absolute top-0 left-0 w-full h-full flex items-center justify-center"
          >
            <LeoScrollTrigger @change="handleTranshFloatEnter" />

            <div
              class="ls-four__trash-float ls-four__trash-float--1"
              :class="{ 'ls-four__trash-float--enter': isTrashFloatEnter }"
            >
              <p>
                <span>{{ str.p1t4 }}</span>
                <span>{{ str.p1tBillion }}</span>
              </p>
              <p>{{ str.p1t5 }}</p>
              <p class="leo-caption">{{ str.p1tCaption1 }}</p>
              <p class="leo-caption">{{ str.p1tCaption2 }}</p>
            </div>

            <div
              class="ls-four__trash-float ls-four__trash-float--2"
              :class="{ 'ls-four__trash-float--enter': isTrashFloatEnter }"
            >
              <p>
                <span>{{ str.p1t6 }}</span>
                <span>{{ str.p1tBillion }}</span>
              </p>
              <p>{{ str.p1t7 }}</p>
              <p class="leo-caption">{{ str.p1tCaption3 }}</p>
            </div>
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

  &__trash-float {
    opacity: 0;
    transition: 1s 0.1s ease-in-out;

    &--1 {
      transform: translateX(-100%);
    }

    &--2 {
      transform: translateX(100%);
    }

    &--enter {
      opacity: 1;
      transform: translateX(0);
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
