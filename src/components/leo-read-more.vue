<script setup lang="ts">
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
        <a :href="item.link" class="relative min- h-[124px] block">
          <!-- bg -->
          <img
            :src="item.bg"
            alt="Article Image"
            class="absolute w-full h-full object-cover object-center pointer-events-none"
          />

          <!-- text -->
          <div class="relative">
            <h3>{{ item.title }}</h3>
            <p v-if="item.desc">{{ item.desc }}</p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss"></style>
