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
    <div
      :class="{
        'mt-8 sm:mt-10': title,
      }"
    >
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
              'leo-read-more__link--one': item.desc,
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
                  :class="{
                    'leo-read-more-h3': !item.desc,
                    'leo-read-more-h3-w-desc': item.desc,
                  }"
                >
                  {{ item.title }}
                </h3>
                <div v-if="item.desc" class="leo-read-more-p">
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

    &--one {
      width: 100%;
      aspect-ratio: 279 / 378;
      padding: 36px 16px;

      @include rwd-min(xxs) {
        aspect-ratio: 364 / 492;
        padding: 46px 21px;
      }

      @include rwd-min(sm) {
        aspect-ratio: auto;
        min-height: 238px;
        padding: 36px 33px 36px 43px;
      }

      @include rwd-min(md) {
        min-height: 278px;
        padding: 42px 39px 42px 50px;
      }
    }

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

.leo-read-more-h3 {
  font-size: 20px;
  line-height: 28px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
}

.leo-read-more-h3-w-desc {
  font-size: 28px;
  line-height: 40px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);

  @include rwd-min(pc) {
    font-size: 32px;
    line-height: 38px;
  }
}

.leo-read-more-p {
  font-size: 18px;
  line-height: 30px;
  margin-bottom: 36px;

  @include rwd-min(xxs) {
    margin-bottom: 162px;
  }

  @include rwd-min(pad) {
    margin-bottom: 0;
  }
}
</style>
