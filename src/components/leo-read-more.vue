<script setup lang="ts">
import LeoPic from '@/components/leo-pic.vue';

interface Item {
  title: string;
  link: string;
  desc?: string;
  bg: string;
}

interface Props {
  title?: string;
  data: Item[];
}

defineProps<Props>();
</script>

<template>
  <div class="leo-read-more">
    <h2 v-if="title" class="text-2xl font-bold mb-4">{{ title }}</h2>
    <ul
      :class="{
        'grid sm:grid-cols-2 gap-4': data.length % 2 === 0, // 2, 4
        'grid sm:grid-cols-2 md:grid-cols-3 gap-4': data.length % 3 === 0, // 3
      }"
    >
      <li v-for="(item, index) in data" :key="index">
        <a
          :href="item.link"
          class="relative min-h-[124px] block rounded-lg overflow-hidden px-[25px] py-[28px]"
        >
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
            <h3>{{ item.title }}</h3>
            <p v-if="item.desc">{{ item.desc }}</p>
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
</template>

<style lang="scss">
.leo-read-more {
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
