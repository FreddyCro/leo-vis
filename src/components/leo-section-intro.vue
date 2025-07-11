<script setup lang="ts">
import { sendGA } from '../utils/ga';
import str1 from '@/locales/section1.json';
import str2 from '@/locales/section2.json';
import str3 from '@/locales/section3.json';
import str4 from '@/locales/section4.json';

interface Props {
  chapter?: string;
}

const props = defineProps<Props>();

const tocList = [
  { text: str1.title, link: '#economic' },
  { text: str2.title, link: '#security' },
  { text: str3.title, link: '#moon' },
  { text: str4.title, link: '#debris' },
];

function onClick(item: { text: string; link: string }) {
  // 根據連結的 hash 值決定要發送的 term 值
  const termMap: Record<string, string> = {
    '#economic': 'economic',
    '#security': 'security',
    '#moon': 'moon',
    '#debris': 'debris',
  };

  const term = props.chapter
    ? `ch${props.chapter}_${termMap[item.link]}`
    : termMap[item.link];

  if (term) {
    sendGA({
      hitType: 'event',
      eventAction: 'click_anchor',
      eventCategory: 'navigation',
      term,
    });
  }
}
</script>

<template>
  <div
    class="ls-intro relative w-full h-screen min-h-[var(--hero-min-h)] flex flex-col justify-between"
  >
    <!-- presentation line -->
    <div
      class="ls-intro__present-line ls-intro__present-line-1"
      role="presentation"
    />
    <div
      class="ls-intro__present-line ls-intro__present-line-2"
      role="presentation"
    />

    <!-- title / chapter -->
    <div
      class="ls-intro__content h-full flex items-center justify-center md:grid md:grid-cols-5"
    >
      <div
        class="ls-intro__content-title md:col-span-4 text-center md:text-left md:pl-[107px] 3xl:pl-[300px]"
      >
        <slot />
      </div>
      <div v-if="chapter" class="ls-intro__chapter hidden md:block montserrat">
        {{ chapter }}
      </div>
    </div>

    <!-- toc -->
    <div
      class="ls-intro__toc-wrap relative w-full max-md:flex max-md:justify-between max-md:items-end max-md:px-[40px]"
    >
      <ul
        class="ls-intro__toc inline-grid max-md:grid-rows-4 md:grid-cols-4 gap-[18px] md:gap-10"
      >
        <li
          v-for="(item, index) in tocList"
          :key="item.link"
          class="ls-intro__toc-item relative"
          :class="{ 'ls-intro__toc-item--active': chapter === `0${index + 1}` }"
        >
          <a :href="item.link" @click="onClick(item)">
            <div class="ls-intro__toc-item-dot" role="presentation">
              <!-- outer -->
              <div class="ls-intro__toc-item-dot-out" />
              <!-- inner -->
              <div class="ls-intro__toc-item-dot-in" />
            </div>
            <div class="ls-intro__toc-item-content">
              <span class="ls-intro__toc-item-content-number montserrat">
                0{{ index + 1 }}
              </span>
              <span>
                {{ item.text }}
              </span>
            </div>
          </a>
        </li>
      </ul>

      <div v-if="chapter" class="ls-intro__chapter montserrat md:hidden">
        {{ chapter }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.ls-intro {
  &__present-line {
    position: absolute;
    background-color: var(--white);
    opacity: 0.5;
  }

  &__present-line-1 {
    top: 0;
    left: 40px;
    width: 1px;
    height: 100%;

    @include rwd-min(md) {
      left: 80%;
    }
  }

  &__present-line-2 {
    /* top: calc(var(--init-screen-height) - 67px); */
    /* top: calc(var(--init-screen-height) - 50px); */
    top: calc(var(--init-screen-height) - 36px);
    width: 100%;
    height: 1px;

    @include rwd-min(sm) {
      top: auto;
      bottom: 126px;
    }

    @media screen and (min-width: 800px) {
      bottom: 176px;
    }

    @include rwd-min(md) {
      display: none;
    }
  }

  &__toc-wrap {
    padding-bottom: calc(67px + 64px);

    @include rwd-min(sm) {
      padding-bottom: calc(126px + 64px);
    }

    /* min 800px */
    @media screen and (min-width: 800px) {
      padding-bottom: calc(176px + 64px);
    }

    @include rwd-min(md) {
      padding-bottom: 66px;
      padding-left: 107px;
      border-top: 1px solid rgba($color: #fff, $alpha: 0.5);
    }

    @include rwd-min(3xl) {
      padding-left: 300px;
    }
  }

  &__toc-item {
    font-size: 20px;
    line-height: 36px;

    &:hover,
    &--active {
      .ls-intro__toc-item-dot {
        transform: translateY(-50%) scale(2);
      }
    }
  }

  &__toc-item-content {
    display: flex;
    align-items: center;
    margin-left: 27px;

    @include rwd-min(md) {
      margin-left: 0;
      margin-top: 15px;
    }
  }

  &__toc-item-content-number {
    font-size: 28px;
    margin-right: 2px;
  }

  &__toc-item-dot {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    transition: 0.25s ease-in-out;

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

  &__chapter {
    font-size: 50px;
    line-height: 62px;

    @include rwd-min(sm) {
      font-size: 72px;
      line-height: 64px;
    }

    @include rwd-min(md) {
      margin-left: 40px;
    }
  }
}
</style>
