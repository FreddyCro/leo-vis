<script setup lang="ts">
import { sendGA } from '../utils/ga';
import LeoPic from '@/components/leo-pic.vue';

interface Item {
  title: string;
  link: string;
  desc?: string;
  bg: string;
}

interface Props {
  chapter?: string;
  title?: string;
  data: Item[];
}

defineProps<Props>();

function onClick(item: Item) {
  // 發送 GA 事件：click_news with term = ch2
  sendGA({
    hitType: 'event',
    eventAction: 'click_news',
    eventCategory: 'news',
    term: 'ch2',
    eventLabel: item.title,
  });
}
</script>

<template>
  <div class="leo-read-more">
    <h2 v-if="title" class="leo-h3 font-medium text-center">
      {{ title }}
    </h2>
    <div class="mt-8 sm:mt-10">
      <ul
        :class="{
          'grid sm:grid-cols-2 gap-[13px]': data.length % 2 === 0, // 2, 4
          'grid sm:grid-cols-2 md:grid-cols-3 gap-[13px]':
            data.length % 3 === 0, // 3
        }"
      >
        <li v-for="(item, index) in data" :key="index">
          <a
            :href="item.link"
            class="leo-read-more__link relative h-full min-h-[124px] md:min-h-[153px] flex flex-col justify-between border border-[#808080] rounded-[20px] overflow-hidden"
            :class="{
              'px-[25px] py-[28px]': !item.desc,
              'min-h-[376px] px-[16px] py-[35px] sm:min-h-[492px] sm:px-[21px] sm:py-[46px] md:min-h-[0] md:px-[50px] md:py-[42px]':
                item.desc,
            }"
            target="_blank"
            @click="onClick(item)"
          >
            <div>
              <!-- bg -->
              <LeoPic
                :src="item.bg"
                :use-prefix="data.length === 1 ? true : false"
                :webp="false"
                :width="620"
                :height="450"
              />

              <!-- text -->
              <div class="relative">
                <h3
                  class="font-medium"
                  :class="{
                    'text-xl': !item.desc,
                    'text-3xl': item.desc,
                  }"
                >
                  {{ item.title }}
                </h3>
                <div v-if="item.desc" class="mt-4">
                  <p>{{ item.desc }}</p>
                </div>
              </div>
            </div>

            <!-- arrow -->
            <div class="relative flex justify-end items-center">
              <svg
                width="37"
                height="30"
                viewBox="0 0 37 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 1L35.3721 14.9084L21 28.8168"
                  stroke="white"
                  stroke-width="2"
                />
                <path
                  d="M0.753529 14.6901H35.2465"
                  stroke="white"
                  stroke-width="2"
                />
              </svg>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.leo-read-more {
  &__link {
    transition: 0.25s ease-in-out;

    &:hover {
      box-shadow: 0px 0px 12px 0px rgba(255, 255, 255, 1);
    }
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    pointer-events: none;
  }
}
</style>
