<script setup lang="ts">
import str1 from '@/locales/section1.json';
import str2 from '@/locales/section2.json';
import str3 from '@/locales/section3.json';
import str4 from '@/locales/section4.json';

interface Props {
  chapter?: string;
  current?: number;
}

defineProps<Props>();

const tocList = [str1.title, str2.title, str3.title, str4.title];
</script>

<template>
  <div
    class="l-intro relative w-full h-screen min-h-[var(--hero-min-h)] flex flex-col justify-between"
  >
    <!-- presentation line -->
    <div
      class="l-intro__present-line l-intro__present-line-1"
      role="presentation"
    />
    <div
      class="l-intro__present-line l-intro__present-line-2"
      role="presentation"
    />

    <!-- title / chapter -->
    <div
      class="l-intro__content h-full flex items-center justify-center md:grid md:grid-cols-5"
    >
      <div class="l-intro__content-title md:col-span-4">
        <slot />
      </div>
      <div v-if="chapter" class="l-intro__chapter hidden md:block">
        {{ chapter }}
      </div>
    </div>

    <!-- toc -->
    <div
      class="l-intro__toc-wrap relative w-full max-md:flex max-md:justify-between max-md:items-end max-md:px-7"
    >
      <ul
        class="l-intro__toc inline-grid max-md:grid-rows-4 md:grid-cols-4 gap-10"
      >
        <li
          v-for="(item, index) in tocList"
          :key="item"
          class="l-intro__toc-item relative"
        >
          <div class="l-intro__toc-item-dot" role="presentation">
            <!-- outer -->
            <div class="l-intro__toc-item-dot-out" />
            <!-- inner -->
            <div class="l-intro__toc-item-dot-in" />
          </div>
          <div class="l-intro__toc-item-content">
            <span>0{{ index + 1 }}</span>
            <span>
              {{ item }}
            </span>
          </div>
        </li>
      </ul>

      <div v-if="chapter" class="l-intro__chapter lg:hidden">
        {{ chapter }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.l-intro {
  &__present-line {
    position: absolute;
    background-color: var(--white);
  }

  &__present-line-1 {
    top: 0;
    left: 28px;
    width: 1px;
    height: 100%;

    @include rwd-min(md) {
      left: 80%;
    }
  }

  &__present-line-2 {
    @include rwd-max(md) {
      bottom: 16%;
      width: 100%;
      height: 1px;
    }
  }

  &__toc-wrap {
    padding-bottom: calc(16% + 64px);

    @include rwd-min(md) {
      padding-bottom: 0;
      border-top: 1px solid var(--white);
    }
  }

  &__toc-item-dot {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);

    @include rwd-min(md) {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &__toc-item-dot-out,
  &__toc-item-dot-in {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  &__toc-item-dot-out {
    width: 16px;
    height: 16px;
    border: solid 1px var(--white);
  }

  &__toc-item-dot-in {
    width: 10px;
    height: 10px;
    background-color: var(--white);
  }

  &__toc-item-content {
    margin-left: 27px;

    @include rwd-min(md) {
      margin-left: 0;
      margin-top: 15px;
    }
  }
}
</style>
